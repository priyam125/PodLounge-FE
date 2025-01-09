import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {

  const navigate = useNavigate();

  console.log("room", room);
  return (
    <div onClick={() => navigate(`/room/${room.id}`)} className="bg-[#1d1b1d] p-5 rounded-[10px] cursor-pointer flex flex-col gap-2">
      <h3 className="">{room.topic}</h3>
      <div className={`${room.speakers.length === 1 ? "gap-2" : "gap-5"} flex items-center relative`}>
        <div className="avatars">
          {room.speakers.map((speaker) => (
            <img
              key={speaker.id}
              src={speaker.avatar}
              alt="avatar"
              className={`${room.speakers.length === 1 ? "initial" : "absolute"} w-[40px] h-[40px] rounded-[50%] object-cover border-[2px] border-[#20bd5f] border-solid top-0 left-0 bg-[#1d1b1d] last:top-5 last:left-5`}
            />
          ))}
        </div>
        <div className={`${room.speakers.length === 1 ? "ml-[50px]" : "ml-[100px]"}`}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className="flex items-center gap-2">
              <span className="">{speaker.name}</span>
              <img src="/images/chat-bubble.png" className="" alt="avatar" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="">{room.totalPeople}</span>
        <img src="/images/people-count.png" alt="people" />
      </div>
    </div>
  );
};

export default RoomCard;
