import React from "react";
import PropTypes from "prop-types";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {ingredientType} from "../../utils/types.js";
import {DataContext} from "../../services/burger-context"
import {baseUrl} from "../../utils/constants";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {request} from "../../utils/server-interaction";


const Card = ({ingredient}) => {
  return (
    <div className={BurgerConstructorStyles.item}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

Card.propTypes = {
  ingredient: PropTypes.object.isRequired
};

const BunTop = ({ingredient}) => {
  return (
    <div className={`ml-7 ${BurgerConstructorStyles.bunItem}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${ingredient.name} (верх)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

BunTop.propTypes = {
  ingredient: PropTypes.object.isRequired
};

const BunBottom = ({ingredient}) => {
  return (
    <div className={`ml-7 ${BurgerConstructorStyles.bunItem}`}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${ingredient.name} (низ)`}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

BunBottom.propTypes = {
  ingredient: PropTypes.object.isRequired
};

const Other = ({data}) => {
  const Other = React.useMemo(() => data.filter(mainIngredient => mainIngredient.type.includes('main')), [data]);
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
  const bunTop = React.useMemo(() =>data.find(bun => bun.type.includes('bun')), [data]);
  return (
    <BunTop ingredient={bunTop}/>
  );
};

BurgerTop.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerBottom = ({data}) => {
  const bunBottom = React.useMemo(() =>data.find(bun => bun.type.includes('bun')), [data]);
  return (
    <BunBottom ingredient={bunBottom}/>
  );
};

BurgerBottom.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};


const BurgerConstructor = () => {

  const [data] = React.useContext(DataContext);
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [order, setOrder] = React.useState({
    orderNumber: 0,
    isLoading: false,
    hasError: false
  });


  const bun = React.useMemo(() => data.ingredientsData.find(bun => bun.type.includes('bun')), [data.ingredientsData]);
  const main = React.useMemo(() => data.ingredientsData.filter(mainIngredient => mainIngredient.type.includes('main')), [data.ingredientsData]);
  const mainSum = React.useMemo(() => (Object.keys(main).reduce(
    function (previous, key) {
      previous.price += main[key].price;
      return previous;
    }
    ,
    {
      price: 0
    }
  )).price, [main]);
  const bunSum = bun.price * 2;


  const pickedIngredients = React.useMemo(() => {
    let picked = [];
    main.map((el) => picked.push(el._id));
    picked.push(bun._id);
    return picked
  }, [main, bun]);

  const placeOrder = () => {
    request(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "ingredients": pickedIngredients
      })
    })
      .then((res) => {
        setOrder({orderNumber: res.order.number, isLoading: false, hasError: false});
      })
      .catch(() => {
        setOrder({...order, hasError: true});
      })
    setIsOpenOrder(true);
  }

  return (
    <>
      <section className={`pt-15 ${BurgerConstructorStyles.section}`}>
        <BurgerTop data={data.ingredientsData}/>
        <div className={`pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.scrollbar}`}>
          <Other data={data.ingredientsData}/>
        </div>
        <BurgerBottom data={data.ingredientsData}/>
        <div className={`pt-6 pr-5 ${BurgerConstructorStyles.orderConfirmation}`}>
          <div className={"text text_type_digits-medium"}>
            <span>{mainSum + bunSum}</span>
            <CurrencyIcon type={"primary"}/>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={placeOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {isOpenOrder && (
        <Modal onClose={() => setIsOpenOrder(false)}>
          <OrderDetails orderNumber={order.orderNumber}/>
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor;