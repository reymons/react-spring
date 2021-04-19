import { useState } from 'react';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import styles from './Login.module.scss';

const Login = ({ isFormOpen, closeForm }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.wrapper} onClick={closeForm} style={{
      visibility: isFormOpen ? "visible" : "hidden",
      backgroundColor: isFormOpen ? "rgba(0, 0, 0, 0.774)" : "transparent",
      opacity: isFormOpen ? "1" : "0"
    }}>
      <div className={styles.containerWrapper} onClick={(e) => e.stopPropagation()}>
        <svg display="none">
          <symbol viewBox="0 0 512.001 512.001" id="cancelIcon">
            <g>
              <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                L284.286,256.002z"/>
            </g>
          </symbol>
        </svg>
        <svg className ={styles.cancelIcon} onClick={closeForm}>
          <use xlinkHref="#cancelIcon"></use>
        </svg>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.headerBtn} onClick={() => setIsLogin(true)} 
              style={{ backgroundColor: isLogin ? '#fff' : '#f0f0f0'}}>
              Вход
            </p>
            <p className={styles.headerBtn} onClick={() => setIsLogin(false)} 
              style={{ backgroundColor: !isLogin ? '#fff' : '#f0f0f0'}}>
              Регистрация
            </p>
          </div>
          {
            isLogin
            ?
            <div className={`${styles.form} ${styles.loggingIn}`}>
              <LoginForm closeForm={closeForm}/>
            </div>
            :
            <div className={`${styles.form} ${styles.registration}`}>
              <RegisterForm closeForm={closeForm}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;