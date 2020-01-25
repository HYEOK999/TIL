![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 1

- 리액트를 위한 JS 문법정리
  - 에러는 에러 객체를 상속받아서 throw 한다. (`throw new Error`)
  - let 은 변경 가능, const 는 불가능
  - arrow function
  - 함수.bind(this)
  - 디스트럭처링
  - callback
  - Promise 객체
  - Generator 객체
- React 프로젝트
  - 프로젝트 구성 지식
  - 프록젝트 구성하기
- React 짧은 리뷰
  - React 핵심 모듈
  - React Component 만드는 법
  - props와 state
  - Event Handling
    - 인라인 함수를 작성하면 안되는 이유 
    - 해결방안

<br/>

-----

## React Study with Mark - 리액트를 위한 JS 문법정리 -

<br/>

### 리액트를 위한 JS 문법정리

> 이 정도의 개념은 알고 있어야 최소한의 React 개발이 가능하다....

- 에러
- const let
- template string
- arrow function
- .bind(this)
- const {children} = this.props;
- ...props
- Promise
- async await
- Generator

<br/>

#### 에러는 에러 객체를 상속받아서 throw 한다. (`throw new Error`)

- SyntaxError : 코드를 분석하는 중 잘못된 구문을 만났음을 나타내는 오류 
- ReferenceError : 잘못된 참조를 했음을 나타내는 오류
- TypeError : 변수나 매개변수가 유효한 자료형이 아님을 나타내는 오류
- RangeError : 숫자 변수나 매개변수가 유효한 범위를 벗어났음을 나타내는 오류 

등등...

<br/>

#### let 은 변경 가능, const 는 불가능

- *Primitive* : 원시값 
- *Reference* : 객체값

<br/>

#### arrow function

- 자신의 this 를 만들지 않는다.
- 생성자로 사용할 수 없다.
- 항상 익명 함수
- 리턴만 있으면, {} 생략
- 인자가 하나면, () 생략

```javascript
// arrow.js

function Foo() {
  this.name = 'Mark';

  setTimeout(function() {
    console.log(this.name); // undefined
  }, 1000);

  setTimeout(() => {
    console.log(this.name); // Mark
  }, 1000);
}

const foo = new Foo();
```

<br/>

#### 함수.bind(this)

- 함수가 가르키는 this를 인자에 적히 this로 변경한다. 
- 호출은 하지 않는다. (호출 - apply, call)

```javascript
function hello() {
  console.log(`안녕하세요 ${this.name}`);
}

const mark = {
  name: 'Mark',
};

const helloMark = hello.bind(mark);
helloMark();  // 안녕하세요 Mark

const anna = {
  name: 'Anna',
};

const helloAnna = hello.bind(anna);
helloAnna(); // 안녕하세요 Anna
```

<br/>

#### 디스트럭처링

- 구조 분해 할당 (객체 , 배열)
- 디스트럭처링은 1레벨 깊이까지만 변화시킨다.
- 딥카피의 제일 쉬운 방법은 json.stringify를 이용하여 문자열로 변환시켜 복사하는 방법이다. (단, 엄청 느리다.)

```jsx
const obj1 = { a: { b: 100 } };
const obj1Cloned = { ...obj1 };
obj1Cloned.a.b = 200;
console.log(obj1, obj1Cloned); // 1레벨
// { a: {b: 200} } { a: {b: 200} } // {b : 200}으로 같이 변경되었음.

const obj2 = { a: { b: 100 } };
const obj2Cloned = { ...obj2, a: { ...obj2.a } };
obj2Cloned.a.b = 200; // 2레벨 깊이까지 복사했기 때문에 독리접이다.
console.log(obj2, obj2Cloned); // 2레벨
// { a: {b: 100} } { a: {b: 200} }
```

<br/>

#### callback

- 비동기 처리를 위한 선택
- 고차 함수 내부에서 호출하는 함수

```jsx
// callback.js

function foo(callback) { // foo는 고차함수다.
  setTimeout(() => {
    // 로직
    callback();
  }, 1000);
}

foo(() => {
  console.log('end');
});
console.log('이것이 먼저 실행');
// 이것이 먼저 실행
// undefined : 실행결과임
// end
```

<br/>

#### Promise 객체

- Promise 객체를 만들고, 로직 처리 후 성공과 실패를 알려준다.
- then 과 catch 를 통해 메인 로직에 전달한다.
- Promise는 3가지 상태를 지닌다.
  - Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
  - Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태 (`resolve`)
  - Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태 (`reject`)
- `new Promise()` 호출 시 Pending 상태가 된다.
- `new Promise()` 메서드 호출 시 콜백함수의 인자로  `resolve` 혹은 `reject` 에 접근할 수 있다.

```javascript
// Promise
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

foo().then(() => {
  console.log('end');
});
console.log('이것이 먼저 실행');
// 이것이 먼저 실행
// undefined : 실행결과임
// end
```

<br/>

#### Generator 객체

- `function`키워드 뒤에 `*`이 적혀진 함수를 호출해서 반환되는 객체다. ( Generator객체(표준 내장 객체) )
- `function*` 에서` yield` 를 호출하여, 다시 제어권을 넘겨준다.
- 제너레이터 객체에 `next()` 함수를 호출하면, 다음 `yield` 지점까지 간다.

```javascript
// generator.js
function* foo() {
  console.log(0.5);
  yield 1;
  console.log(1.5);
  yield 2;
  console.log(2.5);
  yield 3;
  console.log(3.5);
}

const g = foo(); // g는 Generate 객체이다.
console.log(g.next().value); // 0.5 1
console.log(g.next().value); // 1.5 2
console.log(g.next().value); // 3 3.5
console.log(g.next().value); // undefined
console.log(g.next().value); // undefined
```

- `next()`는 두 개의 프로퍼티를 가진 객체를 반환한다.
  - done (boolean)
    - Iterator(반복자)가 마지막 반복 작업을 마쳤을 경우 `true`. 만약 iterator(반복자)에 *return 값*이 있다면 `value`의 값으로 지정된다.
    - Iterator(반복자)의 작업이 남아있을 경우 `false`. Iterator(반복자)에 `done` 프로퍼티 자체를 특정짓지 않은 것과 동일하다.
  - `value` 
    -  Iterator(반복자)으로부터 반환되는 모든 자바스크립트 값이며 `done`이 `true`일 경우 생략될 수 있다.

```javascript
// generator.js
// 핸들
let handle = null;

// 비동기 함수
function bar() {
  setTimeout(() => {
    handle.next('hello');
  }, 1000);
}

// 핸들을 통해 컨트롤을 넘기는 제너레이터 함수
function* baz() {
  const text = yield bar();
  console.log(text); // hello
}

handle = baz();
handle.next(); // {value: undefined, done: false}
```

<br/>

----------------------------

### React 프로젝트

#### 프로젝트 구성 지식

- `npm run build` : 실제 배포를 위한 명령어. (build 폴더를 만든다.)

- `npm install serve -g` : 파일들을 서버로 올릴 수 있도록 하는 패키지([ZEIT](https://zeit.co/))
  `serve -s build` : `-s`는 Singlepage Application 의 약자로 어떠한 라우팅에도 index.html을 응답함

- `npm test`: 테스트 파일 생성

- `npm run eject` : npx를 해제하여 수많은 패키지들이 나온다. 

  예전에 SASS가 안될 때 사용했고, 세부적인 설정을 작업할 때 사용한다. 한번 실행 시 돌이킬 수 없다.

- webpack은 bundler /  babel은 transfiler

- 이미지 파일 로딩 방법 2가지(퍼블릭 폴더에 넣는 방식, import로 불러오는 방식)

- `package-lock.json` 은 개발했던 마지막 상태를 의미한다. 

  따라서 마지막 개발 상황을 똑같이 재현해야한다면 `npm i` 가 아니라 `npm ci`를 해야한다.

- CRA : `npx create-react-app` 정말 간편하게 react프로젝트를 만들어준다.

- ESLint : JS 혹은 JSX에서 플러그 가능한 Linting 유틸리티.( 문법검사를 더불어  코드 작성 추천 제시 )

- Prettier : 코드 자동 정리 Formatter ( Beutify와 충돌이 난다. 1개만 선택할 것 )

- husky : Git hooks 을 사용하기 쉽게 만들어주는 툴 (커밋시, ESLint와 Prettier를 적용시켜 올리게할 수 있다.)

<br/>

#### 프록젝트 구성하기

1. npx create-react-app 프로젝트명 (ESLint 포함 설치됨)

2. npm i prettier -D

3. .prettierrc 파일 생성 및 설정

   ````json
   // .prettierrc
   {
     "trailingComma": "all",
     "tabWidth": 2,
     "semi": true,
     "singleQuote": true
   }
   ````

4. npm i huskey -D

5. npm i lint-staged -D

6. package.json 파일 설정 추가

   ```json
   // package.json 의 scripts 객체 아래에 작성
   "husky": {
     "hooks": {
       "pre-commit": "lint-staged"
     }
   },
   "lint-staged": {
     "**/*.js": [
       "eslint --fix",
       "prettier --write",
       "git add"
     ]
   }
   ```

-------

### React 짧은 리뷰

- View 라이브러리 (오직 렌더링 및 업데이트만 진행)

- 컴포넌트 단위 개발 : JS에 [웹 컴포넌트](https://developer.mozilla.org/ko/docs/Web/Web_Components)가 정의되어 있다.

- Virtual DOM을 이용한 개발 (반대 : Svelte)

  State Chage → Compute Diff → Re-Render

- JSX ( Templates은 String형태로 바뀌는 것. / JSX는 하나의 표기법, JS의 트랜스파일 )

- CSR & SSR (상황에 맞게 골라서 사용한다.)

  - CSR(Client Side Rendering)
    - html, js파일을 전부 내려받을 때까지 loading상태.
    - loading 완료 시 react가 execute후 보여진다. (JS작동 동시 실행)
  - SSR(Server Side Rendering)
    - html요청시 서버에 있는 리액트 앱이 컴포넌트들을 String으로 해서 html로 내려주고, 이게 html에 바로 보여짐(JS 작동은 내려받는 중이므로 동작은 되지 않는다.)
    - JS 다운 완료 후 react가 execute된 후부터 작동 가능.

<br/>

### React 핵심 모듈

- 'react' : JSX문법을 쓸 수 있도록 지원해준다.
- 'react-dom' : 만들어진 리액트 컴포넌트를 실제 DOM 에 연결할 때 사용한다.

<br/>

### React Component 만드는 법

- class : 기존에 있는 메소드 render를 오버라이드 해서 사용 하는 것.
  - 컴포넌트 내부 상태가 있다면 - class
  - 컴포넌트 내부 상태가 없지만 라이프사이클을 사용 - class
  - 컴포넌트 내부 상태가 없고 라이프사이클과 관련X - function

```jsx
// class
import React from 'react';

class ClassComponent extends React.Component {
  render() {
    return (<div>Hello</div>);
  }
}

// 사용
<ClassComponent />

```

- hooks : 새로 도입된 React 패러다임. (All - function)

```jsx
// hooks
import React from 'react';

const FunctionComponent = () => (<div>Hello</div>);

// 사용
<HooksComponent />
```

<br/>

### props와 state

- Props 와 State는 를 바탕으로 컴포넌트를 그림
- Props 와 State 가 변경되면, 컴포넌트를 다시 그림
- 컴포넌트를 그리는 방법을 기술하는 함수가 랜더 함수
- 외부에서 보내는 데이터가 변화를 일으킬 경우에만 Props 사용.
- Props는 객체
- **State를 바로 변경하지 못하게 한 이유는?** 스테이트가 변경되면 렌더를 다시해줘야 하므로 객체를 바로 변경하게(state.s = Apple) 하지 않고 this.setState를 통해 여기서 state가 바뀌니까 **명시적으로 다시 렌더하라고 알려주는 것**

<br/>

### Event Handling

- *HTML DOM 에 클릭하면 이벤트가 발생하고, 발생하면 그에 맞는 변경이 일어나도록 해야함.*

- *JSX 에 이벤트를 설정할 수 있다.*

- **이벤트 핸들링시 인라인 함수를 작성해서는 안된다.**

  ```jsx
  <button onClick={() => console.log('abc')}>test</button> // X
  ```

- 인라인 함수로 작성했을 경우, DOM에는 크게 문제가 없다.

<br/>

#### 인라인 함수를 작성하면 안되는 이유 

> 인라인 함수로 작성했을 경우, DOM에는 크게 문제가 없다.

```jsx
<button onClick={() => console.log('abc')}>test</button> // X
```

1. 위와 같은 인라인 함수를 작성하게 될 경우 매 렌더링 시 새로운 익명함수를 만들어서 반환한다. (즉, 참조값이 달라진다.)

2. 당장의 해당 컴포넌트에서 사용하기에는 전혀 문제가 없지만 props를 통해 자식 컴포넌트에게 내려주게 될 경우 큰 문제가 발생한다.

   - **PureComponent 최적화 문제**

     기본적인 `React.Component` 의 경우 `props` 혹은 `state` 가 바뀔 때 마다, 하위 컴포넌트 역시 새롭게 렌더링한다.`React.PureComponent` 의 경우 내부에서 `props`와 `state`를 shallow level 안에서 비교 하여, 변경된 값이 있을 시에만 리렌더링 하도록 되어 있다. 문제는 새롭게 참조값을 매번 반환하므로 `PureComponent`의 의미가 전혀 없다.

   - **React.memo 최적화 문제**

     `React.memo` 역시 동일한 문제를 가지고 있다. 컴퍼넌트를 렌더링(rendering) 한 뒤, 이전 렌더된 결과와 비교하여 DOM 업데이트를 결정한다. 여기서 결과상으로 같은 값을 props로 준 것 임에도 참조값이 다르므로 `React.memo` 역시 사용된 의미가 전혀없게 된다.

   ```jsx
   // App.js
   <Person {...p} key={p.id} onClick={() => {}} />
   
   // Person.js - PureComponent 최적화 문제
   class Person extends React.PureComponent {
     render() {
       console.log("Person render");
       const { name, age } = this.props;
       return (
         <ul>
           {name} / {age}
         </ul>
       );
     }
   }
   
   // Person.js - React.memo 최적화 문제
   const Person = React.memo(props => {
     console.log("Person render");
     const { name, age } = props;
     return (
       <ul>
         {name} / {age}
       </ul>
     );
   });
   ```

<br/>

#### 해결방안

1. `useCallback` 이용
2. 인라인 함수 말고 클래스면 맴버 함수를, 펑셔널이면 내부에 함수를 만들어서 넘겨준다.