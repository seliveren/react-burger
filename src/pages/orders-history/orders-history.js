import React from "react";
import OrdersHistoryStyles from "./orders-history.module.css";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {checkToken, closeOrderInfo, getIngredients} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {useSocket} from "../../utils/socket";
import {getCookie} from "../../utils/util-functions";
import Modal from "../../components/modal/modal";
import OrderContents from "../../components/order-contents/order-contents";
import {useLocation, useNavigate} from "react-router-dom";


const OrdersHistoryPage = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const ingredients = useSelector(store => store.ingredients.ingredients);

  const [data, setData] = React.useState([]);


  const pushMessage = React.useCallback(
    message => {

      setData(message);
      //getAllOrders()
    },

    [data]
  );


  const processEvent = React.useCallback(
    event => {
      const normalizedMessage = JSON.parse(event.data);
      if (normalizedMessage.success === true) {

        //const orders = Object.entries(normalizedMessage)[1][1];
        const a = normalizedMessage['orders'].reverse();

        //const b = Object.values(normalizedMessage);

        //const a = orders[0];
        //const b = a[1]
        //const a = Object.fromEntries(orders);

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

  const location = useLocation();
  const navigate = useNavigate();


  return (
    <>
      {location.state?.modalOpen && (
        <>
          <Modal >
            <OrderContents/>
          </Modal>

          <FeedScroll data={data}/>
        </>
      )}

      {!location.state?.ordersHistoryPage && !location.state?.modalOpen && <OrderContents/>}

      {(location.state?.ordersHistoryPage || location.pathname === "/profile/orders") && (
          <FeedScroll data={data} ingredients={ingredients}/>
      )}
    </>
  );

}

export default OrdersHistoryPage;