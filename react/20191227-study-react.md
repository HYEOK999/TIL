![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 11

- React Hook
- [무한 루프 : setCount를 바로 하지 않는 이유](#a11)
- [Hook 상태 업데이트 해보기](#a10)
  - [Hook 상태 업데이트 : 기본](#a9)
  - [Hook 상태 업데이트 : 리듀서](#a8)
- [React 최적화 (useMemo, useCallback)](#a7)
  - [useMemo , React.memo](#a6)
  - [useCallback](#a5)
  - [useMemo vs useCallback](#a4)
  - [useMemo 예제](#a3)
- [Custom Hook 만들기](#a2)
  - 예제
- [로컬 스토리지](#a1)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- React Hook
- Hook 업데이트 방법
- useMemo
- React.memo
- useCallback
- 로컬 스토리지

<br/>

--------

### React Hook

- 함수 컴포넌트에서 클래스 없이 React 상태와 Props에 접근할 수 있는 함수
- 상태를 관리할 변수(명), 상태를 업데이트 해줄 함수로 이루어진 배열의 형태.
- 함수의 클로저 구현.
- Class 컴포넌트를 사용하게 될 경우 기본적인 코드베이스가 커지기 때문에 Hook은 코드 길이를 대폭 줄일수 있다.
- `use`키워드가 들어간 것은 React Hook임을 명시함.

<br/>

### 무한 루프 : setCount를 바로 하지 않는 이유 <a id = "a11"></a>

```javascript
setCount(count + 1)
```

- return 외부에서 실행시 Too many re-renders. React limits the number of renders to prevent an infinite loop 오류가 발생한다.
- jsx내에서 `setCount`를 하게 되면 count + 1에서 1이 증가되고 return 실행 후 다시 setCount호출, 다시 호출호출... 무한 루프에 빠지게 됨
- onClick 내부에서도 마찬가지로 아래와 같이 쓸 경우 오류 발생!

```jsx
<button onClick={setCount(count + 1)}>+</button>
// 정답 :<button onClick={() => setCount(count + 1)}>+</button>
```

<br/>

### Hook 상태 업데이트 해보기<a id = "a10"></a>

기본적인 Hook을 이용한 상태를 정의(선언)할떄는 `useState`를 사용해서 한다 ( = `this.state`)

```jsx
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

만약 이런 정의된 상태들을 업데이트 할 때 클래스 컴포넌트라면 `this.setState`로 작성하면 간편해진다.

클래스 컴포넌트의 `this.setState`는 기존 상태 유지 + 병합의 개념을 가지고 있다.

```javascript
this.setState = ({
		age : 42,
		fruit : 'banana',
		todos : [{ text: 'Learn Hooks' }]
})
```

<br/>

#### Hook 상태 업데이트 : 기본<a id = "a9"></a>

Hook을 사용할 떄는 선언된 상태들을 하나로 묶는 상위 상태가 필요하다.

```jsx
const [state, setState] = useState({})
```

여기서 문제는 React Hook은 상태 변화시 기존상태를 유지하지 않기 떄문에 유지하는 작업을 필요로한다.

```jsx
const [state, setState] = useState({})

setState(prev => ({
  ...prev, // prev가 기존 상태를 유지.
	age : 42,
	fruit : 'banana',
	todos : [{ text: 'Learn Hooks' }]
}))
```

이러한 과정은 `...prev`를 게속 작성해주어야하기 때문에 불편한데, 이를 방지하기 위해서는 reducer를 이용하여 해결할 수 있다.

<br/>

#### Hook 상태 업데이트 : 리듀서<a id = "a8"></a>

react의 `useReducer`를 사용할 때도 역시 선언된 상태들을 하나로 묶는 상위 상태가 필요하다.

```jsx
import React, { useReducer } from 'react';
const [state, setState] = useReducer(reducer, {});
```

그리고 reducer 함수를 정의해주어야만 한다. 

```jsx
const [state, setState] = useReducer(reducer, {});

const reducer = (prevState, newState) => ({
    ...prevState,
    ...newState
  }) // 리듀서 : 기존의 상태와 새로운 상태를 받고 코드대로 처리한다.
  // 해당 리듀서는 기존 상태와 새로운 상태를 병합해주는 역할
  // const [state, setState] = useReducer(reducer, initState);

  setState({ 
		age : 42,
		fruit : 'banana',
		todos : [{ text: 'Learn Hooks' }]
  });
```

<br/>

### React 최적화 (useMemo, useCallback)<a id = "a7"></a>

```jsx
import React , {useState, useEffect} from 'react';
import './App.css';

const Button = ({onClick, count}) => {
  console.log(count);
  return <button count={count} onClick ={onClick}>버튼</button>
}

function App() {
  const [count1, setCount1] = useState(0) // 클래스의 this.setState
  const [count2, setCount2] = useState(0) // 클래스의 this.setState

  const increment1 = () => setCount1(c => c + 1); // setCount1(count1 + 1);
  const increment2 = () => setCount2(c => c + 1); // setCount1(count2 + 1);

  return (
    <>
      <Button count={count1} onClick={increment1}></Button>
      <Button count={count2} onClick={increment2}></Button>
    </>
  );
}

export default App;

```

위 과정에서 문제는 React Hook의 `useState` 를 통해서 2가지의 상태를 정의하였다.

문제는 1가지의 `state` 만 변경되어 Reack Hook이 전부 재렌더링 된다는 것이다. 

즉 저기서 버튼 1개만 눌러도 2가지 `<Button>` 태그가 다시 렌더링 되는 불필요함을 겪는다. (물론 상태는 관리된다.-렌더링만 다시)

<br/>

#### useMemo , React.memo<a id = "a6"></a>

> 리액트가 내부적으로 기존의 함수들을 메모하듯 메모해놓는 것.

위 문제를 해결하기 위해서는 `useMemo` 혹은 `React.memo` 를 사용한다.

`useMemo` 와 `React.memo`는 내부에서 실행하는데 시간이 많이 걸리거나 렌더링 되었던 요소들 , 불필요한 재호출이 발생할 수 있는 함수를 첫번째 파라미터로 받고, 의존성 배열을 두번째 파라미터로 받아서 두번째 파라미터 요소들을 조건으로 하여 변경되었을 때 만 첫번째 파라미터 함수가 호출되도록 한다.

두가지 모듈의 기능은 컴포넌트를 받아와서 업데이트 된 요소만 반환 해 준다.

```jsx
useMemo(() => 함수명(),[변경될 조건 값]);
React.memo(() => 함수명());

```

`useMemo`는 2번쨰 파라미터인 의존성 배열인  `[변경될 조건 값]` 전제로 변경을 하고,

`React.memo`는 파라미터로 받은 함수 자체가 변경될 경우 변경을 한다.

함수의 실행 결과값을 반환해준다.

```jsx
const Button = React.memo(({onClick, count}) => {
  return <button count={count} onClick = {onClick}>버튼</button>
})

```

여기서 `React.memo`, `useMemo` 만 가지고서는 유지를 할 수 없기 때문에 추가적인 작업을 또 필요로 한다.

<br/>

#### useCallback<a id = "a5"></a>

문제는 2가지의 모듈을 사용하기 위해서는 `useCallback()`을 사용해야만 한다.

```
 useCallback(() => 함수명(), [의존성 배열 - 조건]);

```

`useCallback()`의 2번쨰 파라미터는 의존성 배열(조건)인데 `[]` 을 빈배열로 둘 경우 1번만 실행해서 기억해서 가지고 있는다.

`useCallback()`을 사용해야 하는 이유는 `{} === {}` 와 같은 문제인데 객체`{}` 혹은 함수`function`은 원시값이 아닌 참조값이기 때문에 고정이 아니다.

```jsx
// 변경 전
const increment1 = () => setCount1(c => c + 1);
const increment2 = () => setCount2(c => c + 1);

// 변경 후
const increment1 = useCallback(() => setCount1(c => c + 1), []);
const increment2 = useCallback(() => setCount2(c => c + 1), []);

```

자 다시 확인해보면 

위에서 작성한  `React.memo` 는 파라미터로 받은 함수가 하나라도 변경이 있을 때만 함수를 다시 실행시키는 것인데,

`useCallback()`을 작성을 안해준다면 객체는 참조값이기 떄문에 한개만 클릭해도 객체 자체가 새롭게 메모리에 작성되기 때문에 둘다 새롭게 렌더링 되는 것이다.

즉, `useCallback()` -> DeepCopy 하기 위함. (Object.assign, lodash의 deepClone 을 사용해도 된다.)

<br/>

#### useMemo vs useCallback<a id = "a4"></a>

> 두 모듈 특정한 함수나 결과를 기억하고 싶을 떄 사용한다.

`useMemo` : 값을 리턴

`useCallback` : 함수를 리턴

<br/>

#### useMemo 예제<a id = "a3"></a>

React Hook의 단점은 **한 가지 상태변수만 바뀌어도 전체가 다시 렌더링**된다는 것이다.

아래 예제는 2개의 버튼이 있다.

1. 단어 카운트 : 배열에 저장된 문자열 요소의 길이를 반환해주는 버튼
2. 기본 카운트 : 단순 숫자만 늘려주는 버튼

학습을 위해 강제로 1번 버튼에 딜레이를 주었다. 

평범하게 이해한다면 `기본 카운트` 버튼을 클릭하는것에는 딜레이가 전혀 없어야 한다.

하지만!! 딜레이가 존재한다는 것이다. 이것은 위에서 말한 React Hook에서 한가지 상태변수만 바뀌어도 전체가 다시 렌더링 되는 것 때문인데 이것을 방지 하기 위해서 useMemo를 사용한다. 

```jsx
import React , { useState, useMemo } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['react', 'node.js', 'web'];
  const word = words[wordIndex];

  const computeLetterCount = word => {
    let i = 0;
    while(i < 1000000000) i++
    return word.length;
  } // 강제 딜레이 발생

  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  return (
    <>
      {letterCount}
      <button onClick={() => {
        const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
        setWordIndex(next);
      }}>단어 카운트</button>
    
      {count}
      <button onClick={() => setCount(count + 1)}>기본 카운트</button>
    </>
  )
}

```

 `letterCount()`에 `useMemo`를 사용하면 `setCount`가 발생할때는 딜레이가 발생하지 않도록 할 수 있음.

<br/>

### Custom Hook 만들기<a id = "a2"></a>

> Custom Hook을 만드는데 특정한 규칙은 없지만 만들 함수명 앞에 `use`를 적어주는 것이 Hook이라고 알려주는 컨벤션이다.

`useEffect` 는  ComponentDidMount, ComponentWillUnMount, ComponentDidUpdate를 합쳐놓은 개념이다.

ComponentDidMount : 렌더링 이후에 실행된다. 주로 이벤트, setTimeout, setInterval, AJAX 처리등을 작성한다.

ComponentWillUnMount :  Router에 의해 URL 변경, 페이지이동, 탭닫음 등등을 할 때 메모리 누수를 방지하고자 선언된 상태, 이벤트들을 취소하기 위함으로 주로 사용된다.

ComponentDidUpdate :렌더링 이후 정의해 놓은 상태가 변경될 때마다 실행한다. React Hook에서는 2번째 파라미터로 정의를 하는데 비워놓을 경우 모든 상태가 변경될 때마다 `useEffect`가 실행되고, 빈배열로 정의할 경우 렌더링 이후 1번만, 배열내에 특정 상태 변수를 작성하면 해당 변수에 대한 변경만 감지한다.

```javascript
  useEffect(() => {
    effect // ComponentDidMount
    return () => {  // 리턴 명시하는 함수가 ComponentWillUnMount
      cleanup
    };
  }, [input]) // ComponentDidUpdate

```

<br/>

#### 예제

```jsx
import React, {useEffect, useState} from 'react'

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false)
  // e.key vs key
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    // ComponentDidMount
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    
    // ComponentWillUnMount : Router에 의해 URL 변경, 페이지이동, 탭닫음 등등
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    };
  },[] /* ComponentDidUpdate */)

  return keyPressed;
}

const CustomHook = (props) => {
  const aPressed = useKeyPress('a');
  const bPressed = useKeyPress('b');
  return (
    <>
      {aPressed && 'A is pressed'}
      {bPressed && 'B is Pressed'}
    </>
  );
}

export default CustomHook;

```

<br/>

### 로컬 스토리지 <a id = "a1"></a>

브라우저를 닫거나, 웹페이지를 꺼도 데이터가 유지된다.

리덕스의 한계는 브라우저가 새로고침이 될 경우 모든 데이터가 날아가는데  리덕스와 로컬 스토리지를 연동하여 사용하면 이러한 단점을 보완할 수 있다.  

주로 사용되는 함수

- `window.localStorage.getItem(key)` : 로컬 스토리지에서 받아온 데이터는 JSON.parse로 풀어야 한다.
- `window.localStorage.setItem(key, JSON.stringfy(변수명))` : JSON으로 형변환후 set 해야한다.

쿠키 vs 로컬스토리지 : 

로컬스토리지는 그 컴퓨터에만 저장만 하고 서버에 전송하지는 않는다.

쿠키는 사용자의 동의를 받고 서버에 전송하기 까지 한다.

( 코드 작성 중 )

```jsx
import React, {useEffect,useState} from 'react'
import { cleanup } from '@testing-library/react';

// localStorage.setItem('data', JSON.stringfy(obj))
function useLocalStorage(key, init) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key)
        window.localStorage.setItem(key, JSON.stringify(init))
        return item ? JSON.parse(item) : init;
      } catch (error) {
        console.error(error);
        return init;
      }
    })

    const setValue = value => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(error);
      }
    }

    return [storedValue, setValue];
}

const App = (props) => {
    const [name, setName] = useLocalStorage('name', 'react');
    // setName('web');

    useEffect(() => {
      setName('web');
    })

    return (
      <>
      </>
    )
}

export default App;

```

<br/>