import React, { Component } from "react";
import IconTextContainer from "../Shared/IconTextContainer";

class Links extends Component {
  _share = (organization, location) => {
    var org_url = encodeURIComponent(
      "http://dev.vomo.org/org/" + organization._id
    );

    switch (location) {
      case "facebook":
        window.open(
          "https://www.facebook.com/dialog/share?app_id=1427223620658359&display=popup&href=" +
            org_url +
            "&redirect_uri=" +
            org_url
        );
        break;
      case "messenger":
        window.open(
          "https://www.facebook.com/dialog/send?app_id=1427223620658359&display=popup&link=" +
            org_url +
            "&redirect_uri=" +
            org_url
        );
        break;
      case "twitter":
        window.open(
          "http://twitter.com/share?text=" +
            encodeURIComponent("Join me to serve! #vomo\n") +
            "&url=" +
            org_url
        );
        break;
    }
  };
  render() {
    let website_href = "";
    const { organization } = this.props;
    const { website, address } = organization;
    const ws = website ? website.replace(/https?:\/\//g, "") : null;
    if (ws) {
      website_href = /http/.test(website) ? website : `//${website}`;
      website_href = `http://${ws}`;
    }
    const addressLabel = address.formatted_short
      ? address.formatted_short
      : address.formatted_address;
    if (website || address) {
      return (
        <div>
          <div>
            {website && (
              <IconTextContainer
                containerType="orgPage"
                text={website}
                src="../static/screen.svg"
                href={website_href}
              />
            )}
          </div>
          <div>
            {address && (
              <IconTextContainer
                containerType="orgPage"
                text={addressLabel}
                src="../static/location.svg"
              />
            )}
          </div>
          <div className="margin-top-15">
            <img
              id="social_link_fb"
              onClick={() => this._share(organization, "facebook")}
              className="project_social_icon"
              src="../static/fb-green.svg"
            />
            <img
              id="social_link_msg"
              onClick={() => this._share(organization, "messenger")}
              className="project_social_icon"
              src="../static/fb-message-green.svg"
            />
            <img
              id="social_link_twi"
              onClick={() => this._share(organization, "twitter")}
              className="project_social_icon"
              src="../static/twitter-green.svg"
            />
          </div>
          <style>{`
            .project_social_icon {
              height: 25px;
              width: 25px;
              margin-right: 10px;
              cursor: pointer;
              text-decoration: none;
            }
          `}</style>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Links;
