import { useState } from "react";
import { useActivate } from "../../../context/ActivateContext";
import Button from "../Button";
import Card from "../Card";
import MonkeyEmojiIcon from "../icons/MonkeyEmojiIcon";

const StepAvatar = ({ onNext }) => {
  const { name, setAvatar, submitActivation } = useActivate();
  const [image, setImage] = useState("/images/cat.png");

  const handleSubmit = () => {
    submitActivation();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setAvatar(reader.result);
      };

      
    }
  }
  return (
    <Card
      title={`Okay, ${name}`}
      icon={<MonkeyEmojiIcon />}
      className="w-full max-w-full"
    >
      <p className="text-[#c4c5c5] text-center mt-[-1.5rem]">
        How's this photo?
      </p>
      <div className="h-[100px] w-[100px] border-[6px] border-solid border-[#0077ff] rounded-[50%] flex items-center justify-center overflow-hidden">
        <img className="h-full w-full object-cover" src={image} alt="" />
      </div>
      <div>
        <input type="file" name="avatar" id="avatarInput" className="hidden" onChange={handleImageChange} />
        <label
          htmlFor="avatarInput"
          className="text-[#0077ff] cursor-pointer"
        >
          Choose a different photo
        </label> 
      </div>
      <div className="space-y-2">
        <div>
          <Button text="Next" onClick={handleSubmit} />
        </div>
      </div>
    </Card>
  );
};

export default StepAvatar;
