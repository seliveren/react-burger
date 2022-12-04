import React from "react";
import PropTypes from "prop-types";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import {ingredientType} from "../../utils/types.js";

const Categories = () => {
  const [current, setCurrent] = React.useState('one');
  return (
    <div className={BurgerIngredientsStyles.categories}>
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

const Card = ({ingredient, className = BurgerIngredientsStyles.card, onClick}) => {
  const quantity = 1;
  return (
    <div className={className} onClick={onClick} data-id={ingredient._id}>
      {quantity !== 0 ? <Counter count={quantity} size="default"/> : null}
      <img src={ingredient.image} alt={ingredient.name}/>
      <div className={BurgerIngredientsStyles.priceTag}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type={"primary"}/>
      </div>
      <h3 className={`text text_type_main-default m-0 ${BurgerIngredientsStyles.ingredientName}`}>{ingredient.name}</h3>
    </div>
  );
};

const Buns = ({data, onClick}) => {
  const bunIngredients = data.filter(bun => bun.type.includes('bun'));
  return (
    <>
      {bunIngredients.map((ingredient) => (
        <Card ingredient={ingredient} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Buns.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const Sauces = ({data, onClick}) => {
  const sauceIngredients = data.filter(sauce => sauce.type.includes('sauce'));
  return (
    <>
      {sauceIngredients.map((ingredient) => (
        <Card ingredient={ingredient} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Sauces.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const Filling = ({data, onClick}) => {
  const fillingIngredients = data.filter(filling => filling.type.includes('main'));
  return (
    <>
      {fillingIngredients.map((ingredient) => (
        <Card ingredient={ingredient} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Filling.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerIngredients = ({data, onClick}) => {
  return (
    <section className={`pr-5 ${BurgerIngredientsStyles.section}`}>
      <h1 className={"text text_type_main-large pb-5 m-0"}>Соберите бургер</h1>
      <Categories/>
      <div className={`mt-10 ${BurgerIngredientsStyles.scrollbar}`}>
        <h2 className={"text text_type_main-medium pt-0 pl-0 pr-0 pb-6 m-0"}>Булки</h2>
        <div className={`pb-6 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Buns data={data} onClick={onClick}/>
        </div>
        <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Соусы</h2>
        <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Sauces data={data} onClick={onClick}/>
        </div>
        <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Начинки</h2>
        <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Filling data={data} onClick={onClick}/>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;