import {request} from "../../utils/server-interaction";
import {TIngredientsData, TIngredientsDataWithUUID} from "../../utils/types";
import {AppDispatch, AppThunk} from "../../index";

export const GET_INGREDIENTS_REQUEST: 'GET_RECOMMENDED_ITEMS_REQUEST' = 'GET_RECOMMENDED_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_RECOMMENDED_ITEMS_SUCCESS' = 'GET_RECOMMENDED_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_RECOMMENDED_ITEMS_FAILED' = 'GET_RECOMMENDED_ITEMS_FAILED';

export const SHOW_INGREDIENT_INFO: 'SHOW_INGREDIENT_INFO' = 'SHOW_INGREDIENT_INFO';
export const CLOSE_INGREDIENT_INFO: 'CLOSE_INGREDIENT_INFO' = 'CLOSE_INGREDIENT_INFO';

export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';

export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';

export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';
export const REFRESH_COUNTER: 'REFRESH_COUNTER' = 'REFRESH_COUNTER';

export const CHANGE_ORDER: 'CHANGE_ORDER' = 'CHANGE_ORDER';
export const REFRESH_INGREDIENTS: 'REFRESH_INGREDIENTS' = 'REFRESH_INGREDIENTS';


export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredientsData> | undefined;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}


export interface IShowIngredientInfoAction {
  readonly type: typeof SHOW_INGREDIENT_INFO;
  readonly openedIngredient: TIngredientsData;
}

export interface ICloseIngredientInfoAction {
  readonly type: typeof CLOSE_INGREDIENT_INFO;
}


export interface ISetCurrentTabAction {
  readonly type: typeof SET_CURRENT_TAB;
  readonly currentTab: string;
}


export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredientsDataWithUUID;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly item: TIngredientsData;
}


export interface IIncreaseCounterAction {
  readonly type: typeof INCREASE_COUNTER;
  readonly payload: {
    readonly id: string,
    readonly index: number
  }
}

export interface IDecreaseCounterAction {
  readonly type: typeof DECREASE_COUNTER;
  readonly id: string;
}


export interface IChangeOrderAction {
  readonly type: typeof CHANGE_ORDER;
  readonly payload: {
    readonly oldIndex: number;
    readonly newIndex: number
  };
}

export interface IRefreshCounterAction {
  readonly type: typeof REFRESH_COUNTER;
}

export interface IRefreshIngredientsAction {
  readonly type: typeof REFRESH_INGREDIENTS;
}

export type TIngredientsActions =
  IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IDeleteIngredientAction
  | IAddIngredientAction
  | IAddBunAction
  | IChangeOrderAction
  | IRefreshIngredientsAction
  ;

export type TShowCloseIngredientsActions =
  IShowIngredientInfoAction
  | ICloseIngredientInfoAction;

export type TCountIngredientsActions =
  IIncreaseCounterAction
  | IDecreaseCounterAction
  | IRefreshCounterAction;

export type TSetCurrentTabActions = ISetCurrentTabAction;


export function getIngredients(): AppThunk<unknown> {
  return function (dispatch: AppDispatch) {
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

export function showIngredientInfo(currentIngredient: TIngredientsData): IShowIngredientInfoAction {
  return {
    type: SHOW_INGREDIENT_INFO,
    openedIngredient: currentIngredient
  }
}

export function closeIngredientInfo(): ICloseIngredientInfoAction {
  return {
    type: CLOSE_INGREDIENT_INFO
  }
}

export function setCurrentTab(currentTab: string): ISetCurrentTabAction {
  return {
    type: SET_CURRENT_TAB,
    currentTab: currentTab
  }
}

export function deleteIngredient(index: number): IDeleteIngredientAction {
  return {
    type: DELETE_INGREDIENT,
    index
  }
}

export function addIngredient(item: TIngredientsDataWithUUID): IAddIngredientAction {
  return {
    type: ADD_INGREDIENT,
    item
  }
}

export function addBun(item: TIngredientsData): IAddBunAction {
  return {
    type: ADD_BUN,
    item
  }
}

export function increaseCounter(id: string, index: number): IIncreaseCounterAction {
  return {
    type: INCREASE_COUNTER,
    payload: {id, index}
  }
}

export function decreaseCounter(id: string): IDecreaseCounterAction {
  return {
    type: DECREASE_COUNTER,
    id
  }
}

export function changeOrder(oldIndex: number, newIndex: number): IChangeOrderAction {
  return {
    type: CHANGE_ORDER,
    payload: {oldIndex, newIndex}
  }
}