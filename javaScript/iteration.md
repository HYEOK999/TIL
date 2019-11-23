![symbol](https://user-images.githubusercontent.com/31315644/69250382-e6c6c980-0bf2-11ea-96a6-9fb892b82bf7.jpg)

## JavaScript Symbol

- Symbol

  - Symbol.for 메소드

  - Symbol의 쓰임

    1. 프로퍼티 키

    2. 프로퍼티 은닉
    3. 표준 빌트인 객체 확장 이용

  - Well known Symbol

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- Symbol

- Symbol.for

  <br/>

---------

## Symbol

원시값을 만드는 방법은 리터럴이 있다.

근데 Symbol로도 원시값을 만들어낼 수 있는데 이 때 Symbol함수로 호출해야만 한다.

> 생성된  Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값이다.

~~~javascript
// 심볼 mySymbol은 이름의 충돌 위험이 없는 유일한 프로퍼티 키
let mySymbol = Symbol();

console.log(mySymbol);        // Symbol()
console.log(typeof mySymbol); // symbol

new Symbol(); // TypeError: Symbol is not a constructor
~~~

Symbol 함수는 래퍼 객체를 생성하는 생성자 함수(String, Number, Boolean 등등)과는 달리 `new`연산자를 이용하지 않는다.

<br/>

Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다. 

**이 문자열은 심볼 값에 대한 설명으로 디버깅용도로만 이용된다.** 

심볼 값에 대한 설명이 같더라도 생성된 심볼 값은 유일무이한 값이다.

```javascript
// 심볼 값에 대한 설명이 같더라도 유일무이한 심볼 값을 생성한다.
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

<br/>

심볼 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

```javascript
const mySymbol = Symbol();

// 심볼 값은 암묵적으로 타입 변환이 되지 않는다.
console.log(mySymbol + ''); // TypeError: Cannot convert a Symbol value to a string
console.log(+mySymbol);     // TypeError: Cannot convert a Symbol value to a string
```

<br/>

단, 불리언 타입으로는 암묵적으로 타입 변환된다. 이를 통해 if 문 등에서 존재 확인이 가능하다.

```javascript
const mySymbol = Symbol();

// 불리언 타입으로는 암묵적으로 타입 변환된다
console.log(!!mySymbol); // true

// if 문 등에서 존재 확인을 위해 사용할 수 있다.
if (mySymbol) console.log('mySymbol is not empty.');
```

<br/>

### Symbol.for 메소드

Symbol.for 메소드는 인수로 전달받은 문자열을 키로 사용하여 키와 심볼 값의 쌍들이 저장되어 있는 전역 심볼 레지스트리(global symbol registry)에서 해당 키와 일치하는 심볼 값을 검색한다.

- 검색에 성공하면 새로운 심볼 값을 생성하지 않고 검색된 심볼 값을 반환한다.
- 검색에 실패하면 새로운 심볼 값을 생성하여 Symbol.for 메소드의 인수로 전달된 키로 전역 Symbol 레지스트리에 저장한 후, 생성된 심볼 값을 반환한다.

그냥 Symbol은 유일무이한 심볼 값을 단 하나만 생성하기 때문에 전역 심볼 레지스트리에서 관리하지 않는다. 

하지만, Symbol.for 메소드를 이용하면 전역에서 심볼 레지스트리를 통해 공유가 가능하다.

~~~javascript
// 전역 심볼 레지스트리에 mySymbol이라는 키로 저장된 심볼 값이 없으면 새로운 심볼 값을 생성
const s = Symbol.for('mySymbol');

// 전역 심볼 레지스트리에 저장된 심볼 값의 키를 추출
console.log(Symbol.keyFor(s)); // mySymbol
console.log(s); // Symbol(mySymbol)
~~~

<br/>

### Symbol의 쓰임

#### 1. 프로퍼티 키

심볼 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심볼 값에 대괄호를 사용해야 한다. 

프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용해야 한다.

```javascript
const obj = {
  // 심볼 값으로 프로퍼티 키를 동적 생성
  [Symbol.for('mySymbol')]: 1
};

console.log(obj[Symbol.for('mySymbol')]); // 1
```

**심볼 값은 유일무이한 값이므로 심볼 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.** 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 미래에 추가될 어떤 프로퍼티 키와도 충돌할 위험이 없다.

<br/>

#### 2. 프로퍼티 은닉

심볼 값으로 동적 생성한 프로퍼티 키로 만든 프로퍼티는 for…in 문이나 Object.keys, Object.getOwnPropertyNames 메소드로 찾을 수 없다. 

즉, 프로퍼티를 은닉할 수 있다.

~~~javascript
const obj = {
  // 심볼 값으로 프로퍼티 키를 동적 생성
  [Symbol('mySymbol')]: 1
};

for (const key in obj) {
  console.log(key); // 아무것도 출력되지 않는다.
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
~~~

은닉된 Symbor을 찾기 위해서는 Object.getOwnPropertySymbols 메소드를 이용해야만 한다.

```javascript
const obj = {
  // 심볼 값으로 프로퍼티 키를 동적 생성
  [Symbol('mySymbol')]: 1
};

// ES6 : getOwnPropertySymbols
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

// 심볼 값을 찾을 수 있다.
const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey1]); // 1
```

<br/>

#### 3. 표준 빌트인 객체 확장 이용

보통으로는 표준 빌트인에 사용자 정의 메소드를 직접 추가해서 확장하여 사용하지는 않는다.

그럼에도 불구하고 아래처럼 확장했다고 가정하자.

~~~javascript
// 표준 빌트인 객체를 확장하는 것은 권장하지 않는다.
// 즉, Array.prototype은 읽기 전용으로 사용하는 것이 좋다.
Array.prototype.sum = function () {
  return this.reduce((p, c) => p + c, 0);
};

console.log([1, 2].sum()); // 3
~~~

나는 sum이라는 메소드를 Array.prototype에 확장해서 사용했다. 그런데 만약에 차후에 생긴 ES~~ 버전에서 sum이라는 메소드를 만들어 배포했다고 할 경우, 내 메소드가 빌트인 메소드를 덮어씌우게 된다. 이는 나중에 문제로 야기될 확률이 매우 높다. 

하지만 중복될 가능성이 없는 심볼 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하게 표준 빌트인 객체를 확장할 수 있다.

```javascript
// 심볼 값으로 프로퍼티 키를 동적 생성하면 다른 프로퍼티 키와 절대 충돌하지 않는다.
Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((p, c) => p + c, 0);
};

console.log([1, 2][Symbol.for('sum')]()); // 3
```

<br/>

### Well know Symbol

JS가 기본 제공하는 빌트인 심볼값이 존재한다.

빌트인 심볼 값은 Symbol 함수의 프로퍼티에 할당되어 있다.

![img](https://poiemaweb.com/assets/fs-images/30-1.png)

<br/>  이처럼 JS에서 기본 제공하는 빌트인 심볼 값을 **[Well-Known Symbol](https://tc39.es/ecma262/#sec-well-known-symbols)**이라 부른다. 

Well-Known Symbol은 자바스크립트 엔진의 내부 알고리즘에 사용된다.

내부 알고리즘의 예 : 배열, String 객체, arguments 객체

for…of 문으로 순회 가능한 빌트인 이터러블(iterable)은 Well-Known Symbol인 Symbol.iterator를 키로 갖는 메소드를 갖으며, Symbol.iterator 메소드를 호출하면 이터레이터(iterator)를 반환하도록 ECMAScript 사양에 규정되어 있다. 

빌트인 이터러블은 이 규정(이터레이션 프로토콜)을 준수하고 있다.

- 빌트인 이터러블

  이터러블은 for…of 문으로 순회할 수 있고 스프레드 문법의 피연산자가 될 수 있는 객체를 말한다. 자바스크립트가 기본 제공하는 빌트인 이터러블은 아래와 같다.

| 빌트인 이터러블 | 프로퍼티 키가 Symbol.iterator인 메소드                       |
| :-------------- | :----------------------------------------------------------- |
| Array           | Array.prototype[Symbol.iterator]                             |
| String          | String.prototype[Symbol.iterator]                            |
| Map             | Map.prototype[Symbol.iterator]                               |
| Set             | Set.prototype[Symbol.iterator]                               |
| TypedArray      | TypedArray.prototype[Symbol.iterator]                        |
| arguments       | arguments[Symbol.iterator]                                   |
| DOM 컬렉션      | NodeList.prototype[Symbol.iterator], HTMLCollection.prototype[Symbol.iterator] |

일반 객체에 추가해야 하는 메소드의 키 Symbol.iterator은 기존 프로퍼티 키 또는 미래에 추가될 프로퍼티 키와 절대로 중복되지 않을 것이다.

이처럼 **심볼은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.**

