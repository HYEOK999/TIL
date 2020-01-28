![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 2

- Component Lifecycle

- 변경 전 (< v16.3)

  - [Component 생성 및 마운트](#a1)
  - [Component props, state 변경](#a2)
    - [componentWillReceiveProps](#a3)
    - [shouldComponentUpdate (✸)](#a4)
    - [componentWillUpdate](#a5)
    - [componentDidUpdate](#a6)
  - [Component 언마운트](#a7)

- 변경 후  (> v16.3)

  - Component 라이프사이클 변경
  - [목록](#b1)
  - [Component 생성 및 마운트 v16.3](#b2)
  - [Component props, state 변경 v16.3](#b3)
  - [Component 언마운트 (v16.3)](#b4)
  - [Component 에러 캐치](#b5)
    - [react-error-boundary ](#b6)


<br/>

- React의 라우팅 이해하기
- SPA 라우팅 과정
- Router 실습해보기

  - 특정 경로에서 보여줄 컴포넌트를 준비한다.
  - App.js 설정하기
  - exact
- 동적 라우팅
  - 동적 라우팅 - Params (의무)
  - 동적 라우팅 - 쿼리스트링 (옵셔널 - 있어도 되고, 없어도된다.)
    1. URLSearchParams
    2. query-string (라이브러리)
- Switch
  - Link 태그
  - NavLink
- JS로 라우팅 이동하기
- HOC(High Order Component) - withRouter()
- Redirect

<br/>

- Route Hooks

  - useHistory

  - useLocation

  - useParams

  - useRouteMatch

  - BrouserRouter의 내려주기.

- React developer tools

<br/>

-----

## React Study with Mark - React Router -

<br/>

### Component Lifecycle

> 리액트 컴포넌트는 탄생 (Mount) 부터 죽음 (Unmount) 까지 여러 지점에서 개발자가 작업을 할 수 있도록 Class Component 의 라이프사이클 메서드를 **"오버라이딩"** 할 수 있게 해준다.

`render`함수는 반드시 덮어씌워야 한다. (안할 시, 에러 유발 -> 다른 함수는 상관없다.)

Declarative 디클레러티브, 선언적인 프로그래밍을 한다. 필요한 부분만 오버라이딩을 하여 사용한다.

--------------------------

### 변경 전 (< v16.3)

#### Component 생성 및 마운트 <a id="a1"></a>

> 컴포넌트를 사용하면 언제 마운트 되는지 알 수 있다.

1. constructor
2. componentWillMount
3. **render (최초 랜더)**
4. componentDidMount

```jsx
class App extends React.Component {
  _interval;

  constructor(props) {
    console.log('App constructor'); //1번
    super(props);
    this.state = {
      age: 37,
    };
  }

  componentWillMount() {
    console.log('App componentWillMount'); //2번
  }

  componentDidMount() {
    console.log('App componentDidMount'); // 3번
    this._interval = window.setInterval(() => {
      this.setState({
        age: this.state.age + 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount'); // 4번
    clearInterval(this._interval);
  }

  render() {
    console.log('App render'); //3번
    return (
      <div>
        <h2>
          Hello {this.props.name} - {this.state.age}
        </h2>
      </div>
    );
  }
}
```

<br/>

#### Component props, state 변경 <a id="a2"></a>

1. componentWillReceiveProps - **props**, **부모의 컴포넌트**가 바뀌거나  **forceUpdate(강제)** 시 여기부터 시작.
2. shouldComponentUpdate - state가 바뀌면 여기부터 시작.
3. componentWillUpdate
4. render
5. componentDidUpdate 
   - **여기서 setState X - 렌더 후 재실행 되므로 무한 업데이트에 빠질 수 있다. (if로 방어코드를 쓰지말고 하지말자!)**
   - 리액트 애플리케이션이 호출할 때 인자를 넣어줌

<br/>

##### - componentWillReceiveProps <a id="a3"></a>

- props 를 새로 지정했을 때 바로 호출된다.
- 여기는 state 의 변경에 반응하지 않는다.
  - 여기서 props 의 값에 따라 state 를 변경해야 한다면,
    - setState 를 이용해 state 를 변경한다.
    - **그러면 다음 이벤트로 각각 가는것이 아니라 한번에 변경된다.**

<br/>

##### - shouldComponentUpdate (✸)  <a id="a4"></a>

> 이 메서드는 오직 **성능 최적화**만을 위한 것. 렌더링을 방지하는 목적으로 사용할 경우 버그로 이어질 수 있다. 

- props 만 변경되어도
- state 만 변경되어도
- props & state 둘다 변경되어도 (componentWillReceiveProps)
- newProps 와 new State 를 인자로 해서 호출
- return type 이 boolean 이다.
  - true 면 render
  - false 면 render 가 호출되지 않는다.
  - 이 함수를 구현하지 않으면, 디폴트는 true

<br/>

##### - componentWillUpdate <a id="a5"></a>

- 컴포넌트가 재 랜더링 되기 직전에 불립니다.
- 여기선 setState 같은 것을 쓰면 아니됩니다.

<br/>

##### - componentDidUpdate <a id="a6"></a>

- 컴포넌트가 재 랜더링을 마치면 불립니다.

<br/>

#### Component 언마운트  <a id="a7"></a>

- componentWillUnmount ( 타임을 걸어놓고 해제를 할 경우 많이 씀. )

<br/>

------------

### 변경 후  (> v16.3)

#### Component 라이프사이클 변경

#### 목록 <a id="b1"></a>

- constructor
- ~~componentWillMount~~ → **getDerivedStateFromProps**
  - static Method
- render
- componentDidMount

<br/>

- ~~componentWillReceiveProps~~ → **getDerivedStateFromProps** 
  - Props로부터 state를 만들어냄. (리턴이 생김)
- shouldComponentUpdate
- render
- ~~componentWillUpdate~~ → **getSnapshotBeforeUpdate** 
- v16.3 이전에는 render보다 먼저 실행되었지만, v16.3부터는 렌더 이후 실행됨.
  - 실제로 렌더링 되기 전과 후에 비교해서 처리해야 될 상황에 사용. ( componentDidUpdate가 필요 )
  - **리턴의 형태는 state와 같아야 한다.**
  - Ex) 리스트가 10개에서 15개가 되었는데 기존 10개 위치에 머물러 있어야 한다면 필요가 없지만 15개의 위치로 내려가야하는 **스크롤탑 위치가 조정되어야 할 경우에 필요함**

(dom 에 적용)

- componentDidUpdate

<br/>

- componentWillUnmount

<br/>

#### Component 생성 및 마운트 v16.3  <a id="b2"></a>

- constructor
- static getDerivedStateFromProps
- render (최초 랜더)
- componentDidMount

<br/>

#### Component props, state 변경 v16.3  <a id="b3"></a>

- static getDerivedStateFromProps (props 변경)
- shouldComponentUpdate (state 변경)
- render
- getSnapshotBeforeUpdate (componentDidUpdate 와 함께 사용)

(dom 에 적용)

- componentDidUpdate

<br/>

#### Component 언마운트 (v16.3)  <a id="b4"></a>

- componentWillUnmount

<br/>

#### Component 에러 캐치  <a id="b5"></a>

> React는 하나의 앱형태로 되어 있기 때문에, 한 곳의 에러가 발생할 경우 모든 곳에 영향을 주기 때문에 어플리케이션이 망가질수 있다.

- componentDidCatch : 가장 상위에 `componentDidCatch`를 두어야한다.(여기선 App) 
  - 문제가 발생할 것 같은 컴포넌트의 상위 컴포넌트에 작성해주어야 한다.
- 라이브러리도 존재한다. `react-error-boundary`

```jsx
import React from 'react';

class Button extends React.Component {
  render() {
    test(); // 말도 안되는 코드. test함수가 존재하지않는다.
    return <div>hello</div>;
  }
}

class App extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>에러 화면</div>;
    }
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default App;
```

<br/>

##### - react-error-boundary ([라이브러리](https://github.com/bvaughn/react-error-boundary))  <a id="b6"></a>

```jsx
<ErrorBoundary FallbackComponent={MyFallbackComponent}>
  <ComponentThatMayError />
</ErrorBoundary>
```

에러가 발생할 경우, `FallbackComponent={MyFallbackComponent}` 으로 연결해준 컴포넌트를 보여준다. (즉 에러처리 화면)

---------------------------

### React의 라우팅 이해하기

> SPA : Single Page Application

- react-router-dom
- 처음 진입점 : React App

<img src="https://user-images.githubusercontent.com/31315644/72519464-bd48b800-389a-11ea-9aec-cad4b1e48b2a.jpeg" alt="router01img" style="zoom:50%;" />

<br/>

### SPA 라우팅 과정

1. 브라우저에서 최초에 '/' 경로로 요청을 하면,

2. React Web App 을 내려준다.

3. 내려받은 React App 에서 '/' 경로에 맞는 컴포넌트를 보여준다.

4. React App 에서 다른 페이지로 이동하는 동작을 수행하면,

5. 새로운 경로에 맞는 컴포넌트를 보여준다.

6. 매치 옵션이 존재한다.

   매치 알고리즘 : 브라우저의 주소창에 적혀진 주소와 `route path`,` <Link to>`에 적혀있는 것을 비교하는 것. 

   ( 여러가지 매치방법이 있는데 ( sensitive, strict 등등) )

   ![MatchOption](https://user-images.githubusercontent.com/31315644/72577250-67652600-3915-11ea-838f-3b894936e21a.jpeg)

<br/>

### Router 실습해보기

```bash
npm i react-router-dom
```

- cra 에 기본 내장된 패키지가 아니다. ( 아마, 지원안해줄 확률이 매우 높다. 리액트는 단순히 View만 신경쓰기 때문 )
- react-router-dom 은 Facebook 의 공식 패키지는 아니다.
- 가장 대표적인 라우팅 패키지.

<br/>

#### 특정 경로에서 보여줄 컴포넌트를 준비한다.

- *'**/**' → **Home** 컴포넌트*
- *'**/profile**' → **Profile** 컴포넌트*
- *'**/about**' → **About** 컴포넌트*

<br/>

#### App.js 설정하기

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

- Route 컴포넌트에 경로(path) 와 컴포넌트(component) 를 설정하여 나열해준다.

- BrowserRouter 로 Route 들을 감싸준다. (브라우저 라우팅을 위한 react-router-dom에서 지원해주는 jsx 태그)

- 브라우저에서 요청한 경로에 Route 의 path 가 들어있으면(매치가 되면) 해당 component 를 보여준다.

  ![router-img02](https://user-images.githubusercontent.com/31315644/72520534-fc780880-389c-11ea-8cc8-caa781556305.jpeg)

<br/>

#### exact

<img src="https://user-images.githubusercontent.com/31315644/72520534-fc780880-389c-11ea-8cc8-caa781556305.jpeg" alt="router-img02" />

>  exact는 100%일치해야되기 때문에 값이 변하는 변수를 사용할 수 없다.

위 상황을 해결하기 위해서 `exact`키워드를 사용한다.

```jsx
<Route path="/" exact component={Home} />
```

<br/>

### 동적 라우팅

>  `<BrouserRouter>` 의 하위 `<Route>` 컴포넌트들에게 `history`,  `location`,` match`로 이루어진 props 객체를 내려준다.

- `history` 는 url을 변경시켜 다른 컴포넌트로 이동하는 역할
- `match`는  Params 데이터를 가지고있다.
- `loacation`은 query-string(?로 시작하는 키=값) 을 가지고 있다.

<br/>

#### 동적 라우팅 - Params (의무)

```jsx
<Route path="/profile/:id" component={Profile} />
```

- `/profile/1` 이 주소에서 1은 Params 라고 부른다.
- Params는 [String] Type이다.
- Params를 가지고 오는 방법. 
- `match`는 위에서 언급한 매치 알고리즘을 의미한다.

```jsx
import React from "react";

export default function Profile(props) {
  console.log(props.match.params);
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}
```

![router-img03](https://user-images.githubusercontent.com/31315644/72521214-5f1dd400-389e-11ea-9642-8784eadd3c07.jpeg)

<br/>

#### 동적 라우팅 - 쿼리스트링 (옵셔널 - 있어도 되고, 없어도된다.)

```jsx
<Route path="/about" component={About} />
```

위 처럼 설정을 해두고, 검색창에 `/about?name=mark`라고 검색해서 props를 찍어보면 `location.search`에 들어있다.

`Params` 처럼 별도의 설정이 `path="/about/:id"`같이 적어줄 필요가 없다.

<br/>

##### 1. URLSearchParams

- IE 사용불가능... (IE 🤬)

```jsx
import React from 'react';

const About = props => {
  const searchParams = new URLSearchParams(props.location.search);

  const name = searchParams.get('name');
  console.log(searchParams);
  return (
    <div>
      <h1>About</h1>
      {name && <p>name 는 {name} 입니다.</p>}
    </div>
  );
};

export default About;
```

<br/>

##### 2. query-string ([라이브러리](https://github.com/sindresorhus/query-string/blob/master/readme.md))

- `URLSearchParams`의 단점을 상쇄하고자 사용함.

```jsx
import React from 'react';
import queryString from 'query-string';

const About = props => {
  console.log(props);
  const query = queryString.parse(props.location.search);

  console.log(query);
  const { name } = query;
  return (
    <div>
      <h1>About</h1>
      {name && <p>name 는 {name} 입니다.</p>}
    </div>
  );
};

export default About;
```

<br/>

#### Switch

> 여러 Route 중 순서대로 먼저 맞는 하나만 보여준다.

- `exact` 를 뺄 수 있는 로직을 만들 수 있다.
- 가장 작은 단위의 컴포넌트를 상단으로 작성한다.
- 가장 마지막에 어디 path 에도 맞지 않으면 보여지는 컴포넌트를 설정해서, `Not Found` 페이지를 만들 수 있다.

```jsx
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

<br/>

#### Link 태그

- `<a>` 태그를 쓰면 Reload(서버와의 통신)가 발생하므로 `<Link>`태그를 이용해서 단순히 컴포넌트만을 변경하는 방식을 이용함.
  - 내부적으로는 `<a>`태그이므로 css에서 `<a>`태그에 속성을 추가하면 `<Link>`태그에도 추가된다.

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Links() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/profile/1">Profile/1</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/about?name=mark">About?name=mark</Link>
      </li>
    </ul>
  );
}

export default Links;
```

<br/>

#### NavLink

- `<NavLink>`를 이용해서 스타일을 사용할 수 있음.
- 기본값으로 `className="active"`가 설정되어 있다. ( defaultprops )
- activeClassName, activeStyle 처럼 active 상태에 대한 스타일 지정이 가능하다.
- Route 의 path 처럼 동작하기 때문에 exact 가 있다.

![NavLink](https://user-images.githubusercontent.com/31315644/72578646-04c25900-391a-11ea-89b3-9b66cc54411c.jpeg)

```jsx
<li>
	<NavLink
		to="/"
		exact
		activeStyle={{
		color: "green"
	}}>Home</NavLink>
</li>
```

<br/>

위 소스대로 설정할 경우, QueryString으로 보내는 주소는 같은 Active 스타일이 적용 된다. (/about , /about?name=mark)

이를 방지하기 위해 아래처럼 작성한다.

- `isActive`할 때 pathname이 맞아야 match객체가 들어온다.
- `location.search`가 비워있는지 안비웠는지 판단한다.

```jsx
<li>
  <NavLink to="/about" isActive={(match, location) => {
      console.log(match, location); // 다른데 누를 때 마다 계속 찍히는데 라우팅이 바뀔때마다 체크한다는 뜻
      if (match === null) {
        return false;
      }
      console.log(location.search);
      return location.search === '' ? true : false;
    }}>
    About
  </NavLink>
</li>
<li>
  <NavLink to="/about?name=mark" isActive={(match, location) => {
    if (match === null) {
      return false;
    }
    return location.search === '?name=mark';
    }}>
      About?name=mark
  </NavLink>
</li>
```

<br/>

### JS로 라우팅 이동하기

`props.history.push("/");`

- `history`는 url을 바꿀때, 읽어올 때 사용.
- `props`에 `history`가 포함되어 있다.

<br/>

### HOC(High Order Component) - withRouter()

시나리오 : 만약, `<Route>` 에 있는 `path` 속성에 적혀진 `component`가 아니라면 

> 훅 때문에 잘 사용하지 않음

```
import { withRouter } from 'react-router-dom';
...
export default withRouter(LoginButton);
```

- Login에서 history를 props로 보내주지 않아도 LoginButton에서 알아서 받아다 씀!
- 그냥 함수인데 input을 컴포넌트로 받고 output을 새로운 컴포넌트로
- 강제된 라이브러리가 아니라 룰이 있음 - 만들 때 룰에 주의하며 만들어야 함 - 다다음 시간에 배울 것
- withRouter라고 이름을 붙여서 넣어준 것
- connect도 HOC - 리덕스 연결에 사용 - 컴포넌트를 받아 컴포넌트를 리턴
- relay 라이브러리에 createFragmentContainer도 HOC

<br/>

### Redirect

- path가 로그인인데, 이미 로그인 되었을 경우 redirect를 렌더하게 끔 할 때 사용.
- 특정 페이지에 접속했을 때 조건에 따라 다른 페이지로 바로 넘어가는 것.

-----------

### Route Hooks

- useHistory
- useLocation
- useParams
- useRouteMatch

<br/>

#### useHistory

- withRouter없이 사용 가능하다.

```jsx
const history = useHistory();
```

![history](https://user-images.githubusercontent.com/31315644/72660933-e80c4b00-3a17-11ea-9be3-9cd0c282b002.jpeg)

<br/>

#### useLocation

```jsx
const location = useLocation();
const { name } = queryString.parse(location.search);
```

![location](https://user-images.githubusercontent.com/31315644/72662845-455fc680-3a2f-11ea-9422-87c14c1c639e.jpeg)
<br/>

#### useParams

```jsx
const { id } = useParams();
```

![params](https://user-images.githubusercontent.com/31315644/72662847-455fc680-3a2f-11ea-9415-480887bfabfd.jpeg)

<br/>

#### useRouteMatch

- 현재 url과 기준이 되는 url을 비교해야만 한다.
  - 방법1) `string`으로 던지기
  - 방법2) `object`로 던지기

```jsx
  const match = useRouteMatch({
    path: '/book/:id',
    strict: true, // 매치 옵션
    sensitive: true // 매치 옵션
  });
```

<br/>

#### BrouserRouter의 내려주기.

```jsx
<BrowserRouter>
...
</BrowserRouter>
```

- `<BrowserRouter>`로 감싸면 위의 hooks들을 전역에 들고 있는 것과 같음 - 가져다 쓸 수 있도록 하는 것.

<br/>

### React developer tools

- Google Chrome 에 설치하는 익스텐션
- F12 개발자도구 - Profiler 에서 렌더링 되는 시간들을 알아볼 수 있다. - 퍼포먼스 최적화에 유용
- F12 개발자도구 - Component 에서 트리를 볼 수 있다.

<br/>