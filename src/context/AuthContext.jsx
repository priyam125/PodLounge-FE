/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Loader from "../components/shared/Loader";
import { sendOtp as sendOtpApi, verifyOtp as verifyOtpApi } from "../api/authApi";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { toast } from "react-toastify";

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
  const [isInitializing, setIsInitializing] = useState(false)

  const initializeUserRef = useRef(false); // Tracks if initializeUser has run

  const initializeUser = async () => {
    // setIsLoading(true)
    setIsInitializing(true)
    try {
      const response = await axios.get(`${SERVER_URL}/auth/refresh-token`, {
        withCredentials: true,
      });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        // setAccessToken(response.data.accessToken);
        console.log("User initialized:", response.data.user);
      }
    } catch (error) {
      console.error("Failed to initialize user:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (!initializeUserRef.current) {
      initializeUserRef.current = true; // Mark as executed
      initializeUser();
    }
  }, []);


  // Function to send OTP
  const sendOtp = async (phone) => { 
    setIsLoading(true);
    try {
      const response = await sendOtpApi({ phone }); // Call API
      console.log("responseContext", response);
      setOtpData({ hash: response.data.hash, phone: response.data.phone }); // Store hash and phone
      console.log("OTP sent successfully", response.data);

      toast.success(`Your OTP is: ${response.data.otp}`, {
        position: "top-center",
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      {isInitializing ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };