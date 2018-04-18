import Store from '../store/member';
import { Actions } from 'react-native-router-flux';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.data.uid,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
        };
      }
      return initialState;
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      console.log('logout cmnr');
      Actions.login();
      return initialState;
    }
    case 'CREATE_USER_SUCCESSFULLY': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          data: action.data
        };
      }
      return initialState;
    }
    default:
      return state;
  }
}
