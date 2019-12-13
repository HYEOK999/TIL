

![icon-1435485_1280](https://user-images.githubusercontent.com/31315644/70803414-59445700-1df7-11ea-99fd-d9fb4c637e36.png)



--------------

# Youtube Mini Clone React

**목차**

1. Youtube Mini Clone 생성하기
2. 기본 틀 짜기
3. 유튜브 데이터 받아올 준비하기
4. 유튜브 데이터 받아오기
5. Header 작성  ( 큰 틀 = 로고부분)
6. Header 작성  ( 검색바 )
7. 입력 값 기본 정해두기
8. 데이터 초기화 값 셋팅
9. Main 작성 ( VideoList + VideoPlayer )
10. 무한 스크롤

----------

## 1. Youtube Mini Clone 생성하기

### 1-1. 프로젝트를 시작할 폴더에 들어가서 리액트 프로젝트를 생성한다.

```bash
npx create-react-app youtube-practice
```

<br/>

### 1-2. VSCode로 해당 프로젝트 폴더를 따로 오픈한다.

```bash
cd youtube-practice
```

<br/>

### 1-3. 생성 당시 폴더 구조

![folder-structure](https://user-images.githubusercontent.com/31315644/70688521-55c8a700-1cf5-11ea-8408-7ba700399fc3.jpeg)

<br/>

## 2. 기본 틀 짜기

처음 프로젝트 생성시 적혀진 내용들을 수정하고서 프로젝트를 시작하도록 한다.

### 2-1. src/App.css

내용 모두 지우고 아래 코드를 삽입한다.

```css
.main-content {
  width: 1600px;
  margin: 25px auto;
}
```

<br/>

### 2-2. src/App.js

내용 모두 지우고 아래 코드를 삽입한다.

```jsx
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    	<div className = 'App'>
    	</div>
    )
  }
}

export default App;
```

<br/>

### 2-3. src/index.css

CSS를 초기화를 미리 해두도록 한다. (reset.css 적용)

나중에 시멘틱을 위해서 `a11y-hidden`도 정의한다.

~~~css
* {
  box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/*숨긴 콘텐츠*/
.a11y-hidden, legend{
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden; /* 넘치는 부분을 감쳐준다 */
  clip: rect(0,0,0,0); /* 선행조건 : position:absolute 해당 화면을 잘라내서 보여줌 */
  white-space: nowrap; /* 줄바꿈을 하지않음. */
  opacity: 0; /* 투명도  */
}

~~~

<br/>

## 3. 유튜브 데이터 받아올 준비하기

유튜브 API로부터 데이터를 받아올 준비를 한다.

### 3-1. 전역 URL 변수 생성 <a id="a1"></a>

유튜브의 기본 URL은 다음과 같다.

`https://www.googleapis.com/youtube/v3/search`

`import` 코드 아래 작성해준다. 

```javascript
const URL = 'https://www.googleapis.com/youtube/v3/search';
```

<br/>

### 3-2. state 변경 값 설정

변경 될 수 있는 값들을 `this.state`에 미리 설정해준다.

```css
this.state = {
  videoDatas : [],
  nextPageToken : '',
  query : ''
}
```

`videoDatas` : 유튜브 API를 통해 받아올 데이터를 담을 배열.

`nextPageToken` : 유튜브 API에서 보여지는 데이터는 5개씩으로 처리가 되어있다.

`query` : 입력한 값이 같은 지 다른 지에 따라 불러와야할 데이터가 다르므로 설정해둔다.

<br/>

## 4. 유튜브 데이터 받아오기

본격적으로 유튜브 API를 만들도록 한다.

<br/>

### 4-1. axios 설치 및 적용

먼저 데이터를 받아오기 위해 axios와 async / await를 이용한다.

패키지를 다운 받을 필요가 없는 fetch를 쓰지 않은 이유는 fetch는 다음과 같은 문제를 내포하기 때문이다.

- 크로스 브라우징 이슈
- 쿠키를 포함하려면 특정 npm을 랩핑해줘야 한다.
- status가 response 체크를 받아야만 한다.

따라서 axios를 먼저 `npm install` 한다.

```bash
npm i axios --save
```

<br/>

패키지 다운이 완료되었다면 `import` 를 해준다.

```javascript
import axios from 'axios';
```

<br/>

### 4-2. 유튜브 데이터 불러오는 메소드 정의하기

로드 메소드는 class 내부 `constructor` 와 `render` 사이에 작성한다.

입력 받은 `query`로 데이터를 불러온다. 해당 메소드는 `async/await`를 사용한다.

1. 먼저, 입력 값이 없을 경우 해당 메소드에 접근하지 못하도록 설정해야만 한다. 

~~~javascript
 async getYoutube(query) {
    if (!query) return;
  }
~~~

<br/>

2. axios는 첫번쨰 인자로 `URL`, 두번째 인자로 `params` 객체를 받는다. URL은 [3-1. 전역 URL 변수 생성](#a1)에서 만든 것을 활용한다.

   params는 `key`, `q`, `pageToken`, `part`를 정의해준다. 각각 API 키, 쿼리, 페이지 토큰 , 데이터 부분을 의미한다.

```javascript
const params = {
  key : '유튜브 API키는 별도로 구하셔야 합니다.',
  q : query,
  pageToken : this.state.nextPageToken,
  part : 'snippet'
}

try {
  const { data } = await axios.get( URL, { params } );
  this.setState({
    videoDatas : [...this.state.videoDatas, ...data.items],
    query : query,
    nextPageToken : data.nextPageToken
  },() => console.log(data))
} catch (error) {
  console.error('에러',error);
}
```

1. `axios.get`을 통해 받아온 데이터는 data 객체 안에 담겨져 있다. ( 그래서 디스트럭처링 해준다. )
2. setState를 할 때, videoDatas 에 주는 데이터들을  ` [...this.state.videoDatas, ...data.items]` 로 적은 이유는 어떠한 이유로 다음 페이지의 데이터들을 불러올 떄, 데이터를 추가로 더 해주기 위함이다. 위와 같이 코드를 작성하게 된다면 새로운 입력값이든, 추가로 입력한 값이든 모두 수용할 수 있다.
3. qeury는 입력한 데이터를 그대로 받는다.
4. nextPageToken 또한 get으로 받은 데이터에서 찾아서 값을 할당한다.

<br/>

## 5. Header 작성  ( 큰 틀 = 로고부분)

유튜브 API를 활용해 유튜브 데이터를 들고오는 Search Bar를 작성한다.

**최상위 컴포넌트 내의 하위 컴포넌트들은 함수형 컴포넌트로 작성한다.**

<br/>

#### 5-1. Nav 컴포넌트 생성

src에 Nav 폴더 생성 한 후 각각 images 폴더, Nav.css, Nav.jsx 파일을 생성한다. 

![nav-folder-structure](https://user-images.githubusercontent.com/31315644/70711189-3f860f80-1d24-11ea-9371-a95ec1068967.jpeg)

images 폴더에 유튜뷰 로고 이미지를 넣는다. ( 이미지는 인터넷에서 별도로 구한다. )

Nav.jsx에 아래 코드를 작성한다. ( src/Nav/Nav.jsx )

```jsx
import React from 'react';
import './Nav.css';
import YoutubeLogo from './images/YouTube.png'

const Nav = (props) => {
  return (
    <header class='Nav'>
      <h1 className='a11y-hidden'> 유튜브 </h1>
      <a href='#'>
        <img className='header-logo' src={YoutubeLogo} alt="유튜브"/>
      </a>
      {props.children}
    </header>
  );
}

export default Nav;
```

`props.children`은 추후 해당 컴포넌트에 `<SearchBar onSearchVideo={this.getYoutube}></SearchBar>`을 불러들이기 위함이다.

<br/>

#### 5-2. Nav 컴포넌트 CSS 적용

```css
.Nav {
  background-color: rgb(48, 48, 48);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Nav::before {
  content: '';
  min-width: 286px;
}

.Nav::after {
  content: '';
  min-width: 284px;
}

.Nav a{
  position: absolute;
  height: auto;
  height: 50%;
  left : 30px;
  top : 50%;
  transform: translateY(-50%);
}

.header-logo{
  height: 100%;
}
```

<br/>

#### 5-3. src/App.js에서 Nav컴포넌트를 로드 한 후 커스텀 태그를 작성한다.

App.js 최상단에 import 한다.

```javascript
import Nav from './components/Nav/Nav';
```

<br/>

class 최하단에 있는 render 메소드에 다음과 같이 작성한다.

```jsx
render() {
	return (
		<div className = 'App'>
      <Nav>
        <SearchBar onSearchVideo={this.getYoutube}></SearchBar>
      </Nav>
    </div>
  )
}
```

추후에 만들 검색바를 통해서 입력을 받고 실시간으로 데이터를 불러와야 하므로 

`<SearchBar onSearchVideo={this.getYoutube}></SearchBar>`도 함께 작성한다.

<br/>

#### 5-3. getYoutube 바인드

`getYoutube` 함수가 this를 제대로 적용시키기 위해서 bind작업을 한다.

코드는 class 내부 constructor 안 제일 아래에 작성한다.

```javascript
  constructor(props) {
    super(props);
    this.state = {
      videoDatas : [],
      query : '',
      nextPageToken : ''
    }

    this.getYoutube = this.getYoutube.bind(this);
  }
```

<br/>

## 6. Header 작성  ( 검색바 )

#### 6-1. SearchBar 컴포넌트 생성

src에 SearchBar 폴더 생성 한 후 각각 images 폴더, SearchBar.css, SearchBar.jsx 파일을 생성한다. 

![search-folder-structure](https://user-images.githubusercontent.com/31315644/70711754-917b6500-1d25-11ea-8454-1b4802235625.jpeg)

images 폴더에 돋보기 모양 이미지를 넣는다. ( 이미지는 인터넷에서 별도로 구한다. )

SearchBar.jsx에 아래 코드를 작성한다. ( src/SearchBar/SearchBar.jsx )

```jsx
import React from 'react';
import './SearchBar.css';
import loupe from './images/loupe.png'

const keyHandler = (search) => (e) => {
  if(e.key === 'Enter') {
    search(e.target.value);
  }
}

const SearchBar = (props) => {
  let input = '';
  return (
    <div
    className='search-wrapper'>
      <input
        ref = {(ref) => input = ref} // 2-1번
        className='search-bar'
        type='search'
        placeholder="검색어를 입력하세요"
        autoFocus
        onKeyPress = {keyHandler(props.onSearchVideo)} // 1번
      />
      <button className='btn-search' onClick={() => props.onSearchVideo(input)} /*2-2번*/> 
        <img className='search-icon' src={loupe} alt="검색" />
      </button>
    </div>
  );
}

export default SearchBar;
```

1번 : `<input />`의 `onKeyPress`는 어떤 키과 눌렸는지에 대해서 반응하도록 하는 이벤트 핸들러이다. 따라서 해당 이벤트를 처리하기 위해서 HOC(High Order Component)를 이용해서 콜백으로 뿌려준다.

2-1번 : 엔터 입력 말고도 버튼으로 클릭해서 입력도 구현을 해야만한다. 문제는 인풋 내부의 `e.target.value`를 통해 실시간 입력값을 들고올수 없단는 것이다. 따라서 해당 코드(ref , 리액트에서만 사용)를 이용하여 입력값을 전달받은 후 미리 정의해놓은 변수에 할당한다.

2-2번 : 할당받은 값을 토대로 이벤트를 호출한다.

<br/>

#### 6-2. SearchBar 컴포넌트 CSS 적용

```css
.search-wrapper {
  padding: 32px 0;
  white-space: nowrap;
}

.search-bar{
  width: 450px;
  height: 36px;
  padding: 0 auto;
  border: 1px solid #828282;
  vertical-align: middle;
  display: inline-block;
  border-radius: 3px 0px 0px 3px;
  line-height: 1.5;
  font-size: 15px;
  outline: none;
  padding-left: 15px;
  text-decoration: none;
}

.btn-search{
  height: 36px;
  border-radius: 0px 3px 3px 0px;
  border: 1px solid #828282;
  background: #fff;
  margin-left: -2px;
  font-size: 0;
  vertical-align: middle;
  display: inline-block;
}

.search-icon{
  width: 20px;
  height: 20px;
}
```

<br/>

### 7. 입력 값 기본 정해두기

처음에 입력이 안되었어도 미리 특정 검색어로 초기화를 해두도록 하자.

class 내부 `render`위 `componentWillMount()`메소드를 정의하고 작성한다.

해당 함수는 순서를 보장 하기 위해서 `async / await`를 이용한다.

```jsx
async componentWillMount() {
  return await this.setState(this.getYoutube('여행'));
}
```

<br/>

### 8. 데이터 초기화 값 셋팅

```
videoDatas : [...this.state.videoDatas, ...data.items]
```

위 코드로 입력 값이 바뀔 경우에 데이터를 초기화 한 후 데이터가 쌓이도록 설정해두었다.

따라서 데이터 초기화 값을 미리 셋팅하도록 하자.

#### 8-1. 초기화 변수 선언

class 내부 constructor 메소드 최하단에 작성한다.

```javascript
  constructor(props) {
    super(props);
    this.state = {
      videoDatas : [],
      query : '',
      nextPageToken : ''
    }

    this.defaultState = this.state; // 초기화 default 작성
    this.getYoutube = this.getYoutube.bind(this);
  }
```

<br/>

#### 8-2. 초기화 로직 작성

기존의 쿼리와 입력받은 쿼리가 다를 경우 초기화 한 후 입력받은 쿼리를 적용시켜야 한다.

따라서 초기화를 하는 로직을 구성한다.

위치는 `getYoutube` 메소드 내부 if문 다음에 작성한다.

```javascript
async getYoutube(query) {
  if (!query) return;
  // 여기 작성
  if (this.state.query !== query) {
    this.setState(this.defaultState);
  } 
  
  ...
}
```

<br/>

### 9. Main 작성 ( VideoList + VideoPlayer )

VideoList를 작성하기에 앞서 현재 우리는 Router 설정을 안해주었다. 한가지의 URL 안에서 모든 것을 보여주어야 하기 떄문에 어떤 컴포넌트를 렌더링 할 것 인지 선택을 해야한다. 따라서 VideoPlayer를 보여주기 위해서는 videoId가 있어야한다. 

비디오 리스트에서 특정 비디오가 선택됬다면 해당 비디오의 videoId를 저장하고 선택이 되지 않았다면 기본적으로 null값 혹은 빈문자열을 지니도록 한다.

`constructor` 에서 `videoId 프로퍼티`를 추가하도록 하자.

```javascript
constructor(props) {
  super(props);
  this.state = {
      videoDatas : [],
      query : '',
      nextPageToken : '',
      videoId: ''  // 추가
 }
```

<br/>

#### 9-1 VideoList 컴포넌트 구성하기

먼저 VideoList 컴포넌트를 구성하다. 폴더구조는 다음과 같다.

<img src="https://user-images.githubusercontent.com/31315644/70806992-e7244000-1dff-11ea-8a61-186525e3d07a.jpeg" alt="video-list" style="zoom:50%;" />

component/VideoList/VideoList.jsx

```jsx
import React from 'react'
import VideoListItems from './VideoListItems'

const VideoList = (props) => {
  return (
    <ul>
      <VideoListItems {...props}></VideoListItems>
    </ul>
  );
}

export default VideoList;
```

`list`별로 다른 리스트 썸네일과 제목을 보여주어야만 한다. 따라서 따로 하위 컴포넌트를 추가로 작성해준다.

<br/>

component/VideoList/VideoListItems.jsx

```jsx
import React from 'react'
import uuid from 'uuid'
import './VideoList.css'

const VideoListItems = (props) => {
  const videos = props.videoDatas.map(video => {
    return <li className='video-list' key={uuid.v4()} >
        <figure>
          <img src={video.snippet.thumbnails.high.url} alt="영상이미지"/>
          <figcaption>{video.snippet.title}</figcaption>
        </figure>
    </li>
  })
  return (
    <>
    {videos}
    </>
  );
}


export default VideoListItems;
```

여기서 `uuid`는 key를 고유한 랜덤키를 배포해주기 위한 npm 모듈이다. 다음으로 설치하고 작성한다.

```bash
npm i uuid --save
```

<br/>

css를 구성한다.

component/VideoList/VideoList.css

```css
.video-list {
  margin : 30px 0;
}

.video-list figure{
  display: flex;
  align-items: center;
}

.video-list figcaption{
  width: 800px;
  height: 300px;
  margin-bottom: 20px;
  font-size: 20px;
}
```

<br/>

#### 9-2 VideoPlayer 컴포넌트 구성하기

폴더구조는 다음과 같다.

<img src="https://user-images.githubusercontent.com/31315644/70805335-04efa600-1dfc-11ea-9858-ccd729635cb0.jpeg" alt="video-player" style="zoom:50%;" />

먼저 css를 추가하도록 하자.

component/VideoPlayer/VideoPlayer.css

```css
.video-player-wrap{
  margin : 0 auto;
  text-align: center;
}

.video-player{
  width: 960px;
  height: 640px;
}
```

<br/>

component/VideoPlayer/VideoPlayer.jsx

```jsx
import React from 'react'
import './VideoPlayer.css'

const VideoPlayer = (props) => {
  const url = `https://youtube.com/embed/${props.videoId}`;
  return (
    <div className="video-player-wrap">
      <iframe src={url} title={props.videoId} className="video-player" />
    </div>
  );
}

export default VideoPlayer
```

<br/>

#### 9-3. App.js에 두 컴포넌트 작성

App.js render 부분에 `<main>` 태그를 추가하고 videoId에 따라 어떤 컴포넌트를 렌더 할지 정한다.

```jsx
	render() {
    const { videoId } = this.state
    return (
      <div className = 'App'>
        <Nav>
          <SearchBar onSearchVideo={debounce(this.getYoutube, 500)}></SearchBar>
        </Nav>
        <main>
          {
          videoId
            ? <VideoPlayer videoId = { videoId }></VideoPlayer>
            : <VideoList
                  {...this.state}
                />
          }
        </main>
      </div>
    )
  }
```

각 컴포넌트에서 필요한 값들을 props로 내려주기 위해 태그 옆에 정의를 해두었다.

<br/>

#### 9-4. 비디오 플레이어 표시하기

VideoList에서 Click 이벤트를 일으켜서 videoId를 바꿔 Player를 표시하는 작업을 하도록하자.

먼저 App.js 에 videId를 바꿀 함수를 정의하고 `<VideoList>`에 props로 뿌려 click이벤트로 사용하도록 하자.

`render()` 함수 바로 위에 작성한다.

```jsx
setVideoId(id) {
  this.setState({ videoId : id })
}
```

<br/>

`render()`  함수의 `<VideoList>` 애도 해당 함수를 호출시킬 속성을 작성한다.

```jsx
<VideoList
      {...this.state}
		  onSetVideoId = {this.setVideoId} // 추가
/>
```

<br/>

constructor 내부에서 bind를 해준다.

```javascript
constructor(props) {
   ...
   this.setVideoId = this.setVideoId.bind(this);
}
```

<br/>

VideoListItems.jsx

컴포넌트 파일에 접근하여 li부분에 onClick 이벤트를 추가한다.

```jsx
import React from 'react'
import uuid from 'uuid'

const VideoListItems = (props) => {
  const videos = props.videoDatas.map(video => {
    // li 부분 수정
    return <li key={uuid.v4()} onClick={() => props.onSetVideoId(video.id.videoId)} >
        <figure>
          <img src={video.snippet.thumbnails.default.url} alt="영상이미지"/>
          <figcaption>{video.snippet.title}</figcaption>
        </figure>
    </li>
  })
  return (
    <>
    {videos}
    </>
  );
}
export default VideoListItems;
```

<br/>

### 10. 무한스크롤

이제 무한 스크롤을 작성한다. 

우선 무한스크롤을 사용할 수 있도록 npm 을 설치하고, gif파일을 가지고 오도록하자(gif는 스피너 이미지. 구글로 구할것)

<br/>

```bash
npm i react-infinite-scroller --save
```

<br/>

import 를 추가한다.

App.js

```javascript
import InfiniteScroll from 'react-infinite-scroller';
import spinner from './components/images/spinner.gif'
```

<br/>

App.js 의 `<main>`부분을 다음과 같이 수정한다.

```jsx
<main>
  {
  videoId
  ? <VideoPlayer videoId = { videoId }></VideoPlayer>
  :
    <InfiniteScroll
       loadMore = {() => this.getYoutube(this.state.query)}
       hasMore = {!!this.state.nextPageToken}
       loader = {
           <div key={uuid.v4()}>
           	 <img src={spinner} alt="로딩 중"></img>
           </div>
       }
    >
       <VideoList
  		     {...this.state}
            onSetVideoId = {this.setVideoId}
       />
    </InfiniteScroll>
  }
</main>
```

`loadMore` : 스크롤이 끝까지 발생 시 어떤 일을 할 것인가를 정의한다.

`hasMore` : 스크롤이 끝까지 발생 시 어떤 일을 일으키는 조건을 정의

`loader `: `loadMore`이 일어나는 동안 수행할 일을 정의한다.

<br/>

여기까지 하면 문제없이 잘 될 것이다.

다음에는 Router 기능을 추가하도록 하겠다.

현재 git .ignore로 설정을 해두어서 해당 프로젝트는 따로 관리를 해두지 않았다.

단, 좀더 확장되고 정확한 소스는 아래 링크에서 확인이 가능하다.

### [Youtube Mini Clone](https://github.com/HYEOK999/TIL/tree/master/react/project/youtube-practice)

