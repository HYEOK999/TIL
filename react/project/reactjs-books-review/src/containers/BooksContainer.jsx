import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Books from '../components/Books';
import {
  getBooks as getBooksAction,
  startBooksSaga,
} from '../redux/modules/books';

// const mapStateToProps = state => ({
//   books: state.books.books,
//   token: state.auth.token,
//   loading: state.books.loading,
//   error: state.books.error,
// });

// const mapDispatchToProps = dispatch => ({
//   getBooks: async token => {
//     dispatch(getBooks(token));
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Books);
const BookContainer = props => {
  // const token = useSelector(state => state.auth.token);
  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    // dispatch(getBooksAction());
    // setInterval(() => {
    //   dispatch(startBooksSaga());
    //   dispatch(startBooksSaga());
    //   dispatch(startBooksSaga());
    //   dispatch(startBooksSaga());
    //   dispatch(startBooksSaga());
    // }, 100)
    dispatch(startBooksSaga());
  }, [dispatch]);

  return (
    <Books
      {...props}
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
    />
  );
};

export default BookContainer;
