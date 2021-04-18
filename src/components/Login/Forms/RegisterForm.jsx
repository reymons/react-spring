import styles from './../Login.module.scss';

const RegisterForm = () => {
  return (
    <form>
      <div className={styles.shortInputs}>
        <input type="text" name="name" placeholder="Имя"/>
        <input type="text" name="surname" placeholder="Фамилия"/>
      </div>
      <input type="text" name="phoneNumber" placeholder="Номер телефона"/><br/>
      <input type="email" name="email" placeholder="Почта"/><br/>
      <div className={styles.shortInputs}>
        <input className={styles.shortInput} type="text" name="login" placeholder="Логин"/>
        <input className={styles.shortInput} type="password" name="password" placeholder="Пароль"/>
      </div>
      <div className={styles.btnWrapper}><button className={styles.btn}>Создать</button></div>
    </form>
  )
}

export default RegisterForm;