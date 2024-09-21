import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { refreshToken } from "@/api/refreshToken";
import { useAppStore } from "@/store";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    return dayjs.unix(decodedToken.exp).isBefore(dayjs());
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

let refreshPromise = null;

export const getToken = async () => {
  const { user, setRefreshToken, logOut } = useAppStore.getState();

  if (!user?.token?.accessToken) {
    logOut();
    return null;
  }

  if (!isTokenExpired(user.token.accessToken)) {
    return user.token;
  }

  if (!refreshPromise) {
    refreshPromise = refreshToken({
      userId: user.id,
      refreshToken: user.token.refreshToken,
    })
      .then((data) => {
        setRefreshToken(data);
        refreshPromise = null;
        return data;
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        logOut();
        refreshPromise = null;
        throw error;
      });
  }

  return refreshPromise;
};
