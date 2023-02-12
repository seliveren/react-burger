import React from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import IngredientDetailsStyles from "./ingredient-details.module.css";


const IngredientDetailsPage = () => {

  return (
    <div className={`${IngredientDetailsStyles.container} pt-20`}>
      <h1 className={`${IngredientDetailsStyles.text} text text_type_main-large pt-3`}>Детали ингредиента</h1>
      <IngredientDetails/>
    </div>
  );

}

export default IngredientDetailsPage;