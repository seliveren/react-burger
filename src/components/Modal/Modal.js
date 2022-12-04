import React from "react";
import modalStyles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PortalReactDOM from 'react-dom'
import PropTypes from "prop-types";

const modalRoot = document.getElementById('react-modules');

const Modal = ({open, children, header, onClose}) => {

  if (!open) return null
  return PortalReactDOM.createPortal(
    <div className={`${modalStyles.popupContainer} ${open ? modalStyles.popupContainerOpened : null}`}>
      <div className={`pt-15 pr-10 pl-10 ${modalStyles.header}`}>
        <h3 className={`m-0 text text_type_main-large ${modalStyles.heading}`}>{header}</h3>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>
      {children}
    </div>, modalRoot
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;





