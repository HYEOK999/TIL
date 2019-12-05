![atom](https://user-images.githubusercontent.com/31315644/70208176-328b7e00-1770-11ea-80d4-4658832d5d5f.jpg)

------

## React with Velopert - 01 -

- 리액트가 만들어진 이유

  - 리액트의 탄생

  - Virtual DOM

    - React 렌더링 과정
  - Component


  ​    

- React 시작하기
  
  - Component 만들어보기

<br/>

------

# Chap 1. 리액트 맛보기



## 리액트가 만들어진 이유

<br/>

**React는 UI를 어떻게 업데이트 할 지가 아닌 어떻게 보여줄지를 집중해야 한다.**

Javscript를 사용하여 HTML의 요소들을 제어할 경우, DOM을 변형시키기 `getElementById`, `querySelector` 와 같은 DOM Selector API를 사용해왔다.

여기서 문제는 프로젝트 혹은 어플리케이션의 규모가 점점 증가할 수록 이벤트 처리에 대한 복잡성이 증가하고 유지보수가 어려워진다.

<img src="https://user-images.githubusercontent.com/31315644/70206706-be4edb80-176b-11ea-840c-74535ee185d7.jpeg" alt="react-01" style="zoom:50%;" />

<br/>

### 리액트의 탄생

위와 같은 문제를 해결하기 위해 Angular JS, Backbone 등의 프레임워크가 출시가 되었다. 
이 프레임워크들은 대부분 

JS의 특정 값이 바뀜 ➤ 특정 DOM의 속성이 바뀌도록 연결 ➤ 업데이트 

방식으로 문제를 해결했다.

<br/>

리액트는 위와 같이 문제를 해결하지 않고, 업데이트에 신경을 아예 쓰지 않도록했다. 해결방식은 다음과 같다.

> JS의 특정 값이 바뀜 ➤ 특정 DOM을 바뀐대로 다시 그린다 ➤ 업데이트

<br/>

### Virtual DOM

> 가상으로 존재하는 DOM 으로서 그냥 JavaScript 객체이기 때문에 작동 성능이 실제로 브라우저에서 DOM 을 보여주는 것 보다 속도가 훨씬 빠르다. 

React가 가상 DOM을 이용하는 이유는 다른 프레임워크처럼 속성을 연결하여 업데이트하는 방식이 아닌 아예 해당 요소를 새로 그리게 되는데 그럴 경우 어플리케이션의 속도가 크게 저하되기 때문이다.

<br/>

#### React 렌더링 과정

1. React에서는 상태가 업데이트 되면 메모리에 있는 Virtual DOM에 렌더링한다. 
2. 실제 브라우저에서 보여지고 있는 DOM을 비교한다.
3. 비교한 차이점을 실제 DOM에 반영한다. (Patch) 

<br/>

### Component

> UI의 조각
>
> React에서 다양한 기능을 제공한다.

~~~jsx
const Hello = <div>Hello</div>	
~~~

<br/>

## React 시작하기

~~~bash
$ npx create-react-app begin-react
~~~

<br/>

### Component 만들어보기

React를 사용하기 위해서 **React를 불러온다.** 

```javascript
import React from 'react';
```

<br/>

임의의로 선언하는 모든 컴포넌트(커스텀 컴포넌트)의 명칭의 시작은 **무조건 대문자**로 시작한다.

1. **react 프로젝트 폴더 > src > hello.js 생성**

~~~jsx
import React from 'react';

// Hello 컴포넌트
function Hello() {
  return <div>안녕하세요</div>
} 

export default Hello;
~~~

Hello 라는 컴포넌트를 만들었음.

<br/>

2. **react 프로젝트 폴더 > src > App.js**

Hello 컴포넌트 불러와서 사용 해보기.

~~~jsx
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      { /* 컴포넌트는 재사용이 가능하다. */ }
      <Hello />
      <Hello />
    </div>
  );
}
~~~

<br/>

3. **react 프로젝트 폴더 > src > index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

`ReactDOM.render` 의 역할은 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 것을 의미

react 프로젝트 폴더 > public > index.html 내부에 다음과 같은 `<div>` 태그가 있다.

~~~html
<div id="root"></div>
~~~

결국, 리액트 컴포넌트가 렌더링 될 때에는, 렌더링된 결과물이 위 div 내부에 렌더링되는 것.