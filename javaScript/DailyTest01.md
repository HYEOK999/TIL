<img src="https://c.pxhere.com/photos/17/91/book_page_open_book_reading_french_culture-523122.jpg!d" alt="test" style="zoom: 50%;" />

---------

## JavaScript Weekly Test 오답 및 개념 재정리

1. **Javascript vs ECMAScript**

   <img src="https://poiemaweb.com/assets/fs-images/3-1.png" alt="JS vs ECMAScript" style="zoom:50%;" />

ECMAScript는 자바스크립트의 표준 사양인 ECMA-262 이다.
ECMAScript는 자바스크립트의 모든 영역을 담고 잇는 것이 아니라.
통상영역만 담고 있다.
es6, es5 등등 ECMASciprt의 사양을 의미한다.

<br/>

JS는 ECMAscript를 포함한 클라이언트 사이드 web api이다.
(그래서 JS를 탑재한 브라우저는 노드는 쓸 수 없는 dom , fetch 등의 API를 다룰 수 있다. )

<br/>

2. **변수란?**

   변할 수 있는 하나의 값을 담는 메모리 공간 그 자체.
   
   하나의 값을 저장하기 위해 메모리 공간에 붙인 이름.

<br/>

3. **javascript 데이터 타입**

   문자열 , 숫자 , symbol, undefined, null, boolean, 객체

<br/>

4. **리터럴이란 무엇인가?**
  
   사람이 알아볼 수 있는 언어로 값의 생성을 명령하는 것
   

<br/>

5. **var foo = 42 / -0; console.log(foo);**

   -Infinity 음의 무한대, 

   *추가정리 :* 

   숫자 타입의 3가지 특별한 **값**

   1. Infinity : 양의 무한대 // (10/0);

   2. -Infinity : 음의 무한대 // (10 / -0); 

   3. NaN : 산술 연산 불가(not-a-number) // (1 * 'String'); 

      <br/>

6. **var x = 5;일 때, console.log(x != '5'); 의 결과는 무엇인가?**

   false

   *추가정리:*

   `==` 혹은 `!=`은 비교할 때 데이터타입을 암묵적으로 맞추어서 비교를 하려고 한다.(에러 방지하기 위함)

   따라서 변수 x 와 문자열 5의 값을 비교할때 타입은 맞춰서 비교를 하기에 둘의 값은 같다.

   따라서 답이 같이 않냐고 물었기 때문에 false를 반환한다.

   만약, 타입 조차 비교를 하고 싶다면 `==`이 아닌 `===`을 사용해야만 한다.

   <br/>
   
7. **var foo = false && 'Cat'; 일 때, foo 의 값은 무엇인가?**
  
  false 
  
  <br/>
  
8. **console.log(!!null);**
  
true
  
  *추가정리:*
  
  **false 값들**
  
  1. 빈문자열 `''`
  2. undefined
  3. null
  4. NaN
  5. 0, -0
  6. false
  
  <br/>