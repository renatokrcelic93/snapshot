import React from "react";
class NextArrow extends React.Component {
  render() {
    const { className, style, onClick } = this.props;
    return (
      <div id="custom-next-banner">
        <img
          onClick={onClick}
          className="custom-next-banner"
          src="../../static/banner-right-arrow.png"
        />
        <style jsx>{`
          :global(.custom-next-banner) {
            right: 25px;
            position: absolute;
            top: 40%;
            display: block;
            padding: 0;
            width: 40px;
            height: 40px;

            cursor: pointer;

            color: transparent;
            border: none;
            outline: none;
            background: transparent;
            z-index: 9;
          }
        `}</style>
      </div>
    );
  }
}

export default NextArrow;
