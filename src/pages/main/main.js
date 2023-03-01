import React from "react";
import AppStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, closeIngredientInfo, checkToken} from "../../services/actions";
import {useLocation, useNavigate} from "react-router-dom";
import IngredientDetailsPage from "../ingredient-details/ingredient-details";
import {homeUrl} from "../../utils/constants";


const MainPage = () => {

  const data = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const handleCloseIngredient = () => {
    dispatch(closeIngredientInfo());
    navigate(`${homeUrl}`, {
      state: {
        homePage: true
      }
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {data.ingredientsRequest &&
        <div className={AppStyles.loadingMessage}>Настройка связи с космосом...&#128125;</div>}
      {data.ingredientsFailed && <div className={AppStyles.errorMessage}>Связь с космосом нарушена!&#128165;</div>}
      {!data.ingredientsRequest &&
        !data.ingredientsFailed &&
        data.ingredients.length &&
        <>
          <main className={AppStyles.main}>

            {!location.state?.homePage && !location.state?.modalOpen && <IngredientDetailsPage/>}

            {location.state?.modalOpen && (
              <>
                <Modal onClose={() => handleCloseIngredient()} header={'Детали ингредиента'}>
                  <IngredientDetails/>
                </Modal>

                <BurgerIngredients/>
                <BurgerConstructor/>
              </>
            )}

            {location.state?.homePage && (
              <>
                <BurgerIngredients/>
                <BurgerConstructor/>
              </>
            )}
          </main>
        </>}
    </DndProvider>
  );
}

export default MainPage;