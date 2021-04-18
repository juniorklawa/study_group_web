import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "https://easy-meet-api.herokuapp.com/",
});

export default api;
