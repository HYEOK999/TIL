![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 08

- React에서 input 태그 value 와 defaultvalue 차이
- Redux
  - 리덕스 사용 이유
  - 카운터 실습
    - 폴더 구조
    - Actions 설정
      - src/actions/index.js
    - reducers 설정
      - 카운터 리듀서 설정하기
        - src/reducers/counter.js
      - reducers 합치기
        - src/reducers/index.js
    - App.js 설정
    - Counter.js 컴포넌트 구현
      - function mapStateToProps(state)
      - function mapDispatchToProps(dispatch)
      - connect(mapStateToProps, mapDispatchToProps)(Counter)
        - HOC
    - 정리
    - 실행 순서
- Redux Dev Tools

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- Redux
- Actions
- Reducers
- Provider
- mapStateToProps(state)
- mapDispatchToProps(dispatch)
- HOC
- Redux Dev Tools

<br/>

--------

### React에서 input 태그 value 와 defaultvalue 차이

기본 html에서 `<input id='test' value='hello'>` 라고 정의 했을 때, 여기에 'bye'라고 입력하여 value 값을 변경했다고 가정하자.

```javascript
// input 값을 hello -> bye 로 변환시
var test = document.querySelector('#test');
test.value // bye
test.getAttribute('value'); // hello 
```

`test.getAttribute('value');`를 찍었을 경우 초기값 `hello`가 나오게 된다.

<br/>

**반면에 리액트에서는 다음과 같은 상태를 유지한다.**

`value` : 항상 최신의 값

`defaultValue` : 변경되기 전 최초의 값

<br/>

## Redux

### 리덕스 사용 이유

컴포넌트 간의 데이터 교환의 필요성이 생김. 

따라서 리덕스라는 독립되어 있는 저장소(Redux)를 사용하기 위함.

리덕스는 순수함수를 지향하기 때문에 Reducer라는 함수를 통해 순수함수를 유지하고자 함.

스프레드 문법을 사용하여 기존의 상태를 유지한다.

<br/>

### 카운터 실습

#### 폴더구조

<img src="https://user-images.githubusercontent.com/31315644/71091816-3b0c9b80-21e9-11ea-881d-70b696d9bd1d.jpeg" alt="redux 폴더 구조" style="zoom:50%;" />

#### Actions 설정

> 은행으로 가정했을 경우 입금명세표 등 할 일을 적어놓는 역할을 하는 Actions을 작성한다.

App.js에서 실제로 사용하는 것은 리듀서가 아닌 리액트이다.

##### src/actions/index.js

```javascript
// 리듀서에서 사용하기 위함.
export const ADD = 'ADD';

// 함수자체는 Action Creator, 실제로 사용하는 건 reducer가 아니라 특정 컴포넌트다. (예제 : counter)
export function add(val) {
  return ({ type : ADD, val }) // { type ~~~~~~ }가 Action.
}
```

`export const ADD = 'ADD';`는 Reducer에서 사용하기 위함이다. 이와같이 따로 export를 해두고 정의를 해주는 이유는 유지보수를 편하게 하기 위함이다.

예를들어 `ADD` 가 변경될 경우 모든 곳에서 변경한다면 정말로 불편할 것이다. 따라서 action에서 정의만 바꿔주면 쉽게 유지보수할 수 있다.

<br/>

#### reducers 설정

> 은행으로 가정했을 경우 Actions(입금 명세표)를 받아 일을 처리할 은행직원인 Reducers를 작성한다.

<br/>

##### 카운터 리듀서 설정하기

###### src/reducers/counter.js

본격적으로 액션을 받아 데이터를 처리하는 카운팅 리듀서를 설정한다.

```jsx
import { ADD } from '../actions' // 액션을 받아옴.

const INITIAL_STATE = {
  count: 0, // 초기값
}

export default function counter(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD :
      return {
        ...state,
        count: state.count + action.val
      } 
    default:
      return state;
  }
}
```

특정 컴포넌트에서 `dispatch` 를 보내 받을 카운터 리듀서를 설정한다.

<br/>

##### reducers 합치기

###### src/reducers/index.js

Reducers를 통합적으로 사용하기 위해 하나의 리듀서로 묶어서 사용한다. 즉, 통합된 리듀서들을 export해주기 위함이다.

Reducers마다 불러내는 것을 방지하기 위해서 사용한다.

```jsx
import { combineReducers } from 'redux'

import counter from './counter'
// import video from './video'

// 리듀서가 통합된다.
export default combineReducers({
  counter, // 리듀서명
})
```

`combineReducers`은 redux에서 제공된다. 

리듀서들을 모아 하나의 리듀서로 통합시킨다.

<br/>

#### App.js 설정

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import Counter from './Counter';

function App() {
  return (
    <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <Counter />
    </Provider>
  );
}

export default App;
```

우선 Redux를 사용하기 앞서 Redux를 사용하기 위해 명시를 해주어야 한다. 

`import { Provider } from 'react-redux';`
`import { createStore } from 'redux';`

`Provider`는 하위 컴포넌트에게 Redux의 단일 저장소 store와 dispatch를 사용할 수 있게 해주는 `react-redux`라이브러리의 모듈이다. 

그리고 `redux`에서 제공하는 `createStore`함수를 통해 단일 저장소(Store)를 만들고 Store에 접근하기 위한 리듀서를 명시해준다. (은행으로 치면 통장개설)

```javascript
 createStore(
   리듀서명, 
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 )
```

2번째 인자는 크롬 개발자도구의 Redux Dev Tools를 사용하기 위해 반드시 넣어줘야 한다.

리듀서 명은 위에서 설정한 합쳐놓은 리듀서를 `import`하면 된다. ( 다른 리듀서를 해도 되지만, 유지보수가 힘듬 )

통합된 리듀서는 다음과 같이 `import`한다.

`import reducers from './reducers';`

reducers는 폴더명 이므로 자동으로 index.js를 가지고 온다.

마지막으로 실제로 구현할 `Counter.js`를 `import`하고 `<Provider>`태그 사이에 넣는다.

<br/>

#### Counter.js 컴포넌트 구현

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import { add } from './actions'

const Counter = (props) => {

  return (
    <div>
      {/* <button onClick={() => props.dispatch.add(1)}> + </button> */}
      {/* 위와 같이 적을 필요가 없다. 밑에서 함수로 props에게 전달해주었기 때문 */}
      <button onClick={() => props.add(1)}> + </button>
      { props.count }
      <button onClick={() => props.add(-1)}> - </button>
    </div>
  );
}

// 리덕스에 접근하기 위해서 사용한다.
// 리덕스 안에 있는 데이터를 Props로 맵핑해주는 함수.
// state는 Provider가 내려줌.
function mapStateToProps(state) {
  return {
    // state.리듀서명.해당변수
    // state : 리덕스의 state , counter : 리듀서(은행직원 이름), count : 변수
    count : state.counter.count
    // 여기서 선언한 count는 위에 있는 props.count와 동일해야한다.
    // 즉, countaa = state.counter.count = props.countaa
  }
}

// dispatch는 Provider가 내려줌.
// 리덕스의 dispatch는 원래 액션이 리듀서에게
// 전달하기 위해 store.dispatch({type: ~~~~})라고 적어야하는데
// 이 과정이 불편하기 때문에
// 리액트에서 편리하게 디스패치를 실행하는것처럼 보여주는 함수.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ // bindActionCreators : 액션크리에이터를 여기에 나열해준다.
    // ++ actions의 add함수가 여기에 바인딩 되어야한다.
    add
  }, dispatch)
}

// 순서중요 connect(mapStateToProps, mapDispatchToProps)(상태 전달 컴포넌트)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

리액트의 컴포넌트는 기본적으로 하위 컴포넌트들에게 `props` 외에는 다른 것을 전달해줄 수 없다.

따라서, 특정 방법을 이용해 상위 컴포넌트로부터 props 외의 데이터를 받아먄한다. 

`App.js`에서 설정했던 `<Provider>`는 하위 컴포넌트에게 `dispatch` 와 `state(단일 - 복합리듀서)`를 전달 해준다.

2개의 데이터를 전달 받아 사용하려면 아래처럼 2개의 함수를 정의하도록 하자. (커스텀이지만 기본적으로 이렇게 쓰인다.)

<br/>

##### function mapStateToProps(state)

→ Provider, Redux의 스토어에 저장되어있는 상태들, 프로퍼티를 컴포넌트의 props로 전달해주기 위한 함수.

```jsx
function mapStateToProps(state) {
  return {
    // state.리듀서명.해당변수
    // state : 리덕스의 state , counter : 리듀서(은행직원 이름), count : 변수
    count : state.counter.count
    // 여기서 선언한 count는 위에 있는 props.count와 동일해야한다.
    // 즉, countaa 는 state.counter.count = props.countaa
  }
}
```

<br/>

##### function mapDispatchToProps(dispatch)

→ Provider, Redux에서 사용되는 Action(상태를 변화시키기 위한 명세-함수)를 컴포넌트의 props로 전달해주기 위한 함수

→ 리액트에서 편리하게 `dispatch` 할 수 있도록 지원해주는 함수다. (원래는 store.dispatch~~)

→ `bindActionCreators({ 액션크레이어터명 }, dispatch)` 해당 액션크리에이터를 dispatch를 통해 리듀서에게 넘겨준다.

```jsx
// 리덕스의 dispatch는 원래 액션이 리듀서에게 전달하기 위해 store.dispatch({type: ~~~~})라고 적어야하는데 이 과정이 불편하기 때문에 리액트에서 편리하게 디스패치를 실행하는것처럼 보여주는 함수.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ // bindActionCreators : 액션 크리에이터를 여기에 나열해준다.
    // ++ actions의 add함수가 여기에 바인딩 되어야한다.
    add
  }, dispatch)
} // dispatch는 Provider가 내려주었다.

```

<br/>

##### connect(mapStateToProps, mapDispatchToProps)(Counter)

위 2개의 함수 를 `connect()`에 인자로 차례대로 정의하면 props에 `state` 와 `dispatch`로 내린 함수(`add`)를 가질수 있게 된다. 즉, `connect`함수 최초 실행 시 두 인자를 통해 리턴된 결과물로 Counter를 실행시켜 최종값을 리턴한다.

````javascript
// 순서중요 connect(mapStateToProps, mapDispatchToProps)(상태 전달 컴포넌트)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

````

위와 같이 작성이 완료되고 `npm start` 를 해보면 작동이 될 것이다.

<br/>

###### HOC

위 `connect()` 함수가 어색하게 느껴질 수 있다.

이는 HOC에 대한 이해가 필요하다.

이러한 느낌이다.

```javascript
// HOC
const getDiscount = rate => price => (1 - rate) * price;
getDiscount(0.1)(1000);

const getDistcount = function (rate) {
  return function (price) {
    return (1 - rate) * price
  }
}
// 첫 리턴은 rate를 받아 price => (1 - 0.1) * price을 실행한다.
// 2번째 리턴에서 price에 1000 이므로 리턴되는 값은 (1 - 0.1) * 1000

```

<br/>

#### 정리 

`<Provider store='store={createStore(reducers)'>`하는 역할 

- Redux의 단일 저장소(store)를 정의한다. (은행 통장을 개설한다.)
- 하위 컴포넌트에게 `dispatch` , `state`(reducers에서 combineReducers로 합쳐진 단일 state)를 뿌려준다.