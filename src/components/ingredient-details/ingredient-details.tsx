import React from "react";
import IngredientDetailsStyles from "./ingredient-details.module.css";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";


const IngredientDetails = (): any => {

  const location = useLocation();
  const ingredientID = location.pathname.split('/')[2];
  const ingredients = useAppSelector(store => store.ingredients)
  const ingredient = ingredients.ingredients.find(el => el._id === ingredientID)!;

  return (
    !ingredients.ingredientsRequest &&
    !ingredients.ingredientsFailed &&
    ingredients.ingredients.length && <div className={IngredientDetailsStyles.info}>
      <img src={ingredient.image} alt={ingredient.name} className={`pt-3 ${IngredientDetailsStyles.image}`}/>
      <p className={`pt-4 text text_type_main-medium ${IngredientDetailsStyles.name}`}>{ingredient.name}</p>
      <div className={`pb-15 pt-8 ${IngredientDetailsStyles.stats}`}>
        <div className={IngredientDetailsStyles.statsItem}>
          <p className="pr-5 text text_type_main-default">Калории, ккал</p>
          <span className="text text_type_digits-default">{ingredient.calories}</span>
        </div>
        <div className={IngredientDetailsStyles.statsItem}>
          <p className="pr-5 text text_type_main-default">Белки, г</p>
          <span className="text text_type_digits-default">{ingredient.proteins}</span>
        </div>
        <div className={IngredientDetailsStyles.statsItem}>
          <p className="pr-5 text text_type_main-default">Жиры, г</p>
          <span className="text text_type_digits-default">{ingredient.fat}</span>
        </div>
        <div className={IngredientDetailsStyles.statsItem}>
          <p className="pr-5 text text_type_main-default">Углеводы, г</p>
          <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;