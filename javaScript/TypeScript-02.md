![Type Script](https://user-images.githubusercontent.com/31315644/73456658-9f5c7680-43b5-11ea-941a-cdf06e74b9c2.png)

--------------

# TypeScript - 01 -

## 목차

- [동적 타입 언어 vs 정적 타입 언어](#a1)
- [자바스크립트의 특징](#a2)
  - [자바스크립트의 배열](#a3)
- [타입스크립트](#a4)
- [타입스크립트 설치](#a5)
- [타입스크립트 타입](#a6)
- [타입 추론](#a7)

<br/>

-----

### 동적 타입 언어 vs 정적 타입 언어 <a id="a1"></a>

JavaScript는 동적 타입 언어이다. 변수에는 타입이 없고 값이 할당되면 타입 추론으로 타입이 정해진다.

재할당이 가능한 경우, 재할당하면 타입 추론을 다시 하게 됨

```js
var x; // 타입이 없다.
x = 1; // 숫자 타입.
var y = 'abc' // 문자열 타입.
var z = 5; // 숫자 타입.
z = 'abcd' // 문자열타입으로 변경됨.
```

정적인 언어에서는 위와 같이 동적으로 타입이 결정되지 않는다. 

**정적 타입 언어에서 타입을 정해주는 이유는 메모리에 값을 집어넣기 위해 얼마만큼의 공간이 필요한가를 알기 위함이다.**

아래의 경우는 Java에서 변수를 선언할 때 예이다.

```java
int a = 5;
String b = 'abc';
```

| 타입   | Java    | JS                                        |
| ------ | ------- | ----------------------------------------- |
| int    | 4바이트 | x (부동소수점 8바이트로 대체)             |
| float  | 4바이트 | 8바이트 부동소수점(정수 없음)             |
| double | 8바이트 | 8바이트 부동소수점(정수 없음)             |
| char   | 2바이트 | x (String타입이 대신 존재한다. - 2바이트) |

- 자바스크립트의 숫자타입은 정수가 없다.
- 자바스크립트에서 문자열을 원시값이라고 배웠지만, 실제로 문자열은 원시값이 아니라 한 개 이상의 문자로 이루어진 배열이다.
- char형은 본래 1바이트이지만 한글등 여러 나라 언어를 표기하는 문제로 인해 유니코드를 사용한다.(2바이트)
- 이모지 2~4 바이트
- 현대 자바스크립트는 애플리케이션 개발 언어가 되었다.
- 자바스크립트는 암묵적 처리가 많아 대규모 작업시 오히려 이해하기가 어려워졌다.

<br/>

### 자바스크립트의 특징 <a id="a2"></a>

- [Prototype-based Object Oriented Language](https://poiemaweb.com/js-prototype)
- [Scope](https://poiemaweb.com/js-scope)와 [this](https://poiemaweb.com/js-this)
- [동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어](https://poiemaweb.com/js-data-type-variable)

#### 자바스크립트의 배열  <a id="a3"></a>

>  배열을 getOwnPropertyDescriptor로 확인할 경우 객체임을 확인할 수있다.(유사배열)

- 원론적인 의미의 배열과 자바스크립트의 배열은 다르다,
- 원론적으로 요소의 타입이 통일되어 있어야 한다,(메모리 공간이 연속되어 있도록-접근이 빠르다)
- 자바스크립트에서는 단지 프로퍼티의 value이므로 [100, 'apple', true]와 같이 모든 값이 올 수 있다.(엄밀히 말하면 배열이 아니다.)

<br/>

### 타입스크립트  <a id="a4"></a>

> JS는 대규모 프로젝트에서 코드가 복잡해질 수 있고 디버그와 테스트 공수가 증가하는 등의 문제를 일으킬 수 있다.

1. **타입스크립트 = 자바스크립트의 Superset(상위확장)**

   - TypeScript 또한 자바스크립트 대체 언어의 하나로써 **자바스크립트(ES5)의 Superset(상위확장)**

   - ES6(ECMAScript 2015)의 클래스, 모듈 등과 ES7의 Decorator 등을 지원한다.

   - [Babel](https://babeljs.io/)과 같은 별도 트랜스파일러(Transpiler)를 사용하지 않아도 ES6의 새로운 기능을 기존의 자바스크립트 엔진(현재의 브라우저 또는 Node.js)에서 실행할 수 있다.

   - **모든 기존 코드를 호환한다.(단, 클래스는 타입스크립트 문법을 따라야 한다.)**

     ````ts
     // 클래스는 TS문법을 따라야한다.
     class Person {
       name: string;
       constructor(name: string) {
         this.name = name;
       }
     }
     ````

2. **에디터와의 호환성**

   - JS에 경우 값을 할당하고나서 타입 추론으로 에디터를 통해 코드 어시스트를 받지만, 정적 타입은 변수 선언부터 에디터의 코드 어시스트, 타입 체크, 리펙토링 을 받을 수 있다.
   
3. **강력한 객체지향 프로그래밍 지원**

   - 대규포 프로젝트에서 자주 사용되는 객체 프로그래밍을 지원받을 수 있다.
   - 인터페이스
   - 제네릭

<br/>

### 타입스크립트 설치  <a id="a5"></a>

1. npm 전역 설치

   ```bash
   $ npm install -g typescript
   ```

2. 버전확인

   ```bash
   $ tsc -v
   ```

3. 타입스크립트 컴파일

   파일명.ts -> 파일명.js로 분리함.

   ```bash
   $ tsc 파일명
   ```

4. config 설정

   - `config`파일 생성 (`tsconfig.json`)

   ```bash
   $ tsc --init
   ```

   - "target" : "es5" (컴파일 할 버전)
   - "module" : "commonjs"
   - config 설정 완료 후 `tsc`만 입력해도 컴파일이 됨. (모든 ts파일 자동 컴파일)
   - `tsc 파일명` 작성 시 `tsconfig.json` 설정 무시하고 해당 명령어 우선 실행

5. 코드 저장 시 자동 `tsc` 명령 설정 ( `tsconfig.json` 있어야함. )

   ```bash
   $ tsc -w
   ```

<br/>

### 타입스크립트 타입  <a id="a6"></a>

1. `any[]` : 배열 내부에 어떤 값이 와도 된다. (`number[]` -> 배열 내부에 숫자타입만 허용된다.)

2. `tuple` : 만드는 배열의 요소 개수를 정하고, 요소의 타입을 fix한다.

3. `enum` : [키 : 값] 형태에서 키는 값의 이름으로서 중요성을 나타내지만 `enum`은 키의 이름 자체에 의미를 두는것.

   대표적인 예로 조이스틱의 UP, DOWN, LEFT, RIGHT 등이 있다.

4. `never`: 함수에 리턴 값이 없을 때 사용. (생략 가능)

5. 특정 객체 타입을 지정해줄 때는 앞글자를 대문자로 한다. (Date, String 등등)

   ```ts
   let objectStr: String;
   objectStr = 'hello'; // OK
   objectStr = new String('hello'); // OK
   ```

   <br/>

TypeScript는 ES5, ES6의 Superset(상위확장)이므로 [자바스크립트의 타입](https://poiemaweb.com/js-data-type-variable#1-데이터-타입)을 그대로 사용할 수 있다. 

자바스크립트의 타입 이외에도 TypeScript 고유의 타입이 추가로 제공된다.

| Type      |  JS  |  TS  | Description                                                  |
| :-------- | :--: | :--: | :----------------------------------------------------------- |
| boolean   |  ◯   |  ◯   | true와 false                                                 |
| null      |  ◯   |  ◯   | 값이 없다는 것을 명시                                        |
| undefined |  ◯   |  ◯   | 값을 할당하지 않은 변수의 초기값                             |
| number    |  ◯   |  ◯   | 숫자(정수와 실수, Infinity, NaN)                             |
| string    |  ◯   |  ◯   | 문자열                                                       |
| symbol    |  ◯   |  ◯   | 고유하고 수정 불가능한 데이터 타입이며 주로 객체 프로퍼티들의 식별자로 사용(ES6에서 추가) |
| object    |  ◯   |  ◯   | 객체형(참조형)                                               |
| array     |      |  ◯   | 배열                                                         |
| tuple     |      |  ◯   | 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현          |
| enum      |      |  ◯   | 열거형. 숫자값 집합에 이름을 지정한 것이다.                  |
| any       |      |  ◯   | 타입 추론(type inference)할 수 없거나 타입 체크가 필요없는 변수에 사용. var 키워드로 선언한 변수와 같이 어떤 타입의 값이라도 할당 가능. |
| void      |      |  ◯   | 일반적으로 함수에서 반환값이 없을 경우 사용한다.             |
| never     |      |  ◯   | 결코 발생하지 않는 값                                        |

다양한 타입을 사전 선언하는 방법.

```typescript
// boolean
let isDone: boolean = false;

// null
let n: null = null;

// undefined
let u: undefined = undefined;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = "blue";
color = 'red';
let myName: string = `Lee`; // ES6 템플릿 문자열
let greeting: string = `Hello, my name is ${ myName }.`; // ES6 템플릿 대입문

// object
const obj: object = {};

// array
let list1: any[] = [1, 'two', true];
let list2: number[] = [1, 2, 3];
let list3: Array<number> = [1, 2, 3]; // 제네릭 배열 타입

// tuple : 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
let tuple: [string, number];
tuple = ['hello', 10]; // OK
tuple = [10, 'hello']; // Error
tuple = ['hello', 10, 'world', 100]; // Error
tuple.push(true); // Error

// enum : 열거형은 숫자값 집합에 이름을 지정한 것이다.
enum Color1 {Red, Green, Blue};
let c1: Color1 = Color1.Green;

console.log(c1); // 1

enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;

console.log(c2); // 2

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Blue;

console.log(c3); // 4

/*
any: 타입 추론(type inference)할 수 없거나 타입 체크가 필요 없는 변수에 사용한다.
var 키워드로 선언한 변수와 같이 어떤 타입의 값이라도 할당할 수 있다.
*/
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean

// void : 일반적으로 함수에서 반환값이 없을 경우 사용한다.
function warnUser(): void {
  console.log("This is my warning message");
}

// never : 결코 발생하지 않는 값
function infiniteLoop(): never {
  while (true) {}
}

function error(message: string): never {
  throw new Error(message);
}
```

<br/>

### 타입 추론  <a id="a7"></a>

만약 타입 선언을 생략하면 값이 할당되는 과정에서 동적으로 타입이 결정된다. 

```typescript
let foo = 123; // foo는 number 타입
```

위 코드를 보면 변수 foo에 타입을 선언하지 않았으나 타입 추론에 의해 변수의 타입이 결정되었다. 동적 타입 언어는 타입 추론에 의해 변수의 타입이 결정된 후에도 같은 변수에 여러 타입의 값을 교차하여 할당할 수 있다. 

하지만 정적 타입 언어는 타입이 결정된 후에는 타입을 변경할 수 없다. 

TypeScript는 정적 타입 언어이므로 타입 추론으로 타입이 결정된 이후, 다른 타입의 값을 할당하면 에러가 발생한다.

```typescript
let foo = 123; // foo는 number 타입
foo = 'hi';    // error: Type '"hi"' is not assignable to type 'number'.
```

<br/>