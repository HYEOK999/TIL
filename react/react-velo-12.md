![React11](https://user-images.githubusercontent.com/31315644/71559905-d8e44e00-2aa6-11ea-8e02-c5675c78f523.png)

------

## React with Velopert - 11 -

- 배열에 항목 추가하기

  - 예제 : 배열에 새로운 항목을 추가하기

    - [새로운 컴포넌트 작성 : CreateUser.js](#a0)
  - 상태관리 추가 : App.js
      - [1차 최종 코드 : App.js](#a1)
  
    - [배열 상태관리 추가 : App.js](#a2)
      1. [Spread 연산자 이용 최종 코드: App.js](#a3)
      2. [concat 함수 이용 최종 코드: App.js](#a4)

<br/>

------

# Chap 11. 배열에 항목 추가하기

## 배열에 항목 추가하기

<br/>

배열에 새로운 항목을 추가하는 방법에 대해서 알아보자.

우선 src폴더에 `input` 와 `button` 이 하나루 이루어진 컴포넌트, `CreateUser.js` 를 만들어보자. 

<br/>

### 예제 : 배열에 새로운 항목을 추가하기

#### 새로운 컴포넌트 작성 : CreateUser.js <a id="a0"></a>

```jsx
import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
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
}

export default CreateUser;
```

이번에는 상태 관리를 `CreateUser` 에서 하지 않고 부모 컴포넌트인 App에서 하게 하고, input 의 값 및 이벤트로 등록할 함수들을 props로 넘겨받아서 사용하도록 하자.

<br/>

#### 상태관리 추가 : App.js

먼저 App.js에서 상태를 관리해주기 위해서 `useState` Hook을 사용하도록 한다.

```javascript
import React, { useState ,useRef } from 'react';
```

<br/>

추가로 `function App()` 내부에 `CreateUser` 컴포넌트에게 넘겨줄 상태 변수들을 정의하구 값을 할당한다.

```javascript
// 상태 설정
const [inputs, setInputs] = useState({
  username: '',
  email: ''
});
  
const { username, email } = inputs; // 객체 비구조화(디스트럭처링) 할당
const onChange = e => {
  const { name, value } = e.target;
  setInputs({
    ...inputs,
    [name]: value
  });
}; 
```

<br/>

여기에 등록 버튼이 눌릴 경우 `input` 박스들을 비워주는 초기화 작업을 해주어야 하기 때문에 onCreate 내부에 상태를 관리함수를 추가한다.

```javascript
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1; // current : 5
  };
```

<br/>

##### 1차 최종 소스 : App.js  <a id="a1"></a>

마지막으로  `return`에 CreateUser 컴포넌트를 작성해주고 지금까지 작성한 상태와 함수들을 속성으로 전달한다.

```jsx
import React, { useState ,useRef } from 'react';
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
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

  const nextId = useRef(4); // current : 4
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...

    nextId.current += 1; // current : 5
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />;
    </>
  )
}

export default App;
```

<br/>

#### 배열 상태관리 추가 : App.js   <a id="a2"></a>

```jsx
  const users = [ // 이부분을 아래처럼 수정 하기
    
  const [users, setUsers] = useState([  // useState로 관리시작
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);
```

배열의 변화를 주기 위해서 상태로 관리하기 시작한다.

배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다. 

그렇기 때문에, 배열의 `push`, `splice`, `sort` 등의 함수를 사용하면 안된다. 만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야한다.

**불변성을 지키면서 배열에 새 항목을 추가 할 때에는 spread 연산자를 사용하거나, `concat` 함수를 사용하면 된다.**

<br/>

##### 1. Spread 연산자 이용 최종 코드: App.js  <a id="a3"></a>

```jsx
import React, { useState, useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4); // current : 4
  const onCreate = () => {
    const user = { // 이부분 추가
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]); // spread를 이용하여 기존의 users 데이터와 함꼐 추가하고 있다.

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1; // current : 5
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  )
}

export default App;
```

<br/>

##### 2. concat 함수 이용 최종 코드: App.js  <a id="a4"></a>

````jsx
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
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {  // 이부분 추가
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));  // 기존의 users데이터에 함수를 덮붙이는 기능을 하는 concat함수를 이용했다.

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
````

<br/>

