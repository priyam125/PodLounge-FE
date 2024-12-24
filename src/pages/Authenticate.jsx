import { useEffect, useState } from "react";
import StepOtp from "../components/shared/Steps/StepOtp";
import StepPhone from "../components/shared/Steps/StepPhone";
import StepEmail from "../components/shared/Steps/StepEmail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneAndroidIcon from "../components/shared/icons/PhoneAndroidIcon";
import EmailIcon from "../components/shared/icons/EmailIcon";
import { useAuth } from "../context/AuthContext";

const steps = [
  { id: 1, component: StepPhone, tab: "phone" },
  { id: 2, component: StepOtp, tab: "otp" },
];

const Authenticate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("phone");
  const { otpData, user } = useAuth();

  useEffect(() => {
    console.log("otpData", otpData);
    console.log("user", user);
  }, [otpData, user]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);

  // Determine the current step and component
  const currentStepDetails = steps.find((step) => step.id === currentStep);

  useEffect(() => {
    console.log("activeTab", activeTab);
    console.log("currentStep", currentStep);

    console.log("currentStepDetails", currentStepDetails);
  });
  const StepComponent =
    currentStep === 1 && activeTab === "email"
      ? StepEmail
      : currentStepDetails?.component;

  return (
    <div className="flex items-center justify-center mt-24">
      {currentStep === 1 && (
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="xl:w-2/5 w-3/5"
        >
          <TabsList className="bg-transparent flex items-end justify-end space-x-2">
            <TabsTrigger
              value="phone"
              className="bg-[#262626] data-[state=active]:bg-[#0077FF] flex items-center justify-center min-h-[60px] rounded-[10px]"
            >
              <PhoneAndroidIcon />
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="bg-[#262626] data-[state=active]:bg-[#0077FF] flex items-center justify-center min-h-[60px] rounded-[10px]"
            >
              <EmailIcon />
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="w-full">
            {StepComponent && <StepComponent onNext={handleNextStep} />}
          </TabsContent>
        </Tabs>
      )}
      {currentStep > 1 && StepComponent && (
        <div className="w-2/5">
          <StepComponent onNext={handleNextStep} />
        </div>
      )}
    </div>
  );
};

export default Authenticate;
