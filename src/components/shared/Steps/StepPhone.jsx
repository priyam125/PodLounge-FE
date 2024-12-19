import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import PhoneIcon from "../icons/PhoneIcon";
import TextInput from "../TextInput";

const StepPhone = ({ onNext }) => {
  const [phone, setPhone] = useState("");

  return (
    <Card
      title="Enter your phone number"
      icon={<PhoneIcon />}
      className="w-full max-w-full"
    >
      <TextInput
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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

export default StepPhone;
