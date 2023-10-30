import React from "react";
import AppStyles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {checkToken} from "../../services/actions";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const MainPage = () => {

  const data = useAppSelector(store => store.ingredients);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      {data.ingredientsRequest &&
        <div className={AppStyles.loadingMessage}>Настройка связи с космосом...&#128125;</div>}
      {data.ingredientsFailed && <div className={AppStyles.errorMessage}>Связь с космосом нарушена!&#128165;</div>}
      {!data.ingredientsRequest &&
        !data.ingredientsFailed &&
        data.ingredients.length &&
        <main className={AppStyles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      }
    </DndProvider>
  );
}

export default MainPage;