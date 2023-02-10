import React from "react";
import PropTypes from "prop-types";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {ingredientType} from "../../utils/types.js";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {
  addIngredient,
  postOrder,
  deleteIngredient,
  decreaseCounter,
  addBun,
  changeOrder
} from '../../services/actions/index';
import {useDrop, useDrag} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import {getCookie} from "../../utils/util-functions";


const Card = ({ingredient, index}) => {
  const dispatch = useDispatch();
  const handleDelete = (id, index) => {
    dispatch(decreaseCounter(id));
    dispatch(deleteIngredient(index));
  }
  const chosenIngredients = useSelector(store => store.ingredients.chosenIngredients);
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'card',
    drop(item) {
      if (!ref.current) {
        return
      }

      const dragIndex = Object.values(chosenIngredients).findIndex(it => it._id === item.id);
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }
      dispatch(changeOrder(dragIndex, hoverIndex));
    }
  });


  const [{isDragging}, drag] = useDrag(() => ({
    type: 'card',
    item: {id: ingredient._id, index},
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    },
  }));

  drag(drop(ref));

  return (
    <div className={BurgerConstructorStyles.item} ref={ref} style={{opacity: isDragging ? 0 : 1}}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDelete(ingredient._id, index)}
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

const Other = ({data, handleDelete}) => {
  return (
    <>
      {data.map((ingredient, index) => (
        <Card ingredient={ingredient} key={ingredient.uuid} index={index} handleDelete={handleDelete}/>
      ))}
    </>
  );
};

Other.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};

const BurgerTop = ({data}) => {
  return (
    <BunTop ingredient={data}/>
  );
};

BurgerTop.propTypes = {
  data: PropTypes.object.isRequired
};

const BurgerBottom = ({data}) => {
  return (
    <BunBottom ingredient={data}/>
  );
};

BurgerBottom.propTypes = {
  data: PropTypes.object.isRequired
};


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients);
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const chosenIngredients = useSelector(store => store.ingredients.chosenIngredients);
  const chosenBun = useSelector(store => store.ingredients.chosenBun);
  const navigate = useNavigate();

  const [{isOver}, drop] = useDrop(() => ({
    accept: "mainIngredient",
    drop: (item) => addMain(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addMain = (id) => {
    const item = data.ingredients.find((ingredient) => id === ingredient._id);
    const itemWithUUID = {...item, uuid: uuidv4()};
    item.type.includes('bun') ? dispatch(addBun(item)) : dispatch(addIngredient(itemWithUUID));
  };

  const mainSum = React.useMemo(() => (Object.keys(chosenIngredients).reduce(
    function (previous, key) {
      previous.price += chosenIngredients[key].price;
      return previous;
    }
    ,
    {
      price: 0
    }
  )).price, [chosenIngredients]);
  const bunSum = chosenBun.price * 2;


  const pickedIngredients = React.useMemo(() => {
    let picked = [];
    chosenIngredients.map((el) => picked.push(el._id));
    picked.push(chosenBun._id);
    return picked
  }, [chosenIngredients, chosenBun]);


  const handleOrder = () => {
    const isToken = getCookie('token');
    if (isToken !== undefined && Object.keys(chosenBun).length !== 0) {
      dispatch(postOrder(pickedIngredients));
      setIsOpenOrder(true)
    } else if (!isToken && Object.keys(chosenBun).length !== 0) {
      navigate("/login");
    }
  };

  const orderData = useSelector(store => store.order);

  return (
    <>
      <section ref={drop} className={`pt-15 ${BurgerConstructorStyles.section}`}>
        {Object.keys(chosenBun).length !== 0 ? <BurgerTop data={chosenBun}/> : null}
        <div
          className={chosenIngredients.length > 5 ? `pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.scrollbar}`
            : Object.keys(chosenBun).length !== 0 || chosenIngredients.length > 0 ? `pr-4 ${BurgerConstructorStyles.burgerStructure}`
              : `pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.burgerToConstruct}`}>
          {Object.keys(chosenBun).length !== 0 || chosenIngredients.length > 0 ? null :
            <div className={`${BurgerConstructorStyles.burgerToConstructText}`}>Пожалуйста, перенесите сюда булку и
              ингредиенты для создания заказа</div>}
          <Other data={chosenIngredients}/>
        </div>
        {Object.keys(chosenBun).length !== 0 ? <BurgerBottom data={chosenBun}/> : null}
        <div className={`pt-6 pr-5 ${BurgerConstructorStyles.orderConfirmation}`}>
          <div className={"text text_type_digits-medium"}>
            <span>{Object.keys(chosenBun).length === 0 && chosenIngredients.length > 0 ? mainSum : Object.keys(chosenBun).length !== 0 || chosenIngredients.length > 0 ? mainSum + bunSum : 0}</span>
            <CurrencyIcon type={"primary"}/>
          </div>
          <Button htmlType="button" type="primary" size="large"
                  onClick={handleOrder} disabled={Object.keys(chosenBun).length === 0}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {orderData.orderCheckoutRequest &&
        <div className={BurgerConstructorStyles.orderLoadingMessage}>Формируем заказ...&#128125;</div>}
      {!orderData.orderCheckoutRequest &&
        !orderData.orderCheckoutFailed && isOpenOrder && (
          <Modal onClose={() => {
            setIsOpenOrder(false)
          }}>
            <OrderDetails/>
          </Modal>
        )}
    </>
  )
}

export default BurgerConstructor;