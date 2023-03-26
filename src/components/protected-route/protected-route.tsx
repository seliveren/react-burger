import {Navigate, useLocation} from 'react-router-dom';
import {homeUrl, loginUrl} from "../../utils/constants";
import {useAppSelector} from "../../hooks/useAppSelector";
import React from "react";


type TProtectedRouteProps = {
  children: JSX.Element;
  anonymous: boolean;
};


export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({children, anonymous = false}) => {

  const isLoggedIn = useAppSelector((store) => store.auth.isAuth);
  const location = useLocation();
  const from = location.state?.from || `${homeUrl}`;

  if (anonymous && isLoggedIn) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to={loginUrl} state={{from: location}}/>;
  }

  return children;
}