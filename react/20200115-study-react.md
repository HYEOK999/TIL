![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 18

- GraphQL 미니 프로젝트
  - 백엔드
    - Resolver (middle-ware)
    - input 키워드
  - 프론트
    - mutation 작성 (src/graphql/mutation.js)
    - Query 작성 (src/graphql/queries.js)
  - 데이터 요청 - 컴포넌트방식(클래스기반) 'npm i react-apollo'
    -  < Query >
    - < Mutatation >
  - 데이터 요청 - 훅방식 'npm i apollo-boost'
    - useQuery
    - useMutation 
  - 비동기 방식을 처리하는 방법들

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 프론트
- 백엔드
- 데이터 요청 - 컴포넌트방식
- 데이터 요청 - 훅방식

<br/>

---

## GraphQL 미니 프로젝트

> 프론트 개발 ← 쿼리, 뮤테이션 → Resovers ← 백엔드 개발자 → DB

- 프론트엔드는 최소 백엔드에 정의된 Types을 해석할 수 있는 역량이 필요하다. 
- 즉, Types를 해석해서 Query 와 Mutation을 작성하는 능력이 필요함.

<br/>

### 백엔드

- `Type`은 객체 형식 { 필드 : 값 }로 이루어졌다.
- `Schema`는 타입들의 정의 와 백엔드 개발자가 만드는 resolver 정의를 포함하는 개념이다.
  - `resolver`는 프론트가 보낸 요청을 처리하는 로직을 구현한 곳을 의미한다.

<br/>

#### Resolver (middle-ware)

어떠한 프로그래밍 언에 대해 종속시키지 않기 위해서 Resolver라는 개념을 도입해 중간에 다리를 놓았음.

`resolver의 예` : `getPost` , `createPost`라는 요청이 들어왔을 때 처리 예시

```js
// FRONT 에서 데이터 요청(쿼리,뮤테이션)을 했을 떄 데이터를 직접적으로 처리하는 구간
export default {
  Query: {
    getPost: (parent, args, { models }) => models.Post.findOne(args)
  },
  Mutation: {
    createPost: (parent, args, { models, user }) =>
      models.Post.create({ ...args.post, by: user })
  }
};
```

순서 : 프론트가 데이터 요청(쿼리, 뮤테이션) → Resolver(요청 해결) → DB → Resolver → 프론트

NOSQL은 DB에 데이터가 정의가 되어 있지 않더라도 마치 있는 것처럼 업데이트를 할 수 있다.(SQL은 안된다.)

<br/>

#### input 키워드

> input 키워드는 MUTATION에서만 사용된다. **(페이로드에 해당됨)**

```graphql
input iBy {
  username: String!
  thumbnail: String
}

input iPost {
  desc: String
  photo: String
}

type Mutation {
  createPost(post: iPost): Post! # 위에서 정의한 input이 사용됨.
}
```

<br/>

### 프론트

#### mutation 작성 (src/graphql/mutation.js)

- 회원 가입을 위한 MUTATION (쓰기, 수정, 삭제) 
- mutation의 이름(예제에서는 CreateUser)은 백엔드개발자가 어떤 mutation이 사용됬는지 로그확인용으로 사용되지 그 외의 사용용도는 없다. (이름이 없다면 익명함수의 느낌)

```js
// 백엔드 파일의 타입상황
type Mutation {
createUser(username: String!, password: String!, fullname: String!, email: String!):Boolean!
}
```

```jsx
// 프론트
import gql from 'graphql-tag';

export default {
  creatUser: gql`
    mutation CreateUser(
      $username: String!
      $password: String!
      $fullname: String!
      $email: String!
    ) {
      createUser(
        username: $username
        password: $password
        fullname: $fullname
        email: $email
      )
    }
  `,
};
```

위 작성된 mutation은 JS에 function과 비교하면 이러한 느낌이다. (동일하진 않지만 이런 느낌이다.)

```js
function CreateUser(
	$username: String!, 
  $password: String!, 
  $fullname: String!, 
  $email: String!
 	) {
     createUser(
     username: $username,
     password: $password,
     fullname: $fullname,
     email: $email
     )
}
```

<br/>

#### Query 작성 (src/graphql/queries.js)

- 모든 유저 조회 및 특정 유저 조회을 위한 QUERY (읽기) 
- query의 이름(예제에서는 AllUser, GetUser)은 백엔드개발자가 어떤 query가 사용됬는지 로그확인용으로 사용되지 그 외의 사용도는 없다. (이름이 없다면 익명함수의 느낌)

```js
// 백앤드 쿼리
	type User {
    _id: ID!
    username: String!
    password: String!
    fullname: String!
    email: String!
    thumbnail: String
  }

  type Query {
    allUsers: [User]!
    getUser(_id: ID!): User!
  }
```

```js
// 프론트
import gql from 'graphql-tag';

export default {
  allUsers: gql`
    query AllUsers {
      allUsers {
        username
        fullname
        email
        thumbnail
      }
    }
  `,
  getUser: gql`
    query GetUser($_id: ID!){
      getUser(_id: $_id) {
        username
        fullname
        email
			}
    }
  `,
};
```

<br/>

### 데이터 요청 - 컴포넌트방식(클래스기반) 'npm i react-apollo'

> 반드시 클래스 기반에서 사용해야한다.

###  < Query >

```jsx
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);
```

<br/>

### < Mutatation >

```jsx
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
```

<br/>

### 데이터 요청 - 훅방식 'npm i apollo-boost'

> 반드시 함수 기반에서 사용해야한다.

#### useQuery

- `useQuery`는 객체 구조 분해 방식.  `loading` : true || false / `error` : obj
- `useQuery`는 선언만 해줘도 쿼리가 날라간다.
- `loading`을 안적어줄 시 `undefined에러`를 일으킨다. (`loading` 을 쓰거나, &&로 유효성검사를 해야한다. )

```jsx
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_GREETING = gql`
  query getGreeting($language: String!) {
    greeting(language: $language) {
      message
    }
  }
`;

function Hello() {
  const { loading, error, data } = useQuery(GET_GREETING, {
    variables: { language: 'english' },
  });
  if (loading) return <p>Loading ...</p>;
  // if (!loading) { {data.greeting.message} } // 혹은 &&를 사용한다.
  return <h1>Hello {data.greeting.message}</h1>;
}
```

<br/>

#### useMutation 

- `useMutation`는 배열 구조 분해 방식.
- `useMutation`의 경우, 선언만할 경우 `usequery`처럼 요청을 보내지는 않는다. 
- `useMutation` 의 첫번째 파라미터에 인자로 해당 graphql에서 정의한 변수를 객체 파라미터로 정의해주어야 요청을 보낸다.
- `useMutation`의 첫번째 파라미터에 정의한 함수는 Promise이다.

```jsx
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```

<br/>

### 비동기 방식을 처리하는 방법들

- 폴링 방식 : `setInterval` 을 사용해서 비동기코드가 주기적으로 확인해서 완료가 되어있는지 아닌지 확인함.
- Event Emitter 방식 : 어떠한 작업에 대해서 이벤트를 정해두고 그 작업이 완료가 될 경우 그 이벤트가 완료가 되었다는 것을 전달한다.

<br/>