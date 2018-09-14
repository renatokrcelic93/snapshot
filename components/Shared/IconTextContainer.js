import React, { Component } from "react";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_green,
    vomo_black,
    vomo_blue,
    vomo_grey,
    vomo_white,
    vomo_light_bg,
    vomo_ltblue
  }
} = globalStyles;

class IconTextContainer extends Component {
  render() {
    const { containerType, text, maps_link, src, href } = this.props;
    const cursor = href ? "pointer" : "auto";
    if (containerType == "basic") {
      return (
        <div id="project_date" className="icon_text_container">
          <img className="project_icon" src={src} />
          <a href={href ? href : "#"} className="project_icon_label font-s">
            {text}
          </a>
          <style jsx>{`
            .project_icon {
              height: 20px;
              width: 20px;
              margin-right: 10px;
            }
            .project_icon_label {
              color: inherit;
              display: inline-block;
              position: relative;
              top: -3px;
              text-decoration: none;
              cursor: ${cursor};
            }
            .icon_text_container {
              margin-bottom: 15px;
            }
            @media (max-width: 768px) {
              #project_date {
                display: none;
              }
            }
          `}</style>
        </div>
      );
    } else if (containerType == "location") {
      return (
        <div
          id="project_location"
          className="project_icon_text_container_location"
        >
          <img className="project_icon" src={src} />
          <div className="project_icon_label font-s">
            <em />
            <p>{text}</p>
            {maps_link && (
              <a href={maps_link} className="link font-xxs blue bold">
                Get directions
              </a>
            )}
          </div>
          <style jsx>{`
            .project_icon_text_container_location {
              display: flex;
              align-items: flex-start;
              margin-bottom: 15px;
            }
            .project_icon_label > p {
              font-size: ${fontSizes.s};
              line-height: inherit;
              margin-top: 0;
              margin-bottom: 0px;
            }
            .link {
              cursor: pointer;
              text-decoration: none;
            }
            .project_icon {
              height: 20px;
              width: 20px;
              margin-right: 10px;
            }
            .project_icon_label {
              display: inline-block;
              text-decoration: none;
            }
            @media (max-width: 768px) {
              #project_location {
                font: ${fontSizes.s} / ${lineHeights.s} Arial, Helvetica,
                  sans-serif;
              }
              #project_location .project_icon {
                display: none;
              }
              #project_location .project_icon_label a.link {
                color: ${vomo_ltblue};
                font-size: ${fontSizes.s};
                font-weight: normal;
                text-decoration: underline;
              }
              #project_location .project_icon_label em {
                background: url(../static/map-marker-gray.svg) 0 0 no-repeat;
                display: block;
                height: 25px;
                width: 29px;
                float: left;
                margin-right: 15px;
                position: relative;
                top: -2px;
              }
              #project_location .project_icon_label {
                width: 100%;
              }
            }
          `}</style>
        </div>
      );
    } else if (containerType == "orgPage") {
      return (
        <div className="icon_text_container">
          <img className="project_icon" src={src} />
          <a
            href={href ? href : "#"}
            className="project_icon_label font-m bold"
          >
            {text}
          </a>
          <style jsx>{`
            .project_icon {
              height: 18px;
              width: 18px;
              margin-right: 10px;
            }
            .project_icon_label {
              color: inherit;
              display: inline-block;
              text-decoration: none;
              cursor: ${cursor};
            }
          `}</style>
        </div>
      );
    } else {
      console.log("provide a containerType");
      return null;
    }
  }
}

export default IconTextContainer;
