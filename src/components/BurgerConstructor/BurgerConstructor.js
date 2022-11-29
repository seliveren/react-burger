import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import data from "../../utils/data.js";
import ingredientType from "../../utils/types.js";

const Card = ({ingredient, className}) => {
  return (
    <div className={BurgerConstructorStyles.item}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        classname={className}
      />
    </div>
  );
};

const BunTop = ({ingredient, className}) => {
  return (
    <div className={`ml-8 ${BurgerConstructorStyles.bunItem}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredient.name} (верх)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        classname={className}
      />
    </div>
  );
};

const BunBottom = ({ingredient, className}) => {
  return (
    <div className={`ml-8 ${BurgerConstructorStyles.bunItem}`}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${ingredient.name} (низ)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
        classname={className}
      />
    </div>
  );
};

const Other = ({data}) => {
  const Other = data.filter(mainIngredient => mainIngredient.type.includes('main'));
  return (
    <>
      {Other.map((ingredient) => (
        <Card ingredient={ingredient} key={ingredient._id}/>
      ))}
    </>
  );
};

Other.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerTop = ({data}) => {
  const bunTop = data.find(bun => bun.type === 'bun');
  return (
    <BunTop ingredient={bunTop}/>
  );
};

BurgerTop.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerBottom = ({data}) => {
  const bunBottom = data.find(bun => bun.type === 'bun');
  return (
    <BunBottom ingredient={bunBottom}/>
  );
};

BurgerBottom.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerConstructor = () => {
  return (
    <section className={`pt-15 ${BurgerConstructorStyles.section}`}>
      <BurgerTop data={data}/>
      <div className={`pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.scrollbar}`}>
        <Other data={data}/>
      </div>
      <BurgerBottom data={data}/>
      <div className={`pt-6 pr-5 ${BurgerConstructorStyles.orderConfirmation}`}>
        <div className={"text text_type_digits-medium"}>
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