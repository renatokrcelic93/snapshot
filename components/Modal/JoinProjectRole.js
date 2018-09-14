import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal, setRole } from "../../actions";
import JoinProjectConfirm from "../../components/Modal/JoinProjectConfirm";
import JoinProjectVolunteerQuestion from "../Modal/JoinProjectVolunteerQuestion";
import JoinProjectGuests from "../../components/Modal/JoinProjectGuests";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  colors: { vomo_green, vomo_black, vomo_blue, vomo_grey }
} = globalStyles;

class JoinProjectRoles extends React.Component {
  componentDidMount() {
    const {
      setRole,
      joinProjectData: { selectedRole }
    } = this.props;
    const initialValue = selectedRole;
    return setRole(initialValue);
  }
  _renderSelect = () => {
    const {
      joinProjectData: { selectedRole, roles }
    } = this.props;
    return roles.map(role => {
      const { name, id } = role;
      return (
        <div key={id} className="container">
          <div className="row align-items-center no-gutters">
            <div className="col-6 text-right">
              <input
                id="project_join_green_selectrole"
                className="radio_button"
                onChange={this._handleSelectRole}
                type="radio"
                value={name}
                checked={selectedRole.id == id}
              />
            </div>
            <div className="col-6 text-left">
              <p className="radio_label">{name}</p>
            </div>
          </div>
          <style jsx>{`
            .container {
              padding-right: 60px;
            }
            .radio_button {
              margin-right: 5px;
              width: 20px;
              height: 20px;
            }
            .radio_label {
              display: inline-block;
              font-size: ${fontSizes.xl};
            }
          `}</style>
        </div>
      );
    });
  };
  _handleSelectRole = e => {
    const {
      setRole,
      joinProjectData: { selectedRole, roles }
    } = this.props;
    const role = roles.find(role => role.name == e.target.value);
    return setRole(role);
  };
  _handleContinue = () => {
    const { setModal, modalData } = this.props;
    return setModal({
      modalData: { openModal: true, content: <JoinProjectVolunteerQuestion /> }
    });
  };
  _handleBack = () => {
    const { setModal, modalData } = this.props;
    return setModal({
      modalData: { openModal: true, content: <JoinProjectGuests /> }
    });
  };
  render() {
    return (
      <div id="project_join_green_role" className="root">
        <img className="alert_icon" src="../../static/role-icon.png" />
        <h2>Select a role to serve in</h2>
        <p>This role will apply for you and any guests</p>
        {this._renderSelect()}
        <div className="margin-top-30">
          <div>
            <button
              id="project_join_green_ready"
              onClick={this._handleContinue}
              className="button"
            >
              Continue
            </button>
          </div>
          <div className="margin-top-15">
            <button
              id="project_join_green_back"
              onClick={this._handleBack}
              className="button edit"
            >
              Back
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
    setRole: bindActionCreators(setRole, dispatch)
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
)(JoinProjectRoles);
