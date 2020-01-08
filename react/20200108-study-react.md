![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 14

- 로그인/로그아웃 프로젝트 이어서...
  - [각 라우터 역할](#a0)
  - [JWT 디코드 API 만들기](#a1)
  - [커스텀 라우터 만들기](#a2)
  - 백엔드에서 쿠키 뿌려주기
- React Hook API
  - [useLayoutEffect](#a3)
  
  - [createRef 와 useRef](#a4)
  
    - [createRef vs useRef의 차이점](#a5)
  
  - [useEffect의 의존성 배열](#a6)
  
    - [useRef 와 useEffect - lodash(isEqual) 기본](#a7)
  
    - [useRef 와 useEffect - lodash(isEqual) 커스텀 Hook 사용하기](#a8)
  
  - [useEffect 정리](#a9)
  
  - [createContext](#a10)
  
  - [useContext](#a11)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- useEffect
- useLayoutEffect
- useRef
- lodash - isEqual
- createContext
- useContext

<br/>

--------

### 로그인/로그아웃 프로젝트 이어서...

#### 각 라우터 역할 <a id="a0"></a>

**signup** : 전체적인 로그인 폼 핸들링 + 검증 : `onSubmit`

- 리액트의 폼 내장 속성으로 onSubmit `<form onSubmit={handleSubmit(onSubmit)}>`
- api에 패스워드1을 패스워드로 리네이밍(패스워드 칸이 두개 이므로 구분을 위해)
- success여부에 따라 오류 핸들링

**signin**

- 받아온 데이터를 객체구조 할당
- 토큰을 받아와서 사용할 데이터 형태로 수정

**signout**

- 커스텀 훅이 리턴하는 값은 토큰자체가 아니라 verify를 통해 decode된 객체가 리턴되기 때문에 사용하지 않을 것.
- Cookies.get을 통해 session을 가져온다.
- api에서 { headers }와 같이 객체 구조로 써서 값을 받아와야 한다.
- 로그아웃시 쿠키를 지우고 메인 페이지로 이동한다.

일반적으로 signin페이지로 접속했을 때는 디폴트 페이지로 리다이렉트 해줘야 한다.

<br/>

#### JWT 디코드 API 만들기 <a id="a1"></a>

src/lib/hooks.js

```JSX
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// 쿠키에게 세션값을 가져와서 verify를 하여 오류가 없다면 json 객체를 있다면 false를 반환해주는 커스텀훅
export const useAuthed = () => {
  const [ authed ] = useState(() => {
    try {
      const session = Cookies.get('session');
      const key = process.env.REACT_APP_JWT_KEY;
      const res = jwt.verify(session, key);
      return res;
    } catch (error) {
      return false; // 위변조가 되었음을 의미한다.
    }
  });

  return authed;
}
```

<br/>

#### 커스텀 라우터 만들기 <a id="a2"></a>

- `/signin` 으로 바로 접속 시, 로그인이 이미 되어 있다면 바로 `/user`로 가고, 안되어 있다면 그대로 `/signin`으로 이동한다.
- `/user` 으로 바로 접속 시, 로그인이 이미 되어 있다면 바로 `/user`로 가고, 안되어 있다면  `/signin`으로 이동한다.

```jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';

import User from './components/User';
import Main from './components/Main';

import { useAuthed } from './lib/hooks';

function AuthedRoute ({component: Component, ...rest}) {
  const isAuthed = useAuthed();
  console.log(isAuthed);
  return (
    <Route
      {...rest}
      render = {(props) => isAuthed !== false
        ? <Component {...props} />
        : <Redirect to={{pathname:'/signin', state: {from:props.location}}}/>
      }
    />
  )
}

function AuthedRedirect ({component: Component, ...rest}) {
  const isAuthed = useAuthed();
  console.log(isAuthed);
  return (
    <Route
      {...rest}
      render = {(props) => isAuthed !== false
        ? <Redirect to={{pathname:'/user', state: {from:props.location}}}/>
        : <Component {...props} />
      }
    />
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <AuthedRedirect path='/signin' component={ SignIn }/>
        <Route path='/signup' component={ SignUp }/>
        <Route path='/signout' component={ SignOut }/>
        <AuthedRoute path='/user' component={ User }/>
        <Route path='/' component={ Main }/>
      </Switch>
    </Router>
  );
}

export default App;

```

<br/>

#### 백엔드에서 쿠키 뿌려주기

지금까지 한 방법들은 쿠키를 생성하는 방법은 백엔드에서 토큰을 뿌려주면 프론트에서 토큰을 받아서 쿠키를 동적으로 생성하는 방법을 이용하였다. 

그런데, 일반적으로는 백엔드에서 쿠키를 생성해서 보내주기도 하기 떄문에 참고를 하면 좋을 것이다.

<br/>

### React Hook API 

#### useLayoutEffect <a id="a3"></a>

이 함수의 시그니처는 `useEffect`와 동일하긴 한데, 모든 DOM 변경 후에 동기적으로 발생한다. 

이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링하는 경우에 사용하도록 한다. `useLayoutEffect`의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행될 것이다.

화면 갱신 차단의 방지가 가능할 때 표준 `useEffect`를 먼저 사용 후 문제가 있을 경우 `useLayoutEffect`를 이용한다.

**즉, `useEffect`는 비동기적으로 실행이되기 때문에 빈번하게 업데이트 될 경우, 요소들이 깜박이는 현상이 일어날 수 있다.**

**그런데, `useLayoutEffect`는 동기적으로 실행이되기 때문에 이러한 형상을 방지할 수 있다.**

**리액트에서 공식적으로  `useEffect`를 권한다. 따라서 문제가 있을 경우에만 `useLayoutEffect`를 이용하도록 한다. **

>  [팁 -  공식문서](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect)
>
> 클래스 컴포넌트에서 코드를 변환하는 경우에 `useLayoutEffect`는 `componentDidMount`나 `componentDidUpdate`와 동일한 단계를 실행하게 된다는 것에 주의하기 바랍니다. 그렇기는 하지만, **먼저 `useEffect`를 사용해 보고** 문제가 있다면 그다음으로 `useLayoutEffect`를 사용해 보기를 권합니다.
>
> 서버 렌더링을 사용하는 경우라면 자바스크립트가 모두 다운로드될 때까지는 `useLayoutEffect`와 `useEffect` *어느 것도* 실행되지 않는다는 것을 명심해야 합니다. 이것이 서버에서 렌더링 되는 컴포넌트에서 `useLayoutEffect`가 사용되는 경우에 대해 React가 경고하는 이유입니다. 이를 수정하기 위해서는 (최초 렌더링 시에 필요하지 않다면) 로직을 `useEffect`로 이동한다거나 (`useLayoutEffect`가 수행될 때까지 HTML이 깨져 보이는 경우는) 클라이언트 렌더링이 완료될 때까지 컴포넌트 노출을 지연하도록 하세요.
>
> 서버에서 렌더링된 HTML에서 레이아웃 effect가 필요한 컴포넌트를 배제하고 싶다면, `showChild && `를 사용하여 조건적으로 렌더링 하고 `useEffect(() => { setShowChild(true); }, [])`를 사용하여 노출을 지연시키세요. 이런 방법으로 자바스크립트 코드가 주입되기 전에 깨져 보일 수 있는 UI는 표현되지 않게 됩니다.

```jsx
import React, { useState, useEffect, useLayoutEffect } from 'react'

const BlinkRender = () => {
  const [value, setValue] = useState(0);

  // useEffect(() => {  // useEffect는 깜박거림을 유발할 수 있다.
  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value])

  return (
    <div onClick = {() => setValue(0)}>
        value : {value}
    </div>
  )
}

export default BlinkRender;
```

<br/>

#### createRef 와 useRef <a id="a4"></a>

`useRef`와 `createRef` 의 사용처
`current` 라는 프로퍼티를 이용해 다음과 같은 행위를 할 수 있다.

- 값을 저장할 수 있다. 
- React 기본 내장 함수, return되는 DOM 요소에 직접적인 접근, Focus를 맞추고 싶을 때 사용한다.

**createRef**

```jsx
import React, { createRef } from 'react'

const BlinkRender = () => {
  const inputElement = createRef();

  const focusInput = () => {
    inputElement.current.focus();
  }

  return (
    <>
      <input ref={inputElement} type="text"
        /* createRef은 ref={(ref) => input = ref}로 하면 안된다. */ 
       />
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}

export default BlinkRender;
```

<br/>

**useRef**

```jsx
import React, { useRef } from 'react'

const BlinkRender = () => {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  }

  return (
    <>
      <input ref={inputElement} type="text"/>
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}

export default BlinkRender;
```

<br/>

##### createRef vs useRef의 차이점  <a id="a5"></a>

```jsx
import React, { useState, createRef, useRef } from 'react'

// useRef vs createRef
const BlinkRender = () => {
  const [renderIndex, setRenderIndex] = useState(1);
  const refFromUseRef = useRef()
  const refFromCreateRef = createRef()

  if(!refFromUseRef.current) {
    refFromUseRef.current = renderIndex
  } // 최초 실행시만 할당된다.

  if(!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex
  } // 최초 실행시만 할당된다.

  return (
    <>
      <p>Current render index: {renderIndex}</p>
      <p>refFromUseRef: <b>{refFromUseRef.current}</b></p>
      <p>refFromCreateRef: <b>{refFromCreateRef.current}</b></p>
      <button onClick={() => setRenderIndex(prev => prev + 1)}>Re-Render</button>
    </>
  )
}

export default BlinkRender;
```

위 코드를 통해서 useRef는 리렌더링을 하지 않는 걸 확인할 수 있다. 

(useRef의 프로퍼티 변경되고 있으나 UI를 업데이트 하지 않는 것, createRef는 리렌더링 되고 있다.)

본질적으로 `useRef`와 `createRef`는  `.current` 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같다.

즉, 기본적으로 2개는 사용법이 같고 하는 행위도 거의 동일하다. 

하지만, 가장 큰 **차이점**을 내포하고 있다.

`useRef`는 내용이 변경될 때 그것을 알려주지는 *않는다*. 는 것을 유념하자. **useRef의 `.current` 프로퍼티를 변형하는 것이 리렌더링을 발생시키지는 않는다.** 

> **즉, `useRef`는 프로퍼티가 변형이 되어도 리렌더링이 안되는 것이고, **
>
> **`createRef`는 프로퍼티가 변형이 되면 리렌더링이 된다는 것이다.**
>
> useRef는 컴포넌트를 가리키고, Hook State의 예전 값을 가져올 수 있도록 할 수 있다.

추가로) 동적으로 받아올때는 createRef를 사용하지 않으며 외부에서 변수를 두고 `ref={ ref => input = ref}` 동적으로 할당.

<br/>

#### useEffect의 의존성 배열 <a id="a6"></a>

```jsx
import React, { useState, useEffect } from 'react';

export default function App () {
  const [user, setUser] = useState({name: 'react', count: 1})

  useEffect(() => {
    console.log('updated');
    // shallow comparions 얕은 검사
  }, [user])

  const randomUpdate = () => {
    const count = Math.random() >= 0.5 ? user.count : user.count + 1; // 2분의 1 업데이트
    setUser(user => ({...user, count}))
  };

  return (
    <>
      <p>Count: {user.count}</p>
      <button onClick={randomUpdate}>Random up</button>
    </>
  )
}
```

위 코드의 문제는 `userEffect`의 의존성 배열이다. [user]

직접적인 숫자,문자열 과 같은 값을 비교하는게 아닌 객체나 함수는 reference만 비교하기 때문에 항상 새로운 것으로 알아들어 `useEffect`가 게속 호출된다.

해결방법은 2가지다.

1. 의존성 배열이 `[user]`가 아닌, `[user.count]`로서 값을 비교하게 한다.

2. `useEffect`에서 2번째 파라미터를 비우고, 모든 변화에 대해서 업데이트(내부적인 조건으로)를 실행한다. 이렇게 2번쨰 파라미터인 의존성 배열을 작성하지 않을 경우, 모든 변화를 감지하기 때문에 조건을 작성해야한다. 조건을 작성할 때 조심해야할 것이 객체나 함수같은 참조형인데 객체나 함수는 단순 비교(=)를 하게되면 겉치레만 비교를 하는 얕은 검사를 사용한다. 얕은 검사는 조건 상 무의미 하므로 깊은 복사로 바꿔줘야하는데 여기서 lodash의 `isEqual`을 사용한다.

<br/>

##### useRef 와 useEffect - lodash(isEqual) 기본 <a id="a7"></a>

위에서 배웠던 `useRef`와 `useEffect`를 이용하여 만든 예제이다.

해당 예제는 버튼을 누를 경우, 버튼이 2분의 1(정확히는 아니지만) 확률로 1씩 증가 한다.

증가하게 된다면 콘솔창에 'updated'를 띄울 것이고, 증가하지 않는다면 '변경후' 라는 문구만 뜨게 된다. 

```jsx
import React, { useEffect, useState, useRef } from 'react'
import { isEqual } from 'lodash'

const BlinkRender = () => {
  const [user, setUser] = useState({name : 'react', count: 1})

  useEffect(() => {
    const prevUser = prevUserRef.current
    if(!isEqual(prevUser, user)){ // 유저가 변경되지 않을 경우
      // Deep comparison
      console.log('updated');
    }
  }) // shallow comparison 얕은 검사 : 객체와 함수 검사시 레퍼런스만 비교한다.

  const prevUserRef = useRef();
  useEffect(() => {
    prevUserRef.current = user;
    console.log('변경후', prevUserRef.current);
  })  // shallow comparions 얕은 검사 : 객체와 함수 검사시 레퍼런스만 비교한다.

  const randomUp = () => {
    const count = Math.random() >= 0.5 ? user.count : user.count + 1;
    setUser(user => ({...user, count})) // 늘 새로운 객체, 늘 새로운 참조값
  }

  return (
    <>
      <p>Count : {user.count}</p>
      <button onClick={randomUp}>Up</button>
    </>
  )
}

export default BlinkRender;
```

`useRef`는 이전값을 기억하는 용도로 사용되었다.

`useEffect`는 비동기로 처리가 되기 때문에 처음 `setUser`를 통해 새로운 카운트가 업데이트가 되었을 경우, 

2번이 실행된다. 2번에서는 `lodash`의 `isEqual`을 사용하였는데 `isEqual`은 객체를 비교하는게 아니라 객체 내부의 내용을 비교한다. 따라서 카운트 값이 올라가 있다면 `prevUser`의 count는 1(처음기준), `user`의 count는 2이므로 `updated`를 출력하고 

3번이 실행된다. 3번에서는 `prevUserRef`에 `user`의 현재값을 할당한다.

<img src="https://user-images.githubusercontent.com/31315644/71823578-e6b75600-30da-11ea-8419-40206af5877d.jpeg" alt="useRefEffect01" style="zoom:50%;" />

<br/>

##### useRef 와 useEffect - lodash(isEqual) 커스텀 Hook 사용하기 <a id="a8"></a>

```jsx
import React, { useEffect, useState, useRef } from 'react'
import { isEqual } from 'lodash'

const usePrev = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })
  console.log(ref);
  return ref.current;
}

const BlinkRender = () => {
  const [user, setUser] = useState({name : 'react', count: 1})
  const prevUser = usePrev(user); // ref.current

  useEffect(() => {
    if(!isEqual(prevUser, user)){ // 유저가 변경되지 않을 경우
      console.log('updated');
    }
  }) // shallow comparison 얕은 검사 : 객체와 함수 검사시 레퍼런스만 비교한다.

  const randomUp = () => {
    const count = Math.random() >= 0.5 ? user.count : user.count + 1;
    setUser(user => ({...user, count})) // 늘 새로운 객체, 늘 새로운 참조값
  }

  return (
    <>
      <p>Count : {user.count}</p>
      <button onClick={randomUp}>Up</button>
    </>
  )
}

export default BlinkRender;
```

`useRef`는 이전값을 기억하는 용도로 사용되었다.

커스텀 Hook을 사용할 경우, 1번이 실행된다면 user의 count값은 2로 올라가고  리렌더링이 된후 2번 -> 3번이 실행된다.

`setUser`함수 호출이 끝나게 되면 State를 통해 관리되던 `user`의 변경이 있었으므로 리렌더링을 다시 하게 되는데 2번이 실행된다.

여기서 2번을 실행할 때, `useEffect`만을 실행하는 것이므로 결국적으로 `prevUser` 에 반환을 하지 않게 된다. 단지 ref.current값만 올라가게 된다. (처음 기준 prevUser = `undefined` 그대로, ref.current = 1)

3번에서는 `lodash`의 `isEqual`을 사용하였는데 `isEqual`은 객체를 비교하는게 아니라 객체 내부의 내용을 비교한다. 따라서 카운트 값이 올라가 있다면 `prevUser`의 count는 undefined(처음기준), `user`의 count는 1이므로 `updated`를 출력하고 `setUser` 함수 호출이 끝나게 된다.

다시, 버튼을 눌러서 값이 올라갈 경우, 리렌더링을 하게 되면서 prevUser의 값이 1로 올라가게 된다.

 `setUser`함수 호출이 끝나게 되면 State를 통해 관리되던 `user`의 변경이 있었으므로 리렌더링을 다시 하게 되는데 2번이 실행된다.

여기서 2번을 실행할 때, `useEffect`만을 실행하는 것이므로 결국적으로 `prevUser` 에 반환을 하지 않게 된다. 단지 ref.current값만 올라가게 된다. (처음 기준 prevUser = `undefined` 그대로, ref.current = 1)

![useRefEffect01](https://user-images.githubusercontent.com/31315644/71880064-d5218d00-3172-11ea-9d42-1fd0a8cc5a35.png)

<br/>

#### useEffect 정리 <a id="a9"></a>

- 비동기 함수다.
- Hook은 렌더링 될 때 마다 순서대로 호출되어서 실행한다.
- useEffect는 얕은 비교를 한다.
  - 참조형 비교가 아닐 때는 `user.count`와 같이 값으로서 비교한다.
  - 참조형(객체,함수) 비교를 해야 할 경우 깊은 복사형의 비교(`lodash-isEqual`)를 한다.
    - `lodash-isEqual`은 객체 내부의 value만 비교하고 객체자체는 비교하지 않는다!(참조까지 비교하면 항상 false)
- useEffect는 순차적으로 실행이 되므로 순서에 주의한다.
  - 순서대로 Hook이 작동해야 하므로 if문, for문 등 조건으로 감싸면 안된다.(에러유발 - 내부 사용은 가능하다.)

<br/>

#### createContext <a id="a10"></a>

`createContext`는 `Provider`를 이용해서 하위 트리에 있는 컴포넌트가 연결 되어 있는 값을 읽을 수 있게 할 수 있다.

`createContext`를 사용하면 중간에 있는 엘리먼트들에게 props를 넘겨주지 않아도 된다.

**`createContext`는 가장 가까이 있는 테마 `Provider`를 찾아 그 값을 사용한다는 것이다.**

`Class.contextType`은 `React.createContext()`로 생성한 Context 객체를 원하는 클래스의 `contextType` 프로퍼티로 지정할 수 있다. 그리고 `this.context`를 이용해 해당 Context의 가장 가까운 Provider를 찾아 그 값을 읽을 수 있게 된다.

```jsx
// context를 사용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있다.
// light를 기본값으로 하는 테마 context를 만들어 보자.
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Provider를 이용해 하위 트리에 테마 값을 보내주자.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있다.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 이젠 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없다.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정한다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것 이다.
  // 이 예시에서 현재 선택된 테마는 dark.
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

<br/>

#### useContext <a id="a11"></a>

`createContext`로 생성하고 `Provider`를 사용하는 부분까지는 완전 동일하다.

차이점은 `createContext`는 가장 가까운 `Provider`를 찾아 연결하지만, `useContext`는 명시적으로 선택을 해줄 수 있다. 또한, `contextType`등의 복잡한 작업을 생략하고 단편적으로 `useContext(콘텍스트)`로 사용도 할 수 있다. 

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light); // 생성부문 동일

function App() {
  // Provider 동일
  return ( 
    <ThemeContext.Provider value={themes.dark}> 
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // 명시적으로 선택하였음

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

