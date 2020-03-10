![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 7

- [시작하기 앞서 정리하기](#a1)
- [프리젠테이셜 컴포넌트 와 컨테이너 컴포넌트](#a2)
  - [프리젠테이셔널 컴포넌트](#a3)
  - [컨테이너 컴포넌트](#a4)
  - [이 구조의 장점](#a5)
  - [어떤걸 컨테이너로 만들어야할까?](#a6)
- [Async Action with Redux](#a7)
  - [비동기 처리를 위한 액션 추가 및 dispatch (예시)](#a8)
- [리덕스 미들웨어](#a9)
  - [미들웨어 만들어보기](#a10)
- [Redux Dev Tools](#a11)
- [redux-thunk](#a12)
  - [실습](#a13)
- [서비스 분리](#a14)
- [HOC에 옵션을 주는 방법](#a15)

<br/>

-----

## React Study with Mark - Redux Advanced (1) -

### 시작하기 앞서 정리하기 <a id="a1"></a>

컴포넌트의 모습을 결정하는 요인 2가지

- `props`
- `state`
- 만약 다른것에 의해 컴포넌트가 다른 모습을 띈다면 컴포넌트를 신뢰할 수 없음(ex. error)

side effect

- side effect란 ? 
- 함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우 모두 사이드 이펙트를 갖는 것
- `history.push` 역시 side effect → React Re-Study : 8에서 디스패치로 해겨한다.

<br/>

### 프리젠테이셜 컴포넌트 와 컨테이너 컴포넌트 <a id="a2"></a>

> 리덕스를 사용하는 프로젝트에서 자주 사용되는 구조
>
> Dumb 컴포넌트와 Smart 컴포넌트로도 알려져있다.

#### 프리젠테이셔널 컴포넌트 <a id="a3"></a>

- 프리젠테이셔널 컴포넌트는 오직 뷰만을 담당하는 컴포넌트이다. 
- DOM 엘리먼트, 스타일을 갖고 있으며, 프리젠테이셔널 컴포넌트나 컨테이너 컴포넌트를 가지고 있을 수도 있다. 
- 하지만, 리덕스의 스토어에는 직접적인 접근 권한이 없으며 오직 props 로만 데이터를 가져올수 있다. 
- 또한, 대부분의 경우 state 를 갖고있지 않으며, 갖고 있을 경우엔 데이터에 관련된 것이 아니라 UI 에 관련된 것이어야 한다.

주로 함수형 컴포넌트로 작성되며, state 를 갖고있어야하거나, 최적화를 위해 LifeCycle 이 필요해질때 클래스형 컴포넌트로 작성된다.

<br/>

#### 컨테이너 컴포넌트 <a id="a4"></a>

- 프리젠테이셔널 컴포넌트들과 컨테이너 컴포넌트들을 관리하는것을 담당한다. 
- 주로 내부에 DOM 엘리먼트가 직접적으로 사용되는 경우는 적으며 사용되는 경우는 감싸는 용도일때만 사용 된다. 
- 스타일을 가지고있지 않아야 한다. 
- 스타일들은 모두 프리젠테이셔널 컴포넌트에서 정의되어야 한다. 
- 상태를 가지고 있을 때가 많으며, 리덕스에 직접적으로 접근 할 수 있다.

<br/>

#### 이 구조의 장점 <a id="a5"></a>

UI 쪽과 Data 쪽이 분리되어 프로젝트를 이해하기가 쉬워지며, 컴포넌트의 재사용률을 높여준다.

<br/>

#### 어떤걸 컨테이너로 만들어야할까? <a id="a6"></a>

- 페이지
- 리스트
- 헤더
- 사이드바
- 내부의 컴포넌트 때문에 props가 여러 컴포넌트를 거쳐야 하는 경우

<br/>

### Async Action with Redux <a id="a7"></a>

Q : 비동기 작업을 어디서 하느냐 ? 

A : **dispatch 를 할 때** 해준다.

- 당연히 리듀서는 동기적인 것 → Pure
- dispatch 도 동기적인 것

<br/>

#### 비동기 처리를 위한 액션 추가 및 dispatch (예시) <a id="a8"></a>

```jsx
// 액션 정의
export const START_RECEIVE_BOOKS = 'START_RECEIVE_BOOKS';
export const END_RECEIVE_BOOKS = 'END_RECEIVE_BOOKS';
export const ERROR_RECEIVE_BOOKS = 'ERROR_RECEIVE_BOOKS';

// 액션 생성자 함수
export function startReceiveBooks() {
  return {
    type: START_RECEIVE_BOOKS,
  };
}

export function endReceiveBooks(books) {
  return {
    type: END_RECEIVE_BOOKS,
    books,
  };
}

export function errorReceiveBooks() {
  return {
    type: ERROR_RECEIVE_BOOKS,
  };
}
```

```jsx
// mapDispatchToProps => dispatch
// 위치 : 컨테이너 혹은 해당 페이지
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  }
});
```

```jsx
// Book.jsx 컴포넌트
import React, { useEffect } from "react";

const Book = props => <div>title : {props.title}</div>;

const Books = ({ token, loading, error, books, requestBooks }) => {
  useEffect(() => {
    requestBooks(token); // 컨테이너로 로직을 옮겼음.
  }, [token, requestBooks]);
  return (
    <div>
      {loading && <p>loading...</p>}
      {error !== null && <p>{error.message}</p>}
      {books.map(book => (
        <Book title={book.title} key={book.bookId} />
      ))}
    </div>
  );
};

export default Books;
```

<br/>

### 리덕스 미들웨어 <a id="a9"></a>

- `dispatch`가 일어나는 순간 `dispatch`의 앞과 뒤에 코드를 추가할 수 있게 해주는 것.

- 미들웨어는 보통 행동이 일어나는 앞 뒤에 해야할 일을 붙여준다.

- 미들웨어가 여러개면 **순차적으로 실행**

- 만드는 방법 2가지

  1. 스토어를 만들 때 미들웨어를 설정한다.

     (`{createStore, applyMiddleware} from redux`)

  2. `dispatch`가 호출될 때 실제로 미들웨어를 통과하는 부분(직접 미들웨어를 만들 때 사용)

<br/>

#### 미들웨어 만들어보기 <a id="a10"></a>

- `createStore`에는 인자가 3개 들어갈 수 있다. (reducer, initialState, applyMiddleware)

  initialState를 설정안하고 applyMiddleware를 삽입해도 인식한다.

- `dispatch`를 안했는데 뜬다면 → 초기화할 때 실행되는 것.

```jsx
const middleware1 = store => {
  console.log(store); // {getState: ƒ, dispatch: ƒ}
  return (next) => {}; // next는 함수
}

// 코드를 이렇게 추가해보자
const middleware1 = store => {
  console.log(store);
  return (next) => {
    return action => {
      console.log('middleware1', 1, action);
      const value = next(action); // next는 dispatch
      console.log('middleware1', 2, action);
      return value;
    }
  };
}

const middleware2 = store => {
  console.log(store);
  return (next) => {
    return action => {
      console.log('middleware2', 1, action);
      const value = next(action); // next는 dispatch
      console.log('middleware2', 2, action);
      return value;
    }
  };
}

export default function create(initialState) {
  return createStore(reducer, initialState, applyMiddleware(middleware1, middleware2));
}

```

<br/>

### Redux Dev Tools <a id="a11"></a>

`npm install --save redux-devtools-extension`

> 현재 리덕스 관리하고 있는 상태 및 Action들을 크롬 개발자 도구를 통해 확인할 수 있는 툴

<img width="1792" alt="redux-dev-tools" src="https://user-images.githubusercontent.com/31315644/74051879-2e076e00-4a1c-11ea-8dfe-066f8c603fb2.png">

<br/>

### redux-thunk <a id="a12"></a>

- 리덕스 미들웨어

- 리덕스를 만든 사람이 만듬(Dan)

- 리덕스에서 비동기 처리를 위한 라이브러리

- 액션 생성자를 활용하여 비동기를 처리한다. (컨테이너에 있던 비동기 함수를 액션으로 이동)

- 액션 생성자가 액션을 리턴하지 않고, 함수를 리턴함.

- `thunk`는 인자로 1. dispatch 2.현재 스테이트 를 받아올 수 있다.

  export const setBooksThunk = token => async dispatch, getState 

- 즉, 컨테이너에서도 dispatch를 제거한다.

| ----      | 기존                         | redux-thunk                                      |
| --------- | ---------------------------- | ------------------------------------------------ |
| container | redux의 state, dispatch 처리 | redux의 state, thunk를 사용                      |
| Action    | action 타입, 생성자 정의     | action 타입, 생성자 정의, thunk를 정의(dispatch) |

<br/>

#### 실습 <a id="a13"></a>

`npm i redux-thunk`

1. `Books`에서 직접 데이터를 가져온다.
2. 프리젠테이션 컴포넌트에서 하지 않는다 → 컨테이너로 이동
3. `thunk`로 `action`을 넘겨서 깔끔하게 처리함.
4. `action`에 비동기 로직을 모두 포함한다.

<br/>

**redux-thunk 설정**

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // import

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) // 미들웨어 설정
);

export default store;

```

**Before Using thunk**

```jsx
// BooksContainer.jsx , dispatch를 컨테이너에서 설정함.
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {
    dispatch(startLoading());
    dispatch(clearError());
    try { 
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  }
});
```

**Use thunk**

```jsx
 BooksContainer.jsx
const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {...},
  requestBooksThunk: token => {
    dispatch(setBooksThunk(token)); // thunk만 로드
  }
});

// actions/index.js
export const setBooksThunk = token => async dispatch => {
  dispatch(startLoading());
  dispatch(clearError());
  try {
    const res = await axios.get("https://api.marktube.tv/v1/book", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setBooks(res.data));
    dispatch(endLoading());
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
    dispatch(endLoading());
  }
};
```

<br/>

### 서비스 분리 <a id="a14"></a>

- HTTP Request 통신 코드들만 모아놓는다. (`axios`, `promise` ...) 
- 특정한 `side effect`의 관심사들을 모아놓은 계층.
- 타 컨테이너나 컴포넌트에서 사용하던 `axios`의 의존성을 제거해줄 수 있다.
- Dependency injection

```jsx
// src/services/UserService.js
import axios from 'axios';

const USER_API_URL = 'https://api.marktube.tv/v1/me';

export default class UserService {
  static login(email, password) {
    return axios.post(USER_API_URL, {
      email,
      password,
    });
  }

  static logout(token) {
    return axios.delete(USER_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
```

<br/>

### HOC에 옵션을 주는 방법  <a id="a15"></a>

- withRouter(Component), createFragment(Component, option), connect(option)(Component)
- 언마운트 직전의 리퀘스트를 날려야 한다. (로그인 되는데 로그아웃하면 안되기 때문)
- 로그인, 로그아웃을 하나의 서비스로 처리한다.