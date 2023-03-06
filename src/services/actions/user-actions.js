import {request} from "../../utils/server-interaction";
import {cookieValue, deleteCookie, getCookie, setCookie} from "../../utils/util-functions";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const SEND_CODE_REQUEST = 'SEND_CODE_REQUEST_REQUEST';
export const SEND_CODE_FAILED = 'SEND_CODE_REQUEST_FAILED';
export const SEND_CODE_SUCCESS = 'SEND_CODE_REQUEST_SUCCESS';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export const SEND_AUTH_REQUEST = 'SEND_AUTH_REQUEST';
export const SEND_AUTH_FAILED = 'SEND_AUTH_FAILED';
export const SEND_AUTH_SUCCESS = 'SEND_AUTH_SUCCESS';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const NEW_TOKEN_REQUEST = 'NEW_TOKEN_REQUEST';
export const NEW_TOKEN_FAILED = 'NEW_TOKEN_FAILED';
export const NEW_TOKEN_SUCCESS = 'NEW_TOKEN_SUCCESS';

export const CHECK_TOKEN = 'CHECK_TOKEN';


export function registerNewUser(username, email, password, onSuccess) {
  return function (dispatch) {
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

export function sendResetPasswordCode(email, onSuccess) {
  return function (dispatch) {
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

export function resetPassword(password, code) {
  return function (dispatch) {
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

export function requestAuth(email, password, onSuccess) {
  return function (dispatch) {
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
        let authToken = res.accessToken.split('Bearer ')[1];
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
  return function (dispatch) {
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

export function updateUser(updatedName, updatedEmail) {
  return function (dispatch) {
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

export function requestLogout(onSuccess) {
  return function (dispatch) {
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

export function requestNewToken(refreshToken, requestAgain) {
  return function (dispatch) {
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
        let authToken = res.accessToken.split('Bearer ')[1];
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
        dispatch(requestAgain());
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

export function checkToken() {
  return {
    type: CHECK_TOKEN
  }
}
