import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    toast.error("Failed to connect to server.");
  }
);

export default api;
