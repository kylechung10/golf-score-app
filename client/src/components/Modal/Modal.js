import React from "react";
import ReactDom from "react-dom";
import "./Modal.scss";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div id="modal-overlay" />
      <div id="modal-container">
        <div>
          <h2>ERROR:</h2>
          <p>{children}</p>
        </div>
        <button onClick={onClose} id="modal-btn">
          Okay
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
