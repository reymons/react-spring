import { useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { getLogin, isAuth } from "../../redux/selectors/authSelectors";
import styles from "./Header.module.scss";

const Header = ({ isAuth, login }) => {
  const menuLine = useRef();
  const list = useRef();

  const toggleMenu = () => {
    menuLine.current.classList.toggle(styles.active);
    list.current.classList.toggle(styles.active);
  }

  return (
    <header className={styles.header}>
      <div className={styles.menuLineWrapper} onClick={toggleMenu}><div className={styles.menuLine} ref={menuLine}></div></div>
      <ul className={styles.list} ref={list}>
        <li className={styles.listItem}><NavLink className={styles.link} to="/">Главная</NavLink></li>
        <li className={styles.listItem}><a className={styles.link} href="#anchor">Заказать</a></li>
        <li className={styles.listItem}><NavLink className={styles.link} to="/cars">Список авто</NavLink></li>
        <li className={styles.listItem}><NavLink className={styles.link} to="/support">Поддержка</NavLink></li>
      </ul>
      {
        isAuth
        ? <NavLink className={styles.link} to="/profile">{login}</NavLink>
        : <a className={styles.link} href="#anchor">Войти</a>
      }
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
    login: getLogin(state)
  }
}

export default connect(mapStateToProps)(Header);