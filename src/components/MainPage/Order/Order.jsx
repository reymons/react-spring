import { useSelector } from "react-redux";
import { isAuth } from "../../../redux/selectors/authSelectors";
import { getErrorMsg } from "../../../redux/selectors/searchSelectors";
import { isFetched } from "../../../redux/selectors/showSelectors";
import styles from "./Order.module.scss";
import OrderForm from "./OrderForm";

const Order = () => {
  const authorized = useSelector(isAuth);
  const fetchedShow = useSelector(isFetched);
  const errorMsg = useSelector(getErrorMsg);

  return (
    <>
    {
      authorized
      ? <div className={styles.wrapper}>
          <div className={styles.container}>
            <h3 className={styles.title}>Заказать просмотр авто</h3>
            <OrderForm/>
            { 
              fetchedShow && 
              <p className={styles.success}>
                Ваш заказ на просмотр был успешно оформлен!
              </p> 
            }
            {
              errorMsg &&
              <p className={styles.success}>
                {errorMsg}
              </p> 
            }
          </div>
        </div>
      : <></>
    }
    </>
  )
}

export default Order;