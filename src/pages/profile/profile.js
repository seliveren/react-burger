import React from "react";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileStyles from "./profile.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";
import OrderContents from "../../components/order-contents/order-contents";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {
  checkToken,
  closeOrderInfo,
  getIngredients,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START
} from "../../services/actions";
import {ordersHistoryUrl} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";


const ProfilePage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  React.useEffect(
    () => {
      if (location.state?.ordersHistoryPage || location.pathname === "/profile/orders" || location.state?.modalOpen) {
        dispatch(getIngredients());
      }
    },
    [dispatch, location.state, location.pathname]
  );

  React.useEffect(
    () => {
      if (location.state?.ordersHistoryPage || location.pathname === "/profile/orders" || location.state?.modalOpen) {
        dispatch({type: WS_CONNECTION_START});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED});
        };
      }
    },
    [dispatch, location.state, location.pathname]
  );

  const data = useSelector(store => store.ws.data)
  const ingredients = useSelector(store => store.ingredients.ingredients);

  const handleClose = () => {
    dispatch(closeOrderInfo());
    navigate(`${ordersHistoryUrl}`, {
      state: {
        ordersHistoryPage: true,
        profilePage: true
      }
    });
  };

  return (
    <>
      {!location.state?.modalOpen && (location.pathname === "/profile/orders" || location.pathname === "/profile") && (
        <div
          className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? ProfileStyles.container : ProfileStyles.containerProfile)}>
          <ProfileMenu/>
          {location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ?
            <FeedScroll data={data} ingredients={ingredients}/>
            : <ProfileForm/>}
        </div>)}

      {!location.state?.ordersHistoryPage && !location.state?.profilePage && !location.state?.modalOpen && location.pathname !== "/profile/orders" && location.pathname !== "/profile" &&
        <OrderContents/>}

      {location.state?.modalOpen && (
        <>
          <Modal onClose={() => handleClose()}>
            <OrderContents/>
          </Modal>

          <div className={ProfileStyles.container}>
            <ProfileMenu/>
            <FeedScroll data={data} ingredients={ingredients}/>
          </div>
        </>
      )}
    </>
  );

}

export default ProfilePage;