![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 16

- 용어
- 클래스 상속 관계 instanceof
- 스프레드 문법
  - 함수 호출문의 인수 목록
  - 배열 리터럴 내부
    - 배열 병합
    - 배열 복사
    - 유사 배열 객체 배열 변환
  - 객체 리터럴 내부
    - 객체 병합
- 디스트럭처링
  - 배열 디스트럭처링 
    - 배열 디스트럭처링의 조건
    - Rest 요소
    - 예제 - Date 객체에서 년 , 월 , 일
  - 객체 디스트럭처링
    - 객체 디스트럭처링의 조건
    - 값만 추출
    - 배열 디스터럭처링과 혼용이 가능하다
    - Rest 프로퍼티
    - 예제 - 고차함수의 매개변수로 이용
- 표준 빌트인 객체와 래퍼 
  - 객체자바스크립트 3가지 객체 분류
  - 원시값과 래퍼 객체 

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 스프레드 문법
- 함수 호출문 
- 배열 리터럴 시 스프레드
- 객체 리터럴 시 스프레드
- 디스트럭처링
- 원시값과 래퍼 객체

<br/>

---------

### 클래스 상속 관계 instanceof

~~~javascript
class Base {
  constructor() {
  console.log(new.target);  // class Dreived~ , class Base~
	console.log(this instanceof Derived); // true , false
	console.log(this instanceof Base); // true , true
	console.log(this instanceof Object); // true , true
  }
}

class Derived extends Base {
  constructor() { super(); }
}

const derived = new Derived();  
const base = new Base();
~~~

<br/>

### 스프레드 문법

>  하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개, 분산하여, spread) 개별적인 값들의 목록으로 만든다.

대상 : iterable 가능한 존재들 ( for…of 문으로 순회할 수 있는 이터러블 )

- Array, String, Map, Set, DOM data structure(NodeList, HTMLCollection), Arguments
- 스프레드는 연산자가 아니다. 결과물만 단독으로 사용 불가능. (예 : 스프레드를 사용해서 변수에 사용해보면 담을 수 없다.)
- 함수 호출문의 인수 목록 ( 함수의 매개변수는 Rest 파라미터 )
- 배열 리터럴의 요소 목록
- 객체 리터럴의 프로퍼티 목록 

~~~javascript
// ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
console.log(...[1, 2, 3]) // 1 2 3

// 문자열은 이터러블이다.
console.log(...'Hello'); // H e l l o

// Map과 Set은 이터러블이다.
console.log(...new Map([['a', '1'], ['b', '2']])); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });
// TypeError: Found non-callable @@iterator
~~~

![spread](https://user-images.githubusercontent.com/31315644/67654022-73cd8880-f98f-11e9-8b09-9cef4b53d34b.jpeg)

<br/>

#### 함수 호출문의 인수 목록

~~~javascript
const arr = [1, 2, 3];

// 배열 arr의 요소 중에서 최대값을 구하기 위해 Math.max를 사용한다.
const maxValue = Math.max(arr);

console.log(maxValue); // NaN
~~~

`Math.max();` 는 가변인자 함수이기 때문에 갯수가 정해진 배열은 들어갈 수 없다. 따라서 엣날에는 `apply` 를 이용했다.

`apply` 는 2번째 인수로 배열을 받는다. 

Math.max()` 를 호출 시 `apply` 에 2번쨰 인수(배열형태)가 배열이 풀어져 `Math.max()` 로 넘어간다.

~~~javascript
// apply 함수의 2번째 인수(배열)는 apply 함수가 호출하는 함수의 인수 목록이다.
// 따라서 배열이 펼쳐져서 인수로 전달되는 효과가 있다.
var maxValue = Math.max.apply(null, arr);
~~~

<br/>

위 복잡한 구문을 스프레드로 사용 시 간결하고 편리하다.

~~~javascript
const arr = [1, 2, 3];

// 스프레드 문법을 사용하여 배열 arr을 1, 2, 3으로 펼쳐서 Math.max에 전달한다.
// Math.max(...[1, 2, 3])는 Math.max(1, 2, 3)과 같다.
const maxValue = Math.max(...arr);

console.log(maxValue); // 3
~~~

<br/>

Rest 파라미터와는 정반대 개념이다. Rest파라미터는 풀어진것을 모은다.

~~~javascript
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // [ 2, 3 ]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3]);
~~~

<br/>

#### 배열 리터럴 내부 

##### 배열 병합

기존 배열 병합 방법들 ( concat, push )

~~~javascript
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1, 2, 3, 4]

// ES5
var arr1 = [1, 2];
var arr2 = [3, 4];

Array.prototype.push.apply(arr1, arr2);

console.log(arr1); // [1, 2, 3, 4]
~~~

spread 사용 시

~~~javascript
// ES6 concat 대체
const arr = [...[1, 2], 3, 4];
console.log(arr); // [1, 2, 3, 4]

// ES6 push 대체
const arr1 = [1, 2];
const arr2 = [3, 4];

arr1.push(...arr2); // arr1.push(3, 4)와 같다.
console.log(arr1); // [1, 2, 3, 4]
~~~

<br/>

##### 배열 복사

기존의 배열에 다른 배열의 요소들을 삽입 ( splice 메소드 )  - splie는 배열을 직접고친다. (원본배열 변경)

```javascript
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

// apply 메소드의 2번째 인수는 배열이다. 이것은 인수 목록으로 splice 메소드에 전달된다.
// [1, 0].concat(arr2) → [1, 0, 2, 3]
// arr1.splice(1, 0, 2, 3) → arr1[1]부터 0개의 요소를 제거하고
// 그자리(arr1[1])에 새로운 요소(2, 3)를 삽입한다.
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));

console.log(arr1); // [1, 2, 3, 4]
```

스프레드 문법 - **얕은 복사**

```javascript
// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);

console.log(arr1); // [1, 2, 3, 4]
```

<br/>

##### 유사 배열 객체 배열 변환

기존 방법

~~~javascript
// ES5
function sum() {
  // 유사 배열 객체인 arguments를 배열로 변환
  var args = Array.prototype.slice.apply(arguments);

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
~~~

스프레드 문법

~~~javascript
// ES5
function sum() {
  // 유사 배열 객체인 arguments를 배열로 변환
	var args = [...arguments];

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
~~~

<br/>

#### 객체 리터럴 내부

 객체에서도 spread를 사용할 수 있는 경우가 딱 1가지 존재한다. 바로 객체 리터럴에서 사용하는 것이다.

주로, `Object.assign()`을 대체하기 위해 사용한다.

<br/>

##### 객체 병합

기존에서 객체 병합	

Object.assign의 병합은 뒷 인자에서 앞 인자 순으로 이동한다.

제일 앞에 `{}`을 해준 이유는 새로운 객체를 할당하기 위함이다.

~~~javascript
// 객체의 병합
// 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다.
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 });
console.log(merged); // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = Object.assign({}, { x: 1, y: 2 }, { y: 100 });
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = Object.assign({}, { x: 1, y: 2 }, { z: 0 });
console.log(added); // { x: 1, y: 2, z: 0 }
~~~

스프레드 문법

~~~javascript
// 객체의 병합 - 스프레드
// 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다.
const merged = { ...{ x: 1, y: 2 }, ...{ y: 10, z: 3 } };
console.log(merged); // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = { ...{ x: 1, y: 2 }, y: 100 };
// changed = { ...{ x: 1, y: 2 }, ...{ y: 100 } }
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = { ...{ x: 1, y: 2 }, z: 0 };
// added = { ...{ x: 1, y: 2 }, ...{ z: 0 } }
console.log(added); // { x: 1, y: 2, z: 0 }
~~~

<br/>

### 디스트럭처링

#### 배열 디스트럭처링

예전에는 각 배열의 값을 변수에 담기 위해서는 다음과 같이 하나하나 넣어줘야만 했다.

~~~javascript
// ES5
var arr = [1, 2, 3];

var one   = arr[0];
var two   = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3
~~~

<br/>

디스트럭처링을 사용한다면 코드 수를 많이 줄일 수 있다.

~~~javascript
// ES6 배열 디스트럭처링 할당
const arr = [1, 2, 3];

// 변수 one, two, three를 선언하고 배열 arr을 디스트럭처링하여 할당한다.
// 이때 할당 기준은 배열의 인덱스이다.
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
~~~

여기서 `[one, two, three]`는 배열이 아니다. 디스트럭처링 할당이다.

~~~javascript
let x, y;
[x, y] = [1, 2];

// 위의 문과 아래의 문은 동치이다.
const [x, y] = [1, 2];
~~~

<br/>

##### 배열 디스트럭처링의 조건

1. 선언과 초기화가 무조건 동시에 진행되어야한다. (만약, 선언만 한다면 에러 유발)
2. 반드시 배열이 와야한다.
3. 순서대로 할당한다.
4. 받고자하는 배열의 수가 더 작을 경우 `undefined`가 할당된다.
5. 받고자하는 배열의 수가 더 많을 경우 무시한다.

<br/>

##### Rest 요소

~~~javascript
// Rest 요소
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [ 2, 3 ]
~~~

<br/>

##### 예제 - Date 객체에서 년 , 월 , 일

~~~javascript
const today = new Date(); // Mon Sep 16 2019 02:03:42 GMT+0900 (한국 표준시)
const formattedDate = today.toISOString().substring(0, 10); // "2019-09-15"

// 문자열을 분리하여 배열로 변환한 후, 배열 디스트럭처링 할당을 통해 필요한 요소를 취득한다.
const [year, month, day] = formattedDate.split('-');
console.log([year, month, day]); // ['2019', '09', '15']
~~~

<br/>

#### 객체 디스트럭처링 할당

객체에서도 디스트럭처링을 할당할 수 있다.

기존에는 다음과 같이 해야했다.

~~~~javascript
// ES5
var user = { firstName: 'Ungmo', lastName: 'Lee' };

var firstName = user.firstName;
var lastName  = user.lastName;

console.log(firstName, lastName); // Ungmo Lee
~~~~

<br/>

ES6 에서의 디스트럭처링을 할당.

~~~javascript
// ES6 객체 디스트럭처링 할당
const user = { firstName: 'Ungmo', lastName: 'Lee' };

// 변수 lastName, firstName을 선언하고 객체 user를 디스트럭처링하여 할당한다.
// 이때 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다. 순서는 의미가 없다.
const { lastName, firstName } = user;

console.log(firstName, lastName); // Ungmo Lee
~~~

~~~javascript
const { lastName, firstName } = user;
// 위와 아래는 동치이다.
const { lastName: lastName, firstName: firstName } = user;
~~~

<br/>

##### 객체 디스트럭처링의 조건

1. 선언과 초기화가 무조건 동시에 진행되어야한다. (만약, 선언만 한다면 에러 유발)
2. 반드시 객체가 와야한다. (혹은 객체인 변수)
3. 프로퍼티 키에 맞춰서 할당한다.

<br/>

##### 값만 추출

~~~javascript
const todo = { id: 1, content: 'HTML', completed: true };

// todo 객체로부터 id 프로퍼티만을 추출한다.
const { id } = todo;
console.log(id); // 1
~~~

<br/>

##### 배열 디스터럭처링과 혼용이 가능하다

~~~javascript
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false }
];

// todos 배열의 두번째 요소인 객체로부터 id 프로퍼티만을 추출한다.
const [, { id }] = todos;
console.log(id); // 2
~~~

<br/>

##### Rest 프로퍼티

~~~~javascript
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
~~~~

<br/>

##### 예제 - 고차함수의 매개변수로 이용

~~~~javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function render() {
  let html = '';

  todos.forEach(({id, content, completed}) => {
    html += (`<li id="${id}">
      <label><input type="checkbox" ${completed ? 'checked' : '' } > ${content}</label>
    </li>`);
  });

  return html;
}

console.log(render());

~~~~

<br/>

### 표준 빌트인 객체와 래퍼 객체

#### 자바스크립트 3가지 객체 분류

| 구분                                       | 설명                                                         |
| :----------------------------------------- | :----------------------------------------------------------- |
| 표준 빌트인 객체(standard built-in object) | Object, Sting, Number, Array, Function과 같이 ECMAScript 사양에 정의된 객체 / 애플리케이션 전역의 공통 기능을 제공. |
| 호스트 객체(host object)                   | 브라우저 환경에서 제공하는 window, XmlHttpRequest, HTMLElement 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체. 예를 들어 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스트 객체를 사용할 수 있다. |
| 사용자 정의 객체(user-defined object)      | 표준 빌트인 객체와 호스트 객체처럼 외부에서 제공되는 객체가 아닌 사용자가 직접 정의한 객체. |

<br/>

#### 표준 빌트인 객체 

> ECMAScript 사양에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다.

 Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Generator, Promise, Reflect, Proxy, JSON, Error 등등

- 표준 빌트인 객체는 전역 객체의 프로퍼티이다. 따라서 언제나 참조가 가능하다
- 자바스크립트의 실행환경에 구애받지 않고 사용할 수 있다.

<br/>

#### 원시값과 래퍼 객체 

~~~~javascript
const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메소드를 갖고 있다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
~~~~

원시값은 객체가 아니므로 프로퍼티나 메소드를 가질 수 없음에도 불구하고 원시값인 문자열이 마치 객체처럼 동작한다.

이유 : 원시값인 **문자열, 숫자, 불리언 값**의 경우, 마치 객체처럼 이들 원시값에 대해 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진은 일시적으로 원시값을 연관된 객체로 변환한다. 

즉 , 원시값(문자열 숫자 불리언) ► 객체로 임시 변환(래퍼 객체) ► 원시값

이처럼 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 **임시 객체를 레퍼 객체(wrapper object)**라 한다.

<br/>

