import ForgotPasswordFormStyles from "./forgot-password-form.module.css";
import React from "react";
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from 'react-router-dom';
import {checkToken, sendResetPasswordCode} from "../../services/actions";
import {loginUrl, resetPasswordUrl} from "../../utils/constants";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const onClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(sendResetPasswordCode(email, () => navigate(`${resetPasswordUrl}`)));
  }

  return (
    <section className={`${ForgotPasswordFormStyles.container} pb-10`}>

      <h3 className={`${ForgotPasswordFormStyles.heading} text text_type_main-medium pb-6`}>Восстановление
        пароля</h3>
      <form className={ForgotPasswordFormStyles.form}>
        <EmailInput value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder={'Укажите e-mail'}/>
        <Button htmlType="submit" extraClass={ForgotPasswordFormStyles.button}
                onClick={onClick}>Восстановить</Button>
      </form>

      <p className={`${ForgotPasswordFormStyles.text} text text_type_main-default pt-20 pb-30`}>Вспомнили пароль?
        <Link className={ForgotPasswordFormStyles.link} to={loginUrl}>
          <span className={ForgotPasswordFormStyles.linkText}> Войти</span>
        </Link>
      </p>

    </section>
  )
}

export default ForgotPasswordForm;