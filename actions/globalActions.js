import config from "../config";
import { request } from "../utility/Request";

export const setGeolocation = geo => {
  return async dispatch => {
    return dispatch({ type: "SET_GEO", payload: geo });
  };
};
