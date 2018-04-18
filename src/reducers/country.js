import Store from '../store/country';
import { Actions } from 'react-native-router-flux';

export const initialState = Store;

export default function countryReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES_SUCCESSFULLY': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          data: action.data
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
