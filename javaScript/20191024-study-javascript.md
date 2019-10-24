![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 14

- 용어

- 클로저
  - 함수 객체의 내부 슬롯 [[Environment]]
  - 클로저와 렉시컬 환경
  - 클로저의 활용
    - 생성자를 이용
    - 함수형 프로그래밍
    - 자주 발생하는 실수 
  
- 정규 표현식

  - 플래그

  - 패턴
  - 자주 사용하는 정규표현식

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 고차함수
- 클로저
- 정규표현식
- 플래그
- 패턴

<br/>

---------

## 클로저

> JS에는 private, protect, public과 같은 접근 제한자가 없다.
>
> 따라서 클로저를 이용하여 접근제한자를 구현하여 캡슐화에 이용한다.
>
> 즉, 클로저는 상태를 안전하게 유지하기 위함이다.
>
> MDN : 클로저는 함수와 그 함수가 선언된 렉시컬 환경(Lexical environment)과의 조합이다.

함수 정의된 위치(환경)에 따라서 상위스코프가 정적으로 결정된다. ▹ 렉시컬 환경


###  함수 객체의 내부 슬롯 [[Environment]]

 **함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.**

```
1. 함수 실행 컨텍스트 생성
2. 함수 렉시컬 환경 생성
  2.1. 함수 환경 레코드 생성
  2.2. 외부 렉시컬 환경에 대한 참조 할당
  2.3. this 바인딩
```

함수 렉시컬 환경의 구성 요소인 외부 렉시컬 환경에 대한 참조에는 **함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당된다.**

<br/>

~~~javascript
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 기억한다.
function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
~~~

![img](https://poiemaweb.com/assets/fs-images/23-1.png)



<br/>

### 클로저와 렉시컬 환경

 지금까지 배운 내용으로는 이론적으로 모든 함수가 클로저라 할수 있다.

그러나 실제로는 모두 클로저라 하지 않고 다음 조건을 가지는 것을 클로저라한다.

1. 중첩함수가 상위 함수가 만든 상위 스코프의 식별자를 참조하고 있다.
2. 상위 함수보다 중첩 함수가 더 오래 살아야 한다.

이 경우의 중첩함수를 클로저라 칭한다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <script>
    function foo() {
      const x = 1;
      const y = 2;

      // 클로저
      function bar() {
        // 상위 스코프의 식별자 x만을 참조한다.
        console.log(x);
      }
      return bar;
    }

    const bar = foo();
    bar();
  </script>
</body>
</html>
~~~

클로저에 의해 참조되는 상위 스코프의 변수(위 예제의 경우, foo 함수의 변수 x)를 **자유 변수(Free variable)**라고 부른다.

위에 선언된 `x`는  결국 '자유변수' 다. `y`는 기억을 안한다.

따라서, 

즉, 자유변수와 묶여있는 함수는 클로저다.

<br/>

### 클로저의 활용

**클로저는 상태를 안전하게 유지하기 위해 사용한다.** 즉, 상태가 의도치 않게 변경되지 않도록 안전하게 **은닉(Information hiding)**한다. 그리고 이전 상태를 기억하다가 상태가 변경되면 **최신 상태(state)를 유지**한다.

**클로저의 사용 목적**

- 상태를 안전하게 유지. (아무나 바꾸지 못하게 한다.)
- 위 내용을 보고 정보은닉만을 떠오르는데 클로저는 단지 정보은닉만을 위해서 사용하는 것이 아니라,
  상태를 안전하게 유지하게 하고자 클로저를 사용하다보니 정보은닉을 하게 된 것.


버튼이 클릭될 때마다 클릭한 횟수를 누적하여 화면에 표시되는 카운터를 만들어보자. 이 예제의 클릭된 횟수(변수 num)가 바로 유지해야할 상태이다.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const counter = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      // 클로저를 메소드로 갖는 객체를 반환한다.
      // 객체 리터럴은 스코프를 만들지 않는다.
      // 따라서 아래 메소드들의 상위 스코프는 즉시 실행 함수의 스코프이다.
      return {
        // num: 0, // 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
        increase() {
          $counter.textContent = ++num; // 상태 변경
        },
        decrease() {
          if (num <= 0) return;
          $counter.textContent = --num; // 상태 변경
        }
      };
    }());

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```

위 예제에서 즉시 실행 함수가 반환하는 객체 리터럴은 함수 실행 단계에서 평가되어 객체가 된다. 이때 객체의 메소드인 함수도 함수 객체로 생성된다. 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.

따라서 위 예제의 increase, decrease 메소드의 상위 스코프는 increase, decrease 메소드가 평가되는 시점에 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다. 다시 말해, increase, decrease 메소드의 상위 스코프는 즉시 실행 함수의 스코프이다. 따라서 increase, decrease 메소드가 언제 어디서 호출되던지 상관없이 increase, decrease 함수는 즉시 실행 함수의 스코프의 식별자를 참조할 수 있다.

<br/>

#### 생성자를 이용

~~~html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const Counter = (function () {
      // ① 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      function Counter() {
        // this.num = 0; // ② 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
      }

      Counter.prototype.increase = function () {
        $counter.textContent = ++num;
      };

      Counter.prototype.decrease = function () {
        if (num <= 0) return;
        $counter.textContent = --num;
      };

      return Counter;
    }());

    const counter = new Counter();

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
~~~

즉시 실행 함수로 감싸고 생성자로 호출하여 인스턴스화한다.

따라서 `Counter.prototype.increase \ decrease`는 결국에는 상위스코프인 즉시 실행함수를 가리키기 때문에 `num`을 기억하게 된다.

<br/>

#### 함수형 프로그래밍

~~~javascript
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2
~~~

함수 makeCounter는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수이다. 함수 makeCounter가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 함수 makeCounter의 스코프에 속한 변수 counter을 기억하는 클로저다.

 **함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다**

변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동하지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두번 호출하지 말아야 한다.

![img](https://poiemaweb.com/assets/fs-images/23-10.png)

<br/>

#### 자주 발생하는 실수 

~~~~~~~javascript
var arr = []; 
for (var i = 0; i < 5; i++) {  
	arr[i] = function () { // ①    
	return i;  
	}; 
} 

for (var j = 0; j < arr.length; j++) {  
	console.log(arr[j]()); // ② 
}
~~~~~~~

for 문의 초기화 문에서 var 키워드로 선언한 변수 i는 블록 레벨이 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수가 되며 변수 i에는 0, 1, 2, 3, 4, 5가 순차적으로 할당된다. 

따라서 배열 funcs에 요소로 추가된 함수를 호출하면 전역 변수 i를 참조하여 i의 값 5가 출력된다.

<br/>

```javascript
 var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (id) { // ①
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

①에서 즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개 변수 id에 할당한 후 중첩 함수를 반환하고 종료된다. 즉시 실행 함수가 반환한 함수는 배열 funcs에 순차적으로 저장된다.

이때 즉시 실행 함수의 매개 변수 id는 즉시 실행 함수가 반환한 함수의 상위 스코프에 존재하며 즉시 실행 함수가 반환한 함수에 의해 참조되므로 자유 변수가 되어 즉시 실행 함수가 반환한 함수에 의해 그 값이 유지된다.

위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 문의 초기화 문에서 var 키워드로 선언한 변수가 전역 변수가 되기 때문에 발생하는 현상이다. ES6의 let 키워드를 사용하면 이와 같은 번거로움이 깔끔하게 해결된다.

```javascript
const arr = [];

for (let i = 0; i < 3; i++) {
  arr[i] = () => i;
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]()); // 0 1 2
}
```

초기화 문에서 let 키워드로 선언한 변수를 사용하면 for 문이 반복될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성된다. 만약 for 문 내에서 정의된 함수가 있다면 이 함수의 상위 스코프는 for 문이 반복될 때마다 생성된 for 문 코드 블록의 새로운 렉시컬 환경이다.

이때 함수의 상위 스코프는 for 문이 반복될 때 마다 식별자(초기화 변수 및 for 문 내 지역 변수 등)의 값을 유지해야 한다. 이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지한다.

![img](https://poiemaweb.com/assets/fs-images/23-11.png)

<br/>

## 정규 표현식

> 정규 표현식은 **문자열**에서 특정 내용을 찾거나 대체 또는 발췌하는데 사용한다.

- 정규표현식은 기호들로 이루어졌길래 난해한 문법으로 유명하다. 
- 정규표현식을 공부하거나 사용할 때는 인터넷을 통해서 그 때 즉시 알아보고 써야한다.
- 다만, 인터넷마다 정규표현식의 내용이 다를수도 있기 때문에 충분히 테스트를 해보고 사용해야만 한다.	

<img src="https://poiemaweb.com/img/regular_expression.png" alt="regular expression" style="zoom:50%;" />

### 플래그

플래그는 아래와 같은 종류가 있다.

| Flag | Meaning     | Description                               |
| :--: | :---------- | :---------------------------------------- |
|  i   | Ignore Case | 대소문자를 구별하지 않고 검색한다.        |
|  g   | Global      | 문자열 내의 모든 패턴을 검색한다.         |
|  m   | Multi Line  | 문자열의 행이 바뀌더라도 검색을 계속한다. |

<br/>

### 패턴

패턴에는 검색하고 싶은 문자열을 지정한다.  이때 문자열의 따옴표는 생략한다.

- `.`를 3개 연속하여 패턴을 생성하면 3자리 문자를 추출한다.

- 모든 문자를 선택하려면 `.`와 `g`를 동시에 지정한다.

- `+` : 앞선 패턴을 최소 한번 반복하려면 앞선 패턴 뒤에 `+`를 붙인다. 

- `|`를 사용하면 or의 의미를 가지게 된다.

- `[]`내의 문자는 or로 동작한다. 그 뒤에 `+`를 사용하여 앞선 패턴을 한번 이상 반복하게 한다.

- 범위를 지정하려면 `[]`내에 `-`를 사용한다.  // ex) /[A-Z]+/g; - 'A' ~ 'Z'가 한번 이상 반복되는 문자열을 반복 검색
  - /[A-Za-z]+/g;  // 'A' ~ 'Z' 또는 'a' ~ 'z'가 한번 이상 반복되는 문자열을 반복 검색
  - /[0-9]+/g; // '0' ~ '9'가 한번 이상 반복되는 문자열을 반복 검색 
  - /[0-9,]+/g; // '0' ~ '9' 또는 ','가 한번 이상 반복되는 문자열을 반복 검색

- `\d`는 숫자를 의미한다. `\D`는 `\d`와 반대로 동작한다.

- `\w`는 알파벳과 숫자를 의미한다. `\W`는 `\w`와 반대로 동작한다.

<br/>

### 자주 사용하는 정규표현식

특정 단어로 시작하는지 검사한다.

- 'http'로 시작하는지 검사
-  `^` : 문자열의 처음을 의미한다.

```javascript
const url = 'http://example.com';
const regexr = /^http/;
console.log(regexr.test(url)); // true
```

특정 단어로 끝나는지 검사한다.

-  'html'로 끝나는지 검사
- `$` : 문자열의 끝을 의미한다.

```javascript
const fileName = 'index.html';
const regexr = /html$/;
console.log(regexr.test(fileName)); // true
```

숫자인지 검사한다.

- 모두 숫자인지 검사
- `^`숫자로 시작 , `&`숫자로 끝, `+` 반복
- `[^]`: 부정(not)을 의미한다. 예를 들어 `[^a-z]`는 알파벳 소문자로 시작하지 않는 모든 문자를 의미한다.
- `[]` 바깥의 `^`는 문자열의 처음을 의미한다.

```javascript
const targetStr = '12345';
const regexr = /^\d+$/;
console.log(regexr.test(targetStr)); // true
```

하나 이상의 공백으로 시작하는지 검사한다.

- 1개 이상의 공백으로 시작하는지 검사
- ` \s` : 여러 가지 공백 문자 (스페이스, 탭 등) => `[\t\r\n\v\f]`

```javascript
const targetStr = ' Hi!';
const regexr = /^[\s]+/;
console.log(regexr.test(targetStr)); // true
```

아이디로 사용 가능한지 검사한다. (영문자, 숫자만 허용, 4~10자리)

- 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~10자리인지 검사
- `{4,10}`: 4 ~ 10자리

```javascript
const id = 'abc123';
const regexr = /^[A-Za-z0-9]{4,10}$/;
console.log(regexr.test(id)); // true
```

메일 주소 형식에 맞는지 검사한다.

```javascript
const email = 'ungmo2@gmail.com';

const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(regexr.test(email)); // true
```

핸드폰 번호 형식에 맞는지 검사한다.

```javascript
const cellphone = '010-1234-5678';

const regexr = /^\d{3}-\d{3,4}-\d{4}$/;

console.log(regexr.test(cellphone)); // true
```

특수 문자 포함 여부를 검사한다.

```javascript
const targetStr = 'abc#123';

// A-Za-z0-9 이외의 문자가 있는지 검사
let regexr = /[^A-Za-z0-9]/gi;

console.log(regexr.test(targetStr)); // true

// 아래 방식도 동작한다. 이 방식의 장점은 특수 문자를 선택적으로 검사할 수 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

console.log(regexr.test(targetStr)); // true

// 특수 문자 제거
console.log(targetStr.replace(regexr, '')); // abc123
```

<br/>