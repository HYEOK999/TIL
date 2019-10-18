![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 11

- 용어
- 캡슐화(정보 은폐)
- 생성자 함수에 의한 프로토타입 교체

- 인스턴스에 의한 프로토타입의 교체
- 직접상속
- Object.prototype의 빌트인 메소드를 객체가 직접 호출하는 것을 비추천
- 객체 리터럴 내부에서 __ proto __에 의한 직접 상속
- 정적 메소드
- for...in 문
- strict mode
- 전역 객체
- 전역 프로퍼티(Global property)
- this
  - 호출 방식
  - this의 binding 확정시간
  - bind
  - Call Apply
- <br/>

------

<br/>

### 용어 - ( 러버덕 )

- 캡슐화
- 생성자 함수에 의한 프로토타입 교체
- 인스턴스에 의한 프로토타입의 교체
- 직접상속
- Object.prototype의 빌트인 메소드를 객체가 직접 호출하는 것을 비추천하는 이유
- 객체 리터럴 내부에서 __ proto __에 의한 직접 상속
- 정적 메소드
- for...in 문
- 전역 객체
- 전역 프로퍼티(Global property)
- this
  - 호출 방식
  - this의 binding 확정시간
  - bind
  - Call Apply

<br/>

------

## Prototype

### 캡슐화 ( 정보 은폐 )

다른 클래스 기반 프로그램언어에서 `public` , `private`, `protected` 를 이용해서 캡슐화를 하여 클래스를 보호하면 정보를 은폐한다.

하지만 JS에서는 **클로저**를 통해 캡슐화를 지원한다. (추후 버전에서는 JS도 클래스를 출시 한다.)

> 즉, 캡슐화는 객체의 정보(프로퍼티,상태)를 공개할 것과 공개하지 않을 것을 정해서 보여준다.
>
> 캡슐화를 했다하여 무조건 외부에서 참조가 불가능 한 것은 아니다.
>
> 예를들어 중첩함수와 같은 방식으로 캡슐화를 했다면 모듈패턴을 사용해서 외부에서 접근이 가능하다.
>
> JS가 접근제한자를 갖지 않는 이유는 필요가 없기 때문이다.

~~~~javascript
const Person = (function () {
  // 생성자 함수

  let _name = '';

  function Person(name) {
    _name = name;
  }
 
  // 프로토타입 메소드 // 중첩함수가 아님
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${_name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');
console.log(me);
me.sayHello();
~~~~

함수내에 있는 변수의 생명주기는 함수가 끝나는 동시에 끝난다.

모든 함수는 호출 될 때, 자신이 정의된 스코프의 상위 스코프를 기억한다. (렉시컬 Evironment)

따라서 위 예제에서 `변수 _let`이 존재하는 블록이 끝났어도(삭제되었어도) 기억하고서 값을 반환할 수 있는 것이다.

모든 함수가 [[Environment]] 라는 내부 슬롯 - 기억하는 자료구조를 가지고 있다.

<br/>

### 생성자 함수에 의한 프로토타입 교체

**아래는 생성자.prototype 내용 자체를 교체한것**이다. `  Person.prototype ={sayHello() { console.log(...); }};`

따라서 **`constructor 프로퍼티`가 없어서 링크가 깨져버렸다.**

~~~javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-26.png" style="zoom:50%;" />

위 예제를 살려주려면 `constructor 프로퍼티`를 다시 살려줘야만한다.

~~~javascript
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 링크 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
~~~

<br/>

### 인스턴스에 의한 프로토타입의 교체

 아래는 **생성자.prototype 자체를 원하는 객체로 바꾼** 것이다.

그런데 `parent`는 일반 객체이므로 `constructor`가 없기 때문에 링크가 역시 깨져버렸다.

~~~javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-27.png" style="zoom:50%;" />



<br/>

### 직접상속

프로토타입의 링크를 안꺠뜨리고 바꾸려면 `Object.create`함수를 이용한다.

```javascript
/**
 * 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
 * @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
 * @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
 * @returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
 */
Object.create(prototype[, propertiesObject])

```

```javascript
// 프로토타입이 null인 객체를 생성한다.
// 즉, 생성된 객체는 프로토타입 체인의 종점이므로 프로토타입 체인이 생성되지 않는다.
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype를 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj = {};와 동일하다.
// obj → Object.prototype → null
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj = { x: 1 };와 동일하다.
// obj → Object.prototype → null
obj = Object.create(Object.prototype, {
  x: { value: 1 }
});
// 위 코드는 아래와 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
obj = Object.create(myProto);

console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// obj = new Person('Lee')와 동일하다.
// obj → Person.prototype → Object.prototype → null
obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

<br/>

### Object.prototype의 빌트인 메소드를 객체가 직접 호출하는 것을 비추천

 ESLint에서는 `Object.create(null)`과 같이 프로토타입이 null이 객체를 프로토타입으로 삼고있는 객체가 있을 수 있으므로,

빌트인 메소드를 부를 떄 `객체명.빌트인메소드` 하는 것을 추천하지않고 있다.

~~~javascript
// 프로토타입이 null인 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;

// 즉, 생성된 객체는 프로토타입 체인의 종점이므로 프로토타입 체인이 생성되지 않는다.
console.log(Object.getPrototypeOf(obj) === null); // true

// obj는 Object.prototype의 빌트인 메소드를 사용할 수 없다. (비추천)
console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메소드는 객체로 직접 호출하지 않는다. 
console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true

~~~

`call 함수`를 이용하여 `Object.prototype.hasOwnProperty.call(obj, 'a')`를 불러낸다.

`call(객체,'인수')` call에 넘길 인수가 많을 경우 `,` 로 더 적워줘도 된다. `call`은 가변인자를 받는다.

이와 같은 방법은 `call` `bind` `apply` 등이 존재한다.

<br/>

### 객체 리터럴 내부에서 __proto__에 의한 직접 상속

`const obj = Object.create(myProto);` === `const obj = { __ proto __: myProto };`

~~~javascript
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다.
  // obj → myProto → Object.prototype → null
  __proto__: myProto
};
// 위 코드는 아래와 동일하다.
// const obj = Object.create(myProto, { y: { value: 20 } });

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
~~~

<br/>

### 정적 메소드

> 정적(static) 프로퍼티/메소드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메소드를 말한다. 

~~~javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// Person 생성자 함수는 객체이므로 자신의 프로퍼티/메소드를 소유할 수 있다.
// 정적 프로퍼티
Person.staticProp = 'static prop';
// 정적 메소드
Person.staticMethod = function () {
  console.log('staticMethod');
};

const me = new Person('Lee');

// 생성자 함수에 추가한 정적 프로퍼티/메소드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메소드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메소드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-31.png" style="zoom:50%;" />

<br/>

### for…in 문

- 객체의 모든 프로퍼티를 순회하며 열거(enumeration)하려면 for…in 문을 사용한다. 

- for…in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다

- for...in문은 실질적으로 실행되는 위치가 `{}`안이므로 `let` , `const` 를 사용할 수 있다.

  ( `const`를 재 할당이 아닌 재 선언으로 취급한다. )

```javascript
for (변수선언문 in 객체) { … }
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다. 단, 순서는 보장되지 않는다.
for (const prop in person) {
  console.log(prop + ': ' + person[prop]);
}

// name: Lee
// address: Seoul
```

<br/>

### strict mode

- strict mode에서 일반 함수의 this

strict mode 에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined  //non-strict - window
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

<br/>

### 전역 객체

브라우저 환경에서 전역 객체의 이름은 window( self ) 다.

전역객체의 프로퍼티 : API(web, node) , 전역 함수, var키워드로 선언한 전역 변수, 표준 빌트인 객체(Object, String, Number, Function, Array…)

- 전역 객체는 개발자가 의도적으로 생성할 수 없다.
- 전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.

```javascript
// 문자열 'F'를 16진수로 해석하여 10진수로 변환하여 반환한다.
console.log(window.parseInt('F', 16)); // 15
// 전역 객체 window의 메소드인 parseInt은 window.parseInt 또는 parseInt으로 호출할 수 있다.
console.log(parseInt('F', 16)); // 15

console.log(window.parseInt === parseInt); // true
```

<br/>

### 전역 프로퍼티(Global property)

전역 프로퍼티는 **전역 객체(window)의 프로퍼티**를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다.

1. Infinity

Infinity 프로퍼티는 양/음의 무한대를 나타내는 숫자값 Infinity를 갖는다.

2. NaN

NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다. console.log(typeof NaN) // number

3. undefined

undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다.

4. 빌트인 전역 함수

eval : 문자열 형태로 매개변수에 전달된 코드를 런타임에 동적으로 평가하고 실행하여 결과값을 반환한다. (가급적 사용 금지)
isFinite : 유한수 , 무한수인지 체크 boolean 반환
isNaN : NaN인지 판단하여 boolean 반환
parseFloat : 문자열을 부동소수점 숫자로 변환하여 반환한다.
parseInt : 문자열을 정수형 숫자로 변환하여 반환한다.
encodeURI / decodeURI : 매개변수로 전달된 URI를 인코딩한다.
encodeURIComponent / decodeURIComponent : 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩한다.

<br/>

### this

> **this가 가리키는 값, 즉 this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.**

#### 호출 방식

일반함수로서 호출 : `foo( );` ➤ this : window
생성자함수로서 호출: `new foo( );` ➤ this : 인스턴스 
메소드로서 호출 : `o.foo( );` ➤ this : 메소드를 호출한 객체
간접 호출 : `foo.call(x);` ➤ this : 전달한 것이 this

> **this는 함수를 어떻게 호출 했느냐로 동적으로 결정한다.**

콜백이나 중첩 함수의  this는 대부분 window를 가리킨다. (물론, 고차함수의 마음이다.)

<br/>

#### this의 binding 확정시간

> 함수가 호출 되었을 떄, this의 binding이 확정 된다.

**바인딩(binding)** : 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어 변수는 할당에 의해 값이 바인딩된다.

| 함수 호출 방식                                             | this 바인딩                                                  |
| :--------------------------------------------------------- | :----------------------------------------------------------- |
| 일반 함수 호출                                             | 전역 객체                                                    |
| 메소드 호출                                                | 메소드를 호출한 객체                                         |
| 생성자 함수 호출                                           | 생성자 함수가 (미래에) 생성할 인스턴스                       |
| Function.prototype.apply/call/bind 메소드에 의한 간접 호출 | Function.prototype.apply/call/bind 메소드에 인자로 전달한 객체 |

<br/>

#### bind

> Function.prototype에 들어있는 함수
>
> **bind(함수객체) - 단, 호출은 하지 않는다. this만 갈아낀다.**
>
> bind는 명시적으로 함수를 호출해야만 한다.

<br/>

#### Call Apply

> Function.prototype에 들어있는 함수
>
> 자신의 앞 함수를 호출한다.
>
> 첫번째 인수를 함수 안에 있는 this 대신 사용한다.
>
> Call 은 두번째 인수부터 쉼표로 구분한 리스트 형식으로 전달한다.
>
> Applye는 두번째 인수부터 배열형태으로 넘기거나 혹은 생략한다.
>
> 우선순위 1. Apply  2. Call

<br/>

~~~~javascript
function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
  const arr = Array.prototype.slice.apply(arguments);
  // const arr = Array.prototype.slice.call(arguments);
  console.log(arr);

  return arr;
}

convertArgsToArray(1, 2, 3); // [ 1, 2, 3 ]
~~~~

`slice`는 내부에서 `this`를 건다. 그러나 ` Array.prototype`는 객체다! 

참고) 전역객체는 표준 빌트인 객체(Object, String, Number, Function, Array…)를 프로퍼티로 갖는다.

따라서 `slice내부의 this`를 교체하기 위해서 `apply(arguments);` / `call(arguments);` 을 이용한다.



<br/>