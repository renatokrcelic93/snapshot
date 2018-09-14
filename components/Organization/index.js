import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import config from "../../config";
import { getCookie } from "../../utility/cookieHandler";
import { request } from "../../utility/Request";
import {
  auth,
  follow,
  unfollow,
  loadMoreOrgProjects,
  setModal
} from "../../actions";
import { bindActionCreators } from "redux";
import LoginModal from "../Modal/LoginModal";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import Modal from "react-modal";
import Router from "next/router";

import SectionWrapper from "./SectionWrapper";
import DescriptionSection from "./DescriptionSection";
import FollowButton from "./FollowButton";
import LinksSection from "./LinksSection";
import CampaignsSection from "./CampaignsSection";
import SlideList from "../Shared/SlideList";
import Parser from "html-react-parser";

class OrgComponent extends React.Component {
  _handleFollow = async () => {
    const { follow, orgPageInitialProps, setModal } = this.props;
    const token = getCookie("token");
    if (token) {
      await follow(orgPageInitialProps.org.organization, token);
      // refresh user in global state
      return await this.props.auth(token);
    } else {
      return setModal({
        modalData: { openModal: true, content: <LoginModal /> }
      });
    }
  };
  _handleUnfollow = async () => {
    const { unfollow, orgPageInitialProps } = this.props;
    const token = getCookie("token");
    await unfollow(orgPageInitialProps.org.organization, token);
    // refresh user in global state
    return await this.props.auth(token);
  };

  _loadMoreOrgProjects = org => {
    const token = getCookie("token");
    const { loadMoreOrgProjects } = this.props;
    loadMoreOrgProjects(token, org);
  };

  _renderSlides = ({ campaigns }) => {
    return campaigns.map(campaign => {
      const cb = () =>
        Router.push(
          `/campaignPage?slug=${campaign.slug}`,
          `/campaign/${campaign.slug}`
        ).then(() => window.scrollTo(0, 0));
      return (
        <Slide
          onClick={cb}
          key={campaign.slug}
          image={campaign.cover}
          title={campaign.name}
          organizer={""}
          time={""}
          height={275}
          style={{ width: 260 }}
        />
      );
    });
  };

  render() {
    let defaultSpacing = 70;
    if (process.browser && document) {
      const element = document.getElementById("general_container");
      if (element) {
        const width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;

        console.log("width", width);
        const elementWidth = element.offsetWidth;
        // 70 is the default slider padding, but we need the actual slider element's width do find the difference
        defaultSpacing = width - elementWidth - 70;
      }
    }

    const {
      orgPageInitialProps: { org },
      user
    } = this.props;
    const { organization, infiniteOrgProjectsData } = org;
    return (
      <Layout>
        <div className="container-fluid bg-light">
          <div className="row border_all align-items-center">
            <div className="col-12 col-sm-8 border_right">
              <div className="row align-items-center margin-top-60 margin-bottom-60">
                <div className="col-12 col-sm-4">
                  <div className="avatar" />
                </div>
                <div className="col-12 col-sm-8 d-none d-sm-block text-xs-center text-sm-left">
                  <h1 id="org_name" className="normal font-xxxl nomargin">
                    {Parser(organization.name)}
                  </h1>
                  <p id="org_desc" className="font-m margin-top-15">
                    {organization.text}
                  </p>
                </div>
              </div>
            </div>
            <div
              id="org_container"
              className="col-12 col-sm-3 offset-sm-1 d-none d-sm-block"
            >
              <LinksSection organization={organization} />
            </div>
          </div>
          <div className="row align-items-center border_except_top">
            <div className="col-12 padding-top-8 padding-bottom-8 text-xs-center text-sm-left">
              <FollowButton
                _handleFollow={this._handleFollow}
                _handleUnfollow={this._handleUnfollow}
                organization={organization}
                user={user}
              />
            </div>
          </div>
        </div>

        <div
          id="org_content"
          className="container bg-white margin-top-30 margin-bottom-30"
        >
          {org.campaigns.length > 0 && (
            <Slider
              id="orgPageSlider"
              defaultSpacing={defaultSpacing}
              renderSlides={() => this._renderSlides(org)}
              data={{ sliderTitle: "Campaigns" }}
            />
          )}
          <div className="row">
            <div className="col-sm-12 slider-container text-left">
              {org.projects.length > 0 && (
                <p className="font-l text-left projects_title margin-top-15">
                  Projects
                </p>
              )}
              <SlideList
                user={user}
                _loadMore={this._loadMoreOrgProjects}
                data={org}
                infiniteData={infiniteOrgProjectsData}
              />
              <div>
                {org.projects.length < 1 && (
                  <div className="text-center padding-top-30">
                    <p>
                      Thanks for wanting to make a difference. Currently this
                      organization doesn't have any opportunities updated on
                      VOMO. But it doesn't mean there aren’t any opportunities
                      available.
                    </p>
                    <p>
                      If their mission connects with you, we suggest following
                      them to be alerted to new opportunities. Also, try
                      checking out their website for ways to get involved.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .slider-container {
            padding-left: 50px;
            padding-right: 50px;
          }
          .close-modal {
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0px;
            right: 0px;
            cursor: pointer;
          }
          .border_all {
            border: 1px solid #b7bfc5;
          }
          .border_right {
            border-right: 1px solid #b7bfc5;
          }
          .border_except_top {
            border: 1px solid #b7bfc5;
            border-top: none;
          }
          .avatar {
            height: 120px;
            width: 120px;
            border-radius: 50%;
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(${org.logo});
            float: right;
          }
          @media (max-width: 576px) {
            .avatar {
              float: none;
              margin: auto;
            }
            .projects_title {
              font-size: 16px;
              margin-left: 15px;
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
    follow: bindActionCreators(follow, dispatch),
    unfollow: bindActionCreators(unfollow, dispatch),
    loadMoreOrgProjects: bindActionCreators(loadMoreOrgProjects, dispatch),
    setModal: bindActionCreators(setModal, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, orgPageInitialProps }
  } = state;
  return {
    user,
    orgPageInitialProps
  };
};

export default connect(
  ms,
  md
)(OrgComponent);
