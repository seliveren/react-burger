import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {baseUrl} from "../../utils/constants";


const App = () => {
  const [state, setState] = React.useState({
    ingredientsData: [],
    isLoading: false,
    hasError: false
  })
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  React.useEffect(() => {
    const getIngredientsData = () => {
      setState({...state, isLoading: true, hasError: false});
      fetch(`${baseUrl}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
          setState({ingredientsData: res.data, isLoading: false, hasError: false});
        })
        .catch((error) => {
          setState({...state, hasError: true});
        })
    }
    getIngredientsData();
  }, []);

  const {ingredientsData, isLoading, hasError} = state;

  const setModalData = (e) => {
    setSelectedValue(state.ingredientsData.find(bun => bun._id === e.currentTarget.dataset.id));
    setIsOpenInfo(true)
  }

  return (
    <>
      {state.isLoading &&
        <div className={AppStyles.loadingMessage}>Настройка связи с космосом...&#128125;</div>}
      {state.hasError && <div className={AppStyles.errorMessage}>Связь с космосом нарушена!&#128165;</div>}
      {!state.isLoading &&
        !state.hasError &&
        state.ingredientsData.length &&
        <>
          <AppHeader/>
          <main className={AppStyles.main}>

            <BurgerIngredients data={state.ingredientsData} onClick={(e) => {
              setModalData(e);
            }}/>
            <BurgerConstructor data={state.ingredientsData} onClick={() => setIsOpenOrder(true)}/>

            {isOpenOrder && (
              <Modal onClose={() => setIsOpenOrder(false)}>
                <OrderDetails/>
              </Modal>
            )}

            {isOpenInfo && (
              <Modal onClose={() => setIsOpenInfo(false)} header={'Детали ингредиента'}>
                <IngredientDetails ingredient={selectedValue}/>
              </Modal>
            )}

          </main>
        </>}
    </>
  );
}

export default App;