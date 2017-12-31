import { LOGIN } from '../actions/user';

const initialState = {
  email: '',
  password: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.email || '',
        password: action.password || '',
      };
    default:
      return state;
  }
};

export default reducer;
