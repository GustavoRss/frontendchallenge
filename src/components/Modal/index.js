import React from "react";
import "./styles.css";

const Modal = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <div className="modal">
          <div className="modal-size">
            <div className="cancel-modal">
              <button onClick={onClose}>
                <img
                  src={require("../../img/cancel.svg").default}
                  style={{ width: "15px" }}
                />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
