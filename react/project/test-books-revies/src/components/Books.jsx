import React, { useEffect } from 'react';
import axios from 'axios';

const Books = ({ token, books, setBooks, error, loading }) => {
  useEffect(() => {
    setBooks(token);
  }, [token, setBooks]);

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
