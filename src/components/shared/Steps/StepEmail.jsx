import { useState } from "react";
import Card from "../Card";
import EmailEmojiIcon from "../icons/EmailEmojiIcon";
import TextInput from "../TextInput";
import Button from "../Button";

const StepEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card
      className="w-full max-w-full"
      title="Enter your email"
      icon={<EmailEmojiIcon />}
    >
      <TextInput
        //   placeholder="Enter your phone number"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="space-y-2">
        <div className="">
          <Button text="Next" onClick={onNext} />
        </div>
        <p className="text-[#c4c5c5] w-[70%] mx-auto">
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default StepEmail;
