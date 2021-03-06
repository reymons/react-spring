import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../redux/reducers/authReducer';
import { allowed, getLogin } from '../../redux/selectors/authSelectors';
import styles from './Header.module.scss';

const AuthMenu = ({ login, logOut, allowed }) => {
  const [authMenu, setAuthMenu] = useState(false);
  const mouseOnAuthMenu = useRef(false);

  const openAuthMenu = () => {
    setAuthMenu(true);
    mouseOnAuthMenu.current = true;
  }

  const closeAuthMenu = () => {
    setAuthMenu(false);
    mouseOnAuthMenu.current = false;
  }

  const handleMouseLeave = () => {
    // I don't like this solution, but it was the fastest one
    setTimeout(() => {
      !mouseOnAuthMenu.current && closeAuthMenu()
    }, 500)
  }

  return (
    <>
      <span className={styles.link} onMouseEnter={() => setAuthMenu(true)} 
        onMouseLeave={handleMouseLeave}>{login}</span>
      <div className={styles.authMenu} style={{
        visibility: authMenu ? "visible" : "hidden",
        opacity: authMenu ? "1" : "0"
      }} 
        onMouseEnter={openAuthMenu} onMouseLeave={closeAuthMenu}>
        <ul className={styles.authList}>
          <li className={styles.authItem}>
            <NavLink className={`${styles.link} ${styles.authLink}`} to="/profile">
              Мой профиль
            </NavLink>
          </li>
        {
          allowed &&
          <li className={styles.authItem}>
            <NavLink className={`${styles.link} ${styles.authLink}`} to="/manage">
              Управление сайтом
            </NavLink>
          </li>
        }
          <li className={styles.authItem}>
            <NavLink className={`${styles.link} ${styles.authLink}`} to="/" onClick={logOut}>
              Выйти
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    login: getLogin(state),
    allowed: allowed(state)
  }
}

export default connect(mapStateToProps, { logOut })(AuthMenu);