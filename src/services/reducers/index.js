import {combineReducers} from 'redux';

import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_SUCCESS,
  SHOW_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
  SET_CURRENT_TAB,
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  ADD_BUN,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  CHANGE_ORDER
} from '../actions/index';


const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
  chosenIngredients: [],
  chosenBun: {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    __v: 0
  }
};

const counterState = {};

const shownIngredientState = {
  openedIngredient: {
    _id: "",
    name: "",
    type: "",
    proteins: null,
    fat: null,
    carbohydrates: null,
    calories: null,
    price: null,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: null
  }
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
}


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
        chosenIngredients: [...state.chosenIngredients, ...state.ingredients.filter(item => item._id === action.id)]
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        chosenBun: {...state.ingredients.filter(item => item._id === action.id)}[0]
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
  quantities: counterReducer
});