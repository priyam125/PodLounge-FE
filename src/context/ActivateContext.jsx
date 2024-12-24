import { createContext, useContext, useState } from "react";
import { activate } from "../api/authApi";
import { useAuth } from "./AuthContext";

const ActivateContext = createContext();

export const useActivate = () => useContext(ActivateContext);

export const ActivateProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null); // Placeholder for the user's avatar

  const {user, setUser} = useAuth();

  const submitActivation = async () => {
    try {
      const payload = { name, avatar }; // Include name and avatar in the payload
      console.log("Submitting activation data:", payload);

      // Make API call to submit the activation data
      // Example: await api.submitActivation(payload);

      const {data} = await activate({name, avatar});
      console.log("data", data);

      if(data.auth) {
        //set user to data.user
        setUser(data.user);
      }

      alert("Activation data submitted successfully!");
    } catch (error) {
      console.error("Failed to submit activation data:", error);
    }
  };

  return (
    <ActivateContext.Provider value={{ name, setName, avatar, setAvatar, submitActivation }}>
      {children}
    </ActivateContext.Provider>
  );
};