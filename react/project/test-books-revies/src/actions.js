import axios from 'axios';
import BookRequest from './services/BookRequest';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

//thunk
export const loginThunk = (email, password) => async dispatch => {
  try {
    dispatch(clearError());
    dispatch(startLoading());
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    console.log(response.data);
    const { token } = response.data;
    dispatch(endLoading());
    localStorage.setItem('token', token);
    dispatch(setToken(token));
    // dispatch(push('/'));
  } catch (error) {
    dispatch(setError(error));
    dispatch(endLoading());
    throw error;
  }
};

export const SET_BOOKS = 'SET_BOOKS';

export const setBooks = books => ({
  type: SET_BOOKS,
  books,
});

export const setBooksThunk = token => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    await sleep(2000);
    const res = await BookRequest.getBooks(token);
    dispatch(endLoading());
    dispatch(setBooks(res.data));
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export const logoutThunk = token => async dispatch => {
  try {
    await axios.delete('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  // 토큰 지우기
  localStorage.removeItem('token');

  // 리덕스 토큰 지우기
  dispatch(removeToken());
};
