import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/useAppSelector";


const OrderDetails = () => {

  const orderNumber = useAppSelector(store => store.order.order.number);

  return (
    <div className={orderDetailsStyles.items}>
      <span className="pt-5 pb-8 mt-3 text text_type_digits-large">{orderNumber}</span>
      <p className="pb-15 mb-2 text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary"/>
      <p className="pt-30 mt-10 pb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="pb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
        станции</p>
    </div>
  );
}

export default OrderDetails;