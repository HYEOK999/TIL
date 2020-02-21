import BookService from '../../services/BookService';
import {
  put,
  delay,
  call,
  takeEvery,
  takeLatest,
  takeLeading,
  select,
} from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { push } from 'connected-react-router';

const options = {
  prefix: 'reactjs-books-review/books',
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

// saga
export const startBooksSaga = createAction('START_BOOKS_SAGA');
export const startAddBookSaga = createAction('START_ADD_BOOK_SAGA', book => ({
  book,
}));
export const startDeleteBookSaga = createAction(
  'START_DELETE_BOOK_SAGA',
  bookId => ({ bookId }),
);

function* getBooksSaga() {
  // 비동기 로직
  const books = yield select(state => state.books.books);
  if (books !== null) {
    return;
  }
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    yield delay(2000);
    const res = yield call(BookService.getBooks, token);
    yield put(success(List(res.data)));
  } catch (error) {
    yield put(fail(error));
  }
}

function* addBookSaga(action) {
  const { book } = action.payload;
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    yield delay(2000);
    const res = yield call(BookService.addBook, token, book);
    const newBook = res.data;
    const books = yield select(state => state.books.books);
    console.log(books, newBook);
    yield put(success(books.push(newBook)));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* deleteBookSaga(action) {
  const { bookId } = action.payload;
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    yield delay(1000);
    yield call(BookService.deleteBook, token, bookId);
    const books = yield select(state => state.books.books);
    const newBooks = books.filter(book => book.bookId !== bookId);
    yield put(success(newBooks));
  } catch (error) {
    yield put(fail(error));
  }
}

// 내가 만든 비동기 로직 (나의 사가 함수 : getBooksSaga) 을 등록하는 사가 함수
export function* booksSaga() {
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeEvery('START_BOOKS_SAGA', getBooksSaga);
  yield takeEvery('START_ADD_BOOK_SAGA', addBookSaga);
  yield takeEvery('START_DELETE_BOOK_SAGA', deleteBookSaga);
}

// 초기값
const initialState = {
  books: null,
  loading: false,
  error: null,
};

const books = handleActions(
  {
    PENDING: (state, action) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default books;
