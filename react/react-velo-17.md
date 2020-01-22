![React16](https://user-images.githubusercontent.com/31315644/71559910-da157b00-2aa6-11ea-9b75-78ad46142a30.png)

------

## React with Velopert - 16 -

- useCallback 을 사용하여 함수 재사용하기
  - [useCallback 사용 규칙](#a1)
    - 주의 할 점
  - [App.js](#a2)

<br/>

------

# Chap 16. useCallback 을 사용하여 함수 재사용하기

## useCallback 을 사용하여 함수 재사용하기

> `useMemo` 는 특정 결과 값을 재사용 할 때 사용하는 반면, `useCallback` 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

<br/>

### useCallback 사용 규칙 <a id="a1"></a>

useCallback은 결과 값이 아니라 함수를 반환한다는 것을 잊지말자.

- 첫번째 파라미터 - 어떻게 연산할지 정의하는 함수를 넣어준다.
- 두번째 파라미터 - deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

##### 주의 할 점

함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, `deps` 배열안에 포함시켜야 된다는 것.
만약에 `deps` 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없다. props 로 받아온 함수가 있다면, 이 또한 `deps` 에  넣어야 한다.

```javascript
useCallback( fn , [deps] )
useCallback( () => {},[deps] )
```

<br/>

`useCallback`은 사실 `useMemo`를 기반으로 만들어져서 `useMemo`를 다음과 같이 쓸 경우 `useCallback`과 동일한 역할을 한다.

```jsx
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);
```

<br/>

예전에 App.js에서 작성했던  `onCreate`, `onRemove`, `onToggle` 함수를 확인해보자.

```javascript
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
```

  위 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어진다. 

함수를 선언하는 것 자체는 사실 메모리도, CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만, 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 중요하다.

그 이유는, 나중에 컴포넌트에서 `props` 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 할텐데, 이 작업을 하려면, 함수를 재사용하는것이 필수다.

<br/>

### App.js <a id="a2"></a>

useCallback 을 추가해보자 각각 `onChange` , `onCreate`, `onRemove`, `onToggle` 에 추가하면 된다.

```jsx
import React, { useRef, useState, useMemo, useCallback } from 'react';
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
  const onChange = useCallback( // useCallback 추가
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );
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
  const onCreate = useCallback(() => { // useCallback 추가
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
  }, [users, username, email]);

  const onRemove = useCallback( // useCallback 추가
    id => {
      setUsers(users.filter(user => user.id !== id));
    },
    [users]
  );
  
  const onToggle = useCallback( // useCallback 추가
    id => {
      setUsers(
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );
  
  const count = useMemo(() => countActiveUsers(users), [users]);
  
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