import RegistrationStyles from "./registration-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {registerNewUser} from "../../services/actions";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [navigate, setNavigate] = React.useState(false);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(registerNewUser(name, email, password));
    console.log(`${name}, ${email}, ${password}`)
    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to="/"/>
  }

  return (
    <section className={RegistrationStyles.container}>

      <h3 className={`${RegistrationStyles.heading} text text_type_main-medium pt-3 pb-6`}>Регистрация</h3>
      <form className={RegistrationStyles.form}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={'Имя'}/>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button htmlType="submit" onClick={onClick} extraClass={RegistrationStyles.button}>Зарегистрироваться</Button>
      </form>

      <p className={`${RegistrationStyles.text} text text_type_main-default pt-20`}>
        Уже зарегистрированы?
        <Link className={RegistrationStyles.link} to='/login'>
          <span> Войти</span>
        </Link>
      </p>

    </section>
  )
}

export default RegistrationForm;