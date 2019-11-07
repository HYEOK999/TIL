![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 23

- 비동기식 처리 모델과 Ajax

  - 상대 경로 와 절대 경로
- 클라이언트 및 서버 지식
  - NPM & Express 를 이용한 로컬 서버 개설
  - Ajax 란?
    - Ajax 장점
    - Ajax 단점
    - Ajax 요청 방법
  - REST API
  - Method : GET . POST , PUT , DELETE , PATCH
  - 콜백의 단점
  - [실습](#a1)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 상대경로 

- 절대경로

- Ajax

- REST API

- 요청 Method

- 콜백의 단점

  <br/>

-------

## 비동기식 처리 모델과 Ajax

<br/>

### 상대 경로 와 절대 경로

`.` : 지금 이 경로를 실행하고 있는 파일의 위치
`/` : 서버의 루트

- 상대 경로 : 특정 곳을 기준으로 해서 위치의 경로를 기입하는 방식
  - Desktop\test.txt
- 절대 경로 :  최초의 시작점으로 경유한 경로를 전부 기입하는 방식
  - C:\Users\KJH\Desktop\test.txt

<br/>

### 클라이언트 및 서버 지식

1. 브라우저에게 어떤 파일을 달라고 할 때는 위치를 알려줌 (일단 서버부터 알려주기.) 
2. 서버마다 중복되지 않는 식별자가 있어야 함(IP) 도매인과 IP는 맵핑되어야 함. 
3. naver.com이라고 치면 IP로 찾아가야함.  (DNS에 접근)
4. DNS는 Domain Name System 
5. sever는 폴더를 가지고 있음. 필요한 파일을 찾아서 읽어야함. 파일 안에는 2진수가 들어있음. 
6. 하드디스크에 있는 파일을 읽는다는 것은 메모리에 올린다는 것을 의미. 
7. 하드디스크에 물리적으로 있었던 파일이 메모리 상으로 올라옴. 
8. 랜선을 타고 아스키코드를 보낸다. 
9. 브라우저가 아스키코드를 받으면 메모리에 가지고 있다가 파싱. ( = 다운로드 )
10. 아스키코드는 문자열. 유니코드는 언어에 종속되어있지 않음. 
11. `src`는 서버의 경로로 써줘야 함. 
12. Ajax는 통신을 하는 수단을 배우는 것.  
13. Request가 가면 Response가 와야 함.
14. Node.js 프레임워크 Express.
15. npm은 Node Package Manager.
16. Node.js는 모두 비동기, 콜백이다. 
17. 정적인 데이터를 넘기려고 하면 어디에 가져다놓을지 생각해봐야함. (보통 루트에 갖다놔야 함.) 
18. 우리가 만든 서버가 루트로 어디를 갖게 할지 설정, 기본적으로 루트로 접근했을 때 index.html을 리턴할 수 있도록 해야함. 
19. 정적 파일의 제공. 
20. 서버가 보내온 파일은 아스키코드(1바이트 문자열)로 보내진다. 
21. 실무에 나갈 수록 오픈소스 등이 많아지는데 이런 것들을 통합적으로 관리 하기 위해 나온것이 Package Manager다.
22. 서버와 클라이언트를 명확하게 나눌 수 있어야 함. 클라이언트가 요청을 날리는 방법 알아야 함.

<br/>

### NPM & Express 를 이용한 로컬 서버 개설

node 상에서 사용되는 패키지 매니저는 `npm` 이다.
node는 전부 비동기고 전부 콜백 방식이다.
`localhost` : 개발단계에서 자신의 로컬 컴퓨터에서 테스트를 하기 위해서 서버환경을 만들어서 사용한 루프백 호스트명.

아래 명령어를 통해 간단한 서버를 개설한다.

- npm init -y : package.json 을 생성한다.
- `npm install express` : express라는 패키지를 설치하겠다. (위치는 현재 디렉토리 위치)
- 위 명령어 실행 후 `package.json` 의 `dependencies`에 설치된 패키지 명과 버전이 적히게 된다.
- `node_modules폴더`가 생기는데 패키지를 `uninstall`하고 싶다면 해당 폴더를 삭제 하면된다.
- 재 설치를 원할 경우 `npm i`만 쳐주면 된다.
- `npm install -g nodemon ` : nodemon 패키지 전역 설치 -> 서버를 수시로 재시작 안해도 작동하게끔 해준다.

<br/>

### Ajax 란?

> JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술,
>
> XML : 데이터 형식의 일종

#### Ajax 장점

- 페이지 이동없이 고속으로 화면 전환 가능
- 서버처리를 기다리 않고 비동기 요청 가능
- 수신하는 데이터 양을 줄일 수 있고, 클라이언트에게 처리를 위임할 수 있다.

<br/>

#### Ajax 단점

- 동일-출처 정책으로 인해 다른 도메인과는 통신이 불가능하다.( **이를 해결하기 위해 JSONP , CORS 등이 나옴**)
- Ajax를 쓸 수 없는 브라우저가 있다.
- Http 클라이언트 기능이 한정됨.
- 페이지 이동없는 통신으로 인한 보안상 문제
- 지원하는 Charset이 한정됨.
- 요청을 남발시 서버 부하가 늘어남.
- Debugging에 용이하지 않음. ( 에러를 잡기가 쉽지 않다. )

<br/>

#### Ajax 요청 방법

- XMLHttpRequest 
- Axios : XMLHttpRequest를 좀 더 편리하게 쓰고자 나온 라이브러리. 현재 가장 많이 사용되는 HTTP 통신 라이브러리.
- fetch : Axios라이브러리를 대체 하기 위해 나온 Web API( 라이브러리 import가 필요없다. )

<br/>

### REST API

> Method 작성 시 시멘틱하게 작성하는 것. 
>
> 따르지 않더라도 에러가 나는 것은 아니지만 협업하기 위해 필요로 한다.

<br/>

### Method : GET . POST , PUT , DELETE , PATCH

> Method는 클라이언트가 서버로 요청을 날리는 방법.

- GET -> /todos : 모든 todos를 전부 가지고 온다.
  GET -> /todos/1 : 모든 todos데이터 중에서 id가 1인 것만 가지고 온다.
- POST -> 데이터를 생성할 떄 , payload
- PUT -> 데이터 전체를 고칠떄 (예, content도 고치고 completed도 고칠떄) , payload
- PATCH -> 데이터 일부를 고칠떄 (예, content만 고칠 떄) , payload
- DELETE -> 전체 지우기 , 일부 지우기 (일부를 지우려면 조건을 필요로 함)

<br/>

### 콜백의 단점

Node Js의 모든 메서드는 전부 비동기이기 떄문에 순서를 보장해주기 위해서 비동기 함수 내부에서 콜백으로 주는 방법밖에 없다.

콜백의 단점 : 콜백헬, 에러처리 불가

따라서 추가 된 것 , Promise(ES6) , Generate(문법이 어려움) , async(await) , RxJS

<br/>

### 실습 <a id="a1"></a>

**서버 실행 : npm start**

![폴더구조](https://user-images.githubusercontent.com/31315644/68385319-db0fe780-019c-11ea-8883-039b6969cad3.png)

1. #### 서버 개설 및 준비 

   `cd ~/Desktop/` : Desktop 디렉토리로 이동.

   `mkdir practice-server && cd practice-server` : practice-server 폴더 만들고 이동.

   `npm init -y` : package.json 을 생성한다.

   `npm install express`  : express 패키지를 설치

   `npm install -g nodemon ` : nodemon 패키지 전역 설치 -> 서버를 수시로 재시작 안해도 작동하게끔 해준다.

   `code . ` : VSCode로 해당 폴더 열기.

~~~bash
// 터미널
cd ~/Desktop/
mkdir practice-server && cd practice-server
npm init -y  
npm install express 
npm install -g nodemon 
code . 
~~~

 만들어진 폴더에 `package.json` 파일의 `dependencies`에 express가 적혀져 있는 지 확인한다.

`package.json` 파일에 `scripts`내용을 지우고 다음과 같이 적는다.

~~~json
// package.json
"scripts": {
	"start": "nodemon app"
 }
~~~

public 폴더 생성 ➤ 하위에 index.html 파일 , js 폴더 생성 ➤ js 폴더 하위에 index.js 생성

<br/>

2. #### app.js 작성

   requestBody에는 key와 value를 담고 있는데 기본적으로 undefined 이기 떄문에, 

   바디 파싱 미들웨어 `app.use(express.json());`  `app.use(express.urlencoded({ extended: true }));`

   를 사용해야만 키와 값을 제대로 사용할 수 있다.

~~~javascript
// express 패키지(모듈)를 가지고 온다.
const express = require('express');
const app = express();

let todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 2, content: 'CSS', completed: false }
    ];

// 루트 폴더를 'public'폴더로 지정함.
// app.use는 미들웨어다. 미들웨어는 딱 1번만 실행됨.
app.use(express.static('public'));

// 바디 파싱 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing

// request와 response 객체는 express가 제공함 
// 보통 response는 html을 갖고있음
// rest명령규칙으로 정함
app.get('/',(req, res) => {
  res.send('hello world!');
});

app.get('/todos', (req, res) => {
  res.send(todos);
})

app.post('/todos', (req, res) => {
    console.log(req.body);
  res.send('POST');
})

// 해당 앱은 3000번 포트를 이용하겠다고 명시함.
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
~~~

<br/>

3. #### index.html 작성

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script defer src="js/index.js"></script>
</head>
<body>
  <input type="text" placeholder="enter todo!">
  <ul class="todos"></ul>
</body>
</html>
~~~

<br/>

4. #### index.js

   `new XMLHttpRequest();` : XMLHttpRequest 객체 생성 ( Ajax 요청을 생성하고 전송 )

   `xhr.open('GET', url)` : 서버로의 요청을 준비. 1인수 : 요청메소드 (GET, POST...) 2인수 : url (경로)

   `xhr.send()` : 준비된 요청을 서버에 전달한다.( GET - 인수가 무시됨 ,  POST - 보낼데이터 인수로 줘야함(페이로드) )

   `xhr.readyState ` : 0 1 2 3 4로 각각의 상태를 나타냄. 4는 서버측이 데이터를 전부 받았음을 의미.

   `XMLHttpRequest.DONE` : 고정 값 4를 가리킨다. 요청 보내 졌을 떄 확인용 정적 프로퍼피

   `xhr.status` : 서버에게 보낸 요청에 대한 http 에러코드가 담겨져 있다.( 200은 에러없이 전송 성공을 의미 )

   `xhr.response` : 서버로부터 받아온 데이터가 담겨져있다.

   `JSON.parse` : 함수로 해당 JSON 문자열을 해제 시킨다.

~~~~javascript
//DOMs
const $todos = document.querySelector('.todos');
let todos = [];

const get = (url, f) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(); // payLoad가 있다면 send에게 주고 없다면 비워둠.

  xhr.onreadystatechange = () => {
    if( xhr.readyState !== XMLHttpRequest.DONE ) return;
    if( xhr.status === 200 ) {
      f(JSON.parse(xhr.response));
    } else {
      console.error('Error : ', xhr.status, xhr.statusText);
    }
  };
}

const getTodos = () => {
  get('./todos', render);
};

const render = (data) => {
    console.log('Render');
    let html = '';
    todos = data;
    // 디스트럭처링
    todos.forEach(({ id, content, completed }) => {
      html += `
      <li id="${id}" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
        <label for="ck-${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`;
    });
    $todos.innerHTML = html;
  };

window.onload = () => {
  getTodos();
}
~~~~

<br/>