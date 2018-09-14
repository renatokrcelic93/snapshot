import React from "react";
import NextError from "next/error";
import StylesWrapper from "../components/StylesWrapper";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    // if (this.props.statusCode) {
    //   return <NextError statusCode={this.props.statusCode} />
    // }

    return (
      <StylesWrapper>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <h1>OOPS!</h1>
              <p className="font-xl blue">
                We can’t seem to find the page you’re looking for. Please try
                refreshing this page, or going back.
              </p>
              <p className="font-xl blue">
                If the error happens again please email us at{" "}
                <b>support@vomo.org</b> so our team can get it fixed.
              </p>
            </div>
          </div>
        </div>
      </StylesWrapper>
    );
  }
}
