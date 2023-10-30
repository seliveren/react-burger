import ProfileMenuStyles from "./profile-menu.module.css";
import React from "react";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {requestLogout} from "../../services/actions";
import {loginUrl, profileUrl, ordersHistoryUrl} from "../../utils/constants";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const ProfileMenu = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onExit = () => {
    dispatch(requestLogout(() => navigate(`${loginUrl}`)))
  };
  const location = useLocation();

  return (

    <section className={ProfileMenuStyles.section}>
      <nav>
        <ul
          className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? `${ProfileMenuStyles.listOrders} pb-20 pt-20` : `${ProfileMenuStyles.list} pb-20`)}>
          <NavLink to={profileUrl} state={{
            profilePage: true
          }}
                   className={({isActive}) => (isActive && (location.state?.profilePage || location.pathname === "/profile") && !location.state?.ordersHistoryPage ? `${ProfileMenuStyles.el} text text_type_main-medium ${ProfileMenuStyles.el_active}` : `${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`)}>Профиль</NavLink>
          <NavLink to={ordersHistoryUrl} state={{
            profilePage: true,
            ordersHistoryPage: true
          }}
                   className={({isActive}) => (isActive ? `${ProfileMenuStyles.el} text text_type_main-medium ${ProfileMenuStyles.el_active}` : `${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`)}>История
            заказов
          </NavLink>
          <NavLink to={''} onClick={onExit}
                   className={`${ProfileMenuStyles.el} text text_type_main-medium text_color_inactive`}>Выход
          </NavLink>
        </ul>
      </nav>
      {location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ?
        <div className={`${ProfileMenuStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы
          можете просмотреть свою историю заказов
        </div> :
        <div className={`${ProfileMenuStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы
          можете
          изменить свои персональные данные
        </div>}
    </section>

  )
}

export default ProfileMenu;