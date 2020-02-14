![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 4

- [Controlled Component 와 Uncontrolled Component](#a1)
  - 상태를 가지고 있는 엘리먼트
  - [Controlled Component 와 Uncontrolled Component 구분하기](#a2)
  - [Q. 만약 `input`엘리먼트를 hover 시  포커스를 먹일 수 있는 방법은?](#a3)
- [High Order Component](#a4)
  - [사용법](#a5)
  - [주의할 점](#a6)
- [[Project] Login 요청하기](#b1)
  - [로그인 토큰 획득하기](#b2)
  - [로컬 스토리지(Local Storage)](#b3)
  - [토큰 유무로 라우팅 하기](#b4)
    - HOC를 직접 만들기
    - [HOC 사용하기](#b5)
  - [서적 목록 불러오기](#b6)
    - [Home.jsx 최종 코드](#b7)
  - [[Homework] : 책 추가하기, 로그아웃 추가하기](#b8)

<br/>

-----

## React Study with Mark - 리액트 실전 활용법 -

<br/>

### Controlled Component 와 Uncontrolled Component <a id="a1"></a>

#### 상태를 가지고 있는 엘리먼트

- input
- select
- textarea
- 등등...

이러한 엘리먼트들은 `onClick` 과 같은 이벤트 핸들러를 가지고있다.

<br/>

#### Controlled Component 와 Uncontrolled Component 구분하기 <a id="a2"></a>

> 엘리먼트의 '상태' 를 누가 관리하느냐 로 결정한다.

- 엘리먼트를 가지고 있는 컴포넌트가 관리 ➤ ***Controlled***

  상태를 관리하고 있고, 이벤트 핸들러를 통해 상태를 변경시키고 있다면 `Controlled Component`다.

  ```jsx
  import React from 'react';
  
  export default class Controlled extends React.Component {
    state = { value: '' };
  
    render() {
      const { value } = this.state;
      return (
        <div>
          <input value={value} onChange={this._change} />
          <button onClick={this._click}>전송</button>
        </div>
      );
    }
  
    _change = e => {
      // console.log(e.target.value);
      this.setState({ value: e.target.value });
    };
  
    _click = () => {
      console.log('최종 결과', this.state.value);
    };
  }
  ```

  <br/>

- 엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유 ➤ ***Uncontrolled***

  상태가 아닌 DOM요소를 직접적으로 사용한다면 `Uncontrolled Component`다.

  `inputRef = React.createRef();` 만들어지면 객체이다. `{current : null}`

  ```jsx
  import React from 'react';
  
  const Uncontrolled = () => {
    const inputRef = React.createRef();
  
    function click() {
      console.log('최종 결과', inputRef.current.value);
    }
    
    return (
      <div>
        <input ref={inputRef} />
        <button onClick={click}>전송</button>
      </div>
    );
  };
  
  export default Uncontrolled;
  ```

<br/>

#### Q. 만약 `input`엘리먼트를 hover 시  포커스를 먹일 수 있는 방법은? <a id="a3"></a>

여러가지 방법이 있지만, 해당 엘리먼트를 참조해서 Focus를 주는 방법이 제일 편하다. (Uncontrolled Component)

```jsx
// 클래스 버전
import React from 'react';

class Uncontrolled extends React.Component {
  inputRef = React.createRef();

  render() {
    console.log(this.inputRef);
    return (
      <div>
        <input type="text" ref={this.inputRef} onMouseOver={this.mouseOver} />
        <button onClick={this.click}>전송</button>
      </div>
    );
  }

  click = () => {
    console.log(this.inputRef);
    console.log(this.inputRef.current.value);
  };

  mouseOver = () => {
    this.inputRef.current.focus();
  };
}

export default Uncontrolled;
```

<br/>

````jsx
// functional 버전
import React from 'react';

const Uncontrolled = () => {
  const inputRef = React.createRef();

  const click = () => {
    console.log(inputRef);
    console.log(inputRef.current.value);
  };

  const mouseOver = () => {
    inputRef.current.focus();
  };

  console.log(inputRef);
  return (
    <div>
      <input type="text" ref={inputRef} onMouseOver={mouseOver} />
      <button onClick={click}>전송</button>
    </div>
  );
};

export default Uncontrolled;

````

<br/>

### High Order Component <a id="a4"></a>

> <컴포넌트>를 인자로 받아 <새로운 컴포넌트>를 리턴하는 함수
>
> 작업이 항상 반복된다고 생각 될 때 만들면 좋다.
>
> 리액트 API가 아니다.
>
> 컴포넌트의 로직을 재사용하기 위한 Advanced Tech

```jsx
HOC = function(컴포넌트) { return 새로운 컴포넌트; }
```

HOC의 대표적인 예 - `with`이라는 단어가 붙으면 HOC를 의심하자.

- react-router-dom - withRouter
- Redux - connect
- GraphQL Relay - createFragmentContainer

```jsx
// withRouter
import React from "react";
import { withRouter } from "react-router-dom";

const LoginButton = props => {
  console.log(props);
  function login() {
    setTimeout(() => {
      props.history.push("/");
    }, 1000);
  }
  return <button onClick={login}>로그인하기</button>;
};

export default withRouter(LoginButton); // HOC 사용 대표적 사례
```

<br/>

#### *사용법* <a id="a5"></a>

*1. Use HOCs For [**(Cross-Cutting Concerns 횡단_관심사)**](https://ko.wikipedia.org/wiki/횡단_관심사)*  <a id="u1"></a>

- 컴포넌트를 만들때 중복되는 부분이 많이 나올 경우 사용을 고려 헤보아라.

*2. Don’t Mutate the Original Component. Use Composition.* <a id="u2"></a>

- `Mutate`는 원형을 변경하는 것. (커피를 선물 받았는데, 우유를 섞어서 라뗴로 주는 것)

- `HOC`는 기존을 유지해야 한다. (커피를 선물 받았는데, 커피는 그대로 주고, 쿠키를 같이 주는 것)

*3. Pass Unrelated Props Through to the Wrapped Component* <a id="u3"></a>

- 기존의 Props를 유지해주어라.

*4. Maximizing Composability* <a id="u4"></a>

- 기존 내용을 돌려줄떄, 무언가를 조합으로 추가해서 주어라. (2번 내용과 동일)

*5.Wrap the Display Name for Easy Debugging* <a id="u5"></a>

- 디버깅을 하기 위해서 Display Name을 붙여서 사용하도록 한다.

<br/>

#### *주의할 점* <a id="a6"></a>

*1. Don’t Use HOCs Inside the render Method* <a id="un1"></a>

- `Render` 메소드 사이에 사용하지 말 것. (그래서, 보통 export부분에서 많이 사용함)

*2. Static Methods Must Be Copied Over* <a id="un2"></a>

- 정적 메소드는 반드시 복사해서 전달하라. (컴포지션으로 전달되지 않으므로)

*3. Refs Aren’t Passed Through (feat. React.forwardRef)* <a id="un3"></a>

- Refs는 HOC로 전달하지 말 것. (레퍼런스는 그 페이지 안에서만 레퍼런스 가능)

<br/>

### [Project] Login 요청하기  <a id="b1"></a>

E-mail: 제출한 이메일 , PW: fcschool 

- `antd` 엘리먼트의 경우에는 `passwordRef.current.value`(`antd`는 `Undefined`) 가 아니라 `passwordRef.current.state.value` 라고 써야 제대로 값을 받아올 수 있다.
- `npm i axios` ( CRUD - GET, POST, DELETE, PUT, PETCH )
- `axios` 결과물은 Promise이므로 `.then`을 사용할 수 있다.

```jsx
// axios.http메소드(경로, 바디, 헤더(옵션))
axios.post('경로', {
  email,
  password,
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});
```

```jsx
// async/await 이용시
try {
 const response = await axios.post(
    '경로',
    {
      email, // email: email
      password, // password: password
    },
  );
  console.log(response.data);
} catch (error) {
  console.log(error);
}
```

<br/>

#### 로그인 토큰 획득하기  <a id="b2"></a>

로그인을 `POST`로 요청시  Token을 획득 할 수 있다.

- 이전에 로그인은 쿠키/세션을 많이 사용했다. (트렌드의 변화로 Token을 이용하는 방식이 많이 채택됨.) 
- 토큰은 DB에 저장되어 있다.
- 만약 책 목록을 요청시(토큰을 함께 보내고), 토큰이 유효하면 로그인 유무를 확인하여 책 목록을 서버에서 준다.

```jsx
try {
  // 리퀘스트 보내기 전 로딩 시작
  setLoading(true);
  const response = await axios.post('경로', {
    email,
    password,
  })
  console.log(response.data);
  const { token } = response.data;
  // 성공 후 로딩 끝
  setLoading(false);
  history.push('/');
} catch (error) {
  console.log(error);
  // 에러 후 로딩 끝
  setLoading(false);
  // antd의 message는 메소드(첫글자가 대문자면 컴포넌트)
  message.error(`This is not valid info.`);
}
```

<br/>

#### 로컬 스토리지(Local Storage)  <a id="b3"></a>

 `localStorage`는 브라우저 종료해도 데이터가 보존되고. `sessionStorage` 는 브라우저 종료시 데이터가 없어진다.

- 로그인 시 로컬 스토리지에 토큰 저장하는 코드를 추가한다.
- 로그인 중 잘못된 입력을 하여 에러가 날 경우, `antd`의 `message` 콤퍼넌트를 이용하여 화면에 표시해준다.

```jsx
const SigninForm = () => {
  const history = useHistory();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const [loading, setLoading] = useState(false);

  async function click() {
    const email = emailRef.current.state.value;
    const password = passwordRef.current.state.value;

    try {
      setLoading(true);
      const response = await axios.post(
        '경로',
        {
          email, // email: email
          password, // password: password
        },
      );
      const { token } = response.data;
      
      setLoading(false);
      localStorage.setItem('token', token);
      history.push('/');
    } catch (error) {
      setLoading(false);
      if (error.response.data.error === 'USER_NOT_EXIST') {
        message.error('유저가 없다.');
      } else if (error.response.data.error === 'PASSWORD_NOT_MATCH') {
        message.error('비밀번호가 틀림');
      } else {
        message.error('로그인에 문제가 있다.');
      }
    }
 }
```

- Home에서 토큰 값을 확인하기 위해 다음과 같이 쓸 수 있다.

  **특정 함수(여기선, getItem)에 커맨드 누르고 가리키면 반환 타입 알 수 있다 - 타입을 확인하는 습관을 가지자**

```jsx
// Home.jsx
const token = localStorage.getItem('token');
console.log(token);
```

<br/>

#### 토큰 유무로 라우팅 하기  <a id="b4"></a>

##### HOC를 직접 만들기

> 토큰에 따라 로그인 상태인지를 확인하기 위해서 HOC를 작성한다.

- 반복적인 컴포넌트 작업을 줄이기 위해서 HOC를 작성한다.

- `token`이 `null`이면 로그인 화면으로 `Redirect`

- `props` 와 `token`을 받아서 `<Component />`에 전부 전달한다. (`props`를 전달하는 이유: [HOC 사용법 3번](#u3) ) 

- 차후 디버깅을 위해 `Display Name`을 붙여준다.  ( [HOC 사용법 5번](#u4) )

  `WrappedComponent.displayName = withAuth(${Component.name})`

```jsx
// src/hocs/withAuth.js
import React from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(Component) {
  function WrappedComponent(props) {
    const token = localStorage.getItem('token');

    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
  }

  WrappedComponent.displayName = `withAuth(${Component.name})`;

  return WrappedComponent;
}

export default withAuth;

// 관련없는 props는 패스해주어라.
// display 이름 설정을 해주어라. (디버깅시 이름을 유지시켜주기위함.)
```

<br/>

##### HOC 사용하기  <a id="b5"></a>

`Home` 컴포넌트에서 HOC의 콜백함수로 컴포넌트를 넣어준다.

```jsx
// Home.jsx
import React from 'react';
import withAuth from '../hocs/withAuth';

const Home = ({ token }) => {
  return (
  <div>
    <h1>Home</h1>
  </div>
  )
};

export default withAuth(Home); // HOC
```

-  `token`을 물려 받은 적이 없으나 `withAuth`에 의해 `token`이 들어가게 되고 불필요한 반복 작업을 줄인다.
- 다른 페이지에서도 `withAuth`로 감싸게 되면 인증된 사용자만 들어갈 수 있게 된다.

<br/>

#### 서적 목록 불러오기  <a id="b6"></a>

- 서적 목록을 불러올때, 토큰을 이용하여 불러온다. 
- `headers`에 `token`을 대입하여 요청한다.
- `Bearer`은 조회 요청할 때 붙이는 규칙 같은 것.

```jsx
// Home.jsx
useEffect(() => {
  axios.get('경로', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    console.log(res.data);
  })
}, []); // 의존성 배열이 빈배열일 경우, 최초 한 번만 실행
```

<br/>

##### Home.jsx 최종 코드  <a id="b7"></a>

```jsx
// Home.jsx
import React, { useState, useEffect } from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';

const [books, setBooks] = useState([]);

useEffect(() => {
  axios.get('경로', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then(res => {
    console.log(res.data);
    setBooks(res.data);
  });
}, [token]);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {books.map(book => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(Home);
```

<br/>

### [Homework]: 책 추가하기, 로그아웃 추가하기  <a id="b8"></a>

- app.js에 라우터 추가 /addbook
- src/pages/AddBook.jsx를 만들고, 인증된 사용자만 이용하도록 HOC - withAuth 사용한다.
- 폼 만들어서 입력받고 입력 마치면 홈으로 돌아가게 설정한다.
- 멋있게 만들고 싶으면: 라우터 추가하지말고 홈에서 모달창 띄워서 바로 책 등록하게끔 만들기.
- 로그아웃은 서버와 로컬스토리지 모두 `token`을 없애야 한다. ( DELETE로 요청하면 된다. )
  - 로그인 할 때와 마찬가지로 `Authorization`도 함께 보내야 한다. ( 어떤 토큰을 사라지게 해야하는지 알려야 함 )
  - 어떤 페이지에서도 로그아웃이 가능하도록 해야한다.