import React, { Component } from "react";
import SectionWrapper from "./SectionWrapper";
import Parser from "html-react-parser";

class Description extends Component {
  render() {
    const {
      organization: { text }
    } = this.props;
    if (text) {
      return (
        <SectionWrapper>
          <p>{Parser(text)}</p>
        </SectionWrapper>
      );
    } else {
      return null;
    }
  }
}

export default Description;
