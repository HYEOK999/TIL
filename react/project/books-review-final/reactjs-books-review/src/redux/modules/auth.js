import UserService from '../../services/UserService';
import { push } from 'connected-react-router';
import { takeEvery, put, call, select } from 'redux-saga/effects';

const PENDING = 'reactjs-books-review/auth/PENDING';
const SUCCESS = 'reactjs-books-review/auth/SUCCESS';
const FAIL = 'reactjs-books-review/auth/FAIL';

const pending = () => ({ type: PENDING });
const success = token => ({ type: SUCCESS, token });
const fail = error => ({ type: FAIL, error });

// thunk
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
//   }
// };

// export const logout = token => async dispatch => {
//   // 서버에 알려주기
//   try {
//     await UserService.logout(token);
//   } catch (error) {
//     console.log(error);
//   }

//   // 토큰 지우기
//   localStorage.removeItem('token');

//   // 리덕스 토큰 지우기
//   dispatch(success(null));
// };

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return {
        token: null,
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        token: action.token,
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        token: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;

const START_LOGIN_SAGA = 'reactjs-books-review/auth/START_LOGIN_SAGA';
const START_LOGOUT_SAGA = 'reactjs-books-review/auth/START_LOGOUT_SAGA';

export const startLoginSaga = (email, password) => ({
  type: START_LOGIN_SAGA,
  payload: {
    email,
    password,
  },
});

export const startLogoutSaga = () => ({
  type: START_LOGOUT_SAGA,
});

function* login(action) {
  const { email, password } = action.payload;
  try {
    yield put(pending());
    const response = yield call(UserService.login, email, password);
    const { token } = response.data;
    localStorage.setItem('token', token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* logout() {
  // 서버에 알려주기
  try {
    const token = yield select(state => state.auth.token);
    yield call(UserService.logout, token);
  } catch (error) {
    console.log(error);
  }

  // 토큰 지우기
  localStorage.removeItem('token');

  // 리덕스 토큰 지우기
  yield put(success(null));
}

export function* authSaga() {
  yield takeEvery(START_LOGIN_SAGA, login);
  yield takeEvery(START_LOGOUT_SAGA, logout);
}
