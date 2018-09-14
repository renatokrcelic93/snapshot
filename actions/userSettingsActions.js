import { request, request2 } from "../utility/Request";
import config from "../config";
import axios from "axios";

export const addUserSettingsPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_USER_SETTINGS_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};
export const updateUserData = (data, token, endpoint) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      const result = await request2(token, endpoint, data, "put");
      return dispatch({ type: "UPDATE_USER_DATA", payload: data });
    } catch (err) {
      return dispatch({
        type: "USER_SETTINGS_ERROR",
        payload: err.response.data.message
      });
    }
  };
};
export const updateUserAvatar = (data, token, endpoint) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append("profile_pic", data.data);
      const result = await request2(token, endpoint, formData, "post");
      const resp = await request2(token, config.endpoints.GET_USER_URL);
      const user = resp.data.data;
      user.avatar = user.profile_pic ? user.profile_pic.urls.s : "";
      return dispatch({ type: "SET_USER", payload: user });
    } catch (err) {
      console.log("update user data error", err.response.data.error);
      return dispatch({
        type: "USER_SETTINGS_ERROR",
        payload: err.response.data.error
      });
    }
  };
};
export const updateUserSettingsPageError = data => {
  return async dispatch => {
    return dispatch({ type: "USER_SETTINGS_ERROR", payload: data });
  };
};
