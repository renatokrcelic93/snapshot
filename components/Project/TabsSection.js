import React, { Component } from "react";
import Parser from "html-react-parser";
import moment from "moment";
import LikeButton from "./LikeButton";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_black,
    vomo_ltgrey,
    vomo_grey,
    vomo_light_bg,
    vomo_dkblack,
    vomo_blue,
    vomo_blgrey
  }
} = globalStyles;

class Tabs extends Component {
  state = {
    activeTab: "Details"
  };

  _renderTabButton = label => {
    if (this.state.activeTab == label) {
      return (
        <div onClick={() => this.setState({ activeTab: label })}>
          <h3
            id="project_active"
            className="project_tab_button active pointer font-l"
          >
            {label}
          </h3>
          <style jsx>{`
            .project_tab_button {
              color: ${vomo_blgrey};
              margin: 0;
              display: inline-block;

              border-bottom: 3px solid #fff;
            }
            .project_tab_button.active {
              color: ${vomo_black};
              border-bottom: 3px solid #56b780;
            }
            @media (max-width: 768px) {
              .project_tab_button.active {
                color: ${vomo_blue};
                font-size: ${fontSizes.xs};
                padding-bottom: 5px;
                text-transform: uppercase;
              }
            }
          `}</style>
        </div>
      );
    } else {
      return (
        <div onClick={() => this.setState({ activeTab: label })}>
          <h3
            id="project_inactive"
            className="project_tab_button pointer font-l"
          >
            {label}
          </h3>
          <style jsx>{`
            .project_tab_button {
              margin: 0;
              display: inline-block;
              border-bottom: 3px solid #fff;
            }
            @media (max-width: 768px) {
              .project_tab_button {
                color: ${vomo_grey};
                font-size: ${fontSizes.xs};
                padding-bottom: 5px;
                text-transform: uppercase;
              }
            }
          `}</style>
        </div>
      );
    }
  };

  _renderLike = (project, user) => {
    if (!user) {
      return;
    }
    const { _handleLike } = this.props;
    let isLiked = user.liked_projects.find(p => p.slug == project.slug);
    if (isLiked) {
      return (
        <LikeButton
          _handleLike={_handleLike}
          direction="dislike"
          project={project}
          user={user}
          src="../static/like-filled.svg"
        />
      );
    } else {
      return (
        <LikeButton
          _handleLike={_handleLike}
          direction="like"
          project={project}
          user={user}
          src="../static/like-void.svg"
        />
      );
    }
  };

  _renderTabs = project => {
    if (this.state.activeTab == "Details") {
      return (
        <div className="margin-top-30">
          {this._renderDetails(project.detailsObject)}
        </div>
      );
    } else {
      return (
        <div className="margin-top-30">
          <div className="container">
            <div className="row">
              <div className="col-12">{this._renderUpdates(project)}</div>
            </div>
            <div className="row">
              <div className="col-12">
                {this._renderLoadMoreUpdates(project)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  _renderLoadMoreUpdates = project => {
    if (project.infiniteUpdatesData.hasMore) {
      const { _loadMoreUpdates } = this.props;
      return (
        <div onClick={() => _loadMoreUpdates(project)} className="vomo-button">
          Load more
        </div>
      );
    } else {
      return null;
    }
  };

  _renderRoles = roles => {
    return roles.map(role => {
      return <li key={role}>{role}</li>;
    });
  };
  _renderCategories = categories => {
    return categories.map(category => {
      return (
        <div key={category} className="text-center">
          <div className="category_container bg-light">
            <p className="font-s vomo-grey semi-bold">{category}</p>
          </div>
          <style jsx>{`
            .category_container {
              margin-right: 8px;
              padding-left: 12px;
              padding-right: 12px;
              border-radius: 50px;
            }
          `}</style>
        </div>
      );
    });
  };

  _renderDetails = details => {
    if (!details) {
      return null;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 margin-bottom-25">
            <p>
              {Parser(
                details.text
                  ? details.text.replace(/(\r\n|\n|\r)/gm, "<br/>")
                  : ""
              )}
            </p>
          </div>
          {details.details && (
            <div className="col-6">
              <h4 className="black">Need to know</h4>
              <p>{details.details}</p>
            </div>
          )}
          {details.roles && (
            <div className="col-6">
              <h4 className="black">Available roles</h4>
              <ul>{this._renderRoles(details.roles)}</ul>
            </div>
          )}
          {details.categories && (
            <div className="row">
              {this._renderCategories(details.categories)}
            </div>
          )}
        </div>
      </div>
    );
  };

  _renderUpdates = ({ updates }) => {
    return updates.map(update => {
      const date = moment(update.ts_creation).format("ddd, MMM D");
      const text = update.text ? Parser(update.text) : "";
      return (
        <div key={update._id} className="row">
          <div className="col-sm-12">
            <h4 className="font-s">{date}</h4>
          </div>
          <div className="col-sm-12">
            <p className="font-xs">{text}</p>
          </div>
        </div>
      );
    });
  };

  render() {
    const { project, details, user } = this.props;
    return (
      <div className="tabsWrapper">
        <div className="col-sm-12">
          <div className="row align-items-center margin-top-30">
            <div className="col-sm-2">{this._renderTabButton("Details")}</div>
            <div className="col-sm-4">
              <div className="update_tab_button">
                {this._renderTabButton("Updates")}
              </div>
              <div className="update_tab_button update_tab_button_text font-xl">
                {"•"}
              </div>
              <div
                id="project_updates_num"
                className="update_tab_button update_tab_button_text green font-l bold"
              >
                {project.n_updates}
              </div>
            </div>

            {false && (
              <div className="col-sm-2 offset-sm-4">
                {this._renderLike(project, user)}
              </div>
            )}
          </div>
        </div>
        <div
          id="project_details-updates_container"
          className="col-12 nopadding"
        >
          {this._renderTabs(project)}
        </div>
        <style jsx>
          {`
            .update_tab_button {
              display: inline-block;
            }
            .update_tab_button_text {
              margin-left: 5px;
            }
            @media (max-width: 768px) {
              .align-items-center.margin-top-30 {
                border-bottom: 1px solid ${vomo_grey};
                margin-top: 0;
              }
              .tabsWrapper {
                margin-bottom: 20px;
              }
              .tabsWrapper > div {
                padding-left: 20px;
                padding-right: 20px;
              }
              .tabsWrapper .align-items-center > div {
                width: inherit;
              }
              .update_tab_button_text {
                display: none;
              }
              #project_details-updates_container {
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Tabs;
