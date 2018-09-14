import React, { Component } from "react";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_black, vomo_blue, vomo_ltgrey }
} = globalStyles;

class SectionWrapper extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div>
        <h3 className="project_details_row_title semi-bold font-l">{title}</h3>
        {children}
        <style jsx>{`
          .project_details_row_title {
            margin-top: 0;
            margin-bottom: 15px;
            color: ${vomo_black};
          }
          @media (max-width: 768px) {
            .project_details_row_title {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default SectionWrapper;
