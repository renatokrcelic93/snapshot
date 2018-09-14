import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import config from "../../config";

class Share extends Component {
  _share = (project, location) => {
    var project_url = encodeURIComponent(
      `${config.ROOT_URL}/project/${project.slug}`
    );
    switch (location) {
      case "facebook":
        window.open(
          "https://www.facebook.com/dialog/share?app_id=1427223620658359&display=popup&href=" +
            project_url +
            "&redirect_uri=" +
            project_url
        );
        break;
      case "messenger":
        window.open(
          "https://www.facebook.com/dialog/send?app_id=1427223620658359&display=popup&link=" +
            project_url +
            "&redirect_uri=" +
            project_url
        );
        break;
      case "twitter":
        window.open(
          "http://twitter.com/share?text=" +
            encodeURIComponent("Join me in volunteering! #vomo\n") +
            "&url=" +
            project_url
        );
        break;
    }
  };
  render() {
    const { project } = this.props;
    return (
      <SectionWrapper title="Share">
        <img
          id="project_share_fb"
          onClick={() => this._share(project, "facebook")}
          className="project_social_icon"
          src="data:image/png;base64,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"
        />
        <img
          id="project_share_msg"
          onClick={() => this._share(project, "messenger")}
          className="project_social_icon"
          src="../static/messenger.svg"
        />
        <img
          id="project_share_twi"
          onClick={() => this._share(project, "twitter")}
          className="project_social_icon"
          src="data:image/png;base64,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"
        />
        <style jsx>{`
          .project_social_icon {
            height: 25px;
            width: 25px;
            margin-right: 10px;
            cursor: pointer;
            text-decoration: none;
          }
          @media (max-width: 768px) {
            .project_social_icon {
              display: none;
            }
          }
        `}</style>
      </SectionWrapper>
    );
  }
}

export default Share;
