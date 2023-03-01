import OrderFeedStyles from "./order-feed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {feedPageUrl} from "../../utils/constants";
import BurgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {showOrderInfo} from "../../services/actions";
import PropTypes from "prop-types";

export const FeedCard = ({onClick, order}) => {

  const location = useLocation();
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const ingredientsInOrderIDs = order.ingredients;

  const statusRu = (statusEng) => {
    if (statusEng === 'done')
      return 'Выполнен'
    else if (statusEng === 'pending')
      return 'Готовится'
    else if (statusEng === 'created')
      return 'Создан'
  }

  const timestamp = (dateFromServer) => {
    return <FormattedDate date={new Date(dateFromServer)}/>
  }

  const ingredientsInOrder = ingredients.filter(el => ingredientsInOrderIDs.includes(el._id));
  const bunInOrder = ingredientsInOrder.find(el => el.type === 'bun')
  const otherIngredientsInOrder = ingredientsInOrder.filter(el => el.type !== 'bun')

  function getNumberOfOccurrence(array, value) {
    let count = 0;
    array.forEach((el) => (el === value && count++));
    return count;
  }

  const price = () => {

    const bunPrice = bunInOrder.price * 2;
    const ingredientsPrice = otherIngredientsInOrder.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * getNumberOfOccurrence(ingredientsInOrderIDs, currentValue._id),
      0
    );
    return bunPrice + ingredientsPrice
  }

  let newArray = [];

  for (let i = 0; i <= ingredientsInOrderIDs.length; i++) {
    let ids = [];
    ingredients.forEach(el => {
        if (el.type !== 'bun')
          ids.push(el._id)
      }
    )
    if (ids.includes(ingredientsInOrderIDs[i])) {
      const ing = ingredients.find(el => el._id === ingredientsInOrderIDs[i]);
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
              <div className={OrderFeedStyles.divInitial} key={uuidv4()}>
                <div className={OrderFeedStyles.subDivInitial}>
                  <div className={OrderFeedStyles.circleInitial}></div>
                  <img className={OrderFeedStyles.imageInitial} src={bunInOrder.image} alt={bunInOrder.name}/>
                </div>
              </div>
              {newArray.map(el => {
                return <div className={OrderFeedStyles.div} key={uuidv4()}>
                  <div className={OrderFeedStyles.subDiv}>
                    <div className={OrderFeedStyles.circle}></div>
                    <img className={OrderFeedStyles.image} src={el.image} alt={el.name}/>
                  </div>
                </div>
              })}
            </>
            :
            <>
              <div className={OrderFeedStyles.divInitial} key={uuidv4()}>
                <div className={OrderFeedStyles.subDivInitial}>
                  <div className={OrderFeedStyles.circleInitial}></div>
                  <img className={OrderFeedStyles.imageInitial} src={bunInOrder.image} alt={bunInOrder.name}/>
                </div>
              </div>
              {
                newArray.map((el, index) => {
                  if (index < 4) {
                    return <div className={OrderFeedStyles.div} key={uuidv4()}>
                      <div className={OrderFeedStyles.subDiv}>
                        <div className={OrderFeedStyles.circle}></div>
                        <img className={OrderFeedStyles.image} src={el.image} alt={el.name}/></div>
                    </div>
                  } else if (index === 5) {
                    return (
                      <div className={OrderFeedStyles.divLast} key={uuidv4()}>
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

FeedCard.propTypes = {
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

const FeedCards = ({data, onClick}) => {

  return (
    <>
      {data && data.map((order) => (
        <FeedCard order={order} className={BurgerIngredientsStyles.card} key={uuidv4()} onClick={onClick}/>
      ))}
    </>
  );
};

FeedCards.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export const FeedScroll = ({data, ingredients}) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpen = (e) => {

    const currentOrder = data.find(el => el.number === Number(e.currentTarget.dataset.id));
    localStorage.setItem('order', JSON.stringify(currentOrder));
    localStorage.setItem('data', JSON.stringify(ingredients));

    dispatch(showOrderInfo(currentOrder));
    if (location.state?.feedPage && ingredients !== undefined) {
      navigate(`${feedPageUrl}/${currentOrder.number}`, {
        state: {
          modalOpen: true
        }
      });
    } else {
      navigate(`orders/${currentOrder.number}`, {
        state: {
          modalOpen: true,
          ordersHistoryPage: true
        }
      });
    }

  };

  return (
    <section className={OrderFeedStyles.section}>
      {(location.state?.feedPage || location.pathname === "/feed") || (location.state?.modalOpen && !location.state?.ordersHistoryPage) ?
        <h1 className="pb-1 text text_type_main-large">Лента заказов</h1> : null}
      <div
        className={(location.state?.ordersHistoryPage || location.pathname === "/profile/orders" ? `pr-4 ${OrderFeedStyles.structureOrderHistory} ${OrderFeedStyles.scrollbar}` : `pr-2 ${OrderFeedStyles.structure} ${OrderFeedStyles.scrollbar}`)}>
        <FeedCards data={data} onClick={handleOpen}/>
      </div>
    </section>
  )
}

FeedScroll.propTypes = {
  data: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired
};