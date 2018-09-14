import axios from "axios";
export const request = async (token, data, url) => {
  return await axios({
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Token " + token : ""
    },
    data: {
      ...data
    },
    withCredentials: true
  });
};
export const request2 = (token, url, data = null, method = "get") => {
  return axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    data: data,
    withCredentials: false
  });
};
export const request3 = async (token, url, data = null, method = "get") => {
  return await axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    data: data,
    withCredentials: true
  });
};
