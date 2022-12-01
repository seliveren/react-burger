import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {baseUrl} from "../../utils/constants";

const App = () => {
  const [state, setState] = React.useState({
    ingredientsData: [],
    isLoading: false,
    hasError: false
  })

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, isLoading: true, hasError: false});
      const res = await fetch(`${baseUrl}`);
      const data = await res.json();
      setState({ingredientsData: data.data, isLoading: false, hasError: false});
    }
    getIngredientsData();
  }, []);


  const {ingredientsData, isLoading, hasError} = state;

  console.log(state)

  return (
    <>
      {state.isLoading &&
        <div className={AppStyles.loadingMessage}>Настройка связи с космосом...&#128125;</div>}
      {state.hasError && <div className={AppStyles.errorMessage}>Связь с космосом нарушена!&#128165;</div>}
      {!state.isLoading &&
        !state.hasError &&
        state.ingredientsData.length &&
        <>
          <AppHeader/>
          <main className={AppStyles.main}>
            <BurgerIngredients data={state.ingredientsData}/>
            <BurgerConstructor data={state.ingredientsData}/>
          </main>
        </>}
    </>
  );
}

export default App;