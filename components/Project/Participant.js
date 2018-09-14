import React, { Component } from "react";

class Participant extends Component {
  render() {
    const { avatar, participant, text } = this.props;
    if (participant) {
      return (
        <div className="avatar_container">
          <div className="avatar" />
          <style jsx>{`
            .avatar {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background-image: url(${avatar});
              background-position: 50% 50%;
              background-size: cover;
            }
            .avatar_container {
              display: inline-block;
              margin-right: 8px;
            }
          `}</style>
        </div>
      );
    } else {
      return (
        <div id="project_signup_avatar" className="avatar_container">
          <div className="avatar_placeholder vomo-grey bold font-xxs">
            {text}
          </div>
          <style jsx>{`
            .avatar_placeholder {
              width: 45px;
              line-height: 45px;
              overflow: hidden;
              padding-top: 0px;
              background-color: #e9e9e9;
              background-image: none;
              text-align: center;
              text-transform: uppercase;
              cursor: default;
              border-radius: 50%;
            }
            .avatar_container {
              display: inline-block;
              margin-right: 8px;
            }
          `}</style>
        </div>
      );
    }
  }
}

export default Participant;
