![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 10

- 용어

- Prototype

- 상속의 문제점

  - 메소드의 종류

- __ proto __ 접근자 프로퍼티

- 객체 리터럴의 프로토타입
  
- __ proto __ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
  
- 프로토타입의 생성 시점
  
- Object.create 직접 상속
  
  <br/>

------

<br/>

### 용어 - ( 러버덕 )

- 객체
- 인스턴스
- 리터럴
- 상속
- 메소드
- __ proto __ 이란?
- 객체 리터럴의 프로토타입
- 함수 객체의 protype 프로퍼티

<br/>

------

## Prototype

**객체** : 사람이 구체적으로 이해할 수 있게끔 어떠한 사물이나 개념을 속성 ( 프로퍼티 ) 만 추상화하여 프로그래밍적으로 표현한 것.

**인스턴스** : 객체를 사용하게끔 실물화 한 것. (생성자함수, 클래스로 인해 탄생)

**클래스** : JS에서 클래스는 내부적으로 돌아가는 함수다.

**__ proto __** : 모든 객체가 소유중. 단방향 링크트 리스트. 접근자 프로퍼티. getter / setter

**prototytpe** : 함수 객체만 소유중. 함수 객체의 prototype 프로퍼티

**상속** : 부모 객체로 부터 메소드나 프로퍼티를 물려받는 행위. 

**일급객체가 갖는 4가지 특징**

1. 무명의 객체를 갖는다. 런타임에 실행할수있다.
2. 변수에 값으로서 담을수있다.
3. 매개변수에 전달할 수 있다.
4. 함수의 결과값으로 반환할 수 있다.

모든 객체는 부모가 있다.( Object.prototype의 부모는 없다. - null )

~~~javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// Person.prototype: Person 생성자 함수는 prototype 프로퍼티를 통해
// 자신이 생성할 인스턴스(이 경우에는 me)의 프로토타입을 할당
// me.__proto__: 객체 me의 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입에 접근
// 결국 Person.prototype와 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__);  // true
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-9.png" style="zoom:50%;" />

me ->  Person.prototype -> Object.prototype -> null : 프로토타입 체인

프로토타입 체인 vs 스코프 체인

프토타입 체인 : 프로퍼티를 찾는다.

스코프  체인 : 스코프내에서 식별자를 찾는다.

만약`me.toString();`이라는 명령이 들어왔다면

1. `me`라는 식별자를 스코프체인을 통해서 찾는다.

2. 식별자를 찾았다면 `.toString()`이라는 프로퍼티 키를 프로토타입 체인을 통해서 찾는다.

인스턴스의 프로토타입은 생성자함수에 의하여 결정되게 된다.

<br/>

### 상속의 문제점

~~~javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수이다.
    // Math.pow는 첫번째 인수를 두번째 인수로 거듭제곱한 값을 반환한다.
    return Math.PI * Math.pow(this.radius, 2);
  };
}

// 인스턴스 생성
// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메소드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// 따라서 getArea 메소드는 하나만 생성하여 모든 인스턴스가 공유하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
~~~

`Circle` 함수 내부에서  `this.radius = radius;`의 경우, 상태기 때문에 만들어질 인스턴스가 모두 가지고 있어야만한다.

왜냐하면 이것은 상태고 변경될수 있기 때문이다.

하지만 `this.getArea = function () { .. }`의 경우 모든 인스턴스가 가질 필요없다.

왜냐하면 이것은 동작이고 고정되었으며 하는 행위이기 때문이다.

따라서 이것을 바꾸기 위해서는 상속을 통해 프로토타입에서 행위를 하는 메서드만 가지고 있으면 될 뿐이다.

<img src="https://poiemaweb.com/assets/fs-images/18-1.png" style="zoom:48%;" />

<br/>

~~~javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 공유할 수 있도록 getArea 메소드를 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype로부터 getArea 메소드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메소드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-2.png" alt="생성자-프로토타입,poiema" style="zoom:50%;" />

- `인스턴스 circle1` 과 `인스턴스 circle2`는 `Circle.prototype`을 찾아갈수있다. 

  ( Object.prototype이 물려준  circle1.__ proto __를 통해서 찾아갈수있다. )

- `인스턴스 circle1` 과 `인스턴스 circle2`는 `Circle 생성자 함수`을 찾아갈수있다. 

  ( `circle1.contructor` === `circle1.__ proto __ . constructor` === `Circle.prototype.constructor` )

- `Circle 생성자 함수` 는 `인스턴스 circle1` 과 `인스턴스 circle2`을 찾아갈 수 없다.

<br/>

#### 메소드 종류

인스턴스가 "new" 하면 프로토타입 과 인스턴스가 연결이 된다.

1. **인스턴스 메소드** : 인스턴스가 무조건 존재해야만 한다. `person.makjiengu()`
2. **프로토타입 메소드** : 인스턴스 무조건 필요한것은 아니나, this의 문제가 있어 인스턴스를 필요로한다.  `person.toString()`
3. **정적 메소드** : 인스턴스 과정 없이 사용할 수 있다. `Object.getPrototypeOf(person)`

<br/>

### __ proto __ 접근자 프로퍼티

> **모든 객체는 __ proto __ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 접근할 수 있다.** 

__ proto __ 는 비표준화 되어있었다.

ES6로 넘어오면서 각 브라우저에 __ proto __를 많이 사용하다보니 표준화하면서 되었지만 그전에는 비표준이었기 때문에 호환성 문제가 일어날수 있으므로 다음과 같은 메소드를 쓰라고 하였다.

`Object.getPrototypeOf(인스턴스명)` : 해당 인스턴스의 프로토타입을 반환한다.

~~~javascript
// __proto__ 는 가급적으로 사용하지 말아라.
console.log( circle.__proto__ === Circle.prototype ); // true 

// 따라서 아래 문법을 추가 해주었음.
console.log( Object.getPrototypeOf(circle) === Circle.prototype );
~~~

<br/>

### 객체 리터럴의 프로토타입

~~~javascript
const person = { name : 'Lee' };

console.log(Object.getPrototypeOf(person) === Object.prototype);
~~~

객체는 생성자 함수로 만든 것이 아니고 객체 리터럴로 만든것인데 객체리터럴은 마치 Object 생성자가 만든 것으로 볼 수 있다.

객체는 ObjectCreate가 만든다. ( 추상연산 )

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| :----------------- | :---------- | :----------------- |
| 객체 리터럴        | Object      | Object.protptype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.protptype   |

리터럴 표기법으로 생성된 객체들은 해당 생성자 함수가 만든 것이 아니다. 비슷한 동작원리로 인해 프로토타입이 해당으로 가는 것이다.

**일반 객체의 프로토타입** : Object.prototype 이다.

**배열 객체의 프로토타입** : Array.prototype 이다.

**함수 객체의 프로토타입** : Function.prototype 이다.

**모든 객체의 종점 프로토타입** : null

<br/>

### __ proto __ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

~~~javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 지정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
~~~

<img src="https://poiemaweb.com/assets/fs-images/18-8.png" style="zoom:50%;" />

접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함.

<br/>

### 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

**일반함수 , 생성자함수** : constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.

~~~javascript
// Person 호이스팅
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
~~~

<br/>**빌트인 생성자 함수** : 전역객체(window) 가 만들어질 때, 다 같이 만들어진다.

<img src="https://poiemaweb.com/assets/fs-images/18-15.png" alt="Object 생성자 함수와 프로토타입 - poiema" style="zoom:50%;" />

<br/>

### Object.create 직접 상속

` Object.create(프로토타입으로 지정할 객체명 [, 생성할 객체의 프로퍼티를 갖는 객체 ]) `

~~~javascript
// 프로토타입이 null인 객체를 생성한다.
// 즉, 생성된 객체는 프로토타입 체인의 종점이므로 프로토타입 체인이 생성되지 않는다.
// obj → null
let obj = Object.create(null);

// obj = {};와 동일하다.
// obj → Object.prototype → null
obj = Object.create(Object.prototype);

// obj → Object.prototype → null
obj = Object.create(Object.prototype, {
  x: { value: 1 }
});
// obj.x = 1; 와 동일하다.

// 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
const myProto = { x: 10 };
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
// obj = new Person('Lee')와 동일하다.
// obj → Person.prototype → Object.prototype → null
function Person(name) {
  this.name = name;
}

obj = Object.create(Person.prototype);
obj.name = 'Lee';
~~~

**여기서 주의할 것.**

- `Object.create(객체 || null [, 직접 프로퍼티 어트리뷰트 지정 혹은 객체])` 을 이용해서 객체를 생성할 경우,
  직접 프로퍼티 어트리뷰트를 지정하고 생략한다면 기본값으로 false를 반환한다.

- 반대로 객체 리터럴로 객체를 만들었다면 모든 어트리뷰트는 true를 반환한다.

![create함수](https://user-images.githubusercontent.com/31315644/67001989-de700000-f115-11e9-87af-59c959259ca0.png)

<br/>

