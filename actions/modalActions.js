export const setModal = modalData => {
  return async dispatch => {
    return dispatch({ type: "SET_MODAL", payload: modalData });
  };
};
