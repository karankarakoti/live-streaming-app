import React from "react";

import RModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    borderRadius: "4px",
    padding: 0,
    width: "500px",
    maxWidth: "92vw",
    overflow: "initial",
    boxShadow: "none",
  },
  overlay: {
    zIndex: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

RModal.setAppElement("#root");

export const Modal = ({
  children,
  visible,
  onClose,
  title,
  hideTitle,
  noClose,
  Header,
  className,
}) => (
  <RModal
    isOpen={visible}
    onRequestClose={onClose}
    style={customStyles}
    className={`modal ${className || ""}`}
  >
    {!hideTitle && (
      <div className="modal-header">
        {Header ? (
          <Header />
        ) : (
          <>
            <div className="d-flex align-center">              
              <div className="modal-title ml-1">{title}</div>
            </div>
            {!noClose && (
              <div className="modal-close-btn" onClick={onClose}>
                &times;
              </div>
            )}
          </>
        )}
      </div>
    )}
    <div className="modal-body">{children}</div>
  </RModal>
);
