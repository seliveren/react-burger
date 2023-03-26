import OrderFeedStyles from "./order-feed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {feedPageUrl, ordersHistoryUrl} from "../../utils/constants";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import {showOrderInfo} from "../../services/actions";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {TOrderData, TIngredientsData} from "../../utils/types";


type TFeedCardProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  order: TOrderData;
  className?: string;
};


export const FeedCard: React.FC<TFeedCardProps> = ({onClick, order}): any => {

  const location = useLocation();
  const ingredients = useAppSelector(store => store.ingredients.ingredients);

  const ingredientsInOrderIDs: string[] = order.ingredients;

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

  const ingredientsInOrder = ingredients?.filter(el => ingredientsInOrderIDs.includes(el._id));
  const bunInOrder = ingredientsInOrder?.find(el => el.type === 'bun')!
  const otherIngredientsInOrder = ingredientsInOrder?.filter(el => el.type !== 'bun')

  function getNumberOfOccurrence(array: Array<string>, value: string) {
    let count = 0;
    array.forEach((el) => (el === value && count++));
    return count;
  }

  const price = () => {

    const bunPrice = bunInOrder.price * 2;
    const ingredientsPrice = otherIngredientsInOrder?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * getNumberOfOccurrence(ingredientsInOrderIDs, currentValue._id),
      0
    )!;
    return bunPrice + ingredientsPrice
  }

  let newArray: Array<TIngredientsData> = []!;

  for (let i = 0; i <= ingredientsInOrderIDs.length; i++) {
    let ids: string[] = [];
    ingredients?.forEach(el => {
        if (el.type !== 'bun')
          ids.push(el._id)
      }
    )
    if (ids.includes(ingredientsInOrderIDs[i])) {
      const ing = ingredients?.find(el => el._id === ingredientsInOrderIDs[i])!;
      newArray.push(ing)
    }
  }

  const numberOnImg = ingredientsInOrderIDs.length - 5

  return (newArray.length !== 0 && bunInOrder !== undefined &&
    <div onClick={onClick} data-id={order.number}
         className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? `${OrderFeedStyles.containerOrderHistory} pt-6 pb-6 pr-6 pl-6` : `${OrderFeedStyles.container} pt-6 pb-6 pr-6 pl-6`)}>
      <div className={OrderFeedStyles.subcontainer}>
        <span className="text text_type_digits-default">
          {order.number}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {timestamp(order.createdAt)}
        </span>
      </div>
      <h2
        className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? `${OrderFeedStyles.heading} text text_type_main-medium pt-6 pb-2` : `${OrderFeedStyles.heading} text text_type_main-medium pt-6 pb-6`)}>
        {order.name}
      </h2>
      {location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ?
        <p
          className={order.status === 'done' ? `${OrderFeedStyles.statusDone} text text_type_main-default pb-6` : "text text_type_main-default pb-6"}>{statusRu(order.status)}</p> : null}
      <div className={OrderFeedStyles.subcontainer}>
        <div className={OrderFeedStyles.images}>
          {1 + newArray.length <= 6 ?
            <>
              <div className={OrderFeedStyles.divInitial} key={bunInOrder._id}>
                <div className={OrderFeedStyles.subDivInitial}>
                  <div className={OrderFeedStyles.circleInitial}></div>
                  <img className={OrderFeedStyles.imageInitial} src={bunInOrder.image} alt={bunInOrder.name}/>
                </div>
              </div>
              {newArray.map((el: TIngredientsData, index: number) => {
                return <div className={OrderFeedStyles.div} key={index}>
                  <div className={OrderFeedStyles.subDiv}>
                    <div className={OrderFeedStyles.circle}></div>
                    <img className={OrderFeedStyles.image} src={el.image} alt={el.name}/>
                  </div>
                </div>
              })}
            </>
            :
            <>
              <div className={OrderFeedStyles.divInitial} key={bunInOrder._id}>
                <div className={OrderFeedStyles.subDivInitial}>
                  <div className={OrderFeedStyles.circleInitial}></div>
                  <img className={OrderFeedStyles.imageInitial} src={bunInOrder.image} alt={bunInOrder.name}/>
                </div>
              </div>
              {
                newArray.map((el: TIngredientsData, index: number) => {
                  if (index < 4) {
                    return <div className={OrderFeedStyles.div} key={index}>
                      <div className={OrderFeedStyles.subDiv}>
                        <div className={OrderFeedStyles.circle}></div>
                        <img className={OrderFeedStyles.image} src={el.image} alt={el.name}/></div>
                    </div>
                  } else if (index === 5) {
                    return (
                      <div className={OrderFeedStyles.divLast} key={index}>
                        <div className={OrderFeedStyles.subDivLast}>
                          <div className={OrderFeedStyles.circleLast}></div>
                          <img className={OrderFeedStyles.imageLast} src={el.image} alt={el.name}/>
                        </div>
                        <span
                          className={`${OrderFeedStyles.span} text text_type_digits-default`}> +{numberOnImg} </span>
                      </div>
                    )
                  }
                })
              }
            </>
          }
        </div>
        <div className={OrderFeedStyles.price}>
          <span className="text text_type_digits-default">{price()}</span>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}


type TFeedCardsProps = {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  data: Array<TOrderData>;
};


const FeedCards: React.FC<TFeedCardsProps> = ({data, onClick}) => {

  return (
    <>
      {data && data.map((order) => (
        <FeedCard order={order} className={BurgerIngredientsStyles.card} key={order._id} onClick={onClick}/>
      ))}
    </>
  );
};


type TFeedScrollProps = {
  ingredients: Array<TIngredientsData>;
  data: Array<TOrderData>;
};


export const FeedScroll: React.FC<TFeedScrollProps> = ({data, ingredients}) => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {

    const currentOrder = data.find(el => el.number === Number(e.currentTarget.dataset.id))!;
    dispatch(showOrderInfo(currentOrder));
    if (location.state?.feedPage && ingredients !== undefined) {
      navigate(`${feedPageUrl}/${currentOrder.number}`, {
        state: {
          modalOrderOpen: true,
          feedPage: true,
          background: location
        }
      });
    } else if (ingredients !== undefined) {
      navigate(`${ordersHistoryUrl}/${currentOrder.number}`, {
        state: {
          modalOrderHistoryOpen: true,
          background: location,
          ordersHistoryPage: true
        }
      });
    }
  };

  return (
    <section className={OrderFeedStyles.section}>
      {(location.state?.feedPage || location.pathname === "/feed") || (location.state?.modalOrderOpen && !location.state?.ordersHistoryPage) ?
        <h1 className="pb-1 text text_type_main-large">Лента заказов</h1> : null}
      <div
        className={(location.state?.ordersHistoryPage || location.state?.modalOrderHistoryOpen ? `pr-4 ${OrderFeedStyles.structureOrderHistory} ${OrderFeedStyles.scrollbar}` : `pr-2 ${OrderFeedStyles.structure} ${OrderFeedStyles.scrollbar}`)}>
        <FeedCards data={data} onClick={handleOpen}/>
      </div>
    </section>
  )
}

