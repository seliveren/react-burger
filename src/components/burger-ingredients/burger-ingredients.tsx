import React, {MouseEventHandler} from "react";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import {setCurrentTab, showIngredientInfo, increaseCounter} from "../../services/actions";
import {useDrag} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {ingredientsUrl} from "../../utils/constants";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {TIngredientsData} from "../../utils/types";


type TCategoriesProps = {
  refOne: React.RefObject<HTMLDivElement>;
  refTwo: React.RefObject<HTMLDivElement>;
  refThree: React.RefObject<HTMLDivElement>;
};


const Categories: React.FC<TCategoriesProps> = ({refOne, refTwo, refThree}) => {

  const currentTab = useAppSelector(store => store.tab.currentTab);
  const dispatch = useAppDispatch();

  const handleScrollOnClick = (ref: HTMLDivElement) => {
    ref.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  };

  return (
    <div className={BurgerIngredientsStyles.categories}>
      <Tab value="one" active={currentTab === 'one'} onClick={(e) => {
        dispatch(setCurrentTab('one'))
        handleScrollOnClick(refOne.current!)
      }}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === 'two'} onClick={(e) => {
        dispatch(setCurrentTab('two'))
        handleScrollOnClick(refTwo.current!)
      }}>
        Соусы
      </Tab>
      <Tab value="three" active={currentTab === 'three'} onClick={(e) => {
        dispatch(setCurrentTab('three'))
        handleScrollOnClick(refThree.current!)
      }}>
        Начинки
      </Tab>
    </div>
  )
};


type TCardProps = {
  ingredient: TIngredientsData;
  className: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  index: number;
};


const Card: React.FC<TCardProps> = ({ingredient, className, onClick, index}) => {

  const dispatch = useAppDispatch();
  const qty = useAppSelector(store => store.quantities);
  const chosenBun = useAppSelector(store => store.ingredients.chosenBun)!;

  const [{isDragging}, drag] = useDrag(() => ({
    type: "mainIngredient",
    item: {id: ingredient._id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  const currentCountEntries = Object.entries(qty);
  let currentCount = 0;
  currentCountEntries.forEach(([key, value]) => {
    if (key === ingredient._id) {
      currentCount = value;
    }
  });

  return (
    <>
      <div className={className} onClick={onClick} data-id={ingredient._id} onDragEnd={() => {
        dispatch(increaseCounter(ingredient._id, index))
      }}>
        {ingredient.type === 'bun' && ingredient._id === chosenBun._id ?
          <Counter count={2} size="default"/> : (currentCount !== 0 && ingredient.type !== 'bun' ?
            <Counter count={currentCount} size="default"/> : null)}
        <img ref={drag} src={ingredient.image} alt={ingredient.name}/>
        <div className={BurgerIngredientsStyles.priceTag}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type={"primary"}/>
        </div>
        <h3
          className={`text text_type_main-default m-0 ${BurgerIngredientsStyles.ingredientName}`}>{ingredient.name}</h3>
      </div>
    </>
  );
};


type TIngredientsProps = {
  data: Array<TIngredientsData>;
  onClick: MouseEventHandler<HTMLDivElement>;
};


const Buns: React.FC<TIngredientsProps> = ({data, onClick}) => {
  const bunIngredients = React.useMemo(() => data.filter(bun => bun.type.includes('bun')), [data]);
  return (
    <>
      {bunIngredients.map((ingredient, index) => (
        <Card ingredient={ingredient} index={index} className={BurgerIngredientsStyles.card}
              key={ingredient._id} onClick={onClick}/>
      ))}
    </>
  );
};


const Sauces: React.FC<TIngredientsProps> = ({data, onClick}) => {
  const sauceIngredients = React.useMemo(() => data.filter(sauce => sauce.type.includes('sauce')), [data]);
  return (
    <>
      {sauceIngredients.map((ingredient, index) => (
        <Card ingredient={ingredient} className={BurgerIngredientsStyles.card} index={index}
              key={ingredient._id}
              onClick={onClick}/>
      ))}
    </>
  );
};


const Filling: React.FC<TIngredientsProps> = ({data, onClick}) => {
  const fillingIngredients = React.useMemo(() => data.filter(filling => filling.type.includes('main')), [data]);
  return (
    <>
      {fillingIngredients.map((ingredient, index) => (
        <Card ingredient={ingredient} className={BurgerIngredientsStyles.card} index={index}
              key={ingredient._id}
              onClick={onClick}/>
      ))}
    </>
  );
};


const BurgerIngredients = () => {

  const dispatch = useAppDispatch();
  const data = useAppSelector(store => store.ingredients)!;
  const currentTab = useAppSelector(store => store.tab.currentTab);
  const navigate = useNavigate();
  const location = useLocation();

  const handleShownIngredient = (e: React.MouseEvent<HTMLElement>) => {
    const currentIngredient = data.ingredients.find(el => el._id === e.currentTarget.dataset.id)!;
    dispatch(showIngredientInfo(currentIngredient));
    navigate(`${ingredientsUrl}/${currentIngredient._id}`, {
      state: {
        modalOpen: true,
        background: location
      }
    });
  };

  const ref: React.RefObject<HTMLDivElement> = React.createRef();
  const [top, setTop] = React.useState(0);

  const firstRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const thirdRef = React.useRef(null);

  function handleScroll() {
    if (firstRef.current != null && secondRef.current != null && thirdRef.current != null && ref.current != null) {
      const refOneHeight: number = firstRef.current['scrollHeight'];
      const refTwoHeight: number = secondRef.current['scrollHeight'];
      const refThreeHeight: number = thirdRef.current['scrollHeight'];
      const scrollTop = ref.current.scrollTop;
      setTop(scrollTop);


      if (currentTab !== 'one' && scrollTop <= refOneHeight) {
        dispatch(setCurrentTab('one'))
      } else if (currentTab !== 'two' && scrollTop > refOneHeight + 24 && scrollTop <= refTwoHeight) {
        dispatch(setCurrentTab('two'))
      } else if (currentTab !== 'three' && scrollTop > refTwoHeight && scrollTop <= refThreeHeight) {
        dispatch(setCurrentTab('three'))
      }
    }
  }

  return (
    <section className={`pr-5 ${BurgerIngredientsStyles.section}`}>
      <h1 className={"text text_type_main-large pb-5 m-0"}>Соберите бургер</h1>
      <Categories refOne={firstRef} refTwo={secondRef} refThree={thirdRef}/>
      <div ref={ref} className={`mt-10 ${BurgerIngredientsStyles.scrollbar}`} onScroll={() => handleScroll()}>
        <div id={'buns'} ref={firstRef}>
          <h2 className={"text text_type_main-medium pt-0 pl-0 pr-0 pb-6 m-0"}>Булки</h2>
          <div className={`pb-6 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
            <Buns data={data.ingredients} onClick={handleShownIngredient}/>
          </div>
        </div>
        <div id={'sauces'} ref={secondRef}>
          <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Соусы</h2>
          <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
            <Sauces data={data.ingredients} onClick={handleShownIngredient}/>
          </div>
        </div>
        <div id={'main'} ref={thirdRef}>
          <h2 className={"text text_type_main-medium pt-10 pl-0 pr-0 pb-6 m-0"}>Начинки</h2>
          <div className={`pb-7 pl-6 pr-4 ${BurgerIngredientsStyles.ingredients}`}>
            <Filling data={data.ingredients} onClick={handleShownIngredient}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;