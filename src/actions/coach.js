import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import memberService from '../services/member.services';
import { Actions } from 'react-native-router-flux';

/**
  * Get coaches
  */
export function getCoaches(searchStr) {
    return dispatch => new Promise((resolve, reject) => {
        memberService.getCoaches(searchStr)
            .then(response => {
                dispatch({
                    type: 'GET_COACHES_SUCCESSFULLY',
                    data: response.data
                })
            })
            .catch(err => err);
    })
}

/**
  * Select coach
  */
export function selectCoach(coach) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch({
            type: 'SELECT_COACH_SUCCESSFULLY',
            data: coach
        });
        return resolve(null);
    })
}
