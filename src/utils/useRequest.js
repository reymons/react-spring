import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useThunkRequest = (request, ...params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const disptach = useDispatch();

  useEffect(() => {
    setLoading(true);
    Promise.resolve(disptach(request(...params)))
      .then(res => setData(res))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [disptach, params, request])

  return [data, loading, error];
}

export default useThunkRequest;