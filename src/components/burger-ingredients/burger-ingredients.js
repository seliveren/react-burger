import React from "react";
import PropTypes from "prop-types";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import {ingredientType} from "../../utils/types.js";
import {DataContext} from "../../services/burger-context";


const Categories = ({refOne, refTwo, refThree}) => {
  const [current, setCurrent] = React.useState('one');

  const handleScroll = (ref) => {
    ref.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  };

  return (
    <div className={BurgerIngredientsStyles.categories}>
      <Tab value="one" active={current === 'one'} onClick={(e) => {
        setCurrent(e);
        handleScroll(refOne.current)
      }}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={(e) => {
        setCurrent(e);
        handleScroll(refTwo.current)
      }}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={(e) => {
        setCurrent(e);
        handleScroll(refThree.current)
      }}>
        Начинки
      </Tab>
    </div>
  )
};

const Card = ({ingredient, className, onClick}) => {
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

Card.propTypes = {
  ingredient: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Buns = ({data, onClick}) => {
  const bunIngredients = React.useMemo(() => data.filter(bun => bun.type.includes('bun')), [data]);
  return (
    <>
      {bunIngredients.map((ingredient) => (
        <Card ingredient={ingredient} className={BurgerIngredientsStyles.card} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Buns.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired
};

const Sauces = ({data, onClick}) => {
  const sauceIngredients = React.useMemo(() => data.filter(sauce => sauce.type.includes('sauce')), [data]);
  return (
    <>
      {sauceIngredients.map((ingredient) => (
        <Card ingredient={ingredient} className={BurgerIngredientsStyles.card} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Sauces.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired
};

const Filling = ({data, onClick}) => {
  const fillingIngredients = React.useMemo(() => data.filter(filling => filling.type.includes('main')), [data]);
  return (
    <>
      {fillingIngredients.map((ingredient) => (
        <Card ingredient={ingredient} className={BurgerIngredientsStyles.card} key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};

Filling.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired
};

const BurgerIngredients = ({onClick, refOne, refTwo, refThree}) => {

  const [data] = React.useContext(DataContext);

  return (
    <section className={`pr-5 ${BurgerIngredientsStyles.section}`}>
      <h1 className={"text text_type_main-large pb-5 m-0"}>Соберите бургер</h1>
      <Categories refOne={refOne} refTwo={refTwo} refThree={refThree}/>
      <div className={`mt-10 ${BurgerIngredientsStyles.scrollbar}`}>
        <h2 ref={refOne} className={"text text_type_main-medium pt-0 pl-0 pr-0 pb-6 m-0"}>Булки</h2>
        <div className={`pb-6 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Buns data={data.ingredientsData} onClick={onClick}/>
        </div>
        <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Соусы</h2>
        <div ref={refTwo} className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Sauces data={data.ingredientsData} onClick={onClick}/>
        </div>
        <h2 className={"text text_type_main-me dium pt-10 pl-0 pr-0 pb-6 m-0"}>Начинки</h2>
        <div ref={refThree} className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
          <Filling data={data.ingredientsData} onClick={onClick}/>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func.isRequired,
  refOne: PropTypes.object.isRequired,
  refTwo: PropTypes.object.isRequired,
  refThree: PropTypes.object.isRequired,
};

export default BurgerIngredients;