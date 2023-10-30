import {
  TWsConnectionActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_DATA
} from "../actions";
import {TOrderData, TWSData} from "../../utils/types";


type TWsState = {
  wsConnected: boolean;
  data: TOrderData[] | [];
  stats: TWSData;
}

const wsState: TWsState = {
  wsConnected: false,
  data: [],
  stats: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  }
};


export const wsReducer = (state = wsState, action: TWsConnectionActions): TWsState => {
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
        data: action.payload.orders, stats: action.payload, wsConnected: true
      };

    default:
      return state;
  }
};