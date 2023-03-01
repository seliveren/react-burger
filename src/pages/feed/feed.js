import React from "react";
import FeedStyles from "./feed.module.css";
import {FeedScroll} from "../../components/order-feed/order-feed";
import {OrderStatuses} from "../../components/order-statuses/order-statuses";
import {useLocation, useNavigate} from "react-router-dom";
import OrderContents from "../../components/order-contents/order-contents";
import Modal from "../../components/modal/modal";
import {feedPageUrl} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {
  checkToken,
  closeOrderInfo,
  getIngredients,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from "../../services/actions";


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

  React.useEffect(
    () => {
      dispatch({type: WS_CONNECTION_START});
      if (!location.state?.modalOpen) {
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED});
        };
      }
    },
    [dispatch]
  );

  const data = useSelector(store => store.ws.data)
  const stats = useSelector(store => store.ws.stats)
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
      {location.state?.modalOpen && data && stats && (
        <>
          <Modal onClose={() => handleClose()}>
            <OrderContents/>
          </Modal>

          <div className={FeedStyles.container}>
            <FeedScroll data={data} ingredients={ingredients}/>
            <OrderStatuses stats={stats} data={data}/>
          </div>
        </>
      )}

      {!location.state?.feedPage && !location.state?.modalOpen && location.pathname !== "/feed" && <OrderContents/>}

      {(location.state?.feedPage || location.pathname === "/feed") && data && stats && (
        <div className={FeedStyles.container}>
          <FeedScroll data={data} ingredients={ingredients}/>
          <OrderStatuses stats={stats} data={data}/>
        </div>
      )}
    </>
  );
}

export default FeedPage;