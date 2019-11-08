<img src="https://user-images.githubusercontent.com/31315644/68408656-19bb9700-01c9-11ea-96d8-65e42b4d349d.jpg" alt="pinky" style="zoom: 50%;" />



------------

## JavaScript 프로미스 ( Promise )

- 프로미스 ( Promise )
  - 프로미스란?
  
  - 콜백 패턴의 단점
  
    1. 콜백 헬
    2. 에러 처리의 한계
  
  - [프로미스의 생성](#a1)
  
  - [프로미스의 후속 처리 메소드](#a2)
  
  - [프로미스의 에러 처리](#a3)
  
  - [프로미스 체이닝](#a4)
  
  - [프로미스의 정적 메소드](#a5)
  
    - [Promise.resolve / Promise.reject](#a6)
  
    - [Promise.all](#a7)
  
    - [Promise.race](#a8)

<br/>

------

## 프로미스 ( Promise )

<br/>

### 프로미스란?

>  콜백함수의 단점(구린 가독성, 에러의 예외처리가 힘듬, 여러개의 비동기 처리 로직 불가 등등)을 해결하기 위해서 ES6에 생긴 패턴.
>
>  **전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현한다.**

<br/>

### 콜백 패턴의 단점

#### 1. 콜백 헬

JS의 대부분의 DOM 이벤트와 Timer 함수(setTimeout, setInterval), Ajax 요청은 비동기식 처리 모델로 동작한다.

<img src="https://poiemaweb.com/img/asynchronous.png" alt="asynchronous" style="zoom:48%;" />

이러한 비동기식 처리 모델은 요청을 병렬로 처리해 다른 요청이 블로킹되지 않고 수행된다는 장점이 있다.

문제는, 비동기 처리를 위해 콜백 패턴을 남발하고 처리 순서 보장을 위해서 여러개의 콜백 함수가 중첩되어 복잡도가 증가한다면, **콜벡 헬**이 발생한다. **콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 된다.**

~~~javascript
// 콜백헬. 멸망의 피라미드
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
~~~

<br/>

~~~javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    // 비동기 함수
    function get(url) {
      // XMLHttpRequest 객체 생성
      const xhr = new XMLHttpRequest();

      // 서버 응답 시 호출될 이벤트 핸들러
      xhr.onreadystatechange = function () {
        // 서버 응답 완료가 아니면 무시
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) { // 정상 응답
          console.log(xhr.response);
          // 비동기 함수의 결과에 대한 처리는 반환할 수 없다.
          return xhr.response; // ①
        } else { // 비정상 응답
          console.log('Error: ' + xhr.status);
        }
      };

      // 비동기 방식으로 Request 오픈
      xhr.open('GET', url);
      // Request 전송
      xhr.send();
    }
 // 비동기 함수 내의 readystatechange 이벤트 핸들러에서 처리 결과를 반환(①)하면 순서가 보장되지 않는다.
    const res = get('http://jsonplaceholder.typicode.com/posts/1');
    console.log(res); // ② undefined
  </script>
</body>
</html>
~~~

현재 실행 순서는 크게 다음 과 같다.

get 함수 호출 -> get함수 내부의 onreadystatechange 별도로 실행(콜백함수) -> xhr.open호출 -> xhr.send호출 -> 

get함수 종료(return이 없으므로 undefined 반환) -> console.log호출 -> onreadystatechange호출 순이다.

즉, get함수는 제대로된 값을 반환하지 못한다. get 함수의 반환 결과를 제대로 하기 위해서는 해당 비동기 함수(get)의 콜백함수(onreadystatechange) 내에서 처리를 해야한다. 이로 인해 **콜백 헬( Callback Hell )이 발생**한다.

이러한 콜백 헬( Callback Hell )은 코드의 가독성을 나쁘게 하고 복잡도를 증가시켜 실수를 유발하는 원인이 되며 **에러 처리가 곤란**하다.

<br/>

#### 2. 에러 처리의 한계

콜백 방식의 비동기 처리가 갖는 문제점 중에서 가장 심각한 것은 에러 처리가 곤란하다는 것.

~~~javascript
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
}
~~~

1. `try` 블록 안에서 setTimeout 함수가 실행된다. (여기서 setTimeout은 비동기 함수다.)
2. setTimeout함수는 호출 스택으로 들어가고 즉시 종료된다.
3. tick 이벤트가 발생하면 콜백함수는 태스크 큐로 넘어간다.
4. 태스크큐에 있는 콜백함수는 호출 스택이 비워진 것을 확인하고 호출 스택으로 넘어가고 실행된다.

이 때 예외처리는 호출자 방향( setTimeout 함수 ) 으로 전파된다. 강제로 `throw 에러`를 던져도 콜백함수가 호출 스택에 도착했을 때 이미 setTimeout은 호출스택에서 사라졌기 때문에 콜백함수를 호출 한 것은 setTimeout 함수가 아니라는 결론을 내리게된다. 

따라서 setTimeout 함수의 콜백 함수 내에서 발생시킨 에러는 catch 블록에서 캐치되지 않아 프로세스는 종료된다.

<br/>

###프로미스의 생성 <a id="a1"></a>

> 프로미스는 Promise 생성자 함수를 통해 인스턴스화한다. 
>
> 비동기 작업을 수행할 콜백 함수를 인자로 전달 받는다. (resolve , reject)

~~~javascript
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행한다.

  if (/* 비동기 작업 수행 성공 */) {
    resolve('result');
  }
  else { /* 비동기 작업 수행 실패 */
    reject('failure reason');
  }
});
~~~

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state) 정보를 갖는다.

| 상태          | 의미                                       | 구현                                               |
| :------------ | :----------------------------------------- | :------------------------------------------------- |
| pending       | 비동기 처리가 아직 수행되지 않은 상태      | resolve 또는 reject 함수가 아직 호출되지 않은 상태 |
| **fulfilled** | 비동기 처리가 수행된 상태 (성공)           | resolve 함수가 호출된 상태                         |
| **rejected**  | 비동기 처리가 수행된 상태 (실패)           | reject 함수가 호출된 상태                          |
| settled       | 비동기 처리가 수행된 상태 (성공 또는 실패) | resolve 또는 reject 함수가 호출된 상태             |

Promise 함수가 인자(resolve, reject)로 전달 받은 콜백함수는 내부에서 비동기 처리 작업을 수행한다.

비동기 처리가 성공시 resolve를 호출하고 'fullfilled' 상태가 된다.

비동기 처리가 실패시 reject를 호출하고 'rejected' 상태가 된다.

<br/>

~~~javascript
const promiseAjax = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = function () {
      // 서버 응답 완료가 아니면 무시
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 400) {
        // resolve 메소드를 호출하면서 처리 결과를 전달
        resolve(xhr.response); // Success!
      } else {
        // reject 메소드를 호출하면서 에러 메시지를 전달
        reject(new Error(xhr.status)); // Failed...
      }
    };
  });
};
~~~

1. 비동기 함수 내에서 Promise 객체를 생성하고 Promise 내부에서 비동기 처리를 구현한다.
2. 비동기 처리에 성공하면 resolve 메소드를 호출한다.  (실패하면 reject 메소드 호출)
3. 이 때, resolve 메소드의 인자로 비동기 처리를 전달힌다. (reject 메소드의 인자로 에러메시지 전달)
4. 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다. 

<br/>

### 프로미스의 후속 처리 메소드 <a id="a2"></a>

> Promise로 구현된 비동기 함수는 Promise 객체를 반환하여야 한다
>
>  Promise로 구현된 비동기 함수를 호출하는 측(promise consumer)에서는 Promise 객체의 후속 처리 메소드(then, catch)를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리한다.
>
> Promise의 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다.

- then

  then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 
  첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
  두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
  **then 메소드는 Promise를 반환한다.**

- catch

  예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다. 
  catch 메소드는 Promise를 반환한다.

~~~html
<!DOCTYPE html>
<html>
<body>
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    /*
      비동기 함수 promiseAjax은 Promise 객체를 반환한다.
      Promise 객체의 후속 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다.
    */
    promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
      .then(JSON.parse)
      .then(
        // 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
        render,
        // 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
        console.error
      );
  </script>
</body>
</html>
~~~

<br/>

###프로미스의 에러 처리 <a id="a3"></a>

위 예제의 비동기 함수 get은 Promise 객체를 반환한다. 

Promise 객체의 후속 처리 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다. 비동기 처리 시 발생한 에러 메시지는 then 메소드의 두 번째 콜백 함수로 전달된다. 

**Promise 객체의 후속 처리 메소드 catch을 사용하여도 에러를 처리할 수 있다.**

```javascript
promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
  .then(JSON.parse)
  .then(render)
  .catch(console.error);
```

- then 메소드의 두 번째 콜백 함수는 비동기 처리에서 발생한 에러( reject 함수가 호출된 상태 )만을 캐치한다. 
- catch 메소드는 비동기 처리에서 발생한 에러( reject 함수가 호출된 상태 )뿐만 아니라 then 메소드 내부에서 발생한 에러도 캐치한다. **따라서 에러 처리는 catch 메소드를 사용하는 편이 보다 효율적이다.**

<br/>

### 프로미스 체이닝 <a id="a4"></a>

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 콜백 헬이 발생한다. 

> 프로미스는 후속 처리 메소드를 체이닝(chainning)하여 여러 개의 프로미스를 연결하여 사용할 수 있다. 
>
> 이로써 콜백 헬을 해결한다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    const url = 'http://jsonplaceholder.typicode.com/posts';

    // 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
    promiseAjax('GET', `${url}/1`)
      // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
      .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
      .then(JSON.parse)
      .then(render)
      .catch(console.error);
  </script>
</body>
</html>
~~~

Promise 객체를 반환한 비동기 함수는 프로미스 후속 처리 메소드인 then이나 catch 메소드를 사용할 수 있다. 

따라서 then 메소드가 Promise 객체를 반환하도록 하면(then 메소드는 기본적으로 Promise를 반환한다.) 여러 개의 프로미스를 연결하여 사용할 수 있다.

<br/>

###프로미스의 정적 메소드 <a id="a5"></a>

Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메소드를 갖을 수 있다. 

Promise 객체는 4가지 정적 메소드를 제공한다. (resolve, reject, all, race)

<br/>

#### Promise.resolve / Promise.reject <a id="a6"></a>

Promise.resolve와 Promise.reject 메소드는 존재하는 값을 Promise로 래핑하기 위해 사용한다.

정적 메소드 Promise.resolve 메소드는 인자로 전달된 값을 resolve하는 Promise를 생성한다.

```javascript
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [ 1, 2, 3 ]
```

위 예제는 아래 예제와 동일하게 동작한다.

```javascript
const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
resolvedPromise.then(console.log); // [ 1, 2, 3 ]
```

Promise.reject 메소드는 인자로 전달된 값을 reject하는 프로미스를 생성한다.

```javascript
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log); // Error: Error!
```

위 예제는 아래 예제와 동일하게 동작한다.

```javascript
const rejectedPromise = new Promise((resolve, reject) => reject(new Error('Error!')));
rejectedPromise.catch(console.log); // Error: Error!
```

<br/>

#### Promise.all <a id="a7"></a>

Promise.all 메소드는 프로미스가 담겨 있는 배열 등의 [이터러블](https://poiemaweb.com/es6-iteration-for-of)을 인자로 전달 받는다.

 전달받은 모든 프로미스를 병렬로 처리하고 그 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

```javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // [ 1, 2, 3 ]
  .catch(console.log);
```

Promise.all 메소드는 3개의 프로미스를 담은 배열을 전달받았다. 각각의 프로미스는 아래와 같이 동작한다.

- 첫번째 프로미스는 3초 후에 1을 resolve하여 처리 결과를 반환한다.
- 두번째 프로미스는 2초 후에 2을 resolve하여 처리 결과를 반환한다.
- 세번째 프로미스는 1초 후에 3을 resolve하여 처리 결과를 반환한다.

**Promise.all 메소드는 전달받은 모든 프로미스를 병렬로 처리한다.** 이때 모든 프로미스의 처리가 종료될 때까지 기다린 후 아래와 모든 처리 결과를 resolve 또는 reject한다.

- 모든 프로미스의 처리가 성공하면 **각각의 프로미스가 resolve한 처리 결과를 배열에 담아 resolve하는 새로운 프로미스를 반환**한다. 
- 첫번째 프로미스가 가장 나중에 처리되어도 Promise.all 메소드가 반환하는 프로미스는 첫번째 프로미스가 resolve한 처리 결과부터 차례대로 배열에 담아 그 배열을 resolve하는 새로운 프로미스를 반환한다. 
- 즉, **처리 순서가 보장된다. Promise.all은 병렬로 처리한다. 다만 순서를 보장해주기 때문에 먼저 처리되어도 프로미스 순서대로 처리결과를 배열에 담는다.** 
- 프로미스의 처리가 하나라도 실패하면 가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

```javascript
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!
```

위 예제의 경우, 세번째 프로미스가 가장 먼저 실패하므로 세번째 프로미스가 reject한 에러가 catch 메소드로 전달된다.

Promise.all 메소드는 전달 받은 이터러블의 요소가 프로미스가 아닌 경우, Promise.resolve 메소드를 통해 프로미스로 래핑된다.

```javascript
Promise.all([
  1, // => Promise.resolve(1)
  2, // => Promise.resolve(2)
  3  // => Promise.resolve(3)
]).then(console.log) // [1, 2, 3]
  .catch(console.log);
```

<br/>

github id로 github 사용자 이름을 취득하는 예제이다.

```javascript
const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];

Promise.all(githubIds.map(id => fetch(`https://api.github.com/users/${id}`)))
  // [Response, Response, Response] => Promise
  .then(responses => Promise.all(responses.map(res => res.json())))
  // [user, user, user] => Promise
  .then(users => users.map(user => user.name))
  // [ 'John Resig', 'Anders Hejlsberg', 'Ungmo Lee' ]
  .then(console.log)
  .catch(console.log);
```

1. Promise.all 메소드는 fetch 함수가 반환한 3개의 프로미스의 배열을 인수로 전달받고 이 프로미스들을 병렬 처리한다.
2. 모든 프로미스의 처리가 성공하면 Promise.all 메소드는 각각의 프로미스가 resolve한 3개의 Response 객체가 담긴 배열을 resolve하는 새로운 프로미스를 반환하고 후속 처리 메소드 then에는 3개의 Response 객체가 담긴 배열이 전달된다. 
3. 이때 json 메소드는 프로미스를 반환하므로 한번 더 Promise.all 메소드를 호출해야 하는 것에 주의. 두번째 호출한 Promise.all 메소드는 github로 부터 취득한 3개의 사용자 정보 객체가 담긴 배열을 resolve하는 프로미스를 반환하고 후속 처리 메소드 then에는 3개의 사용자 정보 객체가 담긴 배열이 전달된다.

<br/>

#### Promise.race <a id="a8"></a>

Promise.race 메소드는 Promise.all 메소드와 동일하게 프로미스가 담겨 있는 배열 등의 [이터러블](https://poiemaweb.com/es6-iteration-for-of)을 인자로 전달 받는다. 

- Promise.race 메소드는 Promise.all 메소드처럼 모든 프로미스를 병렬 처리하는 것이 아니라 **가장 먼저 처리된 프로미스가 resolve한 처리 결과를 resolve하는 새로운 프로미스를 반환**

```javascript
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // 3
  .catch(console.log);
```

- 에러가 발생한 경우는 Promise.all 메소드와 동일하게 처리. 

  Promise.race 메소드에 전달된 프로미스 처리가 하나라도 실패하면 **가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환**한다.

```javascript
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!
```

<br/>