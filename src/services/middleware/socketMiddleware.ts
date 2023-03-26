export const socketMiddleware = (wsUrl: string, wsActions: { wsInit: string; onOpen: string; onClose: string; onError: string; onMessage: string; }) => {

  return (store: { dispatch: any; getState: any }) => {

    let socket: WebSocket | null = null;

    return (next: (arg: any) => void) => (action: { type: any; payload: any }) => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
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