import { SET_BOOKS } from '../actions';

const initialState = [];

const books = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books];
    default:
      return state;
  }
};

export default books;
