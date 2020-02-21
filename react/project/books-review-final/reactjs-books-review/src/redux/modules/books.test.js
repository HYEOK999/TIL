import books, { success } from './books';

describe('books reducer', () => {
  it('초기화가 잘 되는가', () => {
    const initialState = books(undefined, {});

    expect(initialState).toEqual({
      books: [],
      loading: false,
      error: null,
    });
  });

  it('success(books) 한 결과 newState 가 맞아야 한다.', () => {
    // Given
    const state = books(undefined, {});
    const booksMock = [
      {
        bookId: 1,
        ownerId: '7d26db27-168c-4c6a-bd9a-9e20677b60b8',
        title: '모던 자바스크립트 입문',
        message: '모던하군요',
      },
      {
        bookId: 2,
        ownerId: '7d26db27-168c-4c6a-bd9a-9e20677b60b8',
        title: '책 Mock',
        message: '메세지 Mock',
      },
    ];

    // When
    const newState = books(state, success(booksMock));

    // Then
    expect(newState).toEqual({
      books: booksMock,
      loading: false,
      error: null,
    });
  });
});
