import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAppStore } from "@/store";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  timeout: 300000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { user, setToken, logout } = useAppStore.getState();
    if (user) {
      const decodedToken = jwtDecode(user.token);
      const currentTime = dayjs();
      if (dayjs.unix(decodedToken.exp) < currentTime) {
        // get new token
        try {
          const data = await refreshToken({
            accessToken: user?.token?.accessToken,
            refreshToken: user?.token?.refreshToken,
          });
          config.headers["Authorization"] = `Bearer ${data.accessToken}`;
          setToken(data);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          logout();
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
    return response?.data?.value;
  },
  async (error) => {
    if (error.code === "ERR_BAD_REQUEST") {
      return Promise.reject(error?.response?.data?.detail);
    }
    return Promise.reject(error);
  }
);
const refreshToken = async ({ accessToken, refreshToken }) => {
  try {
    const response = await fetch(
      `${import.meta.env.API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};
export default axiosClient;
