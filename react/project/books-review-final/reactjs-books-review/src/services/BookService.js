import axios from 'axios';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';

export default class BookService {
  static async getBooks(token) {
    return axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getBook(token, bookId) {
    return axios.get(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async addBook(token, book) {
    return axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async deleteBook(token, bookId) {
    return axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async editBook(token, bookId, book) {
    return axios.patch(`${BOOK_API_URL}/${bookId}`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
