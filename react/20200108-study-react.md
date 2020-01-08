![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 15

- [export 와 export default의 차이](#a1)
- React Hook 이어서
  - [useCallback](#a2)
  - [useMemo](#a3)
  - [useEffect](#a4)
- [Hook 규칙 - 리액트 공식문서 참조](#a5)
- [REACT-GRID-MINI](#a6)
  - [코딩 순서](#a7) 
  - [코드 참고](#a8)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- useCallback
- useMemo
- useEffect
- Hook 규칙
- useReducer

<br/>

--------

### export 와 export default의 차이 <a id="a1"></a>

`export default 함수명` 로 작성시 다른 파일에서 해당 파일을 `import 커스텀명  from '파일주소'` 로 사용할 수 있다

`export { 함수명 }`로 작성시 다른 파일에서 해당 파일을 `import { 함수명 } from '파일주소'`로 사용해야 한다. 

<br/>

### React Hook 이어서 

#### useCallback <a id="a2"></a>

- 불필요한 렌더링 재발생 방지
- `useCallback`은 함수 자체를 메모라이징 한다. (함수 표현식을 메모라이징)

**App.js**

```jsx
import React, { useState, useEffect, useCallback } from 'react';
function Test(props) {
  const [count, setCount] = useState(1);

  const countUp = (c) => {
    setCount(c)
  };

  const seeResult = useCallback(() => {
    console.log('count', count)
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={seeResult}>확인</button>
      <button onClick={() => countUp(count + 1)}>증가</button>
    </div>
  );
}

export default Test;
```

`useCallback`의 의존성배열(2번쨰 파라미터)가 빈배열(`[]`)일 경우,1번만 함수 표현식을 기억해서 리턴을 한다.
따라서 이후에 `증가`버튼을 아무리 누르고 `확인`버튼을 누를 경우, `console` 에는` count 1`만 찍히게 된다. 

<br/>

#### useMemo <a id="a3"></a>

- 불필요한 렌더링 재발생 방지
- `useMemo`은 함수를 호출해서 리턴한 값 자체를 메모라이징 한다. 

**App.js**

```jsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sub from './Sub'

function Test(props) {
  const [count, setCount] = useState(1);

  const up = () => setCount(prev => prev+1)
  const memoizedSub = useMemo(() => {
    return <Sub/>
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={up}>증가</button>
      <Sub /><br/>
      {memoizedSub}
    </div>
  );
}

export default Test;
```

**Sub.js**

```jsx
import React, { useEffect } from 'react';

let count = 1;

export default function Sub() {
  useEffect(() => {
    count += 1;
  })
  return <>Sub : {count} </>;
}
```

`memoizedSub`에서는 `useMemo(fn,[])` 를 통해서 결과 값을 맨처음(1번)만 메로라이징 하고 있다. 즉,  `<Sub />` 태그에서는 count값이 버튼을 누를수록 게속 올라가겠지만, `{memoizedSub}`는 메모라이징 된 `<Sub />`를 반환하고 있기 때문에 값이 게속 1로 고정되어 있을 것이다.

추가로, 실행시 첫 렌더의 값은 1, 1, 1 일 것이다. 하지만, 증가를 누를 경우 2, 3, 1로 되어있다.

![memo테스트](https://user-images.githubusercontent.com/31315644/71953162-a663ef00-3224-11ea-92ce-14349ab1be70.png)

이 부분에 대해서는 첫 렌더링이 끝나고 Sub.js에서 useEffect가 호출된다. 문제는 useEffect에서는 상태를 업데이트 하는게 아니라 그저 그냥 변수를 업데이트 한 것이기 때문에 리렌더링이 이루어지지 않았다. 따라서 맨 처음 로드시 사실 count의 값은 1, 2, 1이 맞으나 2번째 2는 상태가 아닌 그냥 변수 이기 때문에 추가적인 화면에 렌더링이 안된것이다.

<br/>

#### useEffect <a id="a4"></a>

- 렌더링 이후 부터 실행된다.

- 기본적으로, componentDidMount, componentDidUpdate, componentWillUnMount 으로 합쳐놓은 꼴\

  ```javascript
  useEffect(() => {
    effect // componentDidUpdate, 의존성 배열이 빈배열 시 componentDidMount
    return () => {
      cleanup // componentWillUnMount
    };
  }, [input]) // 의존성 배열([빈배열] : DidMount, 배열 미작성 시 모든 훅 업데이트에 작동)
  ```

  <br/>

**App.js**

```jsx
import React, { useState } from 'react';
import Sub from './Sub';

function Test(props) {
  const [ count, setCount ] = useState(1);

  const update = () => setCount(prev => prev + 1)

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={update}>Count Up</button>
      <Sub />
    </div>
  )
}

export default Test;
```

**Sub.js**

Sub는 아무 상관이 없음에도 업데이트가 되는 걸 확인할 수 있음.

```jsx
import React, { useEffect } from 'react';

let count = 1;

export default function Sub () {
  useEffect(() => {
    count += 1
  })
  return <>sub: {count}</>
}
```

<br/>

### [Hook 규칙 - 리액트 공식문서 참조](https://ko.reactjs.org/docs/hooks-rules.html) <a id="a5"></a>

```jsx
// useState 폴리필 (정확하지는 않는다.)
function useState(initValue) {
  let _val = initValue;

  function state() {
    return _val;
  }
  function setState(newVal) {
    _val = newVal;
  }
  return [state, setState];
}

const [ count, setCount ] = useState(1); // 객체 구조분해 였다면 필드값이 일치해야만 사용 가능
```

- 순서가 중요하므로 if문이나 for문 등 조건문으로 감싸면 안된다. (오류 유발)

  ```jsx
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
  ```

- Hook은 첫번째 렌더링에서 생성 및 선언하고 두번째 렌더링부터는 읽거나 추가 한다.

  ```jsx
  // ------------
  // 첫 번째 렌더링
  // ------------
  useState('Mary')           // 1. 'Mary'라는 name state 변수를 선언합니다.
  useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
  useState('Poppins')        // 3. 'Poppins'라는 surname state 변수를 선언합니다.
  useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect를 추가합니다.
  
  // -------------
  // 두 번째 렌더링
  // -------------
  useState('Mary')           // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
  useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
  useState('Poppins')        // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
  useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.
  
  // ...
  ```

<br/>

### REACT-GRID-MINI <a id="a6"></a>

`useReducer(reducer, initialState)`

- `initialState`는 초기 상태를 의미한다.
- `reducer`는 순수함수로 구성해야한다.
- **리듀서를 사용하는 이유** : 기존 상태와 새로운 `Action`이 주는 상태를 병합하여 새로운 상태를 리턴해주는 것이 목적 
  - Redux 대신 사용.

```jsx
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': ...코드
    case 'REDO': ...코드
    case 'SET': ...코드
    case 'CLEAR': ...코드
  }
};
```

<br/>

`initialState`는 초기 상태를 정의 한 것, `useHistory({})`에서 보낸 초기값을 받기 위해 `App.js`에서 디스트럭처링으로 받고 있다.

```jsx
// 초기상태 정의
const initialState = {
  past: [],
  present: null,
  future: []
};

// export로 내보냄.
export default function useHistory (initialPresent) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent
  })
}

// App.js
function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({}); //초기화(디스트럭처링)
	... 코드
}
```

##### 코딩 순서 <a id="a7"></a> 

1. 렌더링되는 요소 (`return`문 내부).
2. 요소 완성을 위해서는 어떠한 요소들이 필요한지 파악한다.
3. 따라서, `useHistory(커스텀 훅)`를 만들어야만 한다.
4. `export`할 함수를 쓰고 시작 - 내부는 순차적으로 작성( `dispatch`를 해주는 것도 필요한 것들만 만들면 된다 ).
5. 리듀서 함수 제작( 보통 함수 정의가 호출 보다 먼저 나와야하기 때문에 정의를 위에 작성 한다. - 개인적 의견 ).

<br/>

##### 코드 참고 <a id="a8"></a>

- `state` 불린값을 담기 위한 단일 객체인 `set`은 불린값 업데이트를 위한 함수.
- `disabled`는 클릭을 못하게 만드는 속성 : `disabled={!canUndo}`를 통해 조건을 주도록 함.
- `useCallback`을 쓰는 이유는 불필요하게 많이 렌더링되는걸 방지하기 위해 `dispatch`가 바뀌었을 경우에만 `useCallback` 함수를 실행하도록 만든 것. (해당 프로젝트는 요소를 625개를 렌더링하기 때문에 부하가 올 수 있다.)
  - 의존성 배열에 `dispatch`는 불필요한 `set`, `clear`발생을 막기 위함.
  - `dispatch`가 바뀌었다는 것은, `Action`이 전달하는 타입이 바뀌었다는 것을 의미한다.
- `reducer`는 순수함수여야 의미가 있다.

```jsx
// IIFE: Immediately Invoked Function Expressions
function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});
  return (
    <>
      {
        ((blocks, i, length) => {
          while (++i <= length) {
            const index = 1;
            blocks.push(
              <div
                key={i}
                // [Index]는 객체의 필드를 변수로 지정하기 위한 것, 배열이 아니다.
                // block 앞의 스페이스가 있어야 scss파일에서 중첩기능 정상 작동
                className={'block' + (state[index] ? ' active' : '')}
                onClick={() => setCount({ ...state, [index]: !state[index] })}
              />
            )
          }
        })([], 0, 625)
      }
    </>
  )
}
```