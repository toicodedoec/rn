import axiosInstance from "../lib/axios.js";

exports.login = (formData) => {
  return axiosInstance
    .post("/appUsers/login", formData)
    .then(response => response)
    .catch(err => err);
}

exports.getUserData = (id) => {
  // return axiosInstance
  //   .post("/appUsers/login", formData)
  //   .then(response => response)
  //   .catch(err => err);
}

