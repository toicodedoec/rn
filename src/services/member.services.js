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

exports.resetPassword = (formData) => {
  return axiosInstance.post(`/auth/password`, formData);
}

exports.getCoaches = (searchStr) => {
  return axiosInstance.get(`/coaches/suggest_coaches?page=1&search=${searchStr}`)
}

exports.getCountries = () => {
  return axiosInstance.get(`/countries`)
}

exports.createUser = (formData) => {
  return axiosInstance.post(`/auth`, formData)
}

exports.updatePhoneNumber = (user, auth_token) => {
  return axiosInstance.put(`users/${user.id}`, { user }, {
    headers: {
      'auth-token': auth_token,
    },
  })
}

exports.resendVerifyCode = (userId, auth_token) => {
  return axiosInstance.post(`users/${userId}/resend_verification_code`, {}, {
    headers: {
      'auth-token': auth_token,
    },
  })
}

exports.sendVerifiedCode = (userId, formData, auth_token) => {
  return axiosInstance.put(`users/${userId}/verify_mobile`, formData, {
    headers: {
      'auth-token': auth_token,
    },
  })
}

exports.saveUserInfo = (userId, data, auth_token) => {
  return axiosInstance.post(`users/${userId}/register_profile_goal_exercise`, data, {
    headers: {
      'auth-token': auth_token,
    },
  })
}
