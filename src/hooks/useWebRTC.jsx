import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import ACTIONS from "../actions";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);

  const audioElements = useRef({}); //store all the audio elements with user id as key against each element
  const connections = useRef({}); //store all the peer connections with user id as key against each connection
  const localMediaStream = useRef(null); //store the local media stream
  const captureStarted = useRef(false); // Flag to track if startCapture has been executed
  const socketInitialized = useRef(false); // Flag to track if socket has been initialized
  const socket = useRef(null);
  const clientsRef = useRef([]);

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

  //Capture Media
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

        addNewClient({...user, muted: true}, () => {
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
        addNewClient({...remoteUser, muted: true}, () => {
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

  useEffect(() => {
    clientsRef.current = clients
  }, [clients])

  //Listen for mute/unmute events
  useEffect(() => {
    socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
      setMute(true, userId)
    })

    socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
      setMute(false, userId)
    })

    const setMute = (mute, userId) => {
      const clientIdX = clientsRef.current.map(client => client.id).indexOf(userId)
      
      const connectedClient = JSON.parse(JSON.stringify(clientsRef.current))

      if(clientIdX > -1) {
        connectedClient[clientIdX].muted = mute
        setClients(connectedClient)
      }
    }
  }, [])

  //handle mute
  const handleMute = (isMute, userId) => {
    console.log("isMute", isMute);
    let settled = false;

    let interval = setInterval(() => {
      if(localMediaStream.current) {
        localMediaStream.current.getAudioTracks()[0].enabled = !isMute

        if(isMute) {
          socket.current.emit(ACTIONS.MUTE, {
            roomId,
            userId
          })
        } else {
          socket.current.emit(ACTIONS.UNMUTE, {
            roomId,
            userId
          })
        }
        settled = true
      }

      if(settled) {
        clearInterval(interval)
      }
    }, 200);
  }

  return {
    clients,
    provideRef,
    handleMute
  };
};


// import { useCallback, useEffect, useRef } from "react";
// import { useStateWithCallback } from "./useStateWithCallback";
// import { socketInit } from "../socket";
// import ACTIONS from "../actions";
// import freeice from "freeice";

// // Helper function to manage mute state
// const setMuteState = (clientsRef, setClients, mute, userId) => {
//   const clientIndex = clientsRef.current.findIndex(client => client.id === userId);
//   if (clientIndex > -1) {
//     const updatedClients = [...clientsRef.current];
//     updatedClients[clientIndex].muted = mute;
//     setClients(updatedClients);
//   }
// };

// export const useWebRTC = (roomId, user) => {
//   const [clients, setClients] = useStateWithCallback([]);
//   const audioElements = useRef({});
//   const connections = useRef({});
//   const localMediaStream = useRef(null);
//   const captureStarted = useRef(false);
//   const socketInitialized = useRef(false);
//   const socket = useRef(null);
//   const clientsRef = useRef([]);

//   /**
//    * Socket Initialization
//    */
//   useEffect(() => {
//     if (!socketInitialized.current) {
//       socketInitialized.current = true;
//       socket.current = socketInit();
//     }
//   }, []);

//   /**
//    * Provide audio element reference
//    */
//   const provideRef = (instance, userId) => {
//     audioElements.current[userId] = instance;
//   };

//   /**
//    * Add a new client to the list
//    */
//   const addNewClient = useCallback((newClient, cb) => {
//     const existingClient = clients.find(client => client.id === newClient.id);
//     if (!existingClient) {
//       setClients(existingClients => [...existingClients, newClient], cb);
//     }
//   }, [clients, setClients]);

//   /**
//    * Capture local media (audio)
//    */
//   useEffect(() => {
//     if (captureStarted.current) return;

//     captureStarted.current = true;

//     const startCapture = async () => {
//       try {
//         localMediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });

//         addNewClient({ ...user, muted: true }, () => {
//           const localElement = audioElements.current[user.id];
//           if (localElement) {
//             localElement.volume = 0;
//             localElement.srcObject = localMediaStream.current;
//           }

//           socket.current.emit(ACTIONS.JOIN, { roomId, user });
//         });
//       } catch (error) {
//         console.error("Error capturing media:", error);
//       }
//     };

//     startCapture();

//     return () => {
//       if (localMediaStream.current) {
//         localMediaStream.current.getTracks().forEach(track => track.stop());
//       }
//       socket.current.emit(ACTIONS.LEAVE, { roomId, user });
//     };
//   }, [addNewClient, roomId, user]);

//   /**
//    * Handle new peer connections
//    */
//   useEffect(() => {
//     const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
//       if (peerId in connections.current) return;

//       const peerConnection = new RTCPeerConnection({ iceServers: freeice() });
//       connections.current[peerId] = peerConnection;

//       peerConnection.onicecandidate = event => {
//         if (event.candidate) {
//           socket.current.emit(ACTIONS.RELAY_ICE, { peerId, icecandidate: event.candidate });
//         }
//       };

//       peerConnection.ontrack = ({ streams: [remoteStream] }) => {
//         addNewClient({ ...remoteUser, muted: true }, () => {
//           if (audioElements.current[remoteUser.id]) {
//             audioElements.current[remoteUser.id].srcObject = remoteStream;
//           } else {
//             const interval = setInterval(() => {
//               if (audioElements.current[remoteUser.id]) {
//                 audioElements.current[remoteUser.id].srcObject = remoteStream;
//                 clearInterval(interval);
//               }
//             }, 1000);
//           }
//         });
//       };

//       localMediaStream.current.getTracks().forEach(track => {
//         peerConnection.addTrack(track, localMediaStream.current);
//       });

//       if (createOffer) {
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);
//         socket.current.emit(ACTIONS.RELAY_SDP, { peerId, sessionDescription: offer });
//       }
//     };

//     socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

//     return () => socket.current.off(ACTIONS.ADD_PEER, handleNewPeer);
//   }, [addNewClient]);

//   /**
//    * Handle ICE candidates
//    */
//   useEffect(() => {
//     const handleIceCandidate = ({ peerId, icecandidate }) => {
//       if (connections.current[peerId] && icecandidate) {
//         connections.current[peerId].addIceCandidate(icecandidate);
//       }
//     };

//     socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);

//     return () => socket.current.off(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
//   }, []);

//   /**
//    * Handle session descriptions
//    */
//   useEffect(() => {
//     const handleSessionDescription = async ({ peerId, sessionDescription }) => {
//       const connection = connections.current[peerId];
//       await connection.setRemoteDescription(new RTCSessionDescription(sessionDescription));

//       if (sessionDescription.type === "offer") {
//         const answer = await connection.createAnswer();
//         await connection.setLocalDescription(answer);
//         socket.current.emit(ACTIONS.RELAY_SDP, { peerId, sessionDescription: answer });
//       }
//     };

//     socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleSessionDescription);

//     return () => socket.current.off(ACTIONS.SESSION_DESCRIPTION, handleSessionDescription);
//   }, []);

//   /**
//    * Remove peer connection
//    */
//   useEffect(() => {
//     const handleRemovePeer = ({ peerId, userId }) => {
//       if (connections.current[peerId]) {
//         connections.current[peerId].close();
//         delete connections.current[peerId];
//         delete audioElements.current[userId];
//         setClients(list => list.filter(client => client.id !== userId));
//       }
//     };

//     socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

//     return () => socket.current.off(ACTIONS.REMOVE_PEER, handleRemovePeer);
//   }, []);

//   /**
//    * Manage mute/unmute events
//    */
//   useEffect(() => {
//     socket.current.on(ACTIONS.MUTE, ({ userId }) => setMuteState(clientsRef, setClients, true, userId));
//     socket.current.on(ACTIONS.UNMUTE, ({ userId }) => setMuteState(clientsRef, setClients, false, userId));

//     return () => {
//       socket.current.off(ACTIONS.MUTE);
//       socket.current.off(ACTIONS.UNMUTE);
//     };
//   }, []);

//   /**
//    * Handle local mute/unmute
//    */
//   const handleMute = (isMute, userId) => {
//     if (localMediaStream.current) localMediaStream.current.getAudioTracks()[0].enabled = !isMute;

//     socket.current.emit(isMute ? ACTIONS.MUTE : ACTIONS.UNMUTE, { roomId, userId });
//   };

//   return { clients, provideRef, handleMute };
// };