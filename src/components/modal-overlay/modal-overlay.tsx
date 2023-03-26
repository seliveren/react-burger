import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: React.FC<TModalOverlayProps> = ({onClick}) => {
  return (
    <div className={modalOverlayStyles.popup} onClick={onClick}></div>
  )
}


export default ModalOverlay;