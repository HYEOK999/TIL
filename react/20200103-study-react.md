![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 13

- [JWT](#a1)
  - 기밀성, 무결성 이란?
- [JWT 사용하기](#a2)
  - [JWT 생성](#a3)
  - [JWT 검증 (토큰 내부의 값을 확인할 수 잇다.)](#a4)
    - [key 설정하기](#a5)
  - [JWT 디코드](#a6)
    - 그 외 추가 기술 : nonce
- [로그인 구현하기](#a7)
  - [user 커포넘트 만들기](#a8)
  - [api 추가하기](#a9)
    - api 전체코드
  - [쿠키 Set 설정 및 API 설정](#a10)
  - [쿠키 Get 설정 - 커스텀 Hook](#a11)
  - [커스텀 라우팅](#a12)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- JWT
- 기밀성
- 무결성
- JWT 생성
- JWT 검증 + key 설정
- JWT 디코드
- nonce

<br/>

--------

### JWT  <a id="a1"></a>

> Bearer, Basic, jwt 라는 접두사로 시작하는 `token`이다.
>
> 헤드 부분에 접두사 형식으로 명시적으로 토큰 타입이 작성되는 경우도 있다.

백엔드는 클라이언트가 보낸 데이터의 원본을 절대 믿어서는 안된다. ( 위변조가 가능하기 때문 )

따라서, 클라이언트가 보내는 데이터가 안정적 임을 확인하는 방법은 무엇인가?

데이터의 기밀성 , 무결성 을 보장하면 된다.

<br/>

#### 기밀성, 무결성 이란?

기밀성 : 데이터 자체를 노출시키지 않는것이 목적 (암호화).

무결성 : 데이터가 그대로 변형되지 않고 전달되는 성질.

JWT는 암호화(기밀성)가 목적이 아니라 데이터의 위변조를 판별하는 것 (즉, 무결성이 목적)

그 증거로 [JWT.io](https://jwt.io/) 에 접속해보면 토큰을 아무런 제약없이 세부 내용을 확인 할 수 있다.

즉 토큰만 탈취를 한다면 손쉽게 세부내용을 볼 수 있다는 것이다.

<br/>

### JWT 사용하기 <a id="a2"></a>

JWT를 더 쉽게 사용하기 위한 npm 이 존재한다.

~~~bash
npm install jsonwebtoken --save
~~~

<br/>

#### JWT 생성 <a id="a3"></a>

백엔드에서 토큰을 만들어서 배포하는 경우가 대부분이다.

```jsx
// import jwt from 'jsonwebtoken';
var jwt = require('jsonwebtoken');
var token = jwt.sign({foo:'bar'}, 'keeey');
var token2 = jwt.sign({foo:'bar'}, 'keeey', { expiresIn: 604800 }); // 1 week
```

1번째 파라미터 : 임의의 위변조를 방지하고 싶은 JSON 객체를 정의

2번째 파라미터 : 키값 (노출되어서는 안된다.)

3번째 파라미터[옵션] : 해당 토큰이 존재할 수 있는 시간(만료시간)을 정의한다. 1초단위로 설정할 수 있다.

<br/>

#### JWT 검증 (토큰 내부의 값을 확인할 수 잇다.)  <a id="a4"></a>

**사실상 프론트 개발자가 가장 많이 사용되는 부분**

```jsx
var decoded = jwt.verify(token, 'keeey');
```

1번째 파라미터 : 임의의 위변조를 방지하고 싶은 JSON 객체를 정의.

2번쨰 파라미터 : 키값 (노출되어서는 안된다.)

여기서 2번째 파라미터인 `key`는 백엔드개발자가 프론트엔드 개발자에게 `key`값을 반드시 알려줘야한다.

<br/>

#### key 설정하기  <a id="a5"></a>

`key`값은 프론트엔드에서는 `.env파일`로 저장을 한다. 

```jsx
var decoded = jwt.verify(token, `process.env.REACT_APP_임의의_변수명` : );
```

`.env파일`

```jsx
process.env.REACT_APP_임의의_변수명=keeey
```

`key`값의 유출은 결국 무결성을 보장할 수 없다는 의미를 말한다.

이외에도 `key` 값은 보통 AWS SSM 스토어를 통해 백엔드 개발자가 등록을 해두면, 동적으로 생성되는 코드들을 이용하거나 docker를 통해서 동적으로 배포하는 방법들이 있는데 이는 백엔드 개발자와 협업을 통해서 결정한다.

<br/>

#### JWT 디코드  <a id="a6"></a>

```jsx
var decoded = jwt.decoded(token);
```

파라미터 : 토큰의 원본

토큰의 원본 값(JSON 객체)를 확인 할 수 있다. (단, 키값 없이 확인하는것이기 때문에 무결성을 보장할 수 없다.)

 [JWT.io](https://jwt.io/) 에서 제공해주는 토큰을 확인하는 기능도 `jwt.decoded` 기능이다. 실상 검증보다는 많이 사용되지는 않는다.

<br/>

#### 그 외 추가 기술 : nonce

nonce : 기존값에 특수문자를 붙여서 사용한다. nonce는 패스워드가 정말 중요한 곳(보안성이 높아야만 하는 곳)에서 사용한다.

패스워드를 원본을 보내는것이 아니라 패스워드 사이에 임시의 특수문자들을 넣어준다. 사용자가 아이디랑 패스워드를 입력하고 로그인 버튼을 눌렀을 때 사용자가 입력한 값 외에 임의로 알수없는 값들이 추가되어서 그 값을 전송 시키는 방식이다.

nonce는 수학적으로 증명된 라이브러리만 의미있으므로 반드시 라이브러리를 사용해야만 한다.

<br/>

-----

### 로그인 구현하기  <a id="a7"></a>

로그인을 하려면 아이디와 패스워드가 필요하는데 프론트엔드가 백엔드에게 보내는 데이터에 대해 기밀성 혹은 무결성을 지켜줘야만 백엔드는 해당 데이터를 안심하고 사용할 수 있다. 왜냐하면 프론트엔드가 보내는 데이터의 신뢰를 보장해줄 장치가 필요하기 때문이다. 이는 서비스를 함에 있어 매우 중요하다. 우리는 그 신뢰를 JWT로 한다. 회원가입이 된 계정에게는 토큰이 발급되고 안된 계정에게는 토큰이 발급되지 않는다.

토큰의 생성 시점은 회원가입이 완료 되었을 때다. 문제는 회원가입 후 로그인을 하면서 생성된 토큰을 클라이언트가 가지고 있어야하는데 이부분을 쿠키로 해결한다. 

<br/>

#### user 커포넘트 만들기  <a id="a8"></a>

`src/components/User/index.jsx`

```jsx
import React, { useEffect } from 'react'
// import { useAuthed } from '../../lib/hooks'

const User = (props) => {
  return (
    <div>
      유저입니다.
      <button onClick={() => {props.history.push('/signout')}}>로그아웃</button>
    </div>
  );
}

export default User;
```

<br/>

#### api 추가하기  <a id="a9"></a>

user API경우 헤더에 JWT 토큰을 넣어서 보내준다.

```  javascript
const headers = {'Authorization' : `JWT ${session}`}
```

<br/>

##### api 전체코드

`src/lib/api.js`

```jsx
import axios from 'axios';

export const signUp = async ({ username, password1 : password }) => {
  const { data } = await axios.post('http://localhost:3001/api/signup', {
    username,
    password
  })
  console.log(data);
  return data;
}

export const signIn = async ({ username, password }) => {
  const { data } = await axios.post('http://localhost:3001/api/signin', {
    username,
    password
  })
  console.log(data);
  return data;
}

export const signOut = async (session) => {
  const headers = {
    'Authorization' : `JWT ${session}`
  }
  const { data } = await axios.get('http://localhost:3001/api/signout', headers);  		    
  console.log(data);
  return data;
}

export const user = async (session) => {
  const headers = {
    'Authorization' : `JWT ${session}`
  }
  const { data } = await axios.get('http://localhost:3001/api/user', headers);
  console.log(data);
  return data;
}

```

<br/>

#### 쿠키 Set 설정 및 API 설정  <a id="a10"></a>

먼저 로그인시 쿠키를 저장해야 되므로 쿠키를 설정해야 한다. 

npm 모듈에서 쿠키를 쉽게 사용할 수 있는 라이브러리를 이용을 한다.

`src/SignIn/index.jsx`

```javascript
import React from 'react';
import { useForm } from "react-hook-form";
import { signIn } from '../../lib/api';
import Cookies from 'js-cookie';

const SignIn = (props) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async values => {
    const { success , token } = await signIn(values);

    if (success) {
      // Cookies.set('session', token.split(' ')[1],{expires:7});
      Cookies.set('session', token.split(' ')[1]);
      props.history.push('/user');
    }
  };
  
  return (
  ...

```

쿠키는 `Cookise.set(키, 값, [옵션-기한])`으로 설정 가능하다.

- 1번째 파라미터 : `name`을 설정 해주어야 한다. 1번째 파라미터의 이름은 암묵적은 `session`이라고 정해주는 룰이 있다.
- 2번째 파라미터 : 1번쨰 파라미터와 쌍이 될 값을 적어주는데, JWT가 여기에 적힌다. 문제는 JWT의 접두사는 빼고 넣어야된다는 것이다.
- 3번째 파라미터 : 쿠키도 키한을 설정해줄 수 있다. 기한을 생략할 경우 `session`으로 들어가게 되는데 `session`은 브라우저가 닫힐 떄(탭말고 완전히 꺼질 때)까지의 기한을 의미한다.

<br/>

#### 쿠키 Get 설정 - 커스텀 Hook  <a id="a11"></a>

쿠키에게 세션값을 가져와서 `verify`를 하여 오류가 없다면 `json객체`를 , 있다면 false를 반환해주는 커스텀훅을 작성해준다.

`verify`는 npm 모듈을 이용하며, js-cookie로 구현한다.

- 커스텀 hook은 use키워드를 앞에 붙여주어야만 한다. 
- 쿠키에서 초기 값을 가져와야 하므로 함수 표현식으로 초기화.

`lib/hooks.js` 파일 생성

```jsx
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// 쿠키에게 세션값을 가져와서 verify를 하여 오류가 없다면 json 객체를 있다면 false를 반환해주는 커스텀훅
export const useAuthed = () => {
  const [ authed ] = useState(() => {
    try {
      const session = Cookies.get('session');
      const key = process.env.REACT_APP_JWT_KEY;
      const res = jwt.verify(session, key);
      return res;
    } catch (error) {
      return false; // 위변조가 되었음을 의미한다.
    }
  });

  return authed;
}

```

<br/>

`.env`파일 작성. 

README.md 파일과 같은 위치에 있어야 한다.

```jsx
REACT_APP_JWT_KEY=nodeauthsecret

```

<br/>

### 커스텀 라우팅  <a id="a12"></a>

라우터에서 검증을 하고 라우터에서 접근하는 즉시 인증을하여 통과시 로그인 아닐 시 로그아웃.

`src/components/Main.jsx`

~~~jsx
function AuthedRoute ({component: Component, authed, ...rest}) {
  return (
    <Route 
      {...rest}
      render = {(props) => authed !== false
        ? <Component {...props} />
        : <Redirect to={{pathname:'/signin', state: {from:props.location}}}/>
      }
    />
  )
}

function App() {
  const isAuthed = useAuthed()
  return (
    <Router>
      <Switch>
        <Route path='/signin' component={ Signin } />
        <Route path='/signup' component={ Signup }/>
        <AuthedRoute authed={isAuthed} path='/user' component={ User }/>
        <Route path='/' component={ Main }/>
      </Switch>
    </Router>
  );

~~~

<br/>