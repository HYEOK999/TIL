![React03](https://user-images.githubusercontent.com/31315644/71559811-eb11bc80-2aa5-11ea-8b94-870bb383259f.png)

--------------

## React Official Document 

### 주요개념 : Components and Props

- 함수 컴포넌트와 클래스 컴포넌트
- 컴포넌트 렌더링
  - 주의: 컴포넌트의 이름은 항상 대문자로 시작
  - 컴포넌트를 이용한 렌더링 예시
- 컴포넌트 합성(구성)
- 컴포넌트 추출(분리)
- props는 읽기 전용

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #3. Components and Props

컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나뉠 수 있다.

개념적으로 컴포넌트는 JavaScript 함수와 유사하다. 

“props”라고 하는 임의의 값을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.

<br/>

### 함수 컴포넌트와 클래스 컴포넌트

JavaScript 함수

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

데이터를 가진 하나의 “props” 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트다.

<br/>

ES6 Class

```jsx
class Welcom extends React.Component{
  render() {
    <h1>Hello, {this.props.name}</h1>;
  }
}
```

<br/>

### 컴포넌트 렌더링

우선 함수 Component로 진행한다.

이전까지는 React 요소들을 DOM태그로 그렸었다.

~~~jsx
const element = <div ></div>;
~~~

그런데 사용자 정의 컴포넌트로도 React 요소들을 나타낼 수 있다.

```jsx
const element = <Welcome name="HYEOK" />;
```

React가 사용자 정의 컴포넌트로 작성한 요소를 발견하면 JSX 어트리뷰트를 해당 컴포넌트에 단일 객체로 전달한다. 

여기서의 단일 객체가 'props' 다.

<br/>

#### 주의: 컴포넌트의 이름은 항상 대문자로 시작

React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리합니다. 예를들어 `<div></div>`는 HTML의 div 태그를 나타낸다.

하지만, `<Welcome />`은 컴포넌트로 취급되며 컴포넌트는 스코프내에 존재해야한다.

<br/>

#### 컴포넌트를 이용한 렌더링 예시

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="HYEOK" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

여기서 Welcom(props) 의 props는 { name : 'HYEOK' } 을 의미한다.

이 예시에서는 다음과 같이 실행된다.

1. `<Welcome name="HYEOK" />` 엘리먼트로 `ReactDOM.render()`를 호출.
2. React는 `{name: 'HYEOK'}`를 props로 하여 `Welcome` 컴포넌트를 호출.
3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, HYEOK</h1>` 엘리먼트를 반환.
4. React DOM은 `<h1>Hello, HYEOK</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트.

<br/>

### 컴포넌트 합성(구성)

컴포넌트는 다른 컴포넌트를 내부에 참조시킬 수 있다. React 앱에서는 UI적인 모든 것(버튼, 폼, 다이얼로그 등등)들을 컴포넌트로 표현할 수 있다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Welcome을 여러번 렌더링 하는 App 컴포넌트
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

일반적으로 새로 만든 React 앱은 최상위에 단일 App 컴포넌트를 가지고 있다.

하지만 기존 앱에 React를 통합하는 경우에는 작은 단위 부터 시작해서 View 계층의 상단계로 올라가며 점진적으로 작업해야 한다.

<br/>

### 컴포넌트 추출(분리)

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘들다.

이 컴포넌트는 `author`(객체), `text`(문자열) 및 `date`(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타낸다.

여기서 이 컴포넌트에서 몇 가지 컴포넌트로 분리를 해보자.

~~~jsx
function ImgAvatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
~~~

**props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다.**

src = { props.author.avatarUrl } 을 src = { props.user.avatarUrl } 로 변경한 이유.

author 보다는 user가 더 일반적이고 ImgAvatar 컴포넌트는 Comment 내에서 렌더링 된다는 것을 알 필요가 없기 때문.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        {/* 이 부분에 컴포넌트를 삽입 */}
        <Avatar user={props.author} /> 
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

```

다음에는 `<div className="UserInfo">~~</div>`를 통째로 분리해서 컴포넌트화 하도록 한다.

이미 Avatar 컴포넌트가 있기 때문에 Avatar 컴포넌트를 이용해서 만들도록 한다.

~~~jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

~~~

이렇게 까지 컴포넌트화가 완료되었다고 코드는 다음처럼 짧아진다.

```jsx
{/* 최종 소스 */}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

```

컴포넌트를 분리하는 작업은 쓸모없다고 느껴질 수 도 있다. 하지만 재사용 가능한 컴포넌트를 여러개 분리해놓는 것은 큰 앱을 만들때 큰 이점을 발휘한다. 특히 여러번 사용되는 UI(버튼, 패널, 아바타)에서는 미리 만들어 놓는 것이 좋을 수도 있다.

<br/>

### props는 읽기 전용

**함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안된다.** 

```javascript
function sum(a, b) {
  return a + b;
}

```

이런 함수들은 순수 함수라고 호칭한다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.

```javascript
function withdraw(account, amount) {
  account.total -= amount;
}

```

React는 매우 유연하지만 한 가지 엄격한 규칙이 있다.

**모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.**

물론 애플리케이션 UI는 동적이며 시간에 따라 변한다. 해당 부분은 “state”라는 새로운 개념으로 대체한다. React 컴포넌트는 state를 통해 위 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있다.

<br/>