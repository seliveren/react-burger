import React from "react";
import modalOverlayStyles from "./ModalOverlay.module.css";
import PortalReactDOM from 'react-dom'
import PropTypes from "prop-types";

const modalRoot = document.getElementById('react-modules');

const ModalOverlay = ({open, onClose}) => {

  if (!open) return null
  return PortalReactDOM.createPortal(
    <div className={`${modalOverlayStyles.popup} ${open ? modalOverlayStyles.popupOpened : null}`} onClick={onClose}>
    </div>, modalRoot
  )
}

ModalOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;