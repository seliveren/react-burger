import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {homeUrl, loginUrl} from "../../utils/constants";

export default function ProtectedRoute({children, anonymous = false}) {

  const isLoggedIn = useSelector((store) => store.auth.isAuth);
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