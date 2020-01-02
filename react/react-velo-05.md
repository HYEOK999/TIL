![React04](https://user-images.githubusercontent.com/31315644/71559898-d7b32100-2aa6-11ea-87c9-bf337b9df693.png)

------

## React with Velopert - 04 -

- 조건부 렌더링
  - 예제
    - App.js
    - Hello.js
  - React에서 연산자의 쓰임처
    - Hello.js
  - props 값 설정을 생략하면 ={true}
    - App.js

<br/>

------

# Chap 4. 조건부 렌더링

## 조건부 렌더링

> 조건을 이용하여 렌더링 결과를 결정할 수 있다.

### 예제

App.js / Hello.js 2가지 파일이 있다.

Hello 컴포넌트에서는 `isSpecial` 이 `true` 이냐 `false` 이냐에 따라서 컴포넌트의 좌측에 * 표시를 보여주는 예제를 작성하자.

<br/>

#### App.js

```jsx
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';


function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true}/>
      <Hello color="pink" />
    </Wrapper>
  )
}
	
export default App;
```

<br/>

#### Hello.js

```jsx
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

`isSpecial` 값이 `true` 라면 `*` 를, 그렇지 않다면 `null` 을 보여주도록 했다. 

리액트의 JSX에서는 `null` , `false`, `udefined` 를 렌더링하게 될 경우 렌더링을 하지 않게된다.

주의할 점은 JS에서 0은 조건상 `false`로서 인식을 하지만, JSX에서는 0을 그대로 렌더링하는 것에 주의해야한다.

<br/>

### React에서 연산자의 쓰임처

해당 연산자들은 JS의 단축평가를 기준으로 한다.

- 삼항연산자 :  특정 조건에 따라 보여줘야 하는 내용이 다를 때
- &&연산자 : 특정 조건이 `true` 이면 보여주고, `false`라면 숨길때
- `||` 연산자 : 둘중 하나라도 보여줘야 할때

#### Hello.js

```javascript
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

<br/>

### props 값 설정을 생략하면 ={true}

컴포넌트의 props 값을 설정하게 될 때 만약 props 이름만 작성하고 값 설정을 생략한다면, 이를 `true` 로 설정한 것으로 간주한다.

예를 들자면,

#### App.js

```javascript
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
```

**이렇게 `isSpecial` 이름만 넣어주면 `isSpecial={true}` 와 동일한 의미이다.**

<br/>

