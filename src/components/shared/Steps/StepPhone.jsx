import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import PhoneIcon from "../icons/PhoneIcon";
import TextInput from "../TextInput";
import { useAuth } from "../../../context/AuthContext";

const StepPhone = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const { sendOtp } = useAuth();

  const handleSubmit = async () => {
    if (!phone) {
      // alert("Please enter a phone number");
      return;
    }

    try {
      const response = await sendOtp(phone); // Send OTP via context function

      console.log("response", response);
      onNext(); // Navigate to the next step
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

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
        <div>
          <Button text="Next" onClick={handleSubmit} />
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
