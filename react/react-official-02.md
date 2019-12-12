![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : 엘리먼트(요소) 렌더링

- React 엘리먼트(요소)란?
- DOM에 요소 렌더링하기
- 렌더링 된 요소 업데이트하기
- React는 변경된 부분만 업데이트 한다.

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #2. 엘리먼트(요소) 렌더링

### React 엘리먼트(요소)란? 

<br/>

```jsx
const element = <h1>Hello, world</h1>;
```

위와 같은 객체를 **React Element(하위 요소)라 한다.** 

React Element(요소)는 컴포넌트의 구성 요소 이며, React 앱의 가장 작은 단위이다.

React는 React 요소를 읽은 후 DOM을 구성하고 최신으로 유지하는 데 React 요소를 사용한다.

일반 DOM 요소와 달리 React 요소는 일반 객체이며 React DOM은 React 요소와 일치하도록 DOM을 업데이트 한다.

<br/>

### DOM에 요소 렌더링하기

HTML 파일에 `div` 태그가 있다고 가정해보자.

```html
<div id="root"></div>
```

위 태그의 하위로 들어가는 모든 요소는 React DOM에 의해 관리되므로 위의  태그를 `"root" DOM 노드` 라고 부른다.

- React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다. 
- React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드를 만들 수 있다.

<br/>

React 요소를 루트 DOM 노드에 렌더링하려면 둘 다 `ReactDOM.render()`로 전달하면 된다.

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
// ReactDOM.render(리액트 요소, 삽입할 DOM 노드 요소를 선택하는 이벤트 객체 함수 호출);
```

<br/>

### 렌더링 된 요소 업데이트하기

React 요소는 불변객체다. 

요소를 생성한 이후에는 해당 요소의 자식이나 속성을 변경할 수 없다. 

요소는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여준다.

지금까지 내용을 바탕으로 하면 UI를 업데이트하는 유일한 방법은 새로운 요소를 생성하고 이를 바뀔때마다 `ReactDOM.render()`로 전달하는 것 뿐이다.

~~~jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
// 1초마다 새로운 시간을 반환한다.
~~~

**주의** : 실제로 대부분의 React 앱은 `ReactDOM.render()`를 한 번만 호출한다. 위는 단지 예시일 뿐 이다.

<br/>

### React는 변경된 부분만 업데이트 한다.

React DOM은 해당 요소와 그 하위 요소를 이전의 요소와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트한다.

![React 공식사이트 출처 : DOM inspector showing granular updates](https://ko.reactjs.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

위 그림을 보면 처음에만 전체가 렌더링 된 후 그 뒤 부터는 해당 텍스트부분만 지속적으로 바뀌는 것을 확인할 수 있다.

