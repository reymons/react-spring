import styles from './../Login.module.scss';

const LoginForm = () => {
  return (
    <form>
      <input type="text" name="login" placeholder="Логин"/>
      <input type="password" name="password" placeholder="Пароль"/>
      <div className={styles.btnWrapper}><button className={styles.btn}>Войти</button></div>
    </form>
  )
}

export default LoginForm;