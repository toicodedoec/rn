export const LOGIN = 'LOGIN';
export const LOGIN_RESULT = 'LOGIN_RESULT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = user => ({
  type: LOGIN,
  user,
});

