import { getUserId } from "../../../redux/selectors/authSelectors";
import { getFetchingStatus, getCars } from "../../../redux/selectors/searchSelectors";
import { searchCars, setCars } from "./../../../redux/reducers/searchReducer";
import { makeOrder } from "./../../../redux/reducers/showReducer"
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Order.module.scss";
import { connect } from "react-redux";
import RequestButton from "../../common/RequestButton";
import { isFetching } from "../../../redux/selectors/showSelectors";

const OrderForm = ({ setCars, searchCars, userId, 
  cars, searching, makeOrder, fetchingShow }) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <input className={styles.input} type="text" placeholder="Введите модель авто" {...register("carId")} 
        onChange={searchHandler} autoComplete="off" />
          {
            (cars.length > 0 || searching)
            &&
            <div className={styles.foundCars}>
              {
                searching
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
        <RequestButton className={styles.btn} requestCondition={fetchingShow}>
          Заказать
        </RequestButton>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    searching: getFetchingStatus(state),
    cars: getCars(state),
    userId: getUserId(state),
    fetchingShow: isFetching(state),
  }
}

export default connect(mapStateToProps, { setCars, searchCars, makeOrder })(OrderForm);