![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)



------

## JavaScript Study 06

- 용어
- 단축평가

  - 사용 용도
- 객체
  - 객체를 만드는 방법
    - 인스턴스
  - 프로퍼티
  - 프로퍼티 접근 방법
  - 프로퍼티 동적 생성
  - 프로퍼티 삭제
  - ES6 객체 리터럴 확장 기능
    - 프로퍼티 축약 표현
    - 메소드 축약 표현
- 원시값과 객체의 비교
  - 원시값
    - const vs var/let
    - Scope ( 변수의 생명주기 - 식별자의 생명주기 )
  - 문자열과 불변성
  - 유사배열 객체 ( = 문자열 )
  - 값에 의한 전달
  - 객체
  - 변경 가능한 값
  - 참조에 의한 전달
  - 복사 : 얕은 복사( Shallow Copy ) / 깊은 복사 ( Deep Copy )
    - 얕은 복사( Shallow Copy )
    - 깊은 복사 ( Deep Copy )


<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 원시값
- 변경 가능한 값
- 값에 의한 전달
- 객체
- 변경 불가능한 값
- 참조에 의한 전달

<br/>

------

<br/>

### 단축평가

> 논리합(`||`) 연산자와 논리곱(`&&`) 연산자의 연산 결과는 불리언 값이 아닐 수도 있다.
>
> 이 두 연산자는 언제나 피연산자 중 어는 한쪽 값을 반환한다.

~~~javascript
'Cat' && 'Dog' // 'Dog'
~~~

어느 쪽 값을 출력할지는 최종 평가 결과를 결정할 피연산자를 출력한다.

`&&` 은 **선 피연산자**가  `true` 라면 **후 피연산자를 출력**한다.

이유는 첫 피연산자가 `true`라면 후 피연산자를 통해 해당 값이 `true` 인지 `false` 인지 최종 결정이 나기 때문이다.

~~~javascript
'문자열' && 0 // 0
~~~

`&&` 은 **선 피연산자**가  `false` 라면 그냥 **선 피연산자를 출력**한다.

이유는 첫 피연산자가 `false`라면 어차피 `&&` 연산을 통해 해당 값이 `false` 로 최종 결정이 나기 때문이다.

~~~javascript
0 && '문자열' // 0
~~~

`||` 은 **선 피연산자**가 `true`  라면 그냥 **선 피연산자를 출력**한다.

이유는 첫 피연산자가 `true`라면 어차피 `||` 연산을 통해 해당 값이 `true` 로 최종 결정이 나기 때문이다.

~~~javascript
'Cat' || 'Dog' // 'Cat'
~~~

`||` 은 **선 피연산자**가 `false`  라면 **후 피연산자를 출력**한다.

이유는 첫 피연산자가 `false`라면 후 피연산자를 통해 해당 값이 `true` 인지 `false` 인지 최종 결정이 나기 때문이다.

~~~javascript
'' || 'Dog' // 'Dog'
~~~

<br/>

####  사용 용도

- **객체가 null인지 확일할 때**

  ~~~javascript
  var elem = null;

  console.log(elem.value); //1번, TypeError: Cannot read property 'value' of null
  console.log(elem && elem.value); //2번, null
  ~~~

  변수 `elem`에 null값으로 초기화를 해주었는데 elem에 대한 value프로퍼티를 참조하게 될 경우 1번처럼 error를 유발한다.

  1번의 경우, error가 날 경우 개발자 도구를 통해서 알 수 있지만, 브라우저 상에서는 알기가 힘들다.

  **따라서 2번처럼 에러 확인코드를 추가하여 일어날 수 있는 에러를 방지 해주어야만 한다.**

  <br/>

- **함수 매개변수에 기본값을 설정할 때**

```javascript
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
```

함수를 호출할 때 인수를 전달하지 않으면 매개변수는 undefined를 갖는다. 이때 단축 평가를 사용하여 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

----------

## 객체

> 자바스크립트의 객체는 자바처럼 클래스를 필요로 하지 않는다.
>
> 객체는 재산( property )을 가지고 있다.
>
> 프로퍼티는 콤마 `( , )` 로 구분한다. 그래서 이것을 **객체 리터럴**이라고 한다.
>
> **객체 리터럴은 평가 될 때 할당된다.**

~~~javascript
var person = {
	name: 'Lee',    //재산(프로퍼티) - 객체 리터럴
	gender: 'male'  //재산(프로퍼티) - 객체 리터럴
};
~~~

객체를 선언할 때 사용하는 `{ }` 는 코드 블록이 아니다.

**증거**

- 코드 블록이 끝나고서 `;` 을 붙인다.
- 코드 블록 내용에 `;`이 들어가지 않는다.

<br/>

![객체의 프로퍼티](https://user-images.githubusercontent.com/31315644/66315302-7ae51600-e950-11e9-9787-89f3e4ae86f6.png)

**객체의 프로퍼티는 키와 값으로 구성되어 있다.**

객체의 프로퍼티 **키**는 식별자가 아니기 때문에, 식별자 네이밍 규칙을 따르지 않는다.

**값**은 단순한 숫자, 문자열부터 함수(일급 객체)도 담을 수 있다. ( 7가지의 데이터 타입이 모두 올 수 있다. )

여기서 **프로퍼티의 키와 값을 *프로퍼티* ( 정적 : state )**(그대로 부름)

**프로퍼티의 키와 함수를 *메소드* ( 동적 : behavior )**라 칭한다.

<br/>

### 객체를 만드는 방법들

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메소드
- 클래스 (ES6)

~~~javascript
var o = {};	  //객체 리터럴, 생성방법 o는 빈프로퍼티를 가지며 자동 상속을 받는다.
~~~

<br/>

#### 인스턴스

> 타언어에서 클래스에 의해 생성되어 메모리에 저장된 실체를 의미한다.
>
> 하지만 자바스크립트에서는 `new`혹은  `Object 객체 `로 만들어낸 객체를 `인스턴스`라고 부른다.

<br/>

### 프로퍼티

​	**객체는 프로퍼티(Property)들의 집합이며 프로퍼티는 키(key)과 값(value)으로 구성된다.** 프로퍼티를 나열할 때는 쉼표(,)로 구분한다. 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나 사용해도 좋다.

프로퍼티 키와 프로퍼티 값으로 사용할 수 있는 값은 아래와 같다.

- `프로퍼티 키` : `빈 문자열`을 포함하는 `모든 문자열` 또는 `symbol 값` + 숫자( 강제 문자열 변환 )
- `프로퍼티 값` : 자바스크립트에서 사용할 수 있는 `모든 값`

여기서 `프로퍼티 키` 는 **식별자 네이밍 규칙을 따를 필요가 없다**
하지만, 식별자 네이밍 규칙을 따르는 키와 따르지 않는 키는 서로 선언하는데 차이가 있다.

예를들어 보자,

~~~~javascript
var person = {
  first_name: 'Ung-mo', // 식별자 네이밍 규칙을 따르는 이름
  'last-name': 'Lee'    // 식별자 네이밍 규칙을 않은 이름
};

console.log(person); // {first_name: "Ung-mo", last-name: "Lee"}
~~~~

**즉, 식별자 네이밍 규칙을 따르지 않는 키는 반드시 ` ''` 로 묶어 주어야 제대로 동작한다.**

<br/>

### 프로퍼티 접근 방법

프로퍼티 접근 방법

- 마침표 표기법 : 식별자 네이밍 규칙을 준수하는 키만 접근이 가능. **( 추천 )**
- 대괄호 표기법 : 모두 접근이 가능. 단, `[ ]` 안에는 반드시 `''`가 들어가야 한다. ( 비추천 )

~~~javascript
var person = {
  name: 'Lee',
  'last-name': 'Hyeok',
  1: 10
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
console.log(person[name]); // ReferenceError: name is not defined. 에러유발

// 식별자 네이밍을 지키지 않은 키에 접근할 때
console.log(person.'last-name');  // SyntaxError: Unexpected string
console.log(person.last-name);    // NaN;
console.log(person[last-name]);   // ReferenceError: last is not defined
console.log(person['last-name']); // Hyeok

// 프로퍼티 키가 숫자로 이루어진 문자열인 경우, 따옴표를 생략 가능하다.
console.log(person.1);     // SyntaxError: missing ) after argument list
console.log(person.'1');   // SyntaxError: Unexpected string
console.log(person[1]);    // 10 : person[1] -> person['1']
console.log(person['1']);  // 10
~~~

<br/>

여기서 이 부분에 대해서 더 자세하게 보도록 하겠다.

~~~~javascript
var person = {
  'last-name': 'Hyeok',
};

// 식별자 네이밍을 지키지 않은 키에 접근할 때
console.log(person.last-name);    // NaN;
console.log(name);   // 아무것도 출력이 안됨. 즉 빈문자열임
~~~~

왜 NaN이 뜨고 name은 빈문자열이 뜨는걸까? ( 아래 해설 참조 )

![프로퍼어어어티](https://user-images.githubusercontent.com/31315644/66545673-333fd380-eb76-11e9-9888-1779035d28d2.png)

만약 window 객체의 프로터피가 아닌 다른 것을 참조한다면 다음과 같이 뜬다.

~~~~javascript
var person = {
  'last-names': 'Lee'
};

console.log(person.last-names); // ReferenceError: names is not defined
~~~~

이유 : `names` 는 window 객체의 프로퍼티도 아니고 선언조차 되어있지 않는 존재하지 않는 변수이기 때문에 정의 Error를 유발한다.

<br/>

### 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```javascript
var person = {
  name: 'Lee'
};

// person 객체에는 address 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 address 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.address = 'Seoul';

console.log(person); // {name: "Lee", address: "Seoul"}
```

<br/>

### 프로퍼티 삭제

delete 연산자는 객체의 프로퍼티를 삭제한다. 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 한다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러없이 무시된다.

```javascript
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
```

<br/>

### ES6 객체 리터럴 확장 기능

#### 프로퍼티 축약 표현

객체 리터럴의 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 구성된다. 프로퍼티의 값은 변수에 할당된 값, 즉 식별자 표현식일 수도 있다.

```javascript
// ES5
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2}
```

<br/>

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우, 변수 이름과 프로퍼티 키가 동일한 이름일 때, 프로퍼티 키를 생략(Property shorthand)할 수 있다. 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

```javascript
// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

<br/>

#### 메소드 축약 표현

ES5에서 메소드를 정의하려면 프로퍼티 값으로 함수를 할당한다.

```javascript
// ES5
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

ES6에서는 메소드를 정의할 때, function 키워드를 생략한 축약 표현을 사용할 수 있다.

```javascript
// ES6
const obj = {
  name: 'Lee',
  // 메소드 축약 표현
  sayHi() {  // <-> sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

ES6의 메소드 축약 표현으로 정의한 메소드는 프로퍼티에 할당한 함수와 다르게 동작한다.

<br/>

----------------

<br/>

## 원시 값과 객체의 비교

### 원시값

> **원시 타입(primitive type)의 값, 즉 원시 값은 변경 불가능한 값(immutable value)이다.** (read-only)
>
> **변수의 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다.** 원시 값의 이러한 특성을 **불변성(immutability)**이라 한다.

변수는 최대한 재할당을 하지 않고 상수처럼 쓰는 것이 좋다. ( scope - 식별자의 생명주기 )

<br/>

#### const VS var/let

값을 변경할 수 없다는 것은 재할당을 할 수 없다는 의미인데 변수는 새로운 값을 재할당하는 것으로 변수값을 변경할 수 있다. 변수에 상대 개념인 상수는 재할당이 금지된 변수를 말한다. 상수도 값을 저장하기 위한 메모리 공간이 필요하므로 변수이다. 단, 변수는 언제든지 재할당을 통해 변수값을 변경할 수 있지만 상수는 단 한번만 할당이 허용된다. 따라서 **상수와 변경 불가능한 값을 동일시하는 것은 곤란**하다.

<br/>

#### Scope(변수의 생명주기 - 식별자의 생명주기)

변수는 빨리 써서 버려져야 메모리에 무리가 없기 때문에 **변수의 생명주기**를 고려하여 함수나 변수가 들어가는 **코드 블록은 되도록이면 짧은걸** 권장한다.

하지만, 전역변수는 자바스크립트가 실행하는 초반부터 실행되고 자바스크립트가 끝날때까지 소멸되지 않는다. 그러므로 **전역변수는 되도록 조금 사용하는걸 권장**한다.

<br/>

### 문자열과 불변성

> 문자열은 0개 이상인 문자들의 집합을 말하며 1개의 문자는 2Byte의 메모리 공간에 저장된다.
>
> 따라서, 문자열 타입의 값은 몇개의 문자로 이루어졌는지에 따라 필요한 메모리 공간의 크기가 다르다.

숫자는 1도 , 100000000000도 동일한 8byte가 필요하지만 문자열 타입은 1개의 문자로 이루어진 문자열은 2byte , 10개의 문자로 이루어진 문자열은 20byte가 필요하다.

문자열또한 `원시값` 인것을 명시해야만 한다.

```javascript
var str = 'Hello';
str = 'World';
```

![문자열할당](https://user-images.githubusercontent.com/31315644/66474759-e9e77980-eacc-11e9-8db0-562b7cf2f394.png)

<br/>

### 유사 배열 객체 ( = 문자열 )

> 유사 배열 객체는 마치 **배열처럼** 인덱스 프로퍼티 값에 접근할 수 있고 length프로퍼티를 갖는 객체를 의미한다.
>
> 따라서, 문자열은 원시값이면서 유사 배열 객체이다.
>
> 유사배열객체는 프로퍼티 키에 length 가 있느냐, 없느냐 로 따라서 체크가 가능하다.

```javascript
// 유사 배열 객체 체크방법
var name = "Kim";

console.log(name.length); // 3

var str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있다.
// 하지만 문자열은 원시 타입인 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
str[0] = 'S';

console.log(str); // string
```

<br/>

### 값에 의한 전달

> 변수에 변수를 할당하는 경우, 할당되는 변수(score)가 원시값을 갖는 변수라면 할당받는 변수(copy)에는 할당되는 변수(score)의 원시값이 복사되어 전달된다. 이를 **값에 의한 전달(Pass by value)**라 한다.

~~~javascript
var score = 80;
var copy = score;

copy = 100;
console.log(score); // 80
~~~

![값에 의한 전달](https://user-images.githubusercontent.com/31315644/66475024-76923780-eacd-11e9-92ff-0ba267df2d44.jpeg)

<br/>

### 객체

> 객체는 프로퍼티의 개수가 정해져 있지 않으며 동적으로 추가되고 삭제할 수 있다. 또한 프로퍼티의 값에도 제약이 없다. 따라서 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없다.
>
> 객체는 **변경 가능한 값(mutable value)**이다. 이를 **참조 값(Reference value)**을 갖는다고 한다.
>
> 객체는 다른변수에 할당할때 **참조에 의한 전달(Pass by reference)**을 한다.

**객체 리터럴은 평가 될 때 할당된다.**

<br/>

### 변경 가능한 값

​	**원시값**은 메모리마다 할당이 되어있기 때문에 값의 변경 유무를 **추척하기가 쉽다.**
반면에 **참조값**은 실제값의 주소를 참조하고 있기 때문에 값의 변경 유무 **추적이 정말 어렵다.**

원시 값을 할당한 변수는 재할당을 통해서만 변경이 가능하다.
반면에, 변수가 참조하고 있는 객체의 경우, 동적으로 프로퍼티 추가나 변경,삭제 등등 변경할 수 있는 값이다.

```javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 키 name 의 프로퍼티 값 갱신
person.name = 'Kim';

// 프로퍼티 동적 추가
person.gender = 'male';

console.log(person); // {name: "Kim", gender: "male"}
```

<img src="https://poiemaweb.com/assets/fs-images/10-7.png" alt="변경가능한 객체" style="zoom:50%;" />

​	객체를 변경할 때 마다 원시 값처럼 이전 값을 복사하여 새롭게 생성한다면 명확하고 깔끔하겠지만 객체는 크기가 매우 클 수도 있고 프로퍼티 값이 객체일 수도 있어서 복사(Deep copy)하고 생성하는 비용이 많이 든다. 다시 말해, 메모리의 효율적 소비가 어렵고 퍼포먼스가 나빠진다.

따라서, 객체는 이러한 구조적 단점에 따른 부작용(Side effect)이 있다. 그것은 원시 값과는 다르게 **여러 개의 식별자가 하나의 객체를 공유할 수 있다**는 것이다.

<br/>

### 참조에 의한 전달

​	객체를 가리키는 변수(원본, person)를 다른 변수(사본, copy)에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 **참조에 의한 전달(Pass by reference)**라 한다.

```javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사
var copy = person;
```

<br/>

![참조에 의한 전달](https://poiemaweb.com/assets/fs-images/10-8.png)

<br/>

원본 person와 사본 copy 모두 동일한 객체를 가리키고 있다.

이것은 두개의 식별자가 하나의 객체를 공유한다는 것을 의미한다.

따라서 원본 또는 사본 어떤 한쪽에서 객체를 변경(객체의 프로퍼티 값 변경 또는 추가, 삭제)이 하면 **서로 영향을 주고 받는다.**

```javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사. copy와 person은 동일한 객체를 참조한다.
var copy = person;

// copy와 person은 같은 참조 값을 갖는다.
console.log(copy === person); // true

// copy를 통해 객체를 변경한다.
copy.name = 'Kim';

// person을 통해 객체를 변경한다.
person.address = 'Seoul';

// copy와 person은 같은 동일한 가리키고 있다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy);   // {name: "Kim", address: "Seoul"}
```

<br/>

### 복사 : 얕은 복사( shallow copy ) / 깊은 복사 ( deep copy )

copy에는 두 가지가 있다.

**shallow copy**(얕은 복사)와 **deep copy**(깊은 복사)이다.

**shallow copy**는 가장 상위 객체만 메모리에 새로 생성되고 내부 객체들은 참조 관계인 경우를 의미한다.

**deep copy**는 내부 객체까지 모두 새로 생성된 것을 의미한다.

<br/>

#### shallow copy

shallow copy의 가장 큰 예는 그냥 객체를 재할당 하는 것이다.

하지만, 그외의 방법에 대해 소개한다.

 **slice 메서드 이용** - Array.prototype.slice.call(변수명)

`변수명.slice[0]` 혹은 `Array.prototype.slice.call(변수명)` 을 이용한다

`Array.prototype.slice.call(변수명)` 대신 `변수명.slice(0)`을 해도 되지만, arguments 같은 것(**유사배열**)을 복사할 때를 생각하면 `Array.prototype.slice.call`로 통일하는 게 좋다.

```javascript
var array = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
var shallow = Array.prototype.slice.call(array);

shallow[0].name = 'd';
shallow[1] = 'e';

console.log(array); // [{ name: 'd' }, { name: 'b' }, { name: 'c' }]
console.log(shallow); // [{ name: 'd' }, 'e' , { name: 'c' }]
```

위 예제를 보면 `array` 변수를 얕은 복사를 한 `shallow`라는 변수는 array 변수가 가리키는 객체(배열) 안에 있는 각 객체들 중 첫번째 객체의 name값을 공유하고 있기 때문에 ‘d’라고 변경시 `array`의 프로퍼티 값은 공유가 되어 변경이 되었다.

하지만 `shallow`의 두번째 배열 인덱스의 e값을 직접 변경할 경우 메모리에 직접 생성되었기에 `array`변수와 공유가 되어있지 않다.

<br/>

#### deep copy

deep copy를 하기 위한 가장 기본적인 방법은

1. 객체를 별도로 생성
2. 복사할 객체의 프로퍼티에 각각 접근 (반복문을 이용)
3. 복사 후, 복사할 객체에 프로퍼티를 생성하고 복사.

deep copy는 비용이 매우 비싸기 때문에 라이브러리를 쓰는게 좋다.

**lodash의 cloneDeep( )**

그 중 **lodash 의 Library에 있는 deep copy**를 사용하는 것을 추천한다.

~~~javascript
const original = { a : {b : 2}};
let copy = _.cloneDeep(original);

copy.a.b = 100;
console.log(original.a.b);  // 2
console.log(copy.a.b); 			// 100
~~~

<br/>

**JSON 객체의 메소드를 이용**

```js
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

**JSON.stringify**는 자바스크립트 오브젝트를 스트링 포멧으로 변환하는 메소드이다.
**JSON.parse**는 스트링 포멧을 자바스크립트 오브젝트로 변환하는 메소드이다.

스트링으로 변환하였다가 다시 오브젝트로 변환하기 때문에 이전 객체에 대한 참조가 없어지지만 JSON 메소드 자체가 성능면에서 다른 방법에 비해 굉장히 느리기 때문에 주의해야한다.
이 방법은 객체를 `깊은 복사(Deep Copy)`한다.