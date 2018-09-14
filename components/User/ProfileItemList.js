import React, { Component } from "react";
import ProfileItem from "./ProfileItem";

class ProfileItemList extends Component {
  _renderItems = () => {
    const { type } = this.props;
    return Array(3)
      .fill()
      .map(item => {
        return <ProfileItem type={type} data={item} />;
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">Title</div>
        </div>
        <div className="row">
          <div className="col-12">{this._renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default ProfileItemList;
