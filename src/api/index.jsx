import axios from "axios";
import { SERVER_URL } from "../utils/index";
// import { LocalStorage } from "../utils";

// Create an Axios instance for API requests

console.log("SERVER_URL", SERVER_URL);
export const apiClient = axios.create({
  baseURL: SERVER_URL,
  //   withCredentials: true,
  //   timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
