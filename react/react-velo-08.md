![React08](https://user-images.githubusercontent.com/31315644/71559902-d84bb780-2aa6-11ea-97ea-0bbc18465b47.png)

------

## React with Velopert - 08 -

- useRef

  - [예제 : 초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡히도록 `useRef` 를 사용하여 기능을 구현](#a1)
    - [InputSample.js](#a2)
  
  

<br/>

------

# Chap 8. useRef 로 특정 DOM 선택하기

## useRef

<br/>

JavaScript 를 이용하여 특정 DOM을 선택하는 상황에서 우리는 `getElementById`, `querySelector` 같은 DOM Selector 함수를 사용해서 DOM을 선택하고는 했다.

- 엘리먼트의 크기 필요 
- 스크롤바 위치 설정
- 포커스를 지정
- Video.js, JWPlayer 같은 HTML Video 관련 라이브러리
- D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리
- etc...

위와 같은 여러가지 복잡한 상황 속에서는 리액트도 직접적으로 DOM을 선택해야만 한다.

여기서 리액트는 `ref` 를 사용한다.

- 함수형 컴포넌트에서 `ref` 를 사용 할 때에는 `useRef` 라는 Hook 함수를 이용한다.
- 클래스형 컴포넌트에서는 콜백함수, `React.createRef` 라는 함수를 이용한다.

<br/>

### 예제 : 초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡히도록 `useRef` 를 사용하여 기능을 구현 <a id="a1"></a>

전에 만든 InputSample.js 에서는 초기화 버튼을 누르면 포커스가 초기화 버튼에 그대로 남아있게 되었다.

이번에는 초기화 버튼을 클릭 시 input에 포커스가 잡히는 기능을 구현해본다.

#### InputSample.js <a id="a2"></a>

```jsx
import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };


  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

`useRef()` 를 사용하여 Ref 객체를 만들고, 이 객체를 선택하고 싶은 DOM 에 `ref` 값으로 설정해주어야 한다. 

그러면, Ref 객체의 `.current` 값은 우리가 원하는 DOM 을 가르키게 된다.

위 예제에서는 `onReset` 함수에서 input 에 포커스를 하는 `focus()` DOM API 를 호출해주었다.

이제 input 에 포커스가 잘 잡힐 것 이다.

<br/>