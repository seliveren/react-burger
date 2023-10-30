import ResetPasswordFormStyles from "./reset-password-form.module.css";
import React from "react";
import {PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from 'react-router-dom';
import {checkToken, resetPassword} from "../../services/actions";
import {useAppDispatch} from "../../hooks/useAppDispatch";


const ResetPasswordForm = () => {

  const dispatch = useAppDispatch();
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const onClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(resetPassword(password, code));
  }

  return (
    <section className={ResetPasswordFormStyles.container}>

      <h3 className={`${ResetPasswordFormStyles.heading} text text_type_main-medium pt-1 pb-6`}>Восстановление
        пароля</h3>
      <form className={ResetPasswordFormStyles.form}>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder={'Введите новый пароль'}/>
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder={'Введите код из письма'}/>
        <Button htmlType="submit" extraClass={ResetPasswordFormStyles.button} onClick={onClick}>Сохранить</Button>
      </form>

      <p className={`${ResetPasswordFormStyles.text} text text_type_main-default pt-20 pb-20`}>Вспомнили пароль?
        <Link className={ResetPasswordFormStyles.link} to='/login'>
          <span className={ResetPasswordFormStyles.linkText}> Войти</span>
        </Link>
      </p>

    </section>
  )
}

export default ResetPasswordForm;