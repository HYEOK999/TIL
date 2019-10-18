![productivity-1995786_1280](https://user-images.githubusercontent.com/31315644/67020346-04f36280-f139-11e9-9a0d-83c72b8254fe.jpg)



------

## 함수 정리

<br/>

`Object.getPrototypeOf(인스턴스명);`

- 해당 인스턴스 객체의 프로토타입을 반환한다.

  <br/>

`Object.setPrototypeOf(프로토타입의 하위 객체명, 바꿀객체명);`  == `객체명.__ proto __ = 바꿀 객체명;`

- 객체명의 프로토타입을 바꿀객체명으로 교체한다. **링크를 복구시켜야되므로 비추천**

  <br/>

`Object.getOwnPropertyDescriptor(객체명 , ‘프로퍼티’);`

- 해당 객체의 프로퍼티에 대한 내용을 반환한다. (어트리뷰트를 알려달라.)

  <br/>

 `Object.create(프로토타입으로 지정할 객체명 [, 생성할 객체의 프로퍼티를 갖는 객체 ])`

- **프로토타입을 직접 상속한다.** 옵션으로 프로퍼티를 지정할 수 있다. 
- **프로토타입의 체인을 교체하면서 프로토타입을 교체할 때 사용한다.**

1. let obj = Object.create(null) ; 

   `obj`  → `null` // 아무 상속을 받지 않겠다.

2. let obj = Object.create(Object.prototype, { x: { value: 1 } } ); 

   `obj` → `Object.prototype` → `null` // obj = { x: 1 };와 동일하다. 

3. let obj = Object.create(myProto);

   `obj` → `myProto` → `Object.prototype` → `null` // myProto 객체를 상속받는다.

<br/>

`Object[객체명].hasOwnProperty(‘프로퍼티명’);` = ` '프로퍼티 키명' in 객체명`

- 해당 인스턴스에 고유 프로퍼티가 있냐고 묻는다. 반환값은 `boolean`으로 한다.

- `'프로퍼티 키명' in 객체명`은 상속받은 것까지 전부 확인하고 boolean 으로 반환한다.

- `Object[객체명].hasOwnProperty(‘프로퍼티명’);` 를 사용할 때 call , bind , apply 함수를 섞어 이용하면 this를 선택가능.

  <br/>

`Object.defineProperty(객체명, ‘생성 및 바꿀 프로퍼티명’, { 어트리뷰트들 });`

- 객체의 프로퍼티를 추가하거나 수정한다. (객체가 생성되어있어야만 한다.)

~~~javascript
// 데이터 프로퍼티
Object.defineProperty(객체명, ‘생성 및 바꿀 프로퍼티명’, { 
  value: 값, 
  writable: false(+생략시) || true , 
  enumerable: false(+생략시) || true , 
  configurable: false(+생략시) || true  
}); 
~~~

~~~~javascript
// 접근자 프로퍼티 get , set 둘다 미작성시 데이터 프로퍼티 가 된다.
Object.defineProperty(객체명, ‘생성 및 바꿀 프로퍼티명’, { 
  get: function (){}, (기명함수, 익명함수 모두가능.(단 기명함수 이름은 외부에서 소용없다.) 미작성시 undefined),
  set: function (){}, (기명함수, 익명함수 모두가능.(단 기명함수 이름은 외부에서 소용없다.) 미작성시 undefined),
  writable: false(+생략시) || true , 
  enumerable: false(+생략시) || true , 
  configurable: false(+생략시) || true  
}); 
~~~~

<br/>

`Object.keys(객체명)`

- 해당 객체에 있는 프로퍼티 키 들 만 배열형태로 반환한다.

`Object.values(객체명)`

- 해당 객체에 있는 프로퍼티 값 들 만 배열형태로 반환한다.

`Object.entries(객체명)`

- 해당 객체에 있는 프로퍼티 키와 값 쌍의 배열을 ➤ 배열형태에 담아 반환한다.

  ~~~~javascript
  console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]
  ~~~~

<br/>

`객체명 instanceof 생성자함수명`

instanceof 연산자는 이항 연산자로서 좌변에 객체를 가기키는 식별자, 
우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다.
만약 우변의 피연산자가 함수가 아닌 경우, TypeError가 발생한다.
평가 결과는 boolean으로 반환한다.

<br/>

` '프로퍼티 키명' in 객체명`

상속받은 모든 프로토타입의 프로퍼티 와 자신의 프로퍼티까지 모두 확인한다.

해당 객체에 프로퍼티 키가 존재하는지 안하는지를 boolean 형태로 반환한다.

~~~javascript
const person = { name: 'Lee', address: 'Seoul' };

// person 객체에 name 프로퍼티가 존재한다.
console.log('name' in person);    // true
// person 객체에 address 프로퍼티가 존재한다.
console.log('address' in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log('age' in person);     // false
~~~

<br/>

`for…in 문`

- 객체의 모든 프로퍼티를 순회하며 열거(enumeration)하려면 for…in 문을 사용한다. 

- for…in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다.

- for...in문은 실질적으로 실행되는 위치가 `{}`안이므로 `let` , `const` 를 사용할 수 있다.

  ( `const`를 재 할당이 아닌 재 선언으로 취급한다. )

```javascript
for (변수선언문 in 객체) { … }
const person = {
  name: 'Lee',
  address: 'Seoul'
};

// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다. 단, 순서는 보장되지 않는다.
for (const prop in person) {
  console.log(prop + ': ' + person[prop]);
}

// name: Lee
// address: Seoul
```

<br/>

### 빌트인 전역 함수 (전역객체(window)의 메소드)

eval : 문자열 형태로 매개변수에 전달된 코드를 런타임에 동적으로 평가하고 실행하여 결과값을 반환한다. (가급적 사용 금지)

isFinite : 유한수 , 무한수인지 체크 boolean 반환

isNaN : NaN인지 판단하여 boolean 반환

parseFloat : 문자열을 부동소수점 숫자로 변환하여 반환한다.

parseInt : 문자열을 정수형 숫자로 변환하여 반환한다.

encodeURI / decodeURI : 매개변수로 전달된 URI를 인코딩한다.

encodeURIComponent / decodeURIComponent : 쿼리 파라미터 구분자로 사용되는 =, ?, &를 인코딩한다.

<br/>

### 고차 함수들

#### filter 함수

~~~javascript
배열객체명.filter(function(currentValue, index, Array) {
	return return의 조건식이 true인 currentValue 만 모아서 반환 
}            
~~~

<br/>

#### map



foreach , map , reduce , findIndex , for~of(객체를 이터러블 화 할 필요가 있다.)

setTimeout

------------

number 타입 - Math.abs(); , 고차함수

string 타입 - split, splice, slice, join, 공백없애는함수

array 타입 - 고차함수, indexOf

객체 - for in