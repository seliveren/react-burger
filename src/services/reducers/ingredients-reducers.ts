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
  SHOW_INGREDIENT_INFO,
  TCountIngredientsActions,
  TIngredientsActions,
  TSetCurrentTabActions,
  TShowCloseIngredientsActions
} from "../actions";
import {TIngredientsData, TIngredientsDataWithUUID} from "../../utils/types";


type TInitialState = {
  ingredients: Array<TIngredientsData>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  chosenIngredients: Array<TIngredientsDataWithUUID>;
  chosenBun: TIngredientsData | undefined;
}

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: [],
  chosenBun: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  }
};


type TCounterState = {
  [key: string]: number;
}

const counterState: TCounterState = {};


type TShownIngredientState = {
  openedIngredient: TIngredientsData | {};
}

const shownIngredientState: TShownIngredientState = {
  openedIngredient: {}
};


type TInitialTabsState = {
  currentTab: string;
}

const initialTabsState: TInitialTabsState = {
  currentTab: 'one'
};


export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {...state, ingredientsFailed: false, ingredients: action.ingredients!, ingredientsRequest: false};
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
      const swap = (array: Array<TIngredientsDataWithUUID>, a: number, b: number) => {
        [array[a], array[b]] = [array[b], array[a]]
      };
      swap(state.chosenIngredients, action.payload.oldIndex, action.payload.newIndex);

      return {
        ...state,
        chosenIngredients: state.chosenIngredients.map(item => item)
      };
    }
    case REFRESH_INGREDIENTS: {
      return {
        ...state, chosenBun: {
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '',
          image_mobile: '',
          image_large: '',
          __v: 0
        }, chosenIngredients: []
      };
    }
    default: {
      return state;
    }
  }
};


export const shownIngredientReducer = (state = shownIngredientState, action: TShowCloseIngredientsActions): TShownIngredientState => {
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


export const setCurrentTabReducer = (state = initialTabsState, action: TSetCurrentTabActions): TInitialTabsState => {
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


export const counterReducer = (state = counterState, action: TCountIngredientsActions): TCounterState => {
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
        state: 0
      }
    }
    default: {
      return state;
    }
  }
};