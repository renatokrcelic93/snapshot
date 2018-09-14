import React, { Component } from "react";
import Slide from "../Slider/Slide";
import OrgSlide from "../OrgSlider/OrgSlide";
import InfiniteScroll from "react-infinite-scroller";
import Router from "next/router";
import Loader from "../Shared/Loader";
import moment from "moment";

class SlideList extends Component {
  _onCardClick = (data, isHidden, type) => {
    if (isHidden) {
      const slug = data.organization.slug;
      return Router.push(`/organizationPage?slug=${slug}`, `/org/${slug}`).then(
        () => window.scrollTo(0, 0)
      );
    } else if (type === "project") {
      const slug = data.slug;
      return Router.push(`/projectPage?slug=${slug}`, `/project/${slug}`).then(
        () => window.scrollTo(0, 0)
      );
    } else if (type === "campaign") {
      const slug = data.slug;
      return Router.push(
        `/campaignPage?slug=${slug}`,
        `/campaign/${slug}`
      ).then(() => window.scrollTo(0, 0));
    } else if (type === "org") {
      const slug = data.slug;
      return Router.push(
        `/organizationPage?slug=${slug}`,
        `/organization/${slug}`
      ).then(() => window.scrollTo(0, 0));
    } else {
      return null;
    }
  };

  _renderProjects = (data, type) => {
    switch (type) {
      case "project":
        const { projects } = data;
        return projects.map(project => {
          const {
            anytime,
            anywhere,
            thumb,
            next_happening,
            organization,
            name
          } = project;
          const isHidden = this._checkHidden(project);
          // const image = thumb.urls ? thumb.urls.s : ''
          let image = "";
          if (thumb.urls) {
            image = thumb.urls.s;
          } else if (thumb) {
            image = thumb;
          }
          const orgName = organization.name;
          const projectTime = anytime
            ? "Anytime"
            : moment(next_happening ? next_happening.starts_at : "").format(
                "ddd, MMM D"
              );
          return (
            <Slide
              hidden={isHidden}
              onClick={() => this._onCardClick(project, isHidden, type)}
              key={project.slug}
              image={image}
              title={name}
              organizer={orgName}
              time={projectTime}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "campaign":
        const { campaigns } = data;
        return campaigns.map(campaign => {
          const isHidden = this._checkHidden(campaign);
          const image = campaign.logo.urls ? campaign.logo.urls.s : "";
          return (
            <Slide
              hidden={isHidden}
              onClick={() => this._onCardClick(campaign, isHidden, type)}
              key={campaign.slug}
              image={image}
              title={campaign.name}
              organizer={""}
              time={""}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "org":
        const { orgs } = data;
        return orgs.map(org => {
          const { id, logo, name } = org;
          const image = logo ? logo.urls.s : "";
          return (
            <OrgSlide
              onClick={() => this._onCardClick(org, false, type)}
              key={id}
              image={image}
              title={name}
              style={{ width: 180 }}
            />
          );
        });
      default:
        return null;
    }
  };

  _renderLoadMoreProjects = (infiniteData, _loadMore, data) => {
    if (infiniteData.hasMore) {
      return (
        <div onClick={() => _loadMore(data)} className="vomo-button">
          Load more
        </div>
      );
    } else {
      return null;
    }
  };

  _checkHidden = project => {
    if (project.privacy == "PRIVATE") {
      if (this.props.user === null) return true;
      const followingProjectsOrg = this.props.user.followed_orgs.find(
        org => org.slug == project.organization.slug
      );
      if (followingProjectsOrg) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  render() {
    const {
      type = "project",
      data,
      infiniteData,
      _loadMore,
      loadButton = false,
      user
    } = this.props;
    if (loadButton) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {this._renderProjects(data, type)}
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              {this._renderLoadMoreProjects(infiniteData, _loadMore, data)}
            </div>
          </div>
        </div>
      );
    }
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          _loadMore(data.infiniteOrgProjectsData ? data : infiniteData)
        }
        hasMore={infiniteData.hasMore}
        loader={<Loader key={"key"} />}
      >
        {this._renderProjects(data, type)}
      </InfiniteScroll>
    );
  }
}

export default SlideList;
