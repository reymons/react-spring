import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { requestCarsBySize } from "../../../redux/reducers/carReducer";
import { getAllCars, isFetching } from "../../../redux/selectors/carSelectors";
import styles from "./Content.module.scss";

const shorten = (description, length = 250) => {
  if (description.length > length) {
    return description.substr(0, length);
  }
  return description;
}

const SIZE = 6;

const Content = ({ cars, isFetching, requestCarsBySize }) => {
  const [carElems, setCarElems] = useState(null);

  useEffect(() => {
    requestCarsBySize(SIZE);
  }, [requestCarsBySize])

  useEffect(() => {
    setCarElems(cars);
  }, [cars])

  const handleLeftArrowClick = () => {
    setCarElems(() => {
      const carData = [...carElems];
      const lastEl = carData.pop();
      carData.unshift(lastEl);

      return carData;
    })
  }

  const handleRightArrowClick = () => {
    if (carElems) {
      setCarElems(() => {
        const carData = [...carElems];
        const firstEl = carData.shift();
        carData.push(firstEl);
  
        return carData;
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.arrow} onClick={handleLeftArrowClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши автомобили</h2>
        <ul className={styles.carList}>
          {
            carElems
              ?.filter((carEl, id) => id < 3)
              .map(car =>
                <li key={car.id} className={styles.carItem}>
                  <div className={styles.carImg} style={{ backgroundImage: `url(${car.image})` }}></div>
                  <h3 className={styles.carModel}>{car.model}</h3>
                  <p className={styles.carDescription}>{shorten(car.description, 200)}</p>
                  <p className={styles.dots}>...</p>
                  <div><NavLink className={styles.carLink} to={`/cars/${car.id}`}>Перейти к авто</NavLink></div>
                </li>
              )
          }
        </ul>
      </div>
      <div className={styles.arrow} onClick={handleRightArrowClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  )
}

export default connect(
  state => ({ 
    cars:  getAllCars(state),
    isFetching: isFetching(state)
  }), 
  { requestCarsBySize }
)(Content);