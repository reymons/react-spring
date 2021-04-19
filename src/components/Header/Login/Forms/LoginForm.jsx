import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { logIn } from '../../../../redux/reducers/authReducer';
import styles from './../Login.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { isAuthForm, isFetching } from '../../../../redux/selectors/formSelectors';

const schema = yup.object().shape({
  login: yup
    .string()
    .required("Необходимо ввести логин")
    .matches(/^([^!@#№$;%^:&?*()_\-+=[\]{}"'|/.,`\s]*)$/, "Спецсимволы запрещены")
    .matches(/^(\w+.)$/, "В начале должна идти хотя бы одна буква")
    .min(4, "Минимальная длина - 4 символа")
    .max(24, "Максимальная длина - 24 символа"),
  password: yup
    .string()
    .required("Необходимо ввести пароль")
})

const LoginForm = ({ isAuthForm, logIn, isFetching }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onFormSubmit = (data) => {
    logIn(data);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Логин" { ...register("login") }/>
        <span className={styles.error}>{errors?.login?.message}</span>
      </div>      
      <div className={styles.inputContainer}>
        <input type="password" placeholder="Пароль" { ...register("password") }/>
        <span className={styles.error}>{errors?.password?.message}</span>
      </div>
      <div className={styles.btnWrapper}>
        <button 
          className={styles.btn} 
          disabled={isFetching}> 
          {isFetching ? <div className={styles.preloader}></div> : "Войти"}
        </button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return { 
    isAuthForm: isAuthForm(state),
    isFetching: isFetching(state)
  }
}

export default connect(mapStateToProps, { logIn })(LoginForm);