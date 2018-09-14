import React, { Component } from "react";
import BannerSlider from "../BannerSlider";
import BannerSlide from "../BannerSlider/BannerSlide";

class Slider extends Component {
  _renderSlides = (data, breakpointHeights) => {
    return data.map(url => {
      return (
        <BannerSlide
          heights={breakpointHeights}
          onClick={() => null}
          image={url}
          key={url}
        />
      );
    });
  };
  render() {
    const {
      project: { sliderImages },
      breakpointHeights,
      className
    } = this.props;
    return (
      <BannerSlider
        className={className}
        heights={breakpointHeights}
        renderSlides={this._renderSlides}
        data={sliderImages}
      />
    );
  }
}

export default Slider;
