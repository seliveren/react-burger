import { Navigate } from 'react-router-dom';
import {getCookie} from "../../utils/util-functions";


export function ProtectedRouteElementAuth({ element }) {
  return getCookie('token') ? <Navigate to="/" state={{homePage: true}} replace/> : element;
}
