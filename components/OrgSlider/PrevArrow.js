import React from "react";
class PrevArrow extends React.Component {
  render() {
    const { className, style, onClick } = this.props;
    return (
      <div>
        <img
          onClick={onClick}
          className="custom-prev"
          src="../../static/left-arrow.png"
        />
        <style jsx>{`
          :global(.custom-prev) {
            left: 25px;
            position: absolute;
            top: 50%;
            display: block;
            width: 20px;
            height: 20px;
            padding: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0px 1px 22px 0px rgba(0, 0, 0, 0.18);
            -webkit-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            transform: translate(0, -50%);

            cursor: pointer;

            color: transparent;
            border: none;
            outline: none;
            background: transparent;
            z-index: 9;
          }
          @media (max-width: 576px) {
            :global(.custom-prev) {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default PrevArrow;
