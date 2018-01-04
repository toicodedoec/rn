import { LOGIN, LOGIN_RESULT, LOGIN_ERROR } from '../actions/user';

const initialState = {
  email: '',
  password: '',
  userId: -1,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case LOGIN_RESULT:
      return {
        ...state,
        userId: action.result.userId,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
