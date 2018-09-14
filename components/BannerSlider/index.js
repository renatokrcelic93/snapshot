import React from "react";
import Slider from "../../custom-react-slider";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SliderComponent extends React.Component {
  render() {
    const { data, heights, className = "banner-slider" } = this.props;
    const settings = {
      className: `${className}`,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: "custom-dots-banner",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      appendDots: dots => (
        <div>
          <ul style={{ margin: "0px" }}> {dots} </ul>
          <style jsx>{`
            background-color: transparent;
          `}</style>
        </div>
      ),
      customPaging: function(i) {
        return <span className="custom-dot-banner" />;
      }
    };
    return (
      <div className="slider-root">
        <Slider {...settings}>{this.props.renderSlides(data, heights)}</Slider>
        <style jsx>{`
          .slider-title {
            font-family: "Quicksand";
            font-size: 24px;
            margin-left: 20px;
          }
          :global(.custom-dots-banner) {
            width: 100%;
            margin-top: -40px;
            list-style: none;
            text-align: center;
            display: block;
            padding-bottom: 14px;
          }
          :global(.custom-dots-banner > ul) {
            padding-left: 0;
          }

          :global(.custom-dots-banner li) {
            position: relative;
            display: inline-block;
            width: 5px;
            height: 5px;
            margin: 0 3px;
            padding: 0;
            cursor: pointer;
          }
          :global(.custom-dots-banner li.slick-active) {
            opacity: 0.75;
          }
          :global(.custom-dots-banner li) {
            opacity: 0.25;
          }
          :global(.custom-dot-banner:before) {
            content: "\\25CF";
            font-size: 14px;
            color: #fff;
          }
          :global(.slick-list) {
            overflow: hidden;
          }
          :global(.${className}) {
            background-color: white;
            margin-bottom: 0px;
          }
          @media (max-width: 768px) {
            :global(.${className}) {
              margin-bottom: 20px;
            }
          }
          :global(.slick-slide) {
          }
          :global(.${className} > .slick-list > .slick-track) {
            height: ${heights[0]}px;
          }
          @media (max-width: 1200px) {
            :global(.${className} > .slick-list > .slick-track) {
              height: ${heights[1]}px;
            }
          }
          @media (max-width: 1000px) {
            :global(.${className} > .slick-list > .slick-track) {
              height: ${heights[2]}px;
            }
          }
          @media (max-width: 767px) {
            :global(.${className} > .slick-list > .slick-track) {
              height: ${heights[3]}px;
            }
          }
          @media (max-width: 500px) {
            :global(.${className} > .slick-list > .slick-track) {
              height: ${heights[4]}px;
            }
          }
          :global(.${className} > .slick-list) {
            width: 100%;
          }
          :global(.slick-track) {
          }
          :global(.slick-slide.slick-active) {
          }
          :global(.slick-center) {
          }
          .slider-root {
            padding-top: 0;
            background-color: transparent;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(null)(SliderComponent);
