![React06](https://user-images.githubusercontent.com/31315644/71559900-d84bb780-2aa6-11ea-8fa8-c920fe4229f4.png)

------

## React with Velopert - 06 -

- input 상태 관리하기
  - 예제 : input 박스 입력 및 초기화 버튼 만들기
    - App.js
    - InputSample.js

<br/>

------

# Chap 6. input 상태 관리하기

## input 상태 관리하기

> 이번에는 리액트에서 사용자가 입력 할 수 있는 input 태그의 상태를 관리하는 방법을 알아보자.

<br/>

### 예제 : input 박스 입력 및 초기화 버튼 만들기

#### App.js

```jsx
import React from 'react';
import InputSample from './InputSample';

function App() {
  return (
    <InputSample />
  );
}

export default App;
```

<br/>

#### InputSample.js

`useState`를 사용해서 버튼을 초기화하는 작업을 해보도록한다.

input의 `onChange` 이벤트를 사용하도록한다. 이벤트에 등록하는 함수에서는 이벤트객체(e)를 파라미터로 받아와서 사용하는데 

e.target은 이벤트가 발생한 DOM인 input DOM을 가르키게 된다.

DOM의 `value` 값 즉, `e.target.value`를 조회하면 현재 input에 입력한 값이 무엇인지 확인할 수 있다.

```jsx
import React, { useState } from 'react';

function InputSample() {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text}  />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```

input 의 상태를 관리할 때에는 input 태그의 `value` 값도 설정해주는 것이 중요하다. 

상태가 바뀌었을때 input 의 내용도 업데이트 된다.