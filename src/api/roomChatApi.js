import { ObjectToQuery } from "@/utils/functionHelper";
import axiosClient from "./axiosClient";

const URL = "/roomchats";
export const roomChatApi = {
  getAll({ limit, offset, keySearch }) {
    return axiosClient.get(URL + ObjectToQuery({ limit, offset, keySearch }));
  },
  getById({ roomId, offset, limit }) {
    return axiosClient.get(
      URL + "/" + roomId + ObjectToQuery({ offset, limit })
    );
  },
};
