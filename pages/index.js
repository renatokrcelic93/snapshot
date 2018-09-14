import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import Layout from "../components/Layout";
import Hub from "./hubPage";
import Router from "next/router";
import { auth } from "../actions";
// import Slider from "react-slick";
import Slider from "../components/Slider";
import { getCookie } from "../utility/cookieHandler";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";

class App extends React.Component {
  static async getInitialProps(context) {
    const { isServer, req, res, store } = context;

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

    if (isServer) {
      res.redirect("/hub");
    } else {
      Router.push("/hubPage", "/hub");
    }
    return { SSR: "done" };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Layout {...this.props}>Loading...</Layout>
      </div>
    );
  }
}

export default withRedux(initStore, null)(App);
