import React from "react";
import headerStyles from "./app-header.module.css";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from 'react-router-dom';
import {homeUrl, profileUrl, feedPageUrl} from "../../utils/constants";


const AppHeader = () => {

  const location = useLocation();

  return (
    <header>
      <nav>
        <ul className={`pl-30 pr-30 pb-4 pt-4 m-10 ${headerStyles.ul}`}>
          <NavLink className={headerStyles.navlink} to={homeUrl} state={{
            homePage: true
          }}>
            <li className={`pl-30 pb-4 pt-4 ${headerStyles.li}`}>
              {location.state?.homePage ?
                <>
                  <BurgerIcon type="primary"/> <span
                  className={`text text_type_main-default ${headerStyles.link_active}`}>Конструктор</span>
                </> :
                <>
                  <BurgerIcon type="secondary"/>
                  <span
                    className={`text text_type_main-default ${headerStyles.link}`}>Конструктор</span>
                </>}
            </li>
          </NavLink>
          <NavLink className={headerStyles.navlink} to={feedPageUrl} state={{
            feedPage: true
          }}>
            <li className={`pr-20 pb-4 pt-4 ${headerStyles.li}`}>
              {location.state?.feedPage || location.pathname === "/feed" ?
                <>
                  <ListIcon type="primary"/>
                  <span className={`text text_type_main-default ${headerStyles.link_active}`}>Лента заказов</span>
                </> :
                <>
                  <ListIcon type="secondary"/>
                  <span
                    className={`text text_type_main-default ${headerStyles.link}`}>Лента заказов</span>
                </>}
            </li>
          </NavLink>
          <li className={`pr-30 mr-6 ml-2 ${headerStyles.li}`}>
            <Logo/>
          </li>
          <NavLink className={headerStyles.navlink} to={profileUrl} state={{
            profilePage: true,
            mainProfile: true
          }}>
            <li className={`pr-30 pl-30 pb-4 pt-4 ${headerStyles.li}`}>
              {location.state?.profilePage || location.state?.ordersHistoryPage ?
                <>
                  <ProfileIcon type="primary"/>
                  <span className={`text text_type_main-default ${headerStyles.link_active}`}>Личный кабинет</span>
                </> :
                <>
                  <ProfileIcon type="secondary"/>
                  <span
                    className={`text text_type_main-default ${headerStyles.link}`}>Личный кабинет</span>
                </>}
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;