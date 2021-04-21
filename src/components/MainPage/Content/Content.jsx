import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { requestCarsBySize } from "../../../redux/reducers/carReducer";

const Content = () => {
  const cars = useSelector(state => state.car.all, shallowEqual);
  const [size, setSize] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const request = () => {
    if (size < 1) {
      setError("The size must be higher than 1");
      return;
    }

    dispatch(requestCarsBySize(size))
  }

  const inputHandler = (event) => {
    setSize(event.target.value);
    setError(null);
  }
  console.log(cars);
  return (
    <div>
      <ul>
        {
          cars?.map(car =>
            <li key={car.id}>
              <img src={car.image} alt={car.model}/>
              <p>{car.model} {car.date}</p>
              <p>{car.description}</p>
            </li>
          )
        }
      </ul>
      <input type="text" value={size} onChange={inputHandler}/>
      <button onClick={request}>Get</button>
      <p>{error}</p>
    </div>
  )
}

export default Content;