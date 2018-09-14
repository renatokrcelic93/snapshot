import React from "react";

class Slide extends React.Component {
  componentDidMount() {}
  render() {
    const { image, heights, i } = this.props;
    return (
      <div id={i} {...this.props} className="slide-root">
        <div className="image-container">
          <div onClick={this.props.onClick} className="slide-image pointer" />
        </div>
        <style jsx>{`
          .slide-root {
            width: 100%;
          }
          .image-container {
            width: 100%;
          }
          .slide-image {
            height: ${heights[0]}px;
            width: 100%;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(${image});
          }
          @media (max-width: 1200px) {
            .slide-image {
              height: ${heights[1]}px;
            }
          }
          @media (max-width: 1000px) {
            .slide-image {
              height: ${heights[2]}px;
            }
          }
          @media (max-width: 767px) {
            .slide-image {
              height: ${heights[3]}px;
            }
          }
          @media (max-width: 500px) {
            .slide-image {
              height: ${heights[4]}px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Slide;
