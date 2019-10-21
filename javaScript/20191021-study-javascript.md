![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 12

- 용어

- 코딩스킬

- 화살표 함수

- 배열 ( Array )

  - 자바스크립트 배열은 배열이 아니다.
    - 해시 테이블
    - 일반적인 배열과 자바스크립트 배열의 장단점 정리
  - 배열 생성
    - 배열 리터럴
    - Array 생성자 함수
    - Array.from
    - Array.of
- 배열 요소의 참조
  - 배열 요소의 추가와 갱신
- 배열 요소의 삭제
- [배열 메소드](https://github.com/HYEOK999/TIL/blob/master/javaScript/배열메소드.md)
- [고차함수](https://github.com/HYEOK999/TIL/blob/master/javaScript/고차함수.md)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 자바스크립트의 배열
- 화살표함수
- 배열 (생성, 참조, 추가 및 갱신, 삭제)
- 배열 메소드
- 고차 함수

<br/>

----------

### 코딩스킬 

- 빌트인 API(ECMA Script)
- 웹 API - DOM, XMLHTTPRequset( Ajax )

코딩스킬은 게속 쳐봐야한다.

<br/>

### 화살표 함수

**화살표 함수는 선언문이 없고 반드시 변수에 담는 표현식(리터럴)만 제공한다.**

코드 블록이 한줄 짜리라면 `return`과 `{}` 생략해서 사용이 가능하다.

코드 블록이 두줄 이상이라면 `return` 과 `{}`을 생략해서는 안된다.

따라서 화살표 함수는 한 줄 짜리 함수를 원하는 것.

1. 매개 변수 선언 : 매개변수가 여러개 인 경우 `()` 내에 적는다.

~~~javascript
(x, y) => { ... } // true
~~~

2. 매개 변수가 한 개인 경우 : `()`를 생략이 가능하다.

~~~javascript
x => {...}
~~~

3. 매개 변수가 없는 경우 :  `()`는 생략이 불가능하다.

~~~javascript
() => { ... }
~~~

<br/>

## 배열 ( Array )

객체 : 여러개의 데이터를 하나의 그룹( 키와 값 )으로 하여 관리한다. 값의 이름(키)이 있기 때문에 찾는 속도가 빠르다.

배열 : 객체와 다르게 값만 있기 때문에, 각 값들을 요소라 하고 요소를 찾기 위해서는 순서(인덱스) 를 이용한다.

배열은 for문으로 순회하기 좋은 자료구조이다.

<br/>

자바스크립트에 배열이라는 타입은 존재하지 않는다. 배열은 객체이다. 

```javascript
typeof arr // -> object
```

<br/>

배열은 순서를 지니고 있으므로 접근할 때 `대괄호 표기법` 와 `index` 으로 접근한다.

```javascript
const arr = ['apple', 'banana', 'orange'];
arr[0] // -> 'apple'
arr[1] // -> 'banana'
arr[2] // -> 'orange'
```

<br/>

배열은 요소의 개수, 즉 배열의 길이를 나타내는 **length 프로퍼티**를 갖는다.

```javascript
arr.length // -> 3
```

<br/>

### 자바스크립트 배열은 배열이 아니다.

- **타 언어의 배열의 요소**는 하나의 타입으로 통일되어 있으며 서로 연속적으로 인접해 있다. 이러한 배열을 **밀집 배열(Dense array)**이라 한다.

<img src="https://poiemaweb.com/assets/fs-images/26-1.png" alt="img" style="zoom:50%;" />

이처럼 배열의 요소는 동일한 크기를 갖으며 빈틈없이 연속적으로 이어져 있으므로 아래와 같이 인덱스를 통해 단 한번의 연산으로 임의의 요소에 접근(임의 접근(Random access), 시간 복잡도 O(1))할 수 있다. 이는 매우 효율적이며 고속으로 동작한다.

```java
검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수
```

- 인덱스가 0인 요소의 메모리 주소 : 1000 + 0 * 8 = 1000
- 인덱스가 1인 요소에 메모리 주소 : 1000 + 1 * 8 = 1008
- 인덱스가 2인 요소에 메모리 주소 : 1000 + 2 * 8 = 1016

이처럼 배열은 인덱스를 통해 효율적으로 요소에 접근할 수 있다는 장점이 있다. 
하지만 정렬되지 않은 배열에서 특정한 값을 탐색하는 경우, 시간 복잡도 O(n))의 문제가 있다.
또 배열에 요소를 삽입하거나 삭제하는 경우, 배열 요소를 연속적으로 유지하기 위해 요소를 이동시켜야 하는 단점도 있다.

<img src="https://poiemaweb.com/assets/fs-images/26-2.png" alt="img" style="zoom:50%;" />

- **자바스크립트의 배열** 일반적인 배열과 다르다. 
  배열의 요소가 연속적으로 이어져 있지 않고 비어있을 수도 있고 크기도 서로 다른 이러한 배열을 **희소 배열(sparse array)**이라 한다.

자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체이다. 

```javascript
const arr = [1, 2, 3];

console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

<br/>

자바스크립트 배열의 요소는 사실 프로퍼티 값이다. 
자바스크립트에서 사용할 수 있는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로 어떤 타입의 값이라도 배열의 요소가 될 수 있다.

```javascript
const arr = [
  'string',
  10,
  true,
  null,
  undefined,
  NaN,
  Infinity,
  [ ],
  { },
  function () {}
];
```

#### 해시 테이블

해시 함수를 사용하여 메모리의 위치를 지정한다.

해시는 배열 요소를 삽입하거나 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.

**자바스크립트의 배열은 해시 테이블로 구현된 객체**로 구현되어 있기에 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점을 가지고 있다.

따라서 대부분의 모던 자바스크립트 엔진은 이러한 단점을 보완하기 위해 배열을 일반 객체와 구별하여 보다 배열처럼 동작하도록 최적화하여 구현하였다.

따라서 **성능상 일반적인 타 언어의 배열보다 느리지 않다.**

~~~javascript
const arr = []; //자바스크립트의 배열
console.time('Array Performance Test');

for (let i = 0; i < 10000000; i++) {
  arr[i] = i;
}
console.timeEnd('Array Performance Test');
// 약 340ms

const obj = {}; //자바스크립트의 객체
console.time('Object Performance Test');

for (let i = 0; i < 10000000; i++) {
  obj[i] = i;
}
console.timeEnd('Object Performance Test');
// 약 600ms
~~~

<br/>

#### 일반적인 배열과 자바스크립트 배열의 장단점 정리

- 일반적인 배열은 인덱스로 배열 요소에 빠르게 접근할 수 있지만 요소를 삽입하거나 삭제하는 경우에는 효율적이지 않다.
- 자바스크립트 배열은 기본적으로 **해시 테이블**로 구현된 객체이므로 인덱스로 배열 요소에 접근할 때 성능적인 면에서 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점을 갖지만 배열 요소를 삽입하거나 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다. ( 단점은 JS 엔진 브라우저 벤더사들에 의하여 보완되고 있다. )

<br/>

### 배열 생성

#### 배열 리터럴

~~~javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3
~~~

빈 배열의 length 값은 0 이다.

~~~javascript
const arr = [];
console.log(arr.length); // 0
~~~

객체의 프로퍼티 값이 없는 키를 참조 할 경우, `undefined`를 반환하는데, 배열도 똑같다.

빈 배열의 요소를 참조하면 `undefined`를 반환한다.

~~~javascript
const arr = [1, , 3]; // 희소 배열
console.log(arr[1]);     // undefined
~~~

<br/>

#### Array 생성자 함수

- 전달된 인수가 1개이고 숫자인 경우, 인수를 length 프로퍼티의 값으로 갖는 배열을 생성한다.

```javascript
const arr = new Array(10);
console.log(arr); // [empty × 10]
console.log(arr.length); // 10
```

- 전달된 인수가 없는 경우, 빈 배열을 생성한다. 즉, 배열 리터럴 []과 같다.

```javascript
const empty = new Array();
console.log(empty); // []
```

- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열을 생성한다.

```javascript
// 전달된 인수가 1개이지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
const arr1 = new Array({});
console.log(arr1); // [{}]

// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
const arr2 = new Array(1, 2, 3);
console.log(arr2); // [1, 2, 3]
```

`new 키워드` 없이도 사용이 가능하다. `const arr = Array(1, 2, 3); `

<br/>

#### Array.of

ES6에서 새롭게 도입. 정적메소드다.

- Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

~~~javascript
const arr1 = Array.of(1);
console.log(arr1); // [1]

const arr3 = Array.of('string');
console.log(arr3); // 'string'
~~~

<br/>

####  Array.from

ES6에서 새롭게 도입. 유사 배열 객체(array-like object) or 이터러블 객체(iterable object)를 변환하여 새로운 배열을 생성한다.

~~~javascript
// 문자열은 이터러블이다.
const arr1 = Array.from('Hello');
console.log(arr1); // [ 'H', 'e', 'l', 'l', 'o' ]

// 유사 배열 객체를 새로운 배열을 변환하여 반환한다.
const arr2 = Array.from({ length: 2, 0: 'a', 1: 'b' });
console.log(arr2); // [ 'a', 'b' ]
~~~

<br/>

**2번째 인수로 전달한 함수를 통해 값을 만들면서 요소를 채울 수 있다.**
동적으로 배열을 만들 수 있다.

~~~javascript
// Array.from의 두번째 인수로 배열의 모든 요소에 대해 호출할 함수를 전달할 수 있다.
// 이 함수는 첫번째 인수에 의해 생성된 배열의 요소값괴 인덱스를 순차적으로 전달받아 호출된다.
const arr3 = Array.from({ length: 5 }, function (v, i) { return i; });
console.log(arr3); // [ 0, 1, 2, 3, 4 ]
~~~

<br/>

### 배열 요소의 참조

존재하지 않는 요소에 접근하면 undefined가 반환된다.

배열은 사실 인덱스를 프로퍼티 키로 갖는 객체이다. 

```javascript
const arr = [1, 2];

// 인덱스가 2인 요소를 참조
// 배열 arr에 인덱스가 2인 요소는 존재하지 않는다.
console.log(arr[2]); // undefined
```

<br/>

### 배열 요소의 추가와 갱신

객체에 프로퍼티를 동적으로 추가할 수 있는 것처럼 배열에도 요소를 동적으로 추가할 수 있다.

```javascript
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [ 0, 1 ]
console.log(arr.length); // 2
```

만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.

```javascript
// 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101
```

이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.

```javascript
// 요소값의 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]
```

<br/>

**인덱스에 정수 이외의 값을 넣게 되면 요소가 아닌 프로퍼티가 생성된다.**

~~~javascript
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr[1.1] = 4;
arr[-1] = 5;

console.log(arr); // [1, 2, foo: 3, 1.1: 4, -1: 5]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
~~~

<br/>

### 배열 요소의 삭제

`delete` 를 사용하게 되면 특정 요소를 `empty`로 비워둔다. 즉, 삭제가 아니라 희소배열처럼 비우게된다. (length값은 그대로)
따서 그냥 `delete` 연산자 말고 `splice , pop , shift 등을 사용한다.`

~~~javascript
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1]; 
console.log(arr); // [1, empty, 3]
console.log(arr.length); // 3 - length 그대로.

arr.splice(1, 1);
console.log(arr); // [1, 3]
console.log(arr.length); // 2 - length 프로퍼티에 변경이 반영된다.
~~~

<br/>

### 배열 메소드

- [배열 메소드](https://github.com/HYEOK999/TIL/blob/master/javaScript/배열메소드.md)

<br>

### 고차함수

- [고차함수](https://github.com/HYEOK999/TIL/blob/master/javaScript/고차함수.md)

<br>

