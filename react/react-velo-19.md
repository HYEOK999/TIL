![React19](https://user-images.githubusercontent.com/31315644/71559913-daae1180-2aa6-11ea-874c-b578ef8719e8.png)

------

## React with Velopert - 19 -

- [커스텀 Hooks 만들기](#a1)
  - 폴더 및 파일 생성
  - [커스텀 Hook 만들기 - useInputs.js](#a2)
    - useCallback 복습
  - [커스텀 Hook 불러오기 - App.js](#a3)
  - [커스텀 Hook에서 Reducer 사용하기 - useInputs.js](#a4)

<br/>

------

# Chap 19. 커스텀 Hooks 만들기

### 커스텀 Hooks 만들기 <a id="a1"></a>

컴포넌트를 만들다보면, 반복되는 로직이 자주 발생한다. 

예를 들어서 input 을 관리하는 코드는 관리 할 때마다 꽤나 비슷한 코드가 반복되죠.

이번에는 그러한 상황에 커스텀 Hooks 를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아보자.

<br/>

####폴더 및 파일 생성

src/hooks 디렉터리를 만들고, 그 안에 useInputs.js 라는 파일을 만들자.

- 커스텀 Hooks 를 만들 때, 보통 `use` 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다.
- 커스텀 Hooks 를 만드는 방법은 간단하다. 그냥, 그 안에서 `useState`, `useEffect`, `useReducer`, `useCallback` 등 Hooks 를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

<br/>

#### 커스텀 Hook 만들기 - useInputs.js <a id="a2"></a>

```jsx
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

##### useCallback 복습

`useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

```jsx
useCallback( fn , [deps] )
useCallback( () => {},[deps] )
```

`useCallback` 은 첫번째 파라미터로 함수를(호출X) 받고, 두번쨰 파라미터로 의존성 배열을 받는다.

<br/>

#### 커스텀 Hook 불러오기 - App.js <a id="a3"></a>

useReducer` 쪽에서 사용하는 `inputs` 를 없애고 이에 관련된 작업을 `useInputs` 를 대체해주자.

새로운 항목을 추가 할 때 input 값을 초기화해야 하므로 데이터 등록 후 `reset()` 을 호출해야한다.

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './src/hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  // inputs: {
  //   username: '',
  //   email: ''
  // }, // 제거
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
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   }; // 제거
    case 'CREATE_USER' :
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER' :
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? {...user, active: !user.active} : user
        )
      };
    case 'REMOVE_USER' :
      return {
        ...state,
        users : state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);


  const { users } = state;
  const [{ username, email}, onChange, reset] = useInputs({
    username: '',
    email: ''
  }); // 추가

  // const { username, email } = state.inputs;

  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []); //제거


  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset(); // 추가
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

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

<br/>

#### 커스텀 Hook에서 Reducer 사용하기 - useInputs.js <a id="a4"></a>

```jsx
import { useReducer, useCallback } from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_INPUT' :
      return {
        ...state,
        [action.name] : action.value
      }
    case 'RESET' :
      return Object.keys(state).reduce((acc,current) => {
        acc[current] = '';
        return acc;
      } ,{});
    default :
      return state;
  }
}

const useInputs = (initForm) => {
  const [form , dispatch] = useReducer(reducer, initForm);

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispatch({
      type : 'CHANGE_INPUT',
      name,
      value
    })
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type : 'RESET'
    })
  }, []);

  return [form, onChange, reset]
}

export default useInputs;
```

