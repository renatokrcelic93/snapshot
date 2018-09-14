import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModal } from "../../actions";
import Modal from "../Modal";
import StylesWrapper from "../StylesWrapper";

class Layout extends React.Component {
  render() {
    const { children, modalData, setModal } = this.props;

    return (
      <StylesWrapper>
        <Header />
        <Modal
          data={modalData}
          closeCallback={() =>
            setModal({ modalData: { content: null, openModal: false } })
          }
          isOpen={modalData.openModal}
        />
        {children}
        <Footer />
      </StylesWrapper>
    );
  }
}

const md = dispatch => {
  return {
    setModal: bindActionCreators(setModal, dispatch)
  };
};
const ms = store => {
  return {
    modalData: store.globalReducer.modalData
  };
};

export default connect(
  ms,
  md
)(Layout);
