import ProfileFormStyles from "./profile-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUser, updateUser} from "../../services/actions";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.getUser.user);

  React.useEffect(() => {
      dispatch(getUser());
      setEmail(user.email);
      setName(user.name);
    },
    [dispatch, user.email, user.name]);

  const [email, setEmail] = React.useState(`${user.email}`);
  const [name, setName] = React.useState(`${user.name}`);
  const [password, setPassword] = React.useState(`iamhappy`);
  const [change, setChange] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const onSave = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, email));
    setChange(false);
    setDisabled(true);
  }

  const onDiscard = (e) => {
    e.preventDefault();
    setEmail(user.email);
    setName(user.name);
    dispatch(getUser());
    setChange(false);
    setDisabled(true);
  }

  return (
    <section>
      <form className={ProfileFormStyles.form}>
        <Input value={name} type="text" onIconClick={() => setDisabled(false)} icon="EditIcon" name={'name'}
               placeholder="Имя" onChange={(e) => {
          setName(e.target.value);
          setChange(true)
        }} disabled={disabled}/>
        <EmailInput value={email} name={'email'} placeholder="Логин" isIcon={true} onChange={(e) => {
          setEmail(e.target.value);
          setChange(true)
        }}/>
        <PasswordInput value={password} icon="EditIcon" name={'password'} placeholder="Пароль" onChange={(e) => {
          setPassword(e.target.value);
          setChange(true)
        }}/>
        {change && (<div className={ProfileFormStyles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onDiscard}>Отмена</Button>
          <Button htmlType="button" type="primary" size="medium" onClick={onSave}>Сохранить</Button>
        </div>)}
      </form>
    </section>
  )
}

export default ProfileForm;