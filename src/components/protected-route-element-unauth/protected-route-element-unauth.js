import {Navigate} from 'react-router-dom';
import {loginUrl} from "../../utils/constants";
import {useSelector} from "react-redux";


export function ProtectedRouteElementUnauth({element}) {
  const auth = useSelector(store => store.auth.isAuth);

  return auth ? element : <Navigate to={loginUrl} replace/>;
}