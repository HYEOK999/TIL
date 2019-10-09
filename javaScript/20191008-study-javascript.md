![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)



------

## JavaScript Study 05

- 용어
- 제어문
  - 블록문
  - 조건문
    1. if ~ else , else if
    2. switch( )
  - 반복문
    1. for 문
    2. while 문
    3. do~while 문
  - break 문
    - 레이블문
  - continue 문
- 타입변환
  - (암묵적) 문자열 타입 변환
  - (암묵적) 숫자 타입 변환
  - (암묵적) 불리언 타입 변환
  - (명시적) 문자열 타입 변환

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 제어문 예제 ( 16가지 )

<br/>

------

## 제어문

<br/>

### 블록문

> 0개 이상의 `{ }` 로 묶은 것으로 코드 블록 또는 블록이라고 부른다. **( 하나의 실행단위 )**

<br/>

### 조건문 

> 주어진 조건식의 평가 결과에 따라 코드 블럭의 실행을 결정한다.

- `if ... else` 문
- `swith` 문

#### 1. if ~ else , else if

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}			
```

**else if 문과 else 문은 옵션으로 사용할 수도 있고 사용하지 않을 수도 있다. **

**if 문과 else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용할 수 있다.**

<br/>

#### 2. switch( ) 

```javascript
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
```

**switch문은 반드시 `break;` 동반 해야만 한다. **  

`break;`가 없다면 맞는 조건이어도 다음 case 표현식으로 넘어가게 된다. default에는 `break;` 생략이 가능하다.

<br/>

### 반복문

> 주어진 조건식의 평가 결과가 참인 경우 코드 블럭을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.
>
> for ( for-in, for-of ) , while , do~while

<br/>



#### 1. for문

```javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
```

for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다.

만약 , 모두 비워있다면 무한 루프가 된다.

```javascript
for(;;){
	내용;
}
```

예제, 중첩 for문을 이용한 주사위 눈 합

```javascript
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}
```

<br/>

**자바스크립트에서 for문 대체 함수들**

​	실무에서는 반복문 대신 아래 함수들을 더 많이 사용한다. 왠만해서는 가독성이 안좋다는 이유로 인해 반복을 안쓰려한다.
 다만, 기본적인 for문을 다룰줄 알아야 아래 기능들에 대해 더 쉽게 이해가 가능하다.

- forEach
- map
- filter
- find
- reduce

<br/>

#### 2. while 문

```javascript
while (조건식) {
  조건식이 참인 경우 반복 실행될 문;
} 
```

while문은 조건식이 `true`라면 무한루프가 된다.

```javascript
// 무한루프
while (true) { ... }
```

무한 루프를 탈출 하기 위해서는 특정조건으로 인한 `break;` 를 추가하여야 한다.

<br/>

#### 3. do...while 문

```javascript
do{
	최소 1번은 실행되고 그 후부터는 조건에 맞을 경우 반복 실행된다.
} while (조건식);
```

`do...while`문은 최소 1번은 실행된 뒤 조건을 판별하여 게속해서 반복할지 안할지 유무를 결정한다.

<br/>

### break 문

> 가장 가까운 레이블 문, 반복문( for, for-in, for-of, while, do...while ) 또는 switch문의 코드 블록을 탈출한다.
>
> 이외에 문에서 사용시 SyntaxError를 유발한다.

<br/>

**레이블 문이란?**

- 식별자가 붙은 문을 의미한다.

```javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');
```

**레이블문은 중첩for문에서 외부for문까지 한번에 빠져나가고자 할 때 이용한다.**

```javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log('inner ' + j);
  }
}

console.log('Done!');
```

<br/>

### continue 문

> continue 문은 현재 진행되고 있는 반복문의 증감식을 중단하고 다음 증감식으로 이동한다.
>
> break문과 다르게 반복문을 탈출하지 않는다.

<br/>

### 문자열

자바스크립트의 문자열은 `유사 배열`이다. 
객체를 배열처럼 사용하는 것은 `유사 배열` 이다.
배열은 `원시값` + `객체`이다.
문자열(배열)을 만들고서 .을 찍어보면 프로퍼티가 나온다.
즉, 문자열은 `유사배열`이다.
따라서 문자열을 for문으로 접근하여 1문자씩 읽어들일 수 있다.

![문자열-객체증거](https://user-images.githubusercontent.com/31315644/66377734-26dc3f00-e9ed-11e9-86ee-45e6c68bb90f.jpeg)

<br/>

## 타입 변환

- 명시적 타입 변환 ( 타입 캐스팅 ) : 개발자에 의도하에 값의 타입을 변환하는 것.
- 암묵적 타입 변환 ( 강제 타입 변환 ) : 개발자에 의도하는 관계 없이 JS엔진에 의해 타입이 자동으로 변환되는 것.

~~~javascript
// 명시적 타입 변환
var x = 10;
var str = x.toString(); // '10';

// 암묵적 타입 변환
var x = 10;
var str = x + ''; // '10';
~~~

<br/>

#### 연산자의 부수효과

​	연산자 중 유일하게 피연산자의 값을 변경하는 연산자는 증가 `++` 와 감소 `--`밖에 없다.

<br/>

암묵적 타입변환을 예상하는 방법. 

어떻게해야 자바스크립트 엔진이 해당 구문을 보고 에러를 내지않을까? 라는 취지로 접근한다.

예 )

~~~javascript
// 피연산자가 모두 문자열 타입이여야 하는 문맥
'10' + 2  // '102'

// 피연산자가 모두 숫자 타입이여야 하는 문맥
5 * '10'  // 50

// 피연산자 또는 표현식이 불리언 타입이여야 하는 문맥
!0 // true
if (1) { }
~~~

<br/>

### (암묵적) 문자열 타입으로 변환

~~~javascript
1 + '2' // '12'
console.log(`1 + 1 = ${1 + 1}`); // "1 + 1 = 2" 문자열 인터폴레이션 ${ 표현식 }
~~~

<br/>

### (암묵적) 숫자 타입으로 변환

`-` `*` 는 대부분의 문자열을 숫자 타입으로 암묵적 타입변환시킨다.

~~~javascript
1 - '1'    // 0
1 * '10'   // 10
1 / 'one'  // NaN
~~~

<br/>

#### + 추가

`>` `<` `=` 등의 비교 연산자 또한 숫자타입으로 변환시킬 때도 있다. (다만, 이러한 경우가 최대한 안나오게 해야한다. 안좋은 코드)

~~~ javascript
'1' > 0   // true
~~~

#### ++추가 단항 연산자를 이용하여 문자열 변환

~~~javascript
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
~~~

<br/>

### (암묵적) 불리언 타입으로 변환

불리언 값으로 평가되어야 할 문맥에서 false로 평가되는 Falsy 값이다.

- false
- undefined
- null
- 0, -0
- NaN
- ’’ (빈문자열)

<br/>

### (명시적) 문자열 타입으로 변환

문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은 아래와 같다.

1. String 생성자 함수를 new 연산자 없이 호출하는 방법 ( 실무에서 잘 사용 안함 )
2. Object.prototype.toString 메소드를 사용하는 방법 ( 실무에서 잘 사용 안함 )
3. **문자열 연결 연산자를 이용하는 방법** = (암묵적) 경험자 입장에서 제일 가독성이 뛰어남.

~~~~javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
console.log(String(1));        // "1"
console.log(String(NaN));      // "NaN"
console.log(String(Infinity)); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log(String(true));     // "true"
console.log(String(false));    // "false"

// 2. Object.prototype.toString 메소드를 사용하는 방법
// 숫자 타입 => 문자열 타입
console.log((1).toString());        // "1"
console.log((NaN).toString());      // "NaN"
console.log((Infinity).toString()); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log((true).toString());     // "true"
console.log((false).toString());    // "false"

// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
console.log(1 + '');        // "1"
console.log(NaN + '');      // "NaN"
console.log(Infinity + ''); // "Infinity"
// 불리언 타입 => 문자열 타입
console.log(true + '');     // "true"
console.log(false + '');    // "false"
~~~~

