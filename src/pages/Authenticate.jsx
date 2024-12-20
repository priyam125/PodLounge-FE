import { useEffect, useState } from "react";
import StepOtp from "../components/shared/Steps/StepOtp";
import StepPhone from "../components/shared/Steps/StepPhone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneAndroidIcon from "../components/shared/icons/PhoneAndroidIcon";
import EmailIcon from "../components/shared/icons/EmailIcon";
import StepEmail from "../components/shared/Steps/StepEmail";
import { useAuth } from "../context/AuthContext";

const steps = {
  1: StepPhone || StepEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("phone");

  const { otpData, user } = useAuth();

  useEffect(() => {
    console.log("otpData", otpData);
    console.log("user", user);
  });

  

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const Step =
    activeTab === "phone" && currentStep === 1
      ? StepPhone
      : activeTab === "email" && currentStep === 1
      ? StepEmail
      : steps[currentStep];

  return (
    <div className="flex items-center justify-center mt-24">
      {/* <Step onNext={() => setCurrentStep(currentStep + 1)} /> */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-2/5"
      >
        {currentStep === 1 && (
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
        )}
        <TabsContent value="phone" className="w-full">
          {/* <StepPhone /> */}
          <Step onNext={() => setCurrentStep(currentStep + 1)} />
        </TabsContent>
        <TabsContent value="email" className="w-full">
          {/* <StepEmail /> */}
          <Step onNext={() => setCurrentStep(currentStep + 1)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authenticate;
