import { ObjectToQuery } from "@/utils/functionHelper";
import axiosClient from "./axiosClient";

const URL = "/user";
export const userApi = {
  searchContact({ limit, offset, keySearch }) {
    return axiosClient.get(
      URL + "/search" + ObjectToQuery({ limit, offset, keySearch })
    );
  },

  getProfileByUserId({ userId }) {
    return axiosClient.get(URL + "/" + userId);
  },
  updateProfile(body) {
    return axiosClient.put(URL + "/change-info", body);
  },
};
