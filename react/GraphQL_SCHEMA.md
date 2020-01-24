![GraphQL_SCHEMA](https://user-images.githubusercontent.com/31315644/72286159-ed6c3d00-3687-11ea-9441-b2e4ede55c9e.png)

--------------

## Graph QL - SCHEMAS & TYPES -

- SCHEMAS & TYPES
  - [타입 시스템 Type system](#a1)
  - [타입 언어 Type Language](#a2)
  - [객체 타입과 필드](#a3)
  - [인자 Arguments](#a4)
  - [쿼리 타입 & 뮤테이션 타입 The Query and Mutation Types](#a5)
  - [스칼라 타입 Scalar Types](#a6)
  - [열거형 타입 Enumeration Types](#a7)
  - [리스트와 Non-Null / Lists and Non-Null](#a8)
  - [인터페이스 Interfaces](#a9)
  - [유니온 타입 Union Types](#a10)
  - [입력 타입 Input Types](#a11)

<br/>

------

# SCHEMAS & TYPES

- 스키마를 설계하는 것은 백엔드 개발자의 몫. 

  (회사마다 다르지만, 보통의 경우 백엔드 개발자가 담당함. 예외의 경우에 대비하여 학습한다.)

- GraphQL 타입 시스템과 데이터를 표현하는 방법을 익힌다.

- GraphQL은 어떠한 백엔드 프레임워크나 프로그래밍 언어든 함께 사용할 수 있다.

<br/>

### 타입 시스템 Type system <a id="a1"></a>

> GraphQL 쿼리 언어는 기본적으로 객체의 필드를 선택한다.

```graphql
{
  hero {
    name
    appearsIn
  }
}
##############
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```

1. `root` 객체로 시작.
2. `hero` 필드를 선택.
3. `hero` 에 의해 반환된 객체에 대해 `name` 과 `appearIn` 필드를 선택.

GraphQL 쿼리의 형태가 결과와 거의 일치하기 때문에 서버에 대해 모르는 상태에서 쿼리가 반환할 결과를 예측할 수 있다. 하지만 서버에 요청할 수 있는 데이터에 대한 정확한 표현을 갖는 것이 좋다. 어떤 필드를 선택할 수 있는지, 어떤 종류의 객체를 반환할 수 있는지, 하위 객체에서 사용할 수 있는 필드는 무엇인지, 이것이 바로 스키마가 필요한 이유이다.

모든 GraphQL 서비스는 해당 서비스에서 쿼리 가능한 데이터들을 완벽하게 설명하는 타입들을 정의하고, 쿼리가 들어오면 해당 스키마에 대해 유효성이 검사된 후 실행된다.

<br/>

### 타입 언어 Type Language <a id="a2"></a>

- GraphQL 서비스는 어떤 언어로든 작성할 수 있다. 
- `GraphQL 스키마 언어(GraphQL schema language)` 를 사용할 것. 
- 이것은 쿼리 언어와 비슷하며, GraphQL 스키마를 언어에 의존적이지 않은 방식으로 표현할 수 있게 해준다.

<br/>

### 객체 타입과 필드 Object Types and Fields <a id="a3"></a>

> GraphQL 스키마의 가장 기본적인 구성 요소는 객체 타입. 
>
> 객체 타입은 서비스에서 가져올 수 있는 객체의 종류와 그 객체의 필드를 나타낸다. 
>
> GraphQL 스키마 언어에서는 다음과 같이 표현할 수 있다.

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

- `Character` 는 *GraphQL 객체 타입*이다. 즉, 필드가 있는 타입을 의미한다. 스키마의 대부분의 타입은 객체 타입이다.
- `name` 과 `appearIn` 은 `Character` 타입의 *필드*. 즉 `name` 과 `appearIn` 은 GraphQL 쿼리의 `Character` 타입 어디서든 사용할 수 있는 필드를 의미한다.
- `String` 은 내장된 *스칼라* 타입 중 하나. 이는 스칼라 객체로 해석되는 타입이며 쿼리에서 하위 선택을 할 수 없다.
- `String!` 은 필드가 *non-nullable* 임을 의미. 즉, 이 필드를 쿼리할 때 GraphQL 서비스가 항상 값을 반환한다는 것을 의미. 타입 언어에서는 이것을 느낌표로 나타냅니다.
- `[Episode]!` 는 `Episode` 객체의 *배열(array)* 을 나타낸다. 또한 *non-nullable* 이기 때문에 `appearIn` 필드를 쿼리할 때 항상(0개 이상의 아이템을 가진) 배열을 기대할 수 있다.

<br/>

### 인자 Arguments <a id="a4"></a>

> GraphQL 객체 타입의 모든 필드는 0개 이상의 인수를 가질 수 있다.(예: 아래 `length` 필드).

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

모든 인수에는 이름이 있다. 함수가 순서있는 인자를 가져오는 JavaScript나 Python과 같은 언어와 달리 GraphQL의 모든 인자는 특별한 이름으로 전달된다.(즉, 객체식) 이 경우, `length` 필드는 하나의 인자 `unit` 을 가진다.

- 인자는 필수거나 옵셔널일 수 있다. 
  - 인자가 옵셔널인 경우 *기본값* 을 정의할 수 있다.
  -  `unit` 인자가 전달되지 않으면 기본적으로 `METER` 로 설정된다.

<br/>

### 쿼리 타입 & 뮤테이션 타입 The Query and Mutation Types <a id="a5"></a>

> 스키마 대부분의 타입은 일반 객체 타입이지만 스키마 내에는 특수한 두 가지 타입이 있다.

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

모든 GraphQL 서비스는 `query` 타입을 가지며 `mutation` 타입은 가질 수도 있고 가지지 않을 수도 있다. 

이러한 타입은 일반 객체 타입과 동일하지만 모든 GraphQL 쿼리의 *진입점(entry point)* 을 정의하므로 특별하다. 따라서 다음과 같은 쿼리를 볼 수 있다.

```
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
####################################
{
  "data": {
    "hero": {
      "name": "R2-D2"
    },
    "droid": {
      "name": "C-3PO"
    }
  }
}
```

즉, GraphQL 서비스는 `hero` 및 `droid` 필드가 있는 `Query` 타입이 있어야한다.

```graphql
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

뮤테이션도 비슷한 방식으로 작동한다. 즉, `Mutation` 타입의 필드를 정의하면 쿼리에서 호출할 수 있는 루트 뮤테이션 필드로 사용할 수 있다.

스키마에 대한 `진입점` 이라는 특수한 점 이외의 쿼리 타입과 뮤테이션 타입은 다른 GraphQL 객체 타입과 동일하며 해당 필드는 정확히 동일한 방식으로 작동한다는 점을 기억하자.

<br/>

### 스칼라 타입 Scalar Types <a id="a6"></a>

> GraphQL 객체 타입은 이름과 필드를 가지지만, 어떤 시점에서 이 필드는 구체적인 데이터로 해석되어야한다. 
>
> 이것이 스칼라 타입이 필요한 이유. 즉, 쿼리의 끝을 나타낸다.

다음 쿼리에서 `name` 과 `appearIn` 은 스칼라 타입으로 해석될 것이다.

```graphql
{
  hero {
    name
    appearsIn
  }
}
#########################################
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```

해당 필드에 하위 필드가 없기 때문에 이를 알 수 있다. 이 필드는 쿼리의 끝부분이다.

GraphQL 에서는 스칼라 타입들이 기본 제공된다.

- `Int`: 부호가 있는 32비트 정수.
- `Float`: 부호가 있는 부동소수점 값.
- `String`: UTF-8 문자열.
- `Boolean`: `true` 또는 `false`.
- `ID`: ID 스칼라 타입은 객체를 다시 요청하거나 캐시의 키로써 자주 사용되는 고유 식별자를 나타낸다. ID 타입은 String 과 같은 방법으로 직렬화되지만, `ID` 로 정의하는 것은 사람이 읽을 수 있도록 하는 의도가 아니라는 것을 의미함.

대부분의 GraphQL 구현에는 커스텀 스칼라 타입을 지정하는 방법이 있다. 예를 들면, `Date` 타입을 정의할 수 있다.

```graphql
scalar Date
```

해당 타입을 직렬화, 역 직렬화, 유효성 검사하는 방법을 구현할 수 있다. 예를 들어, `Date` 타입을 항상 정수형 타임스탬프로 직렬화해야 한다는 것을 지정할 수 있다. 그리고 클라이언트는 모든 날짜 필드에 대해 해당 타입을 기대할 수 있을 것이다.

<br/>

### 열거형 타입 Enumeration Types <a id="a7"></a>

> *Enums* 라고도 하는 열거형 타입은 특정 값들로 제한되는 특별한 종류의 스칼라이다. 

1. 타입의 인자가 허용된 값 중 하나임을 검증한다.
2. 필드가 항상 값의 열거형 집합 중 하나가 될 것임을 타입 시스템을 통해 의사소통한다.

GraphQL 스키마 언어에서 열거형 타입 정의 ▾

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

즉, 스키마에서 `Episode` 타입을 사용할 때마다 정확히 `NEWHOPE`, `EMPIRE`, `JEDI` 중 하나일 것이다.

다양한 언어로 작성된 GraphQL 서비스 구현은 열거형 타입을 처리 할 수 있는 언어별 고유한 방법을 갖는다. `enum` 을 지원하는 언어에서는 구현시 이를 활용할 수 있다. 열거형 타입이 없는 JavaScript와 같은 언어에서 이러한 값은 내부적으로 정수 집합에 매핑될 수 있다. 하지만 이러한 세부 정보는 클라이언트에 노출되지 않으며, 열거형 값의 문자열로만 작동한다.

<br/>

### 리스트와 Non-Null / Lists and Non-Null <a id="a8"></a>

> 스키마의 다른 부분이나 쿼리 변수 선언에서 타입을 사용하면 해당 값의 유효성 검사를 할 수 있는 *타입 수정자(type modifiers)* 를 적용할 수 있다.
>
> 즉 특정 타입에 대해서 null에 대한 유효성 검사를 적용할 수 있다.

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

`String` 타입을 사용하고 타입 뒤에 느낌표 `!` 를 추가하여 *Non-Null* 로 표시했다. 즉, 서버는 항상 이 필드에 대해 null이 아닌 값을 반환할 것을 기대하며, null값이 발생되면 GraphQL 실행 오류가 발생하고, 클라이언트에게 무언가 잘못되었음을 알린다.

Non-Null 타입 수정자는 필드에 대한 인자를 정의할 때도 사용할 수 있다. 이는 GraphQL 서버가 문자열이나 변수 상관없이 null 값이 해당 인자로 전달되는 경우, 유효성 검사 오류를 반환하게 한다.

```graphql
query DroidById($id: ID!) {
  droid(id: $id) {
    name
  }
}
# VARIABLES
{
  "id": null
}
#######################################
{
  "errors": [
    {
      "message": "Variable \"$id\" of required type \"ID!\" was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 17
        }
      ]
    }
  ]
}
```

리스트도 비슷한 방식으로 동작한다. 타입 수정자를 사용하여 타입을 `List` 로 표시할 수 있다. 이 필드는 해당 타입의 배열을 반환한다. 스키마 언어에서, 배열을 대괄호 `[]` 로 묶는 것으로 표현된다. 유효성 검사 단계에서 해당 값에 대한 배열이 필요한 인자에 대해서도 동일하게 작동한다.

Non-Null 및 List 수정자를 결합할 수도 있다. 예를 들면, Null이 아닌 문자열 리스트를 가질 수 있다.

```graphql
myField: [String!]
```

즉, *list* 자체는 null 일 수 있지만, null 을 가질 수 없다. 예를 들면,

```js
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```

null 이 아닌 문자열 리스트를 정의했다고 가정해자.

```graphql
myField: [String]!
```

목록 자체는 null 일 수 없지만, null 값을 포함할 수 있다.

```js
myField: null // error
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```

필요에 따라 여러개의 Null, List 수정자를 중첩할 수 있다.

<br/>

### 인터페이스 Interfaces <a id="a9"></a>

> 여러 타입 시스템과 마찬가지로 GraphQL도 인터페이스를 지원한다. 
>
> *인터페이스* 는 이를 구현하기 위해 타입이 포함해야하는 특정 필드들을 포함하는 추상 타입이다.
>
> Java의 인터페이스와는 다르게 GraphQL의 인터페이스는 상속받는 타입들이 해당 인터페이스를 모두 작성해야만 한다. 즉, Java의 인터페이스는 중복회피로 사용되었다면, GraphQL의 인터페이스는 반드시 사용되어야한다는 조건을 사용된다.

예를 들면, Star Wars 3부작의 모든 캐릭터들을 표현하는 `Character` 인터페이스를 가질 수 있다.

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

이것은 `Character` 를 *구현한(implements)* 모든 타입은 이러한 인자와 리턴 타입을 가진 정확한 필드를 가져야한다는 것을 의미한다.

다음은 `Character` 를 구현한 몇 가지 타입 예제이다.

```graphql
# 위 Character 인터페이스를 모두 상속받았지만, 전부 인터페이스 내용이 작성되었다.
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

두 타입 모두 `Character` 인터페이스의 모든 필드를 가지고 있다. 또한 특정 캐릭터에 추가 필드 `totalCredits`,`starships`, `primaryFunction` 을 가질 수도 있다.

인터페이스는 객체나 객체리스트를 반환하려는 경우에 유용하지만, 다양한 다른 타입이 있을 수도 있다.

예를 들면, 다음 쿼리는 오류를 반환한다.

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    primaryFunction
  }
}
# VARIABLES
{
  "ep": "JEDI"
}
########################
{
  "errors": [
    {
      "message": "Cannot query field \"primaryFunction\" on type \"Character\". Did you mean to use an inline fragment on \"Droid\"?",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ]
    }
  ]
}
```

`hero` 필드는 `Character` 타입을 반환하는데, `episode` 인자에 따라 `Human`, `Droid` 중 하나일 수 있다. 위 쿼리는 `primaryFunction` 을 포함하지 않는 `Character` 인터페이스에 존재하는 필드만 요청할 수 있다.

특정 객체 타입의 필드를 요청하려면 인라인 프래그먼트을 사용해야한다.

```graphql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
# VARIABLES
{
  "ep": "JEDI"
}
####################################################3
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

쿼리 가이드의 [인라인 프래그먼트](https://graphql-kr.github.io/learn/queries/#inline-fragments) 장을 참조.

<br/>

### 유니온 타입 Union Types <a id="a10"></a>

> 유니온 타입은 인터페이스와 매우 유사하지만, 타입 간에 공통 필드를 특정하지 않는다.

```graphql
union SearchResult = Human | Droid | Starship
```

스키마에서 `SearchResult` 타입을 반환 할 때마다, `Human`, `Droid`, `Starship` 을 얻을 수 있다. 유니온 타입의 멤버는 구체적인 객체 타입이어야 한다. 인터페이스나 유니온 타입에서 다른 유니온 타입을 사용할 수 없다.

이 경우, `SearchResult` 유니언 타입을 반환하는 필드를 쿼리하면, 어떤 필드라도 쿼리할 수 있는 조건부 프래그먼트를 사용해야한다.

```graphql
{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
##################################
{
  "data": {
    "search": [
      {
        "name": "Han Solo",
        "height": 1.8
      },
      {
        "name": "Leia Organa",
        "height": 1.5
      },
      {
        "name": "TIE Advanced x1",
        "length": 9.2
      }
    ]
  }
}
```

```JSX
// APOLLO 에서 다음과 같이 사용된다.
const { gql } = require('apollo-server');

const typeDefs = gql`
  union Result = Book | Author

  type Book {
    title: String
  }

  type Author {
    name: String
  }

  type Query {
    search: [Result]
  }
`;
```

<br/>

### 입력 타입 Input Types <a id="a11"></a>

지금까지는 열거형 타입이나 문자열과 같은 스칼라 값을 인자로 필드에 전달하는 방법에 대해서만 설명했다. 하지만 복잡한 객체도 쉽게 전달할 수 있다. 이는 뮤테이션에서 특히 유용하다. **뮤테이션은 생성될 전체 객체를 전달하고자 할 수 있다.** GraphQL 스키마 언어에서 입력 타입은 일반 객체 타입과 같지만, `type` 대신 `input` 을 사용한다.(통신 메소드같은 느낌)

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

뮤테이션에서 입력 객체 타입을 사용하는 방법.

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
# VARIABLES
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
#######################################
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

입력 객체 타입의 입력란은 입력 객체 타입을 참조할 수 있지만, 입력 및 출력 타입을 스키마에 혼합할 수는 없다.
또한 필드에 인자를 가질 수 없다.

<br/>