import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { getUserId, isAuth } from "../../../redux/selectors/authSelectors";
import { getFetchingStatus, getCars } from "../../../redux/selectors/searchSelectors";
import { isFetched, isFetching } from "../../../redux/selectors/showSelectors";
import { searchCars, setCars } from "./../../../redux/reducers/searchReducer";
import { makeOrder } from "./../../../redux/reducers/showReducer";
import styles from "./Order.module.scss";

const Order = ({ isAuth, fetching, cars, searchCars, setCars, userId, fetched, makeOrder, fetchingShow }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [carId, setCarId] = useState(null);

  const searchHandler = (e) => {
    const value = e.currentTarget.value;
    if (value === "") {
      setCars([]);
      return;
    }
    searchCars(e.currentTarget.value);
  }

  const carClickHandler = (carId, e) => {
    setCarId(carId);
    setValue("carId", e.currentTarget.innerText);
    setCars([]);
  }

  const onSubmit = (data) => {
    makeOrder(carId, userId, data.date);
  }

  return (
    <>
    {
      isAuth
      ? <div className={styles.wrapper}>
          <div className={styles.container}>
            <h3 className={styles.title}>Заказать просмотр авто</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputWrapper}>
                <input className={styles.input} type="text" placeholder="Введите модель авто" {...register("carId")} 
                onChange={searchHandler} autoComplete="off" />
                  {
                    (cars.length > 0 || fetching)
                    &&
                    <div className={styles.foundCars}>
                      {
                        fetching
                        ? <div className={styles.fetch}></div>
                        : <ul className={styles.carList}>
                            {cars.map(car => 
                              <li className={styles.car} key={car.id} onClick={(e) => carClickHandler(car.id, e)}>
                                {car.model}
                              </li>
                            )}
                          </ul>
                      }
                    </div>
                  }
              </div>
              <div className={styles.inputWrapper}>
                <input className={styles.input} type="date" placeholder="Выберите дату" { ...register("date") }/>
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.btn} disabled={fetchingShow}>
                  Заказать
                </button>
              </div>
            </form>
          </div>
          {
            fetched &&
            <div>Вы успешно оформили заказ!</div>
          }
        </div>
      : <></>
    }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: isAuth(state),
    fetching: getFetchingStatus(state),
    cars: getCars(state),
    userId: getUserId(state),
    fetchingShow: isFetching(state),
    fetched: isFetched(state)
  }
}

export default connect(mapStateToProps, { searchCars, setCars, makeOrder })(Order);