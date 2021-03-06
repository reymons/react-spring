import { useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { logOut } from "../../redux/reducers/authReducer";
import { isAuth } from "../../redux/selectors/authSelectors";
import Login from "./Login/Login";
import AuthMenu from "./AuthMenu";
import styles from "./Header.module.scss";
import { toggleAuthForm } from "../../redux/reducers/formReducer";
import { isAuthForm } from "../../redux/selectors/formSelectors";

const Header = ({ isAuth, toggleAuthForm, isAuthForm }) => {
  const menuLine = useRef();
  const list = useRef();
  const body = useRef(document.body);

  const toggleMenu = () => {
    menuLine.current.classList.toggle(styles.active);
    list.current.classList.toggle(styles.active);
  }

  const openForm = () => {
    toggleAuthForm(true);
    body.current.style.overflow = "hidden";
  }

  const closeForm = () => {
    toggleAuthForm(false);
    body.current.style.overflow = "auto";
  }

  return (
    <>
      { isAuthForm && <Login closeForm={closeForm}/>}
      <header className={styles.header}>
        <div className={styles.menuLineWrapper} onClick={toggleMenu}>
          <div className={styles.menuLine} ref={menuLine}></div>
        </div>
        <ul className={styles.list} ref={list}>
          <li className={styles.listItem}><NavLink className={styles.link} to="/">Главная</NavLink></li>
          <li className={styles.listItem}><a className={styles.link} href="#anchor">Заказать</a></li>
          <li className={styles.listItem}><NavLink className={styles.link} to="/cars">Список авто</NavLink></li>
          <li className={styles.listItem}><NavLink className={styles.link} to="/support">Поддержка</NavLink></li>
        </ul>
        {
          isAuth
          ? <AuthMenu/>
          : <span className={styles.link} onClick={openForm}>Войти</span>
        }
      </header>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
    isAuthForm: isAuthForm(state)
  }
}

export default connect(mapStateToProps, { logOut, toggleAuthForm })(Header);