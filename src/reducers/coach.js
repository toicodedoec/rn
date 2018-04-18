import Store from '../store/coach';
import { Actions } from 'react-native-router-flux';

export const initialState = Store;

export default function coachReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COACHES_SUCCESSFULLY': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          coaches: action.data,
        };
      }
      return initialState;
    }
    case 'SELECT_COACH_SUCCESSFULLY': {
        if (action.data) {
            return {
              ...state,
              loading: false,
              coach: action.data,
            };
          }
          return initialState;
    }
    default:
      return state;
  }
}
