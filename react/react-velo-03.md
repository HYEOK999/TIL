![atom](https://user-images.githubusercontent.com/31315644/70208176-328b7e00-1770-11ea-80d4-4658832d5d5f.jpg)

------

## React with Velopert - 02 -

- JSX

  - JSX 란?

    - JSX를 사용하는 이유

  - JSX 작성 주의점
  
    - [null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않게 된다.](#a0)
  
    - [`class` 가 아니라 `className` 으로 정의해야한다.](#a1)
    - [`<img>` 안에 무조건 alt 속성을 작성해야한다.](#a2)
    - [변수를 값으로 대입할 수 있다.](#a3)
    - [모든 태그는 반드시 닫혀야 한다.](#a4)
    - [2개 이상의 태그는 모두 하나의 태그 내부로 감싸야만 한다.](#a5)
    - [style 작성](#a6)

<br/>

------

# Chap 2. JSX

## JSX

<br/>

### JSX 란 ? 

> Javascript Extention의 약자이다.
>
> 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX 를 JavaScript 로 변환을 해준다.

예를들면, JSX로 다음과 같은 코드가 있다가 가정한다.

~~~jsx
 <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
     		</a>
			</header>
</div>
~~~

위 코드가 실행될 때 **transpiler**인 Babel이 JS의 파서가 읽을 수 있게끔 변형 시켜준다.

변형 시켜주면 다음과 같은 코드가 된다.

~~~javascript
"use strict";

React.createElement("div", {
  className: "App"
}, React.createElement("header", {
  className: "App-header"
}, React.createElement("img", {
  src: logo,
  className: "App-logo",
  alt: "logo"
}), React.createElement("p", null, "Edit ", React.createElement("code", null, "src/App.js"), " and save to reload."), React.createElement("a", {
  className: "App-link",
  href: "https://reactjs.org",
  target: "_blank",
  rel: "noopener noreferrer"
}, "Learn React")));
~~~

<br/>

#### JSX를 사용하는 이유

Virtual DOM은 JS 객체고 객체 안에서 태그, 속성, 자식노드들을 정의를 해주어야 한다. 

그러한 정의를 우리는 `React.createElement()`함수를 통해 작성을 할 수 있는데,

`React.createElement("div",{ ... }, ...);`형태로 코드를 게속 작성한다면 아마도 React를 사용하지 않을 것이다.

이유는 가독성면, 유지보수면 등등 사용하기가 너무나 불편한다.

반면에 우리가 익숙한 HTML 코드를 js 위에서 사용하는 것은 크게 불편하지 않기 때문에 JSX를 사용한다.

<br/>

### JSX 작성 주의점

-  **JSX 에서 값으로 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않게 된다.** <a id="a0"></a>

- **`class` 가 아니라 `className` 으로 정의해야한다.** <a id="a1"></a>

html 시

```html
<div class="App">
```

jsx 시

```html
<div className="App">
```

<br/>

- **`<img>` 안에 무조건 alt 속성을 작성해야한다.** <a id="a2"></a>

```html
<img src={logo} className="App-logo" alt="logo" />
```

<br/>

- **변수를 값으로 대입할 수 있다. ** <a id="a3"></a>

~~~jsx
function App() {
	const logo = "http://localhost:3000/static/media/logo.25bf045c.svg"
	return (
    	<img src={logo} className="App-logo" alt="logo" />
    );
}
~~~

<br/>

- **모든 태그는 반드시 닫혀야 한다.** <a id="a4"></a>

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <div> {/* 에러 */}
    </div>
  );
}
      
export default App;
~~~

<br/>

- **2개 이상의 태그는 모두 하나의 태그 내부로 감싸야만 한다.** <a id="a5"></a>

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    {/*
    이런식으로 작성하면 안된다.
      <Hello />
      <div>안녕히계세요</div>
    */}
    <div>
      <Hello />
      <div>안녕히계세요</div>
    </div>
  );
}

export default App;
~~~

➤ 만약 특정 태그를 이용해 불필요한 태그를 남용하기 싫다면 **리액트 Fragment를 이용**한다.

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <> {/* 리액트 Fragment */}
      <Hello />
      <div>안녕히계세요</div>
    </>
  );
}
~~~

<br/>

- **style 작성** <a id="a6"></a>

➤ 인라인 스타일은 객체 형태로 작성

➤ `background-color` 처럼 `-` 로 구분되어 있는 이름들은 `backgroundColor` 처럼 **camelCase 형태로 네이밍**

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
  	<>
  		</Hello>
      <div style={style}>{name}</div>
  	</>
  );
}
export default App;
~~~

<br/>