![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 07

- 용어
- 함수

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 원시값
- 변경 가능한 값
- 값에 의한 전달
- 객체
- 변경 불가능한 값
- 참조에 의한 전달

<br/>

------

<br/>

### 함수

> 함수는 일련의 과정을 문(statement)들로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것.

![함수의 구성 요소 - poiemaweb](https://poiemaweb.com/assets/fs-images/11-2.png)

 프로그래밍 언어의 함수는 `입력을` 받아서 `출력`을 내보낸다. 이때 `입력`을 전달받는 변수를 `매개변수(parameter)`, `입력`을 `인수(argument)`, `출력`을 `반환값(return value)`이라 한다. 

또한 함수는 여러 개 존재할 수 있으므로 특정 함수를 구별하기 위해 **식별자인 함수 이름**을 사용할 수 있다.

<br/>

파라미터(Parameter) = 매개변수 , 멤버변수, 인자

아구멘트(Argument) = 인수

<br/>

### 함수의 정의 및 호출

​	함수는 **정의**  를 통해 생성한다. ( 함수선언식의 경우, 호이스팅 되어 런타임 이전에 이미 정의가 완료된다. )

~~~javascript
// 함수 정의
function add(x, y) {
  return x + y;
}	
~~~

<br/>

​	함수는 **정의**만 해서는 해당 코드가 실행되지는 않는다.

**호출**을 해야 비로서 실행되고 결과를 반환한다.

~~~javascript
// 함수 호출
var result = add(2, 5);

// 함수 add에 인수 2, 5를 전달하면서 호출하면 7을 반환한다.
console.log(result); // 7
~~~

<br/>

​	함수 내부에서 **선언된 변수**들은 **함수가 호출되면 **실행된다.

~~~javascript
function add(x) {
	var y = 20;
	return x + y;
}

console.log( add(10) ); // 함수를 호출하면서 변수 y의 선언-초기화-할당이 진행된다.
~~~

<br/>

 argument(인수) 와  parameter(매개 변수)는 일치하는게 이상적인 함수 코딩이다.

~~~javascript
function add(x, y) {
	return x + y;
}
add(2, 5); // 7
~~~

<br/>

**함수 호출문은 값으로 평가되는 표현식** 이다.

~~~javascript
function add(x, y) {
	return x + y;
}
var result = add(2, 5); 
console.log(result) // 7
~~~

<br/>

### 함수 사용 이유

> 함수는 유지보수의 편의성을 높이고 실수를 줄여 코드의 신뢰성을 높이는 효과가 있다.

<br/>

### 함수 리터럴

![선언문리터럴](https://user-images.githubusercontent.com/31315644/66627876-fc31f680-ec37-11e9-9f68-1520dc89b84a.png)

그룹 연산자 `( )`안에 들어오는 것은 피연산자이다.

피연산자로 들어오는 것은 리터럴 , 값이어야만 함다. 

결국, ( **function foo( ) { }** )는 리터럴 및 값이 되는것이다.

함수 리터럴을 이름을 가질수도 있고, 안가질수도 있다.
함수 리터럴의 식별자는 자신의 몸체 내부에서만 **유효** 하다.

그룹 연산자 () 내에 있는 것은 함수 선언문이 아니다. 다시 말해, 자바스크립트 엔진은 그룹 연산자 () 내에 있는 문을 함수 선언문이 아닌 함수 리터럴로 해석한다. 그룹 연산자의 피연산자는 값으로 평가할 수 있는 표현식이다. 따라서 표현식이 아닌 문인 함수 선언문은 피연산자로 사용할 수 없다.

~~~javascript
var foo = function bar () { 

};
~~~

<br/>

### 함수 만드는 방법 4가지

#### Function 생성자 함수

> 생성자 함수란 ? 객체를 생성하는 함수
>
> 따라서 Function 생성자 함수 는 **함수라는 객체를 생성하는 함수**다.

~~~javascript
// 첫번째 인수, 두번째 인수, 마지막 인수는 반환값
var add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7
~~~

<br/>

#### 화살표 함수

​	ES6에서 새롭게 도입된 화살표 함수(Arrow function)는 function 키워드 대신 화살표(=>, Fat arrow)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 익명 함수로 정의한다.

화살표 함수는 대부분을 `콜백 함수`에 이용한다.

```javascript
// 화살표 함수
const add = (x, y) => x + y;

console.log(add(2, 5)); // 7
```

<br/>

#### 함수 선언문

 함수 선언문 방식으로 생성된 함수를 호출한 것은 함수 이름이  아니라 자바스크립트 엔진이 암묵적으로 생성한 변수 명인 것이다.
아래 예제를 예를들어보면 함수 명 add로 호출한 것이 아닌 함수선언문이 호이스팅 되면 생성된 암묵적 변수 add를 호출한 것이다. 

~~~javascript
// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같은 결과가 출력된다.
console.dir(add); // ƒ add(x, y)

// 함수 호출
console.log(add(2, 5)); // 7
~~~

<img src="https://poiemaweb.com/assets/fs-images/11-3.png" alt="함수선언문" style="zoom: 50%;" />

<br/>







함수의 매개변수는 가능한 적은게 좋다 (최대 3개까지 맞추는게 ㅈ호다)

만약, 함수 매개변수가 4개이상이면 객체로 넘기는것이 좋다.

~~~javascript
$.ajax({
  method: 'POST',
  url: '/user',
  data: { id: 1, name: 'Lee' },
  cache: false
});
~~~

위는 jQuery의 ajax 메소드이다. 해당 함수의 인수는 1개다. (객체)
그리고 객체의 프로퍼티는 총 4개다. ( 또한, 객체의 프로퍼티는 순서가 필요없고 이름에만 의미가 있다. )

또한 위 코드에서 함수 내부에 객체를 선언한 이유는
다른 식별자들이 참조할 수 없게 만들기 때문이다. 해당 함수만 저 객체를 독점 사용하기 위해서이다.(보안적이유)
만약 다른 식별자들이 저 객체를 참조한다고 함수를 실행했을 때 변해버린 값이 반환될수도 있기 때문이다.

<br/>

### 외부 상태의 변경과 함수형 프로그래밍

함수의 매개변수에 값을 전달하는 방식을 값에 의한 호출(Call by value), 참조에 의한 호출(Call by reference)로 구별하는 부르는 경우도 있으나 동작 방식은 값에 의한 전달, 참조에 의한 전달과 동일하다. 아래 예제를 살펴보자.

```javascript
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

<img src="https://poiemaweb.com/assets/fs-images/11-6.png" alt="값에 의한 호출, 참조에 의한 호출" style="zoom:50%;" />



위와 같은 방식의 코딩은 객체의 추척을 어렵게 만든다. (즉, 값이 바뀌었는지 않바뀌었는지;;;)

이와 같은 함수를 **비순수함수** 라 칭한다.

순수 함수 : 함수 내부(지역 스코프)만 영향을 준다.

비순수 함수 : 함수 외부까지도 영향을 준다. 

JS는 상태를 변환하는게 `에러의 원인`이라고 판단한다.

따라서 비순수함수를 최대한 억제 및 줄이고 순수함수를 사용하도록 노력해야만 한다.

<br/>

### 반환문

​	함수는 return 키워드와 반환밧으로 이루어진 반환문을 사용하여 실행 결과를 반환 할 수 있다.

함수는 실행시 return을 만나면 함수 실행을 중단하고 몸체를 빠져나간다.(즉, 중단한다.)

#### return의 생략

1. `return 키워드`는 **생략**이 가능하다. 다만, **생략시 return undefined를 결과로 반환한다.**

2. `return 값`도 **생략**이 가능하다. 역시 **생략시 return undefined를 결과로 반환한다.**

<br/>

### 다양한 함수의 형태

#### 즉시 실행 함수 ( IIFE )

> 단 한번만 호출되며 다시는 호출 할 수 없다.
>
> 즉시 실행 함수는 익명 즉시 실행 함수를 사용하는 것이 일반적이다.

~~~~javascript
// 익명 즉시 실행 함수
(function () {
  var a = 3;
  var b = 5;
  return a * b;
}());
~~~~

<br/>

### 재귀함수 

> 자기 자신을 호출하는 함수
>
> 재귀 함수는 무한 호출되며 stack overflow에러를 유발할 위험이 다분하다.
>
> 따라서 최대한 적게 이용하고 대부분은 재귀함수는 while, for( + if )등으로 대체가 가능하다.

~~~~javascript
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
  // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
  if (n <= 1) return 1;
  return factorial(n - 1) * n;
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 1 * 2 = 2
console.log(factorial(3)); // 3! = 1 * 2 * 3 = 6
console.log(factorial(4)); // 4! = 1 * 2 * 3 * 4 = 24
console.log(factorial(5)); // 5! = 1 * 2 * 3 * 4 * 5 = 120
~~~~

<br/>

### 중첩함수 *

> 함수 내부에 함수가 있을 수 있다.
>
> 이를 중첩 함수(nested function) 또는 내부 함수(Inner function)라 한다.

~~~javascript
function outer() {
  var x = 1;

  // 중첩 함수
  function inner() {
    var y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  inner();
  // 중첩 함수의 변수를 참조할 수 없다.
  console.log(x + y); // ReferenceError: y is not defined
}

outer();
~~~

<br/>

### 콜백함수 ** 중요

> 콜백함수는 고차함수에 인수(Argument) 로써 사용되는 함수를 뜻한다.
>
> 고차함수는 매개변수를 함수로 받는 함수를 말한다.

~~~javascript
// outer는 고차함수다. - 이유는 매개변수를 함수로 받고 있다.
function outer(fn) {
  var x = 1;
  var y = 2;
  return fn(x, y);// 3
} 

// 일반함수
function inner(x, y) {
  var dd = x + y;
  return dd;
}

console.log(
  // outer라는 고차함수에 inner을 넣음으로 inner는 콜백함수가 되었다.
  outer(inner)
);
~~~

