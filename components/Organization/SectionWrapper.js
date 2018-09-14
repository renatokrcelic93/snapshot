import React, { Component } from "react";

class SectionWrapper extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="org_details_row">
        {title && <h3 className="semi-bold font-xl">{title}</h3>}
        {children}
        <style jsx>{`
          .org_details_row {
            border-bottom: 1px solid #e9e9e9;
            padding-bottom: 15px;
            margin-bottom: 15px;
          }
        `}</style>
      </div>
    );
  }
}

export default SectionWrapper;
