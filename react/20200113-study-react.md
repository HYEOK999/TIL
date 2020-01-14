![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 16

- 가위 바위 보 미니 게임 만들기

  - Ver1. 기본 프로젝트 구성하기. 
    - 개요 : 가위 바위 보 게임, Rock Paper Scissors
    - [State 생성 및 이벤트 생성해주기.](#a1)
    - [User가 선택한 수(가위, 바위, 보) 값 설정해주기.](#a2)
    - [Computer에게 Random 값 설정해주기.](#a3)
    - [승리자 결정하기 ( useEffect )](#a4)
    - [Ver1. 전체코드](#a5)
  - Ver2. 클릭버튼을 Select박스로 변경하기
    - [useRef 사용 하기.](#b1)
    - [Ver2. 전체코드](#b2)
  - Ver3. useReducer 적용, 전적표 만들기
    - [useReducer 추가 하기.](#c1)
    - [reducer() 추가 하기.](#c2)
    - [useEffect 내부에 dispatch 추가해주기.](#c3)
    - [전적표 화면 렌더링 및 초기화 버튼, 초기화 dispatch 추가하기.](#c4)
    - [Ver3. 전체코드](#c5)

- [Graph QL - Graph + Query + Language](#d1)

  - [디자인 vs DB](#d2)

  - [Github api - GraphQL 실습](#d3)

    - [GraphiQL 다운로드](#a4)

    - [Endpoint 설정](#d5)

    - [HTTP Headers 설정](#d6)

  - 실습

    - [기본 쿼리 보내기](#d8)
    - [중복된 요청 시 네이밍 하기.](#d9)
    - [fragment 키워드를 이용하여 중복요소 합치기](#d10)
    - [QUERY , MUTATION](#d11)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- useEffect
- useReducer
- useRef
- GraphQL
- QUERY
- MUTATION

<br/>

-------

## 가위 바위 보 미니 게임 만들기

#### 개요 : 가위 바위 보 게임, Rock Paper Scissors

- 값 : ['가위', '바위', '보']
- 사용자가 입력한 값
- 컴퓨터가 랜덤으로 생성한 값

<br/>

### Ver1. 기본 프로젝트 구성하기. 

#### State 생성 및 이벤트 생성해주기. <a id="a1"></a>

```jsx
import React, { useEffect, useState, useRef }from 'react'

const App = (props) => {
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);
  
  return (
    <>
    	{winner}
      <button onClick={() => runGame('가위')}>가위</button>
      <button onClick={() => runGame('바위')}>바위</button>
      <button onClick={() => runGame('보')}>보</button>
    </>
  );
}
```

`myPick` : `Computer`가 선택한 `가위`, `바위`, `보`
`myPick` : `User`가 선택한 `가위`, `바위`, `보`
`winner` : `Computer` 혹은 `User` 중 이긴 상태

<br/>

####User가 선택한 수(가위, 바위, 보) 값 설정해주기. <a id="a2"></a>

```jsx
const runGame = (value) => {
  setMyPick(value);
}
```

<br/>

#### Computer에게 Random 값 설정해주기. <a id="a3"></a>

**난수를 발생시키는 함수** : `Math.random()` - 수학적으로 안전한 랜덤값은 아니다.
**소수점 내림** : `Math.floor()`

위 2개의 함수를 이용해서 랜덤 정수를 만들어 낸다.

특정한 정수 범위 내에서 랜덤 값 만드는 방법 

```jsx
// 최저값 + Math.floor(Math.random() + (최고값 - 최저값))
0 + Math.floor(Math.random() * (Max - Min))
```

- 절대 최대값을 넘을 수 없는 난수를 발생시키는 식으로 최저값~최고값 사이의 정수를 난수로 발생시켜 줌
- 버튼을 클릭할때마다 난수가 바뀌어야 함

```jsx
const runGame = (value) => {
  const items = ['가위', '바위', '보'];
  const randomIndex = Math.floor(Math.random() * items.length);   	
  setPick(items[randomIndex]);
  setMyPick(value);
  // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
}
```

`runGame` 함수 내부에서 승패의 여부에 대한 로직을 구현할 수 없는 이유는 `runGame`함수 내부에서는 pick값을 바로 확인할 수 없기 때문이다.

- `setPick` 과 `setMyPick`이 비동기로 동작한다.

따라서, `useEffect` 에서 확인해야만 한다. - 렌더링 이후 동작하기 떄문

<br/>

#### 승리자 결정하기 ( useEffect ) <a id="a4"></a>

```jsx
useEffect(() => {
  let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
  // pick : 컴퓨터, myPick : 사용자가 클릭한 value
  if (pick === '가위') {
    if (myPick === '바위') _winner = 'user'
    if (myPick === '보') _winner = 'computer'
    if (myPick === '가위') _winner = 'none'
  } else if(pick === '바위' ) {
      if (myPick === '바위') _winner = 'none'
      if (myPick === '보') _winner = 'user'
      if (myPick === '가위') _winner = 'computer'
  } else if(pick === '보' ) {
      if (myPick === '바위') _winner = 'computer'
      if (myPick === '보') _winner = 'none'
      if (myPick === '가위') _winner = 'user'
  }
  setWinner(_winner);
}, [pick, myPick])

useEffect(() => {
  console.log('컴퓨터, ', pick);
  console.log('사용자, ', myPick);
  console.log('우승자, ', winner);
}, [winner])
```

<br/>

#### Ver1. 전체코드 <a id="a5"></a>

```jsx
import React, { useEffect, useState, useRef }from 'react'

const App = (props) => {
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);

  const runGame = (value) => {
    const items = ['가위', '바위', '보'];
    const randomIndex = Math.floor(Math.random() * items.length);
    setPick(items[randomIndex]);
    setMyPick(value);
    // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
  }
  
  useEffect(() => {
    let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
    // pick : 컴퓨터, myPick : 사용자가 클릭한 value
    if (pick === '가위') {
      if (myPick === '바위') _winner = 'user'
      if (myPick === '보') _winner = 'computer'
      if (myPick === '가위') _winner = 'none'
    } else if(pick === '바위' ) {
        if (myPick === '바위') _winner = 'none'
        if (myPick === '보') _winner = 'user'
        if (myPick === '가위') _winner = 'computer'
    } else if(pick === '보' ) {
        if (myPick === '바위') _winner = 'computer'
        if (myPick === '보') _winner = 'none'
        if (myPick === '가위') _winner = 'user'
    }
    setWinner(_winner);
  }, [pick, myPick])

  useEffect(() => {
    console.log('컴퓨터, ', pick);
    console.log('사용자, ', myPick);
    console.log('우승자, ', winner);
  }, [winner])

  return (
    <>
      {winner}
      <button onClick={() => runGame('가위')}>가위</button>
      <button onClick={() => runGame('바위')}>바위</button>
      <button onClick={() => runGame('보')}>보</button>
    </>
  );
}

export default App;
```

<br/>

### Ver2. 클릭버튼을 Select박스로 변경하기

#### useRef 사용 하기. <a id="b1"></a>

먼저 `useRef`를 사용하기 위해서 선언부터 해준다. (당연히 `import`도 추가해햐 한다.)

```jsx
const selectRef = useRef(null);
```

<br/>

추가로  `<select>` 태그를 선택하기 위해서 `ref={selectRef}`로 선택해주고 `onChange` 이벤트를 걸어준다.

`handleSelectChange` 함수에서는 현재 `<select>` 에서 선택된 `value`값을 토대로 `runGame`함수를 실행한다.

참고로 `useRef`는 `createRef`와 다르게 값이 변하더라도 리렌더링을 유발하지 않는다는 것을 기억하자.

```jsx
const handleSelectChange = () => {
   const value = selectRef.current.value;
   runGame(value);
   console.log(value); // useRef는 리렌더링을 유발하지 않는다.
}

return (
  <>
    {winner}
    <select ref={selectRef} onChange={handleSelectChange}>
      <option value="가위">가위</option>
      <option value="바위">바위</option>
      <option value="보">보</option>
    </select>
  </>
);
```

추가로, 변수에 `ref`를 바인딩 할때는 `ref => input = ref`처럼 화살표 함수를 사용했지만 `useRef` 사용 시에는 `ref={selRef}`와 같이 사용한다.

```jsx
// 일반 변수
ref={ref => input = ref}
// useRef 사용시
ref={selRef}
```

<br/>

#### Ver2. 전체코드 <a id="b2"></a>

```jsx
import React, { useEffect, useState, useRef, useReducer }from 'react'

const App = (props) => {
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);
  const selectRef = useRef(null);

  const runGame = (value) => {
    const items = ['가위', '바위', '보'];
    const randomIndex = Math.floor(Math.random() * items.length);
    setPick(items[randomIndex]);
    setMyPick(value);
    // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
  }

  useEffect(() => {
    let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
    // pick : 컴퓨터, myPick : 사용자가 클릭한 value
    if (pick === '가위') {
      if (myPick === '바위') _winner = 'user'
      if (myPick === '보') _winner = 'computer'
      if (myPick === '가위') _winner = 'none'
    } else if(pick === '바위' ) {
        if (myPick === '바위') _winner = 'none'
        if (myPick === '보') _winner = 'user'
        if (myPick === '가위') _winner = 'computer'
    } else if(pick === '보' ) {
        if (myPick === '바위') _winner = 'computer'
        if (myPick === '보') _winner = 'none'
        if (myPick === '가위') _winner = 'user'
    }
    setWinner(_winner);
    // 기록을 해주는 로직을 추가한다.
  }, [pick, myPick])

  useEffect(() => {
    console.log('컴퓨터, ', pick);
    console.log('사용자, ', myPick);
    console.log('우승자, ', winner);
  }, [winner])

  const handleSelectChange = () => {
    const value = selectRef.current.value;
    runGame(value);
    console.log(value); // useRef는 리렌더링을 유발하지 않는다.
  }

  return (
    <>
      {winner}
      <select ref={selectRef} onChange={handleSelectChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
    </>
  );
}

export default App;
```

<br/>

### Ver3. useReducer 적용, 전적표 만들기

#### useReducer 추가 하기. <a id="c1"></a>

먼저 `useReducer`를 사용하기 위해서 선언부터 해준다. (당연히 `import`도 추가해햐 한다.)

`useReducer`를 통해 관리 되는 상태의 초기화는 빈배열로 한다.

```jsx
const [state, dispatch] = useReducer(reducer, []);
```

<br/>

#### reducer() 추가 하기. <a id="c2"></a>

`useReducer`에서 사용할 리듀서를 추가한다.

리듀서에서는 객체의 상태를 덮어씌우는 형식으로 작동하기 때문에 기존의 값을 스프레드 불러와서 유지를 시켜줘야 하는 것에 꼭 주의하자.

참고로, `Redux`의 경우` reducer action`에서 대문자를 사용하지만 `useReducer`는 대/소문자 구별이 자유롭다.

```jsx
const reducer = (state, action) => {
  const data = state.history;
  switch (action.type) {
    case 'ADD':
      return {
        ...state, // 게임 기록 유지
        history : data
          ? [
            ...data,
            action.newGame
          ] // 초기 상태가 아닐 경우(기존 데이터를 갖고 있을 때)
          : [action.newGame] // 초기 상태인 경우(갖고 있는 데이터가 없을 때)
      }
    case 'RESULT' :
      let _comWin, _userWin
      if(action.winner === 'computer') {
        _comWin = state.comWin
          ? parseInt(state.comWin, 10) + 1 // 10진수 정수형태로 변환
          : 1
      }
      if(action.winner === 'user') {
        _userWin = state.userWin
        ? parseInt(state.userWin, 10) + 1
        : 1
      }
      return {
        ...state,
        comWin: _comWin || state.comWin,
        userWin: _userWin || state.userWin
      }
    case 'RESET':
      return {};
  }
}
```

<br/>

#### useEffect 내부에 dispatch 추가해주기. <a id="c3"></a>

`dispatch` 를 추가한다. 위치는 _winner가 선언된곤 제일 하단에 해주어야한다.

```jsx
useEffect(() => {
    let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
    // pick : 컴퓨터, myPick : 사용자가 클릭한 value
    if (pick === '가위') {
      if (myPick === '바위') _winner = 'user'
      if (myPick === '보') _winner = 'computer'
      if (myPick === '가위') _winner = 'none'
    } else if(pick === '바위' ) {
        if (myPick === '바위') _winner = 'none'
        if (myPick === '보') _winner = 'user'
        if (myPick === '가위') _winner = 'computer'
    } else if(pick === '보' ) {
        if (myPick === '바위') _winner = 'computer'
        if (myPick === '보') _winner = 'none'
        if (myPick === '가위') _winner = 'user'
    }

    // 기록을 해주는 로직을 추가한다.
    if (_winner) {
      setWinner(_winner);
      dispatch({ type: 'ADD', newGame: `${_winner}가 이겼습니다.(컴퓨터: ${pick} / 유저: ${myPick})` })
      dispatch({ type: 'RESULT', winner: _winner})
    }
  }, [pick, myPick])
```

<br/>

#### 전적표 화면 렌더링 및 초기화 버튼, 초기화 dispatch 추가하기. <a id="c4"></a>

```jsx
  const { history, comWin, userWin } = state
  return (
    <>
      우승자 : {winner}
      <br/>
      컴퓨터 : {comWin || 0} , 유저 : {userWin || 0}
      <br/>
      <select ref={selectRef} onChange={handleSelectChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
      <button onClick={() => dispatch({type: 'RESET'})}>초기화</button>
      {
        history && history.map((h, index) => <h1 key={index}>{h}</h1> )
                               //전적표
      }
    </>
  );
}
```

<br/>

#### Ver3. 전체코드 <a id="c5"></a>

```jsx
import React, { useEffect, useState, useRef, useReducer }from 'react'

const reducer = (state, action) => {
  const data = state.history;
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'ADD':
      return {
        ...state, // 게임 기록 유지
        history : data
          ? [
            ...data,
            action.newGame
          ]
          : [action.newGame]
      }
    case 'RESULT' :
      let _comWin, _userWin
      if(action.winner === 'computer') {
        _comWin = state.comWin
          ? parseInt(state.comWin, 10) + 1
          : 1
      }
      if(action.winner === 'user') {
        _userWin = state.userWin
        ? parseInt(state.userWin, 10) + 1
        : 1
      }
      return {
        ...state,
        comWin: _comWin || state.comWin,
        userWin: _userWin || state.userWin
      }
    case 'RESET':
      return {};
  }
}

const App = (props) => {
  // 0 ~ 2
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);
  const selectRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, []);

  const runGame = (value) => {
    const items = ['가위', '바위', '보'];
    const randomIndex = Math.floor(Math.random() * items.length);
    setPick(items[randomIndex]);
    setMyPick(value);

    // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
  }

  useEffect(() => {
    let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
    // pick : 컴퓨터, myPick : 사용자가 클릭한 value
    if (pick === '가위') {
      if (myPick === '바위') _winner = 'user'
      if (myPick === '보') _winner = 'computer'
      if (myPick === '가위') _winner = 'none'
    } else if(pick === '바위' ) {
        if (myPick === '바위') _winner = 'none'
        if (myPick === '보') _winner = 'user'
        if (myPick === '가위') _winner = 'computer'
    } else if(pick === '보' ) {
        if (myPick === '바위') _winner = 'computer'
        if (myPick === '보') _winner = 'none'
        if (myPick === '가위') _winner = 'user'
    }

    // 기록을 해주는 로직을 추가한다.
    if (_winner) {
      setWinner(_winner);
      dispatch({ type: 'ADD', newGame: `${_winner}가 이겼습니다.(컴퓨터: ${pick} / 유저: ${myPick})` })
      dispatch({ type: 'RESULT', winner: _winner})
    }
  }, [pick, myPick])

  useEffect(() => {
    console.log('컴퓨터, ', pick);
    console.log('사용자, ', myPick);
    console.log('우승자, ', winner);
  }, [winner])

  const handleSelectChange = () => {
    const value = selectRef.current.value;
    runGame(value);
    console.log(value); // useRef는 리렌더링을 유발하지 않는다.
  }

  const { history, comWin, userWin } = state
  return (
    <>
      우승자 : {winner}
      <br/>
      컴퓨터 : {comWin || 0} / 유저 : {userWin || 0}
      <br/>
      <select ref={selectRef} onChange={handleSelectChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
      <button onClick={() => dispatch({type: 'RESET'})}>초기화</button>
      {
        history && history.map((h, index) => <h1 key={index}>{h}</h1> )
      }
    </>
  );
}

export default App;
```

 <br/>

## Graph QL - Graph + Query + Language <a id="d1"></a>

> GraphQL은 페이스북에서 만든 쿼리 언어이다.
>
> 모든 데이터를 그래프처럼 연결을 하여 한번의 Query Language로 원하는 값을 도출하는 것.

- REST API의 단점 : 원하는 데이터가 서로 엮어져 있을 때 게속해서 GET, POST 등의 통신을 이용해 원하는 데이터를 얻을 때까지 타고 타고 들어가는 현상.
- GraphQL은 1번의 요청으로 REST API의 단점을 보완할 수 있다.
- 쿼리를 사용한다.
- DSL: Domain Specific Language 사용 - GraphQL 사용가능한 언어

![kakaoTech](http://tech.kakao.com/files/graphql-mobile-api.png)

```json
// gql의 요청문
{
  hero {
  	name
	}
}

// 응답 내용
{
  "date" : {
    "hero" : {
      "name" : "R2-D2"
    }
  }
}
```

<br/>

### 디자인 vs DB <a id="d2"></a>

REST API는 모든 로직에 대해서 각각의 다른 주소를 가지고 있기 때문에 그만큼 `url`을 만들고 사용해야 한다.

`XML`은 `JSON`과 같은 데이터를 표현해줄 떄 사용한다. 다만 `XML`은 `JSON`이 표현하기 복잡한 데이터들을 표현해줄 떄 주로 이용한다.

Microsoft의 pptx, xmlx 같은 것도 `XML`이고, 공공기관의 API들도 `XML`을 주로 이용한다.

**REST API의 단점 예시**: 특정 유저가 작성한 모든 글을 가지고 오고 싶을 때. `/users/1`을 요청 할 경우, 여러가지 정보중 `article`에 대한 주소를 반환해준다. 그렇다면 또, `/article` 로 요청을 해서 `/users/1`에 대한 내용들을 가지고 와야한다. 즉, 일을 2번 해야되는데 GraphQL은 이러한 절차를 1번으로 줄여서 사용이 가능하다. 다시 얘기하면 받은 배열( { article: [1, 2, 3, 4, ...] }에 대해 다시 아티클을 계속 요청해야 하므로 퍼포먼스가 저하된다는 것.

<br/>

### Github api - GraphQL 실습 <a id="d3"></a>

준비사항

1. GitHub Page
2. 자기 프로필 
3. settings 
4. [Developer settings](https://github.com/settings/appshttps://github.com/settings/apps)
5. Personal access tokens
6. repo, read:packages, user, workflow 체크(외 사용할 것 있다면 더 체크)
7. Note 에 내용 적고 토큰생성

<br/>

#### [GraphiQL 다운로드](https://electronjs.org/apps/graphiql) <a id="d4"></a>

GraphiQL - 0.7.2.dmg 다운로드 하였음.

<br/>

#### Endpoint 설정 <a id="d5"></a>

https://api.github.com/graphql

Method는 `POST`로 한다.

`GraphQL`은 쿼리로 오직 `graphql` 만 작성하는데, GET을 할 경우, 쿼리 스트링이 엄청나게 길어지기 때문에 이를 방지하기 위함이다.

![001](https://user-images.githubusercontent.com/31315644/72229388-94ea6080-35f1-11ea-8f1b-d14f17d057fd.jpeg)

<br/>

#### HTTP Headers 설정 <a id="d6"></a>

Header name : Authorization

Header value : Bearer 토큰값 ( Bearer은 Header에 붙여주는 규칙같은 것 )

![GraphQL](https://user-images.githubusercontent.com/31315644/72228774-f5c36a00-35ec-11ea-9bac-8132a9220c8a.jpeg)

<br/>

#### 실습 

##### 기본 쿼리 보내기 <a id="d8"></a>

```jsx
{
	viewer {
		name
		url
	}
}
```

![003](https://user-images.githubusercontent.com/31315644/72229786-936e6780-35f4-11ea-9130-b0ad3b8c6eed.jpeg)

<br/>

##### 중복된 요청 시 네이밍 하기. <a id="d9"></a>

똑같은 요청을 여러번 보낼 때는 앞에 네이밍이 필요하다. (네이밍은 한개만 지어줘도 되나 둘 다 짓는 것을 권장)
```json
// 같은 요청을 두 번 보내면 에러 발생
{
  organization(login: "reactjs") {
    name
    url
  }
  organization(login: "react") {
    name
    url
  }
}

// 네이밍 (한개만 네이밍 지어줘도 된다.)
{
  reactjs: organization(login: "reactjs") {
    name
    url
  }
  react: organization(login: "react") {
    name
    url
  }
}
```

<img width="816" alt="004" src="https://user-images.githubusercontent.com/31315644/72229793-979a8500-35f4-11ea-9eff-ce10866f59d9.png">

<br/>

##### fragment 키워드를 이용하여 중복요소 합치기 <a id="d10"></a>

```json
{
  reactjs: organization(login : "reactjs") {
    ...sharedOrganizationFields
  }
  organization(login : "react") {
    ...sharedOrganizationFields  
  }
}

fragment sharedOrganizationFields on Organization {
  name
  url
}
```

![005](https://user-images.githubusercontent.com/31315644/72229790-9406fe00-35f4-11ea-8ee2-ca577fe69200.jpeg)

<br/>

##### QUERY , MUTATION <a id="d11"></a>

- 일반 DB의 query : CRUD(CREATE READ UPDATE DELETE)
- GraphQL의 query : READ - 데이터 조회 기능
- GraphQL의 mutation : CREATE UPDATE DELETE - 데이터 조회를 제외한 나머지 기능

**쿼리문에 변수를 넣을 수 있으며 이로 인해 불필요한 중복을 줄일 수 있음**

- 쿼리의 타입은 백엔드에서 알려줄 것
- String 뒤 !가 반드시 오거나, 명시적으로 초기화 해주어야 한다. (예: String! 또는 String = "reactjs")
- $는 변수를 생성하기 위한 키워드

```json
// 변수로 했을 경우, 타입은 무조건 있어야 한다.
// !는 해당 데이터 타입을 강제로 고정 하는 것. 
// $는 변수를 생성하기 위한 키워드
query ($organization: String!) { 
  organization(login : $organization) {
    name
    url
  }
}

// QUERY VERIABLES
{
  "organization": "reactjs"
}
```

![006](https://user-images.githubusercontent.com/31315644/72229787-936e6780-35f4-11ea-8006-b8419e825868.jpeg)

<br/>

**QUERY VERIABLES를 작성하지 않고 기본으로 다음처럼 넘겨줄수 있다.**

```json
// QUERY VERIABLES를 작성하지 않고 기본으로 다음처럼 넘겨줄수 있다.
query ($organization: String = "reactjs") { 
  organization(login : $organization) {
    name
    url
  }
}
```

![007](https://user-images.githubusercontent.com/31315644/72229788-9406fe00-35f4-11ea-9869-424a0f8aa820.jpeg)