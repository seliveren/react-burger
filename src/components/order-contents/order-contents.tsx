import React from "react";
import OrderContentsStyles from "./order-contents.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation} from "react-router-dom";
import {checkToken, WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions";
import {getCookie} from "../../utils/util-functions";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {TIngredientsData, TOrderData} from "../../utils/types";


type TOrderCardProps = {
  ingredient: TIngredientsData;
  number: number;
};


const OrderCard: React.FC<TOrderCardProps> = ({ingredient, number}) => {

  return (
    <div className={OrderContentsStyles.card}>
      <div className={OrderContentsStyles.divCircle}>
        <div className={OrderContentsStyles.circle}></div>
        <img className={OrderContentsStyles.image} src={ingredient.image} alt={ingredient.name}/>
      </div>
      <p className={`${OrderContentsStyles.text} text text_type_main-default`}>{ingredient.name}</p>
      <div className={OrderContentsStyles.price}>
        <span
          className="text text_type_digits-default">{ingredient.type === 'bun' ? number + 1 : number} x {ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}


type TOrderCardsProps = {
  data: TOrderData;
};


const OrderCards: React.FC<TOrderCardsProps> = ({data}) => {

  const ingredientsIDs = data.ingredients;
  const ingredients = useAppSelector(store => store.ingredients.ingredients);

  let newArray: Array<TIngredientsData | undefined> = [];

  function getNumberOfOccurrence(array: Array<TIngredientsData | undefined>, value: TIngredientsData) {
    let count = value.type === 'bun' ? 1 : 0;
    if (value.type !== 'bun') {
      array.forEach((el) => (el === value && count++));
    }
    return count;
  }

  for (let i = 0; i <= ingredientsIDs.length; i++) {
    let ids: string[] = [];
    ingredients.forEach(el => {
        ids.push(el._id)
      }
    )
    if (ids.includes(ingredientsIDs[i])) {
      const ing = ingredients.find(el => el._id === ingredientsIDs[i]);
      newArray.push(ing)
    }
  }

  const uniqueArray = newArray.reduce(function (a: any[], b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, [])!;

  return (
    <>
      {uniqueArray.map((el: TIngredientsData, index: number) => (
        <OrderCard ingredient={el} number={getNumberOfOccurrence(newArray, el)} key={index}/>
      ))}
    </>
  );
};


const OrderContents = (): any | JSX.Element => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const token = getCookie('token');

  React.useEffect(
    () => {
      if (location.state?.ordersHistoryPage) {
        dispatch({type: WS_CONNECTION_START, payload: `?token=${token}`});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: `?token=${token}`});
        };
      } else if (location.state?.feedPage) {
        dispatch({type: WS_CONNECTION_START, payload: "/all"});
        return () => {
          dispatch({type: WS_CONNECTION_CLOSED, payload: "/all"});
        };
      }
    },
    [dispatch]
  );

  const orderNumber = location.state?.feedPage || (location.state === null && location.pathname.split('/')[1] === 'feed') ? location.pathname.split('/')[2] : location.pathname.split('/')[3];
  const orders = useAppSelector(store => store.ws.data)
  const order = orders.find(el => Number(el.number) === Number(orderNumber))!;

  const statusRu = (statusEng: string) => {
    if (statusEng === 'done')
      return 'Выполнен'
    else if (statusEng === 'pending')
      return 'Готовится'
    else if (statusEng === 'created')
      return 'Создан'
  }

  const timestamp = (dateFromServer: Date) => {
    return <FormattedDate date={new Date(dateFromServer)}/>
  }

  const ingredients = useAppSelector(store => store.ingredients);
  const ingredientsIDs: string[] = order.ingredients;
  const ingredientsInOrder = ingredients.ingredients.filter(el => ingredientsIDs.includes(el._id));
  const bunInOrder = ingredientsInOrder.find(el => el.type === 'bun')!
  const otherIngredientsInOrder = ingredientsInOrder.filter(el => el.type !== 'bun')

  function getNumberOfOccurrence(array: string[], value: string) {
    let count = 0;
    array.forEach((el) => (el === value && count++));
    return count;
  }

  const price = () => {
    const bunPrice = bunInOrder.price * 2;
    const ingredientsPrice = otherIngredientsInOrder.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * getNumberOfOccurrence(ingredientsIDs, currentValue._id),
      0
    );
    return bunPrice + ingredientsPrice
  }

  return (
    ingredients.ingredients.length &&
    orders.length &&
    <div className={`${OrderContentsStyles.container} pb-20`}>
      <h1 className={`${OrderContentsStyles.headingMain} text text_type_digits-default pb-10`}>#{order.number}</h1>
      <h2 className={`${OrderContentsStyles.headingName} text text_type_main-medium pb-3`}>{order.name}</h2>
      <p className={`${OrderContentsStyles.status} text text_type_main-default pb-15`}>{statusRu(order.status)}</p>
      <h3 className={`${OrderContentsStyles.headingContents} text text_type_main-medium pb-6`}>Состав:</h3>
      <div
        className={(order.ingredients.length > 3 ? `${OrderContentsStyles.subcontainer} ${OrderContentsStyles.scrollbar} mb-10 pt-1 pl-1 pb-1` : `${OrderContentsStyles.subcontainer} mb-10 pt-1 pl-1 pb-1`)}>
        <OrderCards data={order}/>
      </div>
      <div className={OrderContentsStyles.additionalInfo}>
        <span className="text text_type_main-default text_color_inactive">{timestamp(order.createdAt)}</span>
        <div className={OrderContentsStyles.price}>
          <span className="text text_type_digits-default">{price()}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}

export default OrderContents;