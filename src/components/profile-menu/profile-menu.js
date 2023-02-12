import ProfileMenuStyles from "./profile-menu.module.css";
import React from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import {requestLogout} from "../../services/actions";
import {useDispatch} from "react-redux";
import {loginUrl, profileUrl, ordersHistoryUrl} from "../../utils/constants";


const ProfileMenu = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onExit = () => {
    dispatch(requestLogout(() => navigate(`${loginUrl}`)))
  };

  return (

    <section>

      <nav>
        <ul className={`${ProfileMenuStyles.list} pb-20`}>
          <NavLink to={profileUrl} state={{
            profilePage: true
          }}
                   className={({isActive}) => (isActive ? `${ProfileMenuStyles.el} text text_type_main-medium ${ProfileMenuStyles.el_active}` : `${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`)}>Профиль</NavLink>
          <NavLink to={ordersHistoryUrl} state={{
            profilePage: true
          }}
                   className={({isActive}) => (isActive ? `${ProfileMenuStyles.el} text text_type_main-medium ${ProfileMenuStyles.el_active}` : `${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`)}>История
            заказов
          </NavLink>
          <NavLink onClick={onExit}
                   className={`${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`}>Выход
          </NavLink>
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