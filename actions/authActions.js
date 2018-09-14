import axios from "axios";
import { setCookie } from "../utility/cookieHandler";
import config from "../config";

export const auth = token => {
  return async dispatch => {
    try {
      const resp = await axios({
        method: "get",
        url: config.endpoints.GET_USER_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {},
        withCredentials: false
      });
      const user = resp.data.data;
      user.avatar = user.profile_pic ? user.profile_pic.urls.s : "";
      return dispatch({ type: "SET_USER", payload: user });
    } catch (err) {
      console.log("error authenticating user", err);
      return dispatch({ type: "SET_USER", payload: null });
    }
  };
};
