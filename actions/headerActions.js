import config from "../config";
import { request, request2 } from "../utility/Request";

export const getCategories = initialProps => {
  return async dispatch => {
    try {
      const catNames = await request2(
        null,
        config.endpoints.GET_CATEGORIES_URL2
      );
      return dispatch({
        type: "ADD_HEADER_CATEGORIES",
        payload: catNames.data.data
      });
    } catch (e) {
      console.log("error getting categories for header", e);
    }
  };
};
export const setShowSearchInput = bool => {
  return async dispatch => {
    return dispatch({ type: "SET_SHOW_SEARCH_INPUT", payload: bool });
  };
};
