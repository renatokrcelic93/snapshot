import React from "react";
import Slider from "../../custom-react-slider";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Parser from "html-react-parser";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: { vomo_dkblack, vomo_blue, vomo_white, vomo_ltgrey }
} = globalStyles;

class SliderComponent extends React.Component {
  state = {
    backgroundColor: "#fff",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0"
  };
  componentDidMount() {
    switch (this.props.data.queryType) {
      case "nearby_orgs":
        return this.setState({
          backgroundColor: "#edf0f4",
          paddingTop: "30px",
          paddingBottom: "30px",
          marginBottom: "40px"
        });
      case "followed_org_projects":
        return this.setState({
          backgroundColor: "#edf0f4",
          paddingTop: "20px"
        });
      case "followed_org_campaigns":
        return this.setState({
          backgroundColor: "#edf0f4",
          paddingTop: "20px"
        });
      default:
        return null;
    }
  }
  _calculateBreakpoints = () => {
    // this is the amount of padding + margin that wraps the slider component on a given page, on hub it is 70
    let { defaultSpacing } = this.props;
    // the width of the slide - including padding, margin - in order to calculate how many should we display on different screen sizes. 260 for this kinnd of slides
    let slideWidth = 260;
    defaultSpacing = defaultSpacing ? defaultSpacing : 70;
    return Array(25)
      .fill()
      .map((breakpoint, i) => {
        slideWidth += 260;
        let slidesToScroll = 1;
        if (i > 4) {
          slidesToScroll = 4;
        }
        return {
          breakpoint: defaultSpacing + slideWidth,
          settings: {
            slidesToShow: i,
            slidesToScroll
          }
        };
      });
  };

  render() {
    const { slickTrackHeight = 285, seeAllCallback } = this.props;
    const settings = {
      className: "project-slider variable-width",
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 8,
      slidesToScroll: 4,
      variableWidth: true,
      dotsClass: "custom-dots",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
          <style jsx>{`
            background-color: ${this.state.backgroundColor};
            margin-bottom: ${this.state.marginBottom};
            padding-top: ${this.state.paddingTop};
            padding-bottom: ${this.state.paddingBottom};
          `}</style>
        </div>
      ),
      customPaging: function(i) {
        return <span className="custom-dot" />;
      },
      responsive: this._calculateBreakpoints()
      //   responsive: [
      //   {
      //     breakpoint: 2250,
      //     settings: {
      //       slidesToShow: 7,
      //       slidesToScroll: 4,
      //     }
      //   },
      //   {
      //     breakpoint: 2120,
      //     settings: {
      //       slidesToShow: 6,
      //       slidesToScroll: 4,
      //     }
      //   },
      //   {
      //     breakpoint: 1860,
      //     settings: {
      //       slidesToShow: 5,
      //       slidesToScroll: 4,
      //     }
      //   },
      //   {
      //     breakpoint: 1600,
      //     settings: {
      //       slidesToShow: 4,
      //       slidesToScroll: 2,
      //     }
      //   },
      //   {
      //     breakpoint: 1340,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 1,
      //     }
      //   },
      //   {
      //     breakpoint: 1080,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 1,
      //     }
      //   },
      //   {
      //     breakpoint: 780,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     }
      //   },
      //   {
      //     breakpoint: 520,
      //     settings: {
      //       slidesToShow: 0,
      //       slidesToScroll: 1,
      //     }
      //   },
      // ]
    };
    return (
      <div className="container-fluid hub">
        <div id="general_container" className="slider-root">
          <div className="row">
            <div className="col-6 text-left">
              <div className="slider-title">
                {Parser(this.props.data.sliderTitle)}
              </div>
            </div>
            {seeAllCallback && (
              <div className="col-6 text-right">
                <div
                  id="hub_see_all"
                  onClick={seeAllCallback}
                  className="green pointer"
                >
                  see all
                </div>
              </div>
            )}
          </div>
          <Slider {...settings}>
            {this.props.renderSlides(this.props.data)}
          </Slider>
          <style jsx>{`
            .slider-title {
              color: ${vomo_dkblack};
              font: 400 ${fontSizes.ml} "Quicksand";
              letter-spacing: -0.025em;
              margin-bottom: 10px;
              margin-top: 10px;
            }
            @media (max-width: 576px) {
              .slider-title {
                font-size: ${fontSizes.xs};
                letter-spacing: 0.025em;
              }
            }
            :global(.custom-dots) {
              width: 100%;
              margin: 0;
              list-style: none;
              text-align: center;
              display: block;
            }

            @media (max-width: 576px) {
              :global(.custom-dots) {
                display: none;
              }
            }

            :global(.custom-dots li) {
              position: relative;
              display: inline-block;
              // width: 5px;
              // height: 5px;
              margin: 0 3px;
              padding: 0;
              cursor: pointer;
            }

            :global(.custom-dots ul) {
              padding-left: 0;
            }
            :global(.slick-active .custom-dot) {
              background: 0 0
                url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAACXBIWXMAACxKAAAsSgF3enRNAAADQElEQVRYhcWYMUxTQRjH/3bESLuwiTJTjXXAiIFYJwmQyCAdYLANOgAOigtMPiaIRtABGNRYBx3AgaEl4FQjBgODgJa5gJMuLUbWM9/L3cv17h7ta16fv+RCc++9+/58d/fd990pxhhqIM5bDECE/w0D2AdQAFAEkONt2/PwJKrK1sIYe84YKzJvFBhjFmMsUq0trcPQaLC0RyEmilycyYYnUX01eKYS24yxmMGW005aUw8AzGq9nOzaFtY38tjNF1A6+ovv+QI62qP2w872KDquRdFxtVX7jlMCkASwrD0BXEWlAdxRO4/+HGP+ZRbzr7K2kEqca27CYP8NjI/1u72Z4rYqiqL/4I3aufB6BVPPFqsSo0LiFmbvu3nusrpDVVG0tb+pX42MzeHdYk4bzSsLs6MY6I+rX9FUtvAwYhNSXtDm2C9BxPDDOUzPLKndYXUKZVEWgPPywwkr7ZsgwdTMIt4vaWPe4sHYRkxfhEfisHhAu2tg6Ik2qB+EG0/jy8enaD7bJI/2SQgTnuqTBRHjlrbWfYM2y7ilbbrrfE07opLyU3LvweHvuokiMqubOPyp2UgKURGu0oHiUBAY7DjTF5N7ST1F5yDIrG2qVi6Rk0Lyqid2AxJE0BIxTGFMjVOBeUmwr4vSgmfgHBz+Uk3qngqa0tGxajHy30VdjLaoXTlNFJ3oQRJpbNCshXhy79DJE7UgoOPmQqvmqe2QmsvQeRSUt3q72tQuqoaKIZ7H7MhPKFsMgoGEZseeNbGmyk7HkXs9tmvrCeXzhkw07Sqq8UwDJh4l6irKMP6+6imawrfyG8ND3U514rugsYTJS5b4IefoWqJH1Uv37ce+Hj2DiTjmZ0bV7h05MZDjVFHNq2gaVz5MmgKcn4Kg2jUVDmXTKISN3O3RRqoW2jTTkyk3QalKJZbAWIyuf92zaz+qjKuFvENrSMnHBS94JV6Gmyi4CSN+7BWQWd3C5428JpC8QudZb9cV9N5scxNDTMqLuwzTBYPUrAqXFbXevvQZbHm6CqIbkpw2dG0s83sukx1PokRLstrFkZi4YUxjO2lNuUHxgepEcb1YVlVzKO7QjqIITTvauSeohlrvPOsHgH8Dofx92Sk7dwAAAABJRU5ErkJggg==");
              background-size: contain;
              display: block;
              height: 8px;
              width: 8px;
            }
            :global(.custom-dot) {
              background: 0 0
                url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAACXBIWXMAACxKAAAsSgF3enRNAAAC8ElEQVRYhb2YX07bQBDGvxqhSAgpkCDEW3nzY+EE9AblBoUb5AalJyg9QdMbwA3SExQe560gIUURCEKikCgEqs8aG3v/JHGI/UmWYXez+9uZ3fXMfnh9fUVeichnAHz2AGzouwrgCsA/AA8AWnzCMLzI2//cUCKyC6AB4EgB5hVBmwBOwzB8WAqUiNASpwC+WpX51FWwk3dBicihzjKPZWbpktae5lYvlIjQVT+sCtX6+jrW1tZQqVSwsrISvQeDQVTJ99PTU/K/Q10FO7OrPFAi0nS5KwgCbG5uolarRX/P0ng8Rrfbxd3dna/lcRiGzZlQIsKF/MtsSJitra25YEwRrt1u+yy3b7oyAyUi3Np/zV/t7OygWn3/siIYLWeIBbvpnWlO2/LxsoDivur1ullc1c2UKIESEW7Vj+nK7e3tpQHF4hJw9PlFD+RIAd7Ooka6FXcX11ER4mRXV1fNnk8yUAAOzbOIPyxK3CyO/g90TSdQR+lamtcxk6WKnnCMEXEE6rqDdE1RbjPlGCdaV4F+4RORnqdzGaK1DH2ikYKYLlZZQFADOFy4Zx3PZUJBwUxZUGXLAWVbqmw5vqUbVknZGo1G5ogtC+r5+blUrMlkYpUFGuAn8oQXhejl5cVlqQtCZWIZxj58ylCv1zNHuWIIE2gcc5muccQ8hejx8dHstoXUkZCJZ+7v7yPTFikuE8dSaXqhCHR7e1solCNup+veLKUu/J1uQWs5ZrIUccKOvq14ChrkZRbTzc2Na3e8S57s5jKd1SRQaq1MXEU3Xl9fLw2MQEweHMqMmzk8NTnMuDEGozsXFfvodDo+oOOpKVYsXzLKjJjZCN95rEN3ec6+n2EYNsxCJxSmgEHDmzhtNwFpleFwiH6/Hz0eGOq777LDC4W3tOubt8FimnqPgFnxlM5kH8Afq3IxnTNemgaEnJdmR7pLDqzK2TrXu6nWPI1zXy/qjR7zxPh6MZNVq/gt5Y4ixNm8N3gLQxUuAP8BOdxV4IHH3rkAAAAASUVORK5CYII=");
              background-size: contain;
              display: block;
              height: 8px;
              width: 8px;
            }
            :global(.project-slider > .slick-list > .slick-track) {
              max-height: ${slickTrackHeight}px;
              overflow: hidden;
              padding-top: 7px;
            }
            :global(.slick-list) {
              overflow: hidden;
            }
            :global(.slick-slide) {
            }
            :global(.slick-slide.slick-active) {
            }
            :global(.slick-center) {
            }
            .slider-root {
              background-color: ${this.state.backgroundColor};
              overflow-x: hidden;
              margin-bottom: ${this.state.marginBottom};
              padding-left: 35px;
              padding-right: 35px;
              padding-top: ${this.state.paddingTop};
              padding-bottom: ${this.state.paddingBottom};
            }
            #hub_see_all {
              font-size: ${fontSizes.sm};
              font-weight: 500;
              text-transform: capitalize;
            }
            @media (max-width: 576px) {
              #hub_see_all {
                font-size: ${fontSizes.xxs};
              }
              .slider-root {
                margin-bottom: 15px;
                padding-left: 15px;
                padding-right: 15px;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}

export default connect(null)(SliderComponent);
