![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 5

- [클래스형 컴포넌트의 단점](#a1)
- [Basic Hooks](#a2)
  - [useState](#a3)
  - [useEffect](#a4)
    - [의존성 배열과 cleanup](#a5)
    - [의존성 배열을 안쓰고 인자 받기](#a6)
- [Custom Hooks](#a7)
- [useHasMounted vs withHasMounted](#a8)
  - [HOC](#a9)
  - [Hook](#a10)
- [Additional *Hooks* - 추가 훅](#a11)
  - [useReducer](#a12)
  - [useMemo](#a13)
  - [ReactMemo & useCallback](#a14)
  - [createRef vs useRef](#a15)
- [하위 컴포넌트를 변경하기](#a16)
- [상위 컴포넌트를 변경하기](#a17)
- [하위 컴포넌트 전체에 데이터를 공유하는 법](#a18)
  - [Context API, useContext](#a19)
  - [Set - 최상위 컴포넌트](#a20)
  - [Get - Consumer](#a21)
  - [Get - 클래스로 하는 방법](#a22)
  - [Get - functional로 하는 방법 (hook)](#c1)

<br/>

-----

## React Study with Mark - Hooks & Context -

<br/>

### 클래스형 컴포넌트의 단점 <a id="a1"></a>

- 컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어렵다.
  - 컨테이너 방식 말고, 상태와 관련된 로직
- 복잡한 컴포넌트들은 이해하기 어렵다.
- Class 는 사람과 기계를 혼동시킨다.
  - 컴파일 단계에서 코드를 최적화하기 어렵게 만든다.
- `this.state` 는 로직에서 레퍼런스를 공유하기 때문에 문제가 발생할 수 있다.

<br/>

### Basic Hooks <a id="a2"></a>

- useState
- useEffect
- [useContext](#c1)

Hook이 나오기 전에는

- **Functional Component = Stateless Component**

Hook이 나온 이후에는

- **Functional Component != Stateless Component**

- **Stateless Component => Stateless Functional Component**

<br/>

#### useState <a id="a3"></a>

> state 를 대체 할 수 있다.

1. 숫자, 문자열등의 원시값을 상태로 가지고 있을 경우

`const [count, setCount] = useState(0);`

`const [스테이트 값, 스테이트 변경 함수] = useState(스테이트 초기값);`

```jsx
import React, { useState } from 'react';

const Example2 = () => {
  const [count, setCount] = useState(0);

  function click() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );
};

export default Example2;
```

<br/>

2. 객체나 배열등의 참조값을 상태로 가지고 있을 경우

`const [state, setState] = useState({count: 0});`

`const [스테이트 값, 스테이트 변경 함수] = useState(스테이트 초기값);`

```jsx
import React, { useState } from 'react';

const Example3 = () => {
  const [state, setState] = useState({ count: 0 });

  function click() {
    setState({ count: state.count + 1 });
  }

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );
};

export default Example3;
```

<br/>

#### useEffect <a id="a4"></a>

> 라이프 사이클 훅을 대체 할 수 있다.

- componentDidMount : 렌더 직후
- componentDidUpdate :state, props가 변경되었을 때
- componentWillUnmount : 최초 마운트 됐을 때

```jsx
import React, { useState, useEffect } from 'react';

const Example5 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('componentDidMount & componentDidUpdate', count); // ComponentDidMount
  });

  function click() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );
};

export default Example5;
```

<br/>

##### 의존성 배열과 cleanup <a id="a5"></a>

- props가 바뀌거나 state가 바뀔 경우에만 다시 렌더되므로 dependency 배열 안에는 props 와 state를 넣을 수 있다.
- dependency로 관리하므로 componentDidUpdate와 완전히 같지는 않다.
  - depenency는 배열 형태로 작성한다.
  - 빈배열(`[]`)일 때는 렌더 될 때 useEffect가 게속 일어난다.
  - 아예 dependency를 작성하지 않을 경우 어떠한 변경이 일어나도 useEffect는 한 번밖에 실행이 안되므로 cleanup이 단 한 번만 일어남
- return 내부를 componentWillUnmount처럼 사용할 경우에는 의존성 배열이 빈 배열이어야 한다.

```jsx
  useEffect(() => {
      // componentDidUpdate
  }, [count])

// cleanup 단 한 번만 실행
  useEffect(() => {
      // componentDidMount & componentDidUpdate
      return () => {
        // cleanup
      }
  }, [])
```

<br/>

##### 의존성 배열을 안쓰고 인자 받기 <a id="a6"></a>

- 기존에는 의존성 배열을 입력하라는 warning이 뜬다.

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
	setTimeout(() => {
		setCount(count + 1); // 이렇게 쓸 경우
	}, 1000)
}, [count]) // count를 의존성 배열로 넣어줘야만 한다.
```

- 의존성 배열을 쓰지 않으려면 다음과 같이 한다.

```jsx
const [count, setCount] = useState(0);
useEffect(() => {
	setTimeout(() => {
		setCount(count => count + 1); // 이렇게 쓸 경우
	}, 1000)
}, []) // count를 의존성 배열로 넣지 않아도 됨
```

<br/>

### Custom Hooks <a id="a7"></a>

`useSomething`

> 리액트를 사용할 수 있는 곳 : 컴포넌트 안, 훅 안

```jsx
// hooks/useWindowWidth.jsx
import { useState, useEffect } from 'react';

// 현재 켜져있는 브라우저의 가로 길이를 알아본다.
export default function useWindowWidth() {
  // 여기서 초기화
  // 초기 가로값 설정
  const [width, setWidth] = useState(window.innerWidth);
  // 한 번만 실행되도록
  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', resize);
    // 더 이상 사용되지 않을 때 처리.
    return () => {
      window.removeEventListener('resize', resize)
    };
  }, []);
  return width;
}

// App.js
const width = useWindowWidth();
<p>{width}</p>
```

Q : 의존성 배열이 빈칸이므로 단 한 번만 실행되는데 어떻게 브라우저 창이 바뀔때마다 width값이 바뀌는가?

A :`window.addEventListner` 와 같은 이벤트 핸들러는 React가 아니라 DOM에 `addEventListener`를 걸어놨으므로 DOM이 변경되면 적용 된다.

<br/>

### useHasMounted vs withHasMounted <a id="a8"></a>

> Hook 과 HOC의 차이점을 알아본다.

#### HOC <a id="a9"></a>

HOC는 컴포넌트를 받아서 새로운 컴포넌트를 리턴 한다.(선물세트)

- App을 withHasMounted로 감쌀 경우 App이 선물세트 안에 들어있다.
- HOC의 단점 : Wrapper Hell을 볼 가능성이 높다.

```jsx
// withHasMount.js
import React from 'react';

export default function withHasMounted(Component) {
  class WrappedComponent extends React.Component {
    state = { hasMounted: false };

    componentDidMount() {
      this.setState({
        hasMounted: true
      });
    }

    render() {
      const { hasMounted } = this.state;
      return <Component {...this.props} hasMounted={hasMounted} />
    }
  }
  WrappedComponent.displayName = `WrappedComponent(${Component.name})`;
  return WrappedComponent;
}

// App.js
function App({ hasMounted }) {
		...
        <p>{hasMounted && 'Mounted'}</p>
		...    
}
export default withHasMounted(App);
```

<br/>

#### Hook <a id="a10"></a>

- HOC의 단점 : Wrapper Hell을 볼 가능성이 높다.
- 따라서, Hook을 사용한다.

```jsx
// useHasMount.js
import { useState, useEffect } from 'react';

export default function useHasMounted() {
  // 초기화
  const [HasMounted, setHasMounted] = useState(false);

  // 변경점
  useEffect(() => {
    // componentDidMount와 같은 시점에 작동
    setHasMounted(true);
  }, []);

  return HasMounted;
}

// App.js
function App({ hasMounted }) {
	const hasMounted2 = useHasMounted();
  return (
  ....
     <p>{hasMounted2 && 'Mounted'}</p>
	)
}

```

<br/>

### Additional Hooks - 추가 훅 <a id="a11"></a>

- useReducer
- useCallback, useMemo
- useRef

<br/>

#### useReducer <a id="a12"></a>

다음의 경우 사용된다.

1. 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
2. 다음 state가 이전 state에 의존적인 경우

- `reducer` 는 즉시 실행 순수 함수
- 외부환경에 영향을 받지않는다.
- 상태가 일정해야한다.

```jsx
import React, { useReducer } from 'react';

// 여기서 인자로 받는 state는 previous state(이전 상태 값)
const reducer = (state, action) => {
  if (action.type === 'PLUS') {
    return {
      ...state,
      count: state.count + 1
    }
  }
  return state;
};

const initialState = {
  count: 0
};

const Example8 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // reducer는 함수고, 즉시 실행 순수 함수이다.
  function click() {
    dispatch({
      type: 'PLUS'
    });
  }

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={click}>Click me</button>
    </div>
  );
};

export default Example8;

```

<br/>

#### useMemo   <a id="a13"></a>

- 최적화할 때 주로 사용된다.
- 의존성을 통해 특정 값에 대한 변화의 조건을 줄 수있다.
- 전달된 함수는 렌더링 중에 실행된다는 것.
- React.memo와 다르다. 

```jsx
// 리듀서 + 최적화
import React, { useState, useMemo } from 'react';

const Example9 = props => {
  // input 태그는 컨트롤드 컴포넌트로 이용
  const [value, setValue] = useState('');
  const [persons] = useState([
    { name: 'Kim', age: 26 },
    { name: 'June', age: 27 },
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  function getSum(persons) {
    console.log(JSON.stringify(persons));
    return persons.map(person => person.age).reduce((l, r) => l + r, 0);
  }

  // const sum = getSum(persons);
  const sum = useMemo(() => getSum(persons), [persons]); // 의존성 배열 입력

  return (
    <div>
      <br />
      <input value={value} onChange={change} />
      <p>{sum}</p>
    </div>
  );
};

export default Example9;


```

<br/>

#### React.Memo & useCallback   <a id="a14"></a>

- 함수가 매번 새로 생성되는 경우, 최적화의 어려움

```jsx
import React, { useState } from 'react';

const Person = ({ name, age }) => {
  console.log(name, age);
  return <li>{name} {age}</li>
};

const Example10 = () => {
  // input을 controlled component로 관리할 것
  const [value, setValue] = useState('');
  const [persons] = useState([
    { name: 'Kim', age: 27 },
    { name: 'JH', age: 29 }
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      <input value={value} onChange={change} />
      <ul>
        {persons.map((person, i) => <Person key={i} name={person.name} age={person.age}/>)}
      </ul>
    </div>
  );
};

export default Example10;

```

onChange이벤트를 걸어서 input에 입력하여 Person내부에 써놓은 콘솔로그를 계속 찍는다.

- Person에게 주는 input이 게속 바뀌니까 콘솔이 찍히는 상황 (props가 변경되었다고 판단했기 때문)
- 따라서 React.memo를 사용한다.

```jsx
const Person = React.memo(({ name, age }) => {
  console.log(name, age);
  return <li>{name}, {age}</li>
});

```

- React.memo를 사용하면 함수 자체를 비교를 한다.
- React.memo는 파라미터로 받은 함수가 하나로 변경이 될 경우 실행해버린다.
- 문제는, input에 특정 값을 입력할 경우 set에 의해 객체가 변경된다.
- 객체는 참조값이기 떄문에 한개만 변경되어도 객체 자체가 새롭게 메모리에 작성되기 때문에 콘솔이 게속 찍히게 된다.
- 따라서 useCallback을 이용하여 값이 같을 경우 변경을 막고 `<li>`부분만 보여주도록 하게 해보자.

```jsx
  // function click() {} // 로그 계속 찍힘
  const click = useCallback(index => {
    setPersons(persons => {
      const newPersons = [...persons];
      newPersons[index].age = newPersons[index].age + 1;
      return newPersons;
    });
  }, []); 

return (
  <div>
    <input value={value} onChange={change} />
    <ul>
      {persons.map((person, i) => <Person index={i} key={i} name={person.name} age={person.age} click={click}/>)}
    </ul>
  </div>
);

```

<br/>

#### createRef vs useRef   <a id="a15"></a>

```jsx
import React, { useRef, useEffect, useState } from 'react';

const Example11 = () => {
  const [count, setCount] = useState(0);
  const inputCreateRef = React.createRef();
  const inputUseRef = useRef();
  console.log(inputCreateRef.current);
  console.log(inputUseRef.current);
  useEffect(() => {
    setTimeout(() => {
      setCount(count => count + 1);
    }, 1000);
  });
  return (
    <div>
      <p>{count}</p>
      <input ref={inputCreateRef} />
      <input ref={inputUseRef} />
    </div>
  );
};

export default Example11;

```

- count를 변경시키면 return이 전부 재 렌더됨

- 둘다 DOM요소등을 직접 참조할 수 있다.

- 차이점

  **useRef는**

  1. current가 변경이 되어도 re-render가 되지 않는다.
  2. 컴포넌트가 마운트 될 때 참조값을 그대로 유지한다.
  3. 재 렌더링 되더라도 이전 reference를 가지고 있다.

  **createRef는** 

  1. current가 변경이 되면 re-render가 된다.
  2. 컴포넌트가 마운트 될 때마다 참조값을 새롭게 할당하고, 언마운트 될 경우 null이 들어간다.

<br/>

### 하위 컴포넌트를 변경하기   <a id="a16"></a>

> A - B - C - D - E

- A 의 button 를 클릭하여 E 를 변경하기

  1. 컴포넌트에서 button 에 onClick 이벤트를 만들고,
  2. button 을 클릭하면,  의 state 를 변경하여,  로 내려주는 props 를 변경
  3. B의 props 가 변경되면,  의 props 에 전달
  4. C의 props 가 변경되면,  의 props 로 전달
  5. D의 props 가 변경되면,  의 props 로 전달

  <br/>

### 상위 컴포넌트를 변경하기   <a id="a17"></a>

> A - B - C - D - E

- E 의 button 를 클릭하여 A 의 p 를 변경하려면
  1. A에 함수를 만들고, 그 함수 안에 state 를 변경하도록 구현, 그 변경으로 인해 p 안의 내용을 변경.
  2. 만들어진 함수를 props 에 넣어서,  로 전달
  3. B의 props 의 함수를  의 props 로 전달
  4. C의 props 의 함수를  의 props 로 전달
  5. D의 Props 의 함수를  의 props 로 전달,  에서 클릭하면 props 로 받은 함수를 실행

<br/>

### 하위 컴포넌트 전체에 데이터를 공유하는 법   <a id="a18"></a>

#### Context API, useContext    <a id="a19"></a>

> 하위 컴포넌트 전체에 데이터를 공유하기

- 데이터를 Set하는 것
  - 가장 상위 컴포넌트 → 프로바이더
- 데이터를 get하는 것
  - 모든 하위 컴포넌트에서 접근 가능
    1. 컨슈머로 하는 방법
    2. 클래스 컴포넌트의 this.context로 하는 방법
    3. 펑셔널 컴포넌트의 useContext로 하는 방법

<br/>

#### Set - 최상위 컴포넌트   <a id="a20"></a>

1. 일단 컨텍스트를 생성한다.
2. 컨텍스트, 프로바이더 를 사용한다.
3. value 를 사용

```jsx
// /contexts/PersonContext.js
import React from 'react';

const PersonContext = React.createContext();

export default PersonContext;

// index.js
const persons = [
  { id: 0, name: 'Mark', age: 38 },
  { id: 1, name: 'Hanna', age: 27 },
];

ReactDOM.render(
  <PersonContext.Provider value={persons}>
    <App />
  </PersonContext.Provider>
, document.getElementById('root'));

```

<br/>

#### Get - Consumer   <a id="a21"></a>

1. 컨텍스트를 가져온다.
2. 컨텍스트.컨슈머를 사용한다.
3. value 를 사용

```jsx
// ./components/Example1.js
import React from 'react';
import PersonContext from '../contexts/PersonContext';

const Example1 = () => (
  <PersonContext.Consumer>
    {value => <ul>{JSON.stringify(value)}</ul>}
  </PersonContext.Consumer>
);

export default Example1;

// index.js
import React from 'react';
import Example1 from './components/Example1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Example1 />
      </header>
    </div>
  );
}

export default App;

```

<br/>

#### Get - 클래스로 하는 방법    <a id="a22"></a>

1. static contextType 에 컨텍스트를 설정한다.
2. this.context => value 이다.

```jsx
// ./components/Example2.js
import React from 'react';
import PersonContext from '../contexts/PersonContext';

export default class Example2 extends React.Component {
  static contextType = PersonContext;

  render() {
    return <ul>{JSON.stringify(this.context)}</ul>;
  }
}
// 5번째 줄 대신 이렇게 사용할 수도 있음
// Example2.contextType = PersonContext;

// index.js
import React from 'react';
import Example2 from './components/Example2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Example2 />
      </header>
    </div>
  );
}

export default App;

```

- 치명적인 단점 : 하나밖에 못 쓴다.
  - HOC를 활용하면 여러개를 사용할 수 있지만 번거롭다.

<br/>

#### Get - functional로 하는 방법 (hook) <a id="c1"></a>

1. useContext 로 컨텍스트를 인자로 호출한다.
2. useContext 의 리턴이 value 이다.

```jsx
// ./components/Example3.js
import React, { useContext } from 'react';
import PersonContext from '../contexts/PersonContext';

const Example3 = () => {
  const value = useContext(PersonContext);

  return <ul>{JSON.stringify(value)}</ul>;
};

export default Example3;

// index.js
import React from 'react';
import Example3 from './components/Example3';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Example3 />
      </header>
    </div>
  );
}

export default App;

```

<br/>