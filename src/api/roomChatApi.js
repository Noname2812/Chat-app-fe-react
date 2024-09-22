import { ObjectToQuery } from "@/utils/functionHelper";
import axiosClient from "./axiosClient";

const URL = "/roomchats";
export const roomChatApi = {
  getAll({ limit, offset }) {
    return axiosClient.get(URL + ObjectToQuery({ limit, offset }));
  },
  getById(roomId) {
    return axiosClient.post(URL + roomId);
  },
};
