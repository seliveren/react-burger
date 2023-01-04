import React from "react";
import headerStyles from "./app-header.module.css";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header>
      <nav>
        <ul className={`pl-30 pr-30 pb-4 pt-4 m-10 ${headerStyles.ul}`}>
          <li className={`pl-30 pb-4 pt-4 ${headerStyles.li}`}>
            <BurgerIcon type="primary"/>
            <a href="#"
               className={`"text text_type_main-default ${headerStyles.link} ${headerStyles.link_active}`}>Конструктор</a>
          </li>
          <li className={`pr-20 pb-4 pt-4 ${headerStyles.li}`}>
            <ListIcon type="secondary"/>
            <a href="#" className={`"text text_type_main-default ${headerStyles.link}`}>Лента заказов</a>
          </li>
          <li className={`pr-30 mr-6 ml-2 ${headerStyles.li}`}>
            <Logo/>
          </li>
          <li className={`pr-30 pl-30 pb-4 pt-4 ${headerStyles.li}`}>
            <ProfileIcon type="secondary"/>
            <a href="#" className={`"text text_type_main-default ${headerStyles.link}`}>Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;