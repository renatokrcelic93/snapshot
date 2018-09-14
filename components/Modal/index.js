import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    zIndex: 999,
    background: "rgba(86, 183, 128, 0.95)"
  }
};

class ModalComponent extends Component {
  state = {
    modalIsOpen: false
  };
  componentDidMount() {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }
  render() {
    return (
      <div className="modal-root">
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
          closeTimeoutMS={500}
        >
          {this.props.data ? this.props.data.content : null}
          {!this.props.data.hideClose && (
            <img
              id="project_join_green_exit"
              src="../../static/close-white.png"
              className="close-modal"
              onClick={this.props.closeCallback}
            />
          )}
        </Modal>
        <style jsx>{`
          .close-modal {
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0px;
            right: 0px;
            cursor: pointer;
          }
          :global(.ReactModal__Overlay) {
            opacity: 0;
          }
          :global(.ReactModal__Overlay--after-open) {
            opacity: 1;
            transition: opacity 500ms;
          }
          :global(.ReactModal__Overlay--before-close) {
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    globalReducer: store.globalReducer
  };
};

export default connect(mapStateToProps)(ModalComponent);
