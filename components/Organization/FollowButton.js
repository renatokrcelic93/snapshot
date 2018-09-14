import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";

class Follow extends Component {
  _renderFollowing = () => {
    const { _handleUnfollow } = this.props;
    return (
      <div>
        <div
          id="org_following"
          onClick={_handleUnfollow}
          className="following_button font-s bold"
        >
          Following
        </div>
        <style jsx>{`
          .following_button {
            display: inline-block;
            width: auto;
            border: 1px solid #6eca97;
            border-radius: 30px;
            background-color: #6eca97;
            color: white;
            text-align: center;
            position: relative;
            margin-right: 1px;
            margin-left: 1px;
            padding: 8px 15px;
            -webkit-transition: background-color 200ms ease;
            transition: background-color 200ms ease;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  };
  _renderFollow = () => {
    const { _handleFollow } = this.props;
    return (
      <div>
        <div
          id="org_follow"
          onClick={_handleFollow}
          className="follow_button font-s bold"
        >
          Follow
        </div>
        <style jsx>{`
          .follow_button {
            display: inline-block;
            width: auto;
            border: 1px solid #8f9aa3;
            border-radius: 30px;
            background-color: white;
            color: #8f9aa3;
            text-align: center;
            position: relative;
            margin-right: 1px;
            margin-left: 1px;
            padding: 8px 15px;
            -webkit-transition: background-color 200ms ease;
            transition: background-color 200ms ease;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
          }
          .follow_button:hover {
            border: 1px solid #6eca97;
          }
          .follow_button_label {
            display: inline-block;
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 5px;
            color: #8f9aa3;
            font-style: italic;
          }
        `}</style>
      </div>
    );
  };

  render() {
    const { organization, user } = this.props;
    if (user) {
      const following = user.followed_orgs.find(
        org => org.slug == organization.slug
      );
      // const following = user.followed_orgs.find.includes(organization._id)
      if (following) {
        return this._renderFollowing();
      } else {
        return this._renderFollow();
      }
    } else {
      return this._renderFollow();
    }
  }
}

export default Follow;
