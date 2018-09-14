import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal } from "../../actions";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  colors: { vomo_green, vomo_black, vomo_blue, vomo_grey }
} = globalStyles;

class JoinProjectClose extends React.Component {
  _handleClose = () => {
    const { setModal, modalData } = this.props;
    return setModal({ modalData: { openModal: false, content: null } });
  };
  render() {
    return (
      <div id="project_join_green_container" className="root">
        <img className="alert_icon" src="../../static/celebration-icon.png" />
        <h2 id="project_join_green_signedup">You are signed up!</h2>
        <p>Thanks for expressing interest in this project!</p>
        <p>
          Show your progress on social media using the hashtag #movementforgood
        </p>
        <div className="container">
          <div className="row">
            <div className="col-6 text-right">
              <img className="store_icon" src="../../static/app-store.svg" />
            </div>
            <div className="col-6 text-left">
              <img
                className="playstore_icon"
                src="../../static/google-play.png"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 margin-top-15">SHARE</div>
            <div className="col-12 margin-top-15">
              <img className="social_icon" src="../../static/fb-white.svg" />
              <img
                className="social_icon"
                src="../../static/messenger-white.svg"
              />
              <img
                className="social_icon"
                src="../../static/twitter-white.svg"
              />
            </div>
          </div>
        </div>
        <div className="margin-top-30">
          <div className="margin-top-15">
            <button
              id="project_join_green_close"
              onClick={this._handleClose}
              className="button edit"
            >
              Close
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
            margin-bottom: 10px;
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
          .store_icon {
            width: 130px;
            margin-top: 9px;
          }
          .playstore_icon {
            width: 150px;
          }
          .social_icon {
            width: 25px;
            margin-right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

const md = dispatch => {
  return {
    setModal: bindActionCreators(setModal, dispatch)
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
)(JoinProjectClose);
