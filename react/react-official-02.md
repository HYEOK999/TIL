![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : JSX 소개

- JSX 란?
- JSX를 표현식에 포함하기
  - 변수
  - 함수 호출
- JSX도 표현식
- JSX 속성 정의 
  - 경고
- JSX 하위 요소 정의
- JSX XSS 공격 방지
- JSX는 객체를 표현한다. React element(요소)

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #1. JSX 소개

<br/>

### JSX 란 ? 

````jsx
const element = <h1>Hello, world!</h1>;
````

위 소스를 JSX라 하며 JavaScript를 확장한 문법이다. JavaScript의 모든 기능이 포함되어 있다.

JSX는 React “엘리먼트(element)” 를 생성한다. 

**JSX를 사용하려면 React 모듈을 import 해야한다.**

```jsx
import React from 'react';
```

React에서는 이벤트 처리, 상태(state) 변화, 데이터가 준비되는 방식 등의 렌더링 로직이 본질적으로 다른 UI로직과 연결된다는 점을 받아들인다. 

그리고 위와 같은 처리를 해주기 위해서 마크업(HTML) 과 JS코드를 분리하지않고, 둘 다 하나로 포함시켜서 사용하는 것을 '컴포넌트' 라 칭하며 컴포넌트를 분리하여 관리한다. 여기서 컴포넌트를 작성할 때 마크업(HTML) 과 JS코드를 합친 코드를 JSX라 한다.

React에서 JSX의 사용이 필수는 아니다.(React.createElement 로 구성해도 된다.)

하지만, 가독성, 유지보수 측면에서 JSX가 훨씬 유리하고 React가 에러 및 경고 메시지를 표시하게 해준다. 

<br/>

### JSX를 표현식에 포함하기

JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있다.

#### 변수

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

<br/>

#### 함수 호출

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

 JSX 사용시 세미콜론 자동 삽입 기능을 방지하기 위해 `()` 소괄호로 감싸주는 것을 권장한다.

<br/>

### JSX도 표현식

Babel 컴파일이 끝나면 JSX는 정규 JavaScript 함수로 호출이 된다. 즉, JSX는 JavaScript 객체로 인식된다.

JSX는 제어문, 반복문 등 안에 사용될 수 있으며, 변수에 할당하고, 인자로 받아들이고, 함수로부터 반환을 할 수 있다.

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

<br/>

### JSX 속성 정의 

속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다. tabIndex="0"

```jsx
const element = <div tabIndex="0"></div>;
```

중괄호를 사용하여 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있다. src={user.avatarUrl}

```jsx
const element = <img src={user.avatarUrl}></img>;
```

단, 자바스크립트 표현식을 감싼 중괄호를 큰 따옴표로 감싸면 안된다.

```jsx
const element = <img src="{user.avatarUrl}"></img>;
```

<br/>

#### 경고

- JSX는 HTML보다는 JavaScript에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 `camelCase` 프로퍼티 명명 규칙을 사용한다.
- 예를 들어, JSX에서 `class`는 [`className`](https://developer.mozilla.org/ko/docs/Web/API/Element/className)가 되고 tabindex는 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)가 된다.

<br/>

### JSX 하위 요소 정의

만약, 태그 안에 텍스트 혹은 하위 요소가 존재하지 않는다면 XML 처럼 `/>`로 닫을 수 있다.

```jsx
const element = <img src={user.avatarUrl} />;
```

<br/>

JSX 태그는 하위 요소를 포함할 수 있다.

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

<br/>

### JSX XSS 공격 방지

> XSS 란? **크로스 사이트 스크립트 공격** 의 약자로, 웹사이트에 스크립트 코드를 삽입하는 공격 기법을 의미.
>
> DOM 트리에 접근, 쿠키와 세션 정보를 탈취해 사용자 인증을 수행 할 수 있다.

이러한 XSS를 막을 수 있는 여러가지 방법들이 존재하는데 

그 중 innerHTML 속성이 아닌 textContent 속성을 이용하여 이스케이프 처리된 텍스트 코드로 공격을 방지가 가능하다.


이스케이프로 처리된 텍스트란 다음을 의미한다.

| 문자 | 이스케이프 코드 |
| ---- | --------------- |
| &    | &amp            |
| '    | &#x27           |
| "    | &quot           |
| <    | &lt             |
| >    | &gt             |
| /    | &#x2F           |

즉 코드로써 작성될 수 있는 기호들을 이스케이프 처리한 텍스트로 작성하는 것이 XSS공격을 막는 방법이다.

**본론으로 돌아가서 JSX는 XSS 공격을 방지 할 수 있다.**

```jsx
const title = response.potentiallyMaliciousInput;
// 이것은 안전하다.
const element = <h1>{title}</h1>;
```

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로, 

애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않는다.

모든 항목은 렌더링 되기 전에 문자열로 변환된다.

<br/>

### JSX는 객체를 표현한다. React element(요소)

Babel을 통해 JSX는  `React.createElement()` 호출로 컴파일한다.

다음 두 예시는 동일하다.

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()`는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성한다.

```jsx
// 주의: 다음 구조는 단순화되어있다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

위와 같은 객체를 **React element(요소)라 한다.**

 React는 React 요소를 읽은 후 DOM을 구성하고 최신으로 유지하는 데 React 요소를 사용한다.

<br/>