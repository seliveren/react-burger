import LoginStyles from "./login-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {checkToken, requestAuth} from "../../services/actions";
import {homeUrl, forgotPasswordUrl, registerUrl} from "../../utils/constants";
import {useForm} from "../../hooks/useForm";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const LoginForm = () => {

  const dispatch = useAppDispatch();
  const inputs = useForm({})
  const navigate = useNavigate();
  const [change, setChange] = React.useState(false);

  React.useEffect(() => {
    dispatch(checkToken());
    inputs.setValues({email: '', password: ''});
  }, [dispatch]);

  const onSubmit = (e: { preventDefault: () => void }) => {
    dispatch(requestAuth(inputs.values.email, inputs.values.password, () => navigate(`${homeUrl}`, {state: {homePage: true}})));
    e.preventDefault();
  }

  return (
    <section className={LoginStyles.container}>

      <h3 className={`${LoginStyles.heading} text text_type_main-medium pb-6`}>Вход</h3>
      <form className={LoginStyles.form} onSubmit={onSubmit}>
        <EmailInput value={inputs.values.email || ''} name={'email'} onChange={(e) => {
          inputs.handleChange(e);
          setChange(true)
        }}/>
        <PasswordInput value={inputs.values.password || ''} name={'password'} onChange={(e) => {
          inputs.handleChange(e);
          setChange(true)
        }}/>
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