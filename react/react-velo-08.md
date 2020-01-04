![React07](https://user-images.githubusercontent.com/31315644/71559901-d84bb780-2aa6-11ea-83cd-9a50a853e25f.png)

------

## React with Velopert - 07 -

- 여러개 input 상태 관리하기
  - 예제 : 여러 input 박스 입력 및 초기화 버튼 만들기 (상태 관리하기)
    - App.js
    - InputSample.js
    - [주의점-불변성](#a1)

<br/>

------

# Chap 7. 여러개의 input 상태 관리하기

## 여러개 input 상태 관리하기

> input 상태가 다수 일 경우 관리를 하는 방법을 알아보자.

<br/>

### 예제 : 여러 input 박스 입력 및 초기화 버튼 만들기 (상태 관리하기)

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

input 의 개수가 여러개가 됐을때는, 단순히 `useState` 를 여러번 사용하고 `onChange` 도 여러개 만들어서 구현 할 수 있다. 

하지만 그 방법은 가장 좋은 방법은 아니다. 더 좋은 방법은, input 에 `name` 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이다. 

그리고, `useState` 에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 한다.

기존의 InputSample 컴포넌트를 다음과 같이 수정해보자.

```jsx
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

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
    })
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
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

<br/>

#### 주의점-불변성 <a id="a1"></a>

React에서 객체 상태를 수정할 때는 다음과 같이 직접적으로 값을 할당해서는 안된다.

```javascript
inputs[name] = value;	
```

`inputs[name] = value` 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다.

<br/>

React에서는 객체 내용을 수정할 때, 반드시 객체로 반환해야한다.

여기서 주의점은 **객체로 반환시 기존의 객체에 덮어씌우는 꼴이기 때문에 전의 내용은 유지를 할 수가 없다. **

**전의 내용을 유지하고 싶다면 반드시 Spread(...)문법이나 Object.assign 함수등을 이용해 복사해야만 한다.** 

```jsx
setInputs({
  ...inputs,
  [name]: value
});
```

이러한 작업들은 '불변성'을 지키기 위함인데 리액트가 컴포넌트에서 상태가 업데이트가 됬음을 감지하고 이에 따라 필요한 렌더링을 진행할 수 있다.

리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다. 

참고로, Redux에서도 위와 같은 이유로 반드시 새로운 객체를 반환해야만 한다.