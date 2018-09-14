import React from "react";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_dkblack, vomo_light_bg, vomo_white, vomo_blue }
} = globalStyles;

class Slide extends React.Component {
  componentDidMount() {}
  render() {
    const { title, organizer, time, image } = this.props;

    return (
      <div {...this.props} className="slide-root">
        <div className="card-container">
          <div className="card">
            <div className="image-container">
              <div className="slide-image" />
            </div>
            <div className="details-container">
              <p
                className="details ellipsis"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .slide-root {
            display: inline-block;
          }
          .card-container {
            width: 95%;
          }
          .card {
            max-width: 270px;
            margin-left: 0px;
            font-family: Quicksand, sans-serif;
            position: relative;
            display: block;
            overflow: hidden;
            width: 100%;
            -webkit-box-flex: 1;
            flex: 1;
            background-color: transparent;
            transition: all 500ms ease;
            color: #5c666f;
            text-align: center;
            cursor: pointer;
          }
          .image-container {
            display: flex;
            margin-left: auto;
            margin-right: auto;
            width: 130px;
            height: 130px;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            border-radius: 50%;
            background-color: #fff;
          }
          .slide-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-position: 50% 50%;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(${image});
          }
          .details-container {
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 20px;
            padding-right: 20px;
          }
          .details {
            color: ${vomo_dkblack};
            font: 400 ${fontSizes.s} "Quicksand";
            margin-top: 10px;
            margin-bottom: 0;
          }
          .ellipsis {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          @media (max-width: 576px) {
            .details {
              font-size: ${fontSizes.xxs};
            }
          }
          .test {
            border: 1px solid red !important;
          }
        `}</style>
      </div>
    );
  }
}

export default Slide;
