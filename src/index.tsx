import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {rootReducer} from './services/reducers';
import {socketMiddleware} from './services/middleware/socketMiddleware';
import {
  TCheckTokenActions,
  TCountIngredientsActions, TGetUserActions,
  TIngredientsActions, TLogoutUserActions,
  TOrderCheckoutActions, TRegisterUserActions, TResetPasswordActions, TSendAuthActions, TSendCodeActions,
  TShowCloseIngredientsActions,
  TShowCloseOrderInfoActions, TUpdateUserActions,
  TWsConnectionActions,
  TNewTokenActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_DATA, TSetCurrentTabActions
} from './services/actions';
import reportWebVitals from './reportWebVitals';
import {ThunkAction} from 'redux-thunk';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;


const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_DATA
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${wsUrl}`, wsActions)));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  TIngredientsActions |
  TShowCloseIngredientsActions |
  TCountIngredientsActions |
  TOrderCheckoutActions |
  TShowCloseOrderInfoActions |
  TWsConnectionActions |
  TRegisterUserActions |
  TSendCodeActions |
  TResetPasswordActions |
  TSendAuthActions |
  TGetUserActions |
  TUpdateUserActions |
  TLogoutUserActions |
  TNewTokenActions |
  TCheckTokenActions |
  TSetCurrentTabActions;

export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();







