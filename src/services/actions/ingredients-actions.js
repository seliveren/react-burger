import {request} from "../../utils/server-interaction";

export const GET_INGREDIENTS_REQUEST = 'GET_RECOMMENDED_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_RECOMMENDED_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_RECOMMENDED_ITEMS_FAILED';

export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const CLOSE_INGREDIENT_INFO = 'CLOSE_INGREDIENT_INFO';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export const CHANGE_ORDER = 'CHANGE_ORDER';


export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    request("ingredients").then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      })
    }).catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
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