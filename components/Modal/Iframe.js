import React from "react";

class Iframe extends React.Component {
  render() {
    return (
      <div className="resp-container">
        <iframe
          className="resp-iframe"
          src={`https://www.youtube.com/embed/${
            this.props.data.urlId
          }?autoplay=1&rel=0`}
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />
        <style jsx>{`
          .resp-container {
            height: 627px;
            width: 1080px;
            box-shadow: 0 10px 46px 0 rgba(5, 10, 15, 0.4);
          }
          @media (max-width: 1200px) {
            .resp-container {
              height: 513px;
              width: 900px;
            }
          }
          @media (max-width: 1000px) {
            .resp-container {
              height: 427px;
              width: 750px;
            }
          }
          @media (max-width: 928px) {
            .resp-container {
              height: 341px;
              width: 600px;
            }
          }
          @media (max-width: 728px) {
            .resp-container {
              height: 285px;
              width: 500px;
            }
          }
          @media (max-width: 600px) {
            .resp-container {
              height: 182px;
              width: 320px;
            }
          }
          @media (max-width: 400px) {
            .resp-container {
              height: 142px;
              width: 250px;
            }
          }
          @media (max-width: 300px) {
            .resp-container {
              height: 71px;
              width: 125px;
            }
          }
          .resp-iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default Iframe;
