import { apiClient } from ".";

export const sendOtp = (data) => {
  return apiClient.post("/auth/send-otp", data);
};

export const verifyOtp = (data) => {
  return apiClient.post("/auth/verify-otp", data);
};

export const activate = (data) => {
  return apiClient.post("/activate", data);
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};

