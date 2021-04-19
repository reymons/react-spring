import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/reducers/authReducer';
import styles from './../Login.module.scss';

const RegisterForm = ({ registerUser, closeForm }) => {
  const {register, handleSubmit, reset } = useForm();

  const onFormSubmit = (data) => {
    registerUser(data);
    closeForm();
    setTimeout(reset, 1000);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.shortInputs}>
        <input type="text" placeholder="Имя" { ...register("name") }/>
        <input type="text" placeholder="Фамилия" { ...register("surname") }/>
      </div>
      <input type="text" placeholder="Номер телефона" { ...register("phoneNumber") }/><br/>
      <input type="email" placeholder="Почта" { ...register("email") }/><br/>
      <div className={styles.shortInputs}>
        <input className={styles.shortInput} type="text" placeholder="Логин" { ...register("login") }/>
        <input className={styles.shortInput} type="password" placeholder="Пароль" { ...register("password") }/>
      </div>
      <div className={styles.btnWrapper}><button className={styles.btn} type="submit">Создать</button></div>
    </form>
  )
}

export default connect(() => ({}), { registerUser })(RegisterForm);