import React from "react";
import OrdersHistoryStyles from "./orders-history.module.css";
import ProfileMenu from "../../components/profile-menu/profile-menu";


const OrdersHistoryPage = () => {

  return (
    <>
      <div className={OrdersHistoryStyles.container}>
        <ProfileMenu/>
        <div className={'text text_type_main-default pl-30 pt-5'}>To Be Created</div>
      </div>
    </>
  );

}

export default OrdersHistoryPage;