import React from "react";
import AppHeader from "../app-header/app-header";
import AppStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, closeIngredientInfo} from "../../services/actions/index";

const App = () => {
  const data = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );



  const [isOpenInfo, setIsOpenInfo] = React.useState(false);

  const handleCloseIngredient = () => {
    setIsOpenInfo(false);
    dispatch(closeIngredientInfo());
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

            <BurgerIngredients setOpen={setIsOpenInfo}/>

            <BurgerConstructor/>

            {isOpenInfo && (
              <Modal onClose={() => handleCloseIngredient()} header={'Детали ингредиента'}>
                <IngredientDetails/>
              </Modal>
            )}

          </main>
        </>}
    </DndProvider>
  );
}

export default App;