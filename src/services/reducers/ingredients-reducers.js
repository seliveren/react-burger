import {
  ADD_BUN,
  ADD_INGREDIENT,
  CHANGE_ORDER,
  CLOSE_INGREDIENT_INFO,
  DECREASE_COUNTER,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_COUNTER,
  REFRESH_COUNTER,
  REFRESH_INGREDIENTS,
  SET_CURRENT_TAB,
  SHOW_INGREDIENT_INFO
} from "../actions";

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

const initialTabsState = {
  currentTab: 'one'
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