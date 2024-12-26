import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import LockIcon from "../icons/LockIcon";
import TextInput from "../TextInput";
import { useAuth } from "../../../context/AuthContext";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const { otpData, verifyOtp } = useAuth();

  const handleSubmit = async () => {
    if (!otp) return;
    try {
      if (!otpData) throw new Error("OTP data is missing");
      const { hash, phone } = otpData;

      await verifyOtp({ otp, hash, phone }); // Verify OTP via context function
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <Card
      title="Enter the code we just texted you"
      icon={<LockIcon />}
      className="w-full max-w-full"
    >
      <TextInput
        placeholder="Enter the OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="space-y-2">
        <div>
          <Button text="Next" onClick={handleSubmit} />
        </div>
        <p className="text-[#c4c5c5] w-[70%] mx-auto">
          By entering your code, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default StepOtp;