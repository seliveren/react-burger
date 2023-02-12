import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {forgotPasswordUrl} from "../../utils/constants";


export function ProtectedRouteElementReset({element}) {
  const flag = useSelector(store => store.sendCode.flag);
  const auth = useSelector(store => store.auth.isAuth);

  return !flag || !auth ? <Navigate to={forgotPasswordUrl} replace/> : element;
}
