![rest](https://user-images.githubusercontent.com/31315644/68327674-22509680-0111-11ea-9ab0-8cff7da105ba.jpg)

------

## JavaScript REST API

- REST(Representational State Transfer) API
  - [REST API 중심 규칙](#a1)
    - [URI는 정보의 자원을 표현](#a2)
    - [자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현](#a3)
  - [HTTP Method](#a4)
  - [REST API의 구성](#a5)
  - [REST API 예](#a6)
    - [json-server](#a7)
    - [GET](#a8)
      - [특정 아이디만 선택이 가능하다.](#a9)
    - [POST](#a10)
    - [PUT](#a11)
    - [PATCH](#a12)
    - [DELETE](#a13)

<br/>

------

# 35강

## REST(Representational State Transfer) API

REST의 기본 원칙을 성실히 지킨 서비스 디자인을 “RESTful”이라고 표현한다.

Method 작성 시 시멘틱하게 작성하는 것. 

따르지 않더라도 에러가 나는 것은 아니지만 협업하기 위해 필요로 한다.

<br/>

### REST API 중심 규칙 <a id="a1"></a>

- URI는 자원을 표현하는데 집중
- HTTP Method는 행위에 대한 정의에 집중

<br/>

#### 1. URI는 정보의 자원을 표현 <a id="a2"></a>

- 리소스명은 명사위주로 작성한다. ( 동사x , 명사o )
- get같은 행위에 대한 표현이 들어가는 것은 좋지 않다.

~~~bash
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
~~~

<br/>

#### 2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현 <a id="a3"></a>

~~~bash
# bad
GET /todos/delete/1

# good
DELETE /todos/1
~~~

<br/>

### HTTP Method <a id="a4"></a>

주로 5가지의 Method(GET, POST, PUT, PATCH, DELETE)를 사용하여 CRUD를 구현한다.
(CRUD : Create, Read, Update, Delete)

| Method | Action         | 역할                     |
| :----- | :------------- | :----------------------- |
| GET    | index/retrieve | 모든/특정 리소스를 조회  |
| POST   | create         | 리소스를 생성            |
| PUT    | update all     | **리소스의 전체를 갱신** |
| PATCH  | update         | **리소스의 일부를 갱신** |
| DELETE | delete         | 리소스를 삭제            |

<br/>

### REST API의 구성 <a id="a5"></a>

- 자원(Resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성된다. 
- REST는 자체 표현 구조(Self-descriptiveness)로 구성되어 REST API만으로 요청을 이해할 수 있다.

| 구성 요소       | 내용                    | 표현 방법             |
| :-------------- | :---------------------- | :-------------------- |
| Resource        | 자원                    | HTTP URI              |
| Verb            | 자원에 대한 행위        | HTTP Method           |
| Representations | 자원에 대한 행위의 내용 | HTTP Message Pay Load |

<br/>

### REST API 예  <a id="a6"></a>

#### json-server  <a id="a7"></a>

폴더 만들고 접근 후 다음 명령을 사용하여 예습을 준비한다.

~~~bash
$ mkdir rest-api-exam && cd rest-api-exam
$ npm init -y
$ npm install json-server
~~~

<br/>

db.json 파일을 아래와 같이 생성한다.

```json
{
  "todos": [
    { "id": 1, "content": "HTML", "completed": false },
    { "id": 2, "content": "CSS", "completed": true },
    { "id": 3, "content": "Javascript", "completed": false }
  ]
}
```

package.json 파일을 수정한다.

```json
{
  "name": "rest-api-exam",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "json-server --watch db.json --port 5000"
  },
  "dependencies": {
    "json-server": "^0.15.0"
  }
}
```

실행은 `$ npm start` 명령을 이용하며 포트는 5000 이다.

<br/>

#### GET  <a id="a8"></a>

GET은 **리소스를 조회, 검색** 할 때 사용한다.

todos 리소스에서 모든 todo를 조회(index)한다.

![get](https://user-images.githubusercontent.com/31315644/68354814-bdb52c00-0150-11ea-9523-10b6c09a3d1c.jpeg)

GET 요청을 보낼떄마다 서버측에 로그가 뜬다.

GET 요청을 RESTful 하게 하여 명사로 todos를 달라고 명시적으로 접근하였다.

<br/>

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/todos/');
xhr.send();

xhr.onreadystatechange = function (e) {
if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) { // 200: OK => https://httpstatuses.com
    console.log(xhr.responseText);
    } else {
    console.log("Error!");
  }
};
~~~

<br/>

##### 특정 아이디만 선택이 가능하다.  <a id="a9"></a>

~~~bash
$ curl -X GET http://localhost:5000/todos/1
// {
//   "id": 1,
//   "content": "HTML",
//   "completed": false
// }
~~~

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/todos/1');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
~~~

<br/>

#### POST  <a id="a10"></a>

POST 는 **리소스를 생성**할 때 사용한다.

~~~bash
$ curl -X POST http://localhost:5000/todos -H "Content-Type: application/json" -d '{"id": 4, "content": "Angular", "completed": true}'
// {
//   "id": 4,
//   "content": "Angular",
//   "completed": true
// }
~~~

`-H "Content-Type: application/json" -d '{"id": 4, "content": "Angular", "completed": true}'`

는 리소스를 생성하기 위한 명령어다.

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:5000/todos');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 201) { // 201: Created
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
~~~

<br/>

#### PUT  <a id="a11"></a>

PUT은 특정 리소스의 **전체를 갱신**할 때 사용한다. (Update)
todos 리소스에서 id를 사용하여 todo를 특정하여 id를 제외한 리소스 전체를 갱신한다.

~~~bash
$ curl -X PUT http://localhost:5000/todos/4 -H "Content-Type: application/json" -d '{"id": 4, "content": "React", "completed": false}'
// {
//   "content": "React",
//   "completed": false,
//   "id": 4
// }
~~~

"content": "Angular" -> "content": "React"로 변경되었다.

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('PUT', 'http://localhost:5000/todos/4');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ id: 4, content: 'React', completed: false }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
~~~

<br/>

#### PATCH  <a id="a12"></a>

PATCH는 특정 리소스의 **일부를 갱신**할 때 사용한다. 
todos 리소스의 id를 사용하여 todo를 특정하여 completed만을 true로 갱신한다.

~~~bash
$ curl -X PATCH http://localhost:5000/todos/4 -H "Content-Type: application/json" -d '{"completed": true}'
// {
//   "id": 4,
//   "content": "React",
//   "completed": true
// }
~~~

"completed": false -> "completed": true 로 변경되었다.

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('PATCH', 'http://localhost:5000/todos/4');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ completed: true }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
~~~

<br/>

#### DELETE  <a id="a13"></a>

DELETE는 특정 리소스의 **일부를 삭제**할 때 사용한다. 
todos 리소스에서 id를 사용하여 todo를 특정하고 삭제한다.

```bash
$ curl -X DELETE http://localhost:5000/todos/4
// {}
```

**Script로 작성**

~~~javascript
const xhr = new XMLHttpRequest();
xhr.open('DELETE', 'http://localhost:5000/todos/4');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
~~~

<br/>

