import { useState } from 'react';
import styles from './Login.module.scss';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.header}>
        <p className={styles.headerBtn} onClick={() => setIsLogin(true)} style={{ 
          backgroundColor: isLogin ? '#fff' : '#f0f0f0'
        }}>
          Вход
        </p>
        <p className={styles.headerBtn} onClick={() => setIsLogin(false)} style={{ 
          backgroundColor: !isLogin ? '#fff' : '#f0f0f0'
        }}>
          Регистрация
        </p>
      </div>
      {
        isLogin
        ?
        <div>

        </div>
        :
        <div>

        </div>
      }
    </div>
  )
}

export default Login;