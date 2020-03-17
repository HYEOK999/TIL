![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 10

- [SPA 프로젝트 배포 이해하기](#a1)
- [serve 패키지로 React Wep App 배포하기](#a2)
- [AWS S3 버킷 에 React Wep App 배포하기](#a3)
- [node.js express로 React Wep App 배포하기](#a4)
- [NginX](#a5)
- [서버사이드 렌더링 이해하기](#a6)
- [Optimizing Performance](#a7)

<br/>

-----

## React Study with Mark - Deploy & Optimizing Performance -

- *SPA 프로젝트 배포 이해하기*
- *serve 패키지로 React Wep App 배포하기*
- *AWS S3 에 React Wep App 배포하기*
- *node.js express 로 React Wep App 배포하기*
- *NginX 로 React Wep App 배포하기*
- *서버사이드 렌더링 이해하기*

모든 배포에는 `build 폴더`가 필요하다.

- `npm run build`
- 폴더에 `build 폴더`가 생긴다.
- `build 폴더`는 배포용, 나머지는 파일들은 개발자용
- build 된 파일들을 웹서버를 통해 사용자가 접근할 수 있도록 처리
- 

<br/>

### SPA 프로젝트 배포 이해하기 <a id="a1"></a>

- 모든 요청을 서버에 하고 받아오는 형태가 아니다.
- 라우팅 경로에 상관없이 리액트 App을 받아서 실행한다.
- 라우팅은 받아온 리액트 App을 실행 후 적용한다.
- static파일을 제외한 모든 요청을 Index.html로 응답해주도록 작업한다.
  - **serve -s build**
  - AWS S3에 배포
  - node.js express
  - NginX

<br/>

### serve 패키지로 React Wep App 배포하기 <a id="a2"></a>

```bash
npm install serve -g
serve -s build
```

- serve 라는 패키지를 전역으로 설치한다.
- serve 명령어를 -s 옵션으로 build 폴더를 지정하여 실행한다.
  - -s 옵션은 어떤 라우팅으로 요청해도 index.html 을 응답하도록 한다.

<br/>

### AWS S3 버킷 에 React Wep App 배포하기 <a id="a3"></a>

[Amazon S3 버킷 정적 웹 사이트 호스팅](https://s3.console.aws.amazon.com/s3/home?region=ap-northeast-2#)

#### 버킷 정책 설정

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
	  "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::s3버킷명/*"
      ]
    }
  ]
}
```

<br/>

### node.js express로 React Wep App 배포하기 <a id="a4"></a>

```bash
npm i express
```

`package.json` 에 `script` 추가

-  "start:server": "node server.js"
-  [Nest.js](https://nestjs.com/) 

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
```

<br/>

### NginX <a id="a5"></a>

- Nginx는 웹 서버 소프트웨어 
- 가벼움과 높은 성능을 목표로 한다.
- 트래픽을 최초로 받아주는 문지기 역할
- 리눅스 계열 , 도커, AWS EC2 등등에서 많이 사용됨.

<br/>

### 서버사이드 렌더링 이해하기 <a id="a6"></a>

- 차이점: 동작은 안되지만 잠깐 먼저 보이는 것 - 리액트 앱이 실행되는 순간 리액트 앱에 따라 바뀜
- 서버에서 응답을 가져올때, 기존 처럼 static file 만을 가져오는 것이 아니고, 먼저 서버에서 응답 값을 만들어서 내려주고, 그 후에 static file 을 내려준다.
- static file 을 다 내려받고, 리액트 앱을 브라우저에서 실행한 뒤에는 SPA 처럼 동작하게 된다.
- [Next.js](https://nextjs.org/learn/basics/getting-started)
- isomorphic javascript : 서버와 클라이언트 모두에서 돌 수 있는 자바스크립트여야 한다.

<br/>

#### *React Server Side Rendering*

- React Component 를 브라우저가 아니라 Node.js 에서 사용
- `ReactDOMServer.renderToString();`
- 결과가 문자열 -> 응답으로 내려준다.
- 라우팅, 리덕스 와 같은 처리를 서버에서 진행하고 내려준다.(복잡하고 어려움)
- JSX 가 포함된 리액트 코드를 서버에서 읽을 수 있도록 babel 설정을 해야 한다.
- [Next.js](https://nextjs.org/learn/basics/getting-started) 추후 학습을 꼭 해볼 것.

<br/>

### Optimizing Performance <a id="a7"></a>

> 필요할 때만 렌더하도록 하자. (예 - 값을 메모라이징 하여 비교후 변경될 경우 렌더링한다.)

#### Reconciliation

- 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어 낸다.
- 개발자가 key prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해줄 수 있음
  - 다른 엘리먼트일 때
  - 같은 엘리먼트일 때
  - 같은 컴포넌트일 때
- 렌더가 다시되는 경우
  - props가 바뀔 때
  - state가 바뀔 때
  - 부모가 바뀔 때(첫번째와 동일하지만 상황이 다름)
- 자식에 대한 재귀적 처리(2)와 같은 상황 때문에 key를 씀
  - 리액트는 맨 위에 추가된건지 마지막에 추가된건지 구분을 못하므로
  - shouldComponentUpdate에서 기존에 있던 컴포넌트는 또 렌더를 하지 않도록
    - 리턴 타입 : boolean 타입
  - 요즘은 useMemo