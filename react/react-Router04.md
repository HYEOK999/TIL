![React-Router04](https://user-images.githubusercontent.com/31315644/71559790-b43ba680-2aa5-11ea-97e2-606184036149.png)

----------------

## React Router with Velopert - 04 -

- [history 객체](#a1)
  - src/HistorySample.js 
  - src/App.js
- [withRouter HoC](#a2)
  - src/WithRouterSample.js
  - src/Profiles.jsx
- [Switch](#a3)
  - src/App.js
- [NavLink](#a4)
  - src/Profiles.js
- 기타

<br/>

------

# Chap 4. 리액트 라우터 부가기능

<br/>

### history 객체 <a id="a1"></a>

> history 객체는 라우트로 사용된 컴포넌트에게 match, location 과 함께 전달되는 props 중 하나.

이 객체는, URL에 쿼리나 파라미터를 넘겨줌으로써(push) , 뒤로가기, 특정 경로로 이동, 이탈 방지 등 을 수행할 수 있다.

즉, 이 객체를 통해 컴포넌트 내에 구현하는 메소드에서 라우터에 직접 접근할 수 있다.

#### src/HistorySample.js

`useEffect` 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 이다. 

클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방함.

```jsx
import React, { useEffect } from 'react';

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    console.log(history);
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
}

export default HistorySample;
```

위 컴포넌트 예제를 App.js에 넣고 실행해보면 이탈방지 팝업창을 띄우게 된다.

<br/>

#### src/App.js

```jsx
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link> //여기
        </li>
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
    </div>
  );
};
```

<br/>

### withRouter HoC <a id="a2"></a>

> withRouter HoC는 라우터 컴포넌트가 아닌 곳에서 match / location / history를 사용해야할 떄 사용된다.

#### src/WithRouterSample.js

```jsx
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

위와 같이 작성이 완료되면, 타 컴포넌트에서 `<Route>`태그를 이용하지 않더라도 match 와 location을 전달할 수 있다.

<br/>

#### src/Profiles.jsx

```jsx
import React from 'react'
import Profile from './Profile'
import { Link, Route } from 'react-router-dom'
import WithRouterSample from './WithRouterSample';


const Profiles = (props) => {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li><Link to='/profiles/hyeok999'>혁999</Link></li>
        <li><Link to='/profiles/homer'>homer</Link></li>
      </ul>

    <Route path='/profiles' exact render={() => <div>사용자를 선택해주세요.</div>}></Route>
    <Route path='/profiles/:username' component={Profile} />
    <WithRouterSample></WithRouterSample>
    </div>
  );
}

export default Profiles;
```

단, `match`는 문제가 한가지 있다.

우선 App.js에서 `Profiles` 컴포넌트를 라우팅할 때 다음과 같은 path로 불러낸다.

`        <Route path='/profiles' component={Profiles} />`

`match`는 라우터를 해주는 컴포넌트에서 path에 있는 파라미터를 보여주는데 App.js → Profiles.jsx 를 라우팅할때 파라미터가 설정되어있지 않으니 match의 결과는 빈배열이 나타나게 된다. 

쉽게 이해하면 withRouter에서 match는 부모 라우터의 파라미터값을 의미한다는 것이다.

따라서 이 상황에서는 `Profiles.jsx`에서 `<WithRouterSample>`태그를 사용하는 것보다는 

`Profiles.jsx`에 `<Route path='/profiles/:username' component={Profile} />`가 정의가 되어있기 때문에, `Profile.jsx` 컴포넌트에 정의하면 match값을 확인할 수 있다.

<br/>

### Switch <a id="a3"></a>

> Switch는 여러 Route들을 감싸는 규칙중 하나이다.
>
>  Switch 를 사용하면, 아무것도 일치하지 않았을때 보여줄 Not Found 페이지를 구현 할 수도 있다.

#### src/App.js

```jsx
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
        <li>
          <Link to="/history">예제</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route
          // path 를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다:</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
```

<br/>

### NavLink <a id="a4"></a>

NavLink 는 Link 랑 비슷한데, 만약 현재 경로와 Link 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용 할 수 있는 컴포넌트이다. 

쉽게 말해서 Link에 스타일 혹은 클래스를 줄 수 있는 것.

만약에 인라인 스타일이 아니라 CSS 클래스를 적용하시고 싶으면 `activeStyle` 대신 `activeClassName` 을 사용하면 된다.

`Profiles.jsx` 애서 사용하는 컴포넌트에서 Link 대신 NavLink 를 사용해보자.

#### src/Profiles.js

```jsx
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/velopert"
            // 인라인 스타일 적용
            activeStyle={{ background: 'black', color: 'white' }}
          >
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/gildong"
            // 인라인 스타일 적용
            activeStyle={{ background: 'black', color: 'white' }}
          >
            gildong
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      <WithRouterSample />
    </div>
  );
};

export default Profiles;
```

<br/>

### 기타

이 외에도 다른 기능들

- **[Redirect](https://reacttraining.com/react-router/web/example/auth-workflow)**: 페이지를 리디렉트 하는 컴포넌트
- **[Prompt](https://reacttraining.com/react-router/web/example/preventing-transitions)**: 이전에 사용했던 history.block 의 컴포넌트 버전
- **[Route Config](https://reacttraining.com/react-router/web/example/route-config)**: JSX 형태로 라우트를 선언하는 것이 아닌 Angular 나 Vue 처럼 배열/객체를 사용하여 라우트 정의하기
- **[Memory Router](https://reacttraining.com/react-router/web/api/MemoryRouter)** 실제로 주소는 존재하지는 않는 라우터. 리액트 네이티브나, 임베디드 웹앱에서 사용하면 유용하다.

그 외의 것들은 [공식 매뉴얼](https://reacttraining.com/react-router/web/guides/philosophy) 을 참고.