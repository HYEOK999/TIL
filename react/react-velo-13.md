![React13](https://user-images.githubusercontent.com/31315644/71559907-d97ce480-2aa6-11ea-8998-c289da20762b.png)

------

## React with Velopert - 13 -

- 배열에 항목 수정하기
  
  - 예제 : User 컴포넌트에 계정명을 클릭했을 때 색상 바꾸기
  
    - [App.js](#a2)
  
    - [UserList.js](#a3)
  
  

<br/>

------

# Chap 13. 배열에 항목 수정하기

## 배열에 항목 수정하기

<br/>

### 예제 : User 컴포넌트에 계정명을 클릭했을 때 색상 바꾸기 <a id="a1"></a>

#### App.js

`onToggle` 함수를 만들어서 props로 뿌려준다. 여기서, 선택된 요소의 id값을 통해 User를 비교해야 하므로 map함수를 이용한다.

```jsx
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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
  
  const onToggle = id => { // 이부분 추가
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} /> // 이부분 추가
    </>
  );
}

export default App;
```

<br/>

#### UserList.js <a id="a2"></a>

그 다음에는 UserList 컴포넌트에서 `onToggle`를 받아와서 User 에게 전달해주고, `onRemove` 를 구현했었던것처럼 `onToggle` 에 `id` 를 넣어서 호출해주자. 

주의할 것은 태그내에 함수를 연결해줄때는 반드시 호출문이 아닌 함수 명만을 적어주어야한다는 것에 주의하자.

```jsx
import React from 'react';

function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button> 
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
```



