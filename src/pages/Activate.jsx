import { useState } from "react";
import StepName from "../components/shared/Steps/StepName";
import StepAvatar from "../components/shared/Steps/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
  // 3: StepUsername
}

const Activate = () => {

  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep(step + 1);
  }

  const StepComponent = steps[step];
  return (
    <div className="flex items-center justify-center mt-24 w-3/5 xl:w-2/5 mx-auto"><StepComponent onNext={onNext} /></div>
  )
}

export default Activate