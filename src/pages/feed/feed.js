import React from "react";
import FeedStyles from "./feed.module.css";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {OrderStatuses} from "../../components/order-statuses/order-statuses";
import {useLocation, useNavigate} from "react-router-dom";
import OrderContents from "../../components/order-contents/order-contents";
import Modal from "../../components/modal/modal";
import {feedPageUrl} from "../../utils/constants";
import {useSocket} from "../../utils/socket";
import {getCookie} from "../../utils/util-functions";
import {useDispatch, useSelector} from "react-redux";
import {checkToken, closeOrderInfo, getIngredients} from "../../services/actions";


const FeedPage = () => {
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
  const [stats, setStats] = React.useState([]);


  const pushMessage = React.useCallback(
    message => {

      setData(message);
      //getAllOrders()
    },

    [data]
  );

  const pushMessag = React.useCallback(
    message => {

      setStats(message);
      //getAllOrders()
    },

    [stats]
  );


  const processEvent = React.useCallback(
    event => {
      const normalizedMessage = JSON.parse(event.data);
      if (normalizedMessage.success === true) {

        const a = normalizedMessage['orders'];
        const b = normalizedMessage;

        pushMessage(
          a
        );
        pushMessag(
          b
        );
      }
    },
    [pushMessage]
  );


  const { connect } = useSocket('wss://norma.nomoreparties.space/orders/all', {
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

  const handleClose = () => {
    dispatch(closeOrderInfo());
    navigate(`${feedPageUrl}`, {
      state: {
        feedPage: true
      }
    });
  };


  return (
    <>
      {location.state?.modalOpen && data && (
        <>
          <Modal onClose={() => handleClose()}>
            <OrderContents/>
          </Modal>

          <div className={FeedStyles.container}>
            <FeedScroll data={data}/>
            <OrderStatuses stats={stats} data={data}/>
          </div>
        </>
      )}

      {!location.state?.feedPage && !location.state?.modalOpen && <OrderContents/>}

      {location.state?.feedPage && data && (
          <div className={FeedStyles.container}>
            <FeedScroll data={data} ingredients={ingredients}/>
            <OrderStatuses stats={stats} data={data}/>
          </div>
      )}
    </>
  );
}

export default FeedPage;