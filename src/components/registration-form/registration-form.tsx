import RegistrationStyles from "./registration-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {checkToken, registerNewUser} from "../../services/actions";
import {homeUrl, loginUrl} from "../../utils/constants";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(registerNewUser(name, email, password, () => navigate(`${homeUrl}`, {state: {homePage: true}})));
  }

  return (
    <section className={RegistrationStyles.container}>

      <h3 className={`${RegistrationStyles.heading} text text_type_main-medium pt-3 pb-6`}>Регистрация</h3>
      <form onSubmit={onSubmit} className={RegistrationStyles.form}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Имя'}/>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button htmlType="submit" extraClass={RegistrationStyles.button}>Зарегистрироваться</Button>
      </form>

      <p className={`${RegistrationStyles.text} text text_type_main-default pt-20`}>
        Уже зарегистрированы?
        <Link className={RegistrationStyles.link} to={loginUrl}>
          <span> Войти</span>
        </Link>
      </p>

    </section>
  )
}

export default RegistrationForm;