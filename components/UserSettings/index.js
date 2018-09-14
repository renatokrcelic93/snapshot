import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import config from "../../config";
import { getCookie } from "../../utility/cookieHandler";
import { request } from "../../utility/Request";
import {
  auth,
  updateUserData,
  setModal,
  updateUserSettingsPageError,
  updateUserAvatar
} from "../../actions";
import { bindActionCreators } from "redux";
import DatePicker from "../Shared/DatePicker";
import Parser from "html-react-parser";
import moment from "moment";
import ConfirmEmailChange from "../Modal/ConfirmEmailChange";
import Login from "../Modal/LoginModal";
import { ToastContainer, toast } from "react-toastify";
import Geosuggest from "react-geosuggest";

class UserSettingsComponent extends React.Component {
  state = {
    _id: "",
    first_name: "",
    last_name: "",
    birthday: "",
    phone: "",
    address: "",
    formatted_address: "",
    social: {
      twitter: "",
      instagram: "",
      linkedin: ""
    },
    email: "",
    birthday: "",
    old_pw: "",
    new_pw: "",
    new_pw_confirm: "",
    updating: false
  };
  componentDidMount() {
    const { user } = this.props;
    const twitter = user.social
      ? this._parseSocialMediaTag(user.social.twitter)
      : "";
    const instagram = user.social
      ? this._parseSocialMediaTag(user.social.instagram)
      : "";
    const linkedin = user.social
      ? this._parseSocialMediaTag(user.social.linkedin)
      : "";
    this.setState({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone ? user.phone : "",
      address: user.address ? user.address : "",
      formatted_address: user.address
        ? user.address.formatted_short
          ? user.address.formatted_short
          : user.address.formatted_address
        : "",
      social: {
        twitter,
        instagram,
        linkedin
      },
      email: user.email ? user.email : "",
      birthday: user.birthday ? user.birthday : ""
    });
  }

  componentWillReceiveProps(nextProps) {
    const { userSettingsPageError, clearError } = nextProps;
    if (userSettingsPageError) {
      toast.error(userSettingsPageError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: () => updateUserSettingsPageError(null)
      });
    } else {
      toast("Successfully updated.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "bg-green white",
        progressClassName: "success_toast_progress"
      });
    }
  }

  _parseSocialMediaTag = tag => {
    if (!tag) {
      return "";
    }
    const tagArray = tag.split("/");
    return tagArray[tagArray.length - 1] == ""
      ? tagArray[tagArray.length - 2]
      : tagArray[tagArray.length - 1];
  };
  _constructSocialLink = (url, tag) => {
    const tagArray = tag.split("/");
    const refinedTag =
      tagArray[tagArray.length - 1] == ""
        ? tagArray[tagArray.length - 2]
        : tagArray[tagArray.length - 1];
    const finalUrl = url + refinedTag;
    return finalUrl;
  };
  _changeInput = (e, type) => {
    return this.setState({
      [type]: e.target.value
    });
  };

  _changeSocial = async (e, type) => {
    await this.setState({
      social: {
        ...this.state.social,
        [type]: e.target.value
      }
    });
  };
  _dateChange = birthday => {
    this.setState({
      birthday
    });
  };
  _updateUser = async (type, payload) => {
    const {
      first_name,
      last_name,
      phone,
      address,
      social: { twitter, instagram, linkedin },
      email,
      birthday,
      _id,
      old_pw,
      new_pw,
      new_pw_confirm
    } = this.state;
    const { updateUserData, setModal, updateUserAvatar } = this.props;
    const token = getCookie("token");
    if (!token) {
      return setModal({ modalData: { openModal: true, content: <Login /> } });
    }
    switch (type) {
      case "account":
        const data = {
          first_name,
          last_name,
          phone,
          address,
          social: { twitter, instagram, linkedin },
          birthday,
          _id
        };
        if (twitter) {
          data.social.twitter = this._constructSocialLink(
            "https://twitter.com/",
            twitter
          );
        }
        if (instagram) {
          data.social.instagram = this._constructSocialLink(
            "https://instagram.com/",
            instagram
          );
        }
        if (linkedin) {
          data.social.linkedin = this._constructSocialLink(
            "https://linkedin.com/in/",
            linkedin
          );
        }
        Object.keys(data.social).forEach(
          key =>
            (data.social[key] == "" || data.social[key] === undefined) &&
            delete data.social[key]
        );
        Object.keys(data).forEach(
          key =>
            (data[key] == "" ||
              data[key] === undefined ||
              Object.getOwnPropertyNames(data[key]).length === 0) &&
            delete data[key]
        );
        return updateUserData(data, token, config.endpoints.UPDATE_USER_URL);
      case "email":
        return updateUserData(
          { email: email },
          token,
          config.endpoints.UPDATE_USER_EMAIL_URL
        );
      case "password":
        if (new_pw !== new_pw_confirm) {
          return toast.error("Passwords must match.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }
        if (new_pw == "") {
          return toast.error("Password must be at least 6 characters.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }
        return updateUserData(
          {
            old_password: old_pw,
            new_password: new_pw,
            new_password_confirmation: new_pw_confirm
          },
          token,
          config.endpoints.UPDATE_USER_PW_URL
        );
      case "avatar":
        await updateUserAvatar(
          { data: payload, _id: _id },
          token,
          config.endpoints.UPDATE_USER_PROFILE_PIC_URL
        );
      default:
        return null;
    }
  };

  _isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  _fileChangedHandler = event => {
    const file = event.target.files[0];
    return this._updateUser("avatar", file);
  };

  _onSuggestSelect = async suggest => {
    if (!suggest) {
      return;
    }
    this._changeInput(
      {
        target: { value: suggest.gmaps }
      },
      "address"
    );
    return this._changeInput(
      {
        target: { value: suggest.gmaps.formatted_address }
      },
      "formatted_address"
    );
  };

  render() {
    const {
      first_name,
      last_name,
      phone,
      address,
      formatted_address,
      social: { twitter, instagram, linkedin },
      email,
      birthday,
      old_pw,
      new_pw,
      new_pw_confirm
    } = this.state;
    const { user } = this.props;
    return (
      <Layout>
        <div className="banner">
          <h1 className="title light margin-top-15 white font-xxxl">
            Settings
          </h1>
          <div className="section-gradient" />
        </div>
        <div className="container bg-white">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="col-12 font-xxl">Profile Info</div>
              <div className="row">
                <div className="col-12 margin-top-30">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-5">
                      <div id="profile_settings_avatar" className="avatar" />
                    </div>
                    <div className="col-12 col-md-7">
                      <input
                        id="myuniqueid"
                        type="file"
                        accept="image/*"
                        onChange={this._fileChangedHandler}
                      />
                      <label
                        className="vomo-button-disabled font-xxs"
                        htmlFor="myuniqueid"
                      >
                        upload profile picture
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-30">
                  <div className="row align-items-center">
                    <div className="col-1 text-right">
                      <img
                        className="icon"
                        src="../../static/profile-blue.svg"
                        alt="profile-icon"
                      />
                    </div>
                    <div className="col-5">
                      <input
                        id="settings_firstname"
                        onChange={e => this._changeInput(e, "first_name")}
                        value={Parser(first_name)}
                        type="text"
                        placeholder="First Name"
                        className="settings-input font-m"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        id="settings_lastname"
                        onChange={e => this._changeInput(e, "last_name")}
                        value={Parser(last_name)}
                        type="text"
                        placeholder="Last Name"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/present-blue.svg"
                        alt="present-icon"
                      />
                    </div>
                    <div className="col-11">
                      <DatePicker
                        dateChange={this._dateChange}
                        defaultDate={birthday}
                        className="settings-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/phone-blue.svg"
                        alt="phone-icon"
                      />
                    </div>
                    <div className="col-11">
                      <input
                        id="settings_phone"
                        onChange={e => this._changeInput(e, "phone")}
                        value={phone}
                        type="text"
                        placeholder="Phone"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/location-blue.svg"
                        alt="location-icon"
                      />
                    </div>
                    <div className="col-11">
                      <div className="location_dropdown">
                        <Geosuggest
                          ref={el => (this._geoSuggest = el)}
                          initialValue={formatted_address}
                          placeholder={`Zip code or City`}
                          onSuggestSelect={this._onSuggestSelect}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/twitter-blue.svg"
                        alt="twitter-icon"
                      />
                    </div>
                    <div className="col-4 font-s">twitter.com/</div>
                    <div className="col-7">
                      <input
                        id="settings_twitter"
                        onChange={e => this._changeSocial(e, "twitter")}
                        value={twitter}
                        type="text"
                        placeholder="johndoe"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/instagram-blue.svg"
                        alt="instagram-icon"
                      />
                    </div>
                    <div className="col-4 font-s">instagram.com/</div>
                    <div className="col-7">
                      <input
                        id="settings_insta"
                        onChange={e => this._changeSocial(e, "instagram")}
                        value={instagram}
                        type="text"
                        placeholder="johndoe"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/linkedin-blue.svg"
                        alt="linkedin-icon"
                      />
                    </div>
                    <div className="col-4 font-s">linkedin.com/in/</div>
                    <div className="col-7">
                      <input
                        id="settings_linkedin"
                        onChange={e => this._changeSocial(e, "linkedin")}
                        value={linkedin}
                        type="text"
                        placeholder="johndoe"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row margin-top-30">
                <div className="col-12">
                  <div
                    id="settings_update_account"
                    onClick={() => this._updateUser("account")}
                    className="vomo-button font-s bg-blue"
                  >
                    update my account
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row align-items-center">
                <div className="col-12 font-xxl">Account Settings</div>
                <div className="col-12 font-l bold margin-top-30">
                  Update Email
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/email-blue.svg"
                        alt="email-icon"
                      />
                    </div>
                    <div className="col-11">
                      <input
                        id="settings_email"
                        onChange={e => this._changeInput(e, "email")}
                        value={email}
                        type="email"
                        placeholder="example@example.com"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="row margin-top-30">
                  <div className="col-12">
                    <div
                      id="settings_update_email"
                      onClick={() => this._updateUser("email")}
                      className="vomo-button bg-blue"
                    >
                      update my e-mail
                    </div>
                  </div>
                </div>
                <div className="col-12 font-l bold margin-top-30">
                  Change Password
                </div>

                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/password-blue.svg"
                        alt="password-icon"
                      />
                    </div>
                    <div className="col-11">
                      <input
                        id="settings_oldpassword"
                        onChange={e => this._changeInput(e, "old_pw")}
                        value={old_pw}
                        type="password"
                        placeholder="oldpassword"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/password-blue.svg"
                        alt="password-icon"
                      />
                    </div>
                    <div className="col-11">
                      <input
                        id="settings_newpassword"
                        onChange={e => this._changeInput(e, "new_pw")}
                        value={new_pw}
                        type="password"
                        placeholder="newpassword"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 margin-top-15">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <img
                        className="icon"
                        src="../../static/password-blue.svg"
                        alt="password-icon"
                      />
                    </div>
                    <div className="col-11">
                      <input
                        id="settings_newpassword_confirm"
                        onChange={e => this._changeInput(e, "new_pw_confirm")}
                        value={new_pw_confirm}
                        type="password"
                        placeholder="newpassword"
                        className="settings-input font-m"
                      />
                    </div>
                  </div>
                </div>
                <div className="row margin-top-30">
                  <div className="col-12">
                    <div
                      id="settings_update_pw"
                      onClick={() => this._updateUser("password")}
                      className="vomo-button bg-blue"
                    >
                      update my password
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <style jsx>{`
          .banner {
            width: 100%;
            height: 80px;
            padding-top: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(26, 40, 127);
            position: relative;
            margin-bottom: 50px;
          }
          .title {
            margin-bottom: 70px;
            z-index: 10;
          }
          .section-gradient {
            position: absolute;
            left: 0px;
            top: 0px;
            right: 0px;
            bottom: 0px;
            z-index: 0;
            display: block;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-pack: end;
            justify-content: flex-end;
            -webkit-box-align: center;
            align-items: center;
            background-image: linear-gradient(
              0deg,
              rgba(5, 10, 15, 0.4),
              rgba(5, 10, 15, 0.4) 0%,
              rgba(255, 255, 255, 0) 53%
            );
            color: rgb(255, 255, 255);
            padding: 20px;
          }
          .avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-image: url(${user.avatar});
            background-position: 50% 50%;
            background-size: cover;
          }

          input[type="file"] {
            opacity: 0;
            position: absolute;
            pointer-events: none;
            width: 1px;
            height: 1px;
          }

          .icon {
            width: 20px;
            height: 20px;
          }

          // in order to style datepicker component
          :global(.settings-input) {
            width: 100%;
            font-family: "Quicksand";
            display: inline-block;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-right: 5px;
            margin-bottom: 0px;
            border-style: none none dotted;
            border-bottom-width: 2px;
            border-bottom-color: #6eca97;
          }
          :global(.success_toast_progress) {
            background: rgba(255, 255, 255, 0.6) !important;
          }

          .vomo-button-disabled {
            cursor: pointer;
          }

          .location_dropdown {
            padding-top: 10px;
            padding-bottom: 10px;
            border-style: none none dotted;
            border-bottom-width: 2px;
            border-bottom-color: #6eca97;
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    updateUserData: bindActionCreators(updateUserData, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    updateUserSettingsPageError: bindActionCreators(
      updateUserSettingsPageError,
      dispatch
    ),
    updateUserAvatar: bindActionCreators(updateUserAvatar, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: {
      user,
      userSettingsPageInitialProps,
      modalData,
      userSettingsPageError
    }
  } = state;
  return {
    user,
    userSettingsPageInitialProps,
    modalData,
    userSettingsPageError
  };
};

export default connect(
  ms,
  md
)(UserSettingsComponent);
