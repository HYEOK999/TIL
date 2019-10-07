![](https://user-images.githubusercontent.com/31315644/66104821-b9976b00-e5f4-11e9-84e9-20c797dd2c51.jpeg)

------

## JacaScript 7강~9강 예습

- 7강 : 제어문
  1. 블록문 이란?
  2. 조건문
     1. if문
     2. switch문
  3. 반복문
     1. for문
     2. while문
     3. do~while문
  4. break문
     - label 문 
  5. continue문
- 8강 : 타입 변환과 단축 평가
  1. 타입변환이란?
  2. 명시적 타입 변환
  3. 암묵적 타입 변환
     1. 문자열 타입으로 변환
     2. 숫자 타입으로 변환
     3. 불리언 타입으로 변환
  4. 단축 평가
- 9강 : 객체 리터럴
  1. 객체란?
     - 객체 타입
  2. 객체 리터럴에 의한 객체 생성
     - 객체 리터럴
  3. 프로퍼티
     - 프로퍼티 키, 메소드
  4. 프로퍼티 접근
  5. 프로퍼티 키 동적생성
  6. 프로퍼티 삭제
  7. ES6에서 추가된 기능
     1. 객체 리터럴의 확장 기능
     2. 프로퍼티 키 동적 생성
     3. 메소드 축약표현

<br/>

------

# 7강



## 제어문

<br/>

### 블록문 이란?

> 0개 이상의 문을 중괄호로 묶은 것으로 코드 블록 또는 블록이라고 한다.

- 블록문은 JS에서 하나의 실행단위.
- 블록문의 끝에는 세미콜론( ; )을 붙이지 않는다.
- 제어문 혹은 함수선언문에 이용한다.

~~~javascript
// 블록문
{
  var foo = 10;
  console.log(foo);
}

// 제어문
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10

// 함수 선언문
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2)); // 3
~~~

<br/>

### 조건문 

> 주어진 조건식의 평가 결과에 따라 코드 블럭의 실행을 결정한다.

- `if ... else` 문
- `swith` 문

#### 1. if ~ else , else if

~~~javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}			
~~~

**else if 문과 else 문은 옵션으로 사용할 수도 있고 사용하지 않을 수도 있다. **

**if 문과 else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용할 수 있다.**

<br/>

#### 2. switch( ) 

~~~javascript
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
~~~

**switch문은 반드시 `break;` 동반 해야만 한다. **  `break;`가 없다면 맞는 조건이어도 다음 case 표현식으로 넘어가게 된다. default에는 `break;` 생략이 가능하다.

<br/>

### 반복문

> 주어진 조건식의 평가 결과가 참인 경우 코드 블럭을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.
>
> for ( for-in, for-of ) , while , do~while

<br/>

#### 1. for문

~~~~javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
~~~~

for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다.

만약 , 모두 비워있다면 무한 루프가 된다.

~~~javascript
for(;;){
	내용;
}
~~~

예제, 중첩 for문을 이용한 주사위 눈 합

~~~~javascript
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}
~~~~

<br/>

#### 2. while 문

~~~~javascript
while (조건식) {
  조건식이 참인 경우 반복 실행될 문;
} 
~~~~

while문은 조건식이 `true`라면 무한루프가 된다.

~~~javascript
// 무한루프
while (true) { ... }
~~~

무한 루프를 탈출 하기 위해서는 특정조건으로 인한 `break;` 를 추가하여야 한다.

예제, count가 3이면 코드 탈출

~~~javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
~~~

<br/>

#### 3. do...while 문

~~~~javascript
do{
	최소 1번은 실행되고 그 후부터는 조건에 맞을 경우 반복 실행된다.
} while (조건식);
~~~~

`do...while`문은 최소 1번은 실행된 뒤 조건을 판별하여 게속해서 반복할지 안할지 유무를 결정한다.

<br/>

### break 문

> 가장 가까운 레이블 문, 반복문( for, for-in, for-of, while, do...while ) 또는 switch문의 코드 블록을 탈출한다.
>
> 이외에 문에서 사용시 SyntaxError를 유발한다.

**레이블 문이란?**

- 식별자가 붙은 문을 의미한다.

~~~javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');
~~~

**레이블문은 중첩for문에서 외부for문까지 한번에 빠져나가고자 할 때 이용한다.**

~~~~javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log('inner ' + j);
  }
}

console.log('Done!');
~~~~

<br/>

예제 : 특정 문자열 찾기

~~~javascript
var string = 'Hello World';
var search = 'l';
var index;

for(var i = 0; i < String.length; i++) {
	if(string[i] === search){
		index = i;
		break;
	}
}

console.log(index);
~~~

위와 똑같이 동작하는 메소드

~~~javascript
var string = 'Hello World';
var search = 'l';
var index;

console.log(string.indexOf(search)); // 2
~~~

<br/>

### continue 문

> continue 문은 현재 진행되고 있는 반복문의 증감식을 중단하고 다음 증감식으로 이동한다.
>
> break문과 다르게 반복문을 탈출하지 않는다.

~~~javascript
var string = 'Hello World.';
var search = 'l';
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) {
  	continue;
  }
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 위 예제의 for 문은 아래와 동일하게 동작한다.
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === search) count++;
}
~~~

위와 똑같이 동작하는 메소드

~~~javascript
var string = 'Hello World.';
var search = 'l';
var count = 0;

const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length); // 3
~~~

<br/>

# 8강

## 타입 변환과 단축 평가

<br/>

### 타입 변환이란?

> 자바스크립트는 값에 타입이 있다. 
>
> 값의 타입을 개발자의 의도에 의하여 다른 타입으로 변환이 가능하다.
>
> 이를 **명시적 타입 변환** 또는 **타입캐스팅** 이라 칭한다.

### 명시적 타입 변환 

~~~javascript
var x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str = x.toString(); // str은 문자열 '10'을 지니고 있다.
~~~

<br/>

또 반대로 JS엔진을 통하여 개발자의 의도와는 별개로 **암묵적으로 타입이 자동 변환** 될 수도 있다. 

이를 **암묵적 타입 변환** 또는 타입 **강제 변환** 이라고 한다.

~~~javascript
var x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
var str = x + '';
~~~

<br/>

**암묵적 타입 변환** 과 **명시적 타입** 변환 둘다 원시값 자체를 변경할 수 없다,

**원시값을 바꿀 수 있는 방법은 재할당 뿐이다.**

<br/>

### 암묵적 타입 변환

> **자바스크립트 엔진은 표현식을 평가할 때 코드의 문맥을 고려하여 암묵적 타입 변환을 실행한다.**

1. #### 문자열 타입으로 변환 

피연산자 중 `+ 연산자` 하나 이상이 문자열이므로 문자열 연결 연산자로 동작한다.

~~~javascript
// 숫자 타입
0 + ''              // "0"
-0 + ''             // "0"
1 + ''              // "1"
-1 + ''             // "-1"
NaN + ''            // "NaN"
Infinity + ''       // "Infinity"
-Infinity + ''      // "-Infinity"

// 불리언 타입
true + ''           // "true"
false + ''          // "false"

// null 타입
null + ''           // "null"

// undefined 타입
undefined + ''      // "undefined"

// 심볼 타입
(Symbol()) + ''     // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // "[object Object]"
Math + ''           // "[object Math]"
[] + ''             // ""
[10, 20] + ''       // "10,20"
(function(){}) + '' // "function(){}"
Array + ''          // "function Array() { [native code] }"
~~~

<br/>

2. #### 숫자 타입으로 변환

산술 연산자의 모든 피연산자는 코드의 문맥 상 모두 숫자 타입이여야 한다.

피연산자 와  `-` `*` `/` 의 연산자 경우 하나 이상이 숫자 이므로 숫자 연사자로 동작한다.

~~~javascript
1 - '1'    // 0
1 * '10'   // 10
1 / 'one'  // NaN		  피연산자를 숫자 타입으로 변환할 수 없는 경우. 산술이 불가능하다.
~~~

<br/>

단항 연산자의 `+`의 경우까지 숫자 타입으로 변환한다.

~~~~javascript
// 문자열 타입
+''             // 0
+'0'            // 0
+'1'            // 1
+'string'       // NaN

// 불리언 타입
+true           // 1
+false          // 0

// null 타입
+null           // 0

// undefined 타입
+undefined      // NaN

// 심볼 타입
+Symbol()       // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // NaN
+[]             // 0
+[10, 20]       // NaN
+(function(){}) // NaN
~~~~

<br/>

3. #### 불리언 타입으로 변환

<br/>

 ~~~~javascript
if ('')    console.log('1'); //false
if (true)  console.log('2'); //true
if (0)     console.log('3'); //false
if ('str') console.log('4'); //true
if (null)  console.log('5'); //false

// 2 4
 ~~~~

**자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 인식할 값) 또는 Falsy 값(거짓으로 인식할 값)으로 구분한다**. Truthy 값은 true로, Falsy 값은 false로 변환.

- false
- undefined
- null
- 0, -0
- NaN
- ’ ’ (빈문자열)

**위 예 들은 모두 false 로 평가되는 Falsy 값이다. 이외의 값들은 모두 Truthy, true로 평가된다.**

<br/>

아래 예제는 Truthy/Falsy 값을 판별하는 **함수**다.

> **함수**
>
> 함수란 어떤 작업을 수행하기 위해 필요한 문들의 집합을 정의한 코드 블록이다. 함수는 이름과 매개변수를 갖으며 필요한 때에 호출하여 코드 블록에 담긴 문들을 일괄적으로 실행할 수 있다. 

~~~javascript
// 주어진 인자가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
function isFalsy(v) {
  return !v;
}

// 주어진 인자가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(v) {
  return !!v;
}

// 모두 true를 반환한다.
console.log(isFalsy(false));
console.log(isFalsy(undefined));
console.log(isFalsy(null));
console.log(isFalsy(0));
console.log(isFalsy(NaN));
console.log(isFalsy(''));

// 모두 true를 반환한다.
console.log(isTruthy(true));
// 빈 문자열이 아닌 문자열은 Truthy 값이다.
console.log(isTruthy('0'));
console.log(isTruthy({}));
console.log(isTruthy([]));
~~~

<br/>

### 단축 평가

| 단축 평가 표현식    | 평가 결과 |
| :------------------ | :-------- |
| true \|\| anything  | true      |
| false \|\| anything | anything  |
| true && anything    | anything  |
| false && anything   | false     |

즉, 결과를 되는 연산을 하였을 값을 출력한다 .

예를들어보자,

~~~javascript
// 논리합(||) 연산자
'Cat' || 'Dog'  // 'Cat' - 캣이 이미 true이므로 연산의 결과는 캣이다.
false || 'Dog'  // 'Dog' - 도그가 true라면 참이므로 연산의 결과 도그이다.
'Cat' || false  // 'Cat' - 캣이 이미 true이므로 연산의 결과는 캣이다.

// 논리곱(&&) 연산자
'Cat' && 'Dog'  // Dog - 도그가 false라면 틀린값인데 결국 도그가 true이기 때문에 결과는 도그다.
false && 'Dog'  // false - 도그가 true여도 이미 false가 존재하기 때문에 false
'Cat' && false  // false - 캣이 ture여도 이미 false가 존재하기 때문에 false
~~~

단축 평가는 아래와 같은 경우 유용하게 사용된다.

~~~javascript
var elem = null;

console.log(elem.value); // TypeError: Cannot read property 'value' of null
console.log(elem && elem.value); // null
~~~

<br/>

함수를 호출할 때 인수를 전달하지 않을 경우 매개변수는 undefined를 갖게 된다.

~~~javascript
function test(str){
	console.log(`현재 타입은 %{typeof(str)}`);
}

test(); // 현재 타입은 undefined 입니다.	매개 변수를 전달하지 않았다.
~~~

<br/>

함수 매개변수에 기본값을 설정할 때,

~~~javascript
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || '';
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2
~~~

<br/>

# 9강



## 객체 리터럴

<br/>

### 객체란?

> 자바스크립트 객체 기반의 프로그래밍 언어이며 JS를 이루고 있는 거의 `모든것`이 객체다.
>
> 원시 타입을 제외한 나머지 값들(함수, 배열 , 정규표현식 등등)은 모두 객체이다.
>
> 객체 타입은 원시타입과 다르게 **변경가능한 값**이다.

<br/>

#### 객체타입

​	객체 타입은 다양한 타입의 값(원시 타입의 값 또는 다른 객체)들을 하나의 단위로 구성한 복잡한 자료 구조이다.

<img width="1115" alt="프로퍼티" src="https://user-images.githubusercontent.com/31315644/66315302-7ae51600-e950-11e9-9787-89f3e4ae86f6.png">

- 자바스크립트에서 사용할 수 있는 모드 값은 프로퍼티 값이 될 수 있다.
- 자바스크립트에서 함수는 값으로 취급이 가능하다.
- 프로퍼티 값으로 함수를 사용할 수 있다. (이를, 일반 함수랑 구분하기 위해서 메소드라 한다)

<br/>

#### 정리하면, 객체는 프로퍼티( 키 , 값 ) 와 메소드로 구성된 집합체.

- 프로퍼티: 객체의 상태를 나타내는 값(data)
- 메소드 : 프로퍼티를 참조하고 조작할 수 있는 동작(behavior)

**객체와 함수** : 자바스크립트에서 함수로 객체를 생성하기 하며 함수 자체는 곧 객체이다.

<br/>

### 객체 리터럴에 의한 객체 생성

자바스크립트에 객체 생성 방법.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수 (new 연산자)
- Object.create 메소드
- 클래스( ES6 )

<br/>

#### 객체리터럴

​	객체를 선언하기 위한 가장 일반적인 방법이다.
​	**객체 리터럴의 중괄호는 코드 블록을 의미하지 않음에 주의**

~~~~~javascript
var empty = {}; // 빈 객체
console.log(typeof empty); // object

// 할당이 이루어지는 시점에 객체 리터럴이 해석되고 그 결과 객체가 생성된다.
var person = {
  name: 'Lee',
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  }
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}
~~~~~

<br/>

### 프로퍼티

> **객체는 프로퍼티(Property)들 와 메소드의 집합이며 프로퍼티는 키(key)과 값(value)으로 구성된다.** 

프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 아래와 같다.

- 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 symbol 값
- 프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값

<br/>

#### 프로퍼티 키

> 프로퍼티의 키는 식별자 네이밍 규칙을 준수할 경우와 준수하지 않을 경우로 나뉜다.

~~~~javascript
var person = {
  first_name: 'Kim', // 유효한 이름
  'last-name': 'Lee'    // 유효하지 않은 이름
};

console.log(person); // {first_name: "Kim", last-name: "Lee"}
~~~~

**식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표( ' )를 사용하여야 한다.**

만약, 따옴표를 사용하지 않을 경우 SyntaxError를 일으킨다.

<br/>

**값을 반환하는 표현식을 이용해 프로퍼티 키를 동적으로 생성도 가능하다. 이 경우 사용할 표현식은 `[ ]`로 묶는다.**

~~~javascript
var obj = {};
var key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';
// ES6: 프로퍼티 키 동적 생성
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
~~~

<br/>

**++추가로**

1. `빈 문자열` 이나 `var`, `function`와 같은 예약어를 `프로퍼티 키`를 사용해도 에러는 발생하지 않지만, 권장하지 않는다.
2. 이미 존재하는 `프로퍼티 키`를 중복 선언시 나중 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.
3. `프로퍼티 키`에 문자열이나 symbol값 이외의 값을 쓰면 암묵적으로 문자열이된다.

<br/>

#### 메소드

​	프로퍼티의 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드( Method )라 부른다. 즉, 메소드는 객체에 제한되어 있는 함수를 의미한다.

~~~javascript
var circle = {
  radius: 5, // ← 프로퍼티

  // 원의 지름
  getDiameter: function () { // ← 메소드
    return 2 * this.radius; // this는 circle를 가리킨다.
  }
};

console.log(circle.getDiameter());  // 10
~~~

<br/>

### 프로퍼티 접근

1. 마침표 표기법
2. 대괄호 표기법

 프로퍼티 키가 식별자 네이밍 규칙을 따르고 있다면 마침표 표기법과 대괄호 표기법을 모두 사용이 가능하다.

~~~javascript
var person = {
  name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
~~~

주의 : 대괄호 표기법을 사용하는 경우, **대괄호 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.** 

<br/>

~~~javascript
var person = {
  name: 'Lee'
};

console.log(person[name]); // ReferenceError: name is not defined
~~~

<br/>

**존재 하지 않는 프로퍼티에 접근할 경우, undefined를 반환한다.**

~~~~javascript
var person = {
  name: 'Lee'
};

console.log(person.age); // undefined ,ReferenceError가 발생하지 않는다.
~~~~

<br/>

프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않는 이름. 즉 **유효하지 않음 이름**이라면 반드시 대괄호 표기법을 이용한다. 

이는 **숫자로만 이루언 프로퍼티 키도 포함**이다. 단, 숫자로 이루어진 프로퍼티키는 따옴표를 생략할 수 있다.

~~~~javascript
var person = {
  'last-name': 'Lee',
  1: 10
};

console.log(person.'last-name');  // SyntaxError: Unexpected string
console.log(person.last-name);    // ReferenceError: name is not defined
console.log(person[last-name]);   // ReferenceError: last is not defined
console.log(person['last-name']); // Lee

// 프로퍼티 키가 숫자로 이루어진 문자열인 경우, 따옴표를 생략 가능하다.
console.log(person.1);     // SyntaxError: missing ) after argument list
console.log(person.'1');   // SyntaxError: Unexpected string
console.log(person[1]);    // 10 : person[1] -> person['1']
console.log(person['1']);  // 10
~~~~

<br/>

### 프로퍼티 키 동적생성

~~~~javascript
var person = {
  name: 'Lee'
};

// person객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 person객체에 address 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.address = 'Seoul';

console.log(person); // {name: "Lee", address: "Seoul"}
~~~~

<br/>

### 프로퍼티 삭제

- **delete 연산자** 는 객체의 프로퍼티를 삭제한다.
- 존재하지 앟는 프로퍼티를 삭제하면 아무런 에러없이 무시된다.

~~~javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 동적 추가
person.address = 'Seoul';

// person 객체에 address 프로퍼티가 존재한다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 있다.
delete person.address;

// person 객체에 age 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.age;

console.log(person); // {name: "Lee"}
~~~

<br/>

### ES6에서 추가된 기능

#### 객체 리터럴의 확장 기능 (ES5 VS ES6)

ES5에서는 변수에 선언된 값을 프로퍼티 키의 값에 재할당 해주는 방면으로 이용하였다.

~~~~javascript
// ES5
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2}
~~~~

<br/>

ES6에서는 프로퍼티의 키 명과 변수의 명이 같을 경우 키를 생략하고 대입이 가능하다.

이때, 프로퍼티 키는 변수이름으로도 자동 생성된다.

~~~javascript
// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
~~~

<br/>

#### 프로퍼티 키 동적 생성 (ES5 VS ES6)

​	문자열 또는 문자열로 변환 가능한 값을 반환하는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다.

단, 이때 표현식은 대괄호를 이용해야하며, 이를 `계산된 프로퍼티 이름`이라 칭한다.

~~~javascript
// ES5
var prefix = 'prop';
var i = 0;

var obj = {};
	obj[prefix + '-' + ++i] = i;
	obj[prefix + '-' + ++i] = i;
	obj[prefix + '-' + ++i] = i;

console.log(obj) // {prop-1: 1, prop-2: 2, prop-3: 3}
~~~

~~~javascript
// ES6
var prefix = 'prop';
var i = 0;

var obj = {
  [`${prefix}-${++i}`] : i,
  [`${prefix}-${++i}`] : i,
	[`${prefix}-${++i}`] : i
};

console.log(obj) // {prop-1: 1, prop-2: 2, prop-3: 3}
~~~

<br/>

#### 메소드 축약 표현 (ES5 VS ES6)

~~~javascript
// ES5
var obj = {
	name: 'Lee',
	sayHo: function(){
		console.log('My Name is ' + this.name);
	}
}

obj.sayHo(); //My Name is Lee
~~~

~~~javascript
// ES6
var obj = {
	name: 'Lee',
  // ES6의 메소드 축약표현
	sayHo(){
		console.log('My Name is ' + this.name);
	}
}

obj.sayHo(); //My Name is Lee
~~~

<br/>