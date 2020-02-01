![React-Router05](https://user-images.githubusercontent.com/31315644/71559791-b4d43d00-2aa5-11ea-9b89-d5a3f93c015f.png)

----------------

## React Router with Velopert - 05 -

- useReactRouter Hook
  - RouterHookSample.js
  - Profiles.js

<br/>

------

# Chap 4. useReactRouter Hook

<br/>

### useReactRouter Hook 

`withRouter`로 라우트를 사용하지 않은 컴포넌트에서도 `match, location, history`등을 조회할 수 있었다.

`withRouter`대신 Hook을 이용해 구현할 수도 있다. 

아직 공식적인 Hook지원은 아니다. 그래서 아직까지는 다른 라이브러리를 통해 사용해야한다.

사용 할 라이브러리의 이름은 [use-react-router](https://github.com/CharlesStover/use-react-router) 이다.

```bash
npm install use-react-router --save
```

<br/>

#### RouterHookSample.js

```javascript
import useReactRouter from 'use-react-router';

function RouterHookSample() {
  const { history, location, match } = useReactRouter();
  console.log({ history, location, match });
  return null;
}

export default RouterHookSample;
```

이제 이 컴포넌트를 Profiles 컴포넌트에서 WithRouterSample 하단에 렌더링해보자.

<br/>

#### Profiles.js

```jsx
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';
import RouterHookSample from './RouterHookSample';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/hyeok999"
            activeStyle={{ background: 'black', color: 'white' }}
          >
            hyeok999
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/homer"
            activeStyle={{ background: 'black', color: 'white' }}
          >
            homer
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
      <RouterHookSample />
    </div>
  );
};

export default Profiles;
```

![USEREACTROUTER](https://user-images.githubusercontent.com/31315644/70968874-c567d900-20dd-11ea-85b6-e3f0607d79bb.jpeg)

콘솔을 확인해보면. 위와 같이 프로필 목록 페이지를 열었을 때 `location`, `match`, `history` 객체들을 조회 할 수 있다.

이 Hook 이 정식 릴리즈는 아니기 때문에 만약에 `withRouter` 가 너무 불편하다고 느낄 경우에만 사용하시는 것을 권장한다.

사용 한다고 해서 나쁠 것은 없지만, 나중에 정식 릴리즈가 나오게 되면 해당 라이브러리를 제거하고 코드를 수정해야 하는 일이 발생 할 수도 있다. 적어도, `withRouter` 를 사용하셨다면, 레거시 코드로 유지해도 큰 문제는 없다. 물론 추후 `useReactRouter` 를 사용하는 코드도 방치해도 될 지도 모르지만, 불필요한 라이브러리의 코드가 프로젝트에 포함된다는점, 그리고 정식 릴리즈가 되는 순간부터 `useReactRouter` 의 유지보수가 더 이상 이루어지지 않을 것 이라는 점을 생각하면, 중요한 프로젝트라면 사용을 하지 않는 편이 좋을 수도 있다.

<br/>