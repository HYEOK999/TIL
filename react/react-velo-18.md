![React17](https://user-images.githubusercontent.com/31315644/71559911-da157b00-2aa6-11ea-9426-96cf77fb95b8.png)

------

## React with Velopert - 17 -

- React.memo 를 사용한 컴포넌트 리렌더링 방지
  - [CreateUser.js](#a1)
  - [UserList.js](#a2)
  - [함수형 업데이트](#a3)
    - [기본 파라미터 방식](#a4)
    - [함수형 업데이트 방식](#a5)
    - [App.js](#a6)

<br/>

------

# Chap 17. React.memo 를 사용한 컴포넌트 리렌더링 방지

> 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 React.memo 라는 함수에 대해서 알아본다.

**React.memo를 사용하면 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.**

사용법은 굉장히 쉽다. 그냥, 감싸주면 된다.

<br/>

### CreateUser.js <a id="a1"></a>

```jsx
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser); // 추가
```

<br/>

### UserList.js <a id="a2"></a>

```jsx
import React, { useEffect } from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) { // 추가
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick = {() => onToggle(user.id)}
        >
        {user.username}
      </b>

      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}> 삭제 </button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default React.Memo(UserList); // 추가
```

<br/>

### 함수형 업데이트  <a id="a3"></a>

여기까지 적용이 완료되면 `input`박스의 내용을 추가하거나 수정해도 UserList가 리렌더링 되지 않는다.(오직 Input박스만 리렌더링)

하지만, 추가적인 문제로는 User 중 하나라도 수정(user.active 변경)이 된다면 모든 User들이 리렌더링 되고 CreateUser도 리렌더링 된다는것이다. 

**왜 리렌더링이 될까?** 그 이유는 아래처럼 `useCallback`을 사용할 때 2번째 파라미터로 넣어준 의존성 배열 `deps` 에 `users` 가 들어가 있기 때문이다. `users` 중 1개라도 변경이 된다면 `onCreate`, `onToggle`, `onRemove` 가 새로 만들어지므로 전부 리렌더링 되는 것이다.

```javascript
const onCreate = useCallback(() => {
...
}, [users, username, email]);

const onRemove = useCallback(
id => { ...
},  [users]);

const onToggle = useCallback(
id => { ...
},  [users]);
```

<br/>

**이 부분에서 사용할 수 있는 것이 바로 함수형 업데이트 이다.**

예전(useState)를 잠깐 배웠을 때를 생각해보자.

#### 기본 파라미터 방식  <a id="a4"></a>

````jsx
const [number, setNumber] = useState(0);

const onIncrease = () => { setNumber(number + 1); }
const onDecrease = () => { setNumber(number - 1); }
````

<br/>

#### 함수형 업데이트 방식  <a id="a5"></a>

```jsx
const [number, setNumber] = useState(0);

const onIncrease = () => { setNumber(prevNumber => prevNumber + 1); }
const onDecrease = () => { setNumber(prevNumber => prevNumber - 1); }
```

<br/>

함수형 업데이트를 하게 되면, `setUsers` 에 등록하는 콜백함수의 파라미터에서 최신 `users` 를 참조 할 수 있기 때문에 `deps` 에 `users` 를 넣지 않아도 된다. ( onChange 의 경우엔 함수형 업데이트를 해도 영향은 가지 않는다 ).

<br/>

#### App.js  <a id="a6"></a>

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
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);
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
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users => users.filter(user => user.id !== id));
  }, []);
  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
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

여기까지 완료하면, 해당 항목만 리렌더링 될 것이다.

`deps`에 users를 넣었을 때는 users 값이 변경될 때 마다 함수가 재선언되어서 props가 변경되었다고 CreateUser 컴포넌트가 인지를 했기에 리렌더링이 되었었다. 

하지만 함수형 업데이트를 사용할 경우 users의 최신값이 보존되기 때문에 `deps`엔 따로 안넣어도 되니 함수가 재선언되지 않고 CreateUser 컴포넌트가 props가 변경되었다고 인지를 못한다. 

UserList와 User 컴포넌트는 users가 변함을 인지하고 리렌더링 되는 것이다.

<br/>

리액트 개발을 할 때, `useCallback`, `useMemo`, `React.memo` 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 진행하자.

예를 들어서, User 컴포넌트에 `b` 와 `button` 에 `onClick` 으로 설정해준 함수들은, 해당 함수들을 `useCallback` 으로 재사용한다고 해서 리렌더링을 막을 수 있는것은 아니다.

추가적으로, 렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용하자. React.memo 에서 두번째 파라미터에 `propsAreEqual` 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능하다.

```javascript
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
```

하지만, 이걸 잘못사용한다면 오히려 의도치 않은 버그들이 발생하기 쉽다. 예를 들어, 함수형 업데이트로 전환을 안했는데 이렇게 users 만 비교를 하게 된다면, `onToggle` 과 `onRemove` 에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있다.