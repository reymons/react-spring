import { NavLink } from 'react-router-dom';
import MainContent from './MainContent/MainContent';
import styles from './ManagePage.module.scss';

const ManagePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <nav className={styles.nav}>
            <div className={styles.navItem}>
              <NavLink to="/manage/cars" className={styles.navLink} activeClassName={styles.activeLink}>
                Машины
              </NavLink>
            </div>
            <div className={styles.navItem}>
              <NavLink to="/manage/users" className={styles.navLink} activeClassName={styles.activeLink}>
                Пользователи
              </NavLink>
            </div>
            <div className={styles.navItem}>
              <NavLink to="/manage/orders" className={styles.navLink} activeClassName={styles.activeLink}>
                Заказы
              </NavLink>
            </div>
            <div className={styles.navItem}>
              <NavLink to="/manage/support" className={styles.navLink} activeClassName={styles.activeLink}>
                Поддержка
              </NavLink>
            </div>
          </nav>
        </div>
        <MainContent/>
      </div>
    </div>
  )
}

export default ManagePage;