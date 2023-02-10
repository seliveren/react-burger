import { Navigate } from 'react-router-dom';
import {getCookie} from "../../utils/util-functions";


export function ProtectedRouteElementUnauth({ element }) {
  return getCookie('token') ? element : <Navigate to="/login" replace/>;
}
