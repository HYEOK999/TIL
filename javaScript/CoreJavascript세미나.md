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



