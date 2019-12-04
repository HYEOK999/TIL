![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 01

- git commit 고치는 방법 3가지
- prettier vs standard npm 기초
- 디스트럭처링 활용
- 백틱 
  - Arrow Fn - ES6 미만 - 백틱이용
- SPA , Single Page Application ( Vanila.js )
  - Proxy
- 리액트 프로젝트 생성하기

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 디스터럭처링 활용
- SPA
- Proxy
- 리액트 프로젝트 생성하기

<br/>

--------------------------------------

### git commit 고치는 방법 3가지

#### 커밋 합병하기

`git rebase -i HEAD~n(갯수)` >  pick - 살릴 커밋 , s - 죽일 커밋  > git push -f

~~~bash
git rebase -i HEAD~5
git push -f
~~~

<br/>

#### 푸쉬한 깃 커밋 수정

~~~bash
git commit --amend
git push -f
~~~

<br/>

#### 푸쉬하기 전 깃 커밋 수정

~~~bash
git commit --amend
~~~

<br/>

### prettier vs standard npm 기초

현업에서 코드를 어떻게 작성할 것 인가는 보통 이 2가지로 판별난다.

prettier는 코드 끝에 `;`를 작성하지 않는다.

standard npm은 코드 끝에 `;`를 작성한다.

<br/>

###디스트럭처링 활용

배열 또는 객체 리터럴에서 필요한 값만을 추출하여 변수를 할당한다.

~~~javascript
const name = 'kim';
const email = 'a123@a123.com';
const age = null;

// 0번
const obj = {
  name,  // name : name
  email,  // email : email
  age // age : age
}

const { name : anotherName } = obj; // 1번
const { age = 22 } = obj; // 2번
~~~

<br/>

`0번` : 프로퍼티 축약 표현이다.

즉, 아래와 같은 유형의 코드다.

~~~
// ES5
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

// ES6
const obj = { x, y };
~~~

<br/>

`1번` : 새로운 상수를 만드는데 obj객체의 `name`프로퍼티를 `anotherName`으로 바꾸고 할당하여 만들겠다는 의미.

즉, 아래와 같은 코드다.

```javascript
const anotherName = obj.name;
```

<br/>

`2번` : 맨 위 코드에서 age 상수에는 null값으로 초기화가 되어있지 않다. 만약 obj객체로 상수를 생성하는데 age값을 22로 초기화해서 만든다는 의미.

즉, 아래와 같은 코드다.

```javascript
const age = obj.age;
age = 22;
```

<br/>

### 백틱 

`()` 대신에 백틱문자( ` )를 이용할 수 있다. 

단, `()`를 이용할 경우 함수 내부의 내용은 문자열로 취급되지만, 백틱문자( ` )를 이용할 경우 Rest 파라미터로 받게된다.

**Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.**

![backtic](https://user-images.githubusercontent.com/31315644/69944687-35e1f800-152b-11ea-97ee-c2dd51ba8a84.jpeg)

<br/>

#### Arrow Fn - ES6 미만 - 백틱이용

3번 백틱이용하는 것은 Redux에서 사용하는 함수형 프로그래밍이다.

~~~javascript
// 1 arrow fn
const getPrice = percent => price => price * percent; 

// 2 ES6 미만에서 사용시
const getPrice2 = function getPrice2(percent) {
  return function (price) {
    return price * percent;
  };
};

 // 3 백틱 이용시
const getPrice3 = function getPrice3(percent)`${price * percent}`;
~~~

<br/>

### SPA , Single Page Application ( Vanila.js )

Vanila.js에서 Two-way-binding

~~~javascript
const listeners = document.querySelectorAll('[data-model]');

listeners.forEach(listener => {
  const name = listener.dataset.model;
  listener.addEventListener('keyup', event => {
    state[name] = listener.value;
    console.log(state);
  })
})

const render = () => {};

// 해당하는 state가 변화될떄마다 proxy가 실행이되면서 화면에 렌더링 하게끔 한다.
const createState = _state => {
  return new Proxy(_state, {
    set (target, property, value) {
      // target[property] = value;
      render();
      return true;  // 반드시 return true를 해야만한다.
    }
  });
}

// state는 애플리케이션 제작시 변화되는 모든 변수를 담는다.
const state = createState({
  name: 'KimJunHyeok',
  email: 'kim@naver.com',
})

console.log(state);
~~~

<br/>

#### Proxy

> Proxy 객체는 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용

`new Proxy(초기화할 객체, 핸들러)` : 핸들러는 2가지다 - (get , set)

````javascript
new Proxy({ },{
  get(target, property, value){
    // 렌더 함수
  },
  set(target, property, value){
   	// 렌더 함수
    return true; 
  }
});
````

<br/>

### 리액트 프로젝트 생성하기

`npx create-react-app [리액트 프로젝트 명]` : [ 리액트 프로젝트 명 ]으로 리액트 설정이 완료된 폴더 생성

```bash
 npx create-react-app youtube-mini-clone
```

![react-폴더구조](https://user-images.githubusercontent.com/31315644/69944690-37abbb80-152b-11ea-9fee-91225ba1ccad.jpeg)