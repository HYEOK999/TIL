![React06](https://user-images.githubusercontent.com/31315644/71559814-ebaa5300-2aa5-11ea-8c0f-186f7475a4c7.png)

--------------

## React Official Document 

### 주요개념 : 조건부 렌더링

- 조건 연산자 이용
- 엘리먼트(요소)를 변수에 저장하기
- 인라인으로 IF를 표현하기
- [논리 && 연산자로 if를 인라인으로 표현하기](#a1)
  - [삼항 연산자로 If-Else구문 인라인으로 표현하기](#a2)
- 컴포넌트 렌더링 막기
- [setState 일괄처리](#a3)
  - [setState 일괄처리 해결](#a4)

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #6. 조건부 렌더링

React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있다. 

이렇게 하면 애플리케이션의 상태에 따라서 컴포넌트 중 몇 개만을 렌더링 할 수 있다.

<br/>

### 조건 연산자 이용

`if` 나 `삼항연산자`를 이용해서 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용할 수 있다. 

예제) 아래 두 컴포넌트가 있다고 가정한다.

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

사용자의 로그인 상태에 맞게 위 두 컴포넌트 중 하나만 보여주도록 하는 `Greering 컴포넌트`를 생성 해보자.

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

```


 `isLoggedIn`의 값 에 따라서 다른 인사말을 렌더링 한다.

<br/>

### 엘리먼트(요소)를 변수에 저장하기

엘리먼트를 저장하기 위해 변수를 사용할 수 있다. 

즉, 엘리먼트도 하나의 값으로 표현할수 있는 표현식이다.

출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링 할 수 있다.

로그인 과 로그아웃 버튼을 나타내는 두 컴포넌트가 있다고 가정해 보자.

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

​    `this.state.isLoggedIn`에 따라서 각 버튼을 보여주고 로그인 상태일 때는 로그아웃 버튼과 Greeting을 로그아웃 상태일때는 로그인 버튼과 Greeting을 보여주고 있다.

<br/>

### 인라인으로 IF를 표현하기

변수를 선언하고 `if`를 사용해서 조건부로 렌더링 하는 것은 좋은 방법이지만 더 짧은 구문을 사용하고 싶을 때가 있을 수 있다. 

여러 조건을 JSX 안에서 인라인(inline)으로 처리할 방법 몇 가지를 알아 보자.

<br/>

#### 논리 && 연산자로 if를 인라인으로 표현하기 <a id="a1"></a>

JSX 안에는 중괄호를 이용해서 표현식을 포함 할 수 있다. 

그 안에 JavaScript의 논리 연산자 `&&`를 사용하면 쉽게 엘리먼트를 조건으로 사용 할 수 있다.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

위 예제는 `unreadMessages.length`가 0 이상 일 때, `<h2>You have {unreadMessages.length} unread messages.</h2>`를 보여주는 예제이다. (단축평가)

<br/>

#### 삼항 연산자로 If-Else구문 인라인으로 표현하기 <a id="a2"></a>

엘리먼트를 조건부로 렌더링하는 다른 방법은 삼항 연산자인 `condition ? true: false`를 사용하는 것 이다.

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

<br/>

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

<br/>

이렇게 JSX 내부에 인라인으로 조건들을 이용하여 표현할 수 있다. 

너무 많은 조건으로 가독성이 많이 저하된다면 컴포넌트를 분리하여 해결할 수도 있으니 참고하자.

<br/>

### 컴포넌트 렌더링 막기

가끔 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있다. 

이때는 렌더링 결과를 출력하는 대신 `null`을 반환하면 해결할 수 있다.

아래의 예시에서는 `<WarningBanner />`가 `warn` prop의 값에 의해서 렌더링된다. 

prop이 `false`라면 컴포넌트는 렌더링하지 않게 된다.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

// 상위 컴포넌트
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

컴포넌트의 `render` 메서드로부터 `null`을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다. 

그 예로 `componentDidUpdate`는 계속해서 호출되게 된다.

<br/>

### setState 일괄처리 <a id="a3"></a>

> `setState` 는 비동기로 state를 업데이트 한다.
>
> `setState(updater, [callback])`

`setState`메소드는 즉시 실행되는 (동기적으로 실행되는) 것이 아니므로 `setState`를 통해 상태를 변경하더라도 해당 메소드가 실행된 직후에 변경된 상태가 적용되는 것이 아니다.

`setState`를 호출한 직후에 `this.state`에 접근하는 것은 올바른 방법이 아니며 그렇게 접근 시 잘못된 상태를 만들 수도 있다.

아래 예제를 보자.

```javascript
state = {
   count: 0
}
updateCount = () => {
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
}

```

위 예제에서 최종 `count`의 값은 '4'라고 생각할 수 있지만, **여러 setState가 동일한 상태를 업데이트 하는 경우 setState에 대한 마지막 호출은 일괄 처리 중 이전 값을 무시하므로 `count`는 '1'이 된다.**

<br/>

#### setState 일괄처리 해결 <a id="a4"></a>

만약 이전의 상태에 더해서 상태를 변경해야 한다면 가장 좋은 방법 중 하나는 `updater` 함수를 사용하는 것 이다.

 `updater`함수를 `setState` 메소드의 첫번째 인자로 넘기는 방식으로 사용할 수 있다.

`setState(updater, [callback])`

```jsx
updateCount = () => {
    this.setState(prevstate => ({ count: prevstate.count + 1}));
    this.setState(prevstate => ({ count: prevstate.count + 1}));
    this.setState(prevstate => ({ count: prevstate.count + 1}));
    this.setState(prevstate => ({ count: prevstate.count + 1}));
}

```

여기서 `[callback]`은 옵션 인자로서 `setState`의 실행이 완료된 후 실행되며 해당 `callback`이 실행된 후에 해당 컴포넌트의 재 렌더링이 이루어진다.