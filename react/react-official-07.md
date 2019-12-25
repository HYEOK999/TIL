![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : 리스트와 Key

- 자바스크립트에서 리스트 변환
- 리액트에서 여러개의 컴포넌트 렌더링 하기
- 기본 리스트 컴포넌트
- Key
- Key로 컴포넌트 추출하기
  - Key는 주변 배열의 context에서만 의미를 지니고 있다.
  - Key는 형제 사이에서만 고유한 값을 지녀야 한다.
  - React에서 Key는 컴포넌트로 전달되지는 않는다.

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #7. 리스트와 Key

### 자바스크립트에서 리스트 변환

아래는 map()함수를 이용하여 numbers 배열의 값을 두배로 만든 후 map()에서 반환하는 새 배열을 doubled 변수에 할당하고 로그를 확인하는 코드다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

이 코드는 콘솔에 [2, 4, 6, 8, 10] 을 출력한다.

React에서 배열을 요소(앨리먼트) 리스트로 만드는 방식은 위 방식과 거의 동일하다.

<br/>

### 리액트에서 여러개의 컴포넌트 렌더링 하기

리액트는 요소들을 집합을 만들고 중괄호`{}`를 이용하여 JSX에 포함시킬 수 있다.

예) JS의 `map()` 함수를 이용해 numbers 배열을 반복 실행한다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

각 항목에 대해서 `<li>` 요소들을 반환하고 배열의 결과를 새로운 변수에 저장한다.

`listItems` 배열을 `<ul>`엘리먼트 안에 포함하고 DOM에 렌더링 한다.

```jsx
ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('root')
);
```

`<li>1</li>` ~ `<li>5</li>` 의 요소가 `<ul>` 태그안에 들어가 있다.

<br/>

### 기본 리스트 컴포넌트

일반적으로는 컴포넌트 내에서 리스트를 렌더링한다.

다음과 같이 배열자체를 할당 받고 리스트 전체를  렌더링한 값을 반환하는 컴퍼넌트를 작성할 수도 있다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

문제는 위와 같은 코드를 실행 시 리액트에서 **Key에 대한 경고를 표시한다.**

`key`는 앨리먼트 리스트를 만들 때 포함시켜야 하는 특수한 문자열 속성이다.

따라서 `numbers.map()`안에서 리스트의 각 항목에 `key`를 할당하여 해당 경고를 해결한다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()} /* 이 부분 추가 */> 
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

<br/>

### Key

키는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도와준다.

`Key`는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야만 한다.

`Key`는 고유한 문자열이어야 하기 때문에 보통 데이터의 ID를 많이 이용한다.

그런데 만약 렌더링한 항목에 넣어줄 특정 값(ID)등이 떠오르지 않는다면 고차함수의 `index`를 사용할 수 도 있다.

```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

**여기서 `index`는 가능한 사용하지 말아야 한다.**

항목의 순서가 바뀔 경우 index는 state와 관련 문제를 일으킬 수도 있다.

따라서 이럴 경우, **uuid라는 랜덤 문자열 값을 지정하는 노드 패키지 모듈(NPM)을 이용하도록 한다**.

<br/>

### Key로 컴포넌트 추출하기

#### Key는 주변 배열의 context에서만 의미를 지니고 있다.

 `Key`의 설정은 엘리먼트 리스트를 만들때 리스트 자체에게 주는 것이 아닌, 리스트를 불러오는 `map()`함수의 최상위 요소에 넣어주어야한다.

예를들면,

`ListItem` 컴포넌트를 추출한 경우 `ListItem` 안에 있는 `<li>`엘리먼트가 아니라 배열의 `<ListItem/>`엘리먼트가 `key`를 가져야 한다.

```jsx
function ListItem(props) {
  // X, 여기에는 key를 지정할 필요가 없다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // O, map 함수내부 안의 요소에 key를 지정해야 한다.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

<br/>

#### Key는 형제 사이에서만 고유한 값을 지녀야 한다.

Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없다. 

두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다.

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id} /*같은 키를 쓰고 있다.*/>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id} /*같은 키를 쓰고 있다.*/>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

<br/>

#### React에서 Key는 컴포넌트로 전달되지는 않는다.

`Key`는 연속적이 리스트 엘리먼트에 대한 힌트일 뿐이다.

컴포넌트에서 key와 동일한 값이 필요하면 다른 이름의 prop으로 명시적으로 전달한다.

```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);

```

Post 컴포넌트에서는 `props.id`는 읽을 수 있지만, `props.key`는 읽을 수 없다.

<br/>

