![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 17

- React 순서 되짚어 보기
- [GraphQL](#a1)
  - 필드
  - 필드 - 객체 참조
  - aliases
  - Fragments
  - QUERY 와 MUTATION
  - 오브젝트 타입과 필드
  - 리스트 내부 필수
  - 리스트 외부 필수
  - 스칼라 타입
  - enumeration types
  - interfaces
- ApolloQL을 사용한 GraphQL 실습
  - GraphQL을 활용 할 수 있게 도와주는 다양한 라이브러리들
  - Apollo GraphQL 사용이유
  - Npm 설치
  - Apollo Boost
  - QUERY, MUTATION 사용

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- Graph QL 
- Apollo

<br/>

---

## React 순서 되짚어 보기

- 상태를 업데이트할 경우, 리렌더링 ->  Hook함수를 다 돈 후에 리렌더링한다.
  - 만약, 상태 업데이트 부분이 Hook함수에 포함되어있다면, 모든 Hook을 다 돈 후 리렌더링 -> Hook함수를 돈다. 
- **상태 업데이트 반영은 해당 사이클에 바로 반영되지는 않는다. 다음 사이클에 반영이 된다.**

```jsx
import React, 
{ 
  useState, 
  useEffect,
  useRef 
} from 'react';
// ver. 1
function Game() {
  console.log('1. load');
  const [pick, setPick] = useState('');
  const [myPick, setMyPick] = useState('');
  const [winner, setWinner] = useState('');
  const selRef = useRef(null); // ver. 2
  const runGame = val => {
    const items = ['가위', '바위', '보'];
    const ranIdx = Math.floor(Math.random() * items.length);
    setPick(items[ranIdx]);
    setMyPick(val);
  };
  useEffect(() => {
    console.log('3. useEffect1')
    let _winner;
    if (pick === '가위') {
      if (myPick === '가위') _winner = 'none';
      if (myPick === '바위') _winner = 'you';
      if (myPick === '보') _winner = 'com';
    } else if (pick === '바위') {
      if (myPick === '가위') _winner = 'com';
      if (myPick === '바위') _winner = 'none';
      if (myPick === '보') _winner = 'you';
    } else {
      if (myPick === '가위') _winner = 'you';
      if (myPick === '바위') _winner = 'com';
      if (myPick === '보') _winner = 'none';
    }
    setWinner(_winner);
  }, [pick, myPick]);
  useEffect(() => {
    console.log('4. useEffect2')
    console.log('winner is ' + winner);
  }, [winner]);
  const handleSelChange = () => {
    const val = selRef.current.value;
    runGame(val);
    console.log(val);
  }
  // 1 2 3 4 1 2
  
  return (
    <>
      {winner}
      {(() => console.log('2. render'))()}
      <select ref={selRef} onChange={handleSelChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
    </>
  );
}
export default Game;
```

<br/>

## [GraphQL](https://graphql.org/learn/) <a id="a1"></a>

만들어진 이유.

- RESTful API 로는 다양한 기종에서 필요한 정보들을 일일히 구현하는 것이 힘들다.
- 예로, iOS 와 Android 에서 필요한 정보들이 조금씩 달랐고, 그 다른 부분마다 API 를 구현하는 것이 힘들다.
- 특정 필드에 대해서 정확히 요청하고 기대한 결과를 얻을 수 있다.

```graphql
// (백엔드에서 작성된 내용)
type Query {
	me : User
}

type User {
	id : ID
	name : String 
}
```

`type` : 변수, 쿼리명을 만들기 위한 키워드
`Query` : 커스텀명
`ID`, `String`은 기본으로 내장된 Scala Type이다.

<br/>

#### 필드

`GraphQL`은 객체에 대한 특정 필드를 요청하는 것이 무척 간단하다. 
아주 간단한 쿼리를 실행하여 얻는 결과를 살펴 보자.

```grapql
{
  hero {
    name
  }
}

#################################
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

쿼리와 결과가 정확히 동일한 형태인 것을 볼 수 있다. 이것이 GraphQL의 핵심이다.
`name` 필드는 `String` 타입을 반환합니다. 여기서는 스타워즈의 영웅이름인 `"R2-D2"` 를 반환했다.

<br/>

#### 필드 - 객체 참조

앞의 예제에서는 `String` 타입인 영웅의 이름만 요청했지만 필드는 객체를 참조할 수도 있다. 
이 경우 해당 객체에 대한 필드를 *하위 선택*할 수 있다. GraphQL 쿼리는 연관된 객체와 필드를 탐색 할 수 있으므로 클라이언트는 기존 REST 구조처럼 여러번 요청을 수행하는 대신 한번의 요청으로 많은 데이터를 가져올 수 있다.

추가로, `#`을 이용해 주석을 달 수도 있다.

```graphql
{
  hero {
    name
    # 쿼리에 주석을 쓸 수도 있습니다!
    friends {
      name
    }
  }
}
############################################
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

위 예제에서, `friends` 필드는 배열을 반환한다.

GraphQL 쿼리는 단일 아이템이나 배열에 대해 모두 동일해 보이지만 스키마를 기반으로 예상되는 결과를 알 수 있다.

<br/>

#### 인자

객체와 필드를 탐색할 수 있는 것만으로도 GraphQL은 이미 데이터를 가져오는데 굉장히 유용한 언어가 된다.

하지만 필드에 인자를 전달하는 기능을 추가하면, 훨씬 다양한 일을 할 수 있다.

```graphql
{
  human(id: "1000") { # 인자를 추가한 부분
    name
    height
    friends{
      name
    }
  }
}
##########################################
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72,
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    }
  }
}
```

<br/>

REST에서는 요청에 쿼리 파라미터와 URL 세그먼트같은 단일 인자들만 전달할 수 있다. 

하지만 GraphQL에서는 모든 필드와 중첩된 객체가 인자를 가질 수 있으므로 GraphQL은 여러번의 API fetch를 완벽하게 대체할 수 있다. 필드에 인자를 전달하면, 모든 클라이언트에서 개별적으로 처리하는 대신 서버에서 데이터 변환을 한 번만 구현할 수도 있다.

```
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
##################################################
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      " lheight": 5.6430448
    }
  }
}
```

인자는 다양한 타입이 될 수 있습니다. 위 예제에서는 열거형(`Enumeration`) 타입을 사용했다. 이 타입은 다양한 옵션들 (이 경우에는 길이 단위 `METER`, `FOOT`) 중 하나를 나타낸다. GraphQL은 기본 타입과 함께 제공되지만, GraphQL 서버는 데이터를 직렬화 할 수 있는 한 직접 커스텀 타입을 선언할 수도 있다.

<br/>

#### aliases

```graphql
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
######################################
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

위 예제에서 두 `hero` 필드는 서로 충돌하지만, 서로 다른 이름의 별칭을 지정할 수 있으므로 한 요청에서 두 결과를 모두 얻을 수 있다.

<br/>

#### Fragments

중복된 필드들을 다음과 같이 이용하여 중복을 피할 수 있다.

프래그먼트 개념은 복잡한 응용 프로그램의 데이터 요구사항을 작은 단위로 분할하는데 사용된다.

청크가 다른 여러 UI 구성 요소를 하나의 초기 데이터 fetch로 통합해야하는 경우에 많이 사용된다.

```graphql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

<br/>

#### QUERY 와 MUTATION

- 일반적인 DB는 "QUERY" 문 - CRUD : CREATE, READ, UPDATE, DELETE

- GraphQL의 "QUERY" - READ (QUERY는 생략이 가능하다.)
- GraphQL의 "MUTATION" - CREATE, UPDATE, DELETE

gql에서는 굳이 쿼리와 뮤테이션을 나누는데 내부적으로 들어가면 사실상 이 둘은 별 차이가 없다. 

쿼리는 데이터를 읽는데(R) 사용하고, 뮤테이션은 데이터를 변조(CUD) 하는데 사용한다는 개념 적인 규약을 정해 놓은 것.

<br/>

- `@include(if: Boolean)`인수가  `true`인 경우의 필드 만 포함.
- `@skip(if: Boolean)` 인수가 `true`인 경우의 필드를 건너 띔.

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

```json
{
  "episode": "JEDI",
  "withFriends": false
}
```

<br/>

#### 오브젝트 타입과 필드

```graphql
// 백엔드
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

- 오브젝트 선언 : type
- 오브젝트 타입(커스텀명) : Character
- 필드 : name, appearsIn
- 스칼라 타입 : String, ID, Int 등 
- 느낌표(!) : 필수 값을 의미(non-nullable)
- 대괄호([, ]) : 배열을 의미(array)

<br/>

#### 리스트 내부 필수

`myField1` : List안에 있는 데이터 만 가지고 검사를 한다. 즉, 리스트 중 1개만이라도 null일 경우 에러가 난다.

```
myField1: [String!]
```

```json
myField1: null // valid
myField1: [] // valid
myField1: ['a', 'b'] // valid
myField1: ['a', null, 'b'] // error
```

<br/>

#### 리스트 외부 필수

`myField2`: List 자체를 검사한다. 즉, 리스트 자체가 null이면 안된다. 리스트들 중 몇개가 null이어도 괜찮다.

```json
myField2: [String]!
```

```json
myField2: null // error
myField2: [] // valid
myField2: ['a', 'b'] // valid
myField2: ['a', null, 'b'] // valid
```

<br/>

#### 스칼라 타입

하위 요소 없이 단일 데이터 자체만 가지고 있는 경우.

배열은 하위 요소가 아니다. 객체 형식의 필드와 값을 가지고 있는 것을 하위 요소라고 함.

하위 필드 값을 가지고 있는 것들은 스칼라 타입이라고 부를 수 없음.

<br/>

#### enumeration types

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

`enum` 제시 타입중 하나의 타입으로 정의하게 하는 것. (위 예제에서는 3개중 하나)

 <br/>

#### interfaces

공통으로 쓸 내용을 interface로 빼 두고, 상속을 시켜줄 수 있다.

단, Java처럼 interface 필드 내용을 그대로 가져와서 쓰는게 아니라 상속받는 타입에서도 interface의 필드 내용을 모두 적어줘야한다.

즉, GraphQL에서는 interface의 내용을 모두 사용하게끔 강요 하는 것이다.

일반적으로 필드 네임은 그대로 유지해야하고, 값은 바꿀수 있다.

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}:
```

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

<br/>

### ApolloQL을 사용한 GraphQL 실습

#### GraphQL을 활용 할 수 있게 도와주는 다양한 라이브러리들

gql 자체는 쿼리 언어이다. 이것 만으로는 할 수 있는 것이 없다. gql을 실제 구체적으로 활용 할 수 있도록 도와주는 라이브러리들이 몇가지 존재 하는데, gql 자체는 개발 언어와 사용 네트워크에 완전히 독립적이다. 

대표적인 gql 라이브러리인 relay는 GraphQL의 어머니인 Facebook이 만들었다. 

하지만, relay는 스키마와 쿼리에 대한 제약이 너무 심한 나머지, 공식 라이브러리에도 불과하고 **Apollo graphql** 보다 많이 사용되지는 않는다.

<br/>

#### Apollo GraphQL 사용이유

Apollo를 사용하는 가장 큰 이유는 GraphQL이 캐시를 별도로 처리를 못하기 때문이다.

>  캐쉬란? 데이터를 저장해놔서 빠르게 사용할 수 있도록 임의 보관하는 것.

예를들어, `/user/details` `/user/articles` 와 같이 REST API는 요청이 명시적으로 분리되어 있기에 캐쉬화를 할 수 있지만, `/graphql` 은 분리화가 안되어 있기 때문에 캐쉬화가 거의 불가능하다. (Apollo를 사용한다 해서 브라우저에서 캐시화하는 것이 아니다.)

즉, REST API 는 캐쉬에 대한 문제가 거의 없지만, GraphQL은 단일 주소 `/graphql`로 요청을 하기 때문에 브라우저 단에서 캐쉬화가 불가능하다.

캐쉬-인메모리 : **캐쉬데이터를 RAM에 저장해주는 것.** 백엔드에서 DB 조회를 하는 행위는 1번만 이루어지게 하고, 그 후부터는 다른 사용자가 같은 조회를 할 경우 **DB 접속 없이 RAM에서 데이터를 가져오게끔 하는 것.** ( 캐쉬 데이터를 빠르게 접근하기 위해서 RAM에다 데이터를 저장한다. - 휘발성 데이터 )

<br/>

#### Npm 설치

```jsx
npm i apollo-client apollo-cache-inmemory apollo-link-http graphql graphql-tag react-apollo
```

- `apollo-client` : Apollo에서 제공해주는 GraphQL 클라이언트 관련 라이브러리.
- `apollo-cache-inmemory` `apollo-link-http`는 Apollo에서 제공하는 GraphQL 클라이언트 관련 라이브러리.
- `graphql` : Facebook에 정의한 GraphQL 스팩을 JavaScript 언어로 구현한 패키지
- `graphql-tag` : GraphQL 쿼리를 파싱해주는 템플릿 리터럴 태그.
- `react-apollo` : React 앱에 Apollo Client를 연결(Integration)해주는 패키지

<br/>

#### Apollo Boost

위 NPM 설치 과정 중 `apollo-client`, `chche-inmemory`,` apollo-link-http` 를 포함하고 있는 아주 고마운 패키지.

- `Apollo Boost` : Graph QL 클라이언트를 가지기 위한 셋팅을 전부 해준다.

```jsx
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache()
const GITHUB_BASE_URL = 'https://api.github.com/graphql'

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  request: operation => {
    operation.setContexty({
      headers : {
        authorization : `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
      }
    })
  },
  cache
})
```

<br/>

#### QUERY, MUTATION 사용

```graphql
npm i @apollo/react-hooks
```

- 아폴로에서 쿼리와 뮤테이션을 처리할 수 있도록 만든 모듈.
- 클래스 기반의 프로젝트일 경우 query 컴포넌트 형태로 쓰면 되고, 훅 기반일 경우 @apollo/react-hooks의 모듈을 사용한다.
- 쿼리와 뮤테이션 작성은 대문자로 한다.

**QUERY**

```JSX
import gql from 'graphql-tag'

const reposQuery = gql`
query Myrepositories{
    viewer {
    repositories(first:5) {
      edges {
        node {
          id
          name
          stargazers{
          totalCount
        }
          viewerHasStarred
        }
      }
    }
  }
}
`
const userQuery = gql` {
  viewer {
    name
    email
  }
}`
export { reposQuery, userQuery };
```

**MUTATION**

```jsx
import { gql } from 'graphql-tag'
const ADD_STAR = gql`
mutation AddStar($repoid:ID!){
  addStar(input:{starrableId:$repoid}){
    # 리턴할 값 명시
    starrable{
      stargazers{
        totalCount
      }
      viewerHasStarred
    }
  }
}`
const REMOVE_STAR = gql`
mutation RemoveStar($repoid:ID!){
  removeStar(input:{starrableId:$repoid}){]
    # 리턴할 값 명시
    starrable{
      stargazers{
        totalCount
      }
      viewerHasStarred
    }
  }
}`
export { ADD_STAR, REMOVE_STAR };
```

<br/>

