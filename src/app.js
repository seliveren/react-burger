import {Routes, Route} from 'react-router-dom';
import MainPage from "./pages/main";
import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import ProfilePage from "./pages/profile";
import {ProtectedRouteElementAuth} from "./components/protected-route-element-auth/protected-route-element-auth";
import {ProtectedRouteElementUnauth} from "./components/protected-route-element-unauth/protected-route-element-unauth";
import {ProtectedRouteElementReset} from "./components/protected-route-element-reset/protected-route-element-reset";
import OrdersHistoryPage from "./pages/orders-history";
import IngredientDetailsPage from "./pages/ingredient-details";
import React from "react";
import Error404Page from "./pages/error-404";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage/>}>
        <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
      </Route>
      <Route path="/login" element={<ProtectedRouteElementAuth element={<LoginPage/>}/>}/>
      <Route path="/register" element={<ProtectedRouteElementAuth element={<RegistrationPage/>}/>}/>
      <Route path="/forgot-password" element={<ProtectedRouteElementAuth element={<ForgotPasswordPage/>}/>}/>
      <Route path="/reset-password" element={<ProtectedRouteElementReset element={<ResetPasswordPage/>}/>}/>
      <Route path="/profile" element={<ProtectedRouteElementUnauth element={<ProfilePage/>}/>}/>
      <Route path="/orders-history" element={<ProtectedRouteElementUnauth element={<OrdersHistoryPage/>}/>}/>
      <Route path="*" element={<Error404Page/>}/>
    </Routes>
  );
}



