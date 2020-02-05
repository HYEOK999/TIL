import { SET_TOKEN, REMOVE_TOKEN } from '../actions';

const initialState = null;

const token = (state = initialState, action) => {
  if (action.type === SET_TOKEN) {
    return action.token;
  } else if (action.type === REMOVE_TOKEN) {
    return null;
  }
  return state;
};

export default token;
