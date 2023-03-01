import {Routes, Route, useLocation} from 'react-router-dom';
import MainPage from "../../pages/main/main";
import RegistrationPage from "../../pages/registration/registration";
import LoginPage from "../../pages/login/login";
import FeedPage from "../../pages/feed/feed";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import {ProtectedRouteElementAuth} from "../protected-route-element-auth/protected-route-element-auth";
import {ProtectedRouteElementUnauth} from "../protected-route-element-unauth/protected-route-element-unauth";
import {ProtectedRouteElementReset} from "../protected-route-element-reset/protected-route-element-reset";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import React from "react";
import Error404Page from "../../pages/error-404/error-404";
import AppHeader from "../app-header/app-header";
import {
  ingredientsUrl,
  homeUrl,
  loginUrl,
  registerUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  profileUrl,
  anyUrl,
  ordersHistoryUrl,
  feedPageUrl
} from "../../utils/constants";
import OrderContentsPage from "../../pages/order-contents/order-contents";


export default function App() {

  const location = useLocation();
  localStorage.setItem('location.pathname', location.pathname);

  if (location.state?.modalOpen) {
    localStorage.setItem('location.state.modalOpen', "true");
  } else {
    localStorage.setItem('location.state.modalOpen', "false");
  }

  return (
    <>
      <AppHeader/>
      <Routes>
        <Route path={homeUrl} element={<MainPage/>}>
          <Route path={`${ingredientsUrl}/:id`} element={<IngredientDetailsPage/>}/>
        </Route>
        <Route path={loginUrl} element={<ProtectedRouteElementAuth element={<LoginPage/>}/>}/>
        <Route path={registerUrl} element={<ProtectedRouteElementAuth element={<RegistrationPage/>}/>}/>
        <Route path={forgotPasswordUrl} element={<ProtectedRouteElementAuth element={<ForgotPasswordPage/>}/>}/>
        <Route path={resetPasswordUrl} element={<ProtectedRouteElementReset element={<ResetPasswordPage/>}/>}/>

        <Route path={profileUrl} element={<ProtectedRouteElementUnauth element={<ProfilePage/>}/>}>
          <Route path={ordersHistoryUrl} element={<ProtectedRouteElementUnauth element={<OrderContentsPage/>}/>}>
            <Route path={`:id`} element={<ProtectedRouteElementUnauth element={<OrderContentsPage/>}/>}/>
          </Route>
        </Route>

        <Route path={feedPageUrl} element={<FeedPage/>}>
          <Route path={`${feedPageUrl}/:id`} element={<OrderContentsPage/>}/>
        </Route>

        <Route path={anyUrl} element={<Error404Page/>}/>
      </Routes>
    </>
  );
}



