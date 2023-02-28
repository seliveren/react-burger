import React from "react";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileStyles from "./profile.module.css";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";
import OrderContents from "../../components/order-contents/order-contents";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {checkToken, closeOrderInfo, getIngredients} from "../../services/actions";
import {ordersHistoryUrl} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {useSocket} from "../../utils/socket";
import {getCookie} from "../../utils/util-functions";


const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);



  const [data, setData] = React.useState([]);


  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const ingredients = useSelector(store => store.ingredients.ingredients);

  const pushMessage = React.useCallback(
    message => {
      setData(message);
    },

    [data]
  );


  const processEvent = React.useCallback(
    event => {
      const normalizedMessage = JSON.parse(event.data);
      if (normalizedMessage.success === true) {

        const a = normalizedMessage['orders'].reverse();

        pushMessage(
          a
        );
      }
    },
    [pushMessage]
  );


  const { connect } = useSocket('wss://norma.nomoreparties.space/orders', {
    onMessage: processEvent

  });



  React.useEffect(
    () => {
      if (getCookie('token')) {
        connect(getCookie('token'));
      }
    },
    [getCookie('token')]
  );




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
      <div className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? ProfileStyles.container : ProfileStyles.containerProfile)}>
        <ProfileMenu/>
        {location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ?
          <FeedScroll data={data} ingredients={ingredients}/>
        : <ProfileForm/>}
      </div>)}

      {!location.state?.ordersHistoryPage && !location.state?.profilePage && !location.state?.modalOpen && location.pathname !== "/profile/orders" && location.pathname !== "/profile" && <OrderContents/>}


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