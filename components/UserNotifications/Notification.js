import React from "react";
import Parser from "html-react-parser";

class Notification extends React.Component {
  _handleClick = href => {
    return window.open(href, "_blank");
  };
  render() {
    const {
      notification: { image, text, time, href }
    } = this.props;
    return (
      <div id="notifications_row" className="container margin-top-10">
        <div onClick={() => this._handleClick(href)} className="row">
          <div className="col-4 nopadding">
            <div className="image pointer" />
          </div>
          <div className="col-8 custom-padding">
            <div className="row">
              <div className="col-12">
                <p className="font-xs custom-margin pointer">{Parser(text)}</p>
              </div>
              <div className="col-12">
                <p className="font-xxs vomo-grey pointer">{time}</p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .image {
            width: 50px;
            height: 50px;
            background-position: 50% 50%;
            background-size: cover;
            border-radius: 3px;
            background-image: url(${image});
            float: right;
          }
          .custom-margin {
            margin-bottom: 5px;
          }
          .custom-padding {
            padding-left: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
