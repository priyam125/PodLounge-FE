import { useState } from "react";
import AddRoomModal from "../components/shared/AddRoomModal.jsx";
import RoomIcon from "../components/shared/icons/RoomIcon.jsx";
import SearchIcon from "../components/shared/icons/SearchIcon.jsx";
import RoomCard from "../components/shared/RoomCard.jsx";
import { containerStyles } from "../utils/index.js";

const dummyRooms = [
  {
    id: 1,
    topic: "What is React?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isHost: true,
      },
      {
        id: 2,
        name: "HHUdkks js",
        avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
        isHost: false,
      },
    ],
    totalPeople: 10,
  },
  //create 2 more rooms with different data
  {
    id: 2,
    topic: "Why is React so cool?",
    speakers: [
      {
        id: 1,
        name: "Jonny Doe",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isHost: true,
      },
      {
        id: 2,
        name: "Mortal Kombat",
        avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
        isHost: false,
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "When will React be released?",
    speakers: [
      {
        id: 1,
        name: "Rega Doe",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isHost: true,
      },
      {
        id: 2,
        name: "Kash js",
        avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
        isHost: false,
      },
    ],
    totalPeople: 30,
  },
  {
    id: 3,
    topic: "When will React be released?",
    speakers: [
      {
        id: 1,
        name: "Rega Doe",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        isHost: true,
      },
      {
        id: 2,
        name: "Kash js",
        avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
        isHost: false,
      },
    ],
    totalPeople: 30,
  },
];
const Rooms = () => {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={`${containerStyles}`}>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center gap-5">
            <span className="text-lg font-bold after:content-[''] after:block after:w-[60%] after:h-[4px] after:bg-[#0077ff] after:bottom-4">
              All Voice Rooms
            </span>
            <div className="bg-[#262626] flex items-center px-2.5 min-w-[300px] rounded-[20px]">
              <SearchIcon />
              <input
                type="text"
                className="bg-transparent border-none outline-none p-2.5 text-white w-full"
              />
            </div>
          </div>
          <div className="right">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#20bd5f] py-2.5 px-5 border-none outline-none rounded-[20px] text-white font-bold hover:bg-[#0f6632] transition-all ease-in-out duration-300">
              <RoomIcon />
              <span className="text-lg font-bold">Start a room</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-16">
          {dummyRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal showModal={showModal} setShowModal={setShowModal}/>}
    </>
  );
};

export default Rooms;
