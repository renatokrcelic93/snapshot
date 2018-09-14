import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";
import { auth, addUserSettingsPageInitialProps } from "../actions";
import moment from "moment";

import UserSettingsComponent from "../components/UserSettings";

class UserSettings extends React.Component {
  static async getInitialProps(context) {
    const { isServer, req, store } = context;

    // try to get token
    let token;
    if (isServer) {
      token = req.cookies.token;
    } else {
      token = getCookie("token");
    }

    // try to auth user by token
    if (token) {
      if (!store.getState().globalReducer.user) {
        await store.dispatch(auth(token));
      }
    }

    const initialProps = {};
    let user = null;
    if (!store.getState().globalReducer.user) {
      let userGet = {};
      try {
        userGet = await request2(token, config.endpoints.GET_USER_URL);
        // userGet = await request(token, {_id:id}, config.endpoints.USER_GET_URL)
      } catch (e) {
        return console.log("error laoding user", e);
      }

      user = userGet.data.data;

      user.avatar = userGet.profile_pic ? userGet.profile_pic.urls.s : "";
    } else {
      user = store.getState().globalReducer.user;
    }
    // TODO address parse -> dump délután mefoldja elvileg
    initialProps.user = { ...user };

    // dipatch data to store, User components gets data by querying the store directly
    store.dispatch(addUserSettingsPageInitialProps(initialProps));

    // need to return something
    return { SSR: "done" };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }
  render() {
    return (
      <div>
        <UserSettingsComponent />
      </div>
    );
  }
}

export default withRedux(initStore, null)(UserSettings);
