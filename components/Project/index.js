import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  auth,
  setModal,
  handleLike,
  loadMoreUpdates,
  loadMoreServingDates,
  getJoinProjectData,
  joinProject
} from "../../actions";
import { getCookie } from "../../utility/cookieHandler";
import config from "../../config";
import Layout from "../Layout";
import JoinProjectGuests from "../Modal/JoinProjectGuests";
import JoinAnytimeProjectClose from "../Modal/JoinAnytimeProjectClose";
import LoginModal from "../Modal/LoginModal";
import JoinProjectEdit from "../Modal/JoinProjectEdit";
import Map from "../Map";
import ComingUpSection from "./ComingUpSection";
import OrganizedBySection from "./OrganizedBySection";
import PartOfSection from "./PartOfSection";
import TabsSection from "./TabsSection";
import QuestionsSection from "./QuestionsSection";
import ShareSection from "./ShareSection";
import SliderSection from "./SliderSection";
import ServingDatesSection from "./ServingDatesSection";
import Parser from "html-react-parser";
import Head from "next/head";

class ProjectComponent extends React.Component {
  state = {
    bannerSliderBreakpointHeights: [350, 350, 275, 315, 250],
    mobileBannerSliderBreakpointHeights: [500, 400, 300, 250, 150]
  };

  _handleJoinServingDate = async project => {
    if (
      project.projectType == "ANYTIME" ||
      project.projectType == "ANYTIME_ANYWHERE"
    ) {
      const token = getCookie("token");
      const { setModal, joinProject } = this.props;
      if (token) {
        const servingDate = project.servingDates[0];
        const joinProjectData = {
          servingDate
        };
        await joinProject(joinProjectData, token);
        return setModal({
          modalData: { openModal: true, content: <JoinAnytimeProjectClose /> }
        });
      } else {
        return setModal({
          modalData: { openModal: true, content: <LoginModal /> }
        });
      }
    } else {
      // scroll to the serving dates reactDomelement ref
      return this.servingRefs.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  };

  _handleLike = (direction, project, user) => {
    const token = getCookie("token");
    const { setModal, handleLike } = this.props;
    if (token) {
      return handleLike(direction, project, user, token);
    } else {
      return setModal({
        modalData: { openModal: true, content: <LoginModal /> }
      });
    }
  };

  _loadMoreUpdates = project => {
    const token = getCookie("token");
    const { loadMoreUpdates } = this.props;
    return loadMoreUpdates(token, project);
  };

  _handleJoinProject = (project, servingDate) => {
    const token = getCookie("token");
    const { setModal, auth, user, getJoinProjectData } = this.props;
    getJoinProjectData(project, servingDate, user, "join");
    if (token) {
      return setModal({
        modalData: { openModal: true, content: <JoinProjectGuests /> }
      });
    } else {
      return setModal({
        modalData: { openModal: true, content: <LoginModal /> }
      });
    }
  };

  _handleEditProject = async (project, servingDate) => {
    const { setModal, getJoinProjectData, user } = this.props;
    getJoinProjectData(project, servingDate, user, "edit");
    setModal({ modalData: { openModal: true, content: <JoinProjectEdit /> } });
  };
  _loadMoreServingDates = project => {
    const token = getCookie("token");
    return this.props.loadMoreServingDates(token, project);
  };

  render() {
    const {
      projectPageInitialProps: { project, author, details },
      user
    } = this.props;
    return (
      <Layout>
        <div className="mobile_layout">
          <SliderSection
            className="mobile-banner-slider"
            project={project}
            breakpointHeights={this.state.mobileBannerSliderBreakpointHeights}
          />
          <div className="mobile_content_container">
            <h1 className="title light margin-top-15 font-xxl">
              {Parser(project.name)}
            </h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                {project.next_happening && (
                  <ComingUpSection
                    user={user}
                    project={project}
                    _handleJoinServingDate={this._handleJoinServingDate}
                  />
                )}
              </div>
              {author && (
                <div className="col-12 col-sm-6">
                  <OrganizedBySection author={author} />
                </div>
              )}
              {project.campaigns.length > 0 && (
                <div className="col-12 col-sm-6">
                  <PartOfSection campaigns={project.campaigns} />
                </div>
              )}
              <div className="col-12 col-sm-6">
                <QuestionsSection href={project.contact_href} />
              </div>
              <div className="col-12 col-sm-6">
                <ShareSection project={project} />
              </div>
              <TabsSection
                project={project}
                details={details}
                user={user}
                _handleLike={this._handleLike}
                _loadMoreUpdates={this._loadMoreUpdates}
              />
            </div>
          </div>
        </div>
        <div className="desktop_layout">
          <div className="banner">
            <h1 className="title light margin-top-15 white font-xxxl">
              {Parser(project.name)}
            </h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="col-12">
                  {project.next_happening && (
                    <ComingUpSection
                      user={user}
                      project={project}
                      _handleJoinServingDate={this._handleJoinServingDate}
                    />
                  )}
                </div>
                <div className="col-12 margin-top-30">
                  {author && <OrganizedBySection author={author} />}
                </div>
                <div className="col-12 margin-top-30">
                  {project.campaigns.length > 0 && (
                    <PartOfSection campaigns={project.campaigns} />
                  )}
                </div>
                <div className="col-12 margin-top-30">
                  <QuestionsSection href={project.contact_href} />
                </div>
                <div className="col-12 margin-top-30">
                  <ShareSection project={project} />
                </div>
              </div>
              <div className="col-8">
                <SliderSection
                  className="banner-slider"
                  project={project}
                  breakpointHeights={this.state.bannerSliderBreakpointHeights}
                />
                <TabsSection
                  project={project}
                  details={details}
                  user={user}
                  _handleLike={this._handleLike}
                  _loadMoreUpdates={this._loadMoreUpdates}
                />
              </div>
            </div>
          </div>
        </div>
        {project.address &&
          !project.anywhere && (
            <div className="margin-top-30">
              <Map
                isMarkerShown
                googleMapURL={config.endpoints.GOOGLE_MAPS_URL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                geolocation={project.coordinates.coordinates}
                address={project.address.formatted_address}
              />
            </div>
          )}
        <div ref={sds => (this.servingRefs = sds)}>
          <ServingDatesSection
            _loadMoreServingDates={() => this._loadMoreServingDates(project)}
            project={project}
            user={user}
            _handleJoinProject={this._handleJoinProject}
            _handleEditProject={this._handleEditProject}
          />
        </div>
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
          }
          .mobile_layout {
            display: none;
            background: #fff;
          }
          .desktop_layout {
            display: block;
            background: #fff;
          }
          .mobile_content_container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media (max-width: 768px) {
            .mobile_layout {
              display: block;
            }
            .desktop_layout {
              display: none;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    handleLike: bindActionCreators(handleLike, dispatch),
    loadMoreUpdates: bindActionCreators(loadMoreUpdates, dispatch),
    loadMoreServingDates: bindActionCreators(loadMoreServingDates, dispatch),
    getJoinProjectData: bindActionCreators(getJoinProjectData, dispatch),
    joinProject: bindActionCreators(joinProject, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, modalData, projectPageInitialProps }
  } = state;
  return {
    user,
    modalData,
    projectPageInitialProps
  };
};

export default connect(
  ms,
  md
)(ProjectComponent);
