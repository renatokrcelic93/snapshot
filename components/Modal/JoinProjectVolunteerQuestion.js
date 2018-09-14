import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setModal,
  modParticipant,
  setVolunteerQuestionAnswer
} from "../../actions";
import JoinProjectConfirm from "../../components/Modal/JoinProjectConfirm";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  colors: { vomo_green, vomo_black, vomo_blue, vomo_grey }
} = globalStyles;

class JoinProjectVolunteerQuestion extends React.Component {
  componentDidMount() {
    const {
      setModal,
      modalData,
      joinProjectData: { project, volunteerAnswer }
    } = this.props;
    if (
      project.volunteer_question === "" ||
      project.volunteer_question === null
    ) {
      return setModal({
        modalData: { openModal: true, content: <JoinProjectConfirm /> }
      });
    } else {
      this.setState({ answer: volunteerAnswer });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };

    this._handleChange = this._handleChange.bind(this);
  }

  _handleContinue = () => {
    const {
      setModal,
      modalData,
      joinProjectData: { roles },
      setVolunteerQuestionAnswer
    } = this.props;
    setVolunteerQuestionAnswer(this.state.answer);
    return setModal({
      modalData: { openModal: true, content: <JoinProjectConfirm /> }
    });
  };

  _handleChange(event) {
    this.setState({ answer: event.target.value });
  }

  render() {
    const {
      setModal,
      modalData,
      joinProjectData: { project }
    } = this.props;

    return (
      <div id="project_join_green_group_container" className="root">
        <img className="group_icon" src="../../static/group-icon.png" />
        <h2>Additional Information</h2>
        <p>{project.volunteer_question}</p>
        <div className="container">
          <div
            id="project_join_green_groups"
            className="row justify-content-center align-items-center"
          >
            <textarea
              className="question-box"
              value={this.state.answer}
              onChange={this._handleChange}
              maxLength="500"
              rows="3"
            />
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
          .question-box {
            width: 100%;
            font-size: ${fontSizes.m};
            border: 0;
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
    setVolunteerQuestionAnswer: bindActionCreators(
      setVolunteerQuestionAnswer,
      dispatch
    )
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
)(JoinProjectVolunteerQuestion);
