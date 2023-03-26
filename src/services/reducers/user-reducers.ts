import {
  CHECK_TOKEN,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  NEW_TOKEN_FAILED,
  NEW_TOKEN_REQUEST,
  NEW_TOKEN_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_AUTH_FAILED,
  SEND_AUTH_REQUEST,
  SEND_AUTH_SUCCESS,
  TCheckTokenActions,
  TGetUserActions,
  TLogoutUserActions,
  TNewTokenActions,
  TRegisterUserActions, TResetPasswordActions, TSendAuthActions,
  TUpdateUserActions,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../actions";
import {getCookie} from "../../utils/util-functions";


type TUserInfo = {
  user: { name?: string; email?: string; } | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  registerNewUserRequest: boolean;
  registerNewUserFailed: boolean;
  newTokenRequest?: boolean;
  newTokenFailed?: boolean;
  logoutUserRequest?: boolean;
  logoutUserFailed?: boolean;
  updateUserRequest?: boolean;
  updateUserFailed?: boolean;
  getUserRequest?: boolean;
  getUserFailed?: boolean;
  sendAuthRequest?: boolean;
  sendAuthFailed?: boolean;
};

const userInfo: TUserInfo = {
  user: {name: '', email: ''},
  accessToken: '',
  refreshToken: '',
  registerNewUserRequest: false,
  registerNewUserFailed: false,
  newTokenRequest: false,
  newTokenFailed: false,
  logoutUserRequest: false,
  logoutUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  sendAuthRequest: false,
  sendAuthFailed: false
};


type TResetData = {
  resetData: {} | undefined;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
};

const resetData: TResetData = {
  resetData: {},
  resetPasswordRequest: false,
  resetPasswordFailed: false
};


type TAuth = {
  isAuth: boolean;
};

const auth: TAuth = {
  isAuth: true
};


export const registerNewUserReducer = (state = userInfo, action: TRegisterUserActions): TUserInfo => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerNewUserRequest: true
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerNewUserFailed: false,
        user: action.user,
        registerNewUserRequest: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }
    case REGISTER_USER_FAILED: {
      return {...state, registerNewUserFailed: true, registerNewUserRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const resetPasswordReducer = (state = resetData, action: TResetPasswordActions): TResetData => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {...state, resetPasswordFailed: false, resetData: action.resetData, resetPasswordRequest: false};
    }
    case RESET_PASSWORD_FAILED: {
      return {...state, resetPasswordFailed: true, resetPasswordRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const sendAuthRequestReducer = (state = userInfo, action: TSendAuthActions): TUserInfo => {
  switch (action.type) {
    case SEND_AUTH_REQUEST: {
      return {
        ...state,
        sendAuthRequest: true
      };
    }
    case SEND_AUTH_SUCCESS: {
      return {
        ...state,
        sendAuthFailed: false,
        user: action.user,
        sendAuthRequest: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }
    case SEND_AUTH_FAILED: {
      return {...state, sendAuthFailed: true, sendAuthRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const getUserReducer = (state = userInfo, action: TGetUserActions): TUserInfo => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {...state, getUserFailed: false, user: action.user, getUserRequest: false};
    }
    case GET_USER_FAILED: {
      return {...state, getUserFailed: true, getUserRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const updateUserReducer = (state = userInfo, action: TUpdateUserActions): TUserInfo => {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {...state, updateUserFailed: false, user: action.user, updateUserRequest: false};
    }
    case UPDATE_USER_FAILED: {
      return {...state, updateUserFailed: true, updateUserRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const logoutUserReducer = (state = userInfo, action: TLogoutUserActions): TUserInfo => {
  switch (action.type) {
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {...state, logoutUserFailed: false, user: action.user, logoutUserRequest: false};
    }
    case LOGOUT_USER_FAILED: {
      return {...state, logoutUserFailed: true, logoutUserRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const requestNewTokenReducer = (state = userInfo, action: TNewTokenActions): TUserInfo => {
  switch (action.type) {
    case NEW_TOKEN_REQUEST: {
      return {
        ...state,
        newTokenRequest: true
      };
    }
    case NEW_TOKEN_SUCCESS: {
      return {...state, newTokenFailed: false, user: action.user, newTokenRequest: false};
    }
    case NEW_TOKEN_FAILED: {
      return {...state, newTokenFailed: true, newTokenRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const checkTokenReducer = (state = auth, action: TCheckTokenActions): TAuth => {
  switch (action.type) {
    case CHECK_TOKEN: {
      return {
        ...state,
        isAuth: !!getCookie('token')
      };
    }
    default: {
      return state;
    }
  }
};



