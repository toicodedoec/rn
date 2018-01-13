import axios from "axios";
import { AsyncStorage } from 'react-native';
import AppConfig from '../constants/config';

const axiosInstance = axios.create({
  baseURL: AppConfig.__APP_API__
});

axiosInstance.interceptors.request.use(
  config => {
    return AsyncStorage.getItem("authToken").then(authToken => {
      config.headers.Authorization = authToken || "";
      return config;
    });
  },
  error => Promise.reject(error)
);

export default axiosInstance;
