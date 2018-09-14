import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import config from "../../config";
import { getCookie } from "../../utility/cookieHandler";
import { request } from "../../utility/Request";
import { auth, loadMoreUserProjects } from "../../actions";
import { bindActionCreators } from "redux";
import Slide from "../Slider/Slide";
import DateFilter from "./DateFilter";
import StatSection from "./StatSection";
import ProfileItemList from "./ProfileItemList";
import InfiniteScroll from "react-infinite-scroller";
import SlideList from "../Shared/SlideList";
import Parser from "html-react-parser";
import moment from "moment";

class UserComponent extends React.Component {
  state = {
    startDate: null,
    endDate: null
  };

  _loadMoreUserProjects = user => {
    const token = getCookie("token");
    const { loadMoreUserProjects } = this.props;
    loadMoreUserProjects(token, user);
  };

  _handleSocialIconClick = link => {
    return window.open(link, "_blank");
  };

  _renderHistory = () => {
    return Array(15)
      .fill()
      .map((item, i) => {
        return (
          <div key={i} className="row separator">
            <div className="col-12 col-md-4">2001</div>
            <div className="col-12 col-md-4">{i}</div>
            <div className="col-12 col-md-4">Title</div>
            <style jsx>{`
              .separator {
                border-bottom: 1px solid black;
              }
            `}</style>
          </div>
        );
      });
  };

  _handleFilterChangeStart = date => {
    this.setState({
      startDate: date
    });
  };
  _handleFilterChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  render() {
    const {
      userPageInitialProps: { user, projects }
    } = this.props;
    const { infiniteUserProjectsData } = user;
    const { startDate, endDate } = this.state;
    return (
      <Layout>
        <div className="container bg-white margin-top-30">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="row">
                <div className="col-12 text-center">
                  <div id="profile_pic" className="profile_pic" />
                </div>
                <div className="col-12 text-center">
                  <p
                    id="profile_name"
                    className="font-xxl nomargin padding-top-30"
                  >
                    {Parser(user.full_name || "")}
                  </p>
                </div>
                <div className="col-12 text-center border-bottom">
                  <p id="profile_address" className="font-s">
                    {user.address && user.address.formatted_short}
                  </p>
                </div>
                {user.social && (
                  <div className="col-6 offset-3 text-center margin-top-15">
                    <div className="row">
                      <div className="col-4">
                        {user.social["twitter"] && (
                          <img
                            id="profile_twitter"
                            onClick={() =>
                              this._handleSocialIconClick(
                                user.social["twitter"]
                              )
                            }
                            className="social_icon"
                            src="../../static/twitter-badge-green.png"
                            alt="twitter"
                          />
                        )}
                      </div>
                      <div className="col-4">
                        {user.social["instagram"] && (
                          <img
                            id="profile_insta"
                            onClick={() =>
                              this._handleSocialIconClick(
                                user.social["instagram"]
                              )
                            }
                            className="social_icon"
                            src="../../static/instagram-badge-green.png"
                            alt="instagram"
                          />
                        )}
                      </div>
                      <div className="col-4">
                        {user.social["linkedin"] && (
                          <img
                            id="profile_linkedin"
                            onClick={() =>
                              this._handleSocialIconClick(
                                user.social["linkedin"]
                              )
                            }
                            className="social_icon"
                            src="../../static/linkedin-badge-green.png"
                            alt="linkedin"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <DateFilter
                date={startDate}
                onChange={this._handleFilterChangeStart}
                title="Starting Date"
              />
            </div>
            <div className="col-12 col-md-4">
              <DateFilter
                date={endDate}
                onChange={this._handleFilterChangeEnd}
                title="Ending Date"
              />
            </div>
            {/* <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 text-center font-xl semi-bold">
                  {Parser(user.first_name || '')} has taken part in these projects:
                </div>
                <div id="profile_project_container" className="col-12 text-center margin-top-30">
                  <SlideList
                   _loadMore={this._loadMoreUserProjects}
                   data={{projects : projects}}
                   infiniteData={infiniteUserProjectsData}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <StatSection />
            </div>
            <div className="col-12 col-md-4">
              <StatSection />
            </div>
            <div className="col-12 col-md-4">
              <StatSection />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <ProfileItemList type="project" />
            </div>
            <div className="col-12 col-md-4">
              <ProfileItemList type="vol" />
            </div>
            <div className="col-12 col-md-4">
              <ProfileItemList type="org" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">Title</div>
            <div className="col-6">Search</div>
            <div className="col-12">
              <div className="container">
                <div className="row separator">
                  <div className="col-12 col-md-4">Date</div>
                  <div className="col-12 col-md-4">Hours</div>
                  <div className="col-12 col-md-4">Project</div>
                </div>
                {this._renderHistory()}
              </div>
            </div>
          </div>
        </div>
        <style>{`
            .profile_pic {
              display: inline-block;
              border-radius: 50%;
              width: 120px;
              height: 120px;
              background-position: 50% 50%;
              background-size: cover;
              background-image: url(${user.avatar});
            }
            .border-bottom {
              border-bottom: 1px solid #e9e9e9;
            }
            .social_icon {
              width: 30px;
              height: 30px;
            }

            .separator {
              border-bottom: 1px solid black;
            }
          `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    loadMoreUserProjects: bindActionCreators(loadMoreUserProjects, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, userPageInitialProps }
  } = state;
  return {
    user,
    userPageInitialProps
  };
};

export default connect(
  ms,
  md
)(UserComponent);
