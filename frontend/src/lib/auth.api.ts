import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

interface LoginPayload {
  email: string;
  password: string;
  captchaToken: string;
  captchaAnswer: string;
}

const authApi = {
  async getCaptcha() {
    const { data } = await api.get("/auth/captcha");
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
};

export default authApi;