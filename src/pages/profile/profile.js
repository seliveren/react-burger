import React from "react";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileStyles from "./profile.module.css";
import {useLocation} from "react-router-dom";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {
  checkToken,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START
} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/util-functions";


const ProfilePage = () => {

  const token = getCookie('token');
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  React.useEffect(
    () => {
      if (location.state?.ordersHistoryPage || location.pathname === 'profile/orders') {
        dispatch({type: WS_CONNECTION_START, payload: `?token=${token}`});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: `?token=${token}`});
        };
      }
    },
    [dispatch, location]
  );

  const data = useSelector(store => store.ws.data)
  const ingredients = useSelector(store => store.ingredients.ingredients);

  return (
    <div
      className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders") ? ProfileStyles.container : ProfileStyles.containerProfile}>
      <ProfileMenu/>
      {location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ?
        <FeedScroll data={data} ingredients={ingredients}/>
        : <ProfileForm/>}
    </div>
  );
}

export default ProfilePage;