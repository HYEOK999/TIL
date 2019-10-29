![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 17

- 용어

- String 생성자 함수

  - 문자열은 유사배열 객체 + 이터러블

  - 문자열 명시적 타입 변환 (new 없이 사용했을 때)

  - length 프로퍼티

  - String 메서드

    - indexOf
    - includes

    - charat
    - replace
    - split
    - substring
    - trim
    - repeat
    - include

- Date 객체

  - new Date()
  - new Date(milliseconds)
  - new Date(dateString)
  - new Date(year, month[, day, hour, minute, second, millisecond])
  - Date 생성자 함수를 new 연산자없이 호출

- DOM

  - DOM 트리

- DOM 검색

  - 하나의 요소 노드 선택
  - 여러개의 요소 노드 선택

- DOM 탐색

- DOM Manipulation (조작)

  - 텍스트 노드에의 접근/수정
  - 어트리뷰트 노드에의 접근/수정
  - HTML 콘텐츠 조작(Manipulation)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- String 생성자

- String 메서드

- lenght 프로퍼티

- DOM 객체

- DOM 트리

- DOM 검색 ,탐색 ,조작

  <br/>

---------

## String 생성자 함수

- 표준 빌트인 객체인 String 객체는 생성자 함수 객체이다. 
- 따라서 new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있다.
- String 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[StringData]] 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성한다.

```javascript
const strObj = new String('Lee');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length: 3, [[PrimitiveValue]]: "Lee"}
strObj.valueOf(); //'Lee'
```

위 예제를 크롬 브라우저의 개발자 도구에서 실행해보면 [[PrimitiveValue]]라는 프로퍼티가 보인다. 
이는 [[StringData]] 내부 슬롯을 가리킨다. ES5에서는 [[StringData]]을 [[PrimitiveValue]]이라 불렸다.

1. String 생성자 함수에 문자열을 인수로 전달 ( 문자열이 아니라면 문자열로 강제 변환한다. )
2. [[StringData]] 내부 슬롯에 인수로 전달받은 문자열을 할당
3. String 래퍼 객체를 생성한다.

<br/>

### 문자열은 유사배열 객체 + 이터러블

~~~javascript
console.log(strObj[0]); // L
~~~

<br/>

### 문자열 명시적 타입 변환 (new 없이 사용했을 때)

명시적 타입 변환 : new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 인스턴스가 아닌 문자열을 반환한다. 

```javascript
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"

// 불리언 타입 => 문자열 타입
String(true);  // -> "true"
String(false); // -> "false"
```

<br/>

### length 프로퍼티

length 프로퍼티는 문자열의 문자 개수를 반환한다.

```javascript
'Hello'.length;    // -> 5
'안녕하세요!'.length; // -> 6
```

문자열 레퍼 객체는 배열과 마찬가지로 length 프로퍼티를 갖는다. 
그리고 인덱스를 나타내는 숫자를 프로퍼티 키로, 각 문자를 프로퍼티 값으로 가지므로 문자열 레퍼 객체는 유사 배열 객체이다.

<br/>

### String 메서드

#### indexOf

- 첫번쨰 인수로 전달한 문자열을 검색해 첫번쨰 인덱스를 반환. 검색 실패시 -1을 반환
- 두번째 인수는 생략가능. 시작할 인덱스를 전달 가능하다.

~~~javascript
const str = 'Hello World';

// 문자열 str에서 'l'을 검색하여 첫번째 인덱스를 반환한다.
let index = str.indexOf('l');
console.log(index); // 2

// 문자열 str에서 'or'을 검색하여 첫번째 인덱스를 반환한다.
index = str.indexOf('or');
console.log(index); // 7

// 문자열 str에서 'x'를 검색하여 첫번째 인덱스를 반환한다.
// 검색에 실패하면 -1을 반환한다.
index = str.indexOf('x');
console.log(index); // -1

// 문자열 str의 인덱스 3부터 'l'을 검색하여 첫번째 인덱스를 반환한다.
index = str.indexOf('l', 3);
console.log(index); // 3
~~~

<br/>

#### includes

- 첫번쨰 인수로 전달한 문자열이 포함되어 있는지 확인하여 그 결과를 true 또는 false로 반환한다.
- 두번째 인수는 생략가능. 시작할 인덱스를 전달 가능하다.

```javascript
const str = 'Hello world';

str.includes('Hello'); // -> true
str.includes('');      // -> true
str.includes('x');     // -> false
str.includes();        // -> false

// String.prototype.indexOf 메소드로 대체할 수 있다.
console.log(str.indexOf('hello')); // 0
```

<br/>

#### charat

- charAt 메소드는 인수로 전달한 인덱스에 위치한 문자를 반환한다.
- 인덱스는 문자열의 범위, 즉 0 ~ (문자열 길이 - 1) 사이의 정수이어야 한다. 
- 인덱스가 문자열의 범위를 벗어난 정수인 경우, 빈문자열을 반환한다.

```javascript
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
```

<br/>

#### replace

- 원본 문자열을 변경한다.
- 첫번째 인수 - 문자열 또는 정규 표현식 : 검색할 문자열 , 여러개인 경우 1개만 반환
- 두번째 인수 - 문자열 또는 치환 함수 : 바꿀 문자열 , 특수패턴 : $&는 검색된 문자열을 의미

~~~javascript
const str = 'Hello world';

// 첫번째로 검색된 문자열만 대체하여 새로운 문자열을 반환한다.
console.log(str.replace('world', 'Lee')); // Hello Lee
~~~

문자열.match(정규표현식)은 해당 정규표현식 조건에 해당되는 문자열을 찾아서 반환한다.

~~~javascript
// camelCase => snake_case
function camelToSnake(camelCase) {
  // /.[A-Z]/g => 문자와 대문자로 이루어진 문자열 검색
  // 두번째 인수로 치환 함수를 전달할 수 있다.
  return camelCase.replace(/.[A-Z]/g, match => {
    console.log(match); // 'oW'
    return match[0] + '_' + match[1].toLowerCase();
  });
}

const camelCase = 'helloWorld';
camelToSnake(camelCase); // -> 'hello_world'

// snake_case => camelCase
function snakeToCamel(snakeCase) {
  // /_[a-z]/g => _와 소문자로 이루어진 문자열 검색
  // 두번째 인수로 치환 함수를 전달할 수 있다.
  return snakeCase.replace(/_[a-z]]/g, match => {
    console.log(match); // '_w'
    return match[1].toUpperCase();
  }); // helloWorld
}

const snakeCase = 'hello_world';
snakeToCamel(snakeCase); // -> 'helloWorld'
~~~

<br/>

#### split

- 원본 문자열은 변경되지 않는다.
- 첫번째 인수로 전달한 문자열 또는 정규표현식을 대상 문자열에서 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환한다. 

~~~javascript
/**
 * @param {string | RegExp} [separator] - 구분 대상 문자열 또는 정규표현식
 * @param {number} [limit] - 구분 대상수의 한계를 나타내는 정수
 * @return {string[]}
 */
str.split([separator[, limit]])
~~~

~~~javascript
const str = 'How are you doing?';

// 공백으로 구분(단어로 구분)하여 배열로 반환한다
console.log(str.split(' ')); // [ 'How', 'are', 'you', 'doing?' ]

// 정규 표현식
console.log(str.split(/\s/)); // [ 'How', 'are', 'you', 'doing?' ]

// 인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.
console.log(str.split()); // [ 'How are you doing?' ]

// 각 문자를 모두 분리한다
console.log(str.split('')); // [ 'H','o','w',' ','a','r','e',' ','y','o','u',' ','d','o','i','n','g','?' ]

// 공백으로 구분하여 배열로 반환한다. 단 요소수는 3개까지만 허용한다
console.log(str.split(' ', 3)); // [ 'How', 'are', 'you' ]

// 'o'으로 구분하여 배열로 반환한다.
console.log(str.split('o')); // [ 'H', 'w are y', 'u d', 'ing?' ]
~~~

<br/>

#### substring

- 첫번째 인수의 값 부터 두번째 인수의 바로 전(두번쨰 인수는 미포함)까지 위치한 부분 문자열을 반환한다.
- 두번쨰 인수는 생략이 가능하다. 첫번쨰 인수의 값부터 끝까지 반환한다.
- 원본 배별은 변하지 않는다.
- 인수가 0보다 작거나 NaN 일경우, 강제로 0 취급
- 인수가 문자열의 길이보다 클 경우 그 인수는 문자열의 길이로 취급.
- **slice와 거의 동일하게 동작하나 slice는 음수일 경우 뒤부터 음수만큼 복사해서 반환한다.**

~~~javascript
const str = 'Hello World';

// 인덱스 1부터 인덱스 4 이전까지의 부분 문자열을 반환한다.
str.substring(1, 4); // -> ell
str.substring(1); // -> 'ello World'
~~~

<img src="https://poiemaweb.com/assets/fs-images/string-1.png" alt="img" style="zoom:50%;" />

<br/>

#### trim

- 대상 문자열 양쪽 끝에 있는 공백 문자를 제거한 문자열을 반환한다.

~~~~javascript
const str = '   foo  ';

console.log(str.trim()); // 'foo'

// String.prototype.replace
console.log(str.replace(/\s/g, ''));   // 'foo'
console.log(str.replace(/^\s+/g, '')); // 'foo  '
console.log(str.replace(/\s+$/g, '')); // '   foo'

// String.prototype.{trimStart,trimEnd} : Proposal stage 3
console.log(str.trimStart()); // 'foo  '
console.log(str.trimEnd());   // '   foo'
~~~~

<br/>

#### repeat

- 인수로 전달한 정수만큼 반복해 연결한 새로운 문자열을 반환한다.
- 인수로 전달한 정수가 0이면 빈 문자열을 반환 , 음수면 RangeError 발생

~~~javascript
const str = 'abc';

str.repeat(0);   // -> ''
str.repeat(1);   // -> 'abc'
str.repeat(2);   // -> 'abcabc'
str.repeat(2.5); // -> 'abcabc' (2.5 → 2)
str.repeat(-1);  // -> RangeError: Invalid count value
~~~

<br/>

## Date 객체

날짜 시간 요일 까지 제공하는 빌트인 객체이면서 생성자 함수.

Date 생성자 함수로 생성한 Date 객체는 내부적으로 숫자값을 갖는다. 

이 값은 1970년 1월 1일 00:00(UTC)을 기점으로 현재 시간까지의 밀리초를 나타낸다.

한국시간(KST) 는 UTC보다 9시간이 빠르다.

<br/>

### new Date()

**인수를 전달하지 않으면 현재 날짜와 시간을 가지는 인스턴스를 반환**한다.

```javascript
const date = new Date();
console.log(date); // Thu May 16 2019 17:16:13 GMT+0900 (한국 표준시)
```

<br/>

### new Date(milliseconds)

인수로 숫자 타입의 밀리초를 전달하면 1970년 1월 1일 00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 가지는 인스턴스를 반환한다.

<br/>

### new Date(dateString)

- **인수로 날짜와 시간을 나타내는 문자열을 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환**한다. 
- 인수로 전달한 문자열은 Date.parse 메소드에 의해 해석 가능한 형식이어야 한다.

```javascript
let date = new Date('May 16, 2019 17:22:10');
console.log(date); // Thu May 16 2019 17:22:10 GMT+0900 (한국 표준시)

date = new Date('2019/05/16/17:22:10');
console.log(date); // Thu May 16 2019 17:22:10 GMT+0900 (한국 표준시)
```

<br/>

### new Date(year, month[, day, hour, minute, second, millisecond])

- 인수로 년, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환한다. 
- 이때 년, 월은 반드시 지정하여야 한다. 지정하지 않은 옵션 정보는 0 또는 1으로 초기화된다.

인수는 다음과 같다.

| 인수        | 내용                                                         |
| :---------- | :----------------------------------------------------------- |
| year        | 1900년 이후의 년                                             |
| month       | 월을 나타내는 **0 ~ 11**까지의 정수 (주의: 0부터 시작, 0 = 1월) |
| day         | 일을 나타내는 1 ~ 31까지의 정수                              |
| hour        | 시를 나타내는 0 ~ 23까지의 정수                              |
| minute      | 분을 나타내는 0 ~ 59까지의 정수                              |
| second      | 초를 나타내는 0 ~ 59까지의 정수                              |
| millisecond | 밀리초를 나타내는 0 ~ 999까지의 정수                         |

년, 월을 지정하지 않은 경우 1970년 1월 1일 00:00(UTC)을 가지는 인스턴스를 반환한다.

```javascript
// 월을 나타내는 4는 5월을 의미한다.
// 2019/5/1/00:00:00:00
let date = new Date(2019, 4);
console.log(date); // Wed May 01 2019 00:00:00 GMT+0900 (한국 표준시)

// 월을 나타내는 4는 5월을 의미한다.
// 2019/5/16/17:24:30:00
date = new Date(2019, 4, 16, 17, 24, 30, 0);
console.log(date); // Thu May 16 2019 17:24:30 GMT+0900 (한국 표준시)

// 가독성이 훨씬 좋다.
date = new Date('2019/5/16/17:24:30:10');
console.log(date); // Thu May 16 2019 17:24:30 GMT+0900 (한국 표준시)
```

<br/>

### Date 생성자 함수를 new 연산자없이 호출

Date 생성자 함수를 new 연산자없이 호출하면 인스턴스를 반환하지 않고 결과값을 문자열로 반환한다.

```javascript
let date = Date();
console.log(typeof date, date); // string Thu May 16 2019 17:33:03 GMT+0900 (한국 표준시)
```

<br/>

## DOM

- HTML 파서가 HTML을 분석해서 결과물을 만들어내는 것이 DOM tree. 
- HTML 문법은 중첩관계 표현 가능하다. 
- 태그들 사이에 다른 요소가 올 수 있다. 
- 요소 안에 요소가 중첩되는 관계를 통해 트리를 만들 수 있음 (부자-자식 관계)
- CSS는 부자-자식 관계가 없고 룰셋이 중첩되거나 하지는 않는다. CSS는 HTML 없으면 무용지물. 
- CSSOM tree 는 DOM tree에 종속적이다. 

`<head>` 태그 안의 내용은 브라우저를 위한 정보를 적어준다.

`<script>`태그도 `<head>`에게 적어주는 것이 맞으나, 이럴경우 `<script>`가 블락당할 수 있으니 `body`아래에 적어준다.

<br/>

DOM은 콘솔창 ➤ Properties 에 들어가야 확인 할 수 있다.

![DOMM](https://user-images.githubusercontent.com/31315644/67741128-78f80980-fa5b-11e9-974c-04f7ffaf4b81.jpeg)

어트리뷰트와 DOM 요소는 항상 1대1 매칭되지 않는다. (예를들어 class, cal, span는 프로퍼티가 없다.)

- `html` 의  `id`, `class` 어트리뷰트의 값의 네이밍은 케밥케이스 , 카멜케이스가 통상적이다.
- `class`는 예전 버전에는 `className`에 문자열 형태로 추가되는 식이었기 때문에 `split()`를 이용해 하나하나 잘라내서 접근해야됬지만, 현재는 `classList`라는 객체를 통해서 관리되기 떄문에 더욱 간편해졌다.
- 태그 요소의 특정 속성들의 하위 자식들에게 상속될 수 있다. ( ul ➤ li : `<style = "color:red">` )
- 어트리뷰트는 프로퍼티와 구조가 다르다. (어트리뷰트 != 프로퍼티)
- 어트리뷰트 class != className , classList
- DOM 객체는 전부 window에 들어있다.

<br/>

### DOM 트리

<img src="https://poiemaweb.com/img/dom-tree.png" alt="DOM tree" style="zoom:48%;" />

- DOM 객체는 전부 `window`에 들어있다.

- DOM트리의 진입점은 항상 `document`다.

- 각각의 가지들을 '노드' 라 한다.

- DOM tree에 접근하기 위한 시작점인 노드를 '문서노드'라 한다.

- html 태그 내의 요소와 1:1 맵핑하는 노드를 '요소노드'라 한다.

- html 태그 내의 요소의 어트리뷰트와 1:1 맵핑하는 노드를 '어트리뷰트 노드'라 한다. 어트리뷰트노드는 형제 노드다.

- html 태그 내의 요소 안의 텍스트들과 1:1 맵핑하는 노드를 '텍스트 노드'라 한다. 텍스트노드는 자식 노드다.

- 아래는 DOM tree의 객체 구조다.

  ![Element Node](https://poiemaweb.com/img/HTMLElement.png)

<br/>

## DOM 검색

특정 요소에 접근하는 것을 의미.

<br/>

### 하나의 요소 노드 선택

[document.getElementById(id)](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementById)

- id 어트리뷰트 값으로 요소 노드를 한 개 선택한다. 복수개가 선택된 경우, 첫번째 요소만 반환한다.
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작
- id는 전역으로 만들어지기 때문에 이 방법은 추천하지 않는다.

<br/>

[document.querySelector(cssSelector)](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector)

- CSS 셀렉터를 사용하여 요소 노드를 한 개 선택한다. 복수개가 선택된 경우, 첫번째 요소만 반환한다.
- Return: HTMLElement를 상속받은 객체
- IE8 이상의 브라우저에서 동작
- 배열메소드들이 더 다양하기 떄문에 배열로 변경하여 사용하면 좋다.

<br/>

### 여러 개의 요소 노드 선택

[document.getElementsByClassName(class)](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementsByClassName)

- class 어트리뷰트 값으로 요소 노드를 모두 선택한다. 공백으로 구분하여 여러 개의 class를 지정할 수 있다.
- Return: HTMLCollection (live) ➤ 매우 큰 혼란을 준다.
- IE9 이상의 브라우저에서 동작
- 사용 금지

<br/>

[document.querySelectorAll(selector)](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelectorAll)

- 지정된 CSS 선택자를 사용하여 요소 노드를 모두 선택한다.
- Return: [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList) (non-live)
- IE8 이상의 브라우저에서 동작
- 배열메소드들이 더 다양하기 떄문에 배열로 변경하여 사용하면 좋다.

~~~javascript
// querySelectorAll는 Nodelist(non-live)를 반환한다. IE8+
const elems = document.querySelectorAll('.red');

// 배열메소드들이 더 다양하기 떄문에 배열로 변경하여 사용하면 좋다.
[...elems].forEach(elem => elem.className = 'blue');
~~~

<br/>

## DOM 탐색

​	DOM 검색 하여 특정 요소에 접근하여 그 요소에 대한 부모 형제 자식 등을 찾아가는 것을 의미.

<br/>

[parentNode](https://developer.mozilla.org/ko/docs/Web/API/Node/parentNode) - 부모

- 부모 노드를 탐색한다.
- Return: HTMLElement를 상속받은 객체
- 모든 브라우저에서 동작

[firstChild](https://developer.mozilla.org/ko/docs/Web/API/Node/firstChild), [lastChild](https://developer.mozilla.org/ko/docs/Web/API/Node/lastChild) - 자식

- **텍스트노드를 포함한 자식 노드를 탐색한다.**
- Return: HTMLElement를 상속받은 객체
- IE9 이상의 브라우저에서 동작
- 위 두개의 프로퍼티는 각각 텍스트노드를 못건너뛰기 때문에 [firstElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild), [lastElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/lastElementChild)를 사용한다.

[hasChildNodes()](https://developer.mozilla.org/ko/docs/Web/API/Node/hasChildNodes) - 자식

- 자식 노드가 있는지 확인하고 Boolean 값을 반환한다.
- Return: Boolean 값
- 모든 브라우저에서 동작

[childNodes](https://developer.mozilla.org/ko/docs/Web/API/Node/childNodes) - 자식

- 자식 노드의 컬렉션을 반환한다. **텍스트 요소를 포함한 모든 자식 요소를 반환한다.**
- Return: [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList) (non-live)
- 모든 브라우저에서 동작

[children](https://developer.mozilla.org/ko/docs/Web/API/ParentNode/children) - 자식

- 자식 노드의 컬렉션을 반환한다. **자식 요소 중에서 Element type 요소만을 반환한다.**
- Return: [HTMLCollection](https://developer.mozilla.org/ko/docs/Web/API/HTMLCollection) (live)
- IE9 이상의 브라우저에서 동작

[previousSibling](https://developer.mozilla.org/ko/docs/Web/API/Node/previousSibling), [nextSibling](https://developer.mozilla.org/ko/docs/Web/API/Node/nextSibling) - 형제

- 형제 노드를 탐색한다. 
- **text node를 포함한 모든 형제 노드를 탐색한다.**
- Return: HTMLElement를 상속받은 객체모든 브라우저에서 동작

[previousElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling), [nextElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling) - 형제

- 형제 노드를 탐색한다. 
- **형제 노드 중에서 Element type 요소만을 탐색한다.**
- Return: HTMLElement를 상속받은 객체IE9 이상의 브라우저에서 동작

```javascript
const elem = document.querySelector('ul');

elem.firstElementChild.nextElementSibling.className = 'blue';
elem.firstElementChild.nextElementSibling.previousElementSibling.className = 'blue';
```

<br/>

## DOM Manipulation (조작)

<br/>

### 텍스트 노드에의 접근/수정

<img src="https://poiemaweb.com/img/nodeValue.png" alt="nodeValue" style="zoom:48%;" />

[nodeValue](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeValue) , nodeType , nodeName

- 노드의 값을 반환한다.
- Return: 텍스트 노드의 경우는 문자열, 요소 노드의 경우 null 반환
- IE6 이상의 브라우저에서 동작한다.

~~~javascript
// 해당 텍스트 노드의 부모 요소 노드를 선택한다.
const one = document.getElementById('one');
console.dir(one); // HTMLLIElement: li#one.red

// nodeName, nodeType을 통해 노드의 정보를 취득할 수 있다.
console.log(one.nodeName); // LI
console.log(one.nodeType); // 1: Element node

// firstChild 프로퍼티를 사용하여 텍스트 노드를 탐색한다.
const textNode = one.firstChild;

// nodeName, nodeType을 통해 노드의 정보를 취득할 수 있다.
console.log(textNode.nodeName); // #text
console.log(textNode.nodeType); // 3: Text node

// nodeValue 프로퍼티를 사용하여 노드의 값을 취득한다.
console.log(textNode.nodeValue); // Seoul

// nodeValue 프로퍼티를 이용하여 텍스트를 수정한다.
textNode.nodeValue = 'Pusan';
~~~

<br/>

### 어트리뷰트 노드에의 접근/수정

![nodeValue](https://poiemaweb.com/img/nodeValue.png)

어트리뷰트 노드을 조작할 때 다음 프로퍼티 또는 메소드를 사용할 수 있다.

[className](https://developer.mozilla.org/ko/docs/Web/API/Element/className)

- class 어트리뷰트의 값을 취득 또는 변경한다. className 프로퍼티에 값을 할당하는 경우, class 어트리뷰트가 존재하지 않으면 class 어트리뷰트를 생성하고 지정된 값을 설정한다. class 어트리뷰트의 값이 여러 개일 경우, 공백으로 구분된 문자열이 반환되므로 String 메소드 `split(' ')`를 사용하여 배열로 변경하여 사용한다.
- 모든 브라우저에서 동작한다.

[classList](https://developer.mozilla.org/ko/docs/Web/API/Element/classList)

- add, remove, item, toggle, contains, replace 메소드를 제공한다.
- IE10 이상의 브라우저에서 동작한다.
- 추천한다.

~~~javascript
const elems = document.querySelectorAll('li');

// className
[...elems].forEach(elem => {
  // class 어트리뷰트 값을 취득하여 확인
  if (elem.className === 'red') {
    // class 어트리뷰트 값을 변경한다.
    elem.className = 'blue';
  }
});

// classList
[...elems].forEach(elem => {
  // class 어트리뷰트 값 확인
  if (elem.classList.contains('blue')) {
    // class 어트리뷰트 값 변경한다.
    elem.classList.replace('blue', 'red');
  }
});
~~~

- [id](https://developer.mozilla.org/ko/docs/Web/API/Element/id)

  id 어트리뷰트의 값을 취득 또는 변경한다. id 프로퍼티에 값을 할당하는 경우, id 어트리뷰트가 존재하지 않으면 id 어트리뷰트를 생성하고 지정된 값을 설정한다.모든 브라우저에서 동작한다.

```javascript
// h1 태그 요소 중 첫번째 요소를 취득
const heading = document.querySelector('h1');

console.dir(heading); // HTMLHeadingElement: h1
console.log(heading.firstChild.nodeValue); // Cities

// id 어트리뷰트의 값을 변경.
// id 어트리뷰트가 존재하지 않으면 id 어트리뷰트를 생성하고 지정된 값을 설정
heading.id = 'heading';
console.log(heading.id); // heading
```

이외의 어트리뷰트

[hasAttribute(attribute)](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute)

- 지정한 어트리뷰트를 가지고 있는지 검사한다.
- Return : Boolean
- IE8 이상의 브라우저에서 동작한다.

[getAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/getAttribute)

- 어트리뷰트의 값을 취득한다.
- Return : 문자열
- 모든 브라우저에서 동작한다.

[setAttribute(attribute, value)](https://developer.mozilla.org/ko/docs/Web/API/Element/setAttribute)

- 어트리뷰트와 어트리뷰트 값을 설정한다.
- Return : undefined
- 모든 브라우저에서 동작한다.

[removeAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/removeAttribute)

- 지정한 어트리뷰트를 제거한다.
- Return : undefined
- 모든 브라우저에서 동작한다.

<br/>

attribute는 고정값 이고 DOM객체의 프로퍼티는 동적으로 변한다.

Attributes는 key : value 형태로 관리한다.

~~~html
<input type="text" value="100">
~~~

위 `input`태그의 `value`어트리뷰트의 값 100은 고정(초기값)이다. 이 값을 직접 변경을 하고 싶다면 `input`태그 안의 Attributes 프로퍼티 내의 value를 변경해야한다. input 요소의 value프로퍼티를 변경해도 초기값은 그대로 100이다.

즉, 어트리뷰트 와 프로퍼티는 다른것이며 따로 관리된다.

~~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <ul id="my-id" style="color: red">
    <li>HTML</li>
    <li>CSS</li>
    <li>Java Script</li>
  </ul>

  <ul id="myId" style="color: green">
      <li>1</li>
      <li>2</li>
      <li>3</li>
  </ul>
  <input type="text" value="100">
  <script>
    // 요소 1개 선택
    const $ul = document.querySelector('#my-id');
    console.log($ul);
    console.log($ul.style.color = 'blue');
    console.log([...$ul.classList].forEach((item) => console.log(item)));
    console.log($ul.classList.add('class3'));
    console.log($ul.classList.contains('class3'));
    console.log($ul.classList.remove('class3'));
    $ul.firstElementChild.style.color = 'red';

    // 다중 요소 선택
    const $lis = document.querySelectorAll('li');
    console.log($lis);
    [...$lis].forEach((item, index) => item.classList.add(`class${index + 1}`));
    console.log($lis);

    // ul.#myId 안에 있는 요소들을 문자열로 반환한다.
    console.log(document.querySelector('#myId').innerHTML);
    document.querySelector('#myId').innerHTML = '<h1>Hi</h1>';
    document.querySelector('#myId').innerHTML += '<h2>Hi</h2>';

    // 어트리뷰트 접근
    const $input = document.querySelector('input');
    console.dir($input);
  </script>
</body>
</html>
~~~~

<br/>

### HTML 콘텐츠 조작(Manipulation)

<br/>

[textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent)

- 요소의 텍스트 콘텐츠를 취득 또는 변경한다. 이때 마크업은 무시된다. textContent를 통해 요소에 새로운 텍스트를 할당하면 텍스트를 변경할 수 있다. 이때 순수한 텍스트만 지정해야 하며 마크업을 포함시키면 문자열로 인식되어 그대로 출력된다.
- IE9 이상의 브라우저에서 동작한다.

[innerText](https://developer.mozilla.org/ko/docs/Web/API/Node/innerText)

- innerText 프로퍼티를 사용하여도 요소의 텍스트 콘텐츠에만 접근할 수 있다. 하지만 아래의 이유로 사용하지 않는 것이 좋다.

  - 비표준이다.

  - CSS에 순종적이다. 예를 들어 CSS에 의해 비표시(visibility: hidden;)로 지정되어 있다면 텍스트가 반환되지 않는다.

  - CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다

[innerHTML](https://developer.mozilla.org/ko/docs/Web/API/Element/innerHTML)

- 해당 요소의 모든 자식 요소를 포함하는 모든 콘텐츠를 하나의 문자열로 취득할 수 있다. 이 문자열은 마크업을 포함한다.
- 마크업이 포함된 새로운 콘텐츠를 지정하면 새로운 요소를 DOM에 추가할 수 있다.
- 크로스 스크립팅 공격에 취약하다. 

~~~javascript
const one = document.getElementById('one');

// 마크업이 포함된 콘텐츠 취득
console.log(one.innerHTML); // Seoul

// 마크업이 포함된 콘텐츠 변경
one.innerHTML += '<em class="blue">, Korea</em>';

// 마크업이 포함된 콘텐츠 취득
console.log(one.innerHTML); // Seoul <em class="blue">, Korea</em>
~~~

<br/>