import ProfileMenuStyles from "./profile-menu.module.css";
import React from "react";
import {Navigate} from 'react-router-dom';
import {requestLogout} from "../../services/actions";
import {useDispatch} from "react-redux";
import {deleteCookie} from "../../utils/util-functions";


const ProfileMenu = () => {

  const [navigate, setNavigate] = React.useState('');
  const dispatch = useDispatch();
  const cookieValue = document.cookie
    .split('; ')
    .find((el) => el.startsWith('refreshToken='))
    ?.split('=')[1];

  const onExit = () => {
    dispatch(requestLogout(cookieValue))
    deleteCookie('refreshToken')
    deleteCookie('token')
    setNavigate('exit')
  };

  const onGetOrdersHistory = () => {
    setNavigate('orders-history')
  };

  return (
    navigate === 'exit' ? <Navigate to="/login"/> : navigate === 'orders-history' ? <Navigate to="/orders-history"/> :

      <section>

        <nav>
          <ul className={`${ProfileMenuStyles.list} pb-20`}>
            <li className={`${ProfileMenuStyles.el} text text_type_main-medium`}>Профиль</li>
            <li onClick={onGetOrdersHistory}
                className={`${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`}>История заказов
            </li>
            <li onClick={onExit}
                className={`${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`}>Выход
            </li>
          </ul>
        </nav>
        <div className={`${ProfileMenuStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы
          можете
          изменить свои персональные данные
        </div>

      </section>

  )
}

export default ProfileMenu;