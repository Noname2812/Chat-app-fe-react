import { ObjectToQuery } from "@/utils/functionHelper";
import axiosClient from "./axiosClient";

const URL = "/friend";
export const friendApi = {
  getAllFriends({ limit, offset, keySearch }) {
    return axiosClient.get(URL + ObjectToQuery({ limit, offset, keySearch }));
  },

  addFrend(body) {
    return axiosClient.post(URL + "add-friend", body);
  },
  replyRequestAddFriend(body) {
    return axiosClient.put(URL + "/update-request-add-friend", body);
  },
};
