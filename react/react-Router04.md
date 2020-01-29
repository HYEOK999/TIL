![React-Router03](https://user-images.githubusercontent.com/31315644/71559789-b43ba680-2aa5-11ea-84cd-ff661a35e283.png)

----------------

## React Router with Velopert - 03 -

- 서브 라우트 만들어보기
- [src/Profiles.jsx](#a1)
- [src/App.js](#a2)
- [src/Profile.jsx](#a3)

<br/>

------

# Chap 3. 서브라우트

> 라우트 내부에 라우트를 만드는 것.
>
> 컴포넌트를 만들고 Route 컴포넌트를 렌더링하면 된다.

<br/>

### 서브 라우트 만들어보기

#### src/Profiles.jsx <a id="a1"></a>

```jsx
import React from 'react';
import { Link, Route } from 'reqct-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/hyeok999">hyeok999</Link>
        </li>
        <li>
          <Link to="/profiles/homer">homer</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해주세요.</div>}
      /> // render
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};
```

Route 컴포넌트에서는 `component` 대신에 `render`가 사용되었다.

`render`에서는 컴포넌트가 아니라, JSX 자체를 렌더링 해줄수 있으며, 상위 영역에서 props 나 기타 값들을 필요하면 전달해줄 수 있다.

<br/>

`App.js`에 `Profiles` 컴포넌트를 위한 링크와 라우트를 생성해준다.

#### src/App.js <a id="a2"></a>

```jsx
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from './Profiles';

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
      </ul>
      <hr />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles" component={Profiles} />
    </div>
  );
};

export default App;
```

`App.js` 에 `<Route>`태그 안에 `Profiles` 컴포넌트가 있고 해당 컴포넌트에는 `Profile` 컴포넌트를 이어주는 `<Route>`태그 가 있다.

따라서, `Profiles`가 서브 라우터가 되는 것이다.

<br/>

#### src/Profile.jsx <a id="a3"></a>

```jsx
import React from 'react'

const profileData = {
   hyeok999: {
    name : '김준혁',
    description: 'Frontend Student'
  },
  homer: {
    name : '호머 심슨',
    description: '심슨 가족 가장'
  }
}

// props.match
const Profile = ({match}) => {
  console.log(match.params);
  const { username } = match.params;
  const profile = profileData[username];

  if(!profile) {
    return <div>존재하지 않은 사용자입니다.</div>
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;
```

