import {Navigate} from 'react-router-dom';
import {homeUrl} from "../../utils/constants";
import {useSelector} from "react-redux";


export function ProtectedRouteElementAuth({element}) {
  const auth = useSelector(store => store.auth.isAuth);

  return auth ? <Navigate to={homeUrl} state={{homePage: true}} replace/> : element;
}
