import React from "react";
import Parser from "html-react-parser";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_dkblack, vomo_blue, vomo_ltgrey }
} = globalStyles;

class Slide extends React.Component {
  componentDidMount() {}
  render() {
    const {
      title,
      organizer,
      time,
      image,
      style,
      height,
      hidden,
      onClick
    } = this.props;
    if (hidden) {
      return (
        <div onClick={onClick} {...this.props} className="slide-root">
          <div id="card-container" className="card-container">
            <div className="card">
              <img
                className="overlay_image"
                src="../../static/padlock.png"
                alt=""
              />
              <p className="overlay_text bold blue">
                Follow {organizer} to see this project.
              </p>
              <div className="image-container">
                <div className="overlay" />
                <div className="slide-image" />
              </div>
              <div className="details-container">
                <div className="overlay" />
                <p className="details-title">{Parser(title ? title : "")}</p>
                <p className="details">{Parser(organizer ? organizer : "")}</p>
                <p className="details">{Parser(time ? time : "")}</p>
              </div>
            </div>
          </div>
          <style jsx>{`
            .slide-root {
              display: inline-block;
              outline: none;
            }
            .card-container {
              position: relative;
              width: 95%;
            }
            .card {
              margin-left: 0px;
              font-family: Quicksand, sans-serif;
              position: relative;
              display: block;
              overflow: hidden;
              width: 100%;
              -webkit-box-flex: 1;
              flex: 1;
              border: 1px solid #e9e9e9;
              border-radius: 3px;
              background-color: #fff;
              transition: all 500ms ease;
              color: #5c666f;
              text-align: left;
              cursor: pointer;
              height: ${height}px;
            }
            .overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.9);
            }
            .overlay_image {
              width: 50px;
              height: 50px;
              position: absolute;
              top: 30%;
              left: 50%;
              margin-top: -25px;
              margin-left: -25px;
              z-index: 100;
            }
            .overlay_text {
              position: absolute;
              bottom: 60px;
              text-align: center;
              width: 100%;
              z-index: 100;
            }
            .card:hover {
              box-shadow: 0px 1px 12px -1px rgba(0, 0, 0, 0.29);
              transform: translateY(-5px);
            }
            .image-container {
              position: relative;
            }
            .slide-image {
              display: block;
              height: 150px;
              background-position: 50% 50%;
              background-size: cover;
              background-repeat: no-repeat;
              box-sizing: border-box;
              background-image: url(${image});
              filter: blur(5px);
            }
            .details-container {
              position: "relative";
              padding: 17px 20px;
            }
            .details-title {
              color: ${vomo_blue};
              display: -webkit-box;
              font-size: ${fontSizes.ml};
              font-weight: 500;
              height: 50px;
              line-height: inherit;
              margin-bottom: 0px;
              margin-top: 0;
              overflow: hidden;
              text-transform: capitalize;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              filter: blur(5px);
            }
            .details {
              color: ${vomo_dkblack};
              font: 400 ${fontSizes.sm} "Quicksand";
              line-height: inherit;
              margin-top: 10px;
              margin-bottom: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 208px;
              filter: blur(5px);
            }
            p.details:last-child {
              margin-top: 0;
            }
            @media (max-width: 576px) {
              .details-title {
                font-size: ${fontSizes.xs};
              }
              .details {
                font-size: ${fontSizes.xxs};
              }
              .details-container {
                padding: 10px;
              }
            }
          `}</style>
        </div>
      );
    }
    return (
      <div onClick={onClick} {...this.props} className="slide-root">
        <div id="card-container" className="card-container">
          <div className="card">
            <div className="image-container">
              <div className="slide-image" />
            </div>
            <div className="details-container">
              <p className="details-title">{Parser(title ? title : "")}</p>
              <p className="details">{Parser(organizer ? organizer : "")}</p>
              <p className="details">{Parser(time ? time : "")}</p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .slide-root {
            display: inline-block;
            outline: none;
          }
          .card-container {
            width: 95%;
          }
          .card {
            margin-left: 0px;
            font-family: Quicksand, sans-serif;
            position: relative;
            display: block;
            overflow: hidden;
            width: 100%;
            -webkit-box-flex: 1;
            flex: 1;
            border: 1px solid #e9e9e9;
            border-radius: 3px;
            background-color: #fff;
            transition: all 500ms ease;
            color: #5c666f;
            text-align: left;
            cursor: pointer;
            height: ${height}px;
          }
          .card:hover {
            box-shadow: 0px 1px 12px -1px rgba(0, 0, 0, 0.29);
            transform: translateY(-5px);
          }
          .image-container {
          }
          .slide-image {
            display: block;
            height: 150px;
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
            box-sizing: border-box;
            background-image: url(${image});
          }
          .details-container {
            position: "relative";
            padding: 17px 20px;
          }
          .details-title {
            color: ${vomo_blue};
            display: -webkit-box;
            font-size: ${fontSizes.ml};
            font-weight: 500;
            height: 50px;
            line-height: inherit;
            margin-bottom: 0px;
            margin-top: 0;
            overflow: hidden;
            text-transform: capitalize;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .details {
            color: ${vomo_dkblack};
            font: 400 ${fontSizes.sm} "Quicksand";
            line-height: inherit;
            margin-top: 10px;
            margin-bottom: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 208px;
          }
          p.details:last-child {
            margin-top: 0;
          }
          @media (max-width: 576px) {
            .details-title {
              font-size: ${fontSizes.xs};
            }
            .details {
              font-size: ${fontSizes.xxs};
            }
            .details-container {
              padding: 10px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Slide;
