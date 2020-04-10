![React with TypeScript](https://user-images.githubusercontent.com/31315644/77824045-edd28b00-7142-11ea-83d8-b88e7cb6c97d.png)

------------

# 타입스크립트로 리액트 Hooks 사용하기 (useState, useReducer, useRef)

## 목차

- [프로젝트 생성](#a1)
- [useState 및 이벤트 관리](#a2)
  - [카운터 만들기](#a3)
  - [인풋 상태 관리하기](#a4)
- [useRef 작성](#a5)
  - [변수 값 관리하기](#a6)
  - [DOM 관리하기](#a7)
- [useReducer](#a9)
  - [카운터를 useReducer 로 다시 구현하기](#a10)
  - [ReducerSample 구현하기](#a11)
- [정리](#a8)

<br/>

----------

### 프로젝트 생성 <a id="a1"></a>

```bash
$ npx create-react-app ts-react-tutorial --typescript
```

`npx` 제일 뒤에 `--typescript` 가 있으면 타입스크립트 설정이 적용된 프로젝트가 생성된다.

만약, 이미 진행 중인 프로젝트에 타입스크립트를 추가하려면 다음과 같은 명령어를 사용한다.

``` bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

타입스크립트를 이용 시 특정 컴포넌트에 필요한 값이나 자동완성이 필요할 땐 `Ctrl + Space` 를 눌러보면 확인 할 수 있다.

<br/>

### useState 및 이벤트 관리 <a id="a2"></a>

> 타입스크립트 환경에서 `useState` 를 사용하는 방법, 이벤트를 다루는 방법을 익힌다.

<br/>

#### 카운터 만들기 <a id="a3"></a>

- Hook을 이용
- useState를 이용

기존과 거의 동일하나 useState를 사용 시 제네릭`<number>`을 통해 해당 상태가 어떤 타입을 가지고 있는 지만 설정한다.

```jsx
// src/Counter.tsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
```

<br/>

````jsx
// src/App.tsx

import React from 'react';
import Counter from './Counter';

const App: React.FC = () => {
  return <Counter />;
};

export default App;
````

<br/>

사실 제네릭을 사용할 의무는 없다. 타입스크립트에서도 제네릭이 없어도 자동 유추하기에 실제로 잘 작동된다. 

Q. 그렇다면, 왜? 어째서? 제네릭을 사용하는가?

**A1. 상태가 `null`일 수도 있고 아닐수도 있을때 Generics 를 활용하면 좋다.**

```typescript
type Information = { name: string; description: string };
const [info, setInformation] = useState<Information | null>(null);
```

<br/>

**A2. 상태의 타입이 까다로운 구조를 가진 객체이거나 배열일 때는 Generics 를 명시하는 것이 좋다.**

```typescript
type Todo = { id: number; text: string; done: boolean };
const [todos, setTodos] = useState<Todo[]>([]);
```

<br/>

#### 인풋 상태 관리하기 <a id="a4"></a>

이벤트를 다룰 때 타입을 지정하는 방법에 대해 알아본다.

```tsx
// src/MyForm.tsx
import React, { useState } from 'react';

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const { name, description } = form;

  const onChange = (e: any) => {
    // e 값을 무엇으로 설정해야할까?
    // 일단 모를떄는 any 로 설정한다.
  };

  const handleSubmit = (e: any) => {
    // 여기도 모르니까 any 로 하겠다.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
```

<br/>

위와같은 코드를 작성 하고서 `event`를 알려면 그냥 `jsx` 태그의 속성(예 : `onSubmit`, `onChange`)에 마우스 커서를 올리게되면 무슨 타입인지 아래 그림처럼 나오게된다. ( 마우스 커서가 박스 밖으로 나가지 않게 조심히 움직여야 한다. )

![Velopert - event image](https://i.imgur.com/PzrJW06.png)

<br/>

따라서 이벤트를 넣을 경우 아래처럼 코드를 작성할 수 있다.

```tsx
// src/MyForm.tsx
import React, { useState } from 'react';

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    }); // 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
```

<br/>

추가적으로 위에 있는 코드를 사용할 `App.tsx`를 작성한다.

```tsx
// src/App.tsx

import React from 'react';
import MyForm from './MyForm';

const App: React.FC = () => {
  const onSubmit = (form : {name: string; description: string}) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit} />;
};

export default App;

```

<br/>

### useRef 작성 <a id="a5"></a>

`useRef`는 리액트 컴포넌트에서 외부 라이브러리의 인스턴스 또는 DOM 을 특정 값 안에 담을 때 이용한다. 

추가적으로, 컴포넌트 내부에서 관리하고 있는 값을 관리할 때 유용하다. 단, 이 값은 렌더링과 관계가 없어야만 한다.

<br/>

#### 변수 값 관리하기 <a id="a6"></a>

타입스크립트 환경에서 `useRef` 를 통해 어떤 변수 값을 관리하고 싶을 땐 다음과 같은 코드를 작성한다.

```tsx
const id = useRef<number>(0);
  const increaseId = () => {
    id.current += 1;
  }

```

`useRef` 를 쓸땐 위와 같은 코드처럼 Generic 을 통해 `~.current` 의 값을 추론 할 수 있다.

<br/>

#### DOM 관리하기 <a id="a7"></a>

DOM을 담을 경우, **반드시 초깃값은 `null`로 설정한다.** 

```tsx
import React, { useState, useRef } from 'react';

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const inputRef = useRef<HTMLInputElement>(null); // null 설정

  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    });
    if (!inputRef.current) { // null 첵킹
      return;
    }
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} ref={inputRef} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;

```

<br/>

`useRef`에 Generic을 설정하고자 할 땐, 이벤트와 동일하게 커서를 올려서 확인할 수 있다.

![Velopert - html image](https://media.vlpt.us/post-images/velopert/814d85b0-e08e-11e9-a5d8-37f75617a124/image.png)

<br/>

추가적으로  `useRef`에 있는 `current` 내에 값을 사용하기 위해선  `null` 체킹을 반드시 해주어야 한다.

특정 값이 정말 유효한지 아닌지 체크를 해야만하는데, TypeScript에서 특정 타입이 `undefined`이거나 `null`일수도 있다면, 해당 값을 체킹하는 습관을 들이자. 그래야 자동완성이나 오류도 사라진다.

```jsx
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    });
    if (!inputRef.current) { // null 첵킹
      return;
    }
    inputRef.current.focus();
};

```

<br/>

### useReducer <a id="a9"></a>

`useReducer` 는 State를 다루는 hooks 이다.

<br/>

#### 카운터를 `useReducer` 로 다시 구현하기 <a id="a10"></a>

아까 만들었던 Counter 컴포넌트를 `useState` 가 아닌 `useReducer` 로 사용하는 코드로 전환해보도록 하자.

```typescript
// src/Counter.tsx

import React, { useReducer } from 'react';

type Action = { type: 'INCREASE' } | { type: 'DECREASE' }; // 이렇게 액션을 | 으로 연달아서 쭉 나열.

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;

```

<br/>

`Action` 부분을 보시면 다음과 같이 `|` 라는 문자를 사용했는데 이 문자는 OR 를 의미한다.

```typescript
type Action = { type: 'INCREASE' } | { type: 'DECREASE' }; // 이렇게 액션을 | 으로 연달아서 쭉 나열.

```

결국 위 코드는 Action 의 타입은 `{ type: 'INCREASE' }` 또는 `{ type: 'DECREASE' }` 라는 것을 명시해준다.

<br/>

 `reducer` 함수의 맨 윗줄을 확인해보자.

```typescript
function reducer(state: number, action: Action): number 

```

 `state`의 타입과 함수의 리턴 타입이 동일하다. 리듀서를 만들 땐 이렇게 파라미터로 받아오는 상태의 타입과 함수가 리턴하는 타입을 동일하게 하는 것이 매우 중요하다. 이렇게 리턴 타입을 상태와 동일한 타입으로 설정함으로써 실수들을 방지 할 수 있다. (예: 특정 케이스에 결과값을 반환하지 않았거나, 상태의 타입이 바뀌게 되었을 경우 에러를 감지해낼 수 있다.)

지금은 액션들이 `type` 값만 있어서 굉장히 간단 하지만, 만약 액션 객체에 필요한 다른 값들이 있는 경우엔 다른 값들도 타입 안에 명시를 해주면 추후 리듀서를 작성 할 때 액션 객체 안에 무엇이 들어있는지도 자동완성을 통해서 알 수 있다. 추가적으로, 새로운 액션을 디스패치 할 때에도 액션에 대한 타입스크립트 타입검사도 해야한다.

<br/>

#### ReducerSample 구현하기 <a id="a11"></a>

 자동완성이 되는 것과 타입검사가 되는 것을 직접 확인해보기 위하여 ReducerSample 라는 컴포넌트를 만들어보도록 하자. src 디렉터리에 ReducerSample.tsx 라는 파일을 생성하고, 다음 코드를 쭉 따라서 작성해보자. 코드를 작성하는 과정에서 코드가 자동완성이 되는 것도 볼 수 있을 것이고, 만약에 필요한 값을 빠뜨리면 에러가 발생 하는 것도 볼 수 있다.

<br/>

```tsx
// src/ReducerSample.tsx

import React, { useReducer } from 'react';

type Color = 'red' | 'orange' | 'yellow';

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: Color }
  | { type: 'TOGGLE_GOOD' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count // count가 자동완성되며, number 타입.
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text // text가 자동완성되며, string 타입.
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color // color 가 자동완성되며, color 가 Color 타입.
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      };
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hello',
    color: 'red',
    isGood: true
  });

  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 }); // count 를 넣지 않으면 에러발생
  const setText = () => dispatch({ type: 'SET_TEXT', text: 'bye' }); // text 를 넣지 않으면 에러 발생
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'orange' }); // orange 를 넣지 않으면 에러 발생
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <div>
      <p>
        <code>count: </code> {state.count}
      </p>
      <p>
        <code>text: </code> {state.text}
      </p>
      <p>
        <code>color: </code> {state.color}
      </p>
      <p>
        <code>isGood: </code> {state.isGood ? 'true' : 'false'}
      </p>
      <div>
        <button onClick={setCount}>SET_COUNT</button>
        <button onClick={setText}>SET_TEXT</button>
        <button onClick={setColor}>SET_COLOR</button>
        <button onClick={toggleGood}>TOGGLE_GOOD</button>
      </div>
    </div>
  );
}

export default ReducerSample;

```

<br/>

### 정리 <a id="a8"></a>

- `useState`를 사용 할 때에는 `useState` 과 같이 Generics 를 사용한다.
- `useState`의 Generics 는 상황에 따라 생략 할 수도 있는데, 상태가 `null` 인 상황이 발생 할 수 있거나, 배열 또는 까다로운 객체를 다루는 경우 Generics 를 명시해야 한다.
- `useRef`를 사용 할 땐 Generics 로 타입을 정한다.
- `useRef`를 사용하여 DOM에 대한 정보를 담을 땐, 초깃값을 `null` 로 설정해야 하고 값을 사용하기 위해서 `null` 체킹도 해야 한다.
- `useReducer`를 사용 할 때에는 액션에 대한 타입스크립트 타입들을 모두 준비해서 `|` 문자를 사용하여 결합시켜한다.
- 타입스크립트 환경에서 `useReducer` 를 쓰면 자동완성이 잘되고 타입체킹도 잘 된다.

-----------

### Reference

- [velopert.log : 타입스크립트로 리액트 Hooks 사용하기 (useState, useReducer, useRef)](https://velog.io/@velopert/using-hooks-with-typescript)

