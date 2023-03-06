import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_DATA} from "../actions";

const wsState = {
  wsConnected: false,
  data: [],
  stats: {}
};

export const wsReducer = (state = wsState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_DATA:
      return {
        data: action.payload.orders, stats: action.payload
      };

    default:
      return state;
  }
};