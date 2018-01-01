// 1. login authentication
import { takeEvery } from 'redux-saga/effects';
import { LOGIN } from '../actions/user';

/* TODO: solve hard code problems */
const login = user => fetch('http://albus-api-dev.us-east-2.elasticbeanstalk.com/api/appUsers/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: user,
});

function* fetchLogin(action) {
  login(action.user).then(res => res.json()).then(res => console.log(res));
  /* TODO: return response */
  yield;
}

export default function* rootSaga() {
  yield takeEvery(LOGIN, fetchLogin);
}
