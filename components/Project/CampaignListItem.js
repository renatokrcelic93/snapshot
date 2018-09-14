import React, { Component } from "react";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_black, vomo_light_bg, vomo_dkblack, vomo_grey }
} = globalStyles;

class CampaignListItem extends Component {
  render() {
    const { slug, name, logo } = this.props;
    return (
      <div key={logo} className="project_campaign_list_container">
        <img className="project_campaign_icon" src={logo} />
        <a
          id="project_partof_campaign"
          className="project_link_to_campaign blue font-s bold"
          href={`/campaign/${slug}`}
        >
          {name}
        </a>
        <style jsx>{`
          .project_campaign_list_container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .project_campaign_icon {
            height: 25px;
            width: 25px;
            margin-right: 10px;
            border-radius: 50%;
          }
          .project_link_to_campaign {
            display: inline-block;
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          @media (max-width: 768px) {
            .project_campaign_icon {
              display: none;
            }
            .project_link_to_campaign {
              color: ${vomo_grey};
              font-weight: 500;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default CampaignListItem;
