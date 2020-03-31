![React with TypeScript](https://user-images.githubusercontent.com/31315644/77824045-edd28b00-7142-11ea-83d8-b88e7cb6c97d.png)

------------

# 타입스크립트 기초 연습하기 (셋팅, 기본 타입, 함수타입, 인터페이스)

## 목차

- [셋팅](#a1)
  - [tsconfing.json](#a2)
- [타입스크립트 파일 만들기 및 컴파일](#a3)
  - [src/practice.ts](#a4)
  - [npx tsc](#a5)
- [기본 타입](#a6)
  - [부울 (Boolean)](#a7)
  - [숫자형 (Number)](#a8)
  - [문자열 (String)](#a9)
  - [배열 (Array)](#a10)
  - [튜플 (Tuple)](#a11)
  - [열거 (Enum)](#a12)
  - [Any](#a13)
  - [Void](#a14)
  - [Null 과 Undefined](#a15)
  - [Never](#a16)
  - [타입 단언](#a17)
- [함수에서 타입 정의하기](#a18)
- [interface 사용해보기](#a19)
  - [클래스에서 interface 를 implements 하기](#a20)
  - [일반 객체를 interface 로 타입 설정하기](#a21)

<br/>

----------

### 셋팅  <a id="a1"></a>

1. `npm install -g typescript` : 전역에 설치 (이미 설치되어 있다면 건너띄기)
2. `tsc --init` : `tsconfig.json`파일을 생성

<br/>

#### tsconfing.json  <a id="a2"></a>

- **target**: **컴파일된 코드가 어떤 환경에서 실행될 지 정의.** 예를들어서 화살표 함수를 사용하고 target 을 es5 로 한다면 일반 function 키워드를 사용하는 함수로 변환을 해준다. 하지만 이를 es6 로 설정한다면 화살표 함수를 그대로 유지해준다.
- **module**: **컴파일된 코드가 어던 모듈 시스템을 사용할지 정의.** 예를 들어서 이 값을 common 으로 하면 `export default Sample` 을 하게 됐을 때 컴파일 된 코드에서는 `exports.default = helloWorld` 로 변환해주지만 이 값을 es2015 로 하면 `export default Sample` 을 그대로 유지하게 된다.
- **strict**: **모든 타입 체킹 옵션을 활성화한다는 것을 의미.**
- **esModuleInterop**: **commonjs 모듈 형태로 이루어진 파일을 es2015 모듈 형태로 불러올 수 있게 해준다.**
- **outDir**: 컴파일된 파일들이 저장되는 경로를 지정 할 수 있다. 예를 들어서 이 값을 `"./dist"`라고 을 경우, 컴파일된 파일들은 `./dist` 폴더에 저장된다. 

<br/>

### 타입스크립트 파일 만들기 및 컴파일  <a id="a3"></a>

프로젝트에 src 디렉터리를 만들고 그 안에 practice.ts 파일을 작성.

<br/>

#### src/practice.ts  <a id="a4"></a>

```typescript
const message: string = 'hello world';
console.log(message);
```

여기서 `message` 옆의 `string`이 타입을 의미.

저런식으로 `string`으로 지정하였는데 만약 문자열외의 값을 대입할 경우 에디터 상에서 오류를 나타나게 함.

<br/>

#### npx tsc  <a id="a5"></a>

위와 같이 작성 후 `npx tsc` 를 터미널에 입력 시 컴파일 된다.

컴파일 후 `dist/practice.js` 라는 파일이 생성되고 내부에는 다음과 같은 코드가 작성되어 있다.

```jsx
"use strict";
var message = 'hello world';
console.log(message);
```

<br/>

### 기본 타입  <a id="a6"></a>

- [부울 (Boolean)](#a7)
- [숫자형 (Number)](#a8)
- [문자열 (String)](#a9)
- [배열 (Array)](#a10)
- [튜플 (Tuple)](#a11)
- [열거 (Enum)](#a12)
- [Any](#a13)
- [Void](#a14)
- [Null 과 Undefined](#a15)
- [Never](#a16)
- [타입 단언](#a17)

<br/>

#### 부울 (Boolean)  <a id="a7"></a>

>  `true` / `false`

```jsx
let isDone: boolean = false;
```

<br/>

#### 숫자형 (Number)  <a id="a8"></a>

> JavaScript와 마찬가지로 TypeScript의 모든 숫자는 부동 소수 점 값
> TypeScript는 10진수 및 16진수와 함께 ECMAScript2015에 도입된 2진수 및 8진수 문자를 지원

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

<br/>

#### 문자열 (String)  <a id="a9"></a>

> JavaScript와 마찬가지로 TypeScript 또한 문자열 데이터를 감싸기 위해 큰 따옴표(`"`) 또는 작은 따옴표(`'`)를 사용
>
> 백틱 / 백 쿼트 (`` `) 문자로 감싸져 있고 표현식은 `${ 표현식 }` 형식인 *템플릿 문자열* 또한 사용 가능

```jsx
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let sentence: string = `Hello, my name is ${ fullName }.`
```

<br/>

#### 배열 (Array)  <a id="a10"></a>

> 배열의 타입은 두 가지 방법 중 하나로 작성 가능
>
> 1.  `[]` 을 이용한 배열 타입
> 2. 제네릭 배열 타입

```js
let list: number[] = [1, 2, 3]; 			// []을 이용한 배열 타입
let list: Array<number> = [1, 2, 3]; 	// 제네릭 배열 타입
```

<br/>

#### 튜플 (Tuple)  <a id="a11"></a>

> 고정된 갯수의 배열을 사용할 때 이용.
> 또한 배열 내부의 타입들이 서로 다를 경우 표현할 수 있다.

```js
// 2개의 원소를 가지는 배열 - 튜플 타입 선언
let x: [string, number];
// 초기화
x = ["hello", 10]; // 가능
// 부정확한 초기화
x = [10, "hello"]; // 오류
```

<br/>

인덱스를 넘어서 추가로 설정할 수 있으나 앞서 설정한 타입을 제외하고 다른 타입은 전부 에러처리난다.

```js
let x : [string, number];

x[2] = 3 //OK
x[2] = 'a' //OK
x[2] = true //ERROR : 앞서 x는 string, number만 해놨기 때문
```

<br/>

#### 열거 (Enum)  <a id="a12"></a>

> enum은 numeric 값 집합에 더 친숙한 이름을 부여하는 방법

```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

<br/>

기본적으로 enums는 `0`부터 시작하는 자신의 멤버 번호를 매기기를 시작
멤버 중 하나의 값을 수동으로 설정하여 이를 변경할 수 있다.
예를 들어 이전 예제를 `0` 대신 `1`로 시작할 수 있다.

```js
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

// 또는 열거 형의 모든 값을 수동으로 설정합니다:

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

<br/>

enum의 편리한 기능은 숫자 값에서 enum의 해당 값 이름으로 이동할 수 있다는 것.

```jsx
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName); // 위의 값이 2 이므로 'Green'을 표시.
```

<br/>

#### Any  <a id="a13"></a>

> 변수의 타입을 지정할 때 알지 못할 타입을 지정할 경우 사용.

```js
let notSure: any = 4;
notSure = "문자열일수도 있다";
notSure = false;

let list: any[] = [1, true, "free"];
```

<br/>

#### Void  <a id="a14"></a>

> 일반적으로 반환 값을 반환하지 않는 함수의 반환 타입
> `void`타입의 변수는  `undefined` 또는 `null` 만 할당할 수 있다.

```jsx
function warnUser(): void {
    alert("This is my warning message");
}
```

<br/>

#### Null 과 Undefined  <a id="a15"></a>

> TypeScript에서는 `undefined`와 `null`이라는 자체적인 타입을 가짐.
> 기본적으로 `null`과 `undefined`는 다른 모든 타입의 서브 타입임.

```jsx
// 그 외에도 이러한 변수에 할당할 수 있다!
let u: undefined = undefined;
let n: null = null;
```

<br/>

#### Never  <a id="a16"></a>

> `never` 타입은 절대로 발생하지 않는 값의 타입을 나타냄.
>
> 주로, exception과 같이 throw되는 함수에 주로 사용됨.
>
>  never에는 undefined, null, any조차 할당이 불가능.

```jsx
// 반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안 된다.
function error(message: string): never {
    throw new Error(message);
}
```

<br/>

#### 타입 단언 (Type assertions)  <a id="a17"></a>

> 컴파일러에게 개발자가 특정 변수의 타입이 무엇인지 알고 있다고 얘기하는 것.
>
> 이는, 컴파일러에서만 사용되며 런타임에는 영향을 주지 않는다.

```js
let someValue : any = "this is a string";

let strLength : number = someValue.length; // compile error 가 뜬다. 어떤 타입인지 모르는데 length를 썼기 때문이다.
```

처음에 선언한 someValue는 any로 컴파일 되는데 밑에서 someValue는 length field를 사용하였다. 컴파일러는 someValue가 length field가 있는지 없는지 알 수 없기 때문에 컴파일 에러가 뜬다. 비록 any에 string 값이 들어갔더라도 말이다.

하지만 사용자가 타입을 직접 캐스팅 할경우 컴파일러는 해당 변수를 string으로 본다.

```jsx
let someValue : any = 'This is a string'

let strLength : number = (<string>someValue).length //error가 나지 않는다.

//또는 (someValue as string).length로 사용도 가능하다.
//as를 사용하기를 추천한다. jsx에서는 제네릭이 안된다고 한다.
```

컴파일러는 someValue를 string으로 보고 someValue가 실제 무엇이 있는지는 확인하지 않는다는 점에 주목해야 한다.

즉, 타입의 변경에 대한 책임은 오로지 사용자에게 있으며 컴파일러는 someValue의 값에 무엇이 들어있는지는 확인하지 않고 오로지 someValue 가 string이라 판단하고 length field가 있다고 판단한다.

해당 변수가 무엇인지 확신할 수 있을 때 타입을 캐스팅해야한다. 컴파일러는 알수 없을테니 말이다.

**참고 : number를 string으로는 캐스팅 할 수 없다.**

<br/>

### 함수에서 타입 정의하기  <a id="a18"></a>

> 함수에서는 총 2개의 타입을 지정해야 한다.
>
> 1. 파라미터 타입
> 2. 반환 타입

타입스크립트를 사용하면 다음과 같이 코드를 작성하는 과정에서 함수의 파라미터로 어떤 타입을 넣어야 하는지 바로 알 수 있다.

```typescript
// 일반 함수
// let sum: (x: number, y: number) => number =
function sum(x: number, y: number): number {
  return x + y;
}

let sum = (x : number, y:number) : number => {
  return x + y;
}

sum(1, 2);

// 익명함수
let myAdd = function(x: number, y: number): number { return x + y; };
```

참고로 함수에서 만약 아무것도 반환하지 않아야 한다면 이를 반환 타입을 `void` 로 설정하면 된다.

```typescript
function returnNothing(): void {
  console.log('I am just saying hello world');
}
```

<br/>

### interface 사용해보기  <a id="a19"></a>

> `interface`는 클래스 또는 객체를 위한 타입을 지정 할 때 사용되는 문법

<br/>

#### 클래스에서 interface 를 implements 하기  <a id="a20"></a>

 클래스를 만들 때, 특정 조건을 준수해야 함을 명시하고 싶을 때 `interface` 를 사용하여 클래스가 가지고 있어야 할 요구사항을 설정.

 클래스를 선언 할 때 `implements` 키워드를 사용하여 해당 클래스가 특정 `interace`의 요구사항을 구현한다는 것을 명시한다.

**src/practice.ts**

```typescript
// Shape 라는 interface 를 선언
interface Shape {
  getArea(): number; // Shape interface 에는 getArea 라는 함수가 꼭 있어야 하며 해당 함수의 반환값은 숫자.
}

class Circle implements Shape {
  // `implements` 키워드를 사용하여 해당 클래스가 Shape interface 의 조건을 충족하겠다는 것을 명시.

  radius: number; // 멤버 변수 radius 값을 설정.
  // constructor(public radius: number) {
  constructor(radius: number) {
    this.radius = radius;
  }

  // 너비를 가져오는 함수를 구현.
  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

class Rectangle implements Shape {
  width: number;
  height: number;
  // constructor(private width: number, private height: number) {
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)];

shapes.forEach(shape => {
  console.log(shape.getArea());
});
```

여기서 주의깊게 봐야할 것은 

`constructor` 의 파라미터 쪽에 `public` 또는 `private` [accessor](https://www.typescriptlang.org/docs/handbook/classes.html#accessors) 를 사용하면 직접 하나하나 설정해주는 작업을 생략할 수 있다.

`public` accessor 는 특정 값이 클래스의 코드 밖에서도 조회 가능하다는 것을 의미한다.

`private` accessor는 클래스의 코드 밖에서 해당 값을 조회할 수 없음을 의미한다.

<br/>

#### 일반 객체를 interface 로 타입 설정하기  <a id="a21"></a>

> 일반 객체를 interface 를 사용하여 타입을 지정하는 방법.

```typescript
interface Person {
  name: string;
  age?: number; // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미.
}
interface Developer {
  name: string;
  age?: number;
  skills: string[];
}

const person: Person = {
  name: '김사람',
  age: 20
};

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react']
};
```

지금 보면 Person 과 Developer 가 형태가 유사하다. 이럴 땐 `interface` 를 선언 할 때 다른 `interface` 를 `extends` 해서 상속받을 수 있다.

**src/practice.ts**

```typescript
interface Person {
  name: string;
  age?: number; // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미.
}
interface Developer extends Person {
  skills: string[];
}

const person: Person = {
  name: '김사람',
  age: 20
};

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react']
};

const people: Person[] = [person, expert];
```

<br/>

-----------

### Reference

- [velopert.log : 타입스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)
- [GitBook : 기본 타입](https://typescript-kr.github.io/pages/Basic%20Types.html)