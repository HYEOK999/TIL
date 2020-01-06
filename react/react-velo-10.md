![React09](https://user-images.githubusercontent.com/31315644/71559903-d8e44e00-2aa6-11ea-8bce-7cd5289f492d.png)

------

## React with Velopert - 09 -

- 배열 렌더링하기
  - [기본 배열 렌더링](#a1)
    - UserList.js
  - [map 함수를 이용한 배열 렌더링](#a2)
    - UserList.js
    - key 추가하기
  - [key의 존재유무에 따른 업데이트 방식](#a3)
    - [key가 없을 시](#a4)
    - [key가 존재할 시](#a5)

<br/>

------

# Chap 9. 배열 렌더링하기

## 배열 렌더링하기

<br/>

다음과 같은 배열이 있다고 가정해보자.

```javascript
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
```

위 배열을 렌더링하려면 가장 단순한 것은 그대로 코드를 작성하는 것인데...

UserList.js

```jsx
import React from 'react';

function UserList() {
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
  return (
    <div>
      <div>
        <b>{users[0].username}</b> <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b> <span>({users[1].email})</span>
      </div>
    </div>
  );
}

export default UserList;
```

위와 같은 방법은 너무 중복된 코드가 많으므로 컴포넌트를 이용해 재사용 해보도록 하겠다.

<br/>

### 기본 배열 렌더링  <a id="a1"></a>

#### UserList.js

```jsx
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
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

  return (
    <div>
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    </div>
  );
}

export default UserList;
```

위와 같은 방식은 배열이 항상 고정적일 경우 나쁘지 않을 수도 있다. 하지만 배열이 수시로 늘어나고 적어짐에 따라 개발자는 배열이 늘어남과 동시에 수정할 곳이 늘어나는데 즉 유지보수성이 안 좋을 뿐더러 실수를 유발하는 원인이 될 수도 있고 실사용에서 이러한 실수는 치명적인 문제로 남을 수 있다.

따라서, 동적인 배열을 렌더링할 때는 다음 방법을 이용해보도록 한다.

<br/>

### map 함수를 이용한 배열 렌더링 <a id="a2"></a>

#### UserList.js

동적인 배열을 렌더링하고자 할 때는 `map()`를 이용하도록 한다.

```jsx
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
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

  return (
    <div>
      {users.map(user => (
        <User user={user} />
      ))}
    </div>
  );
}

export default UserList;
```

<img src="https://user-images.githubusercontent.com/31315644/71560380-7f7f1d80-2aac-11ea-809e-feab8f927b4f.jpeg" alt="결과" style="zoom:50%;" />

<br/>

#### key 추가하기

React에서 배열을 렌더링 할 때는 `key`라는 props를 상위 태그에 설정해주어야 한다.

`key`를 설정 안해줄 경우 렌더링시 경고를 띄우기도 하고 실제로 정렬시 문제를 일으킬 수도 있기 때문에 설정 해주는 것이 중요하다. 

`key` 값은 각 원소들마다 가지고 있는 고유값으로 설정을 해야한다. 

지금의 경우엔 `id` 가 고유 값으로 사용할 수 있는데 이를 위한 모듈도 존재한다.(`uuid`) 

단, 자바스크립트가 지원하는 빌트인 함수인 렌더함수는 이용하면 안된다. 렌더함수는 고유값을 배포하는게 아니기 때문에 안전성면에서 약간 떨어지기 때문이다.

```jsx
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
```

만약에 배열을 렌더링 할 때 `key` 설정을 하지 않게된다면 기본적으로 배열의 `index` 값을 `key` 로 사용하게 되고, 콘솔창에 경고 메시지가 뜨게 된다.

<br/>

### key의 존재유무에 따른 업데이트 방식 <a id="a3"></a>

다음과 같은 배열이 있다고 가정하자.

```javascript
const array = [
  { id: 0, text: 'a' },
  { id: 1, text: 'b' },
  { id: 2, text: 'c' },
  { id: 3, text: 'd' },
];
```

<br/>

#### key가 없을 시 <a id="a4"></a>

 위 배열을 다음과 같이 렌더링한다고 가정해보자. `key`를 설정하지 않고 렌더링 한 것이다.

```jsx
array.map(item => <div>{item.text}</div>); // key 미설정
```

![img](https://i.imgur.com/3rkaiY1.gif)

위 배열의 b 와 c 사이에 z 를 삽입하게 된다면, 리렌더링을 하게 될 때 `b` 와 `c` 사이에 새 `div` 태그를 삽입을 하게 되는 것이 아니라, 기존의 c 가 z 로바뀌고, d 는 c 로 바뀌고, 맨 마지막에 d 가 새로 삽입된다.

그 다음에 a 를 제거하게 된다면, 기존의 a 가 b 로 바뀌고, b 는 z 로 바뀌고, z는 c로 바뀌고, c는 d 로바뀌고, 맨 마지막에 있는 d 가 제거된다.

<br/>

#### key가 존재할 시 <a id="a5"></a>

만약 `key`를 다음과 같이 설정 해준다면  이 작업은 개선된다.

```jsx
array.map(item => <div key={item.id}>{item.text}</div>); // key 설정
```

![img](https://i.imgur.com/yEUS6Bx.gif)

배열이 업데이트 될 떄 `key` 가 없을 때 처럼 비효율적으로 업데이트 하는 것이 아니라, 수정되지 않는 기존의 값은 그대로 두고 원하는 곳에 내용을 삽입하거나 삭제한다.

때문에, 배열을 렌더링 할 때에는 고유한 `key` 값이 있는것이 중요하며, 

만약에 배열안에 중복되는 `key` 가 있거나 `key`가 아예 존재하지 않을 때에는 렌더링시에 오류메시지가 콘솔에 나타나게 되며, 업데이트가 제대로 이루어지지 않게 된다.