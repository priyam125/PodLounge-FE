/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import Loader from "../components/shared/Loader";
import { sendOtp as sendOtpApi, verifyOtp as verifyOtpApi } from "../api/authApi";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext(null);

// Hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpData, setOtpData] = useState(null);

  // Function to send OTP
  const sendOtp = async (phone) => {
    setIsLoading(true);
    try {
      const response = await sendOtpApi({ phone }); // Call API
      console.log("responseContext", response);
      setOtpData({ hash: response.data.hash, phone: response.data.phone }); // Store hash and phone
      console.log("OTP sent successfully", response.data);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtp = async ({ otp, hash, phone }) => {
    setIsLoading(true);
    try {
      const response = await verifyOtpApi({ otp, hash, phone }); // Call API
      setUser(response.data.user); // Store user data
      setAccessToken(response.data.accessToken); // Store access token if provided
      console.log("OTP verified successfully", response.data);
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        otpData,
        setOtpData,
        sendOtp,
        verifyOtp,
      }}
    >
      {isLoading && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };