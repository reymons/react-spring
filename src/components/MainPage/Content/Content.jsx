import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { requestCarsBySize } from "../../../redux/reducers/carReducer";
import { getAllCars } from "../../../redux/selectors/carSelectors";
import styles from "./Content.module.scss";

const datePattern = /^(\d{4}-\d{2}-\d{2}).*$/

const Content = ({ cars, requestCarsBySize }) => {
  useEffect(() => {
    requestCarsBySize(3);
  }, [requestCarsBySize])

  console.log(cars);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши автомобили</h2>
        <ul className={styles.carList}>
          {
            cars?.map(car =>
              <li key={car.id} className={styles.carItem}>
                <div className={styles.carImg} style={{ backgroundImage: `url(${car.image})` }}></div>
                <h3 className={styles.carModel}>{car.model}</h3>
                <p className={styles.carDescription}>{car.description}</p>
                <p className={styles.dots}>...</p>
                <div><NavLink className={styles.carLink} to={`/cars/${car.id}`}>Перейти к авто</NavLink></div>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default connect(
  state => ({ cars:  getAllCars(state) }), 
  { requestCarsBySize }
)(Content);