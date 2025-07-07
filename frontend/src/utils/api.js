import axios from "axios";
import { getTokenFromCookie } from "./AuthProvider";

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
