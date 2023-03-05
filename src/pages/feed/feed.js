import React from "react";
import FeedStyles from "./feed.module.css";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {OrderStatuses} from "../../components/order-statuses/order-statuses";
import {useDispatch, useSelector} from "react-redux";
import {
  checkToken,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions";
import {useLocation} from "react-router-dom";


const FeedPage = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const ingredients = useSelector(store => store.ingredients.ingredients);
  const location = useLocation();

  React.useEffect(
    () => {
      if (!location.state?.ordersHistoryPage || !location.pathname === 'profile/orders') {
        dispatch({type: WS_CONNECTION_START, payload: "/all"});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: "/all"});
        };
      }
    },
    [dispatch]
  );

  const data = useSelector(store => store.ws.data)
  const stats = useSelector(store => store.ws.stats)

  return (
    data.length && stats.orders.length && (
      <div className={FeedStyles.container}>
        <FeedScroll data={data} ingredients={ingredients}/>
        <OrderStatuses stats={stats} data={data}/>
      </div>
    )
  );
}

export default FeedPage;