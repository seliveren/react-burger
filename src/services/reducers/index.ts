import {combineReducers} from 'redux';
import {wsReducer} from './ws-reducer';
import {ingredientsReducer, shownIngredientReducer, setCurrentTabReducer, counterReducer} from './ingredients-reducers';
import {orderReducer, shownOrderReducer} from './order-reducers';
import {
  registerNewUserReducer, resetPasswordReducer, sendAuthRequestReducer, getUserReducer,
  updateUserReducer, logoutUserReducer, requestNewTokenReducer, checkTokenReducer
} from './user-reducers';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  shownIngredient: shownIngredientReducer,
  tab: setCurrentTabReducer,
  quantities: counterReducer,
  register: registerNewUserReducer,
  resetPassword: resetPasswordReducer,
  authRequest: sendAuthRequestReducer,
  getUser: getUserReducer,
  updateUser: updateUserReducer,
  logoutUser: logoutUserReducer,
  newToken: requestNewTokenReducer,
  auth: checkTokenReducer,
  shownOrder: shownOrderReducer,
  ws: wsReducer
});