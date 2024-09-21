import axios from "axios";
import { useAppStore } from "@/store";
import { refreshToken } from "./refreshToken";
import { isTokenExpired } from "@/utils/tokenHelpers";

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
    const { user, setRefreshToken, logOut } = useAppStore.getState();
    if (user) {
      if (isTokenExpired(user?.token?.accessToken)) {
        try {
          const data = await refreshToken({
            userId: user.id,
            refreshToken: user?.token?.refreshToken,
          });
          config.headers["Authorization"] = `Bearer ${data.accessToken}`;
          setRefreshToken(data);
        } catch (error) {
          console.log(error);
          logOut();
        }
      } else {
        config.headers["Authorization"] = `Bearer ${user?.token?.accessToken}`;
      }
    }
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
