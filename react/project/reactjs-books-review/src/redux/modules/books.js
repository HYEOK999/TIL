import BookRequest from '../../services/BookRequest';
import { put } from 'redux-saga/effects'; // action을 dispatch하는 redux-sage의 행위 put
import { delay } from 'redux-saga/effects'; // action을 dispatch하는 redux-sage의 행위 put
import { call } from 'redux-saga/effects'; // promise를  redux-sage의 행위 call
import { select } from 'redux-saga/effects';
import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';

// // 액션타입
// const PENDING = 'reactjs-books-review/books/PENDING';
// const SUCCESS = 'reactjs-books-review/books/SUCCESS';
// const FAIL = 'reactjs-books-review/books/FAIL';

// // 액션 생성자
// const pending = () => ({ type: PENDING });
// const success = books => ({ type: SUCCESS, books });
// const fail = error => ({ type: FAIL, error });

// const pending = createAction('PENDING');
// const success = createAction('SUCCESS', books => books);
// const fail = createAction('FAIL');

// console.log(pending());
// console.log(success(['hello']));
// console.log(fail(new Error()));
const options = {
  prefix: 'reactjs-books-review/books',
  // namespace: '/' // default
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: books => ({ books }),
  },
  'PENDING',
  'FAIL',
  options,
);

export { success };
// console.log(pending());
// console.log(success(['hello']));
// console.log(fail(new Error()));

// export const getBooks = token => async (dispatch, getState) => {
//   const state = getState();
//   const token = state.auth.token;
//   try {
//     dispatch(pending());
//     await sleep(2000);
//     const res = await BookRequest.getBooks(token);
//     dispatch(success(res.data));
//   } catch (error) {
//     dispatch(fail(error));
//   }
// };

// saga
// const START_BOOKS_SAGA = 'START_BOOKS_SAGA';

export const startBooksSaga = createAction('START_BOOKS_SAGA');

// export const startBooksSaga = token => ({
//   type: START_BOOKS_SAGA,
// });

// saga 함수
function* getBooksSaga() {
  // 비동기 로직을 수행가능하다.
  // const token = action.payload.token;
  const token = yield select(state => state.auth.token);
  try {
    // dispatch(pending());
    yield put(pending());
    // await sleep(2000);
    yield delay(2000);
    // const res = await BookRequest.getBooks(token);
    const res = yield call(BookRequest.getBooks, token);
    // dispatch(success(res.data));
    yield put(success(res.data));
  } catch (error) {
    // dispatch(fail(error));
    yield put(fail(error));
  }
}

// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* booksSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeLeading('START_BOOKS_SAGA', getBooksSaga);
}

// 초기값
const initialState = {
  books: [],
  loading: false,
  error: null,
};
// 리듀서
// const books = (state = initialState, action) => {
//   switch (action.type) {
//     case PENDING:
//       return {
//         books: [],
//         loading: true,
//         error: null,
//       };
//     case SUCCESS:
//       return {
//         books: action.books,
//         loading: false,
//         error: null,
//       };
//     case FAIL:
//       return {
//         books: [],
//         loading: false,
//         eorrr: action.error,
//       };
//     default:
//       return state;
//   }
// };

const books = handleActions(
  {
    PENDING: (state, action) => ({ books: [], loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default books;
