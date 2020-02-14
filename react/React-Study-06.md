![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 6

- [Flux](#a28)
  
  - [문제점](#a27)
- [해결책](#a26)
  
- [Redux 개요](#a25)

- [Redux 만들기](#a24)

- [Action - 액션](#a23)

  - [액션 생성자](#a22)
  - [리덕스의 액션은 어떤 일을 하는가?](#a21)
  - [액션의 준비과정](#a20)

- [Reducer - 리듀서](#a19)

- [createStore - 스토어를 만드는 함수](#a18)

  - [store 사용법](#a17)

- [로직을 추가하기](#a16)

  1. [action을 정의](#a15)

  2. [action 생성자를 생성](#a14)

  3. [reducer를 수정](#a13)

  4. [dispatch ( 액션 → 리듀서 : 액션을 리듀서에게 전달하는 함수 )](#a12)

  - [추가로 - 애플리케이션 확장 → state의 복잡성 증가](#a11)
  
- [한번에 모두 처리하는 리듀서](#a10)

- [분리된 리듀서 + 리듀서 합치기](#a9)

- [combineReducers](#a8)

- [React에 적용하기](#a7)

- [react-redux 사용하기](#a6)

  - [간단 예제](#a5)

- [Provider Component from react-redux](#a4)

- [Consumer from react-redux](#a3)

- [connect function from react-redux](#a2)

- [HOC(connect)가 아닌 hook을 사용한 Redux](#a1)

<br/>

-----

## React Study with Mark - Redux Basic -

<br/>

### Flux   <a id="a28"></a>

>  Flux는 애플리케이션에서 데이터를 취급하기 위한 패턴의 일종
>
> Flux는 개념, redux와 같지 않다.

#### 문제점   <a id="a27"></a>

- 페이스북의 알림 버그를 해결하기 위한 개념으로 성장했다.
- 기존의 어플리케이션 방식은 모델 → 뷰로 흐르는 방식
- 사용자와의 상호작용은 오직 뷰에서 일어났는데 뷰가 가끔씩 모델을 업데이트해야할 필요성이 생김(사용자의 입력)
- 여기서 특정 모델의 업데이트는  의존성에 의해 다른 모델을 추가로 업데이트 시켜야하는 경우가 생김
- 이런 현상이 무수히 많아지게 되면서 결국 데이터의 흐름을 잡기가 어려워짐 ( +비동기 )

위와 같은 문제들로 인하여 **Flux** 라는 개념이 등장함.

<br/>

#### 해결책   <a id="a26"></a>

> 데이터 흐름을 단방향으로 만들기
>
> Action → Dispatcher → Store → View → Action ... 반복

<br/>

### Redux 개요   <a id="a25"></a>

- 기존의 React State 접근 방식

<img src="https://user-images.githubusercontent.com/31315644/74180398-c56dfa80-4c82-11ea-978f-632dc6efd5d1.jpeg" alt="1" style="zoom:50%;" />

<br/>

- Redux Store를 이용한 React State 접근 방식

<img src="https://user-images.githubusercontent.com/31315644/74180405-c737be00-4c82-11ea-8b7b-3cc0405c1f32.jpeg" alt="2" style="zoom:50%;" />

- MobX는 전역 Store가 여러개다. Redux는 단일 전역 Store

<br/>

### Redux 만들기   <a id="a24"></a>

1. **단일 스토어**를 만드는 법
2. 리액트에서 스토어 사용하는 법을 익히는 시간

[만들기] 단일 스토어 사용 준비하기

- `import redux`
- 액션을 정의하고,
- 액션을 사용하는, 리듀서를 만들고,
- 리듀서들을 합치기
- 최종 합쳐진 리듀서를 인자로, 단일 스토어를 만든다.

[사용하기] 준비한 스토어를 리액트 컴포넌트에서 사용하기

- `import react-redux`
- connect 함수(HOC)를 이용해서 컴포넌트에 연결
  - 최근에는 HOC가 훅(Redux Hook)으로 대체되고 있는 상황
- 스토어가 너무 커지고 복잡하면 쪼개서 사용함

<br/>

### Action - 액션  <a id="a23"></a>

- 액션은 명세표의 역할 리듀서에게 행해야할 일을 적은 명세서.

- 코드 관점에서 보았을 때, 액션은 단순 그냥 Object(객체) 다.

- 두 가지 형태의 액션이 존재한다.
  -  `{ type: 'TEST' }` - payload 없는 액션
  -  `{ type: 'TEST', params: 'hello' }` - payload 있는 액션
  -  type 만이 필수 프로퍼티이며, type 은 문자열

<br/>

#### 액션 생성자  <a id="a22"></a>

> 액션을 생성하는 함수를 "액션 생성자 (Action Creator)" 라고 한다.
> ***함수를 통해 액션을 생성해서, 액션 객체를 리턴***

```jsx
function 액션생성자(...args) { return 액션; }
```

<br/>

#### 리덕스의 액션은 어떤 일을 하는가?  <a id="a21"></a>

- 액션 생성자를 통해 액션 생성
- 만들어낸 액션 객체를 리덕스 스토어에 보냄
- 리덕스 스토어가 액션 객체를 받으면 스토어의 상태 값이 변경
- 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경
- 액션은 스토어에 보내는 일종의 인풋이라 생각할 수 있음

<br/>

#### 액션의 준비과정  <a id="a20"></a>

1. *액션의 타입을 정의하여 변수로 빼는 단계*
   - 강제는 아님(옵션)
   - 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 크다
   - 미리 정의한 변수를 사용하면, 스펠링에 주의를 덜 기울여도 된다.

2. *액션 객체를 만들어 내는 함수를 만드는 단계*
   - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어낸다.
   - 액션의 타입은 미리 정의한 타입 변수로 부터 가져와서 사용한다.

```jsx
// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며, 사용자가 인자로 주지 않는다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```

<br/>

### Reducer - 리듀서  <a id="a19"></a>

- 액션을 주면, 그 액션이 적용되어 달라진 결과를 만들어냄. (액션에 따라 값이 그대로인 결과를 만들수도 있다.)

- 코드 관점에 보았을 때  단순 그냥 Function(함수) 다.

  - **Pure Function**

  - **Immutable**
    - 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식.

```jsx
function 리듀서(previousState, action) { 
  return newState;
}
```

- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState 와 리턴되는 newState 는 다른 참조를 가져야 한다.

```jsx
// reducers.js
import { ADD_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text }];
  }
  return previousState;
}
```

<br/>

### createStore - 스토어를 만드는 함수  <a id="a18"></a>

```jsx
const store = createStore(리듀서);
```

`createStore(`reducer: Reducer,` `preloadedState: S,` `enhancer?: StoreEnhancer`): Store;`

물음표는 옵션을 의미한다.

- 스토어 생성 -> Subscribe : 구독(함수 안은 실행되지 않음)  -> 액션 추가 하면 -> 스테이트가 변했으므로 console.log(subscribe)가 실행 -> 구독을 하지 않을 순간이 오면 unsubscribe(); 실행

```jsx
// store.js
import { todoApp } from './reducers';
import { createStore } from 'redux';
import { addTodo } from './actions';

const store = createStore(todoApp);
console.log(store);

console.log(store.getState());

setTimeout(() => {
  store.dispatch(addTodo('hello'));
}, 1000);

export default store;

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

store.subscribe(() => {
  const state = store.getState();

  console.log('store changed', state);
});

ReactDOM.render(<App />, document.getElementById('root'));
```

<br/>

#### store 사용법  <a id="a17"></a>

1. store.getState();
2. store.dispatch(액션명); / store.dispatch(액션생성자());
3. const unsubscribe = store.subscribe(() => {});
   - 리턴이 unsubscribe 라는 것에 주의.
     - store.subscribe의 리턴값은 함수로 unsubscribe에 담아줌
   - unsubscribe( ); 하면 제거
     - unsubscribe는 구독을 끊을 때 사용, (대상이 없는데 계속 구독하는)메모리 누수를 막기 위해
4. store.replaceReducer(다른 리듀서);

<br/>

### 로직을 추가하기  <a id="a16"></a>

> action 을 정의하고, 
> action 생성자를 만들고, 
> reducer 를 수정

#### 1. action을 정의  <a id="a15"></a>

```jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```

<br/>

#### 2. action 생성자를 생성  <a id="a14"></a>

````jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }; // { type: COMPLETE_TODO, index: index}
}
````

<br/>

#### 3. reducer를 수정  <a id="a13"></a>

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, completed: false }];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      newState.push(
        i === action.index
          ? { ...previousState[i], completed: true }
          : { ...previousState[i] },
      );
    }
    return newState;
  }
  return previousState;
}
```

<br/>

#### 4. dispatch ( 액션 → 리듀서 : 액션을 리듀서에게 전달하는 함수 )  <a id="a12"></a>

```jsx
// store.js
import { todoApp } from './reducers';
import { createStore } from 'redux';
import { addTodo, completeTodo } from './actions';

const store = createStore(todoApp);
console.log(store);

console.log(store.getState());

setTimeout(() => {
  store.dispatch(addTodo('hello'));
  setTimeout(() => {
    store.dispatch(completeTodo(0));
  }, 1000);
}, 1000);

export default store;
```

<br/>

#### 추가로 - 애플리케이션 확장 → state의 복잡성 증가  <a id="a11"></a>

- 리듀서를 크게 만들고, state 를 변경하는 모든 로직을 담을 수도 있다.
- 리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있다.
  - todos 만 변경하는 **액션들**을 처리하는 A 라는 리듀서 함수를 만들고,
  - filter 만을  변경하는 **액션들**을 처리하는 B 라는 리듀서 함수를 만들고,
  - A 와 B 를 합친다.

<br/>

### 한번에 모두 처리하는 리듀서  <a id="a10"></a>

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return { todos: [], filter: 'SHOW_ALL' };
  }
  if (action.type === ADD_TODO) {
    return {
      todos: [...previousState.todos, { text: action.text, completed: false }],
      filter: previousState.filter,
    };
  }
  if (action.type === COMPLETE_TODO) {
    const todos = [];
    for (let i = 0; i < previousState.todos.length; i++) {
      todos.push(
        i === action.index
          ? { ...previousState.todos[i], completed: true }
          : { ...previousState.todos[i] },
      );
    }
    return { todos, filter: previousState.filter };
  }
  return previousState;
}
```

<br/>

### 분리된 리듀서 + 리듀서 합치기  <a id="a9"></a>

1. 리듀서 분리

```jsx
export function todos(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState.todos, { text: action.text, completed: false }];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      newState.push(
        i === action.index
          ? { ...previousState[i], completed: true }
          : { ...previousState[i] },
      );
    }
    return newState;
  }
  return previousState;
}

export function filter(previousState, action) {
  if (previousState === undefined) {
    return 'SHOW_ALL';
  }
  return previousState;
}
```

2. 리듀서 합치기

```jsx
export function todoApp(previousState = {}, action) {
  return {
    todos: todos(previousState.todos, action),
    filter: filter(previousState.filter, action),
  };
}
```

<br/>

### combineReducers <a id="a8"></a>

>  리덕스에서 제공하는 combineReducers 사용

```jsx
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  todos,
  filter,
});
```

<br/>

### React에 적용하기 <a id="a7"></a>

- useEffect에서 리덕스 

  - 스토어가 변하는 것. (스토어의 state가 변하는게 아니다.)

  - cleanup 시점에 구독이 끊긴다.

```jsx
useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    setTodos(store.getState().todos);
  });

  return () => {
    unsubscribe();
  }
}, [store]);
```

<br/>

### react-redux 사용하기  <a id="a6"></a>

- `npm i react-redux`

- Provider 컴포넌트를 제공해준다.

- `connect` 함수를 통해 "컨테이너"를 만들어준다.
- 컨테이너는 스토어의 **state** 와 **dispatch(액션)** 를 연결한 컴포넌트에 props 로 넣어주는 역할을 한다.
  - 그렇다면 필요한 것은 ?
    - 어떤 state 를 어떤 props 에 연결할 것인지에 대한 정의
    - 어떤 dispatch(액션) 을 어떤 props 에 연결할 것인지에 대한 정의
    - 그 props 를 보낼 컴포넌트를 정의

<br/>

#### 간단 예제  <a id="a5"></a>

```jsx
// index.js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// App.js
import { connect } from 'react-redux';
```

- state가 방대해지면, 그 중에 이 컴포넌트에서 사용할 것만 사용하겠다고 설정을 해줘야 한다. (Provider)
- connect 설정
  1. connect(App, option);
  2. const fn = connect(option); fn(App);
  3. connect(option)(App);
- store의 state를 → App의 props로 변경
- store의 dispatch를 → App의 props로 변경

```jsx
const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => {
    dispatch(addTodo(text)); // App에서 호출할 때 넣어주므로 인자를 전달
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App); // 보낼 컴포넌트 설정.

// App 컴포넌트에서 인자로 todos와 addTodo를 받을 수 있다.
function App({ todos, addTodo }) {
```

<br/>

### Provider Component from react-redux <a id="a4"></a>

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

<br/>

### Consumer from react-redux <a id="a3"></a>

```jsx
import React, { useContext, useEffect, useState } from 'react';
import { ReactReduxContext } from 'react-redux';
import './App.css';
import { addTodo } from './actions';
import Button from './Button';

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <p>{JSON.stringify(this.props.todos)}</p>
          <Button add={this.props.add} />
        </header>
      </div>
    );
  }
}

import React from 'react';

export default function Button({ add }) {
  return <button onClick={() => add('hello')}>추가</button>;
}

// App 컨테이너
function AppContainer(props) {
  const { store } = useContext(ReactReduxContext);
  const [state, setState] = useState(store.getState());
  function add(text, dispatch) {
    console.log(text, dispatch);
    dispatch(addTodo(text));
  }
  useEffect(() => {
    const _unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      _unsubscribe();
    };
  });
  return (
    <App
      {...props}
      todos={state.todos}
      add={text => add(text, store.dispatch)}
    />
  );
}

export default AppContainer;
```

<br/>

### connect function from react-redux <a id="a2"></a>

````jsx
import React from 'react';
import './App.css';
import { addTodo } from './actions';
import { connect } from 'react-redux';
import Button from './Button';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{JSON.stringify(this.props.todos)}</p>
          <Button add={this.props.add} />
        </header>
      </div>
    );
  }
}

// mapStateToProps, mapDispatchToProps
const mapStateToProps = state => {
  return { todos: state.todos };
};

const mapDispatchToProps = dispatch => {
  return {
    add: text => {
      dispatch(addTodo(text));
    },
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
````

<br/>

#### HOC(connect)가 아닌 [hook](https://react-redux.js.org/api/hooks)을 사용한 Redux  <a id="a1"></a>

- props로 꽂히지 않음
  - `useSelector`를 사용하여 값을 가져온다.(mapStateToProps)

```jsx
const todos = useSelector(state => state.todos);
const loading = useSelector(state => state.loading);
```

- useDispatch를 통해 dispatch를 한다.

```jsx
const dispatch = useDispatch();
```