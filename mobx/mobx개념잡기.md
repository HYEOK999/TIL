![mobx](https://user-images.githubusercontent.com/31315644/78734744-041ee900-7984-11ea-90ab-0bffac26b033.png)

---------

# Mobx 개념 정리

## 목차

- [Mobx 란?](#a1)
  - [Redux VS Mobx](#a2)
- [개념 정리](#a3)
  1. [Observable / useObserver (Mobx ver 6.xxx 👆)](#a4)
  2. [Computed Value (연산된 값)](#a5)
  3. [Reactions (반응)](#a6)
  4. [Action (액션; 행동)](#a7)
  5. [useLocalStore (Mobx ver 6.xxx 👆)](#a8)
- [리액트 없이 MobX 사용해보기](#a9)
  - [observable](#a10)
  - [reaction](#a11)
  - [computed](#a12)
  - [autorun](#a13)
- [클래스 문법을 사용한 Mobx 실습](#a14)
  - [class Mobx 에 action 적용](#a15)
  - [class Mobx 에 transaction 적용](#a16)
  - [decorator 문법으로 더 편하게](#a17)
- [클래스 Mobx vs 함수(hooks) Mobx](#a18)
  - [store 부분은 동일](#a19)
  - [useStore - 커스텀훅 ](#a20)
  - [클래스의 Mobx - 클래스에만 존재함](#a21)
  - [함수(hooks) Mobx - 함수형에만 존재함](#a22)
- [달라진 점](#a23)

-------------

## Mobx 란?

> Redux와 다른 상태 관리 라이브러리.
>
> 객체 지향적인 특징을 지고 있으며 Redux와 달리 번잡한 보일러 플레이트가 필요없다.
>
> 액션 -(변경)-> 상태 -(파생)-> 반응

![Mobx-Graph](https://user-images.githubusercontent.com/31315644/78764169-208d4680-79c1-11ea-8fc9-4b25b87ff76f.jpeg)

<br/>

### Redux VS Mobx

| Redux                        | Mobx                                 |
| ---------------------------- | ------------------------------------ |
| Immutable                    | Mutable                              |
| State 업데이트 문법이 불편 😞 | State 업데이트 편리함 😃              |
| Pure Object                  | 대부분 인스턴스 결합                 |
| Serialize 비용이 낮음 😃      | 데이터 변경 시 Serialize 비용이 큼 😞 |
| 정규화된 트리 구조를 강제함  | 정규화 강제 X                        |
| Single Root Tree             | 그래프 구조를 가질 가능성이 높음     |
| 트리 순회 기능               | 순회가 불가할 수도 있음              |
| 모델링 / 타이핑 불편 😞       | 모델링 / 타이핑 간편 😃               |
| Time Traveling 지원          | Time Traveling 미지원                |

<br/>

## 개념 정리

<br/>

### 1. Observable / useObserver (Mobx ver 6.xxx 👆)

 Mobx에서 렌더링 대상이 되는 state(상태, 값)를 관찰 대상(observable value) 라고 칭한다.

`@observable` 데코레이터로 지정한 State는 관찰 대상으로 지정되고 그 State는 값이 변결될 때 마다 렌더링 된다.

`+` 추가

클래스형태의 Mobx는 `@observable` 데코레이터를 이용하지만 최근의 리액트에서 hooks를 사용함에 따라 Mobx도 hooks를 이용한다. 

이전에는 React를 함수형(hooks)으로 사용하고 싶다면 `mobx-react-lite` 를 이용해야만 했었는데, 현재는 mobx 버전 6.xxx 이상으로 올라감에 따라 mobx-react만 이용해도 사용할 수 있게 되었다.

<br/>

### 2. Computed Value (연산된 값)

 연산된 값(Computed Value)은, 기존의 상태값과 다른 연산된 값에 기반하여 만들어질 수 있는 값.

주로 성능 최적화를 위하여 사용되며, 어떤 값을 연산해야 할 때, 연산에 기반되는 값이 바뀔때마 새로 연산하게 하고, 바뀌지 않았다면 기존의 값을 유지한다. (React.Memo, useMemo느낌)

<br/>

### 3. Reactions (반응)

Reactions 는 Computed Value와 비슷하다. 

Computed Value의 경우는 특정 값을 연산해야 될 때에만 처리가 되는 반면에, Reactions는, 값이 바뀜에 따라 해야할 일으 정하는 것.(useCallback 느낌)

예를 들어서 Observable State 의 내부의 값이 바뀔 때, 우리가 `console.log('ㅇㅇㅇ가 바뀌었어!')` 라고 호출할 수 있다.

<br/>

### 4. Action (액션; 행동)

액션은, 상태에 변화를 일으키는것을 말한다. 만약에 Observable State 에 변화를 일으키는 코드를 호출한다? 이것은 하나의 액션이다. - 리덕스에서의 액션과 달리 따로 객체형태로 만들지는 않는다.

<br/>

### 5. [useLocalStore](https://mobx-react.js.org/state-local) (Mobx ver 6.xxx 👆)

```tsx
useLocalStore(initializer: () => T, source?: S): T
```

로컬 observable state는 `useLocalStore` hook을 사용한다. `useLocalStore`는 initializer 함수를 한번 실행시키는데, observable store를 생성하고, 컴포넌트의 lifetime 동안 유지한다. return된 객체의 모든 property는 자동적으로 observable될 수 있다. getter는 computed property로 변할 것이고, method는 store에 bind될 것이며 mobx transaction을 자동적으로 적용할 것이다. 만약 새로운 인스턴스가 initializer에서 반환되면, 그 인스턴스는 그 상태로 유지될 것이다.

<br/>

## 리액트 없이 MobX 사용해보기

### observable

observable 함수는 Observable State를 만들어준다.

```jsx
import { observable } from 'mobx';

// **** Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});
```

Observable State 를 만들고나면 MobX 가 이 객체를 "관찰 할 수" 있어서 변화가 일어나면 바로 탐지해낼수있다.

<br/>

### reaction

특정 값이 바뀔 때 어떤 작업을 하고 싶다면 [reaction](https://mobx.js.org/refguide/reaction.html) 함수를 사용한다.

한번 a 나 b 가 바뀔 때 console.log 로 바뀌었다고 알려주도록 코드를 작성해보자.

```js
import { observable, reaction } from 'mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// **** 특정 값이 바뀔 때 특정 작업 하기!
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

calculator.a = 10;
calculator.b = 20;

/*
console 
a 값이 10 로 바뀌었네요! 
b 값이 20 로 바뀌었네요! 
*/
```

<br/>

### computed

computed 함수는 연산된 값을 사용해야 할 때 사용된다. 

특징 : 값을 조회할 때 마다 특정 작업을 처리하는것이 아니라, 이 값에서 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회 할 때는 캐싱된 데이터를 사용한다는 점.

```tsx
import { observable, reaction, computed, autorun } from 'mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// **** 특정 값이 바뀔 때 특정 작업 하기!
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

// **** computed 로 특정 값 캐싱
const sum = computed(() => {
  console.log('계산중이예요!');
  return calculator.a + calculator.b;
});

sum.observe(() => calculator.a); // a 값을 주시
sum.observe(() => calculator.b); // b 값을 주시

calculator.a = 10;
calculator.b = 20;

//**** 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);


// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 20;
console.log(sum.value);

/*
console 
계산중이예요! 
a 값이 10 로 바뀌었네요! 
계산중이예요! 
b 값이 20 로 바뀌었네요! 
계산중이예요! 
30
30
a 값이 20 로 바뀌었네요! 
계산중이예요! 
40
*/
```

<br/>

### autorun

[autorun](https://mobx.js.org/refguide/autorun.html) 은 reaction 이나 computed 의 observe 대신에 사용 될 수 있는데, autorun 으로 전달해주는 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시하여 그 값이 바뀔 때 마다 함수가 주시되도록 해준다. 여기서 만약에 computed 로 만든 값의 .get() 함수를 호출해주면, 하나하나 observe 해주지 않아도 된다.

```tsx
import { observable, reaction, computed, autorun } from 'mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// computed 로 특정 값 캐싱
const sum = computed(() => {
  console.log('계산중이예요!');
  return calculator.a + calculator.b;
});

// **** autorun 은 함수 내에서 조회하는 값을 자동으로 주시함
autorun(() => console.log(`a 값이 ${calculator.a} 로 바뀌었네요!`));
autorun(() => console.log(`b 값이 ${calculator.b} 로 바뀌었네요!`));
autorun(() => sum.get()); // su

calculator.a = 10;
calculator.b = 20;

// 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);

calculator.a = 20;

// 내부의 값이 바뀌면 다시 호출 함
console.log(sum.value);

/*
console 
a 값이 1 로 바뀌었네요! 
b 값이 2 로 바뀌었네요! 
계산중이예요! 
a 값이 10 로 바뀌었네요! 
계산중이예요! 
b 값이 20 로 바뀌었네요! 
계산중이예요! 
30
30
a 값이 20 로 바뀌었네요! 
계산중이예요! 
40
*/
```

<br/>

## 클래스 문법을 사용한 Mobx 실습

ES6 의 class 문법을 사용하면 조금 더 깔끔하게 코드를 작성 할 수 있다. 기존의 코드를 날리고, 이번엔 편의점 장바구니를 만들어보자. class 로 장바구니를 구현 후, decorate 함수를 통하여 MobX 를 적용한다.

```javascript
import { decorate, observable, computed, autorun } from 'mobx';

class GS25 {
  basket = [];
  
  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

// decorate 를 통해서 각 값에 MobX 함수 적용
decorate(GS25, {
  basket: observable,
  total: computed,
});

const gs25 = new GS25();
autorun(() => gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('포카칩', 1500);
console.log(gs25.total);

/*
console
계산중입니다..! 
계산중입니다..! 
800
계산중입니다..! 
1600
계산중입니다..! 
3100
*/
```

<br/>

### class Mobx 에 action 적용

상태에 변화를 일으키는 것은 action 이다. 만약, 변화를 일으키는 함수에 Mobx의 action을 적용하면 무엇을 할 수 있는지 알아보자.

우선, 코드 상단에서 action 함수를 불러오고, decorate쪽에 select가 action이라는 것을 명시한다.

action을 사용하면 개발자도구를 통해 변화에 대한 세부정보 확인, 변화가 일어날 때 마다 reaction들이 나타나는 것이 아니라, 모든 액션이 끝나고 난 다음에서야 reaction이 나타나게끔 설정이 가능하다.

```js
// **** 액션 불러옴
import { decorate, observable, computed, autorun, action } from 'mobx';

class GS25 {
  basket = [];
  
  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

decorate(GS25, {
  basket: observable,
  total: computed,
  select: action // **** 액션 명시
});

const gs25 = new GS25();
autorun(() => gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('포카칩', 1500);
console.log(gs25.total);
```

<br/>

### class Mobx 에 transaction 적용

액션을 한꺼번에 일으킨다.

transaction 을 통하여 계산 작업은 가장 처음 한번, 그리고 transaction 끝나고 한번 호출이 되었고, 새 데이터 추가 될 때마다 알리는 부분도 전부 다 추가하고 나서야 딱 한번 콘솔에 마지막 객체가 나타났다.

액션을 사용하면, 이렇게 성능 개선도 이뤄낼 수 있고 나중에 MobX 개발자 도구를 사용하게 될 때 변화에 대한 더 자세한 정보를 알 수 있게 해준다.

```js
import {
  decorate,
  observable,
  computed,
  autorun,
  action,
  transaction // *** transaction 불러옴
} from 'mobx';

class GS25 {
  basket = [];

  get total() {
    console.log('계산중임');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

decorate(GS25, {
  basket: observable,
  total: computed,
  select: action
});

const gs25 = new GS25();
autorun(() => gs25.total);
// *** 새 데이터 추가 될 때 알림
autorun(() => {
  if (gs25.basket.length > 0) {
    console.log(gs25.basket[gs25.basket.length - 1]);
  }
});

transaction(() => {
  gs25.select("물", 800);
  gs25.select("과자", 800);
  gs25.select("사과", 800);
  gs25.select("고기", 800);
});

console.log(gs25.total);

/*
console
계산중임 
계산중임 
3200
*/
```

<br/>

### decorator 문법으로 더 편하게

정규 문법은 아니지만, babel 플러그인을 통하여 사용 할 수 있는 문법. 이 문법을 사용하면 decorate 함수가 더 이상 필요하지 않고, 다음과 같이 작성 해 줄 수 있다.

```js
import { observable, computed, autorun, action, transaction } from 'mobx';

class GS25 {
  @observable basket = [];

  @computed 
  get total() {
    console.log("계산중임...");

    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  @action
  select(name, price) {
    this.basket.push({ name, price });
  }
}

const gs25 = new GS25();
autorun(() => gs25.total);
autorun(() => if(gs25.basket.length > 0) console.log(gs25.basket[gs25.basket.length - 1]));

transaction(() => {
  gs25.select('물', 800);
  gs25.select('물', 800);
  gs25.select('포카칩', 1500);
});

console.log(gs25.total);
```

<br/>

## 클래스 Mobx vs 함수(hooks) Mobx

### store 부분은 동일

```jsx
const { observable } = require('mobx');

const userStore = observable({
  isLoggingIn: false,
  data: null,
  logIn(data) {
    this.isLoggingIn = true;
    setTimeout(() => {
      this.data = data;
      this.isLoggingIn = false;
      postStore.data.push(1);
    }, 2000);
  },
  logOut() {
    this.data = null;
  },
});

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
});

export { userStore, postStore };

```

<br/>

### useStore - 커스텀훅 

`combineStore` 느낌, mobx로 선언한 `store`들을 한 곳에 모아줌.

```jsx
import { userStore, postStore } from './store';

function useStore() {
  return { userStore, postStore };
}

export default useStore;
```

<br/>

### 클래스의 Mobx - 클래스에만 존재함

```tsx
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { userStore, postStore } from './store';

@observer
class App extends Component {
  state = observable({
    name: '',
    password: '',
  });

  onClick = () => {
    userStore.logIn({
      nickname: 'zerocho',
      password: '비밀번호',
    });
  };

  onLogout = () => {
    userStore.logOut();
  };

  render() {
    return (
      <div>
        {userStore.isLoggingIn
          ? <div>로그인 중</div>
          : userStore.data
            ? <div>{userStore.data.nickname}</div>
            : '로그인 해주세요.'}
        {!userStore.data
          ? <button onClick={this.onClick}>로그인</button>
          : <button onClick={this.onLogout}>로그아웃</button>}
        <div>{postStore.data.length}</div>
        <input value={this.state.name} onChange={(e) => {
          this.state.name = e.target.value;
        }} />
        <input value={this.state.password} type="password" onChange={(e) => {
          this.state.password = e.target.value;
        }}  />
      </div>
    );
  }
}

export default App;
```

<br/>

### 함수(hooks) Mobx - 함수형에만 존재함

```TSX
import React, { useCallback } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';

import useStore from './useStore';

const App = () => {
  const { userStore } = useStore();
  console.log(userStore);

  const state = useLocalStore(() => ({
    name: '',
    password: '',
    onChangeName(e) {
      this.name = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    }
  }));

  const onClick = useCallback(() => {
    userStore.logIn({
      nickname: 'zerocho',
      password: '비밀번호',
    });
  }, []);

  const onLogout = useCallback(() => {
    userStore.logOut();
  }, []);

  return useObserver(() => (
    <div>
      {userStore.isLoggingIn
        ? <div>로그인 중</div>
        : userStore.data
          ? <div>{userStore.data.nickname}</div>
          : '로그인 해주세요.'}
      {!userStore.data
        ? <button onClick={onClick}>로그인</button>
        : <button onClick={onLogout}>로그아웃</button>}
      <input value={state.name} onChange={state.onChangeName} />
      <input value={state.password} type="password" onChange={state.onChangePassword}  />
    </div>
  ));
};

export default App;

```

<br/>

### 달라진 점

- 클래스에서는 클래스 선언 상단에 `@observer` 데코레이터를 이용했지만 함수형에서는 반환(return) 할 때 `useObserver`를 사용했다는 것.
- 지역상태를 `useState`로 만들 수 있으나 리액트는 불변성을 유지해야하는 점으로 인해 이를 극복하기 위해 Mobx의 `useLocalStore`를 이용하였음.

-----------

### Reference

- [velopert.log : MobX (1) 시작하기](https://velog.io/@velopert/begin-mobx)
- [ZeroCho : redux-vs-mobx]([https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC](https://www.inflearn.com/course/redux-mobx-상태관리-도구))
- [Naver d2 : MobX & MST : 편안한 State Management](https://www.youtube.com/watch?v=4yUgM7SaYUU&t=1856s)

<br/>