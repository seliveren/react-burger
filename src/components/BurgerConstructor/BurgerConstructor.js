import React from "react";
import PropTypes from "prop-types";
import {Button, CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import data from "../App/utils/data.js";
import {ingredientsPropTypes} from "../BurgerIngredients/BurgerIngredients";

const Card = ({ingredient, className}) => {
  return (
    <div className={`mb-4 ${BurgerConstructorStyles.item}`}>
      <DragIcon type="primary"/>
      <div className={className}>
        <img src={ingredient.image} alt="Изображение ингредиента" className={BurgerConstructorStyles.image}/>
        <h3
          className={`text text_type_main-default pr-2 ${BurgerConstructorStyles.ingredientName}`}>{ingredient.name}</h3>
        <div className={BurgerConstructorStyles.priceTag}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type={"primary"}/>
        </div>
        <DeleteIcon type="primary"/>
      </div>
    </div>
  );
};

const BunTop = ({ingredient, className}) => {
  return (
    <div className={`ml-7 ${BurgerConstructorStyles.bunItem}`}>
      <div className={className}>
        <img src={ingredient.image} alt="Изображение верхней булочки" className={BurgerConstructorStyles.image}/>
        <h3
          className={`text text_type_main-default pr-2 ${BurgerConstructorStyles.ingredientName}`}>{ingredient.name} (верх)</h3>
        <div className={BurgerConstructorStyles.priceTag}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type={"primary"}/>
        </div>
        <LockIcon type="secondary"/>
      </div>
    </div>
  );
};

const BunBottom = ({ingredient, className}) => {
  return (
    <div className={`ml-7 ${BurgerConstructorStyles.bunItem}`}>
      <div className={className}>
        <img src={ingredient.image} alt="Изображение нижней булочки" className={BurgerConstructorStyles.image}/>
        <h3
          className={`text text_type_main-default pr-2 ${BurgerConstructorStyles.ingredientName}`}>{ingredient.name} (низ)</h3>
        <div className={BurgerConstructorStyles.priceTag}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type={"primary"}/>
        </div>
        <LockIcon type="secondary"/>
      </div>
    </div>
  );
};

const Other = ({data}) => {
  let Other = data.filter(mainIngredient => mainIngredient.type.includes('main'));
  return (
    <>
      {Other.map((ingredient, index) => (
        <Card ingredient={ingredient} key={index} className={`pt-4 pl-6 pb-4 pr-6 ${BurgerConstructorStyles.card}`}/>
      ))}
    </>
  );
};

Other.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const BurgerTop = ({data}) => {
  let bunTop = data.find(bun => bun.type === 'bun');
  return (
    <>
      <BunTop ingredient={bunTop} className={`pt-4 pl-7 pb-4 pr-7 mt-15 ${BurgerConstructorStyles.topBun}`}/>
    </>
  );
};

BurgerTop.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const BurgerBottom = ({data}) => {
  let bunBottom = data.find(bun => bun.type === 'bun');
  return (
    <>
      <BunBottom ingredient={bunBottom} className={`pt-4 pl-7 pb-4 pr-7 ${BurgerConstructorStyles.bottomBun}`}/>
    </>
  );
};

BurgerBottom.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired
};

const BurgerConstructor = () => {
  return (
    <section className={BurgerConstructorStyles.section}>
      <BurgerTop data={data}/>
      <div className={`pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.scrollbar}`}>
        <Other data={data}/>
      </div>
      <BurgerBottom data={data}/>
      <div className={`pt-6 pr-5 ${BurgerConstructorStyles.orderConfirmation}`}>
        <div className={`text text_type_digits-medium ${BurgerConstructorStyles.priceTag}`}>
          <span>610</span>
          <CurrencyIcon type={"primary"}/>
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;