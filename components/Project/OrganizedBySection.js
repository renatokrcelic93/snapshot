import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_black, vomo_light_bg, vomo_dkblack, vomo_grey, vomo_blgrey }
} = globalStyles;

class OrganizedBy extends Component {
  render() {
    const {
      author: { link, org, avatar }
    } = this.props;
    return (
      <SectionWrapper title="Organized by">
        <div className="project_org_list_container">
          <img className="project_org_icon" src={avatar} />
          <a
            id="project_org"
            className="project_link_to_org blue font-s bold"
            href={link}
          >
            {org.name}
          </a>
        </div>
        <style jsx>{`
          .project_org_list_container {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .project_org_icon {
            height: 25px;
            width: 25px;
            margin-right: 10px;
            border-radius: 50%;
          }
          .project_link_to_org {
            display: inline-block;
            text-decoration: none;
          }
          @media (max-width: 768px) {
            .project_link_to_org {
              color: ${vomo_blgrey};
              font-weight: 500;
            }
            .project_org_icon {
              display: none;
            }
          }
        `}</style>
      </SectionWrapper>
    );
  }
}

export default OrganizedBy;
