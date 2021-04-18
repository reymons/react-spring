import axios from "axios"

const inst = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true
});

export const authAPI = {
  me() {
    return inst.get("auth/me").then(response => response.data);
  }
}