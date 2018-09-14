import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal, leaveProject } from "../../actions";
import JoinProjectClose from "../../components/Modal/JoinProjectClose";
import JoinProjectGuests from "../../components/Modal/JoinProjectGuests";
import moment from "moment";
import { getCookie } from "../../utility/cookieHandler";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  colors: { vomo_green, vomo_black, vomo_blue, vomo_grey }
} = globalStyles;

class JoinProjectConfirm extends React.Component {
  _handleCancel = async () => {
    const { setModal, modalData, leaveProject, joinProjectData } = this.props;
    const token = getCookie("token");
    await leaveProject(joinProjectData, token);
    return setModal({ modalData: { openModal: false, content: null } });
  };
  _handleEdit = () => {
    const { setModal, modalData } = this.props;
    return setModal({
      modalData: { openModal: true, content: <JoinProjectGuests /> }
    });
  };
  _renderParticipantInfo = () => {
    const {
      joinProjectData: { guestCounter }
    } = this.props;
    if (guestCounter == 1) {
      return "Just you";
    } else {
      return `You & ${guestCounter - 1} Guests`;
    }
  };
  // _renderParticipantInfo = () => {
  //   const {joinProjectData:{participantsCounter}} = this.props
  //   if (participantsCounter==1) {
  //     return 'Just you'
  //   } else {
  //     return `You & ${participantsCounter-1} Guests`
  //   }
  // }
  _renderRoleInfo = () => {
    const {
      joinProjectData: { selectedRole }
    } = this.props;
    return selectedRole;
  };
  render() {
    const {
      joinProjectData: { project, servingDate }
    } = this.props;
    const date = moment
      .utc(servingDate.starts_at)
      .tz(project.address.timezone)
      .format("ddd, MMM D");
    const time =
      moment
        .utc(servingDate.starts_at)
        .tz(project.address.timezone)
        .format("hh:mm A") +
      " - " +
      moment
        .utc(servingDate.ends_at)
        .tz(project.address.timezone)
        .format("hh:mm A");
    return (
      <div id="project_join_green_edit_page" className="root">
        <img className="alert_icon" src="../../static/confirm-icon.png" />
        <h2>{project.name}</h2>
        <p className="details">{date}</p>
        <p className="details">{time}</p>
        <p className="details">{this._renderParticipantInfo()}</p>
        <p className="details">{this._renderRoleInfo()}</p>
        <div className="margin-top-30">
          <div>
            <button
              id="project_join_green_edit"
              onClick={this._handleEdit}
              className="button edit"
            >
              Edit
            </button>
          </div>
          <div className="margin-top-15">
            <button
              id="project_join_green_cancel"
              onClick={this._handleCancel}
              className="button edit"
            >
              Cancel Reservation
            </button>
          </div>
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
          .details {
            font-size: ${fontSizes.m};
            font-weight: 700;
            margin-bottom: 10px;
          }
          .button {
            cursor: pointer;
            position: relative;
            padding: 15px 25px;
            border-radius: 3px;
            transition: background-color 200ms ease;
            color: #fff;
            font-family: "Quicksand";
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
          .button.edit {
            border: 1px solid white;
            background: transparent;
          }
        `}</style>
      </div>
    );
  }
}

const md = dispatch => {
  return {
    setModal: bindActionCreators(setModal, dispatch),
    leaveProject: bindActionCreators(leaveProject, dispatch)
  };
};
const ms = store => {
  const { modalData, joinProjectData } = store.globalReducer;
  return {
    modalData,
    joinProjectData
  };
};

export default connect(
  ms,
  md
)(JoinProjectConfirm);
