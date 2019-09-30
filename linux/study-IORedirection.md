![리눅스](https://t1.daumcdn.net/cfile/tistory/9923B0495D66434618)

----

## [Input/Output] IO Redirection

<br/>

### Output : 출력 redirection -> 출력위치를 변경할 수 있다. (보통은 모니터)

​	예) ls -l > result.txt  = ls -l의 결과(Standard Output)를 result.txt에 저장한다.

​	총 2가지의 Output 이 존재한다.

- Success : 성공했을 경우의 Output 
- Error : 실패했을 경우의 Output

> Standard Output으로 redirection 하는 방법 : 1> 
>
> Error Output으로 redirection 하는 방법 : 2> 

ex) rm rename2.tex 1>result.txt 2>result.txt

<br/>

### Input : 입력 redirection 

Standard Input : keyboard

예) hello.txt 안에는 hello 라는 텍스트가 저장되어있다. 만약에 hello.txt파일 안의 내용을 cat으로 출력하고 싶다면 다음과 같이 작성한다.

1. cat < hello.txt
2. cat hello.txt

<br/>

### IO Redirection Ouput Append

ls -al > result.txt 할 경우 result.txt로 결과가 저장된다.

그 후 ls -a > result.txt할 경우 result.txt로 결과가 **덮어씌우게 된다**

만약 추가를 하고 싶다면 다음과 같이 사용해야만 한다.

> ls -al >> result.txt



