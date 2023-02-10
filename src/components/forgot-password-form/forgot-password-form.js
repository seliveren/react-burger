import ForgotPasswordFormStyles from "./forgot-password-form.module.css";
import React from "react";
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {sendResetPasswordCode} from "../../services/actions";


const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [navigate, setNavigate] = React.useState(false);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordCode(email));
    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to="/reset-password"/>
  }

  return (
    <section className={`${ForgotPasswordFormStyles.container} pb-10`}>

      <h3 className={`${ForgotPasswordFormStyles.heading} text text_type_main-medium pb-6`}>Восстановление пароля</h3>
      <form className={ForgotPasswordFormStyles.form}>
        <EmailInput value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder={'Укажите e-mail'}/>
        <Button htmlType="submit" extraClass={ForgotPasswordFormStyles.button} onClick={onClick}>Восстановить</Button>
      </form>

      <p className={`${ForgotPasswordFormStyles.text} text text_type_main-default pt-20 pb-30`}>Вспомнили пароль?
        <Link className={ForgotPasswordFormStyles.link} to='/login'>
          <span className={ForgotPasswordFormStyles.linkText}> Войти</span>
        </Link>
      </p>

    </section>
  )
}

export default ForgotPasswordForm;