![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 05

- this.setState의 2가지 작용
  - 의미있는 업데이트를 연속적으로 불러들일 때
  - 같은 코드가 반복 될 때
- Style Component
- import 변수명 from ~~폴더명 = 해당 폴더 index.js 로드
- SearchBar
- 동영상 선택 판단하기
- InfiniteScroll

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- this.setState
- SearchBar
- InfiniteScroll
- debounce

<br/>

--------

### this.setState의 2가지 작용
#### 1. 의미있는 업데이트를 연속적으로 불러들일 때

```jsx
this.state = {
     count: 0
}

// 쓰지 말아야할 코드 : count가 4가 출력될것으로 예상하나 몇이 출력될지는 예상할 수 없다.
updateCount = () => {
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
    this.setState({ count: this.state.count + 1});
}


// Promise
async updateCount = () => {
    await new Promise(resolve => this.setState({ count : this.state.count + 1}, resolve));
  	await new Promise(resolve => this.setState({ count : this.state.count + 1}, resolve));
  	await new Promise(resolve => this.setState({ count : this.state.count + 1}, resolve));
}

// 콜백함수, 함수형 
updateCount = () => {
  	this.setState((prevState) => { count : prevState.count + 1 };
    this.setState((prevState) => { count : prevState.count + 1 };
  	this.setState((prevState) => { count : prevState.count + 1 };
}


```

**위와 같이  State를 업데이트 할 때는 콜백으로 던져주거나 혹은 Promise를 사용하여 순서를 보장시켜야만 한다. ( 프로미스 사용 추천 )**

this.setState는 비동기 함수이므로 순서를 보장하지 못한다. 따라서 언제 count값이 올라갈지 예측 못하기 떄문에 위와 같은 코드를 적을 땐 반드시 Promise와 await를 이용하거나 함수형으로 setState값을 지정해주어야한다.

<br/>

#### 2. 같은 코드가 반복 될 때

```javascript
updateCount = () => {
	this.setState({quantity: 2});
	this.setState({quantity: 2});
	this.setState({quantity: 2});
	this.setState({quantity: 2});
	this.setState({quantity: 2});
}
```

위 처럼 의미없는 코드가 연속적으로 반복될 경우, React는 코드를 하나로 일괄 처리 한다.

<br/>

### Style Component

Style Component : CSS를 javascript 처럼 코딩할 수 있게 하는 것.

css 코드 안에서 js코드를 직접적으로 사용이 가능하다.

<br/>

### import 변수명 from ~~폴더명 = 해당 폴더 index.js 로드

import 시 폴더 명으로 끝날 경우 index.js를 디폴트로 찾는다는 것을 의미한다.

이것을 응용할 경우 하나의 index.js를 선언해주고 그 index.js에서 각각의 이미지들을 로드해온다면

다음과 같이 응용해서 사용할 수 있다.

- images/index.js

````jsx
module.exports = {
	spinner : require('./spinner.gif');
  spinner2 : require('./spinner2.gif');
}
````

- App.js - import

```jsx
import {spinner, spinner2} from './components/images';
// import spinner from './components/images/index.js';
// import spinner2 from './components/images/index.js';
```

<br/>

### SearchBar

1. 자동 검색 ( 검색 아이콘 버튼 이 없다. )
2. 키보드 엔터 시 검색
3. 검색 아이콘 버튼 클릭 시 검색

1번과 2번을 혼합해서 쓰거나 2번과 3번을 혼합해서 쓰거나 한다.

1번 2번 3번을 전부 사용하는 것은 추천하지 않는다.

<br/>

#### 1. 자동 검색

**lodash의 { debounce } 를 이용한다.**

`debounce`는 최초 입력이 되었을 경우 지정해준 시간동안 입력했던 모든 입력을 무시하고 시간이 끝날  마지막에 입력된 값만을 입력으로 취급받는다.

debounce의 권장 지연시간은 0.5 초(500ms) 이다.

**debounce를 사용하는 가장 큰 목적은 불필요한 네트워크 요청을 막을 수 있다는 것이다. 스크롤과 같은 곳에 많이 쓰인다.**

```jsx
<SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
```

`SearchBar의 input`

```jsx
<input
  type="text"
  onChange={e => props.setInput(e.target.value)}
  className="search-bar"
  placeholder="검색어를 입력하세요"
/>
```

위 `onChange` 이벤트 프로퍼티는 요소의 값이 변경될 때마다 이벤트를 일으키는데 여기에 데이터를 불러오는 함수를 연결할 경우 무언가 입력될 떄마다 해당 함수가 실행되면서 불필요한 요청을 지속적으로 일으킬 것이다. 이를 방지하고자 debounce를 사용한다.

<br/>

#### 2. 키보드 엔터 시 검색

따로 해당 이벤트를 받아 사용하는 HOC를 작성하거나 직접적으로 인라인에 작성하는 방법이 있다.

````jsx
const handleEnter = search => e => {
	if (e.key === 'Enter') {
		serach(e.target.value);
	}
}

<input
  type="text"
  onChange={e => props.setInput(e.target.value)}
  // 인라인 방법들 주석
  // onKeyPress={e => e.key === 'Enter' ? props.onSearchVideos(e.target.value) : () => {}}
  // onKeyPress={e => if(e.key === 'Enter') { props.onSearchVideos(e.target.value); }}
  onKeyPress={handleEnter(props.onSearchVideos)} // HOC
  className="search-bar"
  placeholder="검색어를 입력하세요"
/>

````

<br/>

#### 3. 검색 아이콘 버튼 클릭 시 검색

`ref`는 해당하는 리액트 컴포넌트를 DOM 객체처럼 직접 접근하는 지정된 키워드(예약어).

즉, DOM 요소에 직접적으로 접근해서 자신의 요소에 있는 프로퍼티들을 참조한다.

```javascript
ref = {refs => (input = refs)}
```
`ref`의 직접적인 값은 `undefined`를 받지만  `ref`의 화살표로 던지는 인자 값(변수)인 `refs`에는 DOM 요소에 직접적으로 접근해서 자신의 요소에 있는 프로퍼티들을 참조한다.

여기서 `refs`는 self라고도 불리우며 ref를 포함하고 있는 요소 자체를 가르킨다.

<br/>

```jsx
let input;
return (
  <div className="search-wrapper">
    <input
       ref = {ref => input = ref}
       type="search"
       className="search-bar"
       placeholder="검색어를 입력하세요"
    />

    <button className="btn-search" onClick={() => props.onSearchVideos(input.value)}>
      <img className='search-icon' src={searchIcon} alt="검색"/>
    </button>
  </div>
)
```

<br/>

만약 `ref`에 해당되는 `console.log`을 찍어보고 싶다면 다음과 같이 소스를 짜도록한다.

```jsx
  <input
     ref = {ref => {
    	console.log(ref)   
    	return input = ref
 		}}
  />
```

`&&` 는 항상 boolean 값을 반환하고

`||` 는 true인 값을 반환한다.( boolean값을 반환하는게 아니다. )

<br/>

사용자가 검색을 수행한다.(getYoutubeData를 통해 쿼리를 입력한다)

얻어온 값을 videoList 필요한데이터 -> this.state -> {...this.state}로 전부 넘긴다. -> video가 선택이 되었을 때 

사용할 state를 동적으로 추가가 가능하지만 기본 권장사항은 초기화를 해놓는 것이다.

실제 렌더링 되는 코드는 가능한 짧게 구상하는것이 좋다.

<br/>

### 동영상 선택 판단하기

라우팅 : url을 만들어서 페이지를 나누는 것.

현재 리액트 라우팅없이 작업을 하고 있기 때문에 하나의 페이지에서 UI를 뿌려주려면 조건부 렌더링을 해야만한다.

따라서 분기점을 나누어야하므로 사용자가 비디오를 클릭한 여부에 따라 나누도록 하겠다.

selectedVideo가 가리키는 것은 선택된 비디오의 아이디 이다.

사용자가 동영상을 클릭했다면 selectedVideo는 특정 값(vedioId)을 가르키고 있을 것이다.

따라서, selectVideo 가

- null 이라면, 비디오 리스트를 보여준다. `VideoList`
- selectVideo가 특정 값을 가지고 있다면 영상이 선택된 것이므로 해당 영상을 재생하는 `VideoPlayer` -> iframe을 보여준다.

```jsx
  render () {
    const { selectedVideo } = this.state;

    return (
      <div className="App">
        <Nav>
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Nav>
        {
          selectedVideo
          ? <VideoPlayer videoId = { selectedVideo } />
          : <VideoList
          		{...this.state}
          		onVideoSelect = {selectedVideo => this.setState({ selectedVideo })}
          	/>
        }
```

<br/>

### InfiniteScroll

```jsx
<InfiniteScroll
  loadMore = {() => this.getYoutubeData(this.state.query)}
  hasMore = {!!this.state.nextPageToken}
  loader = {
    <div key={uuid.v4()} className="loader">
      <img src={spinner} alt="loading" />
    </div>
  }>
  {/* 무한로딩으로 렌더링될 모든 컴포넌트 */}
  <VideoList
    {...this.state}
    // onVideoSelect = {selectedVideo => this.setState({ selectedVideo }
    onVideoSelect = { this.setVideo }
  />
</InfiniteScroll>
```

**loadMore** : 사용자가 스크롤 바가 끝에 도달했을 떄 실행할 함수를 받는다.(반드시 화살표로 함수를 받아야한다.)

**hasMore** :  더 페이지를 로드할것이 있는지 판단한다.( boolean 타입 )

**loader** : `loadMore`이 실행되고 데이터를 가지고 오는 동안 일어날 일을 정리한다.

