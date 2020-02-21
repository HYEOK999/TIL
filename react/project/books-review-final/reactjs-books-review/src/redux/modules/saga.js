import { all } from 'redux-saga/effects';
import { booksSaga } from './books';
import { authSaga } from './auth';

export default function* rootSaga() {
  yield all([booksSaga(), authSaga()]);
}
