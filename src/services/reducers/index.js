import {combineReducers} from 'redux';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_SUCCESS,
  REFRESH_INGREDIENTS,
  SHOW_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
  SET_CURRENT_TAB,
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  ADD_BUN,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  REFRESH_COUNTER,
  CHANGE_ORDER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SEND_CODE_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILED,
  SEND_AUTH_REQUEST,
  SEND_AUTH_SUCCESS,
  SEND_AUTH_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  NEW_TOKEN_REQUEST,
  NEW_TOKEN_SUCCESS,
  NEW_TOKEN_FAILED,
} from '../actions/index';


const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: [],
  chosenBun: {}
};

const counterState = {};

const shownIngredientState = {
  openedIngredient: {}
};

const checkoutInitialState = {
  orderCheckoutFailed: false,
  order: {
    number: null
  },
  orderCheckoutRequest: false
};

const initialTabsState = {
  currentTab: 'one'
};

const userInfo = {
  user: {
    email: '',
    name: ''
  },
  accessToken: '',
  refreshToken: '',
  registerNewUserRequest: false,
  registerNewUserFailed: false
};

const code = {
  code: {},
  sendCodeRequest: false,
  sendCodeFailed: false,
  flag: false
};

const resetData = {
  resetData: {},
  resetPasswordRequest: false,
  resetPasswordFailed: false
};


export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
    }
    case GET_INGREDIENTS_FAILED: {
      return {...state, ingredientsFailed: true, ingredientsRequest: false};
    }
    case DELETE_INGREDIENT: {
      const afterDeleted = state.chosenIngredients.slice(0, action.index);
      const beforeDeleted = state.chosenIngredients.slice(action.index + 1);
      const newChosenIngredients = afterDeleted.concat(beforeDeleted);
      return {
        ...state,
        chosenIngredients: newChosenIngredients
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: [...state.chosenIngredients, action.item]
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        chosenBun: {...state.ingredients.filter(item => item._id === action.item._id)[0]}
      };
    }
    case CHANGE_ORDER: {
      const swap = (array, a, b) => {
        [array[a], array[b]] = [array[b], array[a]]
      };
      swap(state.chosenIngredients, action.payload.oldIndex, action.payload.newIndex);

      return {
        ...state,
        chosenIngredients: state.chosenIngredients.map(item => item)
      };
    }
    case REFRESH_INGREDIENTS: {
      return {...state, chosenBun: {}, chosenIngredients: []};
    }
    default: {
      return state;
    }
  }
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


export const shownIngredientReducer = (state = shownIngredientState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_INFO: {
      return {
        ...state,
        openedIngredient: action.openedIngredient
      };
    }
    case CLOSE_INGREDIENT_INFO: {
      return {
        ...state,
        openedIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
};


export const setCurrentTabReducer = (state = initialTabsState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab
      };
    }
    default: {
      return state;
    }
  }
};


export const counterReducer = (state = counterState, action) => {
  switch (action.type) {
    case INCREASE_COUNTER: {
      return {
        ...state,
        [action.payload.id]: (state[action.payload.id] || 0) + 1
      }
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        [action.id]: (state[action.id] || 1) - 1
      }
    }
    case REFRESH_COUNTER: {
      return {
        state: {}
      }
    }
    default: {
      return state;
    }
  }
};


export const registerNewUserReducer = (state = userInfo, action) => {
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


export const sendPasswordResetCodeReducer = (state = code, action) => {
  switch (action.type) {
    case SEND_CODE_REQUEST: {
      return {
        ...state,
        sendCodeRequest: true
      };
    }
    case SEND_CODE_SUCCESS: {
      return {...state, sendCodeFailed: false, code: action.code, sendCodeRequest: false, flag: true};
    }
    case SEND_CODE_FAILED: {
      return {...state, sendCodeFailed: true, sendCodeRequest: false};
    }
    default: {
      return state;
    }
  }
};


export const resetPasswordReducer = (state = resetData, action) => {
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


export const sendAuthRequestReducer = (state = userInfo, action) => {
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


export const getUserReducer = (state = userInfo, action) => {
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


export const updateUserReducer = (state = userInfo, action) => {
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


export const logoutUserReducer = (state = userInfo, action) => {
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


export const requestNewTokenReducer = (state = userInfo, action) => {
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


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  shownIngredient: shownIngredientReducer,
  tab: setCurrentTabReducer,
  quantities: counterReducer,
  register: registerNewUserReducer,
  sendCode: sendPasswordResetCodeReducer,
  resetPassword: resetPasswordReducer,
  authRequest: sendAuthRequestReducer,
  getUser: getUserReducer,
  updateUser: updateUserReducer,
  logoutUser: logoutUserReducer,
  newToken: requestNewTokenReducer
});