import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setModal,
  modParticipant,
  updateDescription,
  setRole
} from "../../actions";
import JoinProjectRole from "../../components/Modal/JoinProjectRole";
import JoinProjectConfirm from "../../components/Modal/JoinProjectConfirm";
import JoinProjectVolunteerQuestion from "../Modal/JoinProjectVolunteerQuestion";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  colors: { vomo_green, vomo_black, vomo_blue, vomo_grey }
} = globalStyles;

class JoinProjectGuests extends React.Component {
  state = {
    disableButton: false
  };

  componentDidMount() {
    const {
      setModal,
      setRole,
      modalData,
      joinProjectData: { project, roles }
    } = this.props;
    if (!project.allow_guests) {
      if (roles.length < 2) {
        setRole(roles[0]);
        return setModal({
          modalData: {
            openModal: true,
            content: <JoinProjectVolunteerQuestion />
          }
        });
      }
      return setModal({
        modalData: { openModal: true, content: <JoinProjectRole /> }
      });
    }
  }

  _renderLabel = () => {
    const {
      joinProjectData: { participantsCounter, description, guestCounter }
    } = this.props;
    if (guestCounter < 6) {
      if (this.state.disableButton == true) {
        this.setState({ disableButton: false });
      }
      if (guestCounter == 1) {
        return "Just Me";
      } else {
        return <div>Me and {guestCounter - 1} guests</div>;
      }
    } else {
      if (this.state.description == "" && this.state.disableButton == false) {
        this.setState({ disableButton: true });
      }
      if (this.state.description !== "" && this.state.disableButton == true) {
        this.setState({ disableButton: false });
      }
      return (
        <div>
          <div>Me and {guestCounter - 1} guests</div>
          <textarea
            placeholder="Description..."
            className="margin-top-30"
            value={description}
            onChange={this._handleDescription}
            cols="30"
            rows="5"
          />
        </div>
      );
    }
  };
  _handleDescription = e => {
    const { updateDescription } = this.props;
    return updateDescription(e.target.value);
  };
  _handleSubtract = () => {
    const {
      modParticipant,
      joinProjectData: { participantsCounter, guestCounter }
    } = this.props;
    if (guestCounter > 1) {
      return modParticipant("subtract");
    }
  };
  _handleAdd = () => {
    const {
      modParticipant,
      joinProjectData: { participantsCounter, capacity }
    } = this.props;
    if (participantsCounter < capacity) {
      return modParticipant("add");
    }
  };
  _handleContinue = () => {
    const {
      setModal,
      modalData,
      joinProjectData: { roles, project, guestCounter },
      setRole,
      setApprovalRequirement
    } = this.props;
    if (roles.length < 2) {
      setRole(roles[0]);
      return setModal({
        modalData: {
          openModal: true,
          content: <JoinProjectVolunteerQuestion />
        }
      });
    }
    return setModal({
      modalData: { openModal: true, content: <JoinProjectRole /> }
    });
  };
  render() {
    return (
      <div id="project_join_green_group_container" className="root">
        <img className="group_icon" src="../../static/group-icon.png" />
        <h2>How many people are coming with you?</h2>
        <p>Groups larger than 5 will require approval from the organizer.</p>
        <div className="container">
          <div
            id="project_join_green_groups"
            className="row justify-content-center align-items-center"
          >
            <div className="col-2">
              <img
                id="project_join_green_left"
                onClick={this._handleSubtract}
                className="mod_icon"
                src="../../static/subtract-icon.svg"
              />
            </div>
            <div className="col-8 mod_label">{this._renderLabel()}</div>
            <div className="col-2">
              <img
                id="project_join_green_right"
                onClick={this._handleAdd}
                className="mod_icon"
                src="../../static/add-icon.svg"
              />
            </div>
          </div>
        </div>
        <div className="margin-top-30">
          <button
            id="project_join_green_continue"
            disabled={this.state.disableButton}
            onClick={this._handleContinue}
            className="button"
          >
            Continue
          </button>
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
          .group_icon {
            width: 100px;
            height: 100px;
            margin-left: 0;
            margin-right: 0;
          }
          .mod_icon {
            width: 50px;
            height: 50px;
          }
          .mod_label {
            font-size: ${fontSizes.xxl};
            font-weight: 300;
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
          .button:disabled {
            cursor: auto;
            background: ${vomo_grey};
          }
        `}</style>
      </div>
    );
  }
}

const md = dispatch => {
  return {
    setModal: bindActionCreators(setModal, dispatch),
    setRole: bindActionCreators(setRole, dispatch),
    modParticipant: bindActionCreators(modParticipant, dispatch),
    updateDescription: bindActionCreators(updateDescription, dispatch)
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
)(JoinProjectGuests);
