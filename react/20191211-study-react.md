![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 04

- 비동기 처리
  - fetch 단점
  - +then 대신 async/await
  - +try - catch
  - 비동기 코드 내 순회
- YouTube Mini Clone
  - 인수 기본값 설정하기.
  - Axios , params 별도로 설정하기.
  - debounce 함수
  - 함수 컴포넌트 vs 클래스 컴포넌트
  - 모든 상태를 하위 컴포넌트에게 전달하는법
  - HOC ( High Order Component )
  - InfiniteScroll
  - uuid
  - defaultState 백업
  - Update 이벤트



<br/>

------

<br/>

### 용어 - ( 러버덕 )

- fetch 단점
- try / catch
- 인수 기본값 성저하기
- Axios, params 별도 설정
- debounce 함수
- HOC
- debounce , infiniteScroll, uuid
- Update 이벤트

<br/>

--------

## 비동기 처리

<br/>

### fetch 단점

- 크로스 브라우징 이슈 
- 쿠키를 포함하려면 특정 npm을 랩핑해줘야 한다.
- status가  response 체크를 받아야만 한다.

fetch에 대한 별도의 핸들링 모듈을 전부 설치를 해주어야한다. 

어느 회사에 가느냐에 따라 사용하는 ajax가 다를 테지만 왠만하면 axios를 사용하는 것이 좋다.

<br/>

#### + then 대신 async/await

Promise 에서 then 을 게속 나열하는 것보다는 async / await를 사용하도록 한다.

then을 지속적으로 나열하다보면 반복 순회( for )를 하기가 힘들어지며 가독성이 매우 심하게 떨어지기 때문이다.

<br/>

#### + try - catch

async / await 에서 에러처리를 할때는 try - catch를 사용한다.

 try - catch는 에러처리 뿐만 아니라 다음 순서를 보장해줄 수 있기 때문에 반드시 사용하는것을 권장한다.

또한, try - catch 구문은 비동기 코드 별로 분리해서 설정해준다.

```javascript
    try {
      const { data } = await axios.get('api주소',{ params } )
      this.setState({list : data.items });
    } catch (error) {
      console.error(error);
    }

// 위 try - catch 문이 에러를 일으켜도 지금 try - catch 문은 실행을 한다.
	  try {
      const { data } = await axios.get('api주소',{ params } )
      this.setState({list : data.items });
    } catch (error) {
      console.error(error);
    } 
```

<br/>

#### 비동기 코드 내 순회

**프로미스 체이닝 및 비동기 처리에는 forEach를 돌려서는 안된다. 실행순서를 보장받을 수 없다.**

```javascript
const after1 = new Promise(resolve => setTimeout(() => resolve(1),1000))
const after2 = new Promise(resolve => setTimeout(() => resolve(2),2000))
const after3 = new Promise(resolve => setTimeout(() => resolve(3),3000))

const main = () => {
  const tasks = [after3, after2, after1];

  // 잘못된 예제
  tasks.forEach(async task => console.log(await (task)))
}

main()
```

예상과 달리(after3, 2, 1순서로 진행) 결과값은 1 2 3이 나온다.

- 비동기 처리된 배열을 forEach로 순회할 경우 순서가 보장되지 않는다.

<br/>

만약 비동기 코드 내에서 for 순회를 하고 싶다면 for of를 사용한다. 실행순서는 보장받을 수 없다.

```javascript
const after1 = new Promise(resolve => setTimeout(() => resolve(1),1000))
const after2 = new Promise(resolve => setTimeout(() => resolve(2),2000))
const after3 = new Promise(resolve => setTimeout(() => resolve(3),3000))

const main = async () => {
  const tasks = [after3, after2, after1];

  // 올바른 예제
  for (const t of tasks) {
    console.log(await (t))
  }
}

main();
```

- 비동기에서 순회가 필요할 경우 for...of를 사용해야 한다.

<br/>

state를 초기화를 안하면 setState를 사용할 수 없다.

state를 초기화하고 아무것도 정의를 안해도 setState에 적용된 내용을 삽입하고 state에 데이터가 있다면 setState를 통해 업데이트 된다. (UPSERT)

<br/>

--------

## YouTube Mini Clone

UPSERT : Insert + Update를 혼합한 용어. 데이터가 없으면 생성, 있으면 업데이트 한다는 의미를 지닌다.

<br/>

try / catch를 사용하지 않을 경우 오류 핸들링이 되지 않기 때문에 다음 코드가 실행되지 않는다.

- try / catch 사용시 에러를 잡고 나서도 다음 코드 실행이 보장된다.
- 만약, 반드시 실행되어야 하는 중요한 비동기 작업이라면 각각 try / catch로 구분해서 관리하는 것이 좋다. 

<br/>

### 인수 기본값 설정하기.

```javascript
async getYoutubeData(query='여행') {
    ...
}
```

<br/>

### Axios , params 별도로 설정하기.

```javascript
async getYoutubeData(query='여행') {
    const params = {
      key : '',
      q : query,
      part : 'snippet',
      maxResults: 10,
      pageToken: nextPageToken
    }
    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params })
      this.setState({list : data.items });
    } catch (error) {
      console.error(error);
    }
  }
```

그대로 url을 전부 적게 될 경우 너무 길어지기 때문에 가장 기본 링크를 가져오고 params 객체를 별도로 선언한다. (가독성 ⇪)

<br/>

### debounce 함수

lodash가 관리하고 있는 메소드.

다음으로 설치하고 import 하여 사용할 수 있다.

```jsx
npm i lodash --save // bash
import { debounce } from 'lodash'; // 코드 내 삽입
<SearchBar onSearchVideos={debounce(this.getYoutubeData, 500) /> // 사용 예
```

<br/>

debounce 이벤트가 발생한 뒤부터 특정 시간 동안 기다린 이후에 이벤트가 발생한다.

최소 500(ms 단위)은 해야 효과를 볼 수 있다.

```javascript
debounce(this.getYoutubeData, 500);
```

1인자 : debounce를 걸 함수

2인자 : debounce 딜레이 지연시간 ms 

<br/>

### 함수 컴포넌트 vs 클래스 컴포넌트

클래스 컴포넌트는 유상태인 컴포넌트에서 사용하는 것이 좋다.(state를 관리하는 컴포넌트)

함수 컴포넌트는 무상태인 컴포넌트에서 사용한다. ( 유상태인 컴포넌트에게 props로 상태를 전달받아 이용한다. )

일반적으로 최상위 컴포넌트는 state를 관리하고 있으며 하위 컴포넌트는 state가 없고, props로 전달받아 사용하는 것이 좋다.

<br/>

### 모든 상태를 하위 컴포넌트에게 전달하는법

`{...this.state}` 를 이용한다.

```jsx
<SearchBar {...this.state} /> // 예
```

<br/>

### HOC ( High Order Component )

함수 내에서 인수로 들어온 함수를 이용하는 것.

```javascript
const handleEnter = search => e => {
	if(e.key === 'enter') {
		search(e.target.value)
	}
}
```

위 HOC를 풀면 아래처럼 된다.

```javascript
function a(search) {
	function b(e) {
		if(e.key === 'enter') {
      search(e.target.value)
    }
	}
}
```

<br/>

### InfiniteScroll

```javascript
npm i react-infinite-scroller --save
```

loadMore : 실제로 데이터를 불러오는 함수 ( 무조건 화살표 함수 )

hasMore : 기준점 (다음 페이지의 토큰이 있을 경우 등등)

loader : 로딩중 보여줄 스피너등으로 표시함

<br/>

### uuid

```javascript
npm i uuid --save
```

고유한 랜덤 키 값을 생성하고자 할 때 사용한다.

```jsx
import uuid from 'uuid'; 

<div key={uuid.v4()} /> // 코드 사용
```

<br/>

### defaultState 백업

검색어가 바뀌었을 때 화면이 바뀌는데, 기존상태로 돌아갈 경우 모든 속성을 초기화하는 것보다 초기 상태의 State로 바꾸는게 편리하다.하위 컴포넌트들은 상태를 갖고 있지 않고(가능하면 상태가 없는걸로 만듦) Props로 전달받아 사용한다.
또한, 가능하면 jsx코드 내에서는 리턴에서만 UI 보여주는게 좋다.

<br/>

### Update 이벤트

- 3가지 방법으로 업데이트를 받을 것 : 즉시 업데이트, 엔터키 입력시 업데이트, 버튼 눌렀을 때 업데이트

- onChange는 e를 받고 onKeyPress는 e를 받지 않았음 왜일까?

  - 결과적으론 같은데 다른 방법 두 가지를 나타낸 것

  ```javascript
   <input
        type="search"
        onChange={e => props.onSearchVideos(e.target.value)}
        onKeyPress={handleEvent(props.onSearchVideos)}
        className="input-search"
        placeholder="검색어를 입력해주세요"
        />
  ```

- onKeyPress가 반환하는 것은 두번째 매개변수로 전달된 함수 전체. 즉 `props.onSearchVideos(e.target.value)`

```javascript
 const handleEvent = search => e => {
    if (e.key === 'Enter') {
      search(e.target.value)
    }
  }
```

