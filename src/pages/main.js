import React from "react";
import AppHeader from "../../src/components/app-header/app-header";
import AppStyles from "./main.module.css";
import BurgerIngredients from "../../src/components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../src/components/burger-constructor/burger-constructor";
import Modal from "../../src/components/modal/modal";
import IngredientDetails from "../../src/components/ingredient-details/ingredient-details";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, closeIngredientInfo} from "../services/actions/index";
import {useLocation, useNavigate} from "react-router-dom";
import IngredientDetailsPage from "./ingredient-details";


const MainPage = () => {

  const data = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const handleCloseIngredient = () => {
    setIsOpenInfo(false);
    dispatch(closeIngredientInfo());
    navigate("/", {
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
          <AppHeader/>
          <main className={AppStyles.main}>

            {!location.state?.homePage && !location.state?.modalOpen && <IngredientDetailsPage/>}

            {location.state?.modalOpen && (
              <>
                <Modal onClose={() => handleCloseIngredient()} header={'Детали ингредиента'}>
                  <IngredientDetails/>
                </Modal>

                <BurgerIngredients setOpen={setIsOpenInfo}/>
                <BurgerConstructor/>
              </>
            )}

            {location.state?.homePage && (
              <>
                <BurgerIngredients setOpen={setIsOpenInfo}/>
                <BurgerConstructor/>
              </>
            )}
          </main>
        </>}
    </DndProvider>
  );
}

export default MainPage;