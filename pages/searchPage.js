import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import Layout from "../components/Layout";
import SearchComponent from "../components/Search/index2";
import { auth } from "../actions";
import { getCookie } from "../utility/cookieHandler";

class Search extends React.Component {
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
        <SearchComponent />
      </div>
    );
  }
}

export default withRedux(initStore, null)(Search);
