import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import CampaignListItem from "../Project/CampaignListItem";

class Campaigns extends Component {
  _renderCampaigns = campaigns => {
    return campaigns.map(({ _name, logo }) => {
      return <CampaignListItem key={_name} name={_name} logo={logo} />;
    });
  };
  render() {
    const {
      org: { campaigns }
    } = this.props;
    return (
      <div>
        {campaigns.length > 0 && (
          <SectionWrapper title="Recent campaigns">
            {this._renderCampaigns(campaigns)}
          </SectionWrapper>
        )}
      </div>
    );
  }
}

export default Campaigns;
