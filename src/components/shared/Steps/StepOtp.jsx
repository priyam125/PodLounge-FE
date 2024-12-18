import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import LockIcon from "../icons/LockIcon";
import TextInput from "../TextInput";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  return (
    <Card
      title="Enter the code we just texted you"
      icon={<LockIcon />}
      className="w-full max-w-full"
    >
      <TextInput
        placeholder="Enter your phone number"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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

export default StepOtp;
