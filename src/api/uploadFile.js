import axiosClient from "./axiosClient";

const URL = "/upload";
export const uploadFile = {
  upload({ formData, type }) {
    return axiosClient.post(URL + "?type=" + type, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
