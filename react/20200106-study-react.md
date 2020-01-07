![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 12

- 예제 : 로그인 기능 만들기
  1. 새로운 프로젝트 생성
  2. 백엔드 추가
  3. lib폴더 생성하고 Axios API 작성 해주기
  4. SignUp 코드 작성 - input 유효성 검사하기
  5. SignIn 코드 작성 - [쿠키](#a1) 이용하기
- [쿠키](#a1)
- [로컬스토리지](#a2)
- [쿠키 vs 로컬스토리지](#a3)
- [세션](#a4)
- [토큰 기반 인증 방식 (JWT)](#a5)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 쿠키
- 로컬스토리지
- 세션
- JWT
- 쿠키 vs 로컬스토리지

<br/>

--------

### 예제 : 로그인 기능 만들기

<img src="https://user-images.githubusercontent.com/31315644/71588586-61c1bf00-2b65-11ea-961c-3ac94f4ccb23.jpeg" alt="file-structure" style="zoom:50%;" />

#### 1. 새로운 프로젝트 생성

App.js에 리액트 라우터를 활용.

```bash
npm i react-router-dom --save
```

- `/signin` - 회원 로그인 폼 : 이메일, 패스워드, 로그인버튼
- `/signup` - 회원가입 폼 : 이메일, 패스워드, 가입버튼
- `/user` - 빈페이지 작성 ( User )
- `/` - 빈페이지 작성 ( Main )

<br/>

**App.js**

```jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Signin from './components/SignIn';
import Signup from './components/SignUp';
import User from './components/User';
import Main from './components/Main';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signin' component={ Signin } />
        <Route path='/signup' component={ Signup }/>
        <Route path='/user' component={ User }/>
        <Route path='/' component={ Main }/>
      </Switch>
    </Router>
    // </Provider>
  );
}

export default App;

```

<br/>

#### 2. 백엔드 추가

백엔드는 보내준 압축 파일을 현재 진행중인 프로젝트 말고 다른 위치에서 압축을 풀고 해당 명령어를 입력해준다.

```bash
npm i
npm start
```

백엔드의 포트번호를 3001번대로 변경해준다.

**검색 - 3000 : 1개뜸**

```javascript
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);	
```

<br/>

##### 포스트맨(Post Man) 테스트하기

포스트맨으로 데이터가 잘 흘러가는지 테스트를 해본다.

1. 회원가입 부분에서 `POST`메소드를 통해 회원가입을 요청했을 때의 결과이다.

![token-signup](https://user-images.githubusercontent.com/31315644/71582889-65e2e200-2b4f-11ea-80a1-36a9839d7c04.jpeg)

<br/>

2. 회원가입 후 로그인을 할 때 `POST`로 데이터를 보냈을 때의 결과이다.

   여기서 데이터 조회를 해야할텐데 어째서 `GET` 이 아닌 `POST` 를 사용한 것은 우선 해당 프로젝트에서 데이터를 요청을 하는 방식은 `<form>`태그를 이용했다는 것이고 `GET`을 사용할 경우 ID, PASSWORD가 모두 URL로 노출되기 때문에 `POST`를 이용한다.

![token-signin](https://user-images.githubusercontent.com/31315644/71582807-17cdde80-2b4f-11ea-9859-7bc0976d5fb9.jpeg)

<br/>

#### 3. lib폴더 생성하고 Axios API 작성 해주기

2번에서 했던 데이터들을 불러오기 위해서 2개의 API를 작성해준다.

**lib/api.js**

```javascript
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

```

<br/>

#### 4. SignUp 코드 작성 - input 유효성 검사하기

우선, 회원가입 폼(/signup)에서는 ID와 PW를 2개받고 입력된 이메일과 비밀번호에 대해 유효검사를 해주어야한다.

직접적으로 작성해도 되지만 react에서는 hook을 포함한 유효검사 라이브러리를 제공한다.

[React-Hook-Form](https://react-hook-form.com/)

```bash
npm i react-hook-form --save
```

<br/>

3번에서 진행한 api를 불러오고 async/await를 이용하여 POST를 요청하도록 하자.

성공적으로 요청이 돌아왔다면 `./signin`으로 URL을 라우팅하도록 한다.

**components/SignUp/index.jsx**

```jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signUp } from '../../lib/api';

const SignUp = (props) => {
  const { handleSubmit, register, watch, errors } = useForm();
  const [ alreadyExist, setAlreadyExist ] = useState(false);
  const onSubmit = async values => {
    const { success , msg } = await signUp(values);
    if (success) {
      props.history.push('./signin');
    } else if ( msg === 'Username already exists.') {
      setAlreadyExist(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        Email :
        <input
          id="email"
          name="username"
          type="text"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}
      </label>
      <br/>
      <label htmlFor="pwd1">
        Password :
        <input
          id="pwd1"
          name="password1"
          type="password"
          ref={register({
            required: 'Required'
          })}
        />
      </label>
      <br/>
      <label htmlFor="pwd2">
        Password 재확인 :
        <input
          id="pwd2"
          name="password2"
          type="password"
          ref={register({
            required: 'Required',
            validate: (value) => {
              return value === watch('password1');
            }
          })}
        />
      </label>
      <br/>
      { errors.password2 && '비밀번호가 일치하지 않습니다.' }
      { alreadyExist && '이미 존재하는 아이디 입니다.'}
      <br/>
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignUp;
```

<br/>

#### 5.  SignIn 코드 작성 - [쿠키](#a1) 이용하기

로그인 시 로그인 지속시간 과 [JWT](#a5) 데이터를 임시로 저장하기 위한 저장소가 필요한데 그것을 클라이언트 브라우저의 [쿠키](#a1)에 저장하도록 한다.

쿠키는 그냥 사용할 경우 난잡하므로 특정 라이브러리를 이용하도록 하자.

[JS-Cookie](https://github.com/js-cookie/js-cookie)

```bash
 npm i js-cookie --save
```

```bash
Cookie.set('session',JWT토큰값)

```

<br/>

추가로 4번에서 했던 유효성 검사를 여기서도 해줘야하기 때문에 `react-hook-form`을 여기서도 작성해준다.

그리고 3번에서 진행한 api를 불러오고 async/await를 이용하여 POST를 요청해 토큰(JWT)을 받아가지고 온다.

성공적으로 요청이 돌아왔다면 쿠키에 `session`이라는 키에 토큰을 값으로 하여 저장하고 `/ (Main.js)`으로 URL을 라우팅하도록 한다.

**components/SignIn/index.jsx**

```jsx
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signIn } from '../../lib/api';
import Cookies from 'js-cookie';

const SignIn = (props) => {
  const { handleSubmit, register, watch, errors } = useForm();
  const [ alreadyExist, setAlreadyExist ] = useState(false);
  const onSubmit = async values => {
    const { success , token } = await signIn(values);
    if (success) {
      Cookies.set('session', token.split(' ')[1]);
      props.history.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        Email :
        <input
          id="email"
          name="username"
          type="text"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}
      </label>
      <br/>
      <label htmlFor="pwd">
        Password :
        <input
          id="pwd"
          name="password"
          type="password"
          ref={register({
            required: 'Required'
          })}
        />
      </label>
      <br/>
      { alreadyExist && '이미 존재하는 아이디 입니다.'}
      <br/>
      <button type="submit">로그인</button>
    </form>
  );
}

export default SignIn;

```

<br/>

---------

### 쿠키 <a id="a1"></a>

**쿠키** : 서버에 보내기 위한 데이터를 임시 저장하기 위한 클라이언트 브라우저 저장소. 

**쿠키를 사용하는 이유** : 서버에 전송할 데이터를 클라이언트에 저장하기 위해서 + [JWT(JS WEB TOKEN)](#a5) 저장하기 위해서.

- expires를 작성 안해줄 경우 즉시 삭제된다. (UTC 스트링)
- path를 설정하면 설정된 url에서만 쿠키를 접근하게 해준다. (쿠키를 사용하는 사이트에서만 읽고 쓸수 있다.)

쿠키 폴리필

```javascript
// 쿠키의 기본 표현식 (Document의 쿠키)
document.cookie = "key=value; expires=Thu, 01 JAN 1970 00:00:00 UTC; path=/;";

// 위 쿠키 기본 표현식을 함수로 표현해서 쉽게 사용할 때 만들어본 함수
function setCookie(cname, cvalue, exdays) {
  // Expiration days
  let d = new Date()
  d.setTime(d.getTime() + (exdays*60*60*24*1000))
  const expires = "expires" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + "path=/" 
  //path는 특정한 페이지에서만 쿠키를 쓰고 싶을때 사용한다.
}

setCookie("username", "react", 1); // 하루 뒤에는 이 쿠키가 자동으로 삭제된다. - 이름 , 해당값, 만료기간 설정

```

**브라우저 쿠키 메소드를 이용하는 것보다는 Node Package Manager를 **
**통한 쿠키라이브러리를 쓰는것을 추천한다. [JS-Cookie](https://github.com/js-cookie/js-cookie)**

<br/>

### 로컬스토리지 <a id="a2"></a>

**로컬스토리지** : 쿠키로 쓸 데이터는 서버에 전송을 하겠다는 전제, 반대로 서버로 전송할 필요가 없는 데이터는 로컬 스토리지를 이용.

값으로 JSON 데이터를 넣을 때는 JSON.stringfy(넣을 값) 을 이용한다.

```javascript
//데이터 저장
window.localStorage.setItem('test','123');

//데이터 조회
window.localStorage.getItem('test');

//데이터 1개 삭제
window.localStorage.removeItem('test');

//데이터 전체 삭제
window.localStorage.clear();

```

<br/>

### 로컬스토리지 vs 쿠키 <a id="a3"></a>

쿠키는 초창기부터 만들어진 브라우저 저장소이기 때문에 사용방법이 난잡하다. (물론 쓰기 쉽게 개발된 라이브러리가 있다.)

로컬스토리지는 비교적으로 쉽게 사용할 수 있도록 정의가 되어있는 편인데, 복잡한 표현식을 가진 **쿠키를 쓰는 이유는 오로지 서버에게 전송할 데이터를 클라이언트에게 저장하고 싶을 때** 사용한다.

쿠키의 저장소는 4000kb(Chrome 기준)로 매우 작기 때문에 모든 데이터를 쿠키에 저장해서는 안된다. 반드시 서버와 주고받을 데이터만 저장한다.

로컬스토리지의 저장소는 10mb(Chrome 기준)이다. Redux를 통해 저장할 데이터는 비교적 용량이 큰 로컬스토리지에 저장하는 것이 좋다.

`json web token`의 경우 쿠키에 넣는 것이 바람직하다.

<br/>

### 세션 <a id="a4"></a>

**세션** : 서버에서 저장하고 있는 데이터(정보). 

**세션을 사용하는 이유** : 쿠키는 세션 저장소에 담긴 데이터를 얻기 위한 열쇠 정도로 생각하면 편하다. 쿠키를 통하여 세션의 정보를 열람할 수 있다.

<br/>

### 토큰 기반 인증 방식 (JWT) <a id="a5"></a>

기존 서버의 인증 기반 방식은 서버에게 데이터를 몰아주는 식의 방식을 사용했다. 따라서 서버에게 자연스럽게 과부하가 걸리는등의 문제를 야기했는데 이를 토큰이라는 매개체를 통해서 해결한다.

JWT는 세션/쿠키와 함께 모바일과 웹의 인증을 다루는 가장 많이 사용되는 표준 중 하나이다.

WEB상에서 안정하게 사용할 수 있는 식별자이며 Json Web Token의 약자로 인증에 필요한 정보들을 암호화시킨 토큰을 뜻하는데 위의 세션/쿠키 방식과 유사하게 사용자는 Access Token(JWT 토큰)을 HTTP 헤더에 실어 서버로 보내게 된다.

JWT는 다음과 같은 경우에 많이 사용된다.

- **회원 인증:** JWT 를 사용하는 가장 흔한 시나리오 이다. 유저가 로그인을 하면, 서버는 유저의 정보에 기반한 토큰을 발급하여 유저에게 전달해줍니다. 그 후, 유저가 서버에 요청을 할 때 마다 JWT를 포함하여 전달한다. 서버가 클라이언트에게서 요청을 받을때 마다, 해당 토큰이 유효하고 인증됐는지 검증을 하고, 유저가 요청한 작업에 권한이 있는지 확인하여 작업을 처리한다.
  서버측에서는 유저의 세션을 유지 할 필요가 없다. 즉 유저가 로그인되어있는지 안되어있는지 신경 쓸 필요가 없고, 유저가 요청을 했을때 토큰만 확인하면 되니, 세션 관리가 필요 없어서 서버 자원을 많이 아낄 수 있다.
- **정보 교류**: JWT는 두 개체 사이에서 안정성있게 정보를 교환하기에 좋은 방법이다. 그 이유는, 정보가 sign 이 되어있기 때문에 정보를 보낸이가 바뀌진 않았는지, 또 정보가 도중에 조작되지는 않았는지 검증할 수 있다.

<br/>