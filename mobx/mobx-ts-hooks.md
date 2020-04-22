![mobx](https://user-images.githubusercontent.com/31315644/78734744-041ee900-7984-11ea-90ab-0bffac26b033.png)

---------

# 리액트에서 Mobx 예제 - 카운터 - 

## 목차

- [카운터 만들기](#a1)
  - [Class Component's Mobx 1](#a2)
  - [Class Component's Mobx 2 : @데코레이터를 이용](#a3)
  - [함수형태(Hooks)를 이용한 Mobx](#a4)
  - [문제점](#a5)
- [Mobx 스토어 분리시키기](#a6)
  - [Class Component](#a7)
  - [Hooks](#a8)
    - [공통](#a9)
    - [Context API를 이용 X 🙅‍♂️](#a10)
    - [Context API를 이용 O 🙆‍♀️](#a11)

-------------

## 카운터 만들기 <a id="a1"></a>

### Class Component's Mobx 1 <a id="a2"></a>

```jsx
import React, { Component } from 'react';
import { decorate, observable, action } from 'mobx';
import { observer } from 'mobx-react';

class Counter extends Component {
  number = 0;

  increase = () => {
    this.number++;
  }

  decrease = () => {
    this.number--;
  }

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    );
  }
}

decorate(Counter, {
  number: observable,
  increase: action,
  decrease: action
})

export default observer(Counter);
```

<br/>

### Class Component's Mobx 2 : @데코레이터를 이용 <a id="a3"></a>

```bash
$ npm run eject
$ npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

<br/>

VSC 환경설정 : `CMD + ,` 누르고 `TypeScript Decorators` 검색 (JS이용자도 이렇게 검색해야함)

![VSC환경설정](https://user-images.githubusercontent.com/31315644/78847101-c89a2280-7a48-11ea-8f34-21dd11a80657.jpeg)

<br/>

```jsx
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

// **** 최하단에 잇던 observer 가 이렇게 위로 올라온다.
@observer
class Counter extends Component {
  @observable number = 0;

  @action
  increase = () => {
    this.number++;
  }

  @action
  decrease = () => {
    this.number--;
  }

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    );
  }
}
```

<br/>

### 함수형태(Hooks)를 이용한 Mobx <a id="a4"></a>

- useLocalStore 
- useObserver

```tsx
import React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';

const Counter2 = (props) => {
  const state = useLocalStore(() => ({
    number: 0,
    increase() {
      this.number++;
    },
    decrease(e) {
      console.log(e.target);
      this.number--;
    },
  }));

  return useObserver(() => (
    <div>
      <h1>{state.number}</h1>
      <button onClick={state.increase}>+1</button>
      <button onClick={state.decrease}>-1</button>
    </div>
  ));
};

export default Counter2;
```

<br/>

### 문제점 <a id="a5"></a>

`Mobx-developer-tools`에서 확인을 해보면 Hooks를 사용할 경우 아래 그림처럼 문제가 생긴다.
여기서 선택을 해야한다. 

- Class Component를 유지할 것인가?
- Hooks를 이용하면 `Mobx-developer-tools`에 문제가 있음을 알고도 사용할 것인가?

정답은 없지만, 우선 React Hooks를 게속 이용하도록 하겠다.

React측에서도 Hooks 사용을 권장하고 있기 때문 Mobx는 단지 상태 관리 라이브러리 그 이상 이하도 아니다. 더군다나 데이터를 아예 안보여주는 것이 아니라 그저 보기 어렵게 보여주는 것이기 때문에 이정도는 감수해도 된다고 생각했다.

![Mobx-Developer-tools](https://user-images.githubusercontent.com/31315644/78847332-7279af00-7a49-11ea-9d30-a9993e25291d.png)

<br/>

## Mobx 스토어 분리시키기 <a id="a6"></a>

`src/stores/counter.js` 파일을 만들고 스토어를 분리시킨다.

<br/>

### Class Component <a id="a7"></a>

구조

- stores/counter.js
- App.js
- index.js

기존의 counter 코드를 다음과 같이 불리한다. 데코레이터를 사용한다.

```jsx
// src/stores/counter.js

import { observable, action } from 'mobx';

export default class CounterStore {
  @observable number = 0;

  @action increase = () => {
    this.number++;
  };

  @action decrease = () => {
    this.number--;
  };
}
```

<br/>

@inject 를 이용하여 `counter`를 주입한다.

```jsx
// src/App.js

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('counter')
@observer
class App extends Component {
  render() {
    const { counter } = this.props;
    return (
      <div>
        <h1>{counter.number}</h1>
        <button onClick={counter.increase}>+1</button>
        <button onClick={counter.decrease}>-1</button>
      </div>
    );
  }
}

export default observer(App);
```

<br/>

Provider 를 이용한다.

```jsx
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import CounterStore from './stores/counter';

const counter = new CounterStore();

ReactDOM.render(
  <Provider counter={counter}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

<br/>

### Hooks  <a id="a8"></a>

Hooks를 이용한 방법은 크게 2가지가 있다.

1. **Context API를 이용하지 않는 방법**

   구조

   - stores/counterStore.jsx
   - App.jsx
   - index.jsx
   - useStore.jsx

   <br/>

2. **Context API를 이용하여 틀을 만들어 사용하는 방법**

   구조

   - store/counterStore.jsx
   - App.jsx
   - index.jsx
   - useStore.jsx
   - Context.jsx

둘 다 구현해보도록 한다.

<br/>

#### 공통 <a id="a9"></a>

우선 `useLocalStore`로 작성된 부분을 스토어로 분리해야한다.

```jsx
// src/store/counterStore.jsx
import { observable } from 'mobx';

const counterStore = observable({
  number: 0,
  increase() {
    counterStore.number++;
  },
  decrease() {
    counterStore.number--;
  },
});

export { counterStore };
```

```jsx
// src/App.jsx
import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from './useStore';

function App() {
  const { counterStore } = useStore();

  return useObserver(() => (
    <div>
      <h1>{counterStore.number}</h1>
      <button onClick={counterStore.increase}>+1</button>
      <button onClick={counterStore.decrease}>-1</button>
    </div>
  ));
}

export default App;
```

<br/>

#### Context API를 이용 X 🙅‍♂️ <a id="a10"></a>

store가 추가될 때 마다 통합적으로 관리해줄 combineStore를 하나 만들어 놓는다. 

```jsx
// src/useStore.jsx
import { counterStore } from './store/counterStore';

const useStore = () => {
  return { counterStore };
};

export default useStore;
```

<br/>

#### Context API를 이용 O 🙆‍♀️ <a id="a11"></a>

Context API를 이용하게 될 경우 과정이 복잡해진다.
큰 틀은 다음과 같다.

`countStore -> Context -> useStore`

`countStore` 부분은 동일하다. Context부터 작성한다.

```jsx
// src/Context.jsx
import React, { createContext } from 'react';
import { counterStore } from './store/counterStore';
import { useLocalStore } from 'mobx-react';

const storeContext = createContext(null);

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => counterStore);

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export { StoreProvider, storeContext };
```

<br/>

`useStore`를 변경한다.

useStore를 커스텀 훅 형태로 변경한다. 내부적으로는 `useContext`를 사용함으로써 Consumer를 대신한다.

```jsx
// src/useStore.jsx
import React from 'react';
import { storeContext } from './Context';

const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
// this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return { store };
};

export default useStore;
```

<br/>

`index.jsx` 에서 `Components` 들을 `StoreProvider`로 감싸준다.

```jsx
// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './Context';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
```

-----------

### Reference

- [velopert.log : MobX (2) 시작하기](https://velog.io/@velopert/MobX-2-리액트-프로젝트에서-MobX-사용하기-oejltas52z)
- [ZeroCho : redux-vs-mobx]([https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC](https://www.inflearn.com/course/redux-mobx-상태관리-도구))
- 내 머릿 속 🤩

<br/>

