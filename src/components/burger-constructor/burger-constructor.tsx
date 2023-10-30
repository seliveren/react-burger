import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {TIngredientsData, TIngredientsDataWithUUID} from "../../utils/types.js";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  addIngredient,
  postOrder,
  deleteIngredient,
  decreaseCounter,
  addBun,
  changeOrder
} from '../../services/actions';
import {useDrop, useDrag} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import {loginUrl} from "../../utils/constants";
import {checkToken} from "../../services/actions";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";


type TCardProps = {
  ingredient: TIngredientsData;
  index: number;
};


const Card: React.FC<TCardProps> = ({ingredient, index}) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: string, index: number) => {
    dispatch(decreaseCounter(id));
    dispatch(deleteIngredient(index));
  }
  const chosenIngredients = useAppSelector(store => store.ingredients.chosenIngredients);
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'card',
    drop(item: { id: string }) {
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


type TBunProps = {
  ingredient: TIngredientsData;
};


const BunTop: React.FC<TBunProps> = ({ingredient}) => {
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


const BunBottom: React.FC<TBunProps> = ({ingredient}) => {
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


type TOtherProps = {
  data: Array<TIngredientsDataWithUUID>;
};


const Other: React.FC<TOtherProps> = ({data}) => {
  return (
    <>
      {data.map((ingredient, index: number) => (
        <Card ingredient={ingredient} key={ingredient.uuid} index={index}/>
      ))}
    </>
  );
};


type TBurgerBunProps = {
  data: TIngredientsData;
};


const BurgerTop: React.FC<TBurgerBunProps> = ({data}) => {
  return (
    <BunTop ingredient={data}/>
  );
};

const BurgerBottom: React.FC<TBurgerBunProps> = ({data}) => {
  return (
    <BunBottom ingredient={data}/>
  );
};


const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(store => store.ingredients);
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const chosenIngredients = useAppSelector(store => store.ingredients.chosenIngredients);
  const chosenBun = useAppSelector(store => store.ingredients.chosenBun)!;
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const auth = useAppSelector(store => store.auth.isAuth)

  const [{isOver}, drop] = useDrop(() => ({
    accept: "mainIngredient",
    drop: (item: { id: string }) => addMain(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addMain = (id: string) => {
    const item = data.ingredients.find((ingredient) => id === ingredient._id)!;
    const itemWithUUID = {...item, uuid: uuidv4()};
    item.type.includes('bun') ? dispatch(addBun(item)) : dispatch(addIngredient(itemWithUUID));
  };

  const mainSum = React.useMemo(() => (Object.keys(chosenIngredients).reduce(
    function (previous, key) {
      previous.price += chosenIngredients[Number(key)].price;
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
    if (auth && Object.keys(chosenBun).length !== 0) {
      dispatch(postOrder(pickedIngredients));
      setIsOpenOrder(true)
    } else if (!auth && Object.keys(chosenBun).length !== 0) {
      navigate(`${loginUrl}`);
    }
  };

  const orderData = useAppSelector(store => store.order);

  return (
    <>
      <section ref={drop} className={`pt-15 ${BurgerConstructorStyles.section}`}>
        {chosenBun.name !== '' ? <BurgerTop data={chosenBun}/> : null}
        <div
          className={chosenIngredients.length > 5 ? `pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.scrollbar}`
            : chosenBun.name !== '' || chosenIngredients.length > 0 ? `pr-4 ${BurgerConstructorStyles.burgerStructure}`
              : `pr-4 ${BurgerConstructorStyles.burgerStructure} ${BurgerConstructorStyles.burgerToConstruct}`}>
          {chosenBun.name !== '' || chosenIngredients.length > 0 ? null :
            <div className={`${BurgerConstructorStyles.burgerToConstructText}`}>Пожалуйста, перенесите сюда
              булку и
              ингредиенты для создания заказа</div>}
          <Other data={chosenIngredients}/>
        </div>
        {chosenBun.name !== '' ? <BurgerBottom data={chosenBun}/> : null}
        <div className={`pt-6 pr-5 ${BurgerConstructorStyles.orderConfirmation}`}>
          <div className={"text text_type_digits-medium"}>
            <span>{chosenBun.name === '' && chosenIngredients.length > 0 ? mainSum : chosenBun.name !== '' || chosenIngredients.length > 0 ? mainSum + bunSum : 0}</span>
            <CurrencyIcon type={"primary"}/>
          </div>
          <Button htmlType="button" type="primary" size="large"
                  onClick={handleOrder} disabled={chosenBun.name === ''}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {orderData.orderCheckoutRequest &&
        <div className={BurgerConstructorStyles.orderLoadingMessage}>Формируем заказ...&#128125;</div>}
      {!orderData.orderCheckoutRequest && isOpenOrder && (
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