import React from "react";
import modalStyles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PortalReactDOM from 'react-dom'
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('react-modules');

const Modal = ({children, header, onClose}) => {

  const escClose = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keyup', escClose, false);
    return () => {
      document.removeEventListener('keyup', escClose, false);
    };
  }, [escClose]);

  return PortalReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}/>
      <div className={modalStyles.popupContainer}>
        <div className={`pt-15 pr-10 pl-10 ${modalStyles.header}`}>
          <h3 className={`m-0 text text_type_main-large ${modalStyles.heading}`}>{header}</h3>
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default Modal;





