import React from "react";
import modalStyles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PortalReactDOM from 'react-dom'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {Outlet} from "react-router-dom";


const modalRoot = document.getElementById('react-modules')!;

type TModalProps = {
  children: JSX.Element | JSX.Element[];
  header?: string;
  onClose: () => void;
};

const Modal: React.FC<TModalProps> = ({children, header, onClose}) => {

  const escClose = (e: { key: string }) => {
    if (e.key === "Escape") {
      onClose()
    }
  };

  React.useEffect(() => {
    document.addEventListener('keyup', escClose, false);
    return () => {
      document.removeEventListener('keyup', escClose, false);
    };
  }, [escClose]);

  return PortalReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}/>
      <Outlet/>
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


export default Modal;





