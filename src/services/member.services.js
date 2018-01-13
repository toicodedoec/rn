import axiosInstance from "../lib/axios.js";
import memberDataParser from '../parser/member.data.parser';
exports.login = (formData) => {
  return axiosInstance
    .post("/appUsers/login", formData)
    .then(response => response)
    .catch(err => err);
}

exports.getUserData = (id) => {
  return axiosInstance
    .get(`/appUsers/${id}`)
    .then(response => memberDataParser.convertResponseToDto(response.data))
    .catch(err => err);
}