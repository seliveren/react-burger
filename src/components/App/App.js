import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import AppStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {baseUrl} from "../../utils/constants";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


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
    const getIngredientsData = async () => {
      setState({...state, isLoading: true, hasError: false});
      const res = await fetch(`${baseUrl}`);
      const data = await res.json();
      setState({ingredientsData: data.data, isLoading: false, hasError: false});
    }
    getIngredientsData();
  }, []);

  const {ingredientsData, isLoading, hasError} = state;

  const setModalData = (e) => {
    setSelectedValue(state.ingredientsData.find(bun => bun._id === e.currentTarget.dataset.id));
    setIsOpenInfo(true)
  }


  const escCloseInfo = (e) => {
    if (e.key === "Escape") {
      setIsOpenInfo(false);
    }
  }

  const escCloseOrder = (e) => {
    if (e.key === "Escape") {
      setIsOpenOrder(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keyup', escCloseInfo, false);
    document.addEventListener('keyup', escCloseOrder, false);

    return () => {
      document.removeEventListener('keyup', escCloseInfo, false);
      document.addEventListener('keyup', escCloseOrder, false);
    };
  }, [escCloseInfo, escCloseOrder]);

  const handleCloseInfo = (e) => {
    escCloseInfo(e);
    setIsOpenInfo(false)
  }

  const handleCloseOrder = (e) => {
    escCloseOrder(e);
    setIsOpenOrder(false)
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

            <ModalOverlay open={isOpenOrder} onClose={(e) => handleCloseOrder(e)}/>
            <Modal open={isOpenOrder} onClose={(e) => handleCloseOrder(e)}>
              <OrderDetails/>
            </Modal>


            <ModalOverlay open={isOpenInfo} onClose={(e) => handleCloseInfo(e)}/>
            <Modal open={isOpenInfo} header={'Детали ингредиента'} onClose={(e) => handleCloseInfo(e)}>
              <IngredientDetails ingredient={selectedValue}/>
            </Modal>
          </main>
        </>}
    </>
  );
}

export default App;