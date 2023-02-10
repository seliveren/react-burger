import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getCookie} from "../../utils/util-functions";


export function ProtectedRouteElementReset({element}) {
  const flag = useSelector(store => store.sendCode.flag);
  return flag === false || getCookie('token') === false ? <Navigate to="/forgot-password" replace/> : element;
}
