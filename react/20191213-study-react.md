![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 06

- 환경변수 정의하기
  - .evn 파일 생성
  - .gitignore에 .env 추가
  - 번외 : .env 파일을 만들지 않고 npm start 할 때마다 키값 넘겨주기(권장하진 않음)
- Router
- 파라미터를 넘기는 방법 2가지
  - 쿼리 스트링
  - REST API
- Switch
  - 해결방법 1 : exact
  - 해결방법 2 : 중요도가 높은 라우팅을 먼저 선언해준다.
- 실습 라우팅해보기
  - 쿼리 스트링 사용하기
  - REST API 사용하기
  - REST API 와 쿼리스트링 둘 다 사용하기
- URL(주소가) 바뀐 것처럼 보여주기. 
  - 리액트 DOM을 렌더링 해주기 위해서 `react-router-dom`을 설치한다.
  - react-router-dom을 import 한다.
  - URL history 추가하기
- Call Stack 초과를 막는 법 -> 모든 것을 비동기 코드로 돌린다.
  - setTimeout을 이용한다.

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 환경변수 정의하는 법
- 쿼리스트링
- REST API
- history 작성
- Call Stack 초과시 해결 요령

<br/>

--------

### 환경변수 정의 하기

- 환경 변수는 process.env 라는 예약어를 통해서 만든다.

- Node.js에서는 process.env까지 예약어고, React에서는 process.env.REACT_APP_ 까지 예약어이다. 

  그 후부터는 임의로 네이밍할 수 있는 변수.

-  변수는 최대한 자세하게 그리고 전부 대문자로 작성한다.

```jsx
const params = {
  key: process.env.REACT_APP_YOUTUBE_API_KEY
  ...
}
```

**process.env는 리액트가 실행될때 가지고 오기 때문에 .env 설정이 끝나면 재 실행해야한다.**

<br/>

#### .evn 파일 생성

.gitignore 와 같은 위치 .env 파일을 생성한다.

그리고 다음과 같이 작성한다.

```jsx
REACT_APP_YOUTUBE_API_KEY=키 값 작성
```

**값을 작성할 때 규칙**

- `''`의 형태로 문자열로 작성하면 안된다. 
- `;`을 적으면 안된다.
- 다음 환경 변수를 작성하고 싶다면 엔터를 쳐서 다음 라인으로 넘어간다.
- 주석은 `//`로 시작한다. (예 : // 주석입니다. )

<br/>

#### .gitignore에 .env 추가

```javascript
# misc
.env // 여기 추가
.DS_Store
.env.local // 개발자가 보는 환경
.env.development.local  // 개발자가 보는 환경
.env.test.local // 아래는 테스팅 환경
.env.production.local // 실제 배포 환경
```

<br/>

#### 번외 : .env 파일을 만들지 않고 npm start 할 때마다 키값 넘겨주기(권장하진 않음)

맥 , 리눅스 (유닉스 기반 OS)

````
REACT_APP_KEY= 키내용 npm start
````

윈도우

```
($env:REACT_APP_key = "키내용") -and (npm start)
```

<br/>

### Router

라우터는 다음과 같은 이유로 사용한다.

- URL이 바뀌지 않아 특정 페이지를 공유할 수 없다.
- 새로고침하면 상태를 유지하지 못해 처음 화면으로 돌아간다.
- 각각의 페이지에 고유한 데이터를 넣을 수 있다.

<br/>

URL 주소를 컴포넌트 단위로 분리시키고 주소에 해당되는 컴포넌트를 뿌려준다.

```bash
npm i react-router-dom --save        
```

<br/>

App.js

```jsx
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
```

<br/>

```jsx
const App = () => {
  return (
    <Router>
      <Switch>
        {/* 쿼리스트링 */}
        <Route path='/watch'></Route>  
        {/* REST API 전달 */}
        <Route path='/watch/:id' component={VideoPlayer} />
      </Switch> 
    </Router>
  )
}
```

`<Router>` : `Route` 를 하기위한 모든 컴포넌트들을 모아놓은 집합 태그.

`<Switch></Switch>` 자바스크립트의 조건 switch와 같다. (path가 조건이다. 조건에 해당되면 자동으로 break)

`<Route path='/watch'></Route>` :  실질적으로 Component를 지정해주는 태그. path가 비교조건

<br/>

### 파라미터를 넘기는 방법 2가지

#### 쿼리 스트링

Query String 이란 ? 

예시 : `https://www.youtube.com/watch?v=hHW1oY26kxQ`

`https://www.youtube.com/watch`는 유튜브측에서 정의한 주소. 즉, 고정된 것.

`?뒤 부터는 변수명=변수값`이다. 이어줄때는 &를 사용한다.

?뒤부터 나오는 값들을 queryString이라 한다.

변수 `&`를 통해서 데이터를 연달아 보내는 것이 가능하다.

사용자에게 쿼리를 설정하는 것이기 떄문에 라우팅 설정을 줄일 수 있다.

```javascript
// 쿼리 스트링 전달
https://www.youtube.com/watch?v=hHW1oY26kxQ
// 여러개 전달
https://www.youtube.com/watch?v=hHW1oY26kxQ&custume=data&key=keykey
```

<br/>

#### REST API

오직 1개의 데이터를 보낼 수 있다. 여러개를 연달아 보낼 수 없다. 

REST API의 경우 엄격하게 규칙을 지정하고 있다.

하나하나 라우팅 설정을 모두 해야한다.

```javascript
// 일반적인 REST API 규격 정의
https://www.youtube.com/watch/hHW1oY26kxQ
```

<br/>

### Switch

Switch에서 라우팅의 path가 일치한다면 바로 실행하고 끝낸다.

`path`가 `https://www.youtube.com/watch?id=hHW1oY26kxQ` 라고 가정하자.

그리고 Switch가 이렇게 정의가 되어있다.

```jsx
<Router>
  <Switch>
    <Route path='/watch' component={VideoPlayer} />
    <Route path='/watch/:id' component={VideoPlayer} />
  </Switch>
</Router>
```

문제는 이렇게 될 경우 전체 path를 비교하는 데 부분으로 일치한다면 바로 실행하고 끝내버린다.

즉, 1번째 ` <Route path='/watch' component={VideoPlayer} />` 의 `path='/watch'` 는 일치한다. 뒷부분은 무시하고 이 부분이 일치를 하기 때문에 바로 실행해버린다.

따라서 2번째 ` <Route path='/watch/:id' component={VideoPlayer} />`는 절대로 실행할 수 없게된다.

<br/>

#### 해결방법 1 : exact

`path` 앞에 exact를 명시 해준다면 전체 다 비교를 한다.

단, exact는 100%일치해야되기 때문에 값이 변하는 변수를 사용할 수 없다. 

id값이 게속 고정된다면 문제가 없지만 id값이 변한다면 `<Route path='/watch/:id' component={VideoPlayer} />`는 사용할 수 없다.

```jsx
<Switch>
  <Route exact path='/watch' component={VideoPlayer} />
	<Route path='/watch/:id' component={VideoPlayer} />
</Switch>
```

<br/>

#### 해결방법 2 : 중요도가 높은 라우팅을 먼저 선언해준다.

```jsx
<Switch>
	<Route path='/watch/:id' component={VideoPlayer} />
  <Route path='/watch' component={VideoPlayer} />
</Switch>
```

<br/>

### 실습 라우팅해보기

전제 : 특정 버튼이나 링크를 클릭해서 URL 주소가 바뀌었다고 가정하자. (실제로는 바뀌지 않고 변경된 것처럼 보이는 것.)

라우트 지정해주고, `<Route>` 에 component에 적어주기.

App.js

```jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import VideoPlayer from './VideoPlayer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/watch/:id' component={VideoPlayer} />
        <Route path='/watch' component={VideoPlayer} />
      </Switch>
    </Router>
  )
}
```

<br/>

#### 쿼리 스트링 사용하기

1. npm 설치

```bash
npm i query-string --save 
```

<br/>

2. 사용하고자 하는 `.jsx` 컴포넌트 파일에 접근한다.

  VideoPlayer.jsx

쿼리스트링을 import 한다.

```javascript
import qs from 'query-string'
```

<br/>

3. 쿼리 스트링 사용하기

```javascript
qs.parse(props.location.search)
```

`props.location.search`는 URL의 QueryString(? 뒤 내용) 들을 객체로 변환해준다.

예를들어, `https://www.youtube.com/watch?id=hHW1oY26kxQ?custom=aaaa` 라는 URL이라 가정하면

`qs.parse(props.location.search)`로 객체화 되면

```javascript
{
  id : hHW1oY26kxQ,
  custom : aaaa
}
```

이렇게 된다.

이것을 상수로 받아준다.

```jsx
const VideoDetail = props => {
  // Query String
  const {v} = qs.parse(props.location.search)

  return (
    <div className="video-detail">
    </div>
  );
};
export default VideoDetail;
```

<br/>

#### REST API 사용하기

사용하고자 하는 `.jsx` 컴포넌트 파일에 접근한다.

  VideoPlayer.jsx

```jsx
const VideoDetail = props => {
  // REST API
  const { id } = props.match.params.id;
  // const id = props.match.params.id;

  return (
    <div className="video-detail">
    </div>
  );
};
export default VideoDetail;
```

<br/>

```jsx
const id = props.match.params.id;
```

`props.match.params` 뒤부터 적은 프로퍼티는 라우트에서 적은 값들을 적어준다.

 ` path='/watch/:id'`== `props.match.params.id`

<br/>

#### REST API 와 쿼리스트링 둘 다 사용하기

  VideoPlayer.jsx

````jsx
import React from "react";
import "./VideoPlayer.css";
import qs from 'query-string'

const VideoDetail = props => {
  // REST API
  const { id } = props.match.params.id;
  // const id = props.match.params.id;

  // Query String
  const {v} = qs.parse(props.location.search)

  const _id = id || v;
  if (!_id) return null;
  
  const url = `https://youtube.com/embed/${_id}`;
  return (
    <div className="video-detail">
      <iframe src={url} title={videoId} className="video-player" />
    </div>
  );
};
export default VideoDetail;
````

REST로 받은 `id` 와 쿼리스트링으로 받은 `v` 모두 사용해서 넘겨준다.

```javascript
const url = `https://youtube.com/embed/${id || v}`;
```

<br/>

### URL(주소가) 바뀐 것처럼 보여주기. 

URL이 바뀌는 것처럼 보여지나 브라우저 히스토리만 추가를 해서 실제로 바뀌지는 않는다. 

또한 히스토리를 추가해주면 브라우저의 `뒤로가기` 버튼도 사용이 가능해진다.

#### 1. 리액트 DOM을 렌더링 해주기 위해서 `react-router-dom`을 설치한다.

```bash
npm i react-router-dom --save
```

<br/>

#### 2. react-router-dom을 import 한다.

Main.js

```javascript
import { withRouter }from "react-router-dom";
/*
	소스 - 기존의 App.js 소스들 카피/페이스트
*/
export default withRouter(App);
```

<br/>

#### 3. URL history 추가하기

**SPA에서는 새로고침/페이지 이동은 금지시 한다.** 따라서 `history`키워드를 통해서 URL에 쿼리나 REST API 값 전달이 가능하다.

이제는 `this.setState`가 아니라 `this.props.history.push` 키워드를 통해 url을 변경한다.

```jsx
this.props.history.push(`/watch?v=${selectedVideo}`)
```

- SPA는 위와같이 url을 변경하여도 새로고침이 발생하지 않는다. 
  - 여기서 single page는 주소가 single이 아니라 페이지가 single - 페이지 이동이 없는 것.
  - 리액트 라우터의 히스토리 푸시는 주소창에 주소만 바꿔줄뿐 페이지의 이동은 없기 때문에 console.log도 그대로 남고 모든 상태가 그대로 남음.

- `<a href="http://">` 하이퍼링크는 클릭하면 새 탭을 여는 역할 - 완전한 초기상태로 새로운 브라우저 탭을 만드는 것과 같다.

```javascript
// 진짜 주소 이동
window.location.href

// 주소를 추가 - 페이지변경X
this.props.history.push
```

<br/>

### Call Stack 초과를 막는 법 -> 모든 것을 비동기 코드로 돌린다.

#### setTimeout을 이용한다.

콜스택 초과 오류날 때 setTimeout을 이용하면 대부분 해결된다.

````javascript
setTimeout(() => this.props.history.push(`/results?search_query=${query}`), 0)
````

<br/>