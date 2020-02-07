// 전체 사가를 모은다.
// src/redux/modules/saga.js

import { all } from 'redux-saga/effects';
import { booksSaga } from './books';
import { authSaga } from './auth';

export default function* rootSaga() {
  yield all([booksSaga(), authSaga()]);
}
