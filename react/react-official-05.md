![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : 이벤트 처리하기

- React 이벤트 문법

  - [기본동작 방지 ( preventDefault )](#a3)

- 이벤트 리스너 

  - [예제 : Toggle 컴포넌트 만들기](#a1)

- React this

  - constructor 내부에서 this 바인딩
  - public class field 문법
  - 콜백에 화살표 함수 사용

  - [constructor 내부에서 this 바인딩 편리하게 사용하기](#a2)

- 이벤트 핸들러에 인자 전달하기

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #5. 이벤트 처리하기

 React 앨리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 유사하다.

몇 가지 문법차이를 설명한다.

<br/>

### React 이벤트 문법

- React의 이벤트는 소문자 대신 대문자로 시작하는 카멜 케이스(camelCase)를 이용한다. (이벤트-카멜, 컴포넌트명-파스칼)
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

```jsx
// JavaScript
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

<br/>

#### 기본동작 방지 ( preventDefault ) <a id="a3"></a>

React에서는 `false`를 반환해도 기본 동작을 방지할 수 없다. 

반드시 `preventDefault`를 명시적으로 호출해야 한다. 

```jsx
// 일반 HTML에서는 새 페이지를 여는 링크의 기본 동작을 방지하기 위해 다음과 같은 코드를 작성한다.
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

// React에서는 다음과 같이 작성
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

<br/>

### 이벤트 리스너 

> React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출할 필요가 없다. 
>
> 단, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 된다.

ES6 클래스를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것이다. 

예를 들어, 다음 `Toggle 예제` 컴포넌트는 사용자가 “ON”과 “OFF” 상태를 토글 할 수 있는 버튼을 렌더링한다.

<br/>

#### 예제 : Toggle 컴포넌트 만들기 <a id="a1"></a>

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 한다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

<br/>

### React this

**JSX 내부의 this는 JavaScript에서 클래스 머세더처럼 기본 바인딩이 되어 있지 않다.**

따라서 이벤트 전달을 위해서는 this를 반드시 바인딩 해주어야만 한다.

위 토글 예제에서는 `this.handleClick`을 바인딩하지 않고 `onClick`을 사용한다면 undefinde를 표시한다.

<br/>

undefined 를 피하는 방법은 대표적으로 3가지가 존재한다.

- #### constructor 내부에서 this 바인딩

~~~jsx
constructor(props) {
  super(props);
 
  // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 한다.
  this.handleClick = this.handleClick.bind(this);
}
~~~

- #### public class field 문법

~~~jsx
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 한다.
  // 주의: 이 문법은 *실험적인* 문법.
  handleClick = () => {
    console.log('this is:', this);
  }
~~~

- #### 콜백에 화살표 함수 사용

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 한다.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

<br/>

3가지다 전부 작동되는 문법이다. 

3번째 문법( 콜백에 화살표 함수 사용 )의 경우에는 `LoggingButton`이 렌더링될 떄마다 다른 콜백이 생성된다는 것인데, 보통의 경우 문제가 없으나 콜백이 하위 컴포넌트에 props로 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다. 

이러한 문제를 피하고 싶다면 1번째(constructor 내부에서 this 바인딩) 와 2번째 (public class field 문법) 를 주로 이용한다.

<br/>

#### constructor 내부에서 this 바인딩 편리하게 사용하기 <a id="a2"></a>

```jsx
constructor(props) {
  super(props)
  Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
}
```

` Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))`

`Object.getOwnPropetyNames(App.prototype)`은 App.prototype에 존재하는 모든 프로퍼티 명(key)을 모아서 하나의 배열을 반환한다.

```javascript
var a = {
	a : 1,
	b : 2,
	c : 3,
	d : 4
}
Object.getOwnPropertyNames(a); // ['a','b','c','d']
```

그 후 해당 배열을 `forEach 고차함수`를 사용해 순회를 돌리고 각각의 키를 각각 바인드 시킨다.

위 코드를 통해서 명시적으로 다음처럼 하나하나 이벤트 바인딩을 하지 않아도 된다. 

```javascript
// 개별적인 constructor 바인딩
constructor(props) {
	super(props)
  this.add = this.add.bind(this)
  this.minus = this.minus.bind(this)
  this.click = this.click.bind(this)
  this.gogo = this.gogo.bind(this)
}

```

```javascript
// 위처럼 바인딩을 하나하나 해주지 않아도 된다.
constructor(props) {
	super(props)
  Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
}

```

<br/>

### 이벤트 핸들러에 인자 전달하기

> 루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적이다.

예를들면 `id`가 행의 ID일 경우 다음 코드가 모두 작동된다.

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

```

두 경우 모두 React 이벤트를 나타내는 `e` 인자가 ID 뒤에 두 번째 인자로 전달된다. 

**화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 `bind`를 사용할 경우 추가 인자가 자동으로 전달된다.**

<br/>