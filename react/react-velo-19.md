![React18](https://user-images.githubusercontent.com/31315644/71559912-da157b00-2aa6-11ea-9b83-229223f06ff3.png)

------

## React with Velopert - 18 -

- [useReducer 이해하기](#a1)
  - [reducer 란?](#a2)
  - [useReducer 사용 방법](#a3)
    - [useReducer 파라미터](#a4)
- [연습 : Counter.js](#a5)
- [App 컴포넌트를 useReducer로 구현하기 ( App.js )](#a6)
  1. [초기값 설정, useReducer 변수(비구조화) 할당, rudecer 만들기](#a7)
  2. [onChange 구현 ( App.js )](#a8)
  3. [onCreate 구현 ( App.js )](#a9)
  4. [onToggle 과 onRemove 구현 ( App.js )](#a10)
  5. [활성 사용자 수 구현 ( App.js )](#a11)
- [useReducer vs useState](#a12)

<br/>

------

# Chap 18. useReducer 를 사용하여 상태 업데이트 로직 분리하기

### useReducer 이해하기 <a id="a1"></a>

이전에 만든 사용자 리스트 기능에서의 주요 상태 업데이트 로직은 App 컴포넌트 내부에서 이루어졌다.

상태를 업데이트 할 때에는 `useState`를 사용해서 새로운 상태를 설정하고, 상태를 관리하게 될 때는 `useState`를 사용하는 것 말고는 다른 방법이 없었다. 여기서 상태를 관리하는 추가적인 방법이 바로 `useReducer`이다.

이 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다. 

상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있다.

<br/>

#### reducer 란? <a id="a2"></a>

>  reducer 는 현재 상태와 Action 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수.

```javascript
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다.

여기서 `action` 은 업데이트를 위한 정보를 가지고 있다. 
주로 `type` 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 따로 없다.

action의 객체의 형태는 자유이다. `type`값을 대문자와 `_`로 구성하는 케이스가 존재하긴 하지만, 필수는 아니다.

다음은 action의 예시이다.

```javascript
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

<br/>

#### useReducer 사용 방법 <a id="a3"></a>

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
- `state` : 앞으로 컴포넌트에서 사용 할 수 있는 상태
- `dispatch`는 action을 발생시키는 함수

이 함수는 다음과 같이 사용할 수 있다. 

```jsx
dispatch({ type: 'INCREMENT' })
```

##### useReducer 파라미터  <a id="a4"></a>

- 첫번째 파라미터는 reducer 함수
- 두번째 파라미터는 초기 상태

<br/>

### 연습 : Counter.js <a id="a5"></a>

먼저 바로 App.js에 적용하지 않고 Counter.js 에 적용해보자.

**기존의 Counter.js** 

```jsx
import React, {useState} from 'react'

const Counter = (props) => {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(preveNumber => preveNumber + 1);
  }

  const onDecrease = () => {
    setNumber(preveNumber => preveNumber - 1);
  }

  return (
    <div>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <h1>{number}</h1>
    </div>
  );
}

export default Counter;
```

<br/>

**Reducer를 적용한 Counter.js** 

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

<br/>

### App 컴포넌트를 useReducer로 구현하기 ( App.js )  <a id="a6"></a>

App 컴포넌트에 있던 상태 업데이트 로직들을 `useState` 가 아닌 `useReducer` 를 사용하여 구현해보자. 

우선, App 에서 사용 할 초기 상태를 컴포넌트 바깥으로 분리해주고, App 내부의 로직들을 모두 제거해야한다. 

<br/>

#### 1. 초기값 설정, useReducer 변수(비구조화) 할당, rudecer 만들기. <a id="a7"></a>

```jsx
import React, { useReducer, useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;
  
  return (
    <>
      <CreateUser />
      <UserList users={[]} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

<br/>

#### 2. onChange 구현 ( App.js )  <a id="a8"></a>

 `App()` 함수내부에 `onChange`이벤트와 action을 작성한다. 변화 되는 value 값과 선택된 input 박스 name을 비구조화 할당하여 변수로 만들고 dispatch를 통해 리듀서에게 전달한다.

 리듀서에서는 `CHANGE_INPUT` 이라는 action 객체를 사용하여 `inputs` 상태를 업데이트해주었다. `reducer` 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 위 형태와 같이 `spread` 연산자를 사용해주었다.

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) { // 추가
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {  // 추가
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} /> // 추가
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

<br/>

#### 3. onCreate 구현 ( App.js )  <a id="a9"></a>

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER': // 추가
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => { // cㅜ가
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  return (
    <>
      <CreateUser  // 추가
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

여기까지 진행했으면 수정 및 데이터 등록이 잘 될 것이다.

<br/>

#### 4. onToggle 과 onRemove 구현 ( App.js )  <a id="a10"></a>

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER': // 추가
      return { 
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER': // 추가
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4); // 추가

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => { // 추가
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => { // 추가
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> // 추가
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

<br/>

#### 5. 활성 사용자 수 구현 ( App.js )  <a id="a11"></a>

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => { 
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]); // 추가
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div> // 변경
    </>
  );
}

export default App;
```

여기까지 완료 시 모든 기능들이 `useReducer` 를 사용하여 구현되었다.

<br/>

### useReducer vs useState   <a id="a12"></a>

> 어떨 때 `useReducer` 를 쓰고 어떨 때 `useState` 를 써야 하는가? 

정해진 답은 없다. 어떤 것을 사용하든 상황에 따라 불편할 때 도 있고 편할 때도 있다.

예를 들어서 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면 확실히 `useState` 로 관리하는게 편할 것이다.

```javascript
const [value, setValue] = useState(true);
```

하지만, 만약에 컴포넌트에서 관리하는 값이 여러개가 되어서 상태의 구조가 복잡해진다면 `useReducer`로 관리하는 것이 편해질 수도 있다.

따라서 `useState`, `useReducer` 를 자주 사용해보고 맘에 드는 방식을 선택한다.

`setter(setState)` 를 한 함수에서 여러번 사용해야 하는 일이 발생한다면 그 때부터 `useReducer` 를 쓸까? 에 대한 고민을 시작해보 것도 좋을 것이다.

```javascript
// setter를 여러번 이용한 예제
setUsers(users => users.concat(user));
setInputs({
  username: '',
  email: ''
});
```

`useReducer` 를 썼을때 편해질 것 같으면 `useReducer` 를 쓰고, 딱히 그럴것같지 않으면 `useState` 를 유지하면 된다.

<br/>