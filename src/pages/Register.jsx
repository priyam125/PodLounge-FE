import { useState } from "react";
import StepPhoneEmail from "../components/shared/Steps/StepPhoneEmail";
import StepOtp from "../components/shared/Steps/StepOtp";
import StepName from "../components/shared/Steps/StepName";
import StepAvatar from "../components/shared/Steps/StepAvatar";
import StepUsername from "../components/shared/Steps/StepUsername";

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername,
}

const Register = () => {

    const [currentStep, setCurrentStep] = useState(1);

    const Step = steps[currentStep];
  return (
    <div>
        <Step onNext={() => setCurrentStep(currentStep + 1)} />
    </div>
  )
}

export default Register