![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 15

- 용어
- 클래스
  - 클래스 기본적인 구조
  - 클래스 vs 생성자 함수
  - 클래스 호이스팅
  - 인스턴스 생성
  - 클래스 필드
  - 메소드
    - constructor
    - 프로토타입 메소드
    - 정적 메소드
  - 정적 메소드와 프로토타입 메소드의 차이
  - 클래스에서 정의한 메소드의 특징
  - 클래스의 인스턴스 생성 과정
  - 프로퍼티
    - 인스턴스 프로퍼티
    - 접근 프로퍼티
  - 클래스 필드 정의 제한
  - private 필드 정의 제한
  - static 필드 정의 제한
  - 상속
    - 클래스 상속과 생성자 함수 상속
    - 서브 클래스의 constructor
    - super 키워드
    - super 참조
- ES6 함수의 추가 기능
  - 생성자 함수와 생성자가 아닌 함수
  - 화살표 함수
  - 화살표 함수와 일반 함수의 차이
  - 화살표 함수 - this
  - 화살표 함수 - super
  - 화살표 함수 - arguments
  - Rest 파라미터
    - 기본 문법
    - Rest 파라미터 주의사항
  - 매개변수 기본값

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 고차함수
- 클로저
- 정규표현식
- 플래그
- 패턴

<br/>

---------

## 클래스

> 객체를 만드는 용도로 사용. 
>
> 클래스는  함수다.

### 클래스 기본적인 구조

~~~javascript
class 클래스명 {
//함수 본체 - 메서드 3개만 올 수 있음.
  constructor(){ // 생성자, 인스턴스의 프로퍼티를 정의한다.
  }

  함수명(){ // 프로토 타입 메소드
  }

  static 함수명(){ // 정적 메소드
  }
}
~~~

<br/>

### 클래스 vs 생성자 함수

**클래스는 생성자 함수와 매우 유사하게 동작하지만 아래와 같이 몇가지 차이가 있다.**

1. 클래스는 new 연산자를 사용하지 않고 호출하면 에러가 발행한다. 하지만 생성자 함수는 new 연산자를 사용하지 않고 호출하면 일반 함수로서 호출된다.
2. 클래스는 상속을 지원하는 extentds와 super 키워드를 제공한다. 하지만 생성자 함수는 extentds와 super 키워드를 지원하지 않는다.
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다. 하지만 생성자 함수는 함수 호이스팅이 발생한다.
4. 클래스의 모든 코드는 암묵적으로 strict 모드가 지정되어 실행되며 strict 모드를 해지할 수 없다. 하지만 생성자 함수는 암묵적으로 strict 모드가 지정되지 않는다.
5. 클래스의 constructor, 프로토타입 메소드, 정적 메소드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이다. 다시 말해, 열거되지 않는다.

**클래스는 생성자 함수보다 엄격하다.**

<br/>

~~~javascript
// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메소드
  static sayHello() {
    console.log('Hello!');
  }
}

// 인스턴스 생성
const me = new Person('Lee');

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메소드 호출
me.sayHi(); // Hi! My name is Lee
// 정적 메소드 호출
Person.sayHello(); // Hello!
~~~

![img](https://poiemaweb.com/assets/fs-images/24-1.png)

<br/>

### 클래스 호이스팅

​	클래스 선언문 이전에 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

즉, let이나 const와 동일하다.

<br/>

### 인스턴스 생성

 클래스는 인스턴스를 생성하는 생성자 함수이며 `new` 연산자와 함께 호출되어 인스턴스를 생성한다.

클래스는 `new`없이 호출시 에러를 유발한다.

~~~javascript
class Person {}

// 인스턴스 생성
const me = new Person();

console.log(me); // Person {}
~~~

<br/>

### 클래스 필드

> 정식 사양은 아니다. 
>
> 클래스 내에 필드형태로 문을 넣는 것을 말한다.
>
> 클래시 필드에서는 this를 빼야한다.

~~~javascript
// 클래스
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}

// 생성자 함수
function Person(name) {
  // 인스턴스 생성 및 초기화
  this.name = name;
}
~~~

<br/>

### 메소드

#### constructor

constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메소드이다. constructor는 이름을 변경할 수 없다.

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
```

<br/>

```javascript
class Person {
  constructor(name, address) {
    // 인스턴스 초기화
    this.name = name;
    this.address = address;
  }
}

// 초기값을 전달한다. 초기값은 constructor에 전달된다.
const me = new Person('Lee', 'Seoul');
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

이처럼 constructor 내에서는 인스턴스의 생성과 동시에 인스턴스 프로퍼티 추가를 통해 인스턴스의 초기화를 실행한다. 따라서 인스턴스를 초기화하려면 constructor를 생략해서는 안된다.

<br/>

#### 프로토타입 메소드

생성자 함수를 사용하여 인스턴스를 생성하는 경우, 프로토타입 메소드를 생성하기 위해서는 아래와 같이 명시적으로 프로토타입에 메소드를 추가해야 한다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

~~~javascript
// 클래스
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
~~~

<img src="https://poiemaweb.com/assets/fs-images/24-4.png" alt="img" style="zoom:50%;" />

<br/>

#### 정적 메소드

 정적(static) 메소드는 인스턴스를 생성하지 않아도 호출할 수 있는 메소드를 말한다.

생성자 함수의 경우, 정적 메소드를 생성하기 위해서는 아래와 같이 명시적으로 생성자 함수에 메소드를 추가해야 한다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 정적 메소드
Person.sayHi = function () {
  console.log('Hi!');
};

// 정적 메소드 호출
Person.sayHi(); // Hi!
```

클래스 몸체에서 정의한 메소드에 static 키워드를 붙이면 정적 메소드(클래스 메소드)가 된다.

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메소드
  static sayHi() {
    console.log('Hi!');
  }
}
```

위 예제의 Person 클래스는 아래와 같이 프로토타입 체인을 생성한다.

<img src="https://poiemaweb.com/assets/fs-images/24-5.png" alt="img" style="zoom:50%;" />

<br/>

### 정적 메소드와 프로토타입 메소드의 차이

정적 메소드와 프로토타입 메소드는 무엇이 다르며 무엇을 기준으로 구분하여 정의하여야 할 지 생각해 보자. 정적 메소드와 프로토타입 메소드의 차이는 아래와 같다.

1. 정적 메소드와 프로토타입 메소드가 속해 있는 프로토타입 체인이 다르다.
2. 정적 메소드는 클래스로 호출하고 프로토타입 메소드는 인스턴스로 호출한다.
3. 정적 메소드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메소드는 인스턴스 프로퍼티를 참조할 수 있다.

> 메소드 내부에서 인스턴스 프로퍼티를 참조해야 할 필요가 있다면 this를 사용해야 하며 이러한 경우, 프로토타입 메소드로 정의해야 한다. 하지만 메소드 내부에서 인스턴스 프로퍼티를 참조해야 할 필요가 없다면 this를 사용하지 않게 된다.

<br/>

### 클래스에서 정의한 메소드의 특징

클래스에서 정의한 메소드는 아래와 같은 특징을 갖는다.

1. function 키워드를 생략한 메소드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메소드를 정의할 때는 **콤마가 필요 없다.**
3. 암묵적으로 strict 모드로 실행된다. 
4. for…in 문이나 Object.keys 메소드 등으로 열거할 수 없다. 즉, 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이다. 
5. 내부 메소드 [[Construct]]를 갖지 않는 non-constructor이다. 따라서 new 연산자와 함께 호출할 수 없다.

<br/>

### 클래스의 인스턴스 생성 과정

**1. 인스턴스 생성과 this 바인딩**

암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 (아직 완성되진 않았지만) 클래스가 생성한 인스턴스이다. 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

**2. 인스턴스 초기화**

constructor에 기술되어 있는 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

**3. 프로토타입 / 정적 메소드 추가**

클래스 몸체에 프로토타입 메소드가 존재하면 클래스의 prototype 프로퍼티가 가리키는 객체에 메소드로 추가된다. 클래스 몸체에 정적 메소드가 존재하면 클래스에 메소드로 추가된다.

**4. 인스턴스 반환**

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

~~~javascript
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 4. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }

  // 3. 프로토타입 메소드는 클래스의 prototype에 메소드로 추가된다.
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 3. 정적 메소드는 클래스에 메소드로 추가된다.
  static sayHello() {
    console.log('Hello!');
  }
}
~~~

<br/>

### 프로퍼티

#### 인스턴스 프로퍼티

인스턴스 프로퍼티는 construnctor 내부에서 정의해야 한다.

```javascript
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

<br/>

####  접근 프로퍼티

접근자 프로퍼티(Accessor property)는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티다.

~~~javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Ungmo', 'Lee');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Heegun Lee';
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

// fullName는 접근자 프로퍼티이다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
~~~

<br/>

### 클래스 필드 정의 제안

​	클래스 몸체에서 클래스 필드를 정의할 수 있는 클래스 필드 정의(Class field definitions) 제안은 아직 ECMAScript의 정식 표준 사양으로 승급 되지 않았다. 

하지만 최신 브라우저(Chrome 72 이상)와 최신 Node.js(버전 12 이상)는 표준 사양으로 승급이 확실시되는 이 제안을 미리 구현해 놓았다.

따라서 최신 브라우저와 최신 Node.js에서는 아래 예제와 같이 클래스 필드를 클래스 몸체에 정의할 수 있다.

```javascript
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

**클래스 필드는 고정값을 가지고 있는 경우에 사용하도록 한다. 왜냐하면 값을 넘겨받았다면 클래스필드로 받을 수 없기에 결국 함수를 만들게되는데 그럴바에는 차라리 constructor를 만드는게 차라리 낫다.**

~~~javascript
class Person {
  name; // 의미 없는 코드

  constructor(name) {
    // 클래스 필드 초기화.
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
~~~

<br/>

함수는 일급 객체이므로 클래스 필드에 할당할 수 있으므로 클래스 필드를 통해 메소드를 정의할 수도 있다.

```javascript
class Person {
  // 클래스 필드에 문자열을 할당
  name = 'Lee';

  // 클래스 필드에 함수를 할당
  getName = function () {
    return this.name;
  }
  // 화살표 함수로 정의할 수도 있다.
  // getName = () => this.name;
}

const me = new Person();
console.log(me); // Person {name: "Lee", getName: ƒ}
console.log(me.getName()); // Lee
```

<br/>

### private 필드 정의 제안

constructor 내부에서 this를 통해 정의한 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉, 언제나 public이다.

ES6의 클래스는 다른 객체지향 언어처럼 private, public, protected 키워드와 같은 접근 제한자(access modifier)를 지원하지 않는다.

생성자 함수에서는 클로저를 사용하여 private한 프로퍼티를 흉내낼 수 있었다. 단 private한 프로퍼티를 흉내낸 자유 변수에 접근하면 에러가 발생하지 않고 undefined를 반환하므로 아쉬움이 남는다.

```javascript
// ES5
var Person = (function () {
  // 자유 변수이며 private하다
  var _name = '';

  // 생성자 함수
  function Person(name) { _name = name; }

  // 프로토타입 메소드. 이 메소드는 클로저이다.
  Person.prototype.sayHi = function () {
    console.log('Hi! My name is ' + _name);
  };

  // 생성자 함수를 반환
  return Person;
}());

// 인스턴스 생성
var me = new Person('Lee');

// _name에 접근할 수 없다.
console.log(me); // Person {}
```

<br/>

~~~javascript
class Person {
  // private 필드 정의
  #_name = '';

  constructor(name) {
    this.#_name = name;
  }

  // sayHi는 접근자 프로퍼티이다.
  get sayHi() {  // sayHi() {
    // private 필드를 참조하여 trim한 다음 반환한다.
    return this.#_name.trim();
  }
}

const me = new Person(' Lee ');

console.log(me.sayHi); // "Hi! My name is Lee"
~~~

private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.

```javascript
class Person {
  constructor(name) {
    // private 필드는 클래스 몸체에서 정의해야 한다.
    this.#name = name;
    // SyntaxError: Private field '#name' must be declared in an enclosing class
  }
}
```

<br/>

#### static 필드 정의 제안

static public 필드, static private 필드, static private 메소드를 정의할 수 있는 새로운 표준 사양인 [“Static class features”](https://github.com/tc39/proposal-static-class-features)이 2019년 11월 현재, TC39 프로세스의 stage 3(candidate)에 제안되어 있다. 이 제안 중에 static public/private 필드는 2019년 11월 현재, 최신 브라우저(Chrome 72 이상)과 최신 Node.js(버전 12 이상)에 이미 구현되어 있다.

```javascript
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메소드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

<br/>

### 상속

#### 클래스 상속과 생성자 함수 상속

<img src="https://poiemaweb.com/assets/fs-images/24-7.png" alt="img" style="zoom:50%;" />

<img src="https://poiemaweb.com/assets/fs-images/24-8.png" alt="img" style="zoom:50%;" />

~~~javascript
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() { return 'eat'; }

  move() { return 'move'; }
}

class Bird extends Animal {
  /*
  // countructor가 생략되어있으므로 다음과 같이 진행한다.
	constructor(age, weight) { 
  	super(age, weight); 
  	this.age; 
  	this.weight;
  }  
  */
  fly() { return 'fly'; }
}

const crow = new Bird(1, 5);

console.log(crow); // Bird {age: 1, weight: 5}
console.log(crow instanceof Bird); // true
console.log(crow instanceof Animal); // true

console.log(crow.eat());  // eat
console.log(crow.move()); // move
console.log(crow.fly());  // fly
~~~

![오후](https://user-images.githubusercontent.com/31315644/67551751-961f9600-f744-11e9-91fd-9b1743031794.png)

<br/>

#### 서브 클래스의 constructor

 클래스에 constructor를 생략하면 클래스에 아래와 같이 디폴트 constructor가 암묵적으로 정의된다.

```javascript
constructor() {}
```

super()는 수퍼 클래스의 constructor(super-constructor)를 호출하여 인스턴스를 생성한다.

```javascript
constructor(...args) { super(...args); }
```

**위 `...`은 스프레드가 아니라 Rest 파라미터 이다.**

- 매개변수에 …을 붙이면 Rest 파라미터가 된다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.
- 즉, 푸는게 아니라 배열로 묶는다.

<br/>

수퍼 클래스와 서브 클래스 모두 constructor를 생략되었다.

```javascript
// 수퍼 클래스
class Base {}

// 서브 클래스
class Derived extends Base {}
```

위 예제는 아래와 같이 암묵적으로 디폴트 constructor가 정의된다.

```javascript
// 수퍼 클래스
class Base {
  constructor() {}
}

// 서브 클래스
class Derived extends Base {
  constructor() { super(); }
}

const derived = new Derived();
console.log(derived); // Derived {}
```

위 예제와 같이 수퍼 클래스와 서브 클래스 모두 constructor를 생략하면 빈객체가 생성된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 인스턴스에 프로퍼티를 추가해야 한다.

<br/>

#### super 키워드

~~~javascript
// 수퍼 클래스
class Base {
  constructor(a, b) { // ④
    this.a = a;
    this.b = b;
  }
}

// 서브 클래스
class Derived extends Base {
  constructor(a, b, c) { // ②
    super(a, b); // ③
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3); // ①
console.log(derived); // Derived {a: 1, b: 2, c: 3}
~~~

- **서브 클래스에서 constructor를 생략하지 않는 경우, 서브 클래스의 constructor에서는 반드시 super를 호출해야 한다.**

- **서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.**

- **super는 반드시 서브 클래스의 constructor에서만 호출한다. 서브 클래스가 아닌 클래스 또는 함수에서 호출하면 에러를 발생시킨다.**

<br/>

#### super 참조

메소드 내에서 super를 참조하면 수퍼 클래스의 메소드를 호출할 수 있다.

~~~javascript
// 수퍼 클래스
class Base {
  static sayHi() {
    return 'Hi!';
  }
}

// 서브 클래스
class Derived extends Base {
  static sayHi() {
    // super.sayHi는 수퍼 클래스의 정적 메소드를 가리킨다.
    return `${super.sayHi()} how are you doing?`;
  }
}

console.log(Derived.sayHi()); // Hi! how are you doing?
~~~

<br/>

## ES6 함수의 추가 기능

### 생성자 함수와 생성자가 아닌 함수 (constructor || non-constructor)

ES6 이전의 함수는 모두 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다. 다시 말해, ES6 이전의 모든 함수는 callable이며 constructor이다.

따라서 모든 함수가 프로타입을 만들고 arguments를 가지고 있는 등등 성능상으로 비효율적인 상황이 생기게 된다.

따라서 ES6부터 함수를 체계적으로 구분하여 다음과 같이 사용하도록 하였다.

<br/>

| ES6 함수의 구분    | constructor | prototype | super | arguments |
| :----------------- | :---------: | :-------: | :---: | :-------: |
| 일반 함수(Normal)  |      ○      |     ○     |   ✗   |     ○     |
| 메소드(Method)     |      ✗      |     ✗     |   ○   |     ○     |
| 화살표 함수(Arrow) |      ✗      |     ✗     |   ✗   |     ✗     |

일반 함수는 함수 선언문이 함수 표현식으로 정의한 함수를 말하며 ES6 이전의 함수와 차이가 없다. 하지만 ES6의 메소드와 화살표 함수는 ES6 이전의 함수와 명확한 차이가 있다.

일반 함수는 constructor이지만 **ES6의 메소드와 화살표 함수는 non-constructor이다.** 

<br/>

### 화살표 함수

- 화살표 함수는 주로 콜백에서 사용한다.

- 인수가 1개일 때만 `()`을 생략할 수 있다.

- 한줄 일때만 `{}`또는 `return`을 생략이 가능하다.

- 빈객체 리터럴로 반환하고 싶을 떄

  ~~~javascript
  const arrow = () => {}; // XXX {}을 함수을 괄호로 이해한다.
  const arrow = () => ({}); // O 
  ~~~

  <br/>

### 화살표 함수와 일반 함수의 차이

화살표 함수와 일반 함수의 차이는 아래와 같다.

- **1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.**

따라서 화살표 함수는 생성자 함수로서 호출할 수 없다.

- **2. 중복된 매개 변수 이름을 선언할 수 없다.**

일반 함수는 중복된 매개 변수 이름을 선언해도 에러가 발생하지 않는다.

- **3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.**

  ​	화살표 함수 내부에서 this, arguments, super, new.target를 참조하면 스코프 체인을 통해 **상위 컨텍스트의 this, arguments, super, new.target를 참조한다.**

<br/>

### 화살표함수 - this

화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this이다. 

그리고 화살표 함수는 다른 함수의 인수로 전달되어 중첩 함수(콜백 함수)로 사용되는 경우가 많다.

화살표 함수의 this는 일반 함수의 this와 다르게 동작한다. 

이는 “중첩 함수 내부의 this 문제”, 즉 중첩 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다. 

~~~javascript
// 화살표 함수는 상위 컨텍스트의 this를 참조한다.
() => this.x;

// 익명 함수에 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () { return this.x; }).bind(this);
~~~

<br/>

​	만약 화살표 함수가 화살표 함수의 중첩 함수인 경우, 부모 화살표 함수가 참조하는 상위 컨텍스트의 this를 참조한다. 즉, 화살표 함수가 중첩 함수인 경우, 상위 스코프에 존재하는 가장 가까운 함수 중에서 화살표 함수가 아닌 부모 함수의 this를 참조한다. 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리킨다.

```javascript
// 화살표 함수는 함수 자체의 this 바인딩이 없다.
// 전역 함수 foo의 상위 컨텍스트는 전역이다.
// 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo(); // window

// 중첩 함수 foo의 상위 컨텍스트는 즉시 실행 함수이다.
// 화살표 함수 foo의 this는 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => console.log(this);
  foo();
}).call({ a: 1 }); // { a: 1 }

// 함수 foo는 화살표 함수를 반환한다.
// 반환된 화살표 함수의 this는 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => () => console.log(this);
  foo()();
}).call({ a: 1 }); // { a: 1 }

// increase 프로퍼티에 할당한 화살표 함수의 상위 컨텍스트는 전역이다.
// increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
  num: 1,
  increase: () => ++this.num
};

console.log(counter.increase()); // NaN
```

<br/>

화살표 함수의 this는 정적으로 결정이 나버린다. (자신의 상위 스코프를 가리킨다.)

~~~javascript
window.x = 1;

const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1
~~~

위처럼 call로 this를 보내도 arrow의 this는 전역을 가리킨다.

화살표 함수가 call, applay, bind 메소드를 사용할 수 없다는 의미는 아니다. 

단지 화살표 함수의 this는 일단 결정된 이후 변경할 수 없고 언제나 유지된다.

```javascript
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2));    // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)());  // 3
```

**메소드를 화살표 함수로 정의하는 것은 피해야 한다.** 

<br/>

**클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다.**

```javascript
// Bad
class Person {
  // 클래스 필드 정의 제안
  name = 'Lee';
  sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Lee
```

이때 sayHi 클래스 필드에 할당한 화살표 함수 내부에서 this를 참조하면 상위 컨텍스트의 this를 그대로 가리킨다. 그렇다면 sayHi 클래스 필드에 할당한 화살표 함수의 상위 컨텍스트는 무엇일까? sayHi 클래스 필드는 인스턴스 프로퍼티이므로 아래와 같은 의미이다.

```javascript
class Person {
  constructor() {
    this.name = 'Lee';
    // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
    // sayHi 프로퍼티는 인스턴스 프로퍼티이다.
    this.sayHi = () => console.log(`Hi ${this.name}`);
  }
}
```

<br/>

### 화살표함수 - super

화살표 함수는 함수 자체의 super 바인딩이 없다. 

**따라서 화살표 함수 내부에서 super를 참조하면 상위 컨텍스트의 super를 참조한다.**

```javascript
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // super 키워드는 ES6 메소드 내에서만 사용 가능하다.
  // 화살표 함수는 함수 자체의 super 바인딩이 없다.
  // 화살표 함수 foo의 상위 컨텍스트는 constructor이다.
  // 화살표 함수 foo의 super는 constructor의 super를 가리킨다.
  // 클래스 필드 정의 제안으로 클래스 필드에 화살표 함수를 할당한다.
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

<br/>

### 화살표함수 - arguments

화살표 함수는 함수 자체의 arguments 바인딩이 없다. 따라서 화살표 함수 내부에서 arguments를 참조하면 상위 컨텍스트의 arguments를 참조한다.

```javascript
(function () {
  // 화살표 함수는 함수 자체의 arguments 바인딩이 없다.
  // 중첩 함수 foo의 상위 컨텍스트는 즉시 실행 함수이다.
  // 화살표 함수 foo의 arguments는 실행 함수의 arguments를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
}(1, 2));

// 전역 함수 foo의 상위 컨텍스트는 전역이다.
// 전역에는 arguments 객체가 없다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

<br/>

### Rest 파라미터

#### 기본 문법

> Rest 파라미터(Rest Parameter, 나머지 매개변수)는 매개변수 이름 앞에 세개의 점 …을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

```javascript
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터이다.
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
  // 매개변수 rest에는 배열이 할당된다.
  console.log(Array.isArray(rest)); // true
}

foo(1, 2, 3, 4, 5);
```

`argurments`는 유사배열 객체이기 때문에 완전한 배열로 변환하기 위해서는 slice.call등을 써야하는데 Rest 파라미터는 정말 쉽게 배열로 바꿀수 있다.

<br/>

함수에 전달된 인수들은 순차적으로 파라미터와 Rest 파라미터에 할당된다.

```javascript
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest);   // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);
```

<br/>

#### Rest파라미터 주의사항

- Rest파라미터는 항상 마지막에 위치해야만 한다.
- Rest파라미터는 단 하나만 선언할 수 있다.
- Rest파라미터는 함수 정의 시 선언한 매개변수의 개수를 나타내는 length프로퍼티에 영향을 주지 않는다.

~~~javascript
function foo( ...rest, param1, param2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter

// Rest 파라미터는 단 하나만 선언할 수 있다.
function foo(...rest1, ...rest2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter

// Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2
~~~

<br/>

### 매개변수 기본값

​	함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 일반적이지만 그렇지 않은 경우에도 에러가 발생하지는 않는다. 

함수는 매개변수의 개수와 인수의 개수를 체크하지 않는다. 인수가 부족한 경우, 매개변수의 값은 undefined이다.

```javascript
function sum(x, y) {
  return x + y;
}

console.log(sum(1)); // NaN
```

따라서 매개변수에 적절한 인수가 전달되었는지 함수 내부에서 확인할 필요가 있다.

```javascript
function sum(x, y) {
  // 매개변수의 값이 falsy value인 경우, 기본값을 할당한다.
  x = x || 0;
  y = y || 0;

  return x + y;
}

console.log(sum(1));    // 1
console.log(sum(1, 2)); // 3
```

ES6에서는 매개변수 기본값을 사용하여 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다. 

매개변수 기본값은 매개변수에 인수를 전달하지 않았을 경우에만 유효하다.

```javascript
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1));    // 1
console.log(sum(1, 2)); // 3
```

매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 영향을 주지 않는다.

```javascript
function foo(x, y = 0) {
  console.log(arguments);
}

console.log(foo.length); // 1

sum(1);    // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
```