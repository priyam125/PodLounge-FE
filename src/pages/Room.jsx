import { useWebRTC } from "../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { containerStyles } from "../utils";

const Room = () => {
  const { roomId } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("RoomId:", roomId);
    console.log("User:", user);
  });

  const { clients, provideRef } = useWebRTC(roomId, user);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  return (
    <div className="gap-8 flex flex-col">
      <div className={`${containerStyles}`}>
        <button
          onClick={handleManualLeave}
          className="flex items-center gap-2 bg-none outline-none mt-2"
        >
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span className="relative font-bold text-white text-lg after:content-[''] after:absolute after:bottom-[-16px] after:left-0 after:w-3/5 after:h-1 after:bg-[#0077ff] after:rounded-[10px]">
            All Voice Rooms
          </span>
        </button>
      </div>
      <div className="bg-[#1d1d1d] mt-4 rounded-tr-[20px] rounded-tl-[20px] min-h-[calc(100vh-170px)] p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Nodejs is cool</h2>
          <div className="flex items-center gap-4">
            <button className="bg-[#262626] outline-none flex items-center py-[0.7rem] px-4 rounded-[20px] text-white transition-all duration-300 ease-in-out hover:bg-[#333333]">
              <img src="/images/palm.png" alt="palm" />
            </button>
            <button
              className="bg-[#262626] outline-none flex items-center py-[0.7rem] px-4 rounded-[20px] text-white transition-all duration-300 ease-in-out hover:bg-[#333333] gap-2"
              onClick={handleManualLeave}
            >
              <img src="/images/win.png" alt="win" />
              <span className="font-bold ">Leave</span>
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          {clients.map((client) => (
            <div key={client.id} className="flex flex-col items-center">
              <div className="bg-pink-300 w-[100px] h-[100px] rounded-[50%] border-[3px] border-[#5453e0] border-solid">
                <audio
                  ref={(instance) => provideRef(instance, client.id)}
                  // controls
                  autoPlay
                ></audio>
                <img
                  className="w-full h-full rounded-[50%] object-cover"
                  src={client.avatar}
                  alt="avatar"
                />

                <button className="absolute bg-[#212121] outline-none bottom-0 right-0 w-7 h-7 box-content rounded-[30px] p-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:bg-[#333333]">
                  <img src="/images/mic-mute.png" alt="mic" />
                </button>
              </div>
              <h4 className="mt-2">{client.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
