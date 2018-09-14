import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  auth,
  getCategories,
  setGeolocation,
  search2,
  setShowSearchInput,
  setModal
} from "../../actions";
import Link from "next/link";
import config from "../../config";
import {
  getCookie,
  deleteCookie,
  setCookie
} from "../../utility/cookieHandler";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_green, vomo_black },
  pages: {
    header: { header_height }
  }
} = globalStyles;
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import Parser from "html-react-parser";
import Popup from "reactjs-popup";
import Geosuggest from "react-geosuggest";
import OrgInvitationModal from "../../components/Modal/OrgInvitationModal";

const placeholder = "../../static/avatar-placeholder.svg";

class Header extends React.Component {
  state = {
    token: null,
    headerHeight: 0,
    userTriggerShadow: false,
    categoriesTriggerShadow: false,
    mobileMenuHeight: false,
    editGeo: false,
    searchQuery: "",
    showCategoriesDropdown: false
    // showSearchInput: false,
  };
  async componentDidMount() {
    const { auth, user, getCategories, setGeolocation, setModal } = this.props;
    const token = getCookie("token");
    const geo = getCookie("geolocation")
      ? JSON.parse(getCookie("geolocation"))
      : null;
    if (!user) {
      await auth(token);
    } else {
      if (user.invitations) {
        if (user.invitations.length !== 0) {
          setModal({
            modalData: {
              openModal: true,
              content: <OrgInvitationModal />,
              hideClose: true
            }
          });
        }
      }
    }

    await setGeolocation(geo);
    return await getCategories();
  }
  _handleLogout = async () => {
    const { auth } = this.props;
    deleteCookie("vomo_session", ".vomo.org");
    deleteCookie("token", ".vomo.org");
    await auth(null);
    return Router.push("/hub", "/hub");
  };
  _handleAdmin = () => {
    return window.open(config.endpoints.ADMIN_URL, "_blank");
  };

  _handleLogin = () => {
    const login_href =
      config.endpoints.ACCOUNTS_URL +
      "/login?redirect=" +
      encodeURIComponent(location.href);
    return window.open(login_href, "_blank");
  };

  _toggleSearchInput = (e, bool) => {
    const { setShowSearchInput } = this.props;
    setShowSearchInput(bool);
    return this.setState({ showCategoriesDropdown: bool });
    // return this.setState({showSearchInput: bool})
  };

  _handleSearchChange = e => {
    return this.setState({ searchQuery: e.target.value });
  };

  _handleKeypress = e => {
    if (e.key === "Enter") {
      const { search2, setShowSearchInput } = this.props;
      const { searchQuery } = this.state;
      // setShowSearchInput(false)
      this.setState({ showCategoriesDropdown: false });
      // this.setState({showSearchInput: false})
      search2(searchQuery);
      return Router.push(`/searchPage`, `/search`);
    }
    return;
  };

  _renderLoggedOutButton = () => {
    return (
      <div className="">
        <p className="start__demo white font-xs bold nomargin">Start Demo</p>
        <p
          onClick={this._handleLogin}
          className="login default-color font-xs bold"
        >
          Login
        </p>
        <style jsx>{`
          .login {
            cursor: pointer;
            display: inline-block;
            float: right;
            line-height: inherit;
            margin-bottom: 0;
            padding: 16px 24px;
            text-decoration: none;
            width: 100px;
          }
          .start__demo {
            background: ${vomo_green};
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
            float: right;
            font-weight: 400;
            line-height: inherit;
            padding: 16px 20px;
            text-decoration: none;
            width: 120px;
          }
        `}</style>
      </div>
    );
  };

  _renderMobileButton = () => {
    return (
      <div onClick={this._showMobileMenu} className="nav_btn">
        <span />
        <span />
        <span />
        <style jsx>{`
          .nav_btn {
            cursor: pointer;
            float: right;
          }
          .nav_btn > span {
            display: block;
            width: calc(${header_height} / 3);
            height: 8px;
            border-top: 2px solid #fff;
          }
        `}</style>
      </div>
    );
  };

  _renderCategoryContainer = () => {
    return (
      <div className="container">
        <div className="row">{this._renderCategories2()}</div>
      </div>
    );
  };

  _renderCategories2 = () => {
    const { categories } = this.props;
    return categories.map((category, i) => {
      return (
        <div
          id={`category${i}`}
          key={category.id}
          className="col-12 col-sm-6 col-md-4 margin-top-8"
        >
          <a
            href={`/explore/${category.slug}`}
            className="font-s default-color bold header_button"
          >
            {category.name}
          </a>
        </div>
      );
    });
  };

  _renderCategories = () => {
    const { categories } = this.props;
    return categories.map((category, i) => {
      return (
        <div
          id={`category${i}`}
          key={category.id}
          className="container nopadding margin-top-8"
        >
          <div className="row justify-content-center align-items-center nomargin">
            <div className="col-12 nopadding text-left">
              {/* <Link href={`/explorePage?param=${category.slug}`} as={`/explore/${category.slug}`}>
                <a className="font-s default-color bold header_button">{category.name}</a>
              </Link> */}
              <a
                href={`/explore/${category.slug}`}
                className="font-s default-color bold header_button"
              >
                {category.name}
              </a>
            </div>
          </div>
        </div>
      );
    });
  };

  _renderDesktopButton = user => {
    return (
      <div className="">
        <Popup
          trigger={
            <div
              id="profile_dropdown"
              className="container trigger_container padding-top-4 padding-bottom-4"
            >
              <div className="row align-items-center">
                <div className="col-3 nopadding">
                  <div className="avatar" />
                </div>
                <div className="col-6 ellipsis">
                  <Link href={`/userPage`} as={`/user`}>
                    <a className="font-s default-color bold nomargin text-right">
                      {Parser(user.first_name)}
                    </a>
                  </Link>
                </div>
                <div className="col-2">
                  <img src="../../static/chevron-down.svg" alt="down" />
                </div>
              </div>
              <style>{`
                      .avatar {
                        margin-left: 4px;
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        background-image: url(${
                          user.avatar ? user.avatar : placeholder
                        });
                        background-position: 50% 50%;
                        background-size: cover;
                      }
                      .trigger_container {
                        float:right;
                        display: inline-block;
                        width: 200px;
                        z-index: 9999999;
                        background: white;
                        box-shadow: ${
                          this.state.userTriggerShadow
                            ? "0px -8px 30px 0px rgba(0,0,0,0.05);"
                            : "none"
                        }
                      }
                      .ellipsis {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                      a {
                        text-decoration:none;
                      }
                    `}</style>
            </div>
          }
          onOpen={this._hoverOnUserTrigger}
          onClose={this._hoverOffUserTrigger}
          position="bottom right"
          on="hover"
          arrow={false}
          contentStyle={{
            width: "200px",
            boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.12)",
            border: "none",
            borderTop: "1px solid #EDF0F4"
          }}
        >
          <div className="dropdown_wrapper">
            <div
              id="dropdown_settings"
              className="container nopadding margin-top-8"
            >
              <div className="row justify-content-center align-items-center nomargin">
                <div className="col-2 nopadding text-right">
                  <img
                    className="icon margin-top-5"
                    src="../../static/settings.svg"
                  />
                </div>
                <div className="col-10 nopadding text-left">
                  <Link href={`/userSettingsPage`} as={`/settings`}>
                    <a className="font-s default-color bold header_button">
                      Settings
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div
              id="dropdown_notifications"
              className="container nopadding margin-top-8"
            >
              <div className="row justify-content-center align-items-center nomargin">
                <div className="col-2 nopadding text-right">
                  <img
                    className="icon margin-top-5"
                    src="../../static/bell.svg"
                  />
                </div>
                <div className="col-10 nopadding text-left">
                  <Link href={`/userNotificationsPage`} as={`/notifications`}>
                    <a className="font-s default-color bold header_button">
                      Notifications
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div
              id="dropdown_profile"
              className="container nopadding margin-top-8"
            >
              <div className="row justify-content-center align-items-center nomargin">
                <div className="col-2 nopadding text-right">
                  <img
                    className="icon margin-top-5"
                    src="../../static/user.svg"
                  />
                </div>
                <div className="col-10 nopadding text-left">
                  <Link href={`/userPage`} as={`/user`}>
                    <a className="font-s default-color bold header_button">
                      Profile
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {!user.isOnlyVolunteer && (
              <div
                id="dropdown_administration"
                className="container nopadding margin-top-8"
              >
                <div className="row justify-content-center align-items-center nomargin">
                  <div className="col-2 nopadding text-right">
                    <img
                      className="icon margin-top-5"
                      src="../../static/briefcase.svg"
                    />
                  </div>
                  <div
                    onClick={this._handleAdmin}
                    className="col-10 nopadding text-left"
                  >
                    <a
                      className="font-s default-color bold header_button"
                      href="#"
                    >
                      Administration
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div
              id="dropdown_logout"
              className="container nopadding margin-top-8"
            >
              <div className="row justify-content-center align-items-center nomargin">
                <div className="col-2 nopadding text-right">
                  <img
                    className="icon margin-top-5"
                    src="../../static/power.svg"
                  />
                </div>
                <div
                  onClick={this._handleLogout}
                  className="col-10 nopadding text-left"
                >
                  <a
                    className="font-s default-color bold header_button"
                    href="#"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
            <style jsx>{`
              .icon {
                width: 20px;
                height: 20px;
              }
              .header_button {
                margin-left: 20px;
              }
              .dropdown_wrapper {
                z-index: 999999;
              }
              a {
                text-decoration: none;
              }
            `}</style>
          </div>
        </Popup>
        {/* <Popup
                trigger={
                  (<div
                    id="category_query_dropdown"
                    className="container categories_trigger_container padding-top-15 padding-bottom-15">
                    <div className="row align-items-center">
                      <div className="col-9 ellipsis">
                        <a className="font-s default-color bold text-right">Categories</a>

                      </div>
                      <div className="col-2">
                        <img src="../../static/chevron-down.svg" alt="down"/>
                      </div>
                    </div>
                    <style>{`
                      .categories_trigger_container {
                        float:right;
                        display: inline-block;
                        width: 200px;
                        z-index: 9999;
                        background: white;
                        box-shadow: ${this.state.categoriesTriggerShadow ? '0px -8px 30px 0px rgba(0,0,0,0.05);' : 'none'}
                      }
                      `}</style>
                  </div>)
                }
                onOpen={this._hoverOnCategoriesTrigger}
                onClose={this._hoverOffCategoriesTrigger}
                position="bottom left"
                on="hover"
                arrow={false}
                contentStyle={{width: '200px', boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.12)', border: 'none', borderTop: '1px solid #EDF0F4'}}
              >
                <div className="dropdown_wrapper">
                  {this._renderCategories()}
                </div>
              </Popup> */}
      </div>
    );
  };
  _hoverOnUserTrigger = () => {
    this.setState({ userTriggerShadow: true });
  };
  _hoverOffUserTrigger = () => {
    this.setState({ userTriggerShadow: false });
  };
  _hoverOnCategoriesTrigger = () => {
    this.setState({ categoriesTriggerShadow: true });
  };
  _hoverOffCategoriesTrigger = () => {
    this.setState({ categoriesTriggerShadow: false });
  };
  _showMobileMenu = () => {
    const { mobileMenuHeight } = this.state;
    this.setState({ mobileMenuHeight: !mobileMenuHeight });
  };
  _onSuggestSelect = async suggest => {
    const { setGeolocation } = this.props;
    const stringified = JSON.stringify(suggest.gmaps);
    const parsed = JSON.parse(stringified);
    await setCookie(
      "geolocation",
      JSON.stringify({
        name: parsed.formatted_address,
        geolocation: [
          parsed.geometry.location.lat,
          parsed.geometry.location.lng
        ]
      }),
      1000
    );
    return await setGeolocation(suggest.gmaps);
  };
  _editGeo = payload => {
    return this.setState({ editGeo: payload });
  };
  _updateGeo = () => {
    // reload page so explore page can derive cookies and SSR
    this._editGeo(false);
    return (window.location.href = location.href);
  };
  _renderGeolocationComponent = () => {
    const { editGeo } = this.state;
    const { geo } = this.props;
    if (!editGeo) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="bold font-s">Location</p>
            </div>
            <div className="col-12 text-center">
              <p className="font-s">
                {geo
                  ? geo.address_components
                    ? geo.address_components[0].long_name
                    : geo.name
                  : "Near You"}
              </p>
            </div>
            <div className="col-8 offset-2 text-center">
              <div
                id="dropdown_edit_location"
                onClick={() => this._editGeo(true)}
                className="vomo-button font-xs"
              >
                Edit
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="bold font-s">Location</p>
            </div>
            <div className="col-12 text-center margin-bottom-8">
              <Geosuggest
                ref={el => (this._geoSuggest = el)}
                placeholder={`Zip code or City`}
                onSuggestSelect={this._onSuggestSelect}
              />
            </div>
            <div className="col-8 offset-2 text-center">
              <div onClick={this._updateGeo} className="vomo-button font-xs">
                Update
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  render() {
    const { user, showSearchInput } = this.props;
    const { searchQuery, showCategoriesDropdown } = this.state;
    if (!user) {
      return (
        <div>
          <div className="container-fluid desktop_header padding-top-20 padding-bottom-20">
            <div className="row align-items-center">
              <div className="col-8">
                <Link href={`/`} as={`/`}>
                  <img
                    src="https://d37xp64nemtox5.cloudfront.net/2018/02/vomo-logo-full.png"
                    alt="VOMO Logo"
                    title="VOMO Logo"
                    className="header_logo"
                  />
                </Link>

                <Popup
                  open={showCategoriesDropdown}
                  trigger={
                    <div>
                      <img
                        src="../../static/search-white.png"
                        className="icon pointer header_search"
                        alt="magnifying glass"
                        onClick={e => this._toggleSearchInput(e, true)}
                      />
                    </div>
                  }
                  closeOnDocumentClick={false}
                  position="bottom left"
                  on="click"
                  overlayStyle={{ zIndex: -1 }}
                  contentStyle={{
                    marginTop: "50px",
                    width: "900px",
                    boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.12)",
                    border: "none",
                    zIndex: 12
                  }}
                >
                  <div>{this._renderCategoryContainer()}</div>
                </Popup>
                {showSearchInput && (
                  <div>
                    <input
                      placeholder={"Type something"}
                      className="search_input"
                      type="text"
                      value={searchQuery || ""}
                      onChange={e => this._handleSearchChange(e)}
                      onKeyPress={e => this._handleKeypress(e)}
                    />
                    <img
                      src="../../static/close.png"
                      className="icon pointer header_search_close"
                      alt="close"
                      onClick={e => this._toggleSearchInput(e, false)}
                    />
                  </div>
                )}
              </div>
              <div className="col-4">{this._renderLoggedOutButton()}</div>
            </div>
          </div>
          <div className="container-fluid mobile_header bg-green padding-top-8">
            <div className="row align-items-center">
              <div
                className={`${showSearchInput ? "col-10" : "col-4"}`}
                style={{ height: "50px" }}
              >
                <img
                  src="../../static/search-white.png"
                  alt="VOMO Logo"
                  title="VOMO Logo"
                  className="search_mobile"
                  onClick={e => this._toggleSearchInput(e, true)}
                />
                {showSearchInput && (
                  <div>
                    <input
                      placeholder={"Type something"}
                      className="search_input"
                      type="text"
                      value={searchQuery || ""}
                      onChange={e => this._handleSearchChange(e)}
                      onKeyPress={e => this._handleKeypress(e)}
                    />
                    <img
                      src="../../static/close.png"
                      className="icon pointer header_search_close"
                      alt="close"
                      onClick={e => this._toggleSearchInput(e, false)}
                    />
                  </div>
                )}
              </div>
              <div className={`col-4 text-center mobile_logo_container`}>
                <Link href={`/`} as={`/`}>
                  <img
                    src="../../static/logo-white.png"
                    alt="VOMO Logo"
                    title="VOMO Logo"
                    className="logo_mobile"
                  />
                </Link>
              </div>
              <div
                className={`${
                  showSearchInput ? "col-2" : "col-4"
                } padding-top-15 padding-bottom-15`}
              >
                {this._renderMobileButton()}
              </div>
              <div className="col-12">
                <div className="row bg-white mobile_menu">
                  <div className="col-12 padding-top-15">
                    <div className="container-fluid nopadding">
                      <div className="row align-items-center nomargin">
                        <div className="col-12">
                          <p
                            onClick={this._handleLogin}
                            className="font-m bold"
                          >
                            Login
                          </p>
                        </div>
                      </div>
                      <div className="row align-items-center nomargin">
                        <div className="col-12">
                          <p className="font-m bold">Start Demo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row bg-white mobile_categories_menu">
                  {this._renderCategoryContainer()}
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .input_wrapper {
              border: 1px solid black;
            }
            .search_input {
              z-index: 5;
              border: none;
              border: 2px solid ${vomo_green};
              font-size: 14px;
              padding: 12px 40px 12px 40px;
            }
            .search_input::-webkit-input-placeholder {
              color: #a9a9a9;
            }
            .header_search {
              position: absolute;
              margin-top: 12px;
              margin-left: 8px;
              filter: brightness(0.1);
            }
            .header_search_close {
              position: absolute;
              margin-top: 12px;
              margin-left: -26px;
            }
            .icon {
              width: 20px;
              height: 20px;
            }

            .header_logo {
              width: 137px;
              height: 45px;
              float: left;
              display: inline-block;
              margin-right: 20px;
            }

            .mobile_menu {
              height: ${this.state.mobileMenuHeight ? 85 : 0}px;
              transition: all 0.3s ease-in;
              overflow: hidden;
            }
            .search_mobile {
              position: absolute;
              margin-top: 10px;
              // margin-top: -12px;
              filter: ${showSearchInput ? "brightness(0.1)" : "none"};
              margin-left: 8px;
              cursor: pointer;
              width: 25px;
            }
            .logo_mobile {
              width: 100px;
              cursor: pointer;
            }
            .mobile_header {
              display: none;
            }
            .desktop_header.container-fluid {
              padding-left: 35px;
              padding-right: 35px;
            }
            @media (max-width: 950px) {
              .mobile_header {
                display: block;
              }
              .desktop_header {
                display: none;
              }
            }
            .mobile_logo_container {
              display: ${showSearchInput ? "none" : "block"};
            }
            .mobile_categories_menu {
              height: ${showCategoriesDropdown ? 385 : 0}px;
              transition: all 0.3s ease-in;
              overflow: auto;
            }
          `}</style>
        </div>
      );
    }
    return (
      <div>
        <Head>
          {/* Import CSS for nprogress */}
          {/* {<link rel='stylesheet' type='text/css' href='/static/nprogress.css' />} */}
        </Head>
        <div className="container-fluid desktop_header padding-top-8 padding-bottom-8">
          <div className="row align-items-center">
            <div className="col-6">
              <Link href={`/`} as={`/`}>
                <img
                  id="vomo_header_logo"
                  src="https://d37xp64nemtox5.cloudfront.net/2018/02/vomo-logo-full.png"
                  alt="VOMO Logo"
                  title="VOMO Logo"
                  className="pointer header_logo"
                />
              </Link>
              <Popup
                trigger={
                  <img
                    id="header_geo"
                    className="pointer header_geo"
                    src="../../static/marker-green.png"
                  />
                }
                position="bottom center"
                on="click"
                contentStyle={{
                  width: "200px",
                  boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.12)",
                  border: "none"
                }}
              >
                {this._renderGeolocationComponent()}
              </Popup>
              <Popup
                open={showCategoriesDropdown}
                trigger={
                  <div>
                    <img
                      src="../../static/search-white.png"
                      className="icon pointer header_search"
                      alt="magnifying glass"
                      onClick={e => this._toggleSearchInput(e, true)}
                    />
                  </div>
                }
                closeOnDocumentClick={false}
                position="bottom left"
                on="click"
                overlayStyle={{ zIndex: -1 }}
                contentStyle={{
                  marginTop: "50px",
                  width: "900px",
                  boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.12)",
                  border: "none",
                  zIndex: 12
                }}
              >
                <div>{this._renderCategoryContainer()}</div>
              </Popup>
              {showSearchInput && (
                <div>
                  <input
                    placeholder={"Type something"}
                    className="search_input"
                    type="text"
                    value={searchQuery || ""}
                    onChange={e => this._handleSearchChange(e)}
                    onKeyPress={e => this._handleKeypress(e)}
                  />
                  <img
                    src="../../static/close.png"
                    className="icon pointer header_search_close"
                    alt="close"
                    onClick={e => this._toggleSearchInput(e, false)}
                  />
                </div>
              )}
            </div>
            <div className="col-6">{this._renderDesktopButton(user)}</div>
          </div>
        </div>

        <div className="container-fluid mobile_header bg-green padding-top-8">
          <div className="row align-items-center">
            <div
              className={`${showSearchInput ? "col-10" : "col-4"}`}
              style={{ height: "50px" }}
            >
              <img
                src="../../static/search-white.png"
                alt="VOMO Logo"
                title="VOMO Logo"
                className="search_mobile"
                onClick={e => this._toggleSearchInput(e, true)}
              />
              {showSearchInput && (
                <div>
                  <input
                    placeholder={"Type something"}
                    className="search_input"
                    type="text"
                    value={searchQuery || ""}
                    onChange={e => this._handleSearchChange(e)}
                    onKeyPress={e => this._handleKeypress(e)}
                  />
                  <img
                    src="../../static/close.png"
                    className="icon pointer header_search_close"
                    alt="close"
                    onClick={e => this._toggleSearchInput(e, false)}
                  />
                </div>
              )}
            </div>
            <div className={`col-4 text-center mobile_logo_container`}>
              <Link href={`/`} as={`/`}>
                <img
                  src="../../static/logo-white.png"
                  alt="VOMO Logo"
                  title="VOMO Logo"
                  className="logo_mobile"
                />
              </Link>
            </div>
            <div
              className={`${
                showSearchInput ? "col-2" : "col-4"
              } padding-top-15 padding-bottom-15`}
            >
              {this._renderMobileButton()}
            </div>

            <div className="col-12">
              <div className="row bg-white mobile_menu">
                <div className="col-12 padding-top-15">
                  <div className="container-fluid nopadding">
                    <div className="row align-items-center nomargin">
                      <div className="col-2 nopadding">
                        <div className="avatar" />
                      </div>
                      <div className="col-10 nopadding text-left">
                        <Link href={`/userPage`} as={`/user`}>
                          <p className="font-s nomargin semi-bold">
                            {Parser(user.first_name)}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="row justify-content-center align-items-center nomargin-sides margin-top-15">
                      <div className="col-2 nopadding text-center">
                        <img className="icon" src="../../static/settings.svg" />
                      </div>
                      <div className="col-10 nopadding text-left">
                        <Link href={`/userSettingsPage`} as={`/settings`}>
                          <p className="font-s header_button semi-bold ">
                            Settings
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="row justify-content-center nomargin-sides align-items-center border-bottom">
                      <div className="col-2 nopadding text-center">
                        <img className="icon" src="../../static/bell.svg" />
                      </div>
                      <div className="col-10 nopadding text-left">
                        <Link
                          href={`/userNotificationsPage`}
                          as={`/notifications`}
                        >
                          <p className="font-s header_button semi-bold ">
                            Notifications
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="row justify-content-center nomargin-sides margin-top-5 align-items-center">
                      <div className="col-2 nopadding text-center">
                        <img className="icon" src="../../static/user.svg" />
                      </div>
                      <div className="col-10 nopadding text-left">
                        <Link href={`/userPage`} as={`/user`}>
                          <p className="font-s header_button semi-bold ">
                            Profile
                          </p>
                        </Link>
                      </div>
                    </div>
                    {!user.isOnlyVolunteer && (
                      <div className="row justify-content-center nomargin-sides align-items-center">
                        <div className="col-2 nopadding text-center">
                          <img
                            className="icon"
                            src="../../static/briefcase.svg"
                          />
                        </div>
                        <div
                          onClick={this._handleAdmin}
                          className="col-10 nopadding text-left"
                        >
                          <p className="font-s header_button">Administration</p>
                        </div>
                      </div>
                    )}
                    <div className="row justify-content-center nomargin-sides align-items-center">
                      <div className="col-2 nopadding text-center">
                        <img className="icon" src="../../static/power.svg" />
                      </div>
                      <div
                        onClick={this._handleLogout}
                        className="col-10 nopadding text-left"
                      >
                        <p className="font-s header_button">Logout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row bg-white mobile_categories_menu">
                {this._renderCategoryContainer()}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .input_wrapper {
            border: 1px solid black;
          }
          .search_input {
            z-index: 5;
            border: none;
            border: 2px solid ${vomo_green};
            font-size: 14px;
            padding: 12px 40px 12px 40px;
          }
          .search_input::-webkit-input-placeholder {
            color: #a9a9a9;
          }
          .header_search {
            position: absolute;
            margin-top: 12px;
            margin-left: 8px;
            filter: brightness(0.1);
          }
          .header_search_close {
            position: absolute;
            margin-top: 12px;
            margin-left: -26px;
          }

          .header_logo {
            width: 137px;
            height: 45px;
            float: left;
            display: inline-block;
            margin-right: 20px;
          }
          .header_geo {
            width: 15px;
            height: 20px;
            float: left;
            display: inline-block;
            margin-right: 20px;
            margin-top: 12px;
          }

          .mobile_header {
            display: none;
          }

          @media (max-width: 950px) {
            .mobile_header {
              display: block;
            }
            .desktop_header {
              display: none;
            }
          }
          .logo_mobile {
            cursor: pointer;
            width: 100px;
          }
          .search_mobile {
            cursor: pointer;
            width: 25px;
          }

          .icon {
            width: 20px;
            height: 20px;
          }

          .avatar {
            width: 45px;
            height: 45px;
            margin-right: auto;
            margin-left: auto;
            border-radius: 50%;
            background-image: url(${user.avatar ? user.avatar : placeholder});
            background-position: 50% 50%;
            background-size: cover;
          }

          .dropdown_icon:after {
            content: " \\2B9F";
            color: #000;
          }

          .ellipsis {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          a {
            text-decoration: none;
          }

          .mobile_menu {
            height: ${this.state.mobileMenuHeight ? 270 : 0}px;
            transition: all 0.3s ease-in;
            overflow: hidden;
          }
          .search_mobile {
            position: absolute;
            margin-top: 10px;
            // margin-top: -12px;
            filter: ${showSearchInput ? "brightness(0.1)" : "none"};
            margin-left: 8px;
            cursor: pointer;
            width: 25px;
          }
          .logo_mobile {
            width: 100px;
            cursor: pointer;
          }
          .mobile_logo_container {
            display: ${showSearchInput ? "none" : "block"};
          }
          .mobile_categories_menu {
            height: ${showCategoriesDropdown ? 385 : 0}px;
            transition: all 0.3s ease-in;
            overflow: auto;
          }
        `}</style>
      </div>
    );
  }
}
const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
    setGeolocation: bindActionCreators(setGeolocation, dispatch),
    search2: bindActionCreators(search2, dispatch),
    setShowSearchInput: bindActionCreators(setShowSearchInput, dispatch),
    setModal: bindActionCreators(setModal, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: {
      showSearchInput,
      geo,
      user,
      headerData: { categories }
    }
  } = state;
  return {
    user,
    categories,
    geo,
    showSearchInput
  };
};
export default connect(
  ms,
  md
)(Header);
