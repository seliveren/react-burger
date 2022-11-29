import React from "react";
import PropTypes from "prop-types";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import data from "../App/utils/data.js";

const Categories = () => {
  const [current, setCurrent] = React.useState('one');
  return (
    <div style={{display: 'flex'}}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

const Card = ({ingredient, className = BurgerIngredientsStyles.card}) => {
  const quantity = 1;
  return (
    <div className={className}>
      {quantity !== 0 ? <Counter count={quantity} size="default"/> : null}
      <img src={ingredient.image}/>
      <div className={BurgerIngredientsStyles.priceTag}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type={"primary"}/>
      </div>
      <h3 className={`text text_type_main-default m-0 ${BurgerIngredientsStyles.ingredientName}`}>{ingredient.name}</h3>
    </div>
  );
};

const Buns = ({data}) => {
  let Buns = data.filter(bun => bun.type.includes('bun'));
  return (
    <>
      {Buns.map((ingredient, index) => (
        <Card ingredient={ingredient} key={index}/>
      ))}
    </>
  );
};

Buns.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const Sauces = ({data}) => {
  let Sauces = data.filter(sauce => sauce.type.includes('sauce'));
  return (
    <>
      {Sauces.map((ingredient, index) => (
        <Card ingredient={ingredient} key={index}/>
      ))}
    </>
  );
};

Sauces.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const Filling = ({data}) => {
  let Filling = data.filter(filling => filling.type.includes('main'));
  return (
    <>
      {Filling.map((ingredient, index) => (
        <Card ingredient={ingredient} key={index}/>
      ))}
    </>
  );
};

Filling.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const BurgerIngredients = () => {
  return (
    <section className={`pr-5 ${BurgerIngredientsStyles.section}`}>
      <h1 className={"text text_type_main-large pb-5 m-0"}>Соберите бургер</h1>
      <Categories/>
      <div className={`mt-10 ${BurgerIngredientsStyles.scrollbar}`}>
        <h2 className={"text text_type_main-medium pt-0 pl-0 pr-0 pb-6 m-0"}>Булки</h2>
        <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Buns data={data}/>
        </div>
        <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Соусы</h2>
        <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Sauces data={data}/>
        </div>
        <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Начинки</h2>
        <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Filling data={data}/>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;