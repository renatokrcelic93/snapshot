import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div className="container margin-top-15">
        <div className="row">
          <div className="col-12 text-center">
            <img
              className="loader"
              src="../../static/loading-logo.svg"
              alt="loading..."
            />
          </div>
        </div>
        <style jsx>{`
          .loader {
            width: 100px;
            height: 100px;
          }
        `}</style>
      </div>
    );
  }
}

export default Loader;
