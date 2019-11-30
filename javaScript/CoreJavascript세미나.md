----------

# 코어 자바스크립트 세미나

## 정재남 저자님

-----------

- Data Types



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

<br/>

원시타입 

var a;

a = 'abc';

<br>

### 2강 : 실행 컨텍스트 (Execution Context)

**실행에 필요한** 코드 흐름상의 배경이 되는 조건/환경.

**동일한 조건 / 환경을 지니는 코드 뭉치**  ( = 함수 또는 전역공간) 를 실행할 때 필요한 조건 /환경 정보.

함수를 실행할 대 필요한 환경 정보. (를 담은 객체)

<br/>

렉시컬 환경

environmentRecord (현재 문맥의 식별자 정보) - 호이스팅 : 식별자 정보를 끌어올린다.

outerEnvrionmentReference (현재 문맥에 관련 있는 외부 식별자 정보) - 스코프 체인

<br/>

### 3강 THIS

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

### call back function

> call back : 호출 하다. 다시 돌려주다. return
>
> function : 함수

제어권

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