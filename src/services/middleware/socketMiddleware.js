import {getCookie} from "../../utils/util-functions";

export const socketMiddleware = (wsUrl, wsActions) => {

  return store => {
    let socket = null;

    return next => action => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      const token = getCookie('token');
      const urlOrders = '/orders';
      const urlAll = '/orders/all';
      const locationPathname = localStorage.getItem('location.pathname');
      const locationStateModal = localStorage.getItem('location.state.modalOpen');

      if ((type === wsInit && token && locationPathname === "/feed") || (type === wsInit && token &&locationStateModal === "true")) {
        socket = new WebSocket(`${wsUrl}${urlAll}?token=${token}`);
      }

      if ((type === wsInit && token && locationPathname === "/profile/orders") || (type === wsInit && token && locationStateModal === "true")) {
        socket = new WebSocket(`${wsUrl}${urlOrders}?token=${token}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  };
};