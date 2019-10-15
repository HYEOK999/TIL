![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 09

- 용어
- 버전의 숫자 의미
- 객체
- 프로퍼티 종류
  1. 데이터 프로퍼티
  2. 접근자 프로퍼티
  3. 프로퍼티 판별 동작 과정
- 내부 슬롯, 내부 메소드
- 생성자
- Object 생성자 함수
- 생성자 함수
  - 생성자 함수의 로직
- this , 일반 함수로서의 호출 / 메소드로서의 호출 / 생성자 함수로서의 호출
- 내부 메소드 [[Call]] 과 [[Construct]]
- new 연산자
- 일급 객체
  - arguments 프로퍼티
  - length 프로퍼티


  <br/>

------

<br/>

### 용어 - ( 러버덕 )

- 데이터 프로퍼티
- 접근자 프로퍼티(억세스 프로퍼티)
- 내부 슬롯
- 내부 메서드
- 생성자 함수
- Object 생성자 함수
- this
- 메소드? 메소드?
- new 연산자
- 일급 객체

<br/>

------

### 버전의 숫자 의미

![버전](https://user-images.githubusercontent.com/31315644/66800837-c94a7400-ef51-11e9-874f-af33c780e892.png)

<br/>

### 객체

~~~~javascript
const PERSON = {
	name : 'Lee',
	// getName : function( ){ } //-> 함수라 부른다
	getName( ){  // 축약표현 -> 메소드라 부른다.
		return this.name;
	}
}

const NAME = PERSON.getName();
console.log(NAME); // 'Lee'


console.log(Object.getOwnPropertyDescriptors(PERSON));

~~~~

`프로퍼티 키`는 식별자 네이밍 규칙을 준수하면 ''을 생략이 가능하다. 내부적으로는 문자열로 되어있다.
`프로퍼티 값`은 데이터타입( 문자열, 숫자, Symbol, undefined, null, boolean, 객체 )이 모두 올수 있다.
특히 함수(객체)를 프로퍼티 값으로 받게되면 그 부분을 `메소드` 라 칭한다.

객체를 만들때는 객체를 만들고자 하는 몇가지 특징을 추려서 만든다. (추상화라 한다.)

- 객체의 프로퍼티 값은 `state 상태`를 의미한다.

  위 예제에서 Person 객체의 `name` 의 상태는 `'Lee'`이다.

- 객체의 메소드는 `behavior 행위` 를 의미한다.

  위 예제에서 Person 객체의 행위는 `getName()`이다.

`PERSON.getName()` 은 **값**이다. (  표현식인 문  )

따라서, 상수 NAME에 `PERSON.getName()` 을 할당한다.

<br/>

### 프로퍼티 종류

- **데이터 프로퍼티** : 키와 값으로 구성된 일반적인 프로퍼티다.
- **접근자 프로퍼티** : **자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장**할 때 사용하는 **접근자 함수**로 구성된 프로퍼티. 접근자 함수는 getter/setter 함수라고도 부른다. 

#### 프로퍼티 어트리뷰트를 확인하는 방법. `Object.getOwnPropertyDescriptors(객체명)`

#### 프로퍼티 어트리뷰트 정의(변경)하는 방법. `Object.defineProperty(객체명,'프로퍼티명',정의내용)`

##### 1. 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티다.

~~~javascript
const PERSON = {
	firstName : 'Lee',	// 데이터 프로퍼티
	lastNmae : 'Hyeok', // 데이터 프로퍼티
	getFullName( ){     // 데이터 프로퍼티
		return `${this.name} ${this.lastName}`;
	}
}

const NAME = PERSON.getFullName();
console.log(NAME); // 'Lee'

console.log(Object.getOwnPropertyDescriptors(PERSON));
~~~

`console.log(Object.getOwnPropertyDescriptors(PERSON));` 을 실행하면 나오는 로그.

~~~~javascript
// 프로퍼티 디스크립터 객체
{ 
  firstName:  // 데이터 프로퍼티
   { value: 'Lee', 
     writable: true, 
     enumerable: true, 
     configurable: true }, 
  lastName:  // 데이터 프로퍼티
   { value: 'Hyeok', 
     writable: true, 
     enumerable: true, 
     configurable: true } 
}
~~~~

​    *value: [λ: getName]* 
​	➤ 값

​    *writable: true*		
​	➤ 재할당 여부

​    *enumerable: true*
​	➤ 열거 여부

​    *configurable: true* 
​	➤ 설정 여부

<br/>

##### 2. 접근자(억세스) 프로퍼티 : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티. 접근자 함수는 getter/setter 함수라고도 부른다. 

접근자 프로퍼티 활용

**선언**

`get 함수명( )` {
	return 값;
} 

`set 함수명( 인수 )` {
	this를 활용해 코딩
} 

**get 호출**

객체명.함수    - 예 ) PERSON.fullName;     **➤ ( ) 호출 구문을 넣으면 안된다.**

**set 호출**

객체명.함수 = 값  - 예 )  PERSON.firstName = 'Kim';

~~~javascript
const PERSON = {
  firstName: 'Lee',
  lastName: 'Hyeok',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(firstName) {
    this.firstName = firstName;
  }
};

PERSON.fullName = 'Kim';
console.log(PERSON.fullName); // 'Lee'

console.log(Object.getOwnPropertyDescriptors(PERSON));

~~~
`console.log(Object.getOwnPropertyDescriptors(PERSON));` 을 실행하면 나오는 로그.

~~~javascript
{ firstName:  //데이터 프로퍼티
   { value: 'Lee', 
     writable: true, 
     enumerable: true, 
     configurable: true }, 
  lastName:  //데이터 프로퍼티
   { value: 'Hyeok', 
     writable: true, 
     enumerable: true, 
     configurable: true }, 
  fullName:  //접근자 프로퍼티
   { get: [λ: get fullName], 
     set: [λ: set fullName], 
     enumerable: true, 
     configurable: true } } 
~~~

`get` 은 특징 인수가 없고 return이 있어야 한다. 
`set` 은 인수를 받아야되기 때문에 매개변수가 있어야되고 return이 없어도 된다.

`get`, `set` 은 서로 같은 프로퍼티다. 즉 한쌍이라 생각하면 된다.

`get` 과 `set` 의 프로퍼티들은 각각 내부 슬롯 [[Get]] , [[Set]]에 셋팅된다.

​    *get : [λ: getName]* 
​	➤ 프로퍼티의 값을 읽을 때 호출되는 접근자 함수.

​	*set: [λ: set fullName]*	
​	➤ 프로퍼티의 값을 저장할 때 호출되는 접근자 함수.

​    *enumerable: true*
​	➤ 열거 여부

​    *configurable: true* 
​	➤ 설정 여부

#### 프로퍼티 판별 동작 과정

1. JS엔진은 먼저 프로퍼티 키가 유효한지 확인한다.
2. 프로토타입 체인에서 프로퍼티를 검색한다.
3. 해당 프로퍼티 어트리뷰트를 확인하며 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.
4. 데이터라면 원시값을 반환하고, 접근자 프로퍼티 라면 [[Get]] 혹은 [[Set]]의 값, 즉 getter/setter를 호출하여 결과를 반환한다.

<br/>

### 내부 슬롯 , 내부 메서드

> **내부슬롯 : JS 엔진의 프로퍼티 (명사적인 의미) [[Value]] [[prototype]]**
>
> **내부메서드 : JS 엔진의 메소드 (동사적인 의미) [[Set]] [[Get]]** 
>
> 일부 내부 슬롯 과 내부 메서드 [[Get]] 같은 메서드들은 열람이 허락 되어있지만,
>
> 내부 슬롯과 내부 메소드는 객체의 프로퍼티가 아니다. 
>
> 내부 슬롯과 내부 메소드는 직접적으로 접근하거나 호출할 수 있는 방법을 원칙적으로 제공하지 않는다. 

<br/>

-------------

### 생성자

​	객체를 만드는 방법
  1. 객체 리터럴
  2. 생성자 함수
  3. Object 생성자 함수
  4. Class [ ES6 ]

![상속](https://user-images.githubusercontent.com/31315644/66806016-68c33300-ef61-11e9-879e-9b814de27b62.jpeg)

**프로토타입** : JS의 모든 객체는 부모 역할을 하는 객체가 있는데 그것이 **prototype 객체**라고 한다. (상속을 자식에게 해주는 객체)

위 예제의 `o`객체의 부모 Object.prototype에게 접근하기 위한 링크 프로퍼티 : __ proto __

<br/>

### Object 생성자 함수

함수를 `new` 연산자와 함께 `Object` 생성자를 호출하면 retunr 값으로 빈 객체를 만들어 반환한다.
 `new` 연산자로 만들어진 생성자를 `인스턴스`라 한다.

Object생성자 함수는 일반 함수들과는 다르게 선 호출 하고나서
빈 객체를 생성한 이후 프로퍼티 또는 메소드를 추가하여 객체를 완성할 수 있다.

생성자 함수는 템플릿 역할을 하여 비슷한 내용의 객체를 여러개 만들어낼 수 있다.

~~~javascript
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
~~~

​	자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp 등의 
빌트인(intrinsic 내장) 생성자 함수를 제공한다.

<br/>

### 생성자 함수

생성자 함수는 템플릿 역할을 하여 비슷한 내용의 객체를 여러개 만들수 있기 때문에 편하다.

#### 생성자 함수의 로직

1. 함수를 `new` 연산자와 생성자를 호출하면 빈 객체를 생성한다.

2. this에 빈객체를 할당한다.

3. this의 빈객체 내부에서  프로퍼티 추가, 메서드추가 등등 을 한다.

4. 생성자 함수는 마지막에 `return = this;`를 암묵적으로 실행한다. (마지막에 return을 안적어줘도 되는 이유임)
(생성자 함수는 `return`을 사용하지 말아야한다.)

**문법**

~~~javascript
// 생성자 함수
function Person(name){
  console.log(this); // Person{ }
  this.name = name;
  this.sayHi = function(){
    return this.name;
  };
  console.log(this); // Person { name : 'Lee', sayHi: [λ]}
}

//const me = Person(); // undefined  
const me = new Person('Kim');
console.log(me); // Person { name: 'Lee', sayHi: [λ] } ;
~~~

~~~javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
~~~

<br/>

### this , 일반 함수로서의 호출 / 메소드로서의 호출 / 생성자 함수로의 호출

- 일반 함수의 `this` ➤ **전역객체 (window)**

- 객체(메소드) 리터럴의 `this` ➤ **자신 (self)**

- 생성자 함수의 `this` ➤ **인스턴스**

일반 함수로서의 호출 / 메소드로서의 호출 / 생성자 함수로의 호출

~~~~~~~~~javascript
// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
  console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
foo(); // window

// 메소드로서 호출
const obj = { foo }; // ES6 프로퍼티 축약 표현
obj.foo(); // obj , 메소드 this는 자신의 객체를 가리킴.

// 생성자 함수로서 호출
const inst = new foo(); // inst, 생성자 this는 인스턴스를 가리킴
~~~~~~~~~

<br/>

### 내부 메소드 [[Call]]과 [[Construct]]

함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다. 
생성자 함수로서 호출한다는 것은 new 연산자와 함께 호출하여 객체를 생성하는 것을 의미한다.

함수는 객체이므로 일반 객체(Ordinary object)와 동일하게 동작할 수 있다. 

즉, 함수 객체는 일반 객체의 내부 슬롯과 내부 메소드를 모두 가지고 있다.

**함수가 일반적인 함수로서 호출되면 함수 객체의 내부 메소드 [[Call]]가 호출되고 **(`[[Call]]`이 없는 객체는 함수가 아니다.)

**함수가 new 연산자(또는 super 연산자)와 함께 생성자 함수로서 호출되면 내부 메소드 [[Construct]]가 호출된다.**

( 메서드와 화살표 함수는 [[Construct]] 가 없다. 즉, 메서드와 화살표함수는 생성자 함수가 될 수 없다. )

JS엔진이 함수를 생성할 때 사용하는 **추상연산**(FunctionCreate)코드. 첫번쨰 매개변수 kind에 담기는 함수타입.
함수가 태어나면 JS엔진이 관리하는 내부슬롯에 3가지 타입의 함수타입이 있다.

1. normal ( 일반적인 함수 ) - constructor 
2. arrow (메소드 축약표현을 사용한것.) `sayHi()` - non-constructor
3. method  (화살표 함수) - non-constructor

<br/>

### new 연산자

 만약, 생성자로 호출 했는데 return 문이 존재하고 return하는 값이 객체라면 그것을 반환하고, 원시값이라면 무시한다.

따라서 new 로 생성자를 만들어서 쓰려고 할 때는 return 반환문이 존재해서는 안된다.

반대로, new 연산자를 없이 생성자 함수를 호출한다면 일반 함수로 동작하게 된다. 

일반 함수에서의 this는 전역객체 (window)를 가리키고 있기 때문에 매우 조심해야한다.

new 연산자와 함께 호출하는 함수는 non-constructor가 아닌 constructor이여야 한다.

<br/>

### new 연산자 미기재 방어법

사람은 실수하기 마련이고, 파스칼 케이스를 통해서 해당 함수가 생성자를 위한 함수라고 기재를 했음에도 일반함수로 불러들일 수 있을 것이다. 

따라서 이러한 문제를 막기 위해 2가지 방법이 있다.

1. new.target (IE 미지원) : new 연산자와 함께 호출되었는지 확인할 수 있다.

~~~javascript
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
  if (!new.target) { //이 함수가 new와 함께 호출되었는지 아닌지 판단
      //new와 호출안하면 undefined가 되는데 
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius); //new.target에 new가 없으면 new붙여서 싫행
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
~~~

2. `if (!(this instanceof Circle))` 해당 구문의 뜻은 이러하다. 해당 this 가 Circle의 인스턴스 냐 라고 묻는 것.

~~~javascript
   // Scope-Safe Constructor Pattern
function Circle(radius) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
  // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
  // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) {
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
~~~

3. new 연산자와 함꼐 생성자를 만드는 빌트인 함수들은 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다.

~~~javascript
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) { return x ** x }

f = Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) { return x ** x }
~~~

<br/>

### 일급 객체

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개 변수에게 전달할 수 있다.
4. 함수의 결과값으로 반환할 수 있다.

자바스크립트의 함수는 아래 예제와 같이 위의 조건을 모두 만족하므로 일급 객체이다.

함수는 객체이다. 따라서 함수도 프로퍼티를 가질 수 있다.

<br/>

#### arguments 프로퍼티

- 함수 호출 시 전달된 인수들의 정보를 담음
- 순회 가능한 유사 배열 객체다.
- 지역변수처럼 사용해야됨.
- 함수 외부에서는 사용 불가.
- 인수 값이 마음대로 들어오는 **가변 인자 함수**에서 유용하다.

~~~javascript
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
~~~

<br/>

for문을 사용하지 않고 배열로 변환해서 사용하기도 한다.

~~~javascript
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
~~~

~~~javascript
// ES6 Rest parameter
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
~~~

<br/>

#### length 프로퍼티

함수 객체의 length 프로퍼티는 함수 정의 시 선언한 매개변수의 개수를 가리킨다.

~~~javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
~~~

<br/>