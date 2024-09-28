import { ObjectToQuery } from "@/utils/functionHelper";
import axiosClient from "./axiosClient";

const URL = "/message";
export const messageApi = {
  create(body) {
    return axiosClient.post(URL, body);
  },
  getMessages({ roomId, pageIndex, pageSize }) {
    return axiosClient.get(
      URL + ObjectToQuery({ roomId, pageIndex, pageSize })
    );
  },
};
