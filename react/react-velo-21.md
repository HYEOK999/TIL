![React20](https://user-images.githubusercontent.com/31315644/71559914-daae1180-2aa6-11ea-96b5-c7dd3b8f8856.png)

------

## React with Velopert - 21 -

- Immer
  - [불변성의 예](#a2)
  - [Immer 미사용의 경우,](#a3)
  - [Immer 사용의 경우,](#a4)
    - Immer 기본 사용법
    - [리듀서에서 Immer 사용하기](#a5)
    - [Immer 와 함수형 업데이트](#a6)

<br/>

------

# Chap 21. Immer를 사용한 더 쉬운 불변성 관리

### Immer 

> 리액트에서는 배열이나 객체를 업데이트 해야 할 때에는 직접 수정하면 안되고 불변성을 지켜주면서 업데이트를 해야 한다.

<br/>

#### 불변성의 예  <a id="a2"></a>

잘못된 경우,

```jsx
const object = {
  a: 1,
  b: 2
};

object.b = 3;
```

<br/>

올바른 경우,

```jsx
const object = {
  a: 1,
  b: 2
};

const nextObject = {
  ...object, // 객체를 스프레드문법을 이용해 분해하고 있다. 
  b: 3
};
```

<br/>

배열도 마찬가지로, `push`, `pop`, `shift`, `unshift`, `splice` 등의 함수를 사용하거나 n 번째 항목을 직접 수정하면 안되고 다음과 같이 `concat`, `filter`, `map` 등의 함수를 사용해야 한다. (원본을 해손하지않고 새로운 배열을 반환하는 함수들)

```jsx
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2
    text: '할 일 #2',
    done: false
  }
];

const inserted = todos.concat({
  id: 3,
  text: '할 일 #3',
  done: false
});

const filtered = todos.filter(todo => todo.id !== 2);

const toggled = todos.map(
  todo => todo.id === 2
    ? {
      ...todo,
      done: !todo.done,
    }
    : todo
);
```

대부분의 경우 `... 연산자` 또는 배열 내장함수를 사용하는건 그렇게 어렵지는 않지만 데이터의 구조가 조금 까다로워지면 불변성을 지켜가면서 새로운 데이터를 생성해내는 코드가 조금 복잡해진다.

<br/>

#### Immer 미사용의 경우,  <a id="a3"></a>

다음과 같은 객체가 있다고 가정하자.

```jsx
const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
```

`posts`배열 내에 있는 `id`가 1인 `post`객체를 찾아서, `comments`에 새로운 댓글 객체를 추가해줘야 한다고 가정해보자.

```jsx
const nextState = {
  ...state, // 불변성을 유지하기 위해 기존의 값을 스프레드로 뿌려주었다.
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운 댓글'
          })
        }
      : post
  )
};
```

만약 immer 라이브러리를 이용할 경우, 다음처럼 더 쉽게 작업이 가능하다.

```jsx
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
```

 Immer 를 사용하면 우리가 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를 해주면 Immer 가 불변성 관리를 대신 해준다.

<br/>

#### Immer 사용의 경우,  <a id="a4"></a>

##### Immer 기본 사용법

기존에 만들었던 사용자 관리 프로젝트에 Immer 를 적용해보면서 Immer 의 사용법을 알아보자.

`immer` 설치하기

```bash
npm install immer --save
```

`immer` 불러오기

```jsx
import produce from 'immer';
```

`produce` 함수를 사용 시 

- 첫번째 파라미터 : 수정하고 싶은 상태
- 두번째 파라미터 : 어떻게 업데이트하고 싶을지 정의하는 함수

두번째 파라미터에 넣는 함수에서는 불변성에 대해서 신경쓰지 않고 그냥 업데이트 해주면 다 알아서 해준다. (완전 편리하다. ++)

```jsx
const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, draft => {
  draft.number += 1;
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
```

<br/>

##### 리듀서에서 Immer 사용하기  <a id="a5"></a>

참고로, Immer를 사용한다 해서 무조건 코드가 짧아지고 좋아지는 것은 아니다.  Immer 를 사용해서 간단해지는 업데이트가 있고, 오히려 코드가 길어지는 업데이트 들이 있다.

예를들어서 전에 만들었던 프로젝트의 상태의 경우 `users` 배열이 객체의 깊은곳에 위치하지 않기 때문에 새 항목을 추가하거나 제거 할 때는 Immer 를 사용하는 것 보다 `concat` 과 `filter` 를 사용하는것이 더 코드가 짧고 편하다.

우선, 학습을 위해 이번 업데이트는  Immer 를 사용하여 처리를 해보자.

**App.js** 

```jsx
import React, { useReducer, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
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
  // immer 적용하기
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

`TOGGLE_USER` 액션의 경우엔 확실히 Immer 를 사용하니 코드가 깔끔해졌지만 나머지의 경우에는 오히려 코드가 좀 복잡해졌다. 상황에 따라 잘 선택하여 사용해야 한다. Immer 를 사용한다고 해서 모든 업데이트 로직에서 사용을 하실 필요는 없다.

<br/>

##### Immer 와 함수형 업데이트  <a id="a6"></a>

이전에 `useState` 를 사용 할 때 함수형 업데이트란걸 할 수 있다고 배웠다. 

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(todo => ({
    ...todo,
    done: !todo.done
  }));
}, []);
```

함수에 업데이트를 해주는 함수를 넣음으로써, 만약 `useCallback` 을 사용하는 경우 두번째 파라미터인 `deps` 배열에 `todo` 를 넣지 않아도 된다.

위 처럼, 함수형 업데이트를 하는 경우에, Immer 를 사용하면 상황에 따라 더 편하게 코드를 작성 할 수 있다.

만약에 `produce` 함수에 두개의 파라미터를 넣게 된다면, 첫번째 파라미터에 넣은 상태를 불변성을 유지하면서 새로운 상태를 만들어주지만, 만약에 첫번째 파라미터를 생략하고 바로 업데이트 함수를 넣어주게 된다면, 반환 값은 새로운 상태가 아닌 상태를 업데이트 해주는 함수가 된다. 

```javascript
const todo = {
  text: 'Hello',
  done: false
};

const updater = produce(draft => {
  draft.done = !draft.done;
});

const nextTodo = updater(todo);

console.log(nextTodo);
// { text: 'Hello', done: true }
```

**결국 `produce` 가 반환하는것이 업데이트 함수가 되기 때문에 `useState` 의 업데이트 함수를 사용 할 떄 다음과 같이 구현 할 수 있게 된다. (즉 `produce`가 반환하는 것은 함수이므로 화살표 함수를 반환한것과 같다는 것 - Immer는 함수형 업데이트 )**

```javascript
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.done = !draft.done;
    })
  );
}, []);
```

이러한 속성을 잘 알아두시고, 나중에 필요할때 잘 사용하시면 되겠습니다.

Immer 은 분명히 정말 편한 라이브러리이다. 

하지만, 확실히 알아둘 점은, 성능적으로는 Immer 를 사용하지 않은 코드가 조금 더 빠르다는 점 이다.

조사 결과, 50,000개의 원소중에서 5,000 개의 원소를 업데이트 하는 코드를 비교 했을때의 결과로, Immer 의 경우 31ms 걸리는 작업이 (map 을 사용하는) Native Reducer 에서는 6ms 걸린 것을 확인 할 수 있다. (생각보다 차이가 있다.)

추가로, Immer 는 JavaScript 엔진의 [Proxy](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 라는 기능을 사용하는데, 구형 브라우저 및 react-native 같은 환경에서는 지원되지 않으므로 (Proxy 처럼 작동하지만 Proxy는 아닌) ES5 fallback 을 사용하게 된다. ES5 fallback 을 사용하게 되는경우는 191ms 정도로, 꽤나 느려지게 되는데, 여전히 데이터가 별로 없다면 크게 걱정 할 필요는 없다.

Immer 라이브러리는 확실히 편하기 때문에, 데이터의 구조가 복잡해져서 불변성을 유지하면서 업데이트하려면 코드가 복잡해지는 상황이 온다면, 이를 사용하는 것을 권장한다.

다만, 무조건 사용을 하진 마시고, 가능하면 데이터의 구조가 복잡해지게 되는 것을 방지하자. 어쩔 수 없을 때에만 Immer 를 사용하는것이 좋다. Immer 를 사용한다고 해도, 필요한곳에만 쓰고, 간단히 처리 될 수 있는 곳에서는 그냥 일반 JavaScript 로 구현하는 것을 권한다.