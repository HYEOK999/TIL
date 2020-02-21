// import React from 'react';

import { connect } from 'react-redux';
import Books from '../components/Books';
import { startBooksSaga, startDeleteBookSaga } from '../redux/modules/books';
// import { useCallback } from 'react';

// const BooksContainer = props => {
//   const books = useSelector(state => state.books.books);
//   const loading = useSelector(state => state.books.loading);
//   const error = useSelector(state => state.books.error);

//   const dispatch = useDispatch();

//   const getBooks = useCallback(() => {
//     dispatch(startBooksSaga());
//   }, [dispatch]);

//   return (
//     <Books
//       {...props}
//       books={books}
//       loading={loading}
//       error={error}
//       getBooks={getBooks}
//     />
//   );
// };

export default connect(
  state => ({
    books: state.books.books,
    loading: state.books.loading,
    error: state.books.error,
  }),
  dispatch => ({
    getBooks: () => {
      dispatch(startBooksSaga());
    },
    deleteBook: bookId => {
      dispatch(startDeleteBookSaga(bookId));
    },
  }),
)(Books);
