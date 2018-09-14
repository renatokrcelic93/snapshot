import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_light_bg,
    vomo_ltblue,
    vomo_black,
    vomo_dkblack,
    vomo_blue,
    vomo_white
  }
} = globalStyles;

class Questions extends Component {
  render() {
    const { href } = this.props;
    return (
      <SectionWrapper title="Questions?">
        <a
          id="project_contact"
          href={href}
          className="questions_link blue font-s bold margin-bottom-15"
        >
          <em />
          Contact Organizer
        </a>
        <a
          id="faq"
          href="https://vomo.zendesk.com/hc/en-us"
          className="questions_link blue font-s bold margin-bottom-15"
        >
          FAQ
        </a>
        <style jsx>{`
          .questions_link {
            display: block;
            cursor: pointer;
            text-decoration: none;
          }
          @media (max-width: 768px) {
            .questions_link {
              background-color: #f0f0f0;
              color: ${vomo_ltblue};
              font-size: 0.85rem;
              letter-spacing: 0.015em;
              margin-bottom: 15px;
              padding: 15px;
            }
            #project_contact em {
              background: url(../static/mail.svg) 0 0 no-repeat;
              display: block;
              height: 25px;
              width: 29px;
              float: left;
              margin-right: 15px;
              position: relative;
              top: -2px;
            }
            #faq {
              display: none;
            }
          }
        `}</style>
      </SectionWrapper>
    );
  }
}

export default Questions;
