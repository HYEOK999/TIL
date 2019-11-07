<img src="https://user-images.githubusercontent.com/31315644/68359576-b3e6f500-015f-11ea-9ef8-f45b78dd0f97.png" alt="arrow" style="zoom: 50%;" />

------

## JavaScript 비동기식 처리 모델과 Ajax

- 비동기식 처리 모델과 Ajax
  - Ajax (Asynchronous JavaSriopt ans XML)
  - JSON  (JavaScript Object Notation)
    - [JSON.stringify](#a1)
    - [JSON.parse](#a2)
    - [XMLHttpRequest](#a3)
      - [Ajax request](#a4)
        - [XMLHttpRequest.open](#a5)
        - [XMLHttpRequest.send](#a6)
        - [XMLHttpRequest.setRequestHeader](#a7)
          - [Content-type](#a8)
          - [Accept](#a9)
      - [Ajax response](#a10)
    - [Web Server](#b1)
    - [Ajax 예제](#b2)
      - [Load HTML](#b3)
      - [Load JSON](#b4)
      - [Load JSONP](#b5)
        - [동일출처원칙 우회 방법 3가지](#b6)

<br/>

------

# 34강

## 비동기식 처리 모델과 Ajax

<br/>

### Ajax (Asynchronous JavaSriopt ans XML)

브라우저에서 웹페이지를 요청하거나 링크를 클릭하면 화면 갱신이 발생한다. 이것은 브라우저와 서버와의 통신에 의한 것이다.

<img src="https://poiemaweb.com/img/req_res.png" alt="Request &amp; Response" style="zoom: 33%;" />

서버는 요청받은 페이지(HTML)를 반환하는데 이때 HTML에서 로드하는 CSS 나 JavaScript 파일들로 같이 반환된다.

클라이언트의 요청에 따라 서버는 정적인 파일 혹은 서버 사이드 프로그램에서 만든 파일이나 데이터를 반환할 수도 있다.

서버로부터 웹페이지가 반환되면 클라이언트(브라우저)는 이를 렌더링하여 화면에 표시한다.

<img src="https://poiemaweb.com/img/traditional-webpage-lifecycle.png" alt="traditional-webpage-lifecycle" style="zoom:48%;" />

<br/>

> Ajax(Asynchronous JavaScript and XML)는 자바스크립트를 이용해서 *비동기적(Asynchronous)*으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식을 의미한다.

**서버로부터 웹페이지가 반환되면 화면 전체를 갱신해야 하는데 페이지 일부만을 갱신하고도 동일한 효과를 볼 수 있도록 하는 것이 Ajax이다.** 페이지 전체를 로드하여 렌더링할 필요가 없고 **갱신이 필요한 일부만 로드하여 갱신하면 되므로 빠른 퍼포먼스와 부드러운 화면 표시 효과**를 기대할 수 있다.

<img src="https://poiemaweb.com/img/ajax-webpage-lifecycle.png" alt="ajax-webpage-lifecycle" style="zoom:50%;" />

<br/>

### JSON  (JavaScript Object Notation)

- 클라이언트와 서버는 서로 간의 데이터 교환이 필요하다.

  **JSON은 이러한 데이터교환을 위한 규칙 즉 데이터 포맷을 의미한다.**

- **JSON은 순수한 텍스트로 구성된 규칙이 있는 데이터 구조이다.**

- 일반 텍스트 포맷보다는 효과적인 데이터 구조화가 가능하고 XML 포맷보다 가볍고 사용하기 간편하고 가독성도 좋다.

- **키는 반드시 큰따옴표(작은따옴표 사용불가)로 둘러싸야 한다.**

~~~javascript
{
  "name": "Lee",
  "gender": "male",
  "age": 20,
  "alive": true
}
~~~

<br/>

### JSON.stringify  <a id="a1"></a>

> 객체를 JSON 형식의 문자열로 변환한다.
>
> 객체 -> JSON

~~~~javascript
const o = { name: 'Lee', gender: 'male', age: 20 };

// 객체 => JSON 형식의 문자열
const strObject = JSON.stringify(o);
console.log(typeof strObject, strObject);
// string {"name":"Lee","gender":"male","age":20}

// 객체 => JSON 형식의 문자열 + prettify
const strPrettyObject = JSON.stringify(o, null, 2);
console.log(typeof strPrettyObject, strPrettyObject);
/*
string {
  "name": "Lee",
  "gender": "male",
  "age": 20
}
*/

// replacer
// 값의 타입이 Number이면 필터링되어 반환되지 않는다.
function filter(key, value) {
  // undefined: 반환하지 않음
  return typeof value === 'number' ? undefined : value;
}

// 객체 => JSON 형식의 문자열 + replacer + prettify
const strFilteredObject = JSON.stringify(o, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
string {
  "name": "Lee",
  "gender": "male"
}
*/

const arr = [1, 5, 'false'];

// 배열 객체 => 문자열
const strArray = JSON.stringify(arr); // "[1, 5, 'false']"
console.log(typeof strArray, strArray); // string [1,5,"false"]

// replacer
// 모든 값을 대문자로 변환된 문자열을 반환한다
function replaceToUpper(key, value) {
  return value.toString().toUpperCase();
}

// 배열 객체 => 문자열 + replacer
const strFilteredArray = JSON.stringify(arr, replaceToUpper);
console.log(typeof strFilteredArray, strFilteredArray); // string "1,5,FALSE"
~~~~

<br/>

### JSON.parse  <a id="a2"></a>

> JSON 데이터를 가진 문자열을 객체로 변환한다.
>
> JSON -> 객체 :  역직렬화(Deserializing)

~~~javascript
const o = { name: 'Lee', gender: 'male', age: 20 };

// 객체 => JSON 형식의 문자열
const strObject = JSON.stringify(o);
console.log(typeof strObject, strObject);
// string {"name":"Lee","gender":"male","age":20}

const arr = [1, 5, 'false'];

// 배열 객체 => JSON 문자열
const strArray = JSON.stringify(arr);
console.log(typeof strArray, strArray); // string [1,5,"false"]

// JSON 형식의 문자열 => 객체
const obj = JSON.parse(strObject);
console.log(typeof obj, obj); // object { name: 'Lee', gender: 'male' }

// JSON 문자열 => 배열 객체
const objArray = JSON.parse(strArray);
console.log(typeof objArray, objArray); // object [1, 5, "false"]
~~~

<br/>

배열 내에 객체가 있는 경우 => 배열 자체를 문자열로 변환시킴

JSON 데이터를 가진 문자열을 배열로 바꿀 경우 => 배열의 요소까지 객체로 변환한다.

~~~~javascript
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'JavaScript', completed: false }
];

// 배열 => JSON 형식의 문자열
const str = JSON.stringify(todos);
console.log(typeof str, str);

// JSON 형식의 문자열 => 배열
const parsed = JSON.parse(str);
console.log(typeof parsed, parsed);
~~~~

<br/>

### XMLHttpRequest <a id = "a3"></a>

> 브라우저는 **[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 객체**를 이용하여 Ajax 요청을 생성하고 전송
> 서버가 브라우저의 요청에 대해 응답을 반환하면 같은 XMLHttpRequest 객체가 그 결과를 처리한다.

`XMLHttpRequset` 생성 : `const 이름 = new XMLHttpRequest();`

<br/>

#### Ajax request <a id = "a4"></a>

> Ajax 요청 처리

~~~javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', '/users');
// Request를 전송한다
xhr.send();
~~~

<br/>

##### XMLHttpRequest.open <a id = "a5"></a>

> XMLHttpRequest 객체의 인스턴스를 생성하고 서버로의 요청을 준비한다.

```javascript
XMLHttpRequest.open(method, url[, async])
```

| 매개변수 | 설명                                                         |
| :------- | :----------------------------------------------------------- |
| method   | HTTP method (“GET”, “POST”, “PUT”, “DELETE” 등)              |
| url      | 요청을 보낼 URL                                              |
| async    | 비동기 조작 여부. 옵션으로 default는 true이며 비동기 방식으로 동작. |

<br/>

##### XMLHttpRequest.send <a id="a6"></a>

> 준비된 요청을 서버에 전달. (서버로 전송하는 데이터는 2가지 메소드에 따라 차이가 있다.)
>
> **GET** : URL의 일부분인 쿼리문자열(query string)로 데이터를 서버로 전송한다.
>
> **POST** : 데이터(페이로드)를 Request Body에 담아 전송한다.

<br/>

<img src="https://poiemaweb.com/img/HTTP_request+response_message.gif" alt="HTTP request response message" style="zoom: 67%;" />

XMLHttpRequest.send 메소드에는 **request body**에 담아 전송할 인수를 전달할 수 있다.

```javascript
xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob()); // 파일 업로드와 같이 바이너리 컨텐트를 보내는 방법
// xhr.send({ form: 'data' });
// xhr.send(document);
```

만약 **요청 메소드가 GET인 경우, send 메소드의 인수는 무시되고 request body은 null로 설정된다.**

<br/>

##### XMLHttpRequest.setRequestHeader  <a id="a7"></a>

> HTTP Request Header의 값을 설정.
>
> setRequestHeader 메소드는 반드시 XMLHttpRequest.open 메소드 호출 이후에 호출한다.

###### Content-type <a id="a8"></a>

[Content-type](http://www.w3.org/Protocols/rfc1341/4_Content-Type.html)은 request body에 담아 전송할 데이터의 [MIME-type](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)의 정보를 표현한다. 

자주 사용되는 MIME-type

| 타입                        | 서브타입                                           |
| :-------------------------- | :------------------------------------------------- |
| text 타입                   | text/plain, text/html, text/css, text/javascript   |
| Application 타입            | application/json, application/x-www-form-urlencode |
| File을 업로드하기 위한 타입 | multipart/formed-data                              |

다음은 request body에 담아 서버로 전송할 데이터의 MIME-type을 지정하는 예이다.

```javascript
// json으로 전송하는 경우
xhr.open('POST', '/users');

// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('Content-type', 'application/json');

const data = { id: 3, title: 'JavaScript', author: 'Park', price: 5000};

xhr.send(JSON.stringify(data));

// x-www-form-urlencoded으로 전송하는 경우
xhr2.open('POST', '/users');

// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: x-www-form-urlencoded
// application/x-www-form-urlencoded는 key=value&key=value...의 형태로 전송
xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

const data2 = { title: 'JavaScript', author: 'Park', price: 5000};

xhr2.send(Object.keys(data2).map(key => `${key}=${data[key]}`).join('&'));
// escaping untrusted data
// xhr2.send(Object.keys(data2).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&'));
```

<br/>

###### Accept <a id="a9"></a>

HTTP 클라이언트가 서버에 요청할 때 서버가 센드백할 데이터의 MIME-type을 [Accept](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept)로 지정할 수 있다.

다음은 서버가 센드백할 데이터의 MIME-type을 지정하는 예

```javascript
// 서버가 센드백할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('Accept', 'application/json');
```

만약 Accept 헤더를 설정하지 않으면, send 메소드가 호출될 때 Accept 헤더가 `*/*`으로 전송됨.

<br/>

#### Ajax response <a id="a10"></a>

```javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 onreadystatechange 이벤트 핸들러가 호출된다.
xhr.onreadystatechange = function (e) {
  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log('Error!');
  }
};
```

<br/>

1. `XMLHttpRequest.send()`를 통해 서버에 `Request`를 전송하면 서버는 `Response`를 반환한다. 
2. 하지만 언제 Response가 클라이언트에 도달할 지는 알 수 없다. 
3. `XMLHttpRequest.onreadystatechange`는 `Response`가 클라이언트에 도달하여 발생된 이벤트를 감지하고 콜백 함수를 실행하여 준다. 
4. 이때 이벤트는 `Request`에 어떠한 변화가 발생한 경우 즉, `XMLHttpRequest.readyState` 프로퍼티가 변경된 경우 발생한다.

`XMLHttpRequest` 객체는 `response`가 클라이언트에 도달했는지를 추적할 수 있는 프로퍼티를 제공한다. 
   이 프로퍼티가 `XMLHttpRequest.readyState`이다. 

만일 `XMLHttpRequest.readyState`의 값이 4인 경우, 정상적으로 `Response`가 돌아온 경우이다.

`readXMLHttpRequest.readyState`의 값은 아래와 같다.

| Value | State            | Description                                           |
| :---: | :--------------- | :---------------------------------------------------- |
|   0   | UNSENT           | XMLHttpRequest.open() 메소드 호출 이전                |
|   1   | OPENED           | XMLHttpRequest.open() 메소드 호출 완료                |
|   2   | HEADERS_RECEIVED | XMLHttpRequest.send() 메소드 호출 완료                |
|   3   | LOADING          | 서버 응답 중(XMLHttpRequest.responseText 미완성 상태) |
|   4   | DONE             | 서버 응답 완료                                        |

```javascript
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', 'data/test.json');
// Request를 전송한다
xhr.send();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 콜백함수(이벤트 핸들러)를 호출한다.
xhr.onreadystatechange = function (e) {
  // 이 함수는 Response가 클라이언트에 도달하면 호출된다.

  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log('Error!');
  }
};
```

- `XMLHttpRequest의.readyState`가 4인 경우, 서버 응답이 완료된 상태
- 이후 `XMLHttpRequest.status`가 200(정상 응답)임을 확인하고 정상이면, `XMLHttpRequest.responseText`를 취득.
- ` XMLHttpRequest.responseText`에는 서버가 전송한 데이터가 담겨 있다. 

<br/>

### Web Server <a id="b1"></a>

![client & server](https://poiemaweb.com/img/cs.png)

> 브라우저와 같은 클라이언트로부터 HTTP 요청을 받아들이고 HTML 문서와 같은 웹 페이지를 반환하는 프로그램.

Ajax는 웹서버와의 통신이 필요하므로 예제를 실행하기 위해서는 웹서버가 필요하다.

<br/>

### Ajax 예제 <a id="b2"></a>

**기본 셋팅** (Node.js - Express로 간단한 웹서버 생성)

**구동** : http://localhost:3000/loadhtml.html

~~~html
## 데스크탑에 webserver-express 폴더가 생성된다.
$ cd ~/Desktop
$ git clone https://github.com/ungmo2/webserver-express.git
$ cd webserver-express
## install express
$ npm install
## create public folder
$ mkdir public

## start webserver
$ npm start
~~~

<br/>

#### Load HTML <a id="b3"></a>

- Ajax를 이용하여 웹페이지에 추가하기 가장 손쉬운 데이터 형식 (HTML) 

- 별도의 작업없이 전송받은 데이터를 DOM에 추가하면 된다.

**-클라이언트-**

~~~html
<!-- 루트 폴더(webserver-express/public)/loadhtml.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://poiemaweb.com/assets/css/ajax.css">
  </head>
  <body>
    <div id="content"></div>

    <script>
      // XMLHttpRequest 객체의 생성
      const xhr = new XMLHttpRequest();
      // 비동기 방식으로 Request를 오픈한다
      xhr.open('GET', 'data/data.html');
      // Request를 전송한다
      xhr.send();

      // Event Handler
      xhr.onreadystatechange = function () {
        // 서버 응답 완료 && 정상 응답
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
          console.log(xhr.responseText);

          document.getElementById('content').innerHTML = xhr.responseText;
        } else {
          console.log(`[${xhr.status}] : ${xhr.statusText}`);
        }
      };
    </script>
  </body>
</html>
~~~

<br/>

**-서버 응답 데이터-**

~~~html
<!-- 루트 폴더(webserver-express/public)/data/data.html -->
<div id="tours">
  <h1>Guided Tours</h1>
  <ul>
    <li class="usa tour">
      <h2>New York, USA</h2>
      <span class="details">$1,899 for 7 nights</span>
      <button class="book">Book Now</button>
    </li>
    <li class="europe tour">
      <h2>Paris, France</h2>
      <span class="details">$2,299 for 7 nights</span>
      <button class="book">Book Now</button>
    </li>
    <li class="asia tour">
      <h2>Tokyo, Japan</h2>
      <span class="details">$3,799 for 7 nights</span>
      <button class="book">Book Now</button>
    </li>
  </ul>
</div>
~~~

<br/>

#### Load JSON <a id="b4"></a>

- 서버로부터 브라우저로 전송된 JSON 데이터는 **문자열** 
- 문자열을 객체화하여야 하는데 이를 **역직렬화(Deserializing)**라 칭함.
- 역직렬화는 내장 객체 JSON의 static 메소드인 **JSON.parse()**를 사용.

**-클라이언트-**

~~~html
<!-- 루트 폴더(webserver-express/public)/loadjson.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://poiemaweb.com/assets/css/ajax.css">
  </head>
  <body>
    <div id="content"></div>

    <script>
      // XMLHttpRequest 객체의 생성
      var xhr = new XMLHttpRequest();

      // 비동기 방식으로 Request를 오픈한다
      xhr.open('GET', 'data/data.json');
      // Request를 전송한다
      xhr.send();

      xhr.onreadystatechange = function () {
        // 서버 응답 완료 && 정상 응답
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) {
          console.log(xhr.responseText);

          // Deserializing (String → Object)
          responseObject = JSON.parse(xhr.responseText);

          // JSON → HTML String
          let newContent = '<div id="tours"><h1>Guided Tours</h1><ul>';

          responseObject.tours.forEach(tour => {
            newContent += `<li class="${tour.region} tour">
                <h2>${tour.location}</h2>
                <span class="details">${tour.details}</span>
                <button class="book">Book Now</button>
              </li>`;
          });

          newContent += '</ul></div>';

          document.getElementById('content').innerHTML = newContent;
        } else {
          console.log(`[${xhr.status}] : ${xhr.statusText}`);
        }
      };
    </script>
  </body>
</html>
~~~

<br/>

**-서버 응답 데이터-**

~~~json
{
  "tours": [
    {
      "region": "usa",
      "location": "New York, USA",
      "details": "$1,899 for 7 nights"
    },
    {
      "region": "europe",
      "location": "Paris, France",
      "details": "$2,299 for 7 nights"
    },
    {
      "region": "asia",
      "location": "Tokyo, Japan",
      "details": "$3,799 for 7 nights"
    }
  ]
}
~~~

<br/>

####  Load JSONP <a id="b5"></a>

- 요청에 의해 웹페이작 전달된 서버와 동일한 도메인의 서버로부터 전달된 데이터는 이상이 없다.
- 하지만, 보안상의 이유로 다른 도메인(http와 https, 포트가 다르면 다른 도메인으로 간주)으로의 요청(크로스 도메인 요청)은 제한된다. 
- **동일출처원칙(Same-origin policy)이라고 한다.**

![cross domain request](https://poiemaweb.com/img/cdr.jpg)

<br/>

##### 동일출처원칙 우회 방법 3가지 <a id="b6"></a>

**1. 웹서버의 프록시 파일**

서버에 원격 서버로부터 데이터를 수집하는 별도의 기능을 추가하는 것이다. 이를 프록시(Proxy)라 한다.

<br/>

**2. JSONP**

script 태그의 원본 주소에 대한 제약은 존재하지 않는데 이것을 이용하여 다른 도메인의 서버에서 데이터를 수집하는 방법이다. 

자신의 서버에 함수를 정의하고 다른 도메인의 서버에 얻고자 하는 데이터를 인수로 하는 함수 호출문을 로드하는 것이다.

![comparison_between_ajax_and_jsonp](https://poiemaweb.com/img/comparison_between_ajax_and_jsonp.png)

~~~html
<!-- 루트 폴더(webserver-express/public)/loadjsonp.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://poiemaweb.com/assets/css/ajax.css">
  </head>
  <body>
    <div id="content"></div>
  <script>
    function showTours(data) {
      console.log(data); // data: object

      // JSON → HTML String
      let newContent = `<div id="tours">
          <h1>Guided Tours</h1>
        <ul>`;

      data.tours.forEach(tour => {
        newContent += `<li class="${tour.region} tour">
            <h2>${tour.location}</h2>
            <span class="details">${tour.details}</span>
            <button class="book">Book Now</button>
          </li>`;
      });

      newContent += '</ul></div>';

      document.getElementById('content').innerHTML = newContent;
    }
    </script>
    <script src='https://poiemaweb.com/assets/data/data-jsonp.js'></script>
    <!-- <script>
      showTours({
        "tours": [
          {
            "region": "usa",
            "location": "New York, USA",
            "details": "$1,899 for 7 nights"
          },
          {
            "region": "europe",
            "location": "Paris, France",
            "details": "$2,299 for 7 nights"
          },
          {
            "region": "asia",
            "location": "Tokyo, Japan",
            "details": "$3,799 for 7 nights"
          }
        ]
      });
    </script> -->
  </body>
</html>
~~~

~~~json
 <script src='https://poiemaweb.com/assets/data/data-jsonp.js'></script>
    <!-- <script>
      showTours({
        "tours": [
          {
            "region": "usa",
            "location": "New York, USA",
            "details": "$1,899 for 7 nights"
          },
          {
            "region": "europe",
            "location": "Paris, France",
            "details": "$2,299 for 7 nights"
          },
          {
            "region": "asia",
            "location": "Tokyo, Japan",
            "details": "$3,799 for 7 nights"
          }
        ]
      });
    </script> -->
~~~

서버에는 `showTour()`이라는 함수를 정의하고 타 도메인에서 얻고자하는 데이터를 인수로하여 호출문으로 로드했다.

<br/>

**3. Cross-Origin Resource Sharing**

- HTTP 헤더에 추가적으로 정보를 추가하여 브라우저와 서버가 서로 통신해야 한다는 사실을 알게하는 방법
- W3C 명세에 포함되어 있지만 최신 브라우저에서만 동작하며 서버에 HTTP 헤더를 설정해 주어야 한다.

Node.js로 구현한 서버의 경우, [CORS](https://github.com/expressjs/cors) package를 사용하면 간단하게 Cross-Origin Resource Sharing을 구현가능.

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```