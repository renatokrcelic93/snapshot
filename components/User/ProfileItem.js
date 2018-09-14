import React, { Component } from "react";

class ProfileItem extends Component {
  _renderItem = () => {
    const { data, type } = this.props;
    switch (type) {
      case "project":
        return (
          <div className="row">
            <div className="col-2">Image</div>
            <div className="col-10">Title</div>
          </div>
        );
      case "org":
        return (
          <div className="row">
            <div className="col-2">OrgImage</div>
            <div className="col-10">Title</div>
          </div>
        );
      case "vol":
        return (
          <div className="row">
            <div className="col-12">Title</div>
          </div>
        );
      default:
        return null;
    }
  };
  render() {
    return (
      <div className="container separator">
        {this._renderItem()}
        <style jsx>{`
          .separator {
            border-bottom: 1px solid black;
          }
        `}</style>
      </div>
    );
  }
}

export default ProfileItem;
