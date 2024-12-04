import { useState } from "react";
import StepOtp from "../components/shared/Steps/StepOtp";
import StepPhoneEmail from "../components/shared/Steps/StepPhoneEmail";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const Step = steps[currentStep];

  return (
    <div>
      <Step onNext={() => setCurrentStep(currentStep + 1)} />
    </div>
  );
};

export default Authenticate;
