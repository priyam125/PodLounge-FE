import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import ACTIONS from "../actions";
import freeice from "freeice";

const users = [
  {
    id: 1,
    name: "Rakesh k",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);

  useEffect(() => {
    //props on page load
    console.log("RoomId:", roomId);
    console.log("User:", user);
    console.log("Clients:", clients);
  });

  const audioElements = useRef({}); //store all the audio elements with user id as key against each element
  const connections = useRef({}); //store all the peer connections with user id as key against each connection
  const localMediaStream = useRef(null); //store the local media stream
  const captureStarted = useRef(false); // Flag to track if startCapture has been executed
  const socketInitialized = useRef(false); // Flag to track if socket has been initialized
  const socket = useRef(null);

  useEffect(() => {
    if (!socketInitialized.current) {
      socketInitialized.current = true;
      socket.current = socketInit();
    }
  }, []);

  const provideRef = (instance, userId) => {
    console.log("Instance:", instance);
    console.log("UserId:", userId);
    audioElements.current[userId] = instance;
  };

  const addNewClient = useCallback((newClient, cb) => {
    console.log("New Client:", newClient);
    console.log("Clients:", clients);
    const lookinFor = clients.find((client) => client.id === newClient.id);

    if (!lookinFor) {
      setClients((existingClients) => [...existingClients, newClient], cb);
    }
  }, []);

  useEffect(() => {
    //Assigned audio elements
    console.log("Audio Elements:", audioElements.current);
  });

  //Capture media

  //   useEffect(() => {
  //     const startCapture = async () => {
  //       console.log("Starting media capture");
  //       try {
  //         localMediaStream.current = await navigator.mediaDevices.getUserMedia({
  //           audio: true,
  //         });
  //       } catch (error) {
  //         console.error("Error capturing media:", error);
  //       }
  //     };

  //     startCapture().then(() => {
  //       console.log("Local Media Stream:", localMediaStream.current);

  //       addNewClient(user, () => {
  //         console.log("Client added");
  //         console.log("Clients:", clients);
  //       })
  //     }, []);
  //   }, []);

  useEffect(() => {
    // Only execute if `captureStarted` is false
    if (!captureStarted.current) {
      captureStarted.current = true; // Mark as executed

      const startCapture = async () => {
        console.log("Starting media capture");
        try {
          localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
        } catch (error) {
          console.error("Error capturing media:", error);
        }
      };

      startCapture().then(() => {
        console.log("Local Media Stream:", localMediaStream.current);

        addNewClient(user, () => {
          console.log("Client added");

          const localElement = audioElements.current[user.id];
          if (localElement) {
            localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }

          //socket emit to other clients about new client JOIN
          socket.current.emit(ACTIONS.JOIN, { roomId, user });
        });
      });

      //Add other clients
    }

    return () => {
        //Leave room
        if (localMediaStream.current) {
            localMediaStream.current.getTracks().forEach((track) => track.stop());
        }
        socket.current.emit(ACTIONS.LEAVE, { roomId, user });
    }
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      console.log("PeerId:", peerId);
      console.log("Create Offer:", createOffer);
      console.log("Remote User:", remoteUser);

      // if already connected then give warning
      if (peerId in connections.current) {
        console.warn("Already connected to peer:", peerId, user.name);
        return;
      }

      // create new peer connection
      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      //Handle ice candidates
      connections.current[peerId].onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            icecandidate: event.candidate,
          });
        }
      };

      //Handle ontrack event on this peer connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        console.log("Remote Stream:", remoteStream);
        console.log("Remote User:", remoteUser);

        // const remoteElement = audioElements.current[remoteUser.id];
        // if (remoteElement) {
        //     remoteElement.srcObject = remoteStream;
        // }
        addNewClient(remoteUser, () => {
          console.log("Remote Client Added");

          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            console.warn("No audio element found for remote user:", remoteUser);
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      //Add local media stream to peer connection
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      //Create Offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        connections.current[peerId].setLocalDescription(offer);

        //Send offer to peer
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        })
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
        socket.current.off(ACTIONS.ADD_PEER);
    }
  }, []);

  //handle ice candidates
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
        socket.current.off(ACTIONS.ICE_CANDIDATE);
    }
  }, []);

  //handle session descriptions
  useEffect(() => {
    const handleRemoteSDP = async ({ peerId, sessionDescription: remoteDescription }) => {
        connections.current[peerId].setRemoteDescription(new RTCSessionDescription(remoteDescription));

        if (remoteDescription.type === "offer") {
            const connection = connections.current[peerId];
            const answer = await connection.createAnswer();
            connection.setLocalDescription(answer);

            //send answer to peer
            socket.current.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: answer,
            })
        }
    }

    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);

    return () => {
        socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    }
  }, []);

  //handle remove peer
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId  }) => {
        if (connections.current[peerId]) {
            connections.current[peerId].close();
        }

        delete connections.current[peerId]
        delete audioElements.current[userId]
        setClients(list => {
            return list.filter(client => client.id !== userId) 
        })
    }

    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
        socket.current.off(ACTIONS.LEAVE);
    }
  }, []);

  return {
    clients,
    provideRef,
  };
};
