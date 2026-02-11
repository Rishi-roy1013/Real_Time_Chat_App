import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-server-cqtf.onrender.com/api",
  withCredentials: true,
});
