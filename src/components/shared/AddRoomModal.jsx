import { useState } from "react";
import GoIcon from "./icons/GoIcon"
import TextInput from "./TextInput"
import { IoMdClose } from "react-icons/io";

const AddRoomModal = ({showModal, setShowModal}) => {

    const [selectedRoomType, setSelectedRoomType] = useState('Open');
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-[20px]">
        <div className="w-1/2 max-w-[500px] bg-[#1d1d1d] relative">
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5"><IoMdClose size={20} /></button>
            <div className="p-8 border-b-[2px] border-b-[#262626]">
                <h3 className="mb-1.5">Enter the topic to be discussed</h3>
                <TextInput fullwidth={true}/>
                <h2 className="text-lg my-2.5 font-bold">Room types</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div onClick={() => setSelectedRoomType('Open')} className={`${selectedRoomType === 'Open' ? 'bg-[#262626]' : ''} flex flex-col items-center p-2.5 rounded-[10px] cursor-pointer`}>
                        <img src="/images/Globe.png" alt="globe" className="" />
                        <span>Open</span>
                    </div>
                    <div onClick={() => setSelectedRoomType('Social')} className={`${selectedRoomType === 'Social' ? 'bg-[#262626]' : ''} flex flex-col items-center p-2.5 rounded-[10px] cursor-pointer`}>
                        <img src="/images/Users.png" alt="globe" className="" />
                        <span>Social</span>
                    </div>
                    <div onClick={() => setSelectedRoomType('Private')} className={`${selectedRoomType === 'Private' ? 'bg-[#262626]' : ''} flex flex-col items-center p-2.5 rounded-[10px] cursor-pointer`}>
                        <img src="/images/Lock.png" alt="globe" className="" />
                        <span>Private</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 p-7 text-center">
                <h2 className="text-lg font-bold">Start a room, open to everyone</h2>
                <button className="flex items-center gap-2 border-none outline-none bg-[#20bd5f] text-white py-2 px-8 rounded-[20px] hover:bg-[#16733b] transition-all ease-in-out duration-300"><GoIcon />Let's Go</button>
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal