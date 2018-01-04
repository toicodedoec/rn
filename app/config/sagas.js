// 1. login authentication
import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGIN, LOGIN_RESULT, LOGIN_ERROR } from '../actions/user';

/* TODO: solve hard code problems */
const login = user => fetch('http://albus-api-dev.us-east-2.elasticbeanstalk.com/api/appUsers/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: user,
});

function* fetchLogin(action) {
  try {
    const response = yield call(login, action.user);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: LOGIN_ERROR, error: result.error });
    } else {
      yield put({ type: LOGIN_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LOGIN_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(LOGIN, fetchLogin);
}
