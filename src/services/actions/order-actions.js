import {request} from "../../utils/server-interaction";
import {getCookie} from "../../utils/util-functions";

export const SHOW_ORDER_INFO = 'SHOW_ORDER_INFO';
export const CLOSE_ORDER_INFO = 'CLOSE_ORDER_INFO';
export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const REFRESH_INGREDIENTS = 'REFRESH_INGREDIENTS';
export const REFRESH_COUNTER = 'REFRESH_COUNTER';

export function postOrder(pickedIngredients) {
  return function (dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        "ingredients": pickedIngredients
      })
    }).then(res => {
      dispatch({
        type: ORDER_CHECKOUT_SUCCESS,
        order: res.order
      });
      dispatch({
        type: ORDER_CHECKOUT_FAILED
      });
    }).then(
      dispatch({
        type: REFRESH_COUNTER
      })
    ).then(
      dispatch({
        type: REFRESH_INGREDIENTS
      })).catch(() => {
      dispatch({
        type: ORDER_CHECKOUT_FAILED
      });
    });
  };
}

export function showOrderInfo(currentOrder) {
  return {
    type: SHOW_ORDER_INFO,
    openedOrder: currentOrder
  }
}

export function closeOrderInfo(currentOrder) {
  return {
    type: CLOSE_ORDER_INFO,
    openedOrder: currentOrder
  }
}