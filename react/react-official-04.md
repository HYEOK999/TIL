![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : State and Lifecycle

- [함수에서 클래스로 변환하기](#a1)
- [클래스에 지역 State 추가하기](#a2)
- [생명주기 메서드를 클래스에 추가하기](#a3)
  1. [componentDidMount() 메서드 구현](#a4)
  2. [componentWillUnmount() 메서드 구현](#a5)
  3. [tick() 함수 구현](#a6)
  4. [호출 순서 요약](#a7)
- State 올바르게 사용하기
  - 직접 State를 수정하지 않는다.
  - State 업데이트는 비동기적 일 수도 있다.
  - State 업데이트는 병합된다.
- 데이터는 아래로 흐른다.

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #4. State and Lifecycle

 '#2 엘리먼트 렌더링' 에서는 UI를 업데이트하는 한 가지 방법만 배웠으며, 렌더링 된 출력값을 변경하기 위해 `ReactDOM.render()`를 호출했다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

<br/>

이번에는 Clcok이라는 이름으로 컴포넌트를 만들어 사용하고 재사용,캡슐화를 해볼 것이다.

또한 이 컴포넌트는 매번 render를 해주는게 아니라 스스로 타이머를 설정하고 업데이트 하도록 한다.

```jsx
function Clock(props) {
  return (
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
    ReactDOM.render(
    <Clcok date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

위 처럼 사용할 경우, 컴포넌트화는 한게 맞지만 결론적으로는 tick 함수가 1초마다 실행이 되어 render로 게속한는 것에는 변함이 없다.

따라서 Clock 컴포넌트가 타이머를 설정하고 매초 UI 업데이트하는 것이 Clock의 구현 세부사항이 되야만 한다.

**이상적으로 한 번만 코드를 작성하고 `Clock`이 스스로 업데이트하도록 만들기 위해서 'state'를 추가해야만 한다.**

**State는 props와 유사하지만, 비공개이고 컴포넌트에 의하여 완전히 제어된다.**

<br/>

### 함수에서 클래스로 변환하기 <a id="a1"></a>

먼저 5단계로 Clock 과 같은 함수 컴포넌트를 클래스로 변환한다.

1. `React.Component`를 확장하는 동일한 이름의 [ES6 class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)를 생성.
2. `render()`라고 불리는 빈 메서드를 추가.
3. 함수의 내용을 `render()` 메서드 안으로 옮긴다.
4. `render()` 내용 안에 있는 `props`를 `this.props`로 변경.
5. 남아있는 빈 함수 선언을 삭제.

```jsx
class Clock extends React.Component{
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`render` 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 `<Clock />`을 렌더링하는 경우 `Clock` 클래스의 단일 인스턴스만 사용된다. 이것은 지역 state 와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다. 

<br/>

### 클래스에 지역 State 추가하기 <a id="a2"></a>

세 단계에 걸쳐서 `date`를 props에서 state로 이동해본다.

1. `render()` 메서드 안에 있는 `this.props.date`를 `this.state.date`로 변경.
2. constructor 함수를 추가하고 super 설정, 초기 this를 설정한다.
3. `<Clcok />`요소에서 date prop을 삭제한다.

```jsx
class Clock extends React.Component{
  {/* 2번 */}
  constructor(props) {
    super(props);
    this.state = {data: new Data()};
	}
  
	{/* 1번 */}
  render(){
    return (
      <div>
      	<h1>Hello, world!</h1>
      	<h2>It is {props.date.toLocaleTimeString()}.</h2>
    	</div>
  	);
  }
}

ReactDOM.render(
  <Clcok/>,  {/* 3번 */}
	document.getElementById('root')
);
```

<br/>

### 생명주기 메서드를 클래스에 추가하기 <a id="a3"></a>

많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요하다.

Clock 컴포넌트가 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것을 React에서는 **'마운팅'** 이라 칭한다.

반대로 Clcok에 의해서 생성된 DOM이 삭제될 때마다 타이머를 해체해야 한다. 이것을 React에서는 **'언마운팅'** 이라 칭한다.

이러한 시점을 정의해놓은 메서드들을 '생명주기 메서드' 라고 부른다.

두 작업은 각각 `componentDidMound()` , `componentWillUnmount()` 메서드를 이용한다.

마지막으로 상태 변화를 반영하기 위한 `tick()`메서드를 구현한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    {/* 1. componentDidMount() 메서드 구현 */}
  }

  componentWillUnmount() {
    {/* 2. componentDidMount() 메서드 구현 */}
  }

	tick() {
    {/* 3. tick() 메서드 구현 */}
  }  
  
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

<br/>

#### 1. componentDidMount() 메서드 구현 <a id="a4"></a>

```jsx
  componentDidMount()
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

`componentDidMount()` 메서드는` render()` 호출이 된 후에 실행된다. 

`this` (`this.timerID`)에서 어떻게 타이머 ID를 제대로 저장하는지 주의해야 한다.

timer ID의 경우 데이터 흐름에는 포함되지 않지만 따로 setInterval을 통해 변화되는 값을 보관해야만 한다.

따라서 수동으로 부가적인 필드를 클래스에 추가한다.

<br/>

#### 2. componentWillUnmount() 메서드 구현 <a id="a5"></a>

`Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제될 경우 타이머를 멈추기 위해 구현한다.

```jsx
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

setInterval를 해제시킴.

<br/>

#### 3. tick() 함수 구현 <a id="a6"></a>

Component가 매초 작동하도록 tick 메서드를 구현한다.

컴포넌트 지역 state를 업데이트하기 위해 `this.setState()`를 사용한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

<br/>

#### 호출 순서 요약  <a id="a7"></a>

1. `<Clock />`가 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출한다. `Clock`이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화한다. 
2. React는 `Clock` 컴포넌트의 `render()` 메서드를 호출한다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 된다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트한다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출한다. 그 안에서 `Clock` 컴포넌트는 매초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다.
4. 매초 브라우저가 `tick()` 메서드를 호출한다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행한다. `setState()` 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 다시 호출한다. 이 때 `render()` 메서드 안의 `this.state.date`가 달라지고 렌더링 출력값은 업데이트된 시각을 포함한다. React는 이에 따라 DOM을 업데이트한다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출한다.

<br/>

### State 올바르게 사용하기

`setState()`의 3가지 규칙

#### 직접 State를 수정하지 않는다.

`state`에 직접적으로 값을 줄 경우 컴포넌트를 다싯 렌더링 하지 않는다. `setState()`를 이용해야만 한다.

```jsx
// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({comment: 'Hello'});
```

`this.state`를 지정할 수 있는 유일한 공간은 바로 constructor이다.

<br/>

#### State 업데이트는 비동기적 일 수도 있다.

React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.

`this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 된다.

예를 들어, 다음 코드는 카운터 업데이트에 실패할 수 있다.

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 `setState()`를 사용한다. 

그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들인다.

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

위에서는 화살표 함수를 사용했지만, 일반적인 함수에서도 정상적으로 작동합니다.

```jsx
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

<br/>

#### State 업데이트는 병합된다.

`setState()`를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.

```jsx
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

별도의 `setState()` 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.

```jsx
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

병합은 얕게 이루어지기 때문에 `this.setState({comments})`는 `this.state.posts`에 영향을 주진 않지만 `this.state.comments`는 완전히 대체된다.( posts도 반대로 같다. )

<br/>

### 데이터는 아래로 흐른다.

> 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.

이 때문에 state는 종종 지역 또는 캡슐화라고 불린다.

state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

```jsx
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

사용자 정의된 컴포넌트에도 적용 가능하다.

```jsx
<FormattedDate date={this.state.date} />
```

`FormattedDate` 컴포넌트는 `date`를 자신의 props로 받을 것이고 이것이 `Clock`의 state로부터 왔는지, `Clock`의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

<br/>

일반적으로 이를 “하향식(top-down)” 또는 “단방향식” 데이터 흐름이라고 칭한다. 

**모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 “아래”에 있는 컴포넌트에만 영향을 미친다.**

트리구조가 props들의 폭포라고 상상하면 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 수원(water source)이라고 할 수 있다.

모든 컴포넌트가 완전히 독립적이라는 것을 보여주기 위해 `App` 렌더링하는 세 개의 `<Clock />`을 만들었다.

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

각 `Clock`은 자신만의 타이머를 설정하고 독립적으로 업데이트 한다.

React 앱에서 컴포넌트가 유상태 또는 무상태에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주한다. 

유상태 컴포넌트 안에서 무상태 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있다.

<br/>