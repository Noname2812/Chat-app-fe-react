import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { refreshToken } from "@/api/refreshToken";
import { useAppStore } from "@/store";

let refreshTokenPromise = null;

export const getToken = async () => {
  const {
    user,
    token,
    setRefreshToken,
    reset,
    isRefreshingToken,
    setIsRefreshingToken,
  } = useAppStore.getState();

  if (!token?.accessToken) {
    reset();
    return null;
  }

  if (!isTokenExpired(token.accessToken)) {
    return token;
  }

  if (isRefreshingToken && refreshTokenPromise) {
    return refreshTokenPromise;
  }

  setIsRefreshingToken(true);
  refreshTokenPromise = refreshToken({
    userId: user.id,
    refreshToken: token.refreshToken,
  })
    .then((data) => {
      setRefreshToken(data);
      setIsRefreshingToken(false);
      refreshTokenPromise = null;
      return data;
    })
    .catch((error) => {
      setIsRefreshingToken(false);
      refreshTokenPromise = null;
      reset();
      throw error;
    });

  return refreshTokenPromise;
};

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
