![React-Router02](https://user-images.githubusercontent.com/31315644/71559788-b43ba680-2aa5-11ea-880f-cf46861a5f75.png)

----------------

## React Router with Velopert - 02 -

- 파라미터와 쿼리
- URL Parameter
  - Parameter 받아오기
- Query
  - QueryString 받아오기

<br/>

------

# Chap 2. 파라미터와 쿼리

<br/>

### 파라미터와 쿼리

**Parameter : `/profiles/:username`**

**파라미터는 `match 객체의 params` 를 사용한다.**

```javascript
const { username } = match.params;
```

**`match` 는 라우트 컴포넌트에서 물려받는다.**

<br/>

**Query : `/about?detail=true`**

**쿼리는 `location 객체의 search` 를 사용한다.**

`location.search` 는 그냥 사용하지는 못하고 문자열을 객체로 변환시켜야 하는데

그것은 qs라는 npm모듈을 이용한다.

```bash
npm i query-string --save
```

다음과 같이 사용할 수 있다.

```
  const query = qs.parse(location && location.search);
  const detail = query.detail === 'true'; // 쿼리의 파싱결과값은 문자열입니다.
```

**`location` 는 라우트 컴포넌트에서 물려받는다.**

<br/>

### URL Parameter

ID, 유저 네임등의 특정 데이터 조회하기 위해 사용한다.

```bash
/profiles/kim
```

`kim` 프로파일을 달라.

<br/>

#### Parameter 받아오기

Profile 이라는 컴포넌트를 만들어서 파라미터를 받아오는 예제 코드.

src/Profile.js

```jsx
import React from 'react';

// 프로필에서 사용 할 데이터
const profileData = {
  hyeok999: {
    name: '혁999',
    description:
      'Frontend Student'
  },
  homer: {
    name: '호머 심슨',
    description: '호머 심슨'
  }
};

const Profile = ({ match }) => {
  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조합니다.
  const { username } = match.params;
  const profile = profileData[username];
  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

**파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조한다.**

 match 객체안에는 현재의 주소가 `Route` 컴포넌트에서 정한 규칙과 어떻게 일치하는지에 대한 정보가 들어있다.

path 규칙에는 `/profiles/:username` 으로 적용시키면 Profile 컴포넌트에서 match props를 통해 전달받을 수 있다.

<br/>

src/App.js

```jsx
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

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
      </ul>
      <hr />
      
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default App;
```

이제 `/profiles/hyeok999` 경로로 들어가보자.

</br>

### Query

다양한 옵션을 주어서 검색할 때 많이 사용한다.

```javascript
/filter?type=book&sort_by=date
```

`book` 이라는 타입을 가진 데이터를 date로 정렬해서 보여달라.

<br/>

쿼리는 라우트 컴포넌트에게 props 전달되는 location 객체에 있는 search 값에서 읽어올 수 있다. 

location 객체는 현재 앱이 갖고있는 주소에 대한 정보를 지니고있다.

```javascript
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

<br/>

여기서 중요한 것은 search 값이다. 문제는 search가 `?` 로 시작되는 문자열이라 객체 형태로 변환을 따로 해주어야한다.

따라서 NPM 모듈을 설치하여 작업해주도록 한다.

```bash
npm i query-string --save
```

위는 qs라는 라이브러리로 location.search의 문자열을 손쉽게 객체형태로 변환해준다.

<br/>

#### QueryString 받아오기

About이라는 컴포넌트를 만들고 `search` 값에 있는 detail 값을 받아와서, 해당 값이 true 일때 추가정보를 보여주도록 구현해 본다.

```jsx
import React from 'react';
import qs from 'query-string';

function About ({ location }) {
  const query = qs.parse(location && location.search);

  const detail = query.detail === 'true'; // 쿼리의 파싱결과값은 문자열입니다.

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트다.</p>
      {detail && <p>detail 값이 true 입니다.!</p>}
    </div>
  );
}

export default About
```

`/about?detail=true` 경로로 들어가보자.

<br/>

