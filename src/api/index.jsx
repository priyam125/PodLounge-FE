import axios from "axios";
import { SERVER_URL } from "../utils/index";
// import { LocalStorage } from "../utils";

// Create an Axios instance for API requests

console.log("SERVER_URL", SERVER_URL);
export const apiClient = axios.create({
  baseURL: SERVER_URL,
    withCredentials: true,
  //   timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


//Interceptor
apiClient.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest.isRetry = true

    try {
      const response = await axios.get(`${SERVER_URL}/auth/refresh-token`, {
        withCredentials: true
      })

      console.log(response)

      return apiClient.request(originalRequest)
    } catch (error) {
      console.log(error.message)
    }
  }
  throw error
})
