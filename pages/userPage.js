import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request2 } from "../utility/Request";
import { auth, addUserPageInitialProps } from "../actions";
import moment from "moment";

import UserComponent from "../components/User";

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

    let userGet = {};
    try {
      userGet = await request2(token, config.endpoints.GET_USER_URL);
    } catch (e) {
      return console.log("error laoding user", e);
    }
    const user = userGet.data.data;
    user.avatar = user.profile_pic ? user.profile_pic.urls.s : "";

    initialProps.user = { ...user };

    // get Project data
    let getHappenings = {};
    try {
      getHappenings = await request2(
        token,
        config.endpoints.GET_USER_PARTICIPATIONS_URL + `?page[size]=6`
      );
    } catch (e) {
      return console.log("error laoding projects", e);
    }
    const projects = [];
    getHappenings.data.data.map(happening => {
      const {
        anytime,
        anywhere,
        thumb,
        next_happening,
        organization
      } = happening.happening.project;
      const project = happening.happening.project;
      project.orgName = organization.name;
      project.projectTime = "adas";
      project.thumb = thumb ? thumb.urls.s : "";
      projects.push(project);
    });

    initialProps.projects = [...projects];

    // check if has more projects for infinite loading
    let hasMoreProjects;
    if (
      getHappenings.data.meta.current_page == getHappenings.data.meta.last_page
    ) {
      hasMoreProjects = false;
    } else {
      hasMoreProjects = true;
    }
    initialProps.user.infiniteUserProjectsData = {
      hasMore: hasMoreProjects,
      page: 1
    };

    // dipatch data to store, User components gets data by querying the store directly
    store.dispatch(addUserPageInitialProps(initialProps));

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
        <UserComponent />
      </div>
    );
  }
}

export default withRedux(initStore, null)(User);
