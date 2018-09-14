import React, { Component } from "react";

class StatSection extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">Icon</div>
          <div className="col-10">Title</div>
        </div>
        <div className="row">
          <div className="col-12">Description</div>
        </div>
      </div>
    );
  }
}

export default StatSection;
