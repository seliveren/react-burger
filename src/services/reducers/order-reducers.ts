import {
  CLOSE_ORDER_INFO,
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  SHOW_ORDER_INFO, TOrderCheckoutActions, TShowCloseOrderInfoActions
} from "../actions";
import {TOrderData} from "../../utils/types";


type TCheckoutInitialState = {
  orderCheckoutFailed: boolean,
  order: {
    number?: number | null
  },
  orderCheckoutRequest: boolean
}

const checkoutInitialState: TCheckoutInitialState = {
  orderCheckoutFailed: false,
  order: {
    number: null
  },
  orderCheckoutRequest: false
};


type TShownOrderState = {
  openedOrder: TOrderData | undefined | {};
}

const shownOrderState: TShownOrderState = {
  openedOrder: {}
};


export const orderReducer = (state = checkoutInitialState, action: TOrderCheckoutActions): TCheckoutInitialState => {
  switch (action.type) {
    case ORDER_CHECKOUT_REQUEST: {
      return {
        ...state,
        orderCheckoutRequest: true
      };
    }
    case ORDER_CHECKOUT_SUCCESS: {
      return {...state, orderCheckoutFailed: false, order: action.order!, orderCheckoutRequest: false};
    }
    case ORDER_CHECKOUT_FAILED: {
      return {...state, orderCheckoutFailed: true, orderCheckoutRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const shownOrderReducer = (state = shownOrderState, action: TShowCloseOrderInfoActions): TShownOrderState => {
  switch (action.type) {
    case SHOW_ORDER_INFO: {
      return {
        ...state,
        openedOrder: action.openedOrder
      };
    }
    case CLOSE_ORDER_INFO: {
      return {
        ...state,
        openedOrder: {}
      };
    }
    default: {
      return state;
    }
  }
};
