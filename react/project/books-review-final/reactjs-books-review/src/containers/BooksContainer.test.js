import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import BooksContainer from './BooksContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('BooksContainer', () => {
  it('renders properly', () => {
    const createStore = configureMockStore();

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
      {
        bookId: 3,
        ownerId: '7d26db27-168c-4c6a-bd9a-9e20677b60b8',
        title: '책 Mock 222',
        message: '메세지 Mock 222',
      },
    ];

    const store = createStore({
      books: {
        books: booksMock,
        loading: true,
        error: null,
      },
      auth: {
        token: '일단 모르겠다',
        loading: false,
        error: null,
      },
    });

    const component = mount(<BooksContainer store={store} />);
    expect(component).toMatchSnapshot();
  });
});
