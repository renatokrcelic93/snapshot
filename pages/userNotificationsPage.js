import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request2 } from "../utility/Request";
import {
  auth,
  addNotificationPageInitialProps,
  mapNotifications
} from "../actions";
import moment from "moment";

import UserNotificationsComponent from "../components/UserNotifications";

class User extends React.Component {
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

    // get Notifications data
    // TODO kellenek példa notik hogy tudjam megfelelően osztályozni őket -> késpbb kapom
    const notificationData = await request2(
      token,
      config.endpoints.GET_NOTIFICATIONS_URL + `?page[size]=1000`
    );
    console.log("notificationData", notificationData);
    const notifications = mapNotifications(notificationData.data.data);
    initialProps.notifications = [...notifications];

    // check if has more notis for infinite loading
    let hasMoreNotifications;
    if (
      notificationData.data.meta.current_page ==
      notificationData.data.meta.last_page
    ) {
      hasMoreNotifications = false;
    } else {
      hasMoreNotifications = true;
    }

    initialProps.infiniteNotificationsData = {
      hasMore: hasMoreNotifications,
      page: 1
    };

    // dipatch data to store, Notifications components gets data by querying the store directly
    store.dispatch(addNotificationPageInitialProps(initialProps));

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
        <UserNotificationsComponent />
      </div>
    );
  }
}

export default withRedux(initStore, null)(User);
