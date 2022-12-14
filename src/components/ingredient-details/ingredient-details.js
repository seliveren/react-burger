import React from "react";
import IngredientDetailsStyles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ingredient}) => {
  return (
    <div className={IngredientDetailsStyles.info}>
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

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired
};

export default IngredientDetails;