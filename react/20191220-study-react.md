![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 09

- 여러 데이터를 담을 변수의 타입 결정 : 객체 선언 vs 배열 선언
- defaultValue와 Value
- YouTube 프로젝트 변경점
  - `<SearchBar>` 태그 URL로 쿼리를 변경하는 방식으로 바꾸기.
- ComponentDidUpdate 설정
- getYoutubeData 함수 → 클래스필드 변수로 변경 
- getYoutubeData 함수 변경( _getYoutubeData ) 및 복제하기  

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- defaultValue
- Value
- ComponentDidUpdate

<br/>

--------

### 여러 데이터를 담을 변수의 타입 결정 : 객체 선언 vs 배열 선언

사용. 데이터가 고유한 값이 많다면 객체 사용이 편리하다.

- **중복을 허용되는 데이터는 '배열'** -> Array.find 로 찾아야한다. update 또한 추가로해야한다. 소스가 매우 길어진다.

- **중복을 방지하고 싶은 데이터는 '객체'**

<br/>

### defaultValue와 Value

<br/>

### YouTube 프로젝트 변경점

#### `<SearchBar>` 태그 URL로 쿼리를 변경하는 방식으로 바꾸기.

> Redux Store에 쿼리를 저장하고 독립적으로 분리한 VideoPlayer 컴포넌트에게 쿼리를 넘겨주기 위해서.

```jsx
/* <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)} /> */
<SearchBar onSearchVideos={e =>
  {
    this.props.history.push(`/results?search_query=${e.target.value}`)
  }
}
```

<br/>

#### ComponentDidUpdate 설정

리액트에서 지원하는 라이프사이클 중 하나로, 비동기 함수다.

URL이 실시간으로 바뀌거나, Props, State값등이 하나라도 바뀔경우 `ComponetDidUpdate`함수를 호출한다.

`prevProps`, `prevState` 는 각각 현재 바뀐값 직전의 값을 나타내고 있다.

이 함수는 `<SearchBar>`태그의 `onChange`떄문에 사용하는 것이기 때문에 해당 함수를 쓰지 않고 클릭이나 엔터만을 이용할 경우 `ComponentDidUpdate`를 정의해줄 필요가 없다.

````javascript
// this에 props 값, this에 state 값이 하나라도 바뀔경우 실행된다.
  // prevProps가 변경되기 props 값 , prevState는 변경되기 이전 state 값
  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    // props는 최신값, 따라서 방어코드를 작성한다.
    if ( props.location ) {
      const { search_query } = qs.parse(props.location.search)
      const { search_query : prev } = qs.parse(prevProps.location.search)
      if( search_query !== prev ) { // 중요한 방어코드
        this.getYoutubeData(search_query || '')  // undefined가 나올경우 ''을 띄운다.
      }
    }
  }
````

 `search_query !== prev`는 정말로 중요한 방어코드다. 

해당 코드는 해당 함수가 실행되면서 변경된 많은 변경점 중에 오직 쿼리값만의 변경유무를 체크한다.

만약 변경 사항이 없다면 셀 수 없이 많은 코드가 실행되어 버리므로, 업데이트가 되어지는 변수에 대해서만 실행하고자 하는 로직을 명확하게 코딩해야 한다. ( 수많은 API를 요청해버리는 사태가 벌어질 수 있다. )

<br/>

#### getYoutubeData 함수 → 클래스필드 변수로 변경 

> `<SearchBar>` 태그에서 getYoutubeData함수가 아닌 URL에 쿼리를 변경하는 방식으로 바꾸었기 때문. 

**변경전**

```javascript
getYoutubeData(query){
  // async getYoutubeData(query) {
    if (isChanged) {
      this.setState(this.defaultState);
    }

    try {
      const { nextPageToken } = this.state;
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 10,
        pageToken: nextPageToken
      };

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        { params }
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
    });
  } catch (e) {}
}
```

<br/>

**변경후**

URL 형식으로 바뀌면서 URL 쿼리를 Redux Store에 추가해주어야만 하기 때문에

맨 아래에 ` this.props.updateQuery(query);` 구문을 추가 해주었다.

또한 `debounce`함수를 이제는 `<SearchBar>` 태그에서 getYoutubeData함수에 걸어주는게 아니므로 

클래스필드로 변경하고 함수에 `debounce`와 함수내부에  `async`키워드를 사용한다.

````javascript
getYoutubeData = debounce(async (query) => {
   if (this.props.query !== query) {
      this.setState(this.defaultState);
    }
  
  	try {
      const { nextPageToken } = this.state;
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 10,
        pageToken: nextPageToken
      };

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        { params }
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
      });
    } catch (e) {}
  
    this.props.updateQuery(query);  // 추가
  }, 550 );
````

<br/>

####getYoutubeData 함수 변경( _getYoutubeData ) 및 복제하기 

위와 같이 작성될 경우 문제가 사용자가 입력하는 시간이 `debounce`함수로 인해 매우 지연되게 보인다는 것이다.

이는 사용자가 어플리케이션을 사용을 안하게되버리는 요인이 될 수 있기 때문에 고쳐준다.

고치는 방법은 함수를 2분할 하는 것이다.

`getYoutubeData` -> `_getYoutubeData` 로 변경하고

인자에 `isChanged`를 추가한다.

```javascript
_getYoutubeData = debounce(async (query, isChanged) => {
    if (isChanged) {
      this.setState(this.defaultState);
    } // 수정
  
  	try {
      const { nextPageToken } = this.state;
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 10,
        pageToken: nextPageToken
      };

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        { params }
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
      });
    } catch (e) {}
  
    //this.props.updateQuery(query);  // 삭제
  }, 550 );
```

`this.props.updateQuery(query);`도 삭제한다.

<br/>

**추가 함수**

추가로 `_getYoutubeData`함수를 호출하는 `getYoutubeData`함수를 추가해준다.

```javascript
getYoutubeData(query) {
    let isChanged = false;
    if(this.props.query !== query) {
      isChanged = true;
      this.props.updateQuery(query);
    }
    this._getYoutubeData(query, isChanged);
  }
```

