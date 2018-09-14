import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import CampaignListItem from "./CampaignListItem";

class PartOf extends Component {
  _renderCampaigns = campaigns => {
    return campaigns.map(({ slug, name, logo }) => {
      return (
        <CampaignListItem key={slug} slug={slug} name={name} logo={logo} />
      );
    });
  };
  render() {
    const { campaigns } = this.props;
    return (
      <SectionWrapper title="Part of">
        {this._renderCampaigns(campaigns)}
      </SectionWrapper>
    );
  }
}

export default PartOf;
