import React from "react";
import Link from "next/link";

class Login extends React.Component {
  render() {
    return (
      <div className="root">
        <img className="alert_icon" src="../../static/alert.png" />
        <h2 className="normal font-xxl">You are almost there!</h2>
        <p className="font-xl">
          To finalize the e-mail address update, click on the link contained in
          the email we have just sent you.
        </p>
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
            letter-spacing: -1px;
          }
          p {
            margin-bottom: 15px;
            margin-bottom: 40px;
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
