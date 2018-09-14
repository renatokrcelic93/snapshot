import React from "react";
class PrevArrow extends React.Component {
  render() {
    const { className, style, onClick } = this.props;
    return (
      <div>
        <img
          id="custom-prev-banner"
          onClick={onClick}
          className="custom-prev-banner"
          src="../../static/banner-left-arrow.png"
        />
        <style jsx>{`
          :global(.custom-prev-banner) {
            left: 25px;
            position: absolute;
            top: 40%;
            display: block;
            width: 20px;
            height: 20px;
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

export default PrevArrow;
