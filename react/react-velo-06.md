![React05](https://user-images.githubusercontent.com/31315644/71559899-d84bb780-2aa6-11ea-9f44-1e87b42ebcfb.png)

------

## React with Velopert - 05 -

- useState
  - 예제 : 버튼을 누르면 숫자가 바뀌는 Counter 컴포넌트
    - App.js
    - Counter.js
    - [이벤트 설정하기](#a1)
  - [동적인 값 끼얹기, useState](#a2)
    - 예제 : Counter.js에 Hook 사용해서 상태 관리해보기
  - [정리](#a3)
    - 정리 - useReact  사용방법1 : 모듈 import 하기. 
    - 정리 - useReact  사용방법2 : 함수 호출하여 사용하기.
    - 정리 - useReact  사용방법3 : 상태 변경 및 조회하기.
  - [함수형 업데이트](#a4)
    - Counter.js

<br/>

------

# Chap 5. useState를 통해 컴포넌트에서 바뀌는 값 관리하기

## useState

> 리액트 16.8 이전 버전에서는 함수형 컴포넌트에서는 상태를 관리할 수 없었다. 하지만, 리액트 16.8 에서 Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태를 관리할 수 있게 되었다. 
>
> 이번에는 useState 라는 함수를 사용해보게 되는데, 이게 바로 리액트의 Hooks 중 하나이다.

<br/>

### 예제 : 버튼을 누르면 숫자가 바뀌는 Counter 컴포넌트

#### App.js

```jsx
import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <Counter />
  );
}

export default App;
```

<br/>

#### Counter.js

`Counter`에서 버튼이 클릭되는 이벤트가 발생 했을 때, 특정 함수가 호출되도록 설정을 해보자.

```jsx
import React from 'react';

function Counter() {
  const onIncrease = () => {
    console.log('+1')
  }
  const onDecrease = () => {
    console.log('-1');
  }
  return (
    <div>
      <h1>0</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

`onIncrease` 와 `onDecrease`라는 함수를 각각 만들고 이벤트를 설정 해주자.

<br/>

#### 이벤트 설정하기 <a id="a1"></a>

리액트에서 엘리먼트에 이벤트를 설정해줄때에는 `on이벤트이름={실행하고싶은함수}` 형태로 설정해야 한다.

**함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안된다.**

이유는 렌더링되는 시점에서 함수가 호출되버리기 때문이다.

이벤트를 설정할때에는 함수타입의 값을 넣어주어야 한다는 것, 주의하자.

```jsx
// 틀린방식
<button onClick={onIncrease()}>+1</button>
<button onClick={onDecrease()}>-1</button>
      
// 올바른 방식1
<button onClick={onIncrease}>+1</button>
<button onClick={onDecrease}>-1</button>

// 올바른 방식2 : 직접 Click 내부 화살표 함수로 구현해도 된다.
<button onClick={() => {console.log('+1')}}>+1</button>
<button onClick={() => {console.log('-1')}}>-1</button>
```

<img src="https://i.imgur.com/534RyIz.png" alt="img" style="zoom:50%;" />

<br/>

### 동적인 값 끼얹기, useState <a id="a2"></a>

컴포넌트에서 동적인 값을 상태(state)라고 칭한다.

리액트에는 useState라는 함수가 있는데 컴포넌트에서 상태를 관리할 수 있게하는 함수다.

**리액트 훅 함수를 사용할 때 훅을 포함하는 함수명에 주의를 해야만한다.**

**Hook 함수는 자신을 포함하고 있는 함수가 컴포넌트인지 판별하는 기준은 첫글자가 대문자로 시작하는지 안하는지의 차이다.**

**따라서 컴포넌트를 작성할 때는 반드시 대문자 네이밍인 파스칼케이스를 지키도록하자.**

```jsx
// 틀린 방법
function counter() {
  const [number, setNumber] = useState(0);
 
  return ...
}

// 올바른 방법
function Counter() {
  const [number, setNumber] = useState(0);
 
  return ...
}
```

<br/>

#### 예제 : Counter.js에 Hook 사용해서 상태 관리해보기

```jsx
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

위와 같이 작성했다면 숫자가 변경이 될 것이다.

<img src="https://i.imgur.com/8LxuRm1.png" alt="img" style="zoom:50%;" />

<br/>

### 정리 <a id="a3"></a>

#### 정리 - useReact  사용방법1 : 모듈 import 하기. 

사용하고자하는 파일에서 import 해준다.

```jsx
import React, { useState } from 'react';
```

<br/>

#### 정리 - useReact  사용방법2 : 함수 호출하여 사용하기.

useReact는 호출 시 배열을 반환하는 것을 이용하여 배열 비구조화 할당을 이용할 수 있다.

첫번째 요소는 현재상태, 2번째 요소는 Setter함수이다.

```jsx
// 기본적인 사용방법
const numberState = useState(0);
const number = numberState[0];
const setNumber = numberState[1];

// 배열 비구조화 할당을 이용하여 쉽게 이용하기.
const [number, setNumber] = useState(0);
```

<br/>

#### 정리 - useReact  사용방법3 : 상태 변경 및 조회하기.

```jsx
 // 상태 변경 하기
 const onIncrease = () => {
   setNumber(number + 1);
 }

 const onDecrease = () => {
   setNumber(number - 1);
 }
 
 // 상태 조회하기
return (
  <div>
    <h1>{number}</h1>
    <button onClick={onIncrease}>+1</button>
    <button onClick={onDecrease}>-1</button>
  </div>
);
```

<br/>

### 함수형 업데이트 <a id="a4"></a>

Setter 함수를 사용 할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있다, 다른 방법으로는 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있다.

#### Counter.js

```jsx
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;

```

`onIncrease` 와 `onDecrease` 에서 `setNumber` 를 사용 할 때 그 다음 상태를 파라미터로 넣어준것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어주었다.

함수형 업데이트는 주로 나중에 컴포넌트를 최적화를 하게 될 때 사용하게 된다.

<br/>