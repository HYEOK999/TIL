![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 19

- Graphql 프로젝트 (인스타그램)
  - 백엔드 초기설정하기 (백엔드)
  - 프론트 설정
- Graphql 프로젝트 (파일 업로드)
  - [백엔드 서버](#a1)
  - 프론트
    - [Apollo X GraphQL 초기설정 해주기 (프론트)](#a2)
    - [업로드 해주는 컴포넌트(FileUpload)를 작성한다.](#a3)
    - [뮤테이션 작성](#a4)
    - [드래그 부분 작성 ](#a5)
    - [쿼리 작성](#a6)
    - [드래그 혹은 파일이 백엔드 서버에 추가 시 리렌더링 해주기.](#a7)
    - [전체코드](#a8)
      - [App.js](#a9)
      - [FileUpload.js](#a10)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 파일 업로드
- useMutation
- useQuery

<br/>

---

## Graphql 프로젝트 (인스타그램)

### 백엔드 초기설정하기 (백엔드)

- 몽고 DB 실행
- https://github.com/levelasquez/instagram-clone-graphql 가서 클론 다운로드( 나는 zip으로 해서 폴더만 끌어옴 )
- npm install
- package.json에 dependencies에서 "bcrypt": "^1.0.3" 제거
- npm i babel-node
- npm i esm
- npm install @babel/core @babel/register @babel/preset-env --save-dev

```js
// resolver/users 부분에서 bcrypt 부분 다 날림, password 재설정
export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.find(),
    getUser: (parent, args, { models }) => models.User.findOne(args),
  },
  Mutation: {
    createUser: async (parent, { password, ...args }, { models }) => {
      try {
        const user = await models.User.create({ ...args, password });
        return user && user._id;
      } catch (error) {
        return false;
      }
    },
  },
};
```

- npm start

<br/>

### 프론트 설정

- npm i

- .prettierrc 파일 추가

  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all"
  }
  ```

- npm start

<br/>

훅기반으로 HOC를 만드는 것은 옛날 패턴이다. (안티패턴 - 권장하는 방식이 아님.)

```jsx
showLogin = event => {
  event.preventDefault()

  this.setState({
    showLogin: true,
    showRegister: false,
    showLostPassword: false,
  })
}
```

이벤트 버블링 현상이 일어날수 있으니  `event.preventDefault()`를 작성해준다.

<br/>

## Graphql 프로젝트 (파일 업로드)

> 서버 준비 되있음.

<br/>

### 백엔드 서버 <a id="a1"></a>

```gql
const typeDefs = gql`
  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;
```

<br/>

### 프론트

#### Apollo X GraphQL 초기설정 해주기 (프론트)  <a id="a2"></a>

- Apollo 클라이언트에서는 캐시를 만들 때 `InMemoryChche`를 사용

**App.js**

````jsx
import React, { useEffect } from 'react';
import './App.css';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { FileUpload } from './Components/FileUpload';
import gql from 'graphql-tag';

const link = createUploadLink({ uri: 'http://localhost:4000/graphql' });

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FileUpload /> 
    </ApolloProvider>
  );
}

export { App };
````

<br/>

#### 업로드 해주는 컴포넌트(FileUpload)를 작성한다.  <a id="a3"></a>

**import 추가**

```js
// FileUpload.jsx
import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
// useDropzone : 드래그앤 드롭 해서 업로드 되는 모듈 
import { useDropzone } from 'react-dropzone'
```

<br/>

#### 뮤테이션 작성  <a id="a4"></a>

- 업로드 되는 요청은 쿼리가 아니라 뮤테이션이다.
- useMutation은 배열 구조 분해 방식
  - 함수명를 여러번 선언했을 때, 함수명의 중복을 쉽게 피하도록 함수명을 사용자 임의로 지정하게 하기 위해
  - 배열의 첫번째 영역은 함수
  - 뮤테이션 작성할 때 함수명을 지정(백엔드에서 정의된 이름에서 카멜케이스로 변경하여 사용해주자)
  - $가 붙은 것은 변수명이라는 뜻

```js
// FileUpload.jsx
const uploadFileMutation = gql`
  mutation UploadFile($file : Upload!) {
    uploadFile(file: $file) 
  }
`
```

<br/>

#### 드래그 부분 작성   <a id="a5"></a>

1. 위에서 작성한 뮤테이션을 훅을 통해 불러온다.
2. onDrop함수를 설정한다.  여기서 [file]은 파일을 드래그해서 올려놓았을 때, 가르키는 파일을 의미한다. // 뮤테이션이 여기서 실행된다.
3. `useDropzone({ onDrop })` → 객체로 함수를 랩핑해서 전달해야 한다.

```jsx
// FileUpload.jsx
export const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation)
  const onDrop = ([file]) => uploadFile({variables: {file}})
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
      <div
        {...getRootProps}
      >
      </div>
  )
}
```

드래그앤드롭이 인식이 되고 싶은 시작 지점의 태그에 `{...getRootProps}` 을 설정한다.

```jsx
    <div
      {...getRootProps}
    >
      <input {...getInputProps} />
    </div>
```

input을 `{...getInputProps}`으로 오버라이드 한다. 

```jsx
    <div
      {...getRootProps}
    >
      <input {...getInputProps} />
      {
        isDragActive 
        ? <p>여기에 파일을 드래그 앤 드롭하세요.</p>
        : <p>파일을 선택하세요.</p>
      }
    </div>
```

만약 드래그가 안되는 브라우저일 경우, 파일을 선택하게 해야되기 때문에 `isDragActive`로 boolean값을 받아 비교한다.

<br/>

#### 쿼리 작성  <a id="a6"></a>

다시 App.js로 돌아와서 쿼리를 작성한다.

useQuery는 객체 구조 분해 방식

- 선언만으로 수행되기 때문에 별도의 함수가 필요 없음

```jsx
// App.js
...
function App() {
  return (
    <ApolloProvider client={client}>
      <FileUpload />
      <hr />
      <Files /*추가*/ /> 
    </ApolloProvider>
  );

// 아래부터 전부 추가
const GET_FILES = gql`
  {
    files
  }
`;

function Files() {
  const { data, loading } = useQuery(GET_FILES); // useQuery는 객체, useMutation은 배열

  useEffect(() => {
    console.log('abc');
  });

  if (loading) return <p>loading</p>;
  return (
    <>
      {data.files.map((f, i) => (
        <p key={i}>{f}</p>
      ))}
    </>
  );
}

export { App, GET_FILES };
```

<br/>

#### 드래그 혹은 파일이 백엔드 서버에 추가 시 리렌더링 해주기.  <a id="a7"></a>

- 드래그 혹은 파일 추가 버튼을 이용하여 백엔드 서버에 파일이 추가 될 경우 화면 리렌더링 하는 작업을 한다.
- 순서를 보장받고 싶을 땐 async/await를 사용하자
  - **배열구조분해 방식으로 받는 uploadFile과 같은 값은 항상 Promise이므로** async/await를 사용할 수 있는 것.
- useMutation 첫번째 쿼리는 뮤테이션 자체, 두번째는 옵션으로 refetchQueries라는 속성이 있는데 이 뮤테이션을 수행한 이후에 쿼리를 가져오게 해주는 역할을 함.

```jsx
// FileUpload.jsx
import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';
import { GET_FILES } from '../App'; // 추가

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const FileUpload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: GET_FILES }], // 2번째 파라미터 추가
    // 업로드 뮤테이션을 수행한 이후에 쿼리를 가져오게 해주는 역할을 한다.
  });
  const onDrop = useCallback(
    async ([file]) => {
      await uploadFile({ variables: { file } });
    },
    [uploadFile],
  );
  // 타입이 프로미스다. 따라서, async, await가 사용가능하다.
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    // <div {...this.state}></div>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>여기에 파일을 드래그 앤 드롭하세요.</p> : <p>파일을 선택하세요.</p>}
    </div>
  );
};

```

<br/>

#### 전체 코드  <a id="a8"></a>

##### App.js  <a id="a9"></a>

```jsx
import React, { useEffect } from 'react';
import './App.css';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { FileUpload } from './Components/FileUpload';
import gql from 'graphql-tag';

const link = createUploadLink({ uri: 'http://localhost:4000/graphql' });

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <FileUpload />
      <hr />
      <Files />
    </ApolloProvider>
  );
}

const GET_FILES = gql`
  {
    files
  }
`;

function Files() {
  const { data, loading } = useQuery(GET_FILES); // useQuery는 객체, useMutation은 배열

  useEffect(() => {
    console.log('abc');
  });

  if (loading) return <p>loading</p>;
  return (
    <>
      {data.files.map((f, i) => (
        <p key={i}>{f}</p>
      ))}
    </>
  );
}

export { App, GET_FILES };
```

<br/>

##### FileUpload.js  <a id="a10"></a>

```jsx
import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// useDropzone : 드래그앤 드롭 해서 업로드 되는 모듈
import { useDropzone } from 'react-dropzone';
import { GET_FILES } from '../App';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const FileUpload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: GET_FILES }],
  });
  const onDrop = useCallback(
    async ([file]) => {
      await uploadFile({ variables: { file } });
    },
    [uploadFile],
  );
  // 타입이 프로미스다.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    // <div {...this.state}></div>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>여기에 파일을 드래그 앤 드롭하세요.</p> : <p>파일을 선택하세요.</p>}
    </div>
  );
};
```

<br/>