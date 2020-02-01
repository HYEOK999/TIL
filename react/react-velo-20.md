![React20](https://user-images.githubusercontent.com/31315644/71559914-daae1180-2aa6-11ea-96b5-c7dd3b8f8856.png)

------

## React with Velopert - 20 -

- [Context API를 사용한 전역 값 관리](#a1)
  - [Context API 만들어보기](#a2)
  - [App.js](#a3)
  - [UserList.js 수정하기](#a4)
  - [CreateUser.js 수정하기](#a5)

<br/>

------

# Chap 20. Context API를 사용한 전역 값 관리

### Context API를 사용한 전역 값 관리 <a id="a1"></a>

현재 프로젝트들은 App 컴포넌트에서 `onToggle`, `onRemove` 가 구현이 되어있고 이 함수들은 UserList 컴포넌트를 거쳐서 각 User 컴포넌트들에게 전달 되는 방식으로 구현되어 있다.

여기서 UserList 컴포넌트의 경우에는 `onToggle` 과 `onRemove` 를 전달하기 위하여 중간 다리역할만 한다.

UserList.js

````jsx
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
````

UserList 에서는 해당 함수들을 직접 사용하는 일도 없다.

특정 함수를 특정 컴포넌트를 거쳐서 원하는 컴포넌트에게 전달하는 작업은 리액트로 개발을 하다보면 자주 발생 할 수 있는 작업이다. 컴포넌트 한개정도를 거쳐서 전달하는건 사실 그렇게 큰 불편함도 없지만, 만약 3~4개 이상의 컴포넌트를 거쳐서 전달을 해야 하는 일이 발생하게 된다면 이는 매우 번거로울 것이다.

그럴 땐, 리액트의 Context API 와 이전 섹션에서 배웠던 dispatch 를 함께 사용하면 이러한 복잡한 구조를 해결 할 수 있다. 리액트의 Context API 를 사용하면, 프로젝트 안에서 전역적으로 사용 할 수 있는 값을 관리 할 수 있다.

여기서 "상태" 가 아닌 "값" 이라고 언급을 했는데, 이 값은 꼭 상태를 가르키지 않아도 된다. 이 값은 함수일수도 있고, 어떤 외부 라이브러리 인스턴스일수도 있고 심지어 DOM 일 수도 있다.

물론, Context API 를 사용해서 프로젝트의 상태를 전역적으로 관리 할 수도 있긴한데, 이에 대해서는 나중에 더 자세히 알아보도록 한다.

우선, Context API 를 사용해여 새로운 Context 를 만드는 방법을 알아보자.

<br/>

#### Context API 만들어보기 <a id="a2"></a>

Context 를 만들 땐 다음과 같이 `React.createContext()` 라는 함수를 사용한다.

```jsx
const UserDispatch = React.createContext(null);
```

**`createContext` 의 파라미터에는 Context 의 기본값을 설정할 수 있다.** 

여기서 설정하는 값은 Context 를 쓸 때 값을 따로 지정하지 않을 경우 사용되는 기본 값이다.

**Context 를 만들면, Context 안에 Provider 라는 컴포넌트가 들어있는데 이 컴포넌트를 통하여 Context 의 값을 정할 수 있다.** 이 컴포넌트를 사용할 때, **`value` 라는 값을 설정**해주면 된다.

```javascript
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```

설정 후 Provider 에 의하여 감싸진 컴포넌트 중 어디서든지 Context 의 값을 다른 곳에서 바로 조회해서 사용 할 수 있다. 

App 컴포넌트 에서 Context 를 만들고, 사용하고, 내보내는 작업을 해보자.

<br/>

#### App.js <a id="a3"></a>

1. UserDispatch 라는 Context만들기. (어디서든지 `dispatch`를 꺼내 쓸 수 있도록 준비)

   ```jsx
   // UserDispatch 라는 이름으로 내보낸다.
   export const UserDispatch = React.createContext(null);
   
   // 나중에 사용하고 싶을 때 다음과 같이 불러와서 사용 할 수 있다.
   import { UserDispatch } from './App';
   ```
   <br/>
   
2. Context 를 다 만들었으면, App 에서 `onToggle` 과 `onRemove` 를 지우고, UserList 에게 props를 전달하는것도 지운다.

   ```jsx
   import React, { useRef, useReducer, useMemo, useCallback } from 'react';
   import UserList from './UserList';
   import CreateUser from './CreateUser';
   import useInputs from './hooks/useInputs';
   
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
     switch (action.type) {
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
   
   
   // UserDispatch 라는 이름으로 내보내보낸다.
   export const UserDispatch = React.createContext(null);
   
   function App() {
     const [state, dispatch] = useReducer(reducer, initialState);
     const nextId = useRef(4);
   
     const { users } = state;
   
     const [{ username, email }, onChange, reset] = useInputs({
       username : '',
       email : ''
     });
   
     const onCreate = useCallback(() => {
       dispatch({
         type: 'CREATE_USER',
         user: {
           id: nextId.current,
           username,
           email
         }
       });
       reset();
       nextId.current += 1;
     }, [username, email, reset]);
   
     // const onToggle = useCallback(id => {
     //   dispatch({
     //     type: 'TOGGLE_USER',
     //     id
     //   });
     // }, []);
   
     // const onRemove = useCallback(id => {
     //   dispatch({
     //     type: 'REMOVE_USER',
     //     id
     //   });
     // }, []);
   
     const count = useMemo(() => countActiveUsers(users), [users]);
     return (
       <UserDispatch.Provider value={dispatch}> 
         <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
         {/* <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> */}
         <UserList users={users} />
         <div>활성사용자 수 : {count}</div>
       </UserDispatch.Provider>
     );
   }
   
   export default App;
   ```

   <br/>

#### UserList.js 수정하기 <a id="a4"></a>

1. UserList 컴포넌트에서 에서 `onToggle` 과 `onRemove` 와 관련된 코드들을 지운다.

   ```jsx
   import React from 'react';
   
   const User = React.memo(function User({ user }) {
     return (
       <div>
         <b
           style={{
             cursor: 'pointer',
             color: user.active ? 'green' : 'black'
           }}
           onClick={() => {}}
         >
           {user.username}
         </b>
         &nbsp;
         <span>({user.email})</span>
         <button onClick={() => {}}>삭제</button>
       </div>
     );
   });
   
   function UserList({ users }) {
     return (
       <div>
         {users.map(user => (
           <User user={user} key={user.id} />
         ))}
       </div>
     );
   }
   
   export default React.memo(UserList);
   ```

   <br/>

2. User 컴포넌트에서 `dispatch` 를 사용 하도록 한다.
`dispatch`를 사용하기 위해서는 `useContext` 라는 Hook 을 사용해서 전에 만든 UserDispatch Context 를 조회해야한다.

   ```jsx
   import React, { useContext } from 'react';
   import { UserDispatch } from './App';
   
   const User = React.memo(function User({ user }) {
     const dispatch = useContext(UserDispatch);
   
     return (
       <div>
         <b
           style={{
             cursor: 'pointer',
             color: user.active ? 'green' : 'black'
           }}
           onClick={() => {
             dispatch({ type: 'TOGGLE_USER', id: user.id });
           }}
         >
           {user.username}
         </b>
         &nbsp;
         <span>({user.email})</span>
         <button
           onClick={() => {
             dispatch({ type: 'REMOVE_USER', id: user.id });
           }}
         >
           삭제
         </button>
       </div>
     );
   });
   
   function UserList({ users }) {
     return (
       <div>
         {users.map(user => (
           <User user={user} key={user.id} />
         ))}
       </div>
     );
   }
   
   export default React.memo(UserList);
   ```

    결과적으로 Context API 를 사용해서 `dispatch` 를 어디서든지 조회해서 사용할 수 있게 되었다. 

   <br/>

#### CreateUser.js 수정하기 <a id="a5"></a>

`CreateUser.js`에도 Context API를 적용해본다.

**조건**

- CreateUser 에게는 어떤 props 도 전달하지 않을 것.
- CreateUser 컴포넌트 내부에서 useInputs 를 사용.
- useRef 를 사용한 `nextId` 값을 CreateUser 에서 관리할 것.

1. App.js 에서 CreateUser 컴포넌트와 연관된 props , action들을 지운다. ref관리도 CreateUser에서 한다.

   App.js

   ```jsx
   import React, { useRef, useReducer, useMemo, useCallback } from 'react';
   import UserList from './UserList';
   import CreateUser from './CreateUser';
   
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
     switch (action.type) {
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
   
   
   // UserDispatch 라는 이름으로 내보내줍니다.
   export const UserDispatch = React.createContext(null);
   
   function App() {
     const [state, dispatch] = useReducer(reducer, initialState);
     const { users } = state;
   
     // const onCreate = useCallback(() => {
     //   dispatch({
     //     type: 'CREATE_USER',
     //     user: {
     //       id: nextId.current,
     //       username,
     //       email
     //     }
     //   });
     //   reset();
     //   nextId.current += 1;
     // }, [username, email, reset]);
   
     // const onToggle = useCallback(id => {
     //   dispatch({
     //     type: 'TOGGLE_USER',
     //     id
     //   });
     // }, []);
   
     // const onRemove = useCallback(id => {
     //   dispatch({
     //     type: 'REMOVE_USER',
     //     id
     //   });
     // }, []);
   
     const count = useMemo(() => countActiveUsers(users), [users]);
     return (
       <UserDispatch.Provider value={dispatch}>
         {/* <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} /> */}
         <CreateUser/>
         {/* <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> */}
         <UserList users={users} />
         <div>활성사용자 수 : {count}</div>
       </UserDispatch.Provider>
     );
   }
   
   export default App;
   ```

   <br/>

2. CreateUser에서 UserDispatch를 통해 받은 값들을 이용하여 dispatch를 구성한다.

   또한 useRef를 여기서 사용하여 다음 Id값을 관리하기 시작한다.

   CreateUser.js

   ```jsx
   import React, { useRef, useContext } from 'react';
   import { UserDispatch } from './App';
   import useInputs from '../20/hooks/useInputs';
   
   function CreateUser() {
     const dispatch = useContext(UserDispatch);
     const nextId = useRef(4);
     const [{ username, email }, onChange, reset] = useInputs({
       username : '',
       email : ''
     });
   
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
         <button onClick={() => {
           dispatch({ type: 'CREATE_USER',
             user: {
               id: nextId.current,
               username,
               email
             }
           });
           reset();
           nextId.current += 1;}
         }
         >등록</button>
       </div>
     );
   }
   
   export default React.memo(CreateUser);
   ```

   <br/>