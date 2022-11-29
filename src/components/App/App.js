import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader/>
        <main className={AppStyles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </>
    );
  }
}

export default App;