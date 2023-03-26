import {request} from "../../utils/server-interaction";
import {cookieValue, deleteCookie, getCookie, setCookie} from "../../utils/util-functions";
import {AppDispatch} from "../../index";


export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';

export const SEND_CODE_REQUEST: 'SEND_CODE_REQUEST' = 'SEND_CODE_REQUEST';
export const SEND_CODE_FAILED: 'SEND_CODE_FAILED' = 'SEND_CODE_FAILED';
export const SEND_CODE_SUCCESS: 'SEND_CODE_SUCCESS' = 'SEND_CODE_SUCCESS';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';

export const SEND_AUTH_REQUEST: 'SEND_AUTH_REQUEST' = 'SEND_AUTH_REQUEST';
export const SEND_AUTH_FAILED: 'SEND_AUTH_FAILED' = 'SEND_AUTH_FAILED';
export const SEND_AUTH_SUCCESS: 'SEND_AUTH_SUCCESS' = 'SEND_AUTH_SUCCESS';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';

export const NEW_TOKEN_REQUEST: 'NEW_TOKEN_REQUEST' = 'NEW_TOKEN_REQUEST';
export const NEW_TOKEN_FAILED: 'NEW_TOKEN_FAILED' = 'NEW_TOKEN_FAILED';
export const NEW_TOKEN_SUCCESS: 'NEW_TOKEN_SUCCESS' = 'NEW_TOKEN_SUCCESS';

export const CHECK_TOKEN: 'CHECK_TOKEN' = 'CHECK_TOKEN';


export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: {} | undefined;
  readonly accessToken: string | undefined;
  readonly refreshToken: string | undefined;
}

export type TRegisterUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserFailedAction
  | IRegisterUserSuccessAction
  | ISendCodeRequestAction
  | ISendCodeFailedAction
  | ISendCodeSuccessAction;


export interface ISendCodeRequestAction {
  readonly type: typeof SEND_CODE_REQUEST;
}

export interface ISendCodeFailedAction {
  readonly type: typeof SEND_CODE_FAILED;
}

export interface ISendCodeSuccessAction {
  readonly type: typeof SEND_CODE_SUCCESS;
}

export type TSendCodeActions =
  | ISendCodeRequestAction
  | ISendCodeFailedAction
  | ISendCodeSuccessAction;


export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly resetData: {} | undefined;
}

export type TResetPasswordActions =
  | IResetPasswordRequestAction
  | IResetPasswordFailedAction
  | IResetPasswordSuccessAction;


export interface ISendAuthRequestAction {
  readonly type: typeof SEND_AUTH_REQUEST;
}

export interface ISendAuthFailedAction {
  readonly type: typeof SEND_AUTH_FAILED;
}

export interface ISendAuthSuccessAction {
  readonly type: typeof SEND_AUTH_SUCCESS;
  readonly user: {} | undefined;
  readonly accessToken: string | undefined;
  readonly refreshToken: string | undefined;
}

export type TSendAuthActions =
  | ISendAuthRequestAction
  | ISendAuthFailedAction
  | ISendAuthSuccessAction;


export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: {} | undefined;
}

export type TGetUserActions =
  | IGetUserRequestAction
  | IGetUserFailedAction
  | IGetUserSuccessAction;


export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: {} | undefined;
}

export type TUpdateUserActions =
  | IUpdateUserRequestAction
  | IUpdateUserFailedAction
  | IUpdateUserSuccessAction;


export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
  readonly user: {} | undefined;
}

export type TLogoutUserActions =
  | ILogoutUserRequestAction
  | ILogoutUserFailedAction
  | ILogoutUserSuccessAction;


export interface INewTokenRequestAction {
  readonly type: typeof NEW_TOKEN_REQUEST;
}

export interface INewTokenFailedAction {
  readonly type: typeof NEW_TOKEN_FAILED;
}

export interface INewTokenSuccessAction {
  readonly type: typeof NEW_TOKEN_SUCCESS;
  readonly user: {} | undefined;
  readonly accessToken: string | undefined;
  readonly refreshToken: string | undefined;
}

export type TNewTokenActions =
  | INewTokenRequestAction
  | INewTokenFailedAction
  | INewTokenSuccessAction;


export interface ICheckTokenAction {
  readonly type: typeof CHECK_TOKEN;
}

export type TCheckTokenActions = ICheckTokenAction;


export function registerNewUser(username: string, email: string, password: string, onSuccess: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": username
      })
    }).then(res => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      });
      onSuccess();
      dispatch({
        type: REGISTER_USER_FAILED
      });
    }).catch(() => {
      dispatch({
        type: REGISTER_USER_FAILED
      });
    });
  };
}

export function sendResetPasswordCode(email: string, onSuccess: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_CODE_REQUEST
    });
    request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email
      })
    }).then(res => {
      dispatch({
        type: SEND_CODE_SUCCESS,
        code: res.data
      });
      onSuccess();
      dispatch({
        type: SEND_CODE_FAILED
      });
    }).catch(() => {
      dispatch({
        type: SEND_CODE_FAILED
      });
    });
  };
}

export function resetPassword(password: string, code: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "token": code
      })
    }).then(res => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        resetData: res.data
      });
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
    }).catch(() => {
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
    });
  };
}

export function requestAuth(email: string | undefined, password: string | undefined, onSuccess: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_AUTH_REQUEST
    });
    request("auth/login", {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(res => {
      let authToken = res.accessToken?.split('Bearer ')[1];
      let refreshToken = res.refreshToken;
      if (authToken) {
        setCookie('token', authToken);
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken);
      }
      dispatch({
        type: SEND_AUTH_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      });
      onSuccess();
      dispatch({
        type: SEND_AUTH_FAILED
      });
    })
      .catch(() => {
        dispatch({
          type: SEND_AUTH_FAILED
        });
      });
  };
}

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    request("auth/user", {
      method: "GET",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + getCookie('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }).then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user
      });
      dispatch({
        type: GET_USER_FAILED
      });
    }).catch(() => {
      dispatch(requestNewToken(getCookie('refreshToken'), getUser()));
      dispatch({
        type: GET_USER_FAILED
      });
    });
  };
}

export function updateUser(updatedName: string | undefined, updatedEmail: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    request("auth/user", {
      method: "PATCH",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        name: updatedName,
        email: updatedEmail,
      }),
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }).then(res => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.user
      });
      dispatch({
        type: UPDATE_USER_FAILED
      });
    }).catch(() => {
      dispatch({
        type: UPDATE_USER_FAILED
      });
    });
  };
}

export function requestLogout(onSuccess: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "token": cookieValue
      })
    }).then(res => {
      dispatch({
        type: LOGOUT_USER_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      });
      deleteCookie('refreshToken')
      deleteCookie('token');
      onSuccess();
      dispatch({
        type: LOGOUT_USER_FAILED
      });
    })
      .catch(() => {
        dispatch({
          type: LOGOUT_USER_FAILED
        });
      });
  };
}

export function requestNewToken(refreshToken: string | undefined, requestAgain: (dispatch: AppDispatch) => any) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: NEW_TOKEN_REQUEST
    });
    request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    }).then(res => {
      let authToken = res.accessToken?.split('Bearer ')[1];
      let refreshToken = res.refreshToken;

      if (authToken) {
        setCookie('token', authToken);
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken);
      }
      dispatch({
        type: NEW_TOKEN_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
      });
      dispatch(requestAgain);
      dispatch({
        type: NEW_TOKEN_FAILED
      });
    })
      .catch(() => {
        dispatch({
          type: NEW_TOKEN_FAILED
        });
      });
  };
}

export function checkToken(): ICheckTokenAction {
  return {
    type: CHECK_TOKEN
  }
}
