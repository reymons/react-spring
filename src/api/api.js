import axios from "axios"

export const inst = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const authAPI = {
  me() {
    return inst.get("/auth/me").then(res => res.data).catch(() => null);
  },
  register({ login, password, name, surname, phoneNumber, email, sex }) {
    return inst.put("/auth/login", {
      login, password, name, surname, 
      phoneNumber, email, sex
    }, {}).then(res => res.data);
  },
  logIn({ login, password }) {
    return inst.post("/auth/login", { login, password }, {})
      .then(res => res.data);
  },
  logOut() {
    return inst.delete("/auth/login", {})
      .then(res => res.data);
  }
}

export const carAPI = {
  get(id) {
    return inst.get(`/cars/${id}`, {})
      .then(res => res.data);
  },
  getBySize(size) {
    return inst.get(`/cars?size=${size}`)
      .then(res => res.data);
  },
  search(query) {
    return inst.get(`/cars/search?query=${query}`)
      .then(res => res.data);
  }
}

export const showAPI = {
  order(carId, userId, date) {
    return inst.post("/show", { carId, userId, date }, {})
      .then(res => res.data);
  }
}