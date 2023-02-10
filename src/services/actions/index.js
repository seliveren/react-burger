import {request} from "../../utils/server-interaction";
import {baseUrl} from "../../utils/constants";
import {getCookie, setCookie} from "../../utils/util-functions";

export const GET_INGREDIENTS_REQUEST = 'GET_RECOMMENDED_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_RECOMMENDED_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_RECOMMENDED_ITEMS_FAILED';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const REFRESH_INGREDIENTS = 'REFRESH_INGREDIENTS';

export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const CLOSE_INGREDIENT_INFO = 'CLOSE_INGREDIENT_INFO';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const REFRESH_COUNTER = 'REFRESH_COUNTER';

export const CHANGE_ORDER = 'CHANGE_ORDER';

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

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    request(`${baseUrl}/ingredients`).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    }).catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  };
}

export function postOrder(pickedIngredients) {
  return function (dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    request(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({
        "ingredients": pickedIngredients
      })
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          order: res.order
        });
      } else {
        dispatch({
          type: ORDER_CHECKOUT_FAILED
        });
      }
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

export function showIngredientInfo(currentIngredient) {
  return {
    type: SHOW_INGREDIENT_INFO,
    openedIngredient: currentIngredient
  }
}

export function closeIngredientInfo() {
  return {
    type: CLOSE_INGREDIENT_INFO
  }
}

export function setCurrentTab(currentTab) {
  return {
    type: SET_CURRENT_TAB,
    currentTab: currentTab
  }
}

export function deleteIngredient(index) {
  return {
    type: DELETE_INGREDIENT,
    index
  }
}

export function addIngredient(item) {
  return {
    type: ADD_INGREDIENT,
    item
  }
}

export function addBun(item) {
  return {
    type: ADD_BUN,
    item
  }
}

export function increaseCounter(id, index) {
  return {
    type: INCREASE_COUNTER,
    payload: {id, index}
  }
}

export function decreaseCounter(id) {
  return {
    type: DECREASE_COUNTER,
    id
  }
}

export function changeOrder(oldIndex, newIndex) {
  return {
    type: CHANGE_ORDER,
    payload: {oldIndex, newIndex}
  }
}

export function registerNewUser(username, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    request(`${baseUrl}/auth/register`, {
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
      if (res && res.success) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAILED
        });
      }
    }).catch(() => {
      dispatch({
        type: REGISTER_USER_FAILED
      });
    });
  };
}

export function sendResetPasswordCode(email) {
  return function (dispatch) {
    dispatch({
      type: SEND_CODE_REQUEST
    });
    request(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email
      })
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_CODE_SUCCESS,
          code: res.data
        });
      } else {
        dispatch({
          type: SEND_CODE_FAILED
        });
      }
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
    request(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "token": code
      })
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          resetData: res.data
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    }).catch(() => {
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
    });
  };
}

export function requestAuth(email, password) {
  return function (dispatch) {
    dispatch({
      type: SEND_AUTH_REQUEST
    });
    request(`${baseUrl}/auth/login`, {
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
        if (res && res.success) {
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
        } else {
          dispatch({
            type: SEND_AUTH_FAILED
          });
        }
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
    request(`${baseUrl}/auth/user`, {
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
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: GET_USER_FAILED
        });
      }
    }).catch(() => {
      dispatch(requestNewToken(getCookie('refreshToken')));
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
    request(`${baseUrl}/auth/user`, {
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
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: UPDATE_USER_FAILED
        });
      }
    }).catch(() => {
      dispatch({
        type: UPDATE_USER_FAILED
      });
    });
  };
}

export function requestLogout(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    request(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    }).then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_USER_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          });
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_USER_FAILED
        });
      });
  };
}

export function requestNewToken(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: NEW_TOKEN_REQUEST
    });
    request(`${baseUrl}/auth/token`, {
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
        if (res && res.success) {
          dispatch({
            type: NEW_TOKEN_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          });
          dispatch(getUser());
        } else {
          dispatch({
            type: NEW_TOKEN_FAILED
          });
        }
      })
      .catch(() => {
        dispatch({
          type: NEW_TOKEN_FAILED
        });
      });
  };
}

