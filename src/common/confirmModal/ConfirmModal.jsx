import React, { useEffect } from "react";
import "./styles/ConfirmModal.css";

const ConfirmModal = ({ handleModal, content }) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal-content">
          <span>{content}</span>
        </div>
        <div className="confirm" onClick={handleModal}>
          확인
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
