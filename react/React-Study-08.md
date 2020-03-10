![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 8

- [Ducks Pattern](#a1)
  - 규칙
- [connect with hooks](#a2)
  - 기존방식 -> src/containers/BooksContainer.jsx
  - Hooks방식 -> src/containers/BooksContainer.jsx
- [react-router와 redux함께 쓰기](#a3)
- [redux-saga](#a4)
  - 제너레이터
- [redux-actions](#a5)

<br/>

-----

## React Study with Mark - Redux Advanced (2) -

<br/>

### [Ducks Pattern](https://github.com/JisuPark/ducks-modular-redux) <a id="a1"></a>

전에는 `action` 폴더에  `ActionType, Action`을 모아놓고 `reducer`폴더에 `Reducer`를 모아놓았다. 이렇게 될 경우 단점은, 하나의 기능을 수정하더라도로 2개의 파일을 전부다 왔다 갔다 해야만 한다. 

( Redux 공식 문서에서는 `ActionType`,` Action`, `Reducer` 전부 따로 관리하기에 3개의 파일을 수정해야함 )

이러한 단점을 상쇄하고자 기능별로 `ActionType, Action, Reducer` 를 묶어 놓는 방식인 Ducks Pattern 을 사용하도록 한다.

- 하나의 파일에 액션, 액션 생성자, 리듀서가 있음.

<br/>

#### 규칙

> use case에 따라 `{actionTypes, actions, reducer}` 한 벌(한 조각)을 하나의 독립된 모듈로 묶어서 관리하도록한다.

하나의 모듈은...

1. **항상** `reducer()`란 이름의 함수를 `export default` 해야한다.

2. **항상** 모듈의 action 생성자들을 함수형태로 `export` 해야한다.

3. **항상** `npm-module-or-app/reducer/ACTION_TYPE` 형태의 action 타입을 가져야 한다.

4. **어쩌면** action 타입들을 `UPPER_SNAKE_CASE`로 `export` 할 수 있다. 

   만약, 외부 `reducer`가 해당 action들이 발생하는지 계속 기다리거나, 재사용할 수 있는 라이브러리로 퍼블리싱할 경우.

재사용가능한 Redux 라이브러리 형태로 공유하는 `{actionType, action, reducer}` 묶음에도 위 규칙을 추천한다.

![ducksForderStructuer](https://user-images.githubusercontent.com/31315644/74012597-f8d42f00-49cd-11ea-8086-7111a814b74f.jpeg)

<br/>

**src/redux/modules/books.js**

```jsx
// src/redux/modules/books.js

import BookService from '../../services/BookService';

// 액션 타입 정의 ("app 이름"/"reducer 이름"/"로컬 ACTION_TYPE") => 겹치지 않게 하기 위함 (덕스 규칙)
const PENDING = 'reactjs-books-review/books/PENDING';
const SUCCESS = 'reactjs-books-review/books/SUCCESS';
const FAIL = 'reactjs-books-review/books/FAIL';

// 리듀서 초기값
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// 액션 생성자 함수
const start = () => ({ type: PENDING });
const success = books => ({ type: SUCCESS, books });
const fail = error => ({ type: FAIL, error });

// thunk 함수
export const getBooks = token => async dispatch => {
  dispatch(start());
  try {
    await sleep(2000);
    const res = await BookService.getBooks(token);
    dispatch(success(res.data));
  } catch (error) {
    dispatch(fail(error));
  }
};

// 리듀서
const books = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return {
        books: [],
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        books: [...action.books],
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        books: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default books;

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

<br/>

**src/redux/modules/reducer.js**

해당 파일은 모든 reducer들을 하나로 묶는 `combinReducers` 역할을 한다.

```jsx
import { combineReducers } from 'redux';
import auth from './auth';
import books from './books';

const reducer = combineReducers({
  auth,
  books,
});

export default reducer;
```

<br/>

**src/redux/create.js**

`store.js` 에 있던 내용을 `create.js` 에 옮겨준다.

```jsx
import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function create(token) {
  const initialState = {
    books: undefined,
    auth: {
      token,
      loading: false,
      error: null,
    },
  };

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
}
```

<br/>

### connect with hooks <a id="a2"></a>

`connect`함수 대신에  `hooks`을 이용하여 

#### 기존방식 -> src/containers/BooksContainer.jsx

```jsx
import { connect } from 'react-redux';
import Books from '../components/Books';
import { getBooks } from '../redux/modules/books';

const mapStateToProps = state => ({
  token: state.auth.token,
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  getBooks: token => {
    dispatch(getBooks(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
```

<br/>

#### Hooks방식 -> src/containers/BooksContainer.jsx

- 주의 할 점: `useCallback`을 쓰지 않으면 계속 `getBooks`라는 함수를 만들기 때문에 계속 실행됨

````jsx
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Books from '../components/Books';
import { getBooks as getBooksAction } from '../redux/modules/books';

const BooksContainer = props => {
  const token = useSelector(state => state.auth.token);
  const { books, loading, error } = useSelector(state => state.books);

  const dispatch = useDispatch();
  /*
  const getBooks = useCallback(() => {
    dispatch(getBooksAction(token));
  }, [token, dispatch]); // token 을 보낼 필요 없다.
  */
  const getBooks = useCallback(() => {
    dispatch(getBooksAction()); // token 을 thunk 안에서 처리
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

export default BooksContainer;
````

<br/>

### react-router와 redux함께 쓰기 <a id="a3"></a>

`npm install connected-react-router`

단방향 흐름 (예 : 히스토리-> 저장소-> 라우터-> 구성 요소)을 통해 라우터 상태를 redux 저장소와 동기화한다.

즉, 이제부터는 router를 redux로 관리한다.

![react-router-redux](https://user-images.githubusercontent.com/31315644/74021074-38a31280-49de-11ea-9eca-3a99f3864661.jpeg)

적용 순서는 다음과 같다.

1. [reducer.js에 router 라는 state를 combine](#c1)

2. [creat.js에 store에 routerMiddleware를 추가](#c2)

3. [App.js에 ConnectedRouter를 추가](#c3)

4. [auth.js에 history.push() 대신 dispatch(push())를 추가](#c4)

5. **reducer.js에 router 라는 state를 combine** <a id="c1"></a>

   ```jsx
   // src/redux/modules/reducer.js
   
   import { combineReducers } from 'redux';
   import auth from './auth';
   import books from './books';
   import { connectRouter } from 'connected-react-router';
   
   const reducer = history =>
     combineReducers({
       auth,
       books,
       router: connectRouter(history),
     });
   
   export default reducer;
   ```

   <br/>

6. **creat.js에 store에 routerMiddleware를 추가** <a id="c2"></a>

   ```jsx
   // src/redux/create.js
   
   import { createStore, applyMiddleware } from 'redux';
   import reducer from './modules/reducer';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import thunk from 'redux-thunk';
   import { createBrowserHistory } from 'history';
   import { routerMiddleware } from 'connected-react-router';
   
   export const history = createBrowserHistory();
   
   export default function create(token) {
     const initialState = {
       books: undefined,
       auth: {
         token,
         loading: false,
         error: null,
       },
     };
   
     const store = createStore(
       reducer(history),
       initialState,
       composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
     );
   
     return store;
   }
   ```

   <br/>

7. **App.js에 ConnectedRouter를 추가** <a id="c3"></a>

   ```jsx
   import React from 'react';
   import { Switch, Route } from 'react-router-dom';
   import Home from './pages/Home';
   import Signin from './pages/Signin';
   import NotFound from './pages/NotFound';
   import ErrorBoundary from 'react-error-boundary';
   import { ConnectedRouter } from 'connected-react-router';
   import { history } from './redux/create';
   
   const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;
   
   const App = () => (
     <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
       <ConnectedRouter history={history}>
         <Switch>
           <Route exact path="/signin" component={Signin} />
           <Route exact path="/" component={Home} />
           <Route component={NotFound} />
         </Switch>
       </ConnectedRouter>
     </ErrorBoundary>
   );
   
   export default App;
   ```

   <br/>

8. **auth.js에 history.push() 대신 dispatch(push())를 추가** <a id="c4"></a>

   ```jsx
   // src/redux/modules/auth.js
   
   export const login = (email, password) => async dispatch => {
     try {
       dispatch(start());
       const res = await UserService.login(email, password);
       const { token } = res.data;
       localStorage.setItem('token', token);
       dispatch(success(token));
       dispatch(push('/'));
     } catch (error) {
       dispatch(fail(error));
     }
   };
   
   ```

   <br/>

### redux-saga <a id="a4"></a>

`npm install redux-saga`

- `thunk함수`는 함수를 리턴, `saga`는 그냥 보통 일반적인 액션을 디스패치.
- 미들웨어.
- 제너레이터 객체를 만들어 내는 제네레이터 생성 함수를 이용한다.
- 만드는 순서
  1. [사가 미들웨어를 리덕스 미들웨어로 설정](#z1)
  2. [사가 함수 만들기](#z2)
  3. [사가함수를 실행하는 사가 만들기](#z3)
  4. [여러 사가 모듈을 합친 rootSaga 만들기](#z4)
  5. [rootSaga 를 사가 미들웨어로 실행](#z5)
  6. [나의 사가 함수를 시작하게 할 액션을 디스패치](#z6)

<br/>

#### 제너레이터

`redux-saga/effects`에는 다양한 리덕스-사가 이펙츠가 있는데 이것을 사용하기 위해서는 제너레이터를 사용해야만 한다.

```jsx
// saga 함수
function* getBooksSaga() {
  // 비동기 로직을 수행가능하다.
  // const token = action.payload.token;
  const token = yield select(state => state.auth.token);
  try {
    // dispatch(pending());
    yield put(pending());
    // await sleep(2000);
    yield delay(2000);
    // const res = await BookRequest.getBooks(token);
    const res = yield call(BookRequest.getBooks, token);
    // dispatch(success(res.data));
    yield put(success(res.data));
  } catch (error) {
    // dispatch(fail(error));
    yield put(fail(error));
  }
}

export function* booksSaga() {
  yield takeEvery(START_BOOKS_SAGA, getBooksSaga) 
  // 어떤 함수를 실행하면 어떤 액션이 실행된다. (액션타입, 사가이름)
}

```

- `thunk`는 비동기 로직을 직접 실행 하고 다뤄야 하지만, `saga`는 비동기 로직을 대신 다뤄준다.
- 비동기 로직 중간에 행해야 할 일들(비동기 중단, 다시하기, 딜레이 등등)을 정의할 수 있다.

<br/>

**만드는 순서**

1. **사가 미들웨어를 리덕스 미들웨어로 설정**  <a id="z1"></a>

   ```jsx
   // src/redux/create.js
   
   import { createStore, applyMiddleware } from 'redux';
   import reducer from './modules/reducer';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import thunk from 'redux-thunk';
   import { createBrowserHistory } from 'history';
   import { routerMiddleware } from 'connected-react-router';
   import createSagaMiddleware from 'redux-saga'; // 1. import
   
   export const history = createBrowserHistory();
   const sagaMiddleware = createSagaMiddleware(); // 2. saga 미들웨어 생성
   
   export default function create(token) {
     const initialState = {
       books: undefined,
       auth: {
         token,
         loading: false,
         error: null,
       },
     };
   
     const store = createStore(
       reducer(history),
       initialState,
       composeWithDevTools(
         applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware), 
         // 3. 리덕스 미들웨어에 saga 미들웨어 추가
       ),
     );
   
     return store;
   }
   
   ```

2. **사가 함수 만들기 ** <a id="z2"></a>

   ```jsx
   // src/redux/modules/books.js
   
   import { delay, put, call } from 'redux-saga'; // 사가 이펙트 추가
   
   // saga 함수
   function* getBooksSaga(action) {
     const token = action.payload.token;
     yield put(start());
     try {
       yield delay(2000);
       const res = yield call(BookService.getBooks, token);
       yield put(success(res.data));
     } catch (error) {
       yield put(fail(error));
     }
   }
   
   ```

3. **사가함수를 실행하는 사가 만들기** <a id="z3"></a>

   ``` jsx
   // src/redux/modules/books.js
   
   import { delay, put, call, takeEvery } from 'redux-saga/effects'; // 사가 이펙트 추가
   
   // saga 함수
   function* getBooksSaga(action) {
     const token = action.payload.token;
     yield put(start());
     try {
       yield delay(2000);
       const res = yield call(BookService.getBooks, token);
       yield put(success(res.data));
     } catch (error) {
       yield put(fail(error));
     }
   }
   
   // getBooksSaga 를 시작하는 액션 타입 정의
   const START_SAGA = 'START_SAGA';
   
   // getBooksSaga 를 시작하는 액션 생성 함수
   export const startSaga = token => ({ type: START_SAGA, payload: { token } });
   
   // saga 함수를 등록하는 saga
   export function* booksSaga() {
     yield takeEvery(START_SAGA, getBooksSaga);
   }
   
   ```

4. **여러 사가 모듈을 합친 rootSaga 만들기** <a id="z4"></a>

   ```jsx
   // src/redux/modules/saga.js
   
   import { all } from 'redux-saga/effects';
   import { booksSaga } from './books';
   
   export default function* rootSaga() {
     yield all([booksSaga()]);
   }
   
   ```

5. **rootSaga 를 사가 미들웨어로 실행** <a id="z5"></a>

   ```jsx
   // src/redux/create.js
   
   import { createStore, applyMiddleware } from 'redux';
   import reducer from './modules/reducer';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import thunk from 'redux-thunk';
   import { createBrowserHistory } from 'history';
   import { routerMiddleware } from 'connected-react-router';
   import createSagaMiddleware from 'redux-saga';
   import rootSaga from './modules/saga'; // 나의 사가 가져오기
   
   export const history = createBrowserHistory();
   const sagaMiddleware = createSagaMiddleware();
   
   export default function create(token) {
     const initialState = {
       books: undefined,
       auth: {
         token,
         loading: false,
         error: null,
       },
     };
   
     const store = createStore(
       reducer(history),
       initialState,
       composeWithDevTools(
         applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware),
       ),
     );
   
     sagaMiddleware.run(rootSaga); // 나의 사가들을 실행
   
     return store;
   }
   
   ```

6. **나의 사가 함수를 시작하게 할 액션을 디스패치**   <a id="z6"></a>

   ```jsx
   // src/containers/BooksContainer.jsx
   
   import React, { useCallback } from 'react';
   import { useSelector, useDispatch } from 'react-redux';
   import Books from '../components/Books';
   import { startSaga } from '../redux/modules/books';
   
   const BooksContainer = props => {
     const token = useSelector(state => state.auth.token);
     const { books, loading, error } = useSelector(state => state.books);
   
     const dispatch = useDispatch();
   
     const getBooks = useCallback(() => {
       dispatch(startSaga(token)); // 이제 token이 필요없다.
     }, [token, dispatch]); // 이제 token이 필요없다.
   
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
   
   export default BooksContainer;
   
   ```

   <br/>

### redux-actions <a id="a5"></a>

`npm i redux-actions`

- 모듈 만드는 방법을 쉽게 제공한다.

- 모듈 내에서 액션과 액션타입을 동시에 정의가 가능하다. ( `createActions` )

  ```jsx
  const { success, pending, fail } = createActions({
    SUCCESS: books => ({ books }),
  }, 'PENDING', 'FAIL', {
    prefix: 'reactjs-books-review/books',
    namespace: '/' // default값이 /, -붙으면 reactjs-books-review/books-PENDING
  });
  
  console.log(pending());
  console.log(success(['hello']));
  console.log(fail(new Error));
  
  ```

- `createAction`은 이름이 변경 가능하다. (`createActions`는 불가능.)

- `handleActions`은 기존의 `reducer`를 대체한다.

  ```jsx
  const options = {
    prefix: 'reactjs-books-review/books',
    namespace: '/' // default값이 /, -붙으면 reactjs-books-review/books-PENDING
  };
  
  const books = handleActions({
    PENDING: (state, action) => ({ books: [], loading: true, error: null }),
    SUCCESS: (state, action) => ({ books: action.payload.books, loading: false, error: null }),
    FAIL: (state, action) => ({ books: [], loading: true, error: action.payload }), 
    // 페이로드에 에러객체
  }, initialState,
    options
  );
  
  export default books;
  
  ```

  