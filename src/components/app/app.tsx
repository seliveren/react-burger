import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import MainPage from "../../pages/main/main";
import RegistrationPage from "../../pages/registration/registration";
import LoginPage from "../../pages/login/login";
import FeedPage from "../../pages/feed/feed";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import {ProtectedRoute} from "../protected-route/protected-route";
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
import {
  closeIngredientInfo,
  closeOrderInfo,
  getIngredients,
} from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useAppDispatch} from "../../hooks/useAppDispatch";


export default function App() {

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const location = useLocation();
  let background = location.state && location.state.background;

  const navigate = useNavigate();
  const handleCloseIngredient = () => {
    dispatch(closeIngredientInfo());
    navigate(`${homeUrl}`, {
      state: {
        homePage: true
      }
    });
  };

  const handleCloseOrder = () => {
    dispatch(closeOrderInfo());
    if (location.pathname.split('/')[1] === 'feed') {
      navigate(`${feedPageUrl}`, {
        state: {
          feedPage: true
        }
      });
    } else {
      navigate(`${profileUrl}/${ordersHistoryUrl}`, {
        state: {
          ordersHistoryPage: true
        }
      });
    }
  };

  return (
    <>
      <AppHeader/>
      <Routes location={background ?? location}>
        <Route path={homeUrl} element={<MainPage/>}/>
        <Route path={`${ingredientsUrl}/:id`} element={<IngredientDetailsPage/>}/>
        <Route path={loginUrl} element={<ProtectedRoute anonymous={true} children={<LoginPage/>}/>}/>
        <Route path={registerUrl} element={<ProtectedRoute anonymous={true} children={<RegistrationPage/>}/>}/>
        <Route path={forgotPasswordUrl}
               element={<ProtectedRoute anonymous={true} children={<ForgotPasswordPage/>}/>}/>
        <Route path={resetPasswordUrl}
               element={<ProtectedRoute anonymous={true} children={<ResetPasswordPage/>}/>}/>
        <Route path={profileUrl} element={<ProtectedRoute anonymous={false} children={<ProfilePage/>}/>}>
          <Route path={`${ordersHistoryUrl}`}
                 element={<ProtectedRoute anonymous={false} children={<ProfilePage/>}/>}/>
        </Route>
        <Route path={`${profileUrl}/${ordersHistoryUrl}/:id`}
               element={<ProtectedRoute anonymous={false} children={<OrderContentsPage/>}/>}/>
        <Route path={feedPageUrl} element={<FeedPage/>}/>
        <Route path={`${feedPageUrl}/:id`} element={<OrderContentsPage/>}/>
        <Route path={anyUrl} element={<Error404Page/>}/>
      </Routes>

      {background && location.pathname.split('/')[1] === 'ingredients' && (
        <Routes>
          <Route path={`${ingredientsUrl}/:id`}
                 element={<Modal onClose={() => handleCloseIngredient()} header={'Детали ингредиента'}>
                   <IngredientDetails/>
                 </Modal>}>
          </Route>
        </Routes>
      )}

      {background && location.pathname.split('/')[1] === 'feed' && (
        <Routes>
          <Route path={`${feedPageUrl}/:id`}
                 element={<><Modal onClose={() => handleCloseOrder()}>
                   <OrderContentsPage/>
                 </Modal> </>}/>
        </Routes>
      )}

      {background && location.pathname.split('/')[1] === 'profile' && (
        <Routes>
          <Route path={`${profileUrl}/${ordersHistoryUrl}/:id`}
                 element={<><Modal onClose={() => handleCloseOrder()}>
                   <OrderContentsPage/>
                 </Modal> </>}/>
        </Routes>)}
    </>
  );
}



