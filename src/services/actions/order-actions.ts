import {request} from "../../utils/server-interaction";
import {getCookie} from "../../utils/util-functions";
import {TOrderData} from "../../utils/types";
import {AppDispatch} from "../../index";
import {REFRESH_COUNTER, REFRESH_INGREDIENTS} from "./ingredients-actions";


export const SHOW_ORDER_INFO: 'SHOW_ORDER_INFO' = 'SHOW_ORDER_INFO';
export const CLOSE_ORDER_INFO: 'SHOW_ORDER_INFO' = 'SHOW_ORDER_INFO';
export const ORDER_CHECKOUT_REQUEST: 'ORDER_CHECKOUT_REQUEST' = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED: 'ORDER_CHECKOUT_FAILED' = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS: 'ORDER_CHECKOUT_SUCCESS' = 'ORDER_CHECKOUT_SUCCESS';


export interface IOrderCheckoutSuccessAction {
  readonly type: typeof ORDER_CHECKOUT_SUCCESS;
  readonly order: { number?: number | null } | undefined;
}

export interface IOrderCheckoutFailedAction {
  readonly type: typeof ORDER_CHECKOUT_FAILED;
}

export interface IOrderCheckoutRequestAction {
  readonly type: typeof ORDER_CHECKOUT_REQUEST;
}

export interface IShowOrderInfoAction {
  readonly type: typeof SHOW_ORDER_INFO;
  readonly openedOrder: TOrderData;
}

export interface ICloseOrderInfoAction {
  readonly type: typeof CLOSE_ORDER_INFO;
  readonly openedOrder?: TOrderData;
}

export type TOrderCheckoutActions =
  | IOrderCheckoutSuccessAction
  | IOrderCheckoutFailedAction
  | IOrderCheckoutRequestAction;


export type TShowCloseOrderInfoActions =
  | IShowOrderInfoAction
  | ICloseOrderInfoAction;


export function postOrder(pickedIngredients: string[]) {
  return function (dispatch: AppDispatch) {
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
    }).then(res => {
      dispatch({
        type: REFRESH_COUNTER
      })
    }).then(res => {
      dispatch({
        type: REFRESH_INGREDIENTS
      })
    }).catch(() => {
      dispatch({
        type: ORDER_CHECKOUT_FAILED
      });
    });
  };
}

export function showOrderInfo(openedOrder: TOrderData): IShowOrderInfoAction {
  return {
    type: SHOW_ORDER_INFO,
    openedOrder
  }
}

export function closeOrderInfo(): ICloseOrderInfoAction {
  return {
    type: CLOSE_ORDER_INFO
  }
}