import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import config from "../../config";
import { getCookie } from "../../utility/cookieHandler";
import { request } from "../../utility/Request";
import {
  auth,
  search,
  loadMoreItems,
  searchMoreProjects,
  searchMoreCampaigns,
  searchMoreOrgs
} from "../../actions";
import { bindActionCreators } from "redux";
import Slider from "../Slider";
import Slide from "../Slider/Slide";
import OrgSlider from "../OrgSlider";
import OrgSlide from "../OrgSlider/OrgSlide";
import SlideList from "../Shared/SlideList";
import moment from "moment";
import Router from "next/router";

class SearchComponent extends React.Component {
  state = {
    activeTab: "all"
  };

  _renderCampaignSlides = slider => {
    return slider.data.map(campaign => {
      const cb = () =>
        Router.push(
          `/campaignPage?slug=${campaign.slug}`,
          `/campaign/${campaign.slug}`
        ).then(() => window.scrollTo(0, 0));
      return (
        <Slide
          onClick={cb}
          key={campaign.slug}
          image={campaign.cover ? campaign.cover.urls.s : ""}
          title={campaign.name}
          organizer={""}
          time={""}
          height={275}
          style={{ width: 260 }}
        />
      );
    });
  };
  _renderProjectSlides = slider => {
    return slider.data.map(project => {
      const eventTime = project.anytime
        ? "Anytime"
        : moment(
            project.next_happening ? project.next_happening.starts_at : ""
          ).format("ddd, MMM D");
      const cb = () =>
        Router.push(
          `/projectPage?slug=${project.slug}`,
          `/project/${project.slug}`
        ).then(() => window.scrollTo(0, 0));
      return (
        <Slide
          onClick={cb}
          key={project.slug}
          image={project.thumb ? project.thumb.urls.s : ""}
          title={project.name}
          organizer={project.organization.name}
          time={eventTime}
          height={275}
          style={{ width: 260 }}
        />
      );
    });
  };
  _renderOrgSlides = slider => {
    return slider.data.map(org => {
      const image = org.logo ? org.logo.urls.s : "";
      const cb = () =>
        Router.push(
          `/organizationPage?slug=${org.slug}`,
          `/org/${org.slug}`
        ).then(() => window.scrollTo(0, 0));
      return (
        <OrgSlide
          onClick={cb}
          key={org.slug}
          image={image}
          title={org.name}
          style={{ width: 180 }}
        />
      );
    });
  };

  _renderAll = () => {
    const { searchSliders } = this.props;
    return searchSliders.map((slider, i) => {
      switch (slider.sliderType) {
        case "campaign":
          if (slider.data.length === 0) return;
          return (
            <Slider
              key={i}
              seeAllCallback={() => this._handleNav("campaigns")}
              renderSlides={() => this._renderCampaignSlides(slider)}
              data={{ sliderTitle: slider.sliderTitle }}
            />
          );
        case "project":
          if (slider.data.length === 0) return;
          return (
            <Slider
              key={i}
              seeAllCallback={() => this._handleNav("projects")}
              renderSlides={() => this._renderProjectSlides(slider)}
              data={{ sliderTitle: slider.sliderTitle }}
            />
          );
        case "org":
          if (slider.data.length === 0) return;
          return (
            <OrgSlider
              key={i}
              seeAllCallback={() => this._handleNav("orgs")}
              renderSlides={() => this._renderOrgSlides(slider)}
              slickTrackHeight={180}
              data={{ sliderTitle: slider.sliderTitle }}
            />
          );
        default:
          return null;
      }
    });
  };

  _loadMoreCampaigns = infiniteCampaignsData => {
    const { searchMoreCampaigns } = this.props;
    return searchMoreCampaigns(infiniteCampaignsData);
  };
  _loadMoreProjects = infiniteProjectsData => {
    const { searchMoreProjects } = this.props;
    return searchMoreProjects(infiniteProjectsData);
  };
  _loadMoreOrgs = infiniteOrgsData => {
    const { searchMoreOrgs } = this.props;
    return searchMoreOrgs(infiniteOrgsData);
  };

  _renderCampaigns = () => {
    const {
      user,
      searchResults: { campaignsData, infiniteCampaignsData }
    } = this.props;
    if (!campaignsData) return null;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center margin-top-30">
            <SlideList
              type="campaign"
              user={user}
              _loadMore={this._loadMoreCampaigns}
              data={{ campaigns: campaignsData }}
              infiniteData={infiniteCampaignsData}
            />
          </div>
        </div>
      </div>
    );
  };
  _renderProjects = () => {
    const {
      user,
      searchResults: { projectsData, infiniteProjectsData }
    } = this.props;
    if (!projectsData) return null;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center margin-top-30">
            <SlideList
              user={user}
              _loadMore={this._loadMoreProjects}
              data={{ projects: projectsData }}
              infiniteData={infiniteProjectsData}
            />
          </div>
        </div>
      </div>
    );
  };
  _renderOrgs = () => {
    const {
      user,
      searchResults: { orgsData, infiniteOrgsData }
    } = this.props;
    if (!orgsData) return null;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center margin-top-30">
            <SlideList
              type="org"
              user={user}
              _loadMore={this._loadMoreOrgs}
              data={{ orgs: orgsData }}
              infiniteData={infiniteOrgsData}
            />
          </div>
        </div>
      </div>
    );
  };

  _renderTab = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case "all":
        return this._renderAll();
      case "campaigns":
        return this._renderCampaigns();
      case "projects":
        return this._renderProjects();
      case "orgs":
        return this._renderOrgs();
      default:
        return null;
    }
  };

  _handleNav = tab => {
    return this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    const {
      searchResults: { infiniteProjectsData }
    } = this.props;
    let headerText = "Please use the search field above";
    if (infiniteProjectsData) {
      headerText = `Search results for '${infiniteProjectsData.query}'`;
    }
    return (
      <Layout>
        <div className="container-fluid no-gutters bg-light">
          <div className="row">
            <div className="col-12 padding-top-30 padding-bottom-30 text-center">
              <p className="font-xxl ">{headerText}</p>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-blue">
          <div className="row align-items-center padding-top-8 padding-bottom-8">
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-2">
                  <p
                    onClick={() => this._handleNav("all")}
                    className={`white font-s nav_item pointer ${
                      activeTab == "all" ? "bold" : ""
                    }`}
                  >
                    ALL
                  </p>
                </div>
                <div className="col-4">
                  <p
                    onClick={() => this._handleNav("campaigns")}
                    className={`white font-s nav_item pointer ${
                      activeTab == "campaigns" ? "bold" : ""
                    }`}
                  >
                    CAMPAIGNS
                  </p>
                </div>
                <div className="col-4">
                  <p
                    onClick={() => this._handleNav("projects")}
                    className={`white font-s nav_item pointer ${
                      activeTab == "projects" ? "bold" : ""
                    }`}
                  >
                    PROJECTS
                  </p>
                </div>
                <div className="col-2">
                  <p
                    onClick={() => this._handleNav("orgs")}
                    className={`white font-s nav_item pointer ${
                      activeTab == "orgs" ? "bold" : ""
                    }`}
                  >
                    ORGS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 no_gutters">{this._renderTab()}</div>
          </div>
        </div>
        <style jsx>{`
          p {
            margin: 0;
          }
          .no_gutters {
            padding: 0;
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    searchMoreProjects: bindActionCreators(searchMoreProjects, dispatch),
    searchMoreCampaigns: bindActionCreators(searchMoreCampaigns, dispatch),
    searchMoreOrgs: bindActionCreators(searchMoreOrgs, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, searchSliders, searchResults }
  } = state;
  return {
    user,
    searchSliders,
    searchResults
  };
};

export default connect(
  ms,
  md
)(SearchComponent);
