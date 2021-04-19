import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { logIn } from '../../../redux/reducers/authReducer';
import styles from './../Login.module.scss';

const LoginForm = ({ logIn, closeForm }) => {
  //const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const form = useForm();
  const { register, handleSubmit, reset, formState: { errors } } = form;

  useEffect(() => {
    console.log(form);
  })

  const onFormSubmit = (data) => {
    logIn(data);
    closeForm();
    setTimeout(reset, 1000);
  }
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input type="text" placeholder="Логин" { ...register("login", { required: true }) }/>
      { errors.login && <span className={styles.error}>Это поле обязательно</span> }
      <input type="password" placeholder="Пароль" { ...register("password", { required: true }) }/>
      { errors.password && <span className={styles.error}>Это поле обязательно</span> }
      <div className={styles.btnWrapper}>
        <button className={styles.btn}>Войти</button>
      </div>
    </form>
  )
}

export default connect(() => ({}), { logIn })(LoginForm);