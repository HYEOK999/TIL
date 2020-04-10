![React with TypeScript](https://user-images.githubusercontent.com/31315644/77824045-edd28b00-7142-11ea-83d8-b88e7cb6c97d.png)

------------

# 리액트 컴포넌트 타입스크립트로 작성하기

## 목차

- [프로젝트 생성](#a1)
- [Arrow vs Function](#a2)
- [새로운 컴포넌트 만들기](#a3)
  - [interface vs type](#a4)
  - [React.FC 의 장단점](#a5)
    - [props에 기본적으로 `children` 이 있어 사용하기 편하다](#a6)
    - [컴포넌트의 defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성이 될 수 있다는 것](#a7)
  - [React.FC를 생략할 경우](#a8)
  - [컴포넌트에 생략할 수 있는 props 설정하기](#a9)
  - [컴포넌트에서 함수 타입의 props 받아오기](#a10)
- [정리](#a11)

<br/>

----------

### 프로젝트 생성 <a id="a1"></a>

```bash
$ npx create-react-app ts-react-tutorial --typescript
```

`npx` 제일 뒤에 `--typescript` 가 있으면 타입스크립트 설정이 적용된 프로젝트가 생성된다.

만약, 이미 진행 중인 프로젝트에 타입스크립트를 추가하려면 다음과 같은 명령어를 사용한다.

``` bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

타입스크립트를 이용 시 특정 컴포넌트에 필요한 값이나 자동완성이 필요할 땐 `Ctrl + Space` 를 눌러보면 확인 할 수 있다.

<br/>

### Arrow vs Function <a id="a2"></a>

프로젝트를 생성 후 `App.tsx` 를 확인해보면 다음과 같은 코드들을 확인할 수 있다.

```tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

여기서 함수의 정의 형태가 일반함수로서 화살표 함수가 아니다.

예전엔 컴포넌트 생성 시, `const App: React.FC = () => { ... }` 와 같이 화살표함수를 사용하여 컴포넌트가 선언되었다. 그런데, 꼭 화살표 함수를 사용하여 선언 할 필요는 없다. 최근 해외의 유명 개발자들([링크1](https://overreacted.io/a-complete-guide-to-useeffect/), [링크2](https://kentcdodds.com/blog/how-to-use-react-context-effectively))은 보통 `function` 키워드를 사용하여 함수형 컴포넌트를 선언하는 것으로 추세다. 리액트 공식 매뉴얼에서도 `function` 키워드를 사용하고 있기도 한다.

반면 예전 프로젝트를 만들 때 자동 생성 된 App.tsx 의 경우 `React.FC` 라는 타입을 사용하여 화살표 함수를 사용하면서 컴포넌트를 선언했는데, 이렇게 타입하는 것이 좋을 수 도 있고 나쁠 수도 있다. 

**결론적으로, 함수형 컴포넌트를 작성 할 때는 화살표 함수(=>)로 작성해도 되고, `function` 키워드를 사용해도 된다. 요즘은 `function` 키워드가 통일시 되고 있다.**
**단, React.FC 라는 타입은 사용을 자제하는 것이 좋다.** 

<br/>

### 새로운 컴포넌트 만들기 <a id="a3"></a>

파일 위치 : **src/Greetings.tsx**

<br/>

#### interface vs type <a id="a4"></a>

컴포넌트의 props에 대한 타입을 선언 할 때에는 `type` 을 써도 되고, `interface` 를 사용해도 상관없다.

단, 프로젝트에서 일관성만 유지하면 충분하다. (A에서는 `interface` 를 B에서는 `type` 쓰는 걸 자제)

```tsx
// type
import React from 'react';

type GreetingsProps = {
  name: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
);

export default Greetings;
```

```tsx
// interface
import React from 'react';

interface GreetingsProps {
  name: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
);

export default Greetings;
```

<br/>

#### React.FC 의 장단점 <a id="a5"></a>

`React.FC` 를 사용 할 때는 props 의 타입을 `<Generics>` 로 넣어서 사용한다. `React.FC`를 사용해서 얻을 수 있는 장단점은 두가지가 있다. 이 두가지는 장점이 될 수 도 단점이 될 수 도 있다.

1. props에 기본적으로 `children` 이 있어 사용하기 편하다.
2. 컴포넌트의 defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성이 될 수 있다는 것.

<br/>

##### props에 기본적으로 `children` 이 있어 사용하기 편하다. <a id="a6"></a>

이 부분은 어찌보면 장점이 될 수도 있고, 단점이 될 수도 있다.

이유는 특정 컴포넌트에서는 `children` 필요할수도 하지 않을 수도 있는데, `React.FC` 는 `children` 을  옵셔널 타입으로 지정해놨기에 이는 타입스크립트의 철학과는 모호한 관계를 띄게 된다.

따라서 특정 컴포넌트에서 `children` 을 필요로 한다면 반드시 `children` 타입을 명시해야한다.

```tsx
type GreetingsProps = {
  name: string;
  children: React.ReactNode;
};
```

**결과 적으로 차라리, `React.FC` 를 사용하지 않고 GreetingsProps 타입을 통해 `children`이 있다 없다를 명백하게 명시하는게 덜 헷갈린다.**

<br/>

##### 컴포넌트의 defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성이 될 수 있다는 것. <a id="a7"></a>

추후 개선의 여지가 있지만, 아직까진 React.FC를 이용할 때  `defaultProps`가 제대로 동작이 되고 있지 않다.

```tsx
// src/Greetings.tsx
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name, mark }) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

위와 같은 코드를 작성하고 `App.tsx`에서 해당 코드를 로드할 경우, 아래 부분에서 에러를 유발한다.

```tsx
// src/App.tsx

import React from 'react';
import Greetings from './Greetings';

const App: React.FC = () => {
  return <Greetings name="Hello" />; // 이 부분에서 에러
};

export default App;
```

<br/>

결국, `mark` 를 `defaultProps` 로 넣었음에도 불구하고 `mark`값이 없다면서 제대로 작동하지 않는다.

`React.FC`를 쓰면서 `defaultProps` 를 사용하려면 결국 코드를 다음과 같이 작성하는 수 밖에 없다.

따라서, 아래처럼 비구조화 할당을 하는 과정에서 기본값을 설정해야만 한다. 

```tsx
// src/Greetings.tsx

import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!' }) => (
  <div>
    Hello, {name} {mark}
  </div>
);

// 결국 무의미해진 defaultProps?
Greetings.defaultProps = {
  mark: '!' 
};

export default Greetings;

```

<br/>

####  React.FC를 생략할 경우 <a id="a8"></a>

위와 같은 `React.FC`의 장점보다는 단점을 회피하고자 `React.FC` 를 생략할 경우, 다음과 같이 작성할 수 있다.

**즉, `React.FC` 를 이용하지 않는 것이 좀 더 권장된다.**

```tsx
// src/Greetings.tsx
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

/*
function Greetings({ name, mark }: GreetingsProps) {
  return (
*/
const Greetings = ({ name, mark }: GreetingsProps) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;

```

<br/>

#### 컴포넌트에 생략할 수 있는 props 설정하기 <a id="a9"></a>

> 컴포넌트의 props 중에서 생략해도 되는 값이 있다면 `?` 문자를 사용하면 된다.

```jsx
// src/Greetings.tsx

import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
};

function Greetings({ name, mark, optional }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;

```

<br/>

#### 컴포넌트에서 함수 타입의 props 받아오기 <a id="a10"></a>

> 컴포넌트에서 특정 함수를 props 로 받아와야 한다면 다음과 같이 타입을 지정 할 수 있다.

```typescript
// src/Greetings.tsx

import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
  onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;

```

<br/>

그리고, src/App.tsx 에서 해당 컴포넌트를 사용해야 할 때 다음과 같이 작성한다.

```tsx
// src/App.js

import React from 'react';
import Greetings from './Greetings';

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  };
  return <Greetings name="Hello" onClick={onClick} />;
};

export default App;

```

<br/>

<br/>

### 정리 <a id="a11"></a>

이번 섹션에서 배웠던 것.

- `React.FC` 는 별로 좋지 않다.
- 함수형 컴포넌트를 작성 할 때는 화살표 함수로 작성해도 되고, `function` 키워드를 사용해도 된다.
- Props 에 대한 타입을 선언 할 땐 `interface` 또는 `type` 을 사용하면 되며, 프로젝트 내부에서 일관성만 지키면 된다.

<br/>

-----------

### Reference

- [velopert.log : 타입스크립트 기초 연습](https://velog.io/@velopert/create-typescript-react-component)