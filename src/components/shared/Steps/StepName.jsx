import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import GoggleEmojiIcon from "../icons/GoggleEmojiIcon";
import TextInput from "../TextInput";
import { useActivate } from "../../../context/ActivateContext";

const StepName = ({ onNext }) => {
  const { name ,setName } = useActivate();
  const [nameInput, setNameInput] = useState(name);

  const nextStep = () => {

    if(!nameInput) return;
    setName(nameInput);

    onNext();
  };
  return (
    <>
      <Card
        title="What’s your full name?"
        icon={<GoggleEmojiIcon />}
        className="w-full max-w-full"
      >
        <TextInput
          placeholder="Your name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <div className="space-y-2">
          <div>
            <Button text="Next" onClick={nextStep} />
          </div>
          <p className="text-[#c4c5c5] w-[70%] mx-auto">
            People use real names at codershouse :)
          </p>
        </div>
      </Card>
    </>
  );
};

export default StepName;
