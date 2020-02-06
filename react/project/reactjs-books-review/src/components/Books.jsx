import React, { useEffect } from 'react';
import axios from 'axios';

// const Books = ({ token, books, getBooks, error, loading }) => {
//   useEffect(() => {
//     getBooks(token);
//   }, [token, getBooks]);
const Books = ({ books, getBooks, error, loading }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  if (error !== null) {
    return <div>에러다</div>;
  }

  return (
    <>
      {loading && <p>로딩중</p>}
      <ul>
        {books.map(book => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Books;
