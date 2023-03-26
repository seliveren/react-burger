import {TWSData} from "../../utils/types";


export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_DATA: 'WS_GET_DATA' = 'WS_GET_DATA';


export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetDataAction {
  readonly type: typeof WS_GET_DATA;
  readonly payload: TWSData;
}

export type TWsConnectionActions =
  IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetDataAction;


export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetData = (message: TWSData): IWsGetDataAction => {
  return {
    type: WS_GET_DATA,
    payload: message
  };
};