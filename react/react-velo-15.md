![React15](https://user-images.githubusercontent.com/31315644/71559909-d97ce480-2aa6-11ea-942a-f5b6aa005bc3.png)

------

## React with Velopert - 15 -

- useMemo 연산한 값 재사용하기
  - [useMemo 사용 규칙](#a1)
    - App.js
  - [useMemo 사용하기](#a2)
    - App.js 전체 코드

<br/>

------

# Chap 15. useMemo 연산한 값 재사용하기

## useMemo 연산한 값 재사용하기

> 성능 최적화를 위하여 연산된 값을 `useMemo`라는 Hook 을 사용하여 재사용하는 방법을 알아보도록 하자.

<br/>

### useMemo 연산한 값 재사용하기 <a id="a1"></a>

이번에는 성능 최적화를 위하여 연산된 값을 `useMemo`라는 Hook 을 사용하여 재사용하는 방법을 알아보도록 하자.

App 컴포넌트에서 다음과 같이 `countActiveUsers` 라는 함수를 만들어서, `active` 값이 `true` 인 사용자의 수를 세어서 화면에 렌더링 해보자.

<br/>

### useMemo 사용 규칙 <a id="a1"></a>

- 첫번째 파라미터 - 어떻게 연산할지 정의하는 함수를 넣어준다.
- 두번째 파라미터 - deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

```jsx
useMemo( fn , [deps] )
useMemo( () => {},[deps] )
```

<br/>

#### App.js

```jsx
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) { // 추가
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
} 

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  
  const count = countActiveUsers(users); // 추가
  
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div> // 추가
    </>
  );
}

export default App;
```

위 코드의 문제점은, 활성 사용자 수를 세는건 users 에 변화가 있을때만 세야되는건데, `input` 값이 바뀔 때에도 컴포넌트가 리렌더링 되므로 불필요 할 때에도 호출하여서 자원이 낭비되고 있다.

왜 이런 현상이 벌어지는 걸까? 이유는 `input` 박스에 내용을 작성할 경우 `input`태그의 `value`값이 바뀌고 바뀐 값을 토대로 리액트는 컴포넌트의 변화에 의해 화면을 리렌더링하게 된다.  이러한 현상은 불필요하고 또 자원을 낭비하게 된다.

이러한 상황에는 `useMemo` 라는 Hook 함수를 사용하면 성능을 최적화 할 수 있다.

<br/>

### useMemo 사용하기  <a id="a2"></a>

count 변수 할당 부분을 아래처럼 변경해보자.

Memo 는 "memoized" 를 의미하는데, 이는, 이전에 계산 한 값을 재사용한다는 의미를 가지고 있다.

명심해야 할 것은 useMemo는 **계산 한 값** 이라는 것이다.

```javascript
const count = useMemo(() => countActiveUsers(users), [users]);
```

<br/>

#### App.js 전체 코드

```jsx
import React, { useRef, useState, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  const count = useMemo(() => countActiveUsers(users), [users]); // 변경
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

<br/>

