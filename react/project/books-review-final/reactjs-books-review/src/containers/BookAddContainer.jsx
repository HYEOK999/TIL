import React from 'react';
import BookAdd from '../components/BookAdd';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { startAddBookSaga, startBooksSaga } from '../redux/modules/books';
import { goBack } from 'connected-react-router';

const BookAddContainer = () => {
  const loading = useSelector(state => state.books.loading);
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(startBooksSaga());
  }, [dispatch]);

  const add = useCallback(
    book => {
      dispatch(startAddBookSaga(book));
    },
    [dispatch],
  );

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  return (
    <BookAdd loading={loading} add={add} getBooks={getBooks} back={back} />
  );
};

export default BookAddContainer;
