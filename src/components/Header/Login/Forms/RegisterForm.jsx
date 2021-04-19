import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { registerUser } from '../../../../redux/reducers/authReducer';
import styles from './../Login.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isFetching } from '../../../../redux/selectors/formSelectors';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Необходимо ввести имя")
    .matches(/^([^!@#№$;%^:&?*()_\-+=[\]{}"'|/.,`\s]*)$/, "Спецсимволы запрещены")
    .matches(/^([^0-9]*)$/, "Цифры запрещены")
    .min(1, "Минимальная длина - 1 символ")
    .max(100, "Максимальная длина - 100 символов"),
  surname: yup
    .string()
    .required("Необходимо ввести фамилию")
    .matches(/^([^!@#№$;%^:&?*()_\-+=[\]{}"'|/.,`\s]*)$/, "Спецсимволы запрещены")
    .matches(/^([^0-9]*)$/, "Цифры запрещены")
    .min(1, "Минимальная длина - 1 символ")
    .max(100, "Максимальная длина - 100 символов"),
  email: yup
    .string()
    .email("Название почты должно иметь корректный формат")
    .required("Необходимо ввести почту"),
  phoneNumber: yup
    .string()
    .required("Необходимо ввести номер телефона")
    .matches(/^([^!@#№$;%^:&?*()_\-+=[\]{}"'|/.,`\s]*)$/, "Спецсимволы запрещены")
    .matches(/^([^a-zA-Zа-яА-Я]*)$/, "Буквы запрещены"),
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
    .matches(/^([^!@#№$;%^:&?*()_\-+=[\]{}"'|/.,`\s]*)$/, "Спецсимволы запрещены")
    .matches(/^([^а-яА-Я]*)$/, "Кириллица запрещена")
    .min(4, "Минимальная длина - 4 символа")
    .max(36, "Максимальная длина - 36 символов"),
})

const RegisterForm = ({ registerUser, isFetching }) => {
  const {register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onFormSubmit = (data) => {
    registerUser(data);
  }

  // const normalizePhoneNumber = (e) => {
  //   const regExp = /^\+?\d\s?\(?(\d{3})\)?\s?(\d{3})\s?(\d{2})\s?(\d{2})$/
  //   e.currentTarget.value = e.currentTarget.value.replace(regExp, "+7 ($1) $2-$3-$4");
  // }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.shortInputs}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Имя" { ...register("name") }/>
          <span className={styles.error}>{errors?.name?.message}</span>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Фамилия" { ...register("surname") }/>
          <span className={styles.error}>{errors?.surname?.message}</span>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Номер телефона" { ...register("phoneNumber") }/>
        <span className={styles.error}>{errors?.phoneNumber?.message}</span>
      </div>
      <div className={styles.inputContainer}>
        <input type="email" placeholder="Почта" { ...register("email") }/>
        <span className={styles.error}>{errors?.email?.message}</span>
      </div>
      <div className={styles.shortInputs}>
        <div className={styles.inputContainer}>
          <input className={styles.shortInput} type="text" placeholder="Логин" { ...register("login") }/>
          <span className={styles.error}>{errors?.login?.message}</span>
        </div>
        <div className={styles.inputContainer}>
          <input className={styles.shortInput} type="password" placeholder="Пароль" { ...register("password") }/>
          <span className={styles.error}>{errors?.password?.message}</span>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button 
          className={styles.btn}
          disabled={isFetching}> 
          {isFetching ? <div className={styles.preloader}></div> : "Создать"}
        </button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return { 
    isFetching: isFetching(state)
  }
}

export default connect(mapStateToProps, { registerUser })(RegisterForm);