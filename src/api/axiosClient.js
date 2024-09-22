import { getToken } from "@/utils/tokenHelpers";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  timeout: 50000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    if (error.code === "ERR_BAD_REQUEST") {
      return Promise.reject(error?.response?.data?.detail);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
