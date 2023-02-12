import LoginStyles from "./login-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {checkToken, requestAuth} from "../../services/actions";
import {homeUrl, forgotPasswordUrl, registerUrl} from "../../utils/constants";


const LoginForm = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const onSubmit = (e) => {
    dispatch(requestAuth(email, password, () => navigate(`${homeUrl}`, {state: {homePage: true}})));
    e.preventDefault();
  }

  return (
    <section className={LoginStyles.container}>

      <h3 className={`${LoginStyles.heading} text text_type_main-medium pb-6`}>Вход</h3>
      <form className={LoginStyles.form} onSubmit={onSubmit}>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button htmlType="submit" extraClass={LoginStyles.button}>Войти</Button>
      </form>

      <p className={`${LoginStyles.text} text text_type_main-default pt-20`}>Вы — новый пользователь?
        <Link className={LoginStyles.link} to={registerUrl}>
          <span className={LoginStyles.linkText}> Зарегистрироваться</span>
        </Link>
      </p>

      <p className={`${LoginStyles.text} text text_type_main-default pt-4 pb-8`}>
        Забыли пароль?
        <Link className={LoginStyles.link} to={forgotPasswordUrl}>
          <span className={LoginStyles.linkText}> Восстановить пароль</span>
        </Link>
      </p>

    </section>
  )
}

export default LoginForm;