![atom](https://user-images.githubusercontent.com/31315644/70208176-328b7e00-1770-11ea-80d4-4658832d5d5f.jpg)

------

## React with Velopert - 03 -

- props 를 통해 컴포넌트에게 값 전달하기

  - props 란 ?

    - [props의 기본 사용법](#b1)
    - [여러개의 props, 비구조화 할당(디스트럭처링)](#b2)
    - [defaultProps 로 기본값 설정](#b3)
    - [props.children](#b4)
- 조건부 렌더링
  - [예제 : 특정 props의 값이 true 또는 false 에 따라서 컴포넌트의 좌측에 *표시하기.](#a0)
  - [props 값 설정을 생략하면 ={true}](#a1)

<br/>

------

# Chap 3. props , 조건부 렌더링

## props 를 통해 컴포넌트에게 값 전달하기

<br/>

### props 란 ? 

> properties의 줄임말 
>
> 어떠한 값을 컴포넌트에게 전달할 때 사용.

<br/>

#### props의 기본 사용법 <a id="#b1"></b>

`name` 속성 값 전달하기.

App 컴포넌트 ⇢ Hello 컴포넌트 

src > App.js

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;
~~~

<br/>

src > Hello.js

~~~jsx
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
~~~

컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다. 

**props 는 객체 형태로 전달**되며, 만약 `name` 값을 조회하고 싶다면 `props.name` 을 조회하면 된다.

![결과](https://user-images.githubusercontent.com/31315644/70218498-6e314280-1786-11ea-81af-3977c884a99d.jpeg)

<br/>

#### 여러개의 props, 비구조화 할당(디스트럭처링) <a id="#b2"></b>

App 컴포넌트 ⇢ Hello 컴포넌트 

src > App.js

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}

export default App;
~~~

<br/>

src > Hello.js

~~~jsx
import React from 'react';

function Hello({color, name}) {
  {/* 기본
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>  
  */}
  return <div style={{ color }}>안녕하세요 {name}</div> {/* 비구조화 할당 디스트럭처링 */}
}

export default Hello;
~~~

<br/>

#### defaultProps 로 기본값 설정 <a id="#b3"></b>

App 컴포넌트 ⇢ Hello 컴포넌트 

src > App.js

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}

export default App;
~~~

<br/>

src > Hello.js

~~~jsx
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
~~~

![결과](https://user-images.githubusercontent.com/31315644/70218495-6d98ac00-1786-11ea-9c6e-ea7a5f5d1186.jpeg)

<br/>

#### props.children <a id="#b4"></b>

컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children` 을 조회하면 된다.

**먼저 아래와 같이 작성했을 경우 Hello Component가 보이지 않는다.**

App 컴포넌트 ⇢ Hello 컴포넌트 

src > Wrapper.js

~~~jsx
import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
    </div>
  )
}

export default Wrapper;
~~~

src > App.js

~~~jsx
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
~~~

<br/>

내부의 내용이 보여지게 하기 위해서는 Wrapper 에서 `props.children` 을 렌더링 해야만 한다.

src > Wrapper.js

~~~jsx
import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
   		{children}
    </div>
  )
}

export default Wrapper;

~~~

src > App.js

~~~jsx
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;

~~~

<br/>

## 조건부 렌더링

> 특정 조건에 따라 다른 결과물을 렌더링 하는 것.

#### 예제 : 특정 props의 값이 true 또는 false 에 따라서 컴포넌트의 좌측에 *표시하기.<a id="a0"></a>

src > App.js

~~~jsx
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

~~~

<br/>

src > Hello.js

Hello 컴포넌트에서는 isSpecial 이 `true` 이냐 `false` 이냐에 따라서 컴포넌트의 좌측에 * 표시한다.

참고로 JSX 에서 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않게 된다.

~~~jsx
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name}
    </div>
  );
}

~~~

**보통 삼항연산자를 사용한 조건부 렌더링을 주로 특정 조건에 따라 보여줘야 하는 내용이 다를 때 사용**

아래처럼 `&&`를 사용한 단축평가를 활용 할 수 도 있다.

~~~jsx
<div style={{ color }}>
  {isSpecial && <b>*</b>}
  안녕하세요 {name}
</div>

~~~

<br/>

#### props 값 설정을 생략하면 ={true} <a id="a1"></a>

컴포넌트의 props 값을 설정하게 될 때 만약 props 이름만 작성하고 값 설정을 생략한다면, 이를 `true` 로 설정한 것으로 간주한다.

src > App.js

~~~jsx
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

~~~

