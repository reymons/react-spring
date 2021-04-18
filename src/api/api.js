import axios from "axios"

const inst = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true
});

export const authAPI = {
  me() {
    return inst.get("auth/me").then(res => res.data);
  },
  register({ login, password, name, surname, phoneNumber, email, sex }) {
    return inst.put("auth/login", {
      login, password, name, surname, 
      phoneNumber, email, sex
    }, {}).then(res => res.data);
  }
}