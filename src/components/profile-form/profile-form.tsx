import ProfileFormStyles from "./profile-form.module.css";
import React from "react";
import {PasswordInput, EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {checkToken, getUser, updateUser} from "../../services/actions";
import {useForm} from "../../hooks/useForm";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";


const ProfileForm = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.getUser.user)!;

  React.useEffect(() => {
      dispatch(getUser());
      dispatch(checkToken());
      inputs.setValues({name: user.name, email: user.email, password: ''});
    },
    [dispatch, user.email, user.name]);

  const inputs = useForm({})
  const [change, setChange] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(updateUser(inputs.values.name, inputs.values.email));
    setChange(false);
    setDisabled(true);
  }

  const onDiscard = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    inputs.setValues({name: user.name, email: user.email, password: ''});
    dispatch(getUser());
    setChange(false);
    setDisabled(true);
  }

  return (
    <section>
      <form onSubmit={onSubmit} className={ProfileFormStyles.form}>
        <Input value={inputs.values.name || ''} type="text" onIconClick={() => setDisabled(false)} icon="EditIcon"
               name={'name'}
               placeholder="Имя" onChange={(e) => {
          inputs.handleChange(e);
          setChange(true)
        }} disabled={disabled}/>
        <EmailInput value={inputs.values.email || ''} name={'email'} placeholder="Логин" isIcon={true}
                    onChange={(e) => {
                      inputs.handleChange(e);
                      setChange(true)
                    }}/>
        <PasswordInput value={inputs.values.password || ''} icon="EditIcon" name={'password'} placeholder="Пароль"
                       onChange={(e) => {
                         inputs.handleChange(e);
                         setChange(true)
                       }}/>
        {change && (<div className={ProfileFormStyles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onDiscard}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>)}
      </form>
    </section>
  )
}

export default ProfileForm;