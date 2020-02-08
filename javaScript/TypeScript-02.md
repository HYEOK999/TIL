![Type Script](https://user-images.githubusercontent.com/31315644/73456658-9f5c7680-43b5-11ea-941a-cdf06e74b9c2.png)

--------------

# TypeScript - 02 -

## 목차

- JavaScript Class
  - [클래스 vs 생성자함수](#a1)
  - [JS 클래스는 문법적 설탕이 아닌 이유](#a2)
  - [JS 클래스의 단점](#a3)
- TypeScript 클래스
  - [JS 클래스 → TS 클래스](#a4)
  - [접근 제한자](#a5)
  - [생성자 파라미터(매개변수)에 접근 제한자 선언](#a6)
  - [readonly 키워드](#a7)
  - [추상 클래스](#a8)
    - [추상 메소드란?](#a9)
  - [TS 인터페이스](#a10)
    - [변수와 인터페이스](#a11)
    - [함수와 인터페이스](#a12)
    - [클래스와 인터페이스](#a13)
    - [선택적 프로퍼티](#a14)
  - [Type Alias](#a15)
  - [제네릭](#a16)

<br/>

------

## JavaScript Class 

>  JS 에서 객체를 만드는 방법은 객체 리터럴, Object.create 함수, 생성자 함수, 클래스가 있다. 그 중 클래스에 대해 알아보자.

### 클래스 vs 생성자함수 <a id="a1"></a>

1. 클래스는 new 연산자 없이 호출 시 에러를 발생한다.
2. 상속을 지원하는 `extends` 키워드 와 `super`키워드 제공
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작함( 마치 let, const )
4. 암묵적으로 strict모드로 실행됨(해지 불가)
5. 클래스의 메소드들은 모두 열거되지 않는다.
6. **클래스 몸체(바디)에는 메소드들만 올 수 있다.( 키워드를 붙일 수 없다. )**

<br/>

### JS 클래스는 문법적 설탕이 아닌 이유  <a id="a2"></a>

- 생성자 함수를 기반으로 한 객체 생성 방식보다 견고하면서 명료하기 때문에 새로운 객체 생성 메카니즘이다.
- 근본적인 Method가 다르다.
- ES5시절에는 메소드가 없다.  (단지, 편의를 위해 그렇게 칭했을 뿐)
- ES6 넘어오면서 메소드가 생김(일반 호출 불가, 생성자 함수로 사용할 수 없다.(new사용 불가))
- Method 생성 방법 (ES5- { `프로퍼티 키: 무명함수 리터럴(그냥 함수)` } / ES6 - { `메소드명()` } )

```js
// ES5
var o ={
	x: f 
};
var f = o.x(); // 이렇게 할 필요 없이 x();도 가능

// ES6
var o = {
	x() {} // 메소드
};
```

<br/>

### JS 클래스의 단점  <a id="a3"></a>

- **JS 클래스 몸체(바디)에는 메소드들만 올 수 있다.( 키워드를 붙일 수 없다. )**

  클래스 몸체에 클래스 프로퍼티를 선언할 수 없고 반드시 생성자 내부에서 클래스 프로퍼티를 선언하고 초기화한다.

  ```JS
  // person.js
  class Person {
    constructor(name) {
      // 클래스 프로퍼티의 선언과 초기화
      this.name = name;
    }
  
    walk() {
      console.log(`${this.name} is walking.`);
    }
  }
  ```

- **DOM과의 연동을 하기에 매우 불편하다. ( 이벤트를 사용하기가 매우 불편하다. - `this`가 꼬인다. )**

<br/>

## TypeScript 클래스  

### JS 클래스 → TS 클래스 <a id="a4"></a>

예제는 ES6에서 문제없이 실행되는 코드이지만 위 파일의 확장자를 ts로 바꾸어 Typescript 파일로 변경한 후, 컴파일하면 아래와 같이 컴파일 에러가 발생한다.

```bash
person.ts(4,10): error TS2339: Property 'name' does not exist on type 'Person'.
person.ts(8,25): error TS2339: Property 'name' does not exist on type 'Person'.
```

**Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여야 한다.**

```typescript
// person.ts
class Person {
  // 클래스 프로퍼티를 사전 선언하여야 한다
  name: string;

  constructor(name: string) {
    // 클래스 프로퍼티수에 값을 할당
    this.name = name;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const person = new Person('Lee');
person.walk(); // Lee is walking
```

<br/>

여기서 constructor가 없을 경우 초기화가 되지 않을 뿐 프로퍼티는 생성이 된다.(undefined상태)

```ts
class Foo {
  public x: string;
/*
  constructor(x: string, y: string, z: string) {
    this.x = x;
  }
*/
}
```

<br/>

### 접근 제한자  <a id="a5"></a>

기본적인 객체 지향언어는 접근 제한자 (public, private, protected)를 지원하고 있다. TypeScript 역시 접근제한자를 지원하고 있다.

단, 접근 제한자를 명시하지 않았을 때, 다른 클래스 기반 언어의 경우, 암묵적으로 protected로 지정되어 패키지 레벨로 공개되지만 Typescript의 경우, **접근 제한자를 생략한 클래스 프로퍼티와 메소드는 암묵적으로 public이 선언된다.** 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다.

| 접근 가능성      | public | protected | private |
| :--------------- | :----: | :-------: | :-----: |
| 클래스 내부      |   ◯    |     ◯     |    ◯    |
| 자식 클래스 내부 |   ◯    |     ◯     |    ✕    |
| 클래스 인스턴스  |   ◯    |     ✕     |    ✕    |

```ts
const foo = new Foo('x', 'y', 'z');

// public 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조 가능하다.
console.log(foo.x);

// protected 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.y);
// error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.

// private 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.z);
// error TS2341: Property 'z' is private and only accessible within class 'Foo'.

class Bar extends Foo {
  constructor(x: string, y: string, z: string) {
    super(x, y, z);

    // public 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
    console.log(this.x);

    // protected 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
    console.log(this.y);

    // private 접근 제한자는 자식 클래스 내부에서 참조할 수 없다.
    console.log(this.z);
    // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
  }
}
```

<br/>

### 생성자 파라미터(매개변수)에 접근 제한자 선언 <a id="a6"></a>

> **접근 제한자가 사용된 생성자 파라미터(매개변수)는 암묵적으로 클래스 프로퍼티로 선언되고 생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.**

```ts
// 기존 TS 정의
class Foo {
  public x: string;

  constructor(x: string, y: string, z: string) {
    this.x = x;
  }
}

// 다음과 같이 축약 가능
class Foo {
  /*
  접근 제한자가 선언된 생성자 파라미터(매개변수) x는 클래스 프로퍼티로 선언되고 지동으로 초기화된다.
  public이 선언되었으므로 x는 클래스 외부에서도 참조가 가능하다.
  */
  constructor(public x: string) { }
}
```

<br/>

만일 매개변수에 접근 제한자를 선언하지 않으면 매개변수는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

즉, 전혀 다른 문법이라는 이야기.

```typescript
class Foo {
  // x는 생성자 내부에서만 유효한 지역 변수이다.
  constructor(x: string) {
    console.log(x);
  }
}

const foo = new Foo('Hello');
console.log(foo); // Foo {}
```

<br/>

### readonly 키워드 <a id="a7"></a>

- 자바스크립트에선 사용 불가능.
- 읽기만 가능한 상태가 되므로 상수 선언에 사용한다.
- 인스턴스 프로퍼티 임. (프로토타입 프로퍼티 X 클래스 프로퍼티 X)

```
class Foo {
  private readonly MAX_LEN: number = 5;
  private readonly MSG: string;
```

<br/>

### 추상 클래스 <a id="a8"></a>

> 1개 이상의 추상 메소드 와 일반 메소드를 포함한 클래스
>
> JS 내부와 거의 유사하다.
>
> 대규모 프로젝트를 위한 문법.

#### 추상 메소드란 ?  <a id="a9"></a>

- 내용이 없고 메소드 이름과 타입만이 선언된 메소드.
- `abstract`키워드를 사용한다.
- 직접 인스턴스를 생성할 수 없고 상속만을 위해 사용된다.
- 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다.

```ts
abstract class Animal {
  // 추상 메소드
  abstract makeSound(): void;
  // 일반 메소드
  move(): void {
    console.log('roaming the earth...');
  }
}

// 직접 인스턴스를 생성할 수 없다.
// new Animal();
// error TS2511: Cannot create an instance of the abstract class 'Animal'.

class Dog extends Animal {
  // 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다
  makeSound() {
    console.log('bowwow~~');
  }
}

const myDog = new Dog();
myDog.makeSound();
myDog.move();
```

<br/>

### TS 인터페이스 <a id="a10"></a>

- 일반적으로 **타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용**
- 인터페이스는 인터페이스를 상속할 수 있음
- 인터페이스에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 일관성을 유지할 수 있도록 하는 것.
- 직접 인스턴스를 생성할 수 없고 모든 메소드는 추상 메소드.
- `abstract` 키워드를 사용하지 않는다.

<br/>

#### 변수와 인터페이스 <a id="11"></a>

> 인터페이스는 변수의 타입으로 사용할 수 있다. 

인터페이스를 타입으로 선언한 변수는 해당 인터페이스를 준수하여야 한다. 이것은 새로운 타입을 정의하는 것과 유사하다.

```ts
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수 todo의 타입으로 Todo 인터페이스를 선언하였다.
let todo: Todo;

// 변수 todo는 Todo 인터페이스를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false };
```

<br/>

#### 함수와 인터페이스 <a id="a12"></a>

> 인터페이스는 함수의 타입으로 사용할 수 있다. 

함수의 인터페이스에는 타입이 선언된 파라미터 리스트와 리턴 타입을 정의한다. 함수 인테페이스를 구현하는 함수는 인터페이스를 준수하여야 한다.

```typescript
// 함수 인터페이스의 정의
interface SquareFunc {
  (num: number): number;
}

// 함수 인테페이스를 구현하는 함수는 인터페이스를 준수하여야 한다.
const squareFunc: SquareFunc = function (num: number) {
  return num * num;
}

console.log(squareFunc(10)); // 100
```

<br/>

#### 클래스와 인터페이스 <a id="a13"></a>

- 클래스 선언문의 `implements` 키워드 뒤에 인터페이스를 선언하면 해당 클래스는 지정된 인터페이스를 반드시 구현하여야 한다.
- 인터페이스를 구현하는 클래스의 일관성을 유지할 수 있는 장점을 갖는다. 
- 인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수는 없다.

```typescript
// 인터페이스의 정의
interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

// Todo 클래스는 ITodo 인터페이스를 구현하여야 한다.
class Todo implements ITodo {
  constructor (
    public id: number,
    public content: string,
    public completed: boolean
  ) { }
}

const todo = new Todo(1, 'Typescript', false);

console.log(todo);
```

인터페이스는 프로퍼티뿐만 아니라 메소드도 포함할 수 있다. 
단, 모든 메소드는 추상 메소드이어야 한다. 
인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.

```typescript
// 인터페이스의 정의
interface IPerson {
  name: string;
  sayHello(): void;
}

/*
인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.
*/
class Person implements IPerson {
  // 인터페이스에서 정의한 프로퍼티의 구현
  constructor(public name: string) {}

  // 인터페이스에서 정의한 추상 메소드의 구현
  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

<br/>

#### 선택적 프로퍼티 <a id="a14"></a>

인터페이스의 프로퍼티는 반드시 구현되어야 한다. 하지만 인터페이스의 프로퍼티가 선택적으로 필요한 경우가 있을 수 있다. 선택적 프로퍼티(Optional Property)는 프로퍼티명 뒤에 `?`를 붙이며 생략하여도 에러가 발생하지 않는다.

```typescript
interface UserInfo {
  username: string;
  password: string;
  age?    : number;
  address?: string;
}

const userInfo: UserInfo = {
  username: 'ungmo2@gmail.com',
  password: '123456'
}

console.log(userInfo);
```

이렇게 선택적 프로퍼티를 사용하면 사용 가능한 프로퍼티를 파악할 수 있어서 코드를 이해하기 쉬워진다.

<br/>

### Type Alias <a id="a15"></a>

타입 앨리어스는 새로운 타입을 정의한다. 타입으로 사용할 수 있다는 점에서 타입 앨리어스는 인터페이스와 유사하다.

하지만 다음과 같은 차이점이 존재한다.

1. 인터페이스는 `extends` 또는 `implements`될 수 있지만 타입 앨리어스는 `extends` 또는 `implements`될 수 없다.
2. 상속을 통해 확장이 필요하다면 타입 앨리어스보다는 인터페이스가 유리하지만 인터페이스로 표현할 수 없거나 유니온 또는 튜플을 사용해야한다면 타입 앨리어스를 사용하는 것이 좋다.

```ts
// 문자열 리터럴로 타입 지정
type Str = 'Lee';

// 유니온 타입으로 타입 지정
type Union = string | null;

// 문자열 유니온 타입으로 타입 지정
type Name = 'Lee' | 'Kim';

// 숫자 리터럴 유니온 타입으로 타입 지정
type Num = 1 | 2 | 3 | 4 | 5;

// 객체 리터럴 유니온 타입으로 타입 지정
type Obj = {a: 1} | {b: 2};

// 함수 유니온 타입으로 타입 지정
type Func = (() => string) | (() => void);

// 인터페이스 유니온 타입으로 타입 지정
type Shape = Square | Rectangle | Circle;

// 튜플로 타입 지정
type Tuple = [string, boolean];
const t: Tuple = ['', '']; // Error
const t2: Tuple = ['', true]; // Ok
```

튜플은 리액트의 useState에 사용할 수 있다. ( `type Tuple = [any, function];` )

<br/>

### 제네릭 <a id="a16"></a>

```ts
class Queue {
  protected data = []; // data: any[]

  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.shift();
  }
}

const queue = new Queue();

queue.push(0);
queue.push('1'); // 의도하지 않은 실수!

console.log(queue.pop().toFixed()); // 0
console.log(queue.pop().toFixed()); // Runtime error
```

위와 같이 구현했다고 가정하자.

`any[]` 타입은 배열 요소의 타입이 모두 같지 않다는 문제를 가지게 된다. 
위 예제의 경우 data 프로퍼티는 number 타입만을 포함하는 배열이라는 기대 하에 각 요소에 대해 [Number.prototype.toFixed](https://poiemaweb.com/js-number#36-numberprototypetofixed)를 사용하였다. 
따라서 number 타입이 아닌 요소의 경우 런타임 에러가 발생한다.

여기서 문제 해결을 위해 만약 `item`에 타입 한가지를 줘버리면 범용성을 잃게된다. 

그래서 상속을 받아 새로운 클래스를 만들 수 있다.

```ts
// Queue 클래스를 상속하여 number 타입 전용 NumberQueue 클래스를 정의
class NumberQueue extends Queue {
  // number 타입의 요소만을 push한다.
  push(item: number) {
    super.push(item);
  }

  pop(): number {
    return super.pop();
  }
}

const queue = new NumberQueue();

queue.push(0);
// 의도하지 않은 실수를 사전 검출 가능
// [ts] Argument of type '"1"' is not assignable to parameter of type 'number'.
// queue.push('1');
queue.push(+'1'); // 실수를 사전 인지하고 수정할 수 있다

console.log(queue.pop().toFixed()); // 0
console.log(queue.pop().toFixed()); // 1
```

- `constructor`가 없고 `setter`가 오직 `push`,` pop`은 `getter`

하지만 `string[]`도 만들고, 다양한 타입의 배열이 추가된다면 너무 많은 클래스가 생겨날 것이다. 

**따라서 제네릭을 이용한다.**

```ts
class Queue<T> {
  protected data: Array<T> = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T {
    return this.data.shift();
  }
}

// number 전용 Queue
const numberQueue = new Queue<number>();

numberQueue.push(0);
// numberQueue.push('1'); // 의도하지 않은 실수를 사전 검출 가능
numberQueue.push(+'1');   // 실수를 사전 인지하고 수정할 수 있다

console.log(numberQueue.pop().toFixed()); // 0
console.log(numberQueue.pop().toFixed()); // 1

// string 전용 Queue
const stringQueue = new Queue<string>();

stringQueue.push('Hello');
stringQueue.push('World');

console.log(stringQueue.pop().toUpperCase()); // HELLO
console.log(stringQueue.pop().toUpperCase()); // WORLD

// 커스텀 객체 전용 Queue
const myQueue = new Queue<{name: string, age: number}>();
myQueue.push({name: 'Lee', age: 10});
myQueue.push({name: 'Kim', age: 20});

console.log(myQueue.pop()); // { name: 'Lee', age: 10 }
console.log(myQueue.pop()); // { name: 'Kim', age: 20 }
```

- **제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법. ** (외부의 값에 따라 결정됨)
- **한 번의 선언으로 다양한 타입에 재사용이 가능하다는 장점.**
- **T는 제네릭을 선언할 때 관용적으로 사용되는 식별자로 타입 파라미터(Type parameter).** 
- T는 Type의 약자로 반드시 T를 사용하여야 하는 것은 아니다.

<br/>

함수에서도 제네릭을 이용할 수 있다.

```
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}
```

- reverse 옆의 `<T>`는 문법, 클래스도 식별자 옆에 써준다.
- reverse 함수는 인수의 타입에 의해 타입 매개변수가 결정된다. 

<br/>

reverse 함수는 다양한 타입의 요소로 구성된 배열을 인자로 전달받는다. 예를 들어 number 타입의 요소를 갖는 배열을 전달받으면 타입 매개변수는 number가 된다.

```ts
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

const arg = [1, 2, 3, 4, 5];
// 인수에 의해 타입 매개변수가 결정된다.
const reversed = reverse(arg);
console.log(reversed); // [ 5, 4, 3, 2, 1 ]
```

만약 {name: string} 타입의 요소를 갖는 배열을 전달받으면 타입 매개변수는 {name: string}가 된다.

```typescript
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

const arg = [{ name: 'Lee' }, { name: 'Kim' }];
// 인수에 의해 타입 매개변수가 결정된다.
const reversed = reverse(arg);
console.log(reversed); // [ { name: 'Kim' }, { name: 'Lee' } ]
```