import React from "react";
import OrderContents from "../../components/order-contents/order-contents";
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED, checkToken} from "../../services/actions";
import {useLocation} from "react-router-dom";
import {getCookie} from "../../utils/util-functions";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";


const OrderContentsPage = (): any => {

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const location = useLocation();
  const token = getCookie('token');

  React.useEffect(
    () => {
      if (location.state?.ordersHistoryPage || location.pathname.split('/')[1] === 'profile') {
        dispatch({type: WS_CONNECTION_START, payload: `?token=${token}`});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: `?token=${token}`});
        };
      } else if (location.state?.feedPage || location.pathname.split('/')[1] === 'feed') {
        dispatch({type: WS_CONNECTION_START, payload: "/all"});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: "/all"});
        };
      }
    },
    [dispatch, location]
  );

  const data = useAppSelector(store => store.ws.data)

  return (data.length &&
    <OrderContents/>
  );

}

export default OrderContentsPage;