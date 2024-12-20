import { apiClient } from ".";

export const sendOtp = (data) => {
  return apiClient.post("/auth/send-otp", data);
};

export const verifyOtp = (data) => {
  return apiClient.post("/auth/verify-otp", data);
};

