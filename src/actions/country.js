import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import memberService from '../services/member.services';
import { Actions } from 'react-native-router-flux';

/**
  * get countries
  */
export function getCountries() {
  return dispatch => new Promise((resolve, reject) => {
    memberService.getCountries()
      .then(response => {
        dispatch({
          type: 'GET_COUNTRIES_SUCCESSFULLY',
          data: response.data
        })
      })
      .catch(err => err);
  })
}

/**
  * get timezone
  */
 export function getTimezone(countryId) {
  return dispatch => new Promise((resolve, reject) => {
    memberService.getTimezone(countryId)
      .then(response => {
        dispatch({
          type: 'GET_TIMEZONE_SUCCESSFULLY',
          data: response.data
        })
      })
      .catch(err => err);
  })
}