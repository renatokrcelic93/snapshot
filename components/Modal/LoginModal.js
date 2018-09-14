import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import config from "../../config";

class Login extends React.Component {
  componentDidMount() {
    // const {joinProjectData:{project}} = this.props
    // console.log(project)
  }

  _handleLogin = () => {
    const login_href =
      config.endpoints.ACCOUNTS_URL +
      "/login?redirect=" +
      encodeURIComponent(location.href);
    return window.open(login_href, "_blank");
  };

  _handleCreate = () => {
    const {
      joinProjectData: { project }
    } = this.props;
    const login_href =
      config.endpoints.ACCOUNTS_URL +
      "/invite/org/" +
      project.org_envelope +
      "?redirect=" +
      encodeURIComponent(location.href);
    return window.open(login_href, "_blank");
  };

  render() {
    return (
      <div className="root">
        <img className="alert_icon" src="../../static/alert.png" />
        <h2>You need to login to continue.</h2>
        <p>
          To join projects on VOMO you need to be logged in to your account.
        </p>
        <div onClick={this._handleLogin} className="button">
          Login
        </div>
        <div onClick={this._handleCreate} className="button">
          Create an Account
        </div>
        <style jsx>{`
          .root {
            display: block;
            width: 600px;
            max-width: 100%;
            margin-right: auto;
            margin-left: auto;
            color: #fff;
            text-align: center;
          }
          .alert_icon {
            width: 100px;
            height: 100px;
            margin-left: 0;
            margin-right: 0;
          }
          h2 {
            padding-right: 1px;
            font-size: 35px;
            line-height: 1;
            font-weight: 400;
            letter-spacing: -1px;
          }
          p {
            margin-bottom: 15px;
            line-height: 1.4;
            margin-bottom: 40px;
          }
          .button {
            cursor: pointer;
            position: relative;
            padding: 15px 25px;
            border-radius: 3px;
            transition: background-color 200ms ease;
            color: #fff;
            font-size: 16px;
            line-height: 1em;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            display: inline-block;
            margin-right: 10px;
            margin-left: 10px;
            border: 1px none #fff;
            background-color: #1a287f;
          }
        `}</style>
      </div>
    );
  }
}

const ms = store => {
  const { modalData, joinProjectData } = store.globalReducer;
  return {
    modalData,
    joinProjectData
  };
};

export default connect(ms)(Login);
