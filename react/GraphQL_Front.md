![GraphQL_QM](https://user-images.githubusercontent.com/31315644/72286161-ed6c3d00-3687-11ea-99a7-6a8112ef8b50.png)

--------------

## Graph QL - QUERY , MUTATION -

- QUERY , MUTATION
  - [필드 Fields](#a1)
  - [인자 Arguments](#a2)
  - [별칭 Aliases](#a3)
  - [프래그먼트 Fragments](#a4)
    - [프래그먼트 내에서 변수 사용하기 Using variables inside fragments](#a5)
  - [작업 이름 Operation name](#a6)
  - [변수  Variables](#a7)
    - [변수 정의 Variable definitions](#a8)
    - [변수 기본값 Default variables](#a9)
  - [지시어 Directives](#a10)
  - [뮤테이션 Mutations](#a11)
    - [뮤테이션의 다중 필드  Multiple fields in mutations](#a12)
  - [인라인 프래그먼트  Inline Fragments](#a13)
  - [메타 필드  Meta fields](#a14)

<br/>

------

# QUERY , MUTATION

- 서버에 쿼리하는 방법들을 소개하는 기술서.
- 모든 예제는 [GraphQL 공식홈페이지](https://graphql.org/)를 참조하였다.
- 모든 예제의 `###`을 구분으로 위는 쿼리 요청 , 아래는 쿼리 응답

<br/>

### 필드 Fields <a id="a1"></a>

> 객체에 대한 특정 필드를 요청하기.

GraphQL 쿼리는 연관된 객체와 필드를 탐색 할 수 있으므로 클라이언트는 기존 REST 구조처럼 여러번 요청을 수행하는 대신 한번의 요청으로 많은 데이터를 가져올 수 있다.

GraphQL에서 쿼리 내부의 주석으로 `#` 을 이용할 수 있다.

```graphql
{
  hero {
    name
  }
}
##############
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

<br/>

### 인자 Arguments  <a id="a2"></a>

> 필드에 인자를 전달하는 기능을 추가하여, 훨씬 다양한 일을 할 수 있다.

REST와 같은 시스템에서는 요청에 쿼리 파라미터와 URL 세그먼트같은 단일 인자들만 전달할 수 있다. 하지만, GraphQL에서는 모든 필드와 중첩된 객체가 인자를 가질 수 있으므로 GraphQL은 여러번의 API fetch를 완벽하게 대체할 수 있다.

필드에 인자를 전달하면, 모든 클라이언트에서 개별적으로 처리하는 대신 서버에서 데이터 변환을 한 번만 구현할 수도 있다.

```graphql
{
  human(id: "1000") {
    name
    height
    # height(unit:METER)
  }
}
###########
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 1.72
    }
  }
}
```

<br/>

### 별칭 Aliases <a id="a3"></a>

> 중복된 필드의 이름을 방지하고자 할 때 사용.

1. 한 요청에 서로 다른 인자를 통해 결과를 얻고자 할 때.
2. 한 요청에 같은 이름의 필드가 반복될 때

```graphql
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
####################
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

### 프래그먼트 Fragments <a id="a4"></a>

> 재사용 가능한 필드를 정의

프래그먼트를 사용하면 필드셋을 구성한 다음 필요한 쿼리에 포함시킬 수 있다. 

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
#######################
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
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
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
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

필드가 반복될 경우 위 쿼리가 꽤 반복될 것을 알 수 있다. 프래그먼트 개념은 복잡한 응용 프로그램의 데이터 요구사항을 작은 단위로 분할하는데 사용된다. 특히 청크가 다른 여러 UI 구성 요소를 하나의 초기 데이터 fetch로 통합해야하는 경우에 많이 사용된다.

<br/>

#### 프래그먼트 내에서 변수 사용하기 Using variables inside fragments <a id="a5"></a>

> 변수($로 선언된)를 프래그먼트에서 사용할 수 있다. 

쿼리나 뮤테이션에 선언된 변수는 프래그먼트에 접근할 수 있다.

```graphql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
####################
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "friendsConnection": {
        "totalCount": 4,
        "edges": [
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          },
          {
            "node": {
              "name": "C-3PO"
            }
          }
        ]
      }
    },
    "rightComparison": {
      "name": "R2-D2",
      "friendsConnection": {
        "totalCount": 3,
        "edges": [
          {
            "node": {
              "name": "Luke Skywalker"
            }
          },
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          }
        ]
      }
    }
  }
}
```

<br/>

### 작업 이름 Operation name <a id="a6"></a>

> 좋아하는 프로그래밍 언어의 함수명처럼 쿼리의 작업명을 지정할 수 있다.

지금까지는 `query` 키워드와 `query` 이름을 모두 생략 한 단축 문법을 사용했지만, 실제 애플리케이션에서는 코드를 덜 헷갈리게 작성하는 것이 좋다.

다음은 `query` 를 *작업 타입*, `HeroNameAndFriends` 를 *작업 이름* 으로한 예제이다.

```graphql
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
########################
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

*작업 타입* 은 *쿼리(`query`)*, *뮤테이션(`mutation`)*, *구독(`subscription`)* 이 될 수 있으며, 어떤 작업의 타입인지를 기술한다.

*작업 이름* 은 의미있고 명시적인 작업의 이름이다. 디버깅이나 서버 측에서 로깅하는데에 매우 유용 할 수 있다. 네트워크 로그나 GraphQL 서버에 문제가 발생하면 내용을 확인하는 대신 코드에서 쿼리 이름을 찾아내는 것이 더 쉽다.

예를 들어, JavaScript에서는 쉽게 익명 함수를 사용할 수 있지만, 함수에 이름을 부여하면 코드를 디버깅하고 호출되었을 때 로깅하는 것이 더 쉽다. 같은 방식으로, GraphQL 쿼리와 뮤테이션 이름과 프래그먼트 이름은 서버 측에서 Graph 요청을 식별하는데 유용한 디버깅 도구가 될 수 있다.

<br/>

### 변수  Variables <a id="a7"></a>

클라이언트 측 코드는 쿼리 문자열을 런타임에 동적으로 조작하고 이를 GraphQL의 특정한 포맷으로 직렬화해야하기 때문에 이러한 동적 인자를 쿼리 문자열에 직접 전달하는 것은 좋은 방법이 아니다. 대신 GraphQL은 동적 값을 쿼리에서 없애고, 이를 별도로 전달하는 방법을 제공한다. 이러한 값을 *변수* 라고 한다.

변수를 사용하기 위해서는 다음 세 가지 작업을 해야 한다.

1. 쿼리안의 정적 값을 `$variableName` 으로 변경.
2. `$variableName` 을 쿼리에서 받는 변수로 선언.
3. 별도의 전송규약(일반적으로는 JSON) 변수에 `variableName: value` 을 전달.

다음과 같은 형태를 띄게된다.

```graphql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) { # episode : "JEDI"가 된다.
    name
    friends {
      name
    }
  }
}
# VARIABLES
{
  "episode": "JEDI"
}
#################################################
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

이제 클라이언트 코드에서 완전히 새로운 쿼리를 작성하지 않고 간단하게 다른 변수를 전달할 수 있다. 이는 일반적으로 쿼리의 어떤 인자가 동적인지를 나타내는 좋은 방법이기도하다. 사용자가 제공한 값으로 `$`을 사용해서는 안된다.

<br/>

#### 변수 정의 Variable definitions <a id="a8"></a>

> 변수 정의는 위 쿼리에서 `($episode: Episode)` 

 정적타입 언어의 함수에 대한 인자 정의와 동일하다. 

- `$` 접두사가 붙은 모든 변수를 나열하고 그 뒤에 타입(이 경우 `Episode`)이 온다.
- 선언된 모든 변수는 `스칼라`, `열거형`, `input object type`이어야 한다. 복잡한 객체를 필드에 전달하려면 서버에서 일치하는 입력 타입을 알아야한다. 
- 변수 정의는 옵셔널이거나 필수일 수 있다. 위의 경우 `Episode` 타입 옆에 `!` 가 없으므로 옵셔널이다. 그러나 변수를 전달할 필드에 null이 아닌 인자가 요구된다면 변수가 필요하게 된다.

<br/>

#### 변수 기본값 Default variables <a id="a9"></a>

타입 선언 다음에 기본값을 명시하여 쿼리의 변수에 기본값을 할당할 수도 있다.

```graphql
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

모든 변수에 기본값이 제공되면 변수를 전달하지 않고도 쿼리를 호출할 수 있다. 

변수가 전달되면 변수는 기본값을 덮어씌운다.

<br/>

### 지시어 Directives <a id="a10"></a>

> 변수를 사용하여 쿼리의 구조와 형태을 동적으로 변경하는 방법이 필요할 수도 있다.
>
> 지시어는 프로그래밍 언어로 가정할 경우, 조건문에 해당된다.

이러한 구성 요소에 대한 쿼리를 작성해 보자.

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) { # $withFriends가 flase 이기 때문에 name 미출력
      name
    }
  }
}
# VARIABLES
{
  "episode": "JEDI",
  "withFriends": false # false
}
####################
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

 *지시어* 라는 GraphQL의 새로운 기능을 사용해야 한다. 지시어는 필드나 프래그먼트 안에 삽입될 수 있으며 서버가 원하는 방식으로 쿼리 실행에 영향을 줄 수 있다. 코어 GraphQL 사양에는 두 가지 지시어가 포함되어 있으며, 이는 GraphQL 서버에서 지원해야 한다.

- `@include(if: Boolean)`: 인자가 `true` 인 경우에만 이 필드를 결과에 포함.
- `@skip(if: Boolean)` 인자가 `true` 이면 이 필드를 건너뜀.

지시어는 쿼리의 필드를 추가하고 제거하기 위해 문자열을 조작을 해야하는 상황을 피하는데 유용할 수 있다. 서버에서는 새로운 지시어를 정의하여 실험적인 기능을 추가할 수도 있다.

<br/>

### 뮤테이션 Mutations <a id="a11"></a>

> CUD , CREATE, UPDATE, DELETE - 데이터의 변경

REST에서는 모든 요청이 서버에 몇 가지 사이드이펙트을 일으킬 수 있지만 규칙에 따라 데이터 수정을 위해 `GET` 요청을 사용하지 않는다. GraphQL도 마찬가지이다. 기술적으로는 어떠한 쿼리든 데이터를 수정할 수도 있다. 하지만 변경을 발생시키는 작업이 명시적으로 뮤테이션를 통해 전송되어야 한다는 규칙을 정하는 것이 좋다.

쿼리와 마찬가지로 뮤테이션 필드가 객체 타입을 반환하면 중첩 필드를 요청할 수 있다. 이는 변경된 객체의 새로운 상태를 가져오는 데에 유용하다.

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
################################
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

`createReview` 필드가 새로 생성된 리뷰의 `stars` 와 `commentary` 필드를 반환한다. 이는 하나의 요청으로 필드의 새 값을 변경하고 쿼리할 수 있기 때문에 기존 데이터를 변경하는 경우(예: 필드를 증가시킬 때) 특히 유용하다.

이 예제에서 전달한 `review` 변수는 스칼라값이 아니다. 인자로 전달될 수 있는 특별한 종류의 객체 타입인 *input object type* 이다.

<br/>

#### 뮤테이션의 다중 필드  Multiple fields in mutations  <a id="a12"></a>

> 뮤테이션은 쿼리와 마찬가지로 여러 필드를 포함할 수 있다. 쿼리와 뮤테이션 사이에 중요한 차이점이 있습니다.
>
> **쿼리 필드는 병렬로 실행되지만 뮤테이션 필드는 하나씩 차례대로 실행된다.**

즉, 하나의 요청에서 두 개의 `incrementCredits` 뮤테이션를 보내면 첫 번째는 두 번째 요청 전에 완료되는 것이 보장된다.

<br/>

### 인라인 프래그먼트  Inline Fragments <a id="a13"></a>

다른 여러 타입 시스템과 마찬가지로 GraphQL 스키마에는 인터페이스와 유니온 타입을 정의하는 기능이 포함되어 있다.

인터페이스나 유니언 타입을 반환하는 필드를 쿼리하는 경우, *인라인 프래그먼트* 을 사용해야한다. 

```graphql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    # primaryFunction - 이렇게 사용하면 오류
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
# VARIABLES
{
  "ep": "JEDI"
}
###############################################
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

이 쿼리에서 `hero` 필드는 `Character` 를 반환하는데, `episode` 인자에 따라서 `Human`이나 `Droid` 중 하나일 수 있다. 필드를 직접 선택할 때에는 `name` 과 같이 `Character` 인터페이스에 존재하는 필드만 요청할 수 있다.

특정한 타입의 필드를 요청하려면 타입 조건과 함께 *인라인 프래그먼트* 을 사용해야한다. 

첫 번째 프래그먼트는 `... on Droid` 라는 레이블이 붙어있기 때문에 `primaryFunction` 필드는 `hero` 에서 반환된 `Character` 가 `Droid` 타입인 경우에만 실행된다. `Human` 타입의 `height` 필드도 마찬가지이다.

<br/>

### 메타 필드  Meta fields  <a id="a14"></a>

GraphQL 서비스에서 리턴될 타입을 모르는 상황이 발생하면 클라이언트에서 해당 데이터를 처리하는 방법을 결정할 방법이 필요하다.

>GraphQL을 사용하면 쿼리의 어느 지점에서나 메타 필드인 `__typename` 을 요청하여 그 시점에서 객체 타입의 이름을 얻을 수 있다.

```graphql
# union SearchResult = Human | Droid | Starship

{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
##########################
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```

위 쿼리에서 `search` 는 3 가지 중 하나인 유니언 타입을 반환한다. `__typename` 필드가 없으면 클라이언트가 다른 타입을 구별하는 것은 불가능할 것이다.

GraphQL 서비스는 몇 가지 메타 필드를 제공하며, 나머지는 Introspection(검사) 시스템을 노출하는 데 사용된다.

<br/>