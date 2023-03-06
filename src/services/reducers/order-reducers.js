import {
  CLOSE_ORDER_INFO,
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  SHOW_ORDER_INFO
} from "../actions";


const checkoutInitialState = {
  orderCheckoutFailed: false,
  order: {
    number: null
  },
  orderCheckoutRequest: false
};

const shownOrderState = {
  openedOrder: {}
};


export const orderReducer = (state = checkoutInitialState, action) => {
  switch (action.type) {
    case ORDER_CHECKOUT_REQUEST: {
      return {
        ...state,
        orderCheckoutRequest: true
      };
    }
    case ORDER_CHECKOUT_SUCCESS: {
      return {...state, orderCheckoutFailed: false, order: action.order, orderCheckoutRequest: false};
    }
    case ORDER_CHECKOUT_FAILED: {
      return {...state, orderCheckoutFailed: true, orderCheckoutRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const shownOrderReducer = (state = shownOrderState, action) => {
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
