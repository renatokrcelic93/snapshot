import React from "react";
import { connect } from "react-redux";
import { getCookie } from "../../utility/cookieHandler";
import Link from "next/link";
import {
  acceptInvitation,
  setModal,
  rejectInvitation,
  auth
} from "../../actions";
import { bindActionCreators } from "redux";
import config from "../../config";

class OrgInvitation extends React.Component {
  // componentDidMount() {
  //   const {user} = this.props
  //   console.log('user', user)
  // }

  _handleReject = async () => {
    const {
      rejectInvitation,
      setModal,
      user: { invitations }
    } = this.props;
    const verification_token = invitations[0].id;
    const token = getCookie("token");
    await rejectInvitation(verification_token, token);
    auth(token);
    return setModal({ modalData: { openModal: false, content: null } });
  };
  _handleAccept = async () => {
    const {
      acceptInvitation,
      setModal,
      user: { invitations }
    } = this.props;
    const verification_token = invitations[0].id;
    const token = getCookie("token");
    await acceptInvitation(verification_token, token);
    auth(token);
    return setModal({ modalData: { openModal: false, content: null } });
  };

  _getLanguage = invitations => {
    const invitation = invitations[0];
    switch (invitation.role) {
      case "VOLUNTEER":
        return "to volunteer with them on VOMO";
      case "ORGANIZER":
        return "to become an organizer";
      case "ADMIN":
        return "to become an administrator";
      default:
        return null;
    }
  };

  render() {
    const {
      user: { invitations }
    } = this.props;
    const orgName = invitations[0].organization.name;
    const language = this._getLanguage(invitations);
    return (
      <div className="root">
        <img
          className="alert_icon"
          src={
            invitations[0].organization.logo
              ? invitations[0].organization.logo.urls.s
              : ""
          }
        />
        <h2>{orgName}</h2>
        <p>
          {orgName} has invited you {language}.
        </p>
        <div onClick={this._handleReject} className="button reject">
          Reject
        </div>
        <div onClick={this._handleAccept} className="button">
          Accept
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
          .button.reject {
            border: 1px solid white;
            background: transparent;
          }
          .alert_icon {
            width: 200px;
            height: 200px;
            padding: 20px;
            background: #fff;
            border-radius: 50%;
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

const md = dispatch => {
  return {
    setModal: bindActionCreators(setModal, dispatch),
    acceptInvitation: bindActionCreators(acceptInvitation, dispatch),
    rejectInvitation: bindActionCreators(rejectInvitation, dispatch)
  };
};

const ms = store => {
  const { modalData, user } = store.globalReducer;
  return {
    modalData,
    user
  };
};

export default connect(
  ms,
  md
)(OrgInvitation);
