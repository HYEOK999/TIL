<img src="https://cdn.pixabay.com/photo/2015/11/10/08/22/pay-1036469_960_720.jpg" style="zoom:50%;" />

------

## JavaScript Number 래퍼 객체

- Number 래퍼 객체
  - Number Constructor
  - Number() 생성자 함수를 통해서 만들어진 Number 객체는 객체다.
  - Number Property
    - Number.EPSILON
    - Number.MAX_VALUE
    - Number.MIN_VALUEa
    - Number.POSITIVE_INFINITY
    - Number.NEGATIVE_INFINITY
    - Number.NaN
  - Number.Method
    - Number.isFinite(testValue: number): boolean
    - Number.isInteger(testValue: number): boolean 
    - Number.isNaN(testValue: number): boolean 
    - Number.isSafeInteger(testValue: number): boolean
    - Number.prototype.toExponential(fractionDigits?: number): string
    - Number.prototype.toFixed(fractionDigits?: number): string
    - Number.prototype.toString(radix?: number): string
    - Number.prototype.valueOf(): number ES1

<br/>

-------

## Number 래퍼 객체

>Number 객체는 원시 타입 number를 다룰 때 유용한 프로퍼티와 메소드를 제공하는 레퍼(wrapper) 객체이다.
>
>**변수 또는 객체의 프로퍼티가 숫자를 값**으로 **가지고** 있다면 Number 객체의 별도 생성없이 **Number 객체의 프로퍼티와 메소드를 사용할 수 있다.**

```javascript
var num = 1.5;
console.log(num.toFixed()); // 2
```

위에서 원시 타입을 담고 있는 변수 num이 Number.prototype.toFixed() 메소드를 호출할 수 있는 것은 변수 num의 값이 일시적으로 wrapper객체로 변환되었기 때문이다.

<br/>

### Numver Constructor

Number 객체는 Number() 생성자 함수를 통해 생성할 수 있다. (new는 생략할 수 있다.)

만일 인자가 숫자로 변환될 수 없다면 NaN을 반환한다.

```javascript
var x = new Number(123);
var y = new Number('123');
var z = new Number('str');

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN

var o = Number('123');

console.log(typeof o, o); // number 123
```

<br/>

####  Number() 생성자 함수를 통해서 만들어진 Number 객체는 객체다.

일반적으로 숫자를 사용할 때는 원시 타입 숫자를 사용한다.

```javascript
var x = 123;
var y = new Number(123);

console.log(x == y);  // true
console.log(x === y); // false

console.log(typeof x); // number
console.log(typeof y); // object
```

<br/>

### Number Property

#### Number.EPSILON 

> Number.EPSILON은 JavaScript에서 표현할 수 있는 가장 작은 수이다. (ES6)
>
>  Number.EPSILON은 약 2.2204460492503130808472633361816E-16 또는 2-52이다.

<br/>

#### Number.MAX_VALUE || Number.MIN_VALUE

> Number.MAX_VALUE는 JavaScript에서 Infinity를 제외한 표현할 수 있는 가장 큰 수 이다. 
>
> Number.MAX_VALUE는 가장 큰 숫자(1.7976931348623157e+308)를 반환한다. 
>
> Number.MIN_VALUE는 JavaScript에서 사용 가능한 가장 작은 숫자(5e-324)를 반환한다.
>
> MIN_VALUE는 0에 가장 가까운 양수 값이다. MIN_VALUE보다 작은 숫자는 0으로 변환된다.

~~~~javascript
Number.MAX_VALUE; // 1.7976931348623157e+308

var num = 10;
num.MAX_VALUE;    // undefined

console.log(Infinity > Number.MAX_VALUE); // true
----------------------------------------------------
Number.MIN_VALUE; // 5e-324

var num = 10;
num.MIN_VALUE;    // undefined

console.log(Number.MIN_VALUE > 0); // true
~~~~

<br/>

#### Number.POSITIVE_INFINITY 

양의 무한대 `Infinity`를 반환한다.

```javascript
Number.POSITIVE_INFINITY // Infinity

var num = 10;
num.POSITIVE_INFINITY;   // undefined
```

<br/>

#### Number.NEGATIVE_INFINITY 

음의 무한대 `-Infinity`를 반환한다.

```javascript
Number.NEGATIVE_INFINITY // -Infinity

var num = 10;
num.NEGATIVE_INFINITY;   // undefined
```

<br/>

#### Number.NaN 

숫자가 아님(Not-a-Number)을 나타내는 숫자값이다. Number.NaN 프로퍼티는 window.NaN 프로퍼티와 같다.

```javascript
console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

<br/>

###  Number Method

#### Number.isFinite(testValue: number): boolean ES6

> 매개변수에 전달된 값이 정상적인 유한수인지를 검사하여 그 결과를 Boolean으로 반환한다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적 형변환되지 않는다.
 * @return {boolean}
 */
Number.isFinite(testValue)
```

Number.isFinite()는 전역 함수 isFinite()와 차이가 있다. 

전역 함수 isFinite()는 인수를 숫자로 변환하여 검사를 수행하지만 Number.isFinite()는 인수를 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false가 된다.

<br/>

#### Number.isInteger(testValue: number): boolean ES6

>  매개변수에 전달된 값이 정수(Integer)인지 검사하여 그 결과를 Boolean으로 반환한다. 
>
> 검사전에 인수를 숫자로 변환하지 않는다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적 형변환되지 않는다.
 * @return {boolean}
 */
Number.isInteger(testValue)

```

<br/>

#### Number.isNaN(testValue: number): boolean ES6

> 매개변수에 전달된 값이 NaN인지를 검사하여 그 결과를 Boolean으로 반환한다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적 형변환되지 않는다.
 * @return {boolean}
 */
Number.isNaN(testValue)

```

Number.isNaN()는 전역 함수 isNaN()와 차이가 있다. 

전역 함수 isNaN()는 인수를 숫자로 변환하여 검사를 수행하지만 Number.isNaN()는 인수를 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false가 된다.

<br/>

#### Number.isSafeInteger(testValue: number): boolean ES6

>  매개변수에 전달된 값이 안전한(safe) 정수값인지 검사하여 그 결과를 Boolean으로 반환한다. 
>
> 안전한 정수값은 -(253 - 1)와 253 - 1 사이의 정수값이다. 검사전에 인수를 숫자로 변환하지 않는다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적 형변환되지 않는다.
 * @return {boolean}
 */
Number.isSafeInteger(testValue)

```

<br/>

#### Number.prototype.toExponential(fractionDigits?: number): string ES3

>  대상을 지수 표기법으로 변환하여 문자열로 반환한다. 지수 표기법이란 매우 큰 숫자를 표기할 때 주로 사용하며 e(Exponent) 앞에 있는 숫자에 10의 n승이 곱하는 형식으로 수를 나타내는 방식이다.

```javascript
1234 = 1.234e+3
/**
 * @param {number} [fractionDigits] - 0~20 사이의 정수값으로 소숫점 이하의 자릿수를 나타낸다. 옵션으로 생략 가능하다.
 * @return {string}
 */
numObj.toExponential([fractionDigits])

```

<br/>

#### 정수 리터럴과 함께 메소드를 사용할 경우. 주의점

```javascript
77.toString(); // SyntaxError: Invalid or unexpected token

```

의 경우 `.`이 소숫점인지 아닌지 모르기 때문에 에러를 일으킨다. 따라서 다음과 같은 방법을 권장한다.

```javascript
(77).toString(); // '77'

```

<br/>

#### Number.prototype.toFixed(fractionDigits?: number): string ES3

매개변수로 지정된 소숫점자리를 반올림하여 문자열로 반환한다.

```javascript
/**
 * @param {number} [fractionDigits] - 0~20 사이의 정수값으로 소숫점 이하 자릿수를 나타낸다. 기본값은 0이며 옵션으로 생략 가능하다.
 * @return {string}
 */
numObj.toFixed([fractionDigits])

```

~~~javascript
var numObj = 12345.6789;

// 소숫점 이하 반올림
console.log(numObj.toFixed());   // '12346'
// 소숫점 이하 1자리수 유효, 나머지 반올림
console.log(numObj.toFixed(1));  // '12345.7'
// 소숫점 이하 2자리수 유효, 나머지 반올림
console.log(numObj.toFixed(2));  // '12345.68'
// 소숫점 이하 3자리수 유효, 나머지 반올림
console.log(numObj.toFixed(3));  // '12345.679'
// 소숫점 이하 6자리수 유효, 나머지 반올림
console.log(numObj.toFixed(6));  // '12345.678900'

~~~

<br/>

#### Number.prototype.toString(radix?: number): string ES1

숫자를 문자열로 변환하여 반환한다.

```javascript
/**
 * @param {number} [radix] - 2~36 사이의 정수값으로 진법을 나타낸다. 옵션으로 생략 가능하다.
 * @return {string}
 */
numObj.toString([radix])

```

~~~javascript
var count = 10;
console.log(count.toString());   // '10'
console.log((17).toString());    // '17'
console.log(17 .toString());     // '17'
console.log((17.2).toString());  // '17.2'

var x = 16;
console.log(x.toString(2));       // '10000'
console.log(x.toString(8));       // '20'
console.log(x.toString(16));      // '10'

console.log((254).toString(16));  // 'fe'
console.log((-10).toString(2));   // '-1010'
console.log((-0xff).toString(2)); // '-11111111'

~~~

<br/>

#### Number.prototype.valueOf(): number ES1

Number 객체의 원시 타입 값(primitive value)을 반환한다.

```javascript
var numObj = new Number(10);
console.log(typeof numObj); // object

var num = numObj.valueOf();
console.log(num);           // 10
console.log(typeof num);    // number

```