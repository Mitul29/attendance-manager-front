import axios from "axios";
import { logOut } from "../redux/modules/authSlice";
import { store } from "../redux/store";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const ACCESS_TOKEN = `JWT ${token}`;
    if (token) config.headers["Authorization"] = ACCESS_TOKEN;
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      const storeData = store.getState();
      if (storeData.token !== null) {
        store.dispatch(logOut());
      }
    }
    throw error.response.data.meta;
  }
);

export default Axios;
