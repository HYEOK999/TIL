![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 25

- 프로미스
  - 프로미스를 만드는 방법
- 프로미스 xhr , fetch, axios, async/await
  - 프로미스 xhr
  - fetch
  - axios
  - async/await
- REST API
- JSON Server 와 POSTMAN
- GraphQL

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 프로미스

- fetch

- axios

- async/await

- postman

- REST API

  <br/>

----------

### 프로미스

> 비동기 처리에 대한 약속

브라우저는 멀티 스레드가 맞으나 JS는 싱글 스레드이다. 

**프로미스 질문 시 나와야하는 단어 : 후속처리함수, 순서보장, 비동기처리에 대한 약속, 콜백패턴**

콜백 패턴은 XHR(XMLHTTPRequset)의 readyState와 onreadystatechange 함수 내에서 후속처리를 해야만하는데 이는 가독성을 크게 감속시킨다. 또한 콜백헬이나 에러처리등의 문제를 가지고 있다.  추가로  비동기처리는 순서를 보장하지 않는다. 이러한 문제들을 해결하기 위해서 프로미스가 나왔다.

기본 콜백패턴에서 에러처리를 해결하기 위해서는 실패에대한 콜백을 또 던져주어야한다. 

<br/>

#### 프로미스를 만드는 방법

`new Promise((resolve, reject) => { 비동기 처리 내용 })`

프로미스는 고차함수다. 고차함수는 인수로 함수를 받을 수 있다. 

프로미스는 내부에서 상태를 가지고 있다.

~~~javascript
// 프로미스 객체는 인수 2개를 받을 수 있다. 성공-resolve, 실패-reject
const promise = new Promise((resolve, reject) => {
  // 여기서 비동기를 처리한다.
  const x = 1;
  setTimeout(() => {
    if (x % 2) resolve(x);
    else reject(new Error('Error'));
  });
});

console.log(typeof promise);

// 프로미스 객체의 후속 처리 함수
promise
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
~~~

.then 은 무조건 promise를 return 한다.

.then이 게속해서 이어지는 것을 프로미스 체인닝 이라 한다.

~~~javascript
const p = new Promise((resolve, reject) => {
	resolve(1);
});

p.then((num) => ++num)
 .then((num) => ++num)
 .then((num) => ++num)
 .then((num) => console.log(num));
~~~

정답은 4가 나온다.

<br/>

### 프로미스 xhr , fetch, axios, async/await

#### 프로미스 xhr

- 기본적으로 프로미스를 이용한 ajax통신을 위해서는 XMLHttpRequest 객체가 있어야만 사용할 수 있다.

~~~javascript
const ajax = (() => {
  const req = (method, url, payload) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = () => {
        reject(new Error(xhr.status));
      };
    });
  };
  return {
    get(url) {
      return req('GET', url);
    },
    post(url, payload) {
      return req('POST', url, payload);
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    }
  };
})();
~~~

~~~javascript
// ajax get 통신
ajax.get('/todos')
  .then((data) => Math.max(0, ...data.map((a) => a.id)))
  .then((id) => ajax.delete(`/todos/${id}`))
  .then(console.log);
~~~

<br/>

#### fetch를 사용했을 경우

- 기본적인 베이스는 promise를 따라간다.
- fetch는 xhr 함수를 만들 필요가 없다. 
- 함수가 ajax 기능을 제공해주기 때문이다.
- 다만 소스가 조금 가독성이 떨이지는 단점이 있다.

~~~javascript
fetch('/todos')
  .then((res) => res.json())
  .then((data) => Math.max(0, ...data.map((a) => a.id)))
  .then((id) => fetch(`/todos/${id}`, {
    method: 'DELETE'
  }))
  .then((res) => res.json())
  .then(console.log);
~~~

<br/>

#### axios를 사용했을 경우

- 기본적인 베이스는 promise를 따라간다.
- axios 역시 fetch처럼 xhr함수를 만들 필요가 없다.
- fetch보다 훨씬 간결하고 가독성이 좋다.
- 다만, html에서 axios의 API를 로드 해줘야만 한다.

(CDN:   `<script src="https://unpkg.com/axios/dist/axios.min.js"></script> `)

~~~javascript
axios.get('/todos')
  .then((res) => Math.max(0, ...(res.data).map((a) => a.id)))
  .then((id) => ajax.delete(`/todos/${id}`))
  .then(console.log);
~~~

<br/>

#### async, await를 사용했을 경우

- xhr , fetch, axios의 비동기 방식을 동기 방식 처럼 사용하기 위해서 사용한다.
- async 함수 내에 있어야만 반드시 순서가 보장된다. 
- 프로미스로 짠 코드들의 then은 전부다 async 안에 반드시 들어가 있어야한다!

~~~javascript
(async () => {
  let todos = await ajax.get('/todos');
  const id = Math.max(0, ...todos.map((todo) => todo.id));
  todos = await ajax.delete(`/todos/${id}`);
  console.log(todos);
})();
~~~

<br/>

### REST API

> REST란, 자원을 정의하고 자원에 대한 주소를 지정하는 방법의 모음

- 백엔드가 개발이 늦을 경우 프론트는 짝퉁서버 Mock Server를 만들어서 사용할 수도 있다.
	백엔드가 완료될 경우 프론트는 url만 백엔드 서버로 교체해서 사용한다.
	MockServer를 만드는 방법은 여라가지가 있다. tool(JSON-Server)을 이용하여 사용할 수도 있다. 
- 백엔드가 개발이 빠를 경우 해당 백엔드가 잘되는지 테스트를 해야만한다. 여기서 프론트는 Postman과 같은 tool 을 이용하여 이를 테스트 할 수 있다.

<br/>

### JSON Server 와 POSTMAN

JSON.Server의 db.json에서 모든 프로퍼티 키는 반드시 쌍따옴표(`"`)로 열고 닫는다. 그냥 따옴표(`'`) 안된다. 반드시 쌍따옴표(`"`)

postman에서 테스트 주소를 작성할 때 반드시 `http://`를 적어주어야만 한다.

POST  ➤  Body  ➤  raw  ➤  JSON 체크

<br/>

### GraphQL 

facebook이 만든 새로운 패러다임. REST API와는 달리 정해진 형태가 있지 않다. 

REST API 다음 차세대 데이터 질의어(SQL)로 각광을 받고 있으며 REST 및 부속 웹서비스 아키텍쳐를 대체할 수 있다. 클라이언트는 필요한 데이터의 구조를 지정할 수 있으며, 서버는 정확히 동일한 구조로 데이터를 반환한다.

<br/>

