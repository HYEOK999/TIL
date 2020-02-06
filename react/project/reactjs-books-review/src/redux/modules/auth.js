import UserService from '../../services/UserService';
import { push } from 'connected-react-router';

const PENDING = 'reactjs-books-review/auth/PENDING';
const SUCCESS = 'reactjs-books-review/auth/SUCCESS';
const FAIL = 'reactjs-books-review/auth/FAIL';

const pending = () => ({ type: PENDING });
const success = token => ({ type: SUCCESS, token });
const fail = error => ({ type: FAIL, error });

//thunk
export const login = (email, password) => async dispatch => {
  try {
    dispatch(pending());
    const response = await UserService.login(email, password);
    const { token } = response.data;
    localStorage.setItem('token', token);
    dispatch(success(token));
    dispatch(push('/'));
  } catch (error) {
    dispatch(fail(error));
    throw error;
  }
};

export const logout = token => async dispatch => {
  try {
    await UserService.logout(token);
  } catch (error) {
    console.log(error);
  }

  // 토큰 지우기
  localStorage.removeItem('token');

  // 리덕스 토큰 지우기
  dispatch(success(null));
};

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
        error: null,
      };
    default:
      return state;
  }
};

export default auth;
