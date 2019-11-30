![core](https://user-images.githubusercontent.com/31315644/69897935-d7374580-1395-11ea-9ed6-d5b3898b3d76.jpeg)

----------

# 코어 자바스크립트 세미나

## 정재남 저자님

-----------
**Index**
- Data Types
- 실핼 컨텍스트
- This
- call back function
- 클로저
- prototype

---------

### 1강  : Data Types

⇥ 원시 타입

- Number
- String
- Boolean
- null
- undefined

⇥ 참조 타입

- Array
- Function
- RegExp

<br>

### 2강  : 실행 컨텍스트 (Execution Context)

**실행에 필요한** 코드 흐름상의 배경이 되는 조건/환경.

**동일한 조건 / 환경을 지니는 코드 뭉치**  ( = 함수 또는 전역공간) 를 실행할 때 필요한 조건 /환경 정보.

함수를 실행할 대 필요한 환경 정보. (를 담은 객체)

<br/>

렉시컬 환경

environmentRecord (현재 문맥의 식별자 정보) - 호이스팅 : 식별자 정보를 끌어올린다.

outerEnvrionmentReference (현재 문맥에 관련 있는 외부 식별자 정보) - 스코프 체인

<br/>

### 3강 : This

ThisBinding은 실행컨텍스트가 활성화 되는 순간에 한다.

그렇다면 실행컨텍스트의 활성화는? 해당 실행 컨텐스트를 포함하고 있는 함수가 호출 됐을 때!

즉, 함수가 호출되는 방식에 따라 this가 달라진다.

- 전역 공간에서 this : window
- 함수 호출시 this : window
- 메소드 호출 시 this : 메소드를 호출하는 주체(.앞에 있는 것)를 가리킨다. (a.b.c( ) 호출 시 -> a.b가 나온다.)
- 생성자 함수 호출 시 : 생성자 함수가 생성할 인스턴스.
- 콜백 호출 시 : 기본적으로 함수 내부에서의 동일.(제어권을 가진 함수가 this를 명시한 경우. 그것을 따름.)

<br/>

내부 함수에서의 우회법 

1. call, bind, apply

   ~~~~javascript
   function(x,y,x){
     console.log(this,x,y,z);
     var b={
       c:'eee';
     };
     a.call(b,1,2,3);
     a.apply(b,[1,2,3]);
     
     var c=a.bind(b)
     c(1,2,3);
     
   	var d=a.bind(b,1,2);
     d(3);
   }
   ~~~~

2. 화살표

3. 변수 이용.

3번 변수를 이용한 내부 함수에서의 우회법

문제

~~~javascript
var a = 10;
var obj = {
	a : 20,
	b : function () {
		console.log(this.a);  // 1 : obj
		
		function c () {
			cosnole.log(this.a); // 2 : window
		}
		c();
	}
}
obj.b();
~~~

2번도 obj가 뜨게 하는 방법은?

답

~~~javascript
var a = 10;
var obj = {
	a : 20,
	b : function () {
    var self = this;
		console.log(this.a);  // 1 : obj
		
		function c () {
			cosnole.log(self.a); // 2 : obj
		}
		c();
	}
}
obj.b();
~~~

변수에 this를 미리 담아서 이용한다.

<br/>

### 4강 : call back function

call back : 호출 하다. 다시 돌려주다. return

function : 함수

**제어권**

1. 실행 시점 (setInterver, setTimeout)

2. 인자 (forEach)

   ```javascript
   let arr = [1,2,3,4,5];
   let entries = [];
   arr.forEach(function (v, i) {
     entries.push([i,v,this[i]]);
   }, [10, 20, 30, 40, 50]);
   console.log(entries);
    
   [ [ 0, 1, 10 ], 
     [ 1, 2, 20 ], 
     [ 2, 3, 30 ], 
     [ 3, 4, 40 ], 
     [ 4, 5, 50 ] ] 
   ```

3. this

<br/>

콜백 함수의 특징

- 다른 함수 (A)의 인자로 콜백함수 (B)를 전달하면, A가 B의 제어권을 갖는다, A가 B의 제어권을 갖게 된다.

<br/>

### 5강 : 클로저

클로저 : 함수와 그 함수가 선언될 당시의 렉시컬 환경의 결합.

~~~javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  ineer();
}
var outer2 = outer();
console.log(outer2());
console.log(outer2());	
~~~

컨텍스트 A(`outer`)에서 선언한 변수 a를 참조하는 내부함수B(`inner()`)를 A의 외부(`outer2`)로 전달할 경우, A(`outer`)가 종료된 이후에도 a가 사라지지 않는 현상이 클로저다.

위 예제에서는 변수 a가 사라지지않고 게속 남아있다. 그것이 클로저다.

클로저의 활용 : 정보은닉, 초기화 

<br/>

**정보은닉 예)**

````javascript
function a() {
  var localA : 1;
  var localB : 2;
  var localC : 3;
  return {
    get a() { return localA; },
    set a(v) { localA = v; },
    get b() { return localB + localC; },
    set b(v) { throw Error('read only'); } 
  }
}
var obj = a();
````

localA , localB, localC 변수는 외부에서 접근이 불가능 하게 되었다.

외부에서 요구할 수 있는 건 get a() , set a(v) 가 된다.

즉, 함수 종료 이후에도 지역변수가 사라지지 않게 할 수 있다.

<br/>

### 6강 : prototype 

**Prototype**

![image](https://user-images.githubusercontent.com/31315644/69897804-5166ca80-1394-11ea-83f8-d3970a4dbf53.png)

<br/>

**프로토 타입을 이용해 생성자 함수에 접근하는 방법**

[생성자 함수].prototype.constructor

Object.getPrototypeOf([instance]).constructor

[instance].__ proto __.constructor

[instace].constructor

<br/>

**프로토 타입의 활용**

```javascript
fucntion Person(n, a){
  this.name = n;
  this.age = a;
}
Person.prototype.setOlder = function() {
  this.age += 1;
}
Person.prototype.getAge = function() {
  return this.age;
}
var lee = new Person('이순신', 40);
var ryu = new Person('류성룡', 30);
```

<br/>

### 7강 : 클래스

ES5 로 ES6에서 사용하는 클래스 구현해보기

ES5 에서 사용되는 즉시 실행함수로 클래스처럼 구현하기.



~~~javascript
var extendClass = (function(){
	function Bridge(){}
	return function(Parent, Child){
		Bridge.prototype = Parent.prototype;
		Child.prototype = new Bridge();
		Child.prototype.constructor = Child;
		Child.prototype.superClass = Parent;
	}
})();

function Person(name, age) {
	this.name = name || '이름없음';
	this.age = age || '나이모름';
}

Person.prototype.getName = function() {
	return this.name;
}

Person.prototype.getAge = function() {
	return this.age;
}

function Employee(name, age, position) {
	this.superClass(name, age);
	this.position = position || '직책모름';
}

extendClass(Person, Employee); // 소스

Employee.prototype.getPosition = function(){
	return this.position;
}
~~~

 소스 :  `extendClass`를 호출하게되면 인자로 함수 2개를 받는다.

Person 함수와 Employee함수인데 extendClass 함수에서 정리를 깔끔하게 위해 빈 함수 bridge함수를 만들고 bridge함수의 프로토타입에 Person함수의 프로토타입을 대입한다. 

그리고 2번째로 받은 인자 Employee함수의 프로토 타입에 bridge 함수를 생성자함수로 new호출한다. 

<br/>

위 과정을 클래스로 작성할 경우 다음과 같다.

~~~javascript
class Person {
  	constructor(name, age) { 
    	this.name = name || '이름없음';
      this.age = age || '나이모름';
    }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}
class Employee extends Person {
  constructor (name, age, position) {
    super(name, age);
    this.position = position || '직책모름';
  }
  getPosition() {
    return this.position;
  }
}
~~~



