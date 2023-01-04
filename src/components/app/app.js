import React from "react";
import AppHeader from "../app-header/app-header";
import AppStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {baseUrl} from "../../utils/constants";
import {DataContext} from "../../services/burger-context"
import {request} from "../../utils/server-interaction";


const App = () => {

  const firstRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const thirdRef = React.useRef(null);

  const [state, setState] = React.useState({
    ingredientsData: [],
    isLoading: false,
    hasError: false
  })
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  React.useEffect(() => {
    const getIngredientsData = () => {
      setState({...state, isLoading: true, hasError: false});
      request(`${baseUrl}/ingredients`)
        .then((res) => {
          setState({ingredientsData: res.data, isLoading: false, hasError: false});
        })
        .catch(() => {
          setState({...state, hasError: true});
        })
    }
    getIngredientsData();
  }, []);


  const setModalData = (e) => {
    setSelectedValue(state.ingredientsData.find(el => el._id === e.currentTarget.dataset.id));
    setIsOpenInfo(true)
  }


  return (
    <DataContext.Provider value={[state, setState]}>
      {state.isLoading &&
        <div className={AppStyles.loadingMessage}>Настройка связи с космосом...&#128125;</div>}
      {state.hasError && <div className={AppStyles.errorMessage}>Связь с космосом нарушена!&#128165;</div>}
      {!state.isLoading &&
        !state.hasError &&
        state.ingredientsData.length &&
        <>
          <AppHeader/>
          <main className={AppStyles.main}>

            <BurgerIngredients refOne={firstRef} refTwo={secondRef} refThree={thirdRef} onClick={(e) => {
              setModalData(e);
            }}/>

            <BurgerConstructor/>

            {isOpenInfo && (
              <Modal onClose={() => setIsOpenInfo(false)} header={'Детали ингредиента'}>
                <IngredientDetails ingredient={selectedValue}/>
              </Modal>
            )}

          </main>
        </>}
    </DataContext.Provider>
  );
}

export default App;