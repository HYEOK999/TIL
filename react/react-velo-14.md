![React14](https://user-images.githubusercontent.com/31315644/71559908-d97ce480-2aa6-11ea-94f6-b99d87a3fbc3.png)

------

## React with Velopert - 14 -

- useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
  
  - useEffect 작업 설정
    - [useEffect 를 사용 규칙](#a1)
      - [주로 사용되는 부분](#a2)
    - [마운트/언마운트](#a3)
      - UserList.js
    - [deps 에 특정 값 넣기](#a4)
    - [deps 파라미터를 생략하기](#a5)
  

<br/>

------

# Chap 14. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

## useEffect 작업 설정

>  useEffect 라는 Hook 을 사용하여 
>
>  컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 
>
>  컴포넌트가 언마운트 됐을 때 (사라질 때), 
>
>  컴포넌트를 업데이트 될 때 (특정 props가 바뀔 때) 
>
>  특정 작업을 처리할 수 있다.

<br/>

### useEffect 사용 규칙 <a id="a1"></a>

- 첫번째 파라미터 - 함수 

- 두번째 파라미터 - 의존값이 들어있는 배열 (`deps`) 

  ( 만약에 `deps` 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 `useEffect` 에 등록한 함수가 호출됨. )

`useEffect` 에서는 함수를 반환 할 수 있는데 이를 `cleanup` 함수라고 부른다.
`deps` 가 비어있는 경우에는 컴포넌트가 사라질 때 `cleanup` 함수가 호출된다.

```jsx
useEffect(() => {
  effect // ComponentDidMount
  return () => {  // 리턴 명시하는 함수가 ComponentWillUnMount
    cleanup
  };
}, [deps]) // ComponentDidUpdate 할 조건, 빈배열[] 시 1번만 실행, 생략시 모든 조건(All true)
```

<br/>

#### 주로 사용되는 부분 <a id="a2"></a>

- `effect` : UI가 렌더링 된 이후에 일어날 일들을 정의한다.
  주로 props => state / REST API / D3 , Video.js / setInterval , setTimeout 등등
- cleanup` : 컴포넌트가 사라지면서 언마운트 되면서 해야할 일들을 정의한다.
  주로 clearInterval, clearTimeout , 라이브러리 인스턴스 제거 등등` 
- `deps` :  `deps` 부분은 `effect`부분에서 조회나 사용하고 있는 상태가 존재한다면 이부분에 명시를 해주는 것이 규칙이다.

<br/>

### 마운트/언마운트 <a id="a3"></a>

#### UserList.js

```jsx
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => { // 이부분 작성
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
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

export default UserList;
```

<br/>

주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있다.

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

그리고 언마운트 시에 하는 작업들은 다음과 같은 사항이 있다.

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

<br/>

### deps 에 특정 값 넣기 <a id="a4"></a>

이번에는 deps 에 특정 값을 넣어보도록 하자. 

deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다. 

그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 된다.

```jsx
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
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

export default UserList;
```

`useEffect` 안에서 사용하는 상태나, props 가 있다면, `useEffect` 의 `deps` 에 넣어주어야 한다. 

약 `useEffect` 안에서 사용하는 상태나 props 를 `deps` 에 넣지 않게 된다면 `useEffect` 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 된다.

<br/>

### deps 파라미터를 생략하기 <a id="a5"></a>

`deps` 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출 된다.

```jsx
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);
  });
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

export default UserList;
```

리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링이 된다. ( 바뀐 내용이 없어도 )

실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당된다. 하지만, Virtual DOM 에는 모든걸 다 렌더링하고 있다는 것이다. 이는 불필요한 리소스를 게속적으로 사용하게 되는 것이므로 추후에 최적화를 하는것으로 이 부분을 메꿔야만 한다.