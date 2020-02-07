import UserService from '../../services/UserService';
import { push } from 'connected-react-router';
import { createAction, createActions, handleActions } from 'redux-actions';
import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';

const options = {
  prefix: 'books-review/books',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: token => ({ token }),
  },
  'PENDING',
  'FAIL',
  options,
);

export const signInSaga = createAction('SIGN_IN_SAGA');
export const signOutSaga = createAction('SIGN_OUT_SAGA');

function* loginSaga(auth) {
  try {
    yield put(pending());
    console.log('5', auth, auth.email, auth.password);
    const res = yield call(
      UserService.login,
      auth.payload.email,
      auth.payload.password,
    );
    const { token } = res.data;
    localStorage.setItem('token', token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* logoutSaga() {
  const token = yield select(state => state.auth.token);
  try {
    yield call(UserService.logout, token);
  } catch (error) {
    yield put(fail(error));
  }
  yield put(success(null)); // 리덕스 토큰 지우기
  localStorage.removeItem('token'); // 토큰 지우기

  // dispatch(success(null));  // 리덕스 토큰 지우기
}

// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* authSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeEvery('SIGN_IN_SAGA', loginSaga);
  yield takeLatest('SIGN_OUT_SAGA', logoutSaga);
}
//thunk
// export const login = (email, password) => async dispatch => {
//   try {
//     dispatch(pending());
//     const response = await UserService.login(email, password);
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     dispatch(success(token));
//     dispatch(push('/'));
//   } catch (error) {
//     dispatch(fail(error));
//     throw error;
//   }
// };
// export const logout = token => async dispatch => {
//   try {
//     await UserService.logout(token);
//   } catch (error) {
//     console.log(error);
//   }
//   localStorage.removeItem('token');  // 토큰 지우기

//   dispatch(success(null));  // 리덕스 토큰 지우기
// };

const initialState = {
  token: null,
  loading: false,
  error: null,
};

// const auth = (state = initialState, action) => {
//   switch (action.type) {
//     case PENDING:
//       return {
//         token: null,
//         loading: true,
//         error: null,
//       };
//     case SUCCESS:
//       return {
//         token: action.token,
//         loading: false,
//         error: null,
//       };
//     case FAIL:
//       return {
//         token: null,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

const auth = handleActions(
  {
    PENDING: (state, action) => ({ token: null, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default auth;
