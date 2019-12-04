![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 02

- JSX 란?
  - JSX를 사용하는 이유
  - JSX 내부 작성 주의점
- Virtual DOM 
  - Virtual DOM(가상 돔)의 사용이유
  - Virtual DOM(가상 돔)의 장점 & 단점
  - VirtualDOM이 받는 파라미터 세가지 (type, props, ...child)
- ReactDOM.render() 함수
  - React 상태 업데이트 순서
- import React 와 import ReactDOM 자세하게 알아보기.
- props 작성 규칙
- Component 
  - Component를 정의하는 방법 2가지 
  - Component 주의 사항 및 주요 코드
- 상태 변화
  - 상태변화 사용 2가지 방법
- 초시계 만들어보기
- Mounting : Component 가 생성되고 DOM에 inject 되는 것.

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- JSX
- Virtual DOM
- Component
- Component 주의사항
- Reach 상태 변화
- props 작성 규칙

<br/>

--------

### JSX 란 ? 

> Javascript xml의 약자이다.
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

`React.createElement("div",{ ... }, ...);`형태로 코드를 게속 작성한다면 아마도 React를 사용하지 않을 것이다.

이유는 가독성면, 유지보수면 등등 사용하기가 너무나 불편한다.

반면에 우리가 익숙한 HTML 코드를 js 위에서 사용하는 것은 크게 불편하지 않기 때문에 JSX를 사용한다.

<br/>

#### JSX 내부 작성 주의점

1. `class` 가 아니라 `className` 으로 정의해야한다.

html 시

```html
<div class="App">
```

jsx 시

```html
<div className="App">
```

<br/>

2. `<img>` 안에 무조건 alt 속성을 작성해야한다.

```html
<img src={logo} className="App-logo" alt="logo" />
```

<br/>

3. 변수를 값으로 대입할 수 있다.

~~~javascript
logo = "http://localhost:3000/static/media/logo.25bf045c.svg"
// jsx 태그
<img src={logo} className="App-logo" alt="logo" />
~~~

<br/>

### Virtual DOM 

React는 라이브러리다. 특정 DOM요소에 대해서 리액트 라이브러리를 적용하는 것이다.

여기서 말하는 리액트 라이브러리는 Virtual DOM(가상 돔)을 이용한 리액트를 말하는데, 리액트는 실제 DOM이 아닌 Virtual DOM(가상 돔)을 이용한다.

<br/>

#### Virtual DOM(가상 돔)의 사용이유

Vanilla JS 를 이용해 개발을 진행하다보면 게속적으로 DOM요소에 접근하기 위한 변수를 생성 하고 동적인 UI를 처리하기 위해서 이벤트 처리나 인터렉션이 지속적으로 늘어나고 유지보수가 점점 힘들어지게 된다.

이러한 이유로, React는 특정 DOM요소에 대한 동적인 업데이트의 처리를 규칙으로 정하는게 아니라, 동적으로 바뀔때마다 지우고 새로 그려내자는 식으로 하게된다.

여기서 문제는, 매번 새로 그린다면 속도 저하라는 문제가 생기는데 여기서 해결책으로 Virtual DOM(가상 돔)을 이용하게 된 것 이다.

<br/>

#### Virtual DOM(가상 돔)의 장점 & 단점

**Virtual DOM의 장점** : 브라우저에 실제로 보여지는 DOM 이 아니라 그냥 메모리에 가상으로 존재하는 DOM 으로서 그냥 JavaScript 객체이기 때문에 작동 성능이 실제로 브라우저에서 DOM 을 보여주는 것 보다 속도가 훨씬 빠르다. 

**Virtual DOM의 단점(React의 단점)** : 라이브러리를 만드는데 반드시 실제 DOM 요소 1가지(이상)를 필요로 한다.

<br/>

#### VirtualDOM이 받는 파라미터 세가지 (type, props, ...child)

- type : 어떠한 종료의 Virtual DOM인가 (태그인가)
- props : 해당 DOM에 어트리뷰트가 무엇인가 (속성)
- ...child : 해당 Virtual DOM에 자식 요소가 무엇인가 ? ( REST파라미터로 배열로 받는다. )

<br/>

### ReactDOM.render() 함수

~~~javascript
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render( 가상 DOM, 실제 DOM);
~~~

<br/>

#### React 상태 업데이트 순서

1. React는 상태가 업데이트 되면, 업데이트가 필요한 곳의 UI 를 Virtual DOM 을 통해서 렌더링한다. 
2. React가 제공하는 비교 알고리즘을 통하여 실제 브라우저에 보여지고 있는 DOM 과  Virtual DOM을 비교 한 후, 차이가 있는 곳을 감지하여 이를 실제 DOM 에 패치킨다. 

<br/>

### import React 와 import ReactDOM 자세하게 알아보기.

App.js ▾

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```
위 두 코드를 대체하는 코드 ▾
```jsx
// 주석이 아니라 리액트 함수 말고 내가만든 커스텀 함수를 쓰겠다는 뜻
/** @jsx customDOM */
function customDOM (...props) {
    return props
  }

  const App =  <div className="App"> // 1번
  <header className="App-header">
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
  export default App
```

1번 `const App` 안에 html으로 보이는 태그들은 실제 html 태그가 아닌 가상 DOM 요소이다.

<br/>

### props 작성 규칙

카멜 케이스를 사용한다.

- 예) className, onClick, onLoad....

<br/>

### Component 

> UI를 재사용 가능한 개별적인 부분들로 분리한다.
>
> 유지보수, 가독성이 좋다.

Component는 데이터가 들어있는 props를 받고, React Element들을 return 한다.

<br/>

#### Component를 정의하는 방법 2가지 

- 함수로 정의 

  ~~~~jsx
  function Welcom(props) {
  	return <h1> Hello, {props.name} </h1>
  }
  ~~~~

- ES6 class로 정의

  ~~~jsx
  class Welcome extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        counter: 0,
        className: 'App-header'
      }
      this.add = this.add.bind(this)
      this.minus = this.minus.bind(this)
    }
    
  	render() {
      return <h1> Hello, {this.props.name} </h1>
  	}
  }
  ~~~

<br/>

#### Component 주의 사항 및 주요 코드

- 중복된 코드를 반복하지 않고 컴포넌트를 작성한다.
- 임의의로 선언하는 모든 컴포넌트(커스텀 컴포넌트)의 명칭의 시작은 **무조건 대문자**로 시작한다.

```jsx
// 대문자
const Header = props => <header>{props.children}</header>

function App() {
  return (
    <div className="App">
      <Header className="App-header">
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
      </Header>
    </div>
  );
}
```

- header ➤ type

- className ➤ props
  - prop은 property의 줄임말, 변수 선언문 뒤에 나오는 모든 속성 태그들

- children ➤ 헤더 태그 사이의 (하위)자식 요소들
  - props.children으로 모두 들어감

상태 변화가 없는 컴포넌트 : Stateless Component

상태 변화가 있는 컴포넌트 : State Component

<br/>

### 상태 변화

> setState( )함수를 이용한다.

`setState()`는 비동기 함수로, state가 반영된 상태에서 무언가를 하고 싶을 때 2번째 인수를 콜백함수로 전달한다.

<br/>

#### 상태변화 사용 2가지 방법

- React element에 이벤트를 닫아 함수를 연결할 때, 파라미터를 전달하는 경우 화살표함수를 사용해야 한다.

~~~jsx
<button onClick = { () =>  this.calc(100)}> + </button>
~~~

<br/>

- 파라미터를 전달하지 않은 경우에는 this를 바인딩 해줘야 한다.

~~~jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      className: 'App-header'
    }
    this.add = this.add.bind(this)
    this.minus = this.minus.bind(this)
  }
  
   // render 이후에 실행됨.
  componentDidMount() {
    setInterval(() => this.setState({
      counter : this.state.counter + 1
    }),1000)
  }
  add() {
    console.log(this);
    this.setState({counter: this.state.counter + 100})
  }
  minus() {
    this.setState({counter: this.state.counter - 100})
  }
~~~

~~~jsx
render(){
  return (
    <div className="App">		
			<button onClick={this.add}>+</button>
    </div>
  );
}
~~~

<br/>

### 초시계 만들어보기

> **setState**(중요한 메소드)를 써서 데이터의 상태 변화를 사용할 수 있다.

**주의사항** : `this.state.counter = 1` 이런식으로 직접적으로 state를 바꿔서는 절대 안된다.

```javascript
  componentDidMount() {
    setInterval(() => this.setState({
      counter: ++this.state.counter 			// 절대로 이런식으로 사용해선 안된다.
      counter: this.state.counter + 1			// 이렇게 사용해야 함
    })
  )}
```

- React에서는 상태 변화를 직접적으로 변경 해서는 안된다. ( 오직 setState만 사용하여야 함 )
- setState는 비동기함수. 콜백함수를 전달받을 수 있다.

- 정의하지 않았는데 자동으로 뜨는것들은 전부 오버라이드 하는 것.
  
➤ 예) componentDidMount( React.Component ) 같은 것.
  
- 함수에 setState를 사용하기 위해서는 바인드로 this를 넘겨줘야 함.
  
  ➤ constructor에서 `this.add = thid.add.bind(this)`
  
  ➤ 화살표 함수로 이벤트를 넘기면 바인딩이 필요 없음 - this에 대한 바인딩 필요없이 함수를 무조건 호출하고 리턴하는 것.

```jsx
add (val) {
  this.setState({ counter: this.state.counter + val })
}
<button onClick={() => this.add(100)}>+</button> // componentDidMount 에 작성

add () {
  this.setState({ counter: this.state.counter + 100 })
}
<button onClick={this.add}>+</button> // componentDidMount 에 작성
this.add = this.add.bind(this) // class App 에 작성
```

- 특정한 인자 값을 넘길때만 화살표 함수를 사용하는 것이 좋고, 아래쪽처럼 바인딩 하는것이 좋은 방법(메모리상의 이유).

- `this`라는 건 결국 객체.
- 바인딩해야할 함수가 수백 수천개일 경우에는?
  - `Object.keys()` 를 이용한다.

```javascript
const obj = {
  name: 'dahee',
  email: 'a@a.a'
}

console.log(Object.keys(obj))
// [ 'name', 'email' ]
```

- 위를 이용하여 만든 바인드 코드

```javascript
this.add = this.add.bind(this) // 일일이 사용해서 불편하다.

// Objectt.key를 이용해 간편히 이용한다.
Object.keys(this).forEach(key => {
  if (typeof this[key] === 'function') {
    this[key] = this[key].bind(this)
  }
})
```

<br/>

### Mounting : Component 가 생성되고 DOM에 inject 되는 것.

1. `constructor()`
2. `static getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()` 

마운팅 할 때 위 순서대로 메소드들이 실행된다.

<br/>