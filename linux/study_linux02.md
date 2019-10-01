![리눅스](https://t1.daumcdn.net/cfile/tistory/9923B0495D66434618)

------

## 

### Shell

![](https://t1.daumcdn.net/cfile/tistory/2624B85057625BF50C)

`Shell` : 입력한 명령어를 해석해서 Kernel이 이해할 수 있는 방식으로 전달. 

`Kernel` : 하드웨어를 제어해서 명령어를 수행할수 있도록 처리.

입력 USER -> SHELL -> KERNEL -> HARD WARE 

출력 HARD WARE -> KERNEL -> SHELL -> USER

<br/>

### bash vs zsh

​	`bash` : 대부분의 리눅스에서 사용하는 기본 쉘

​	`zsh` : bash 에서 사용되는 대부분의 명령어 호환이 되면서 훨씬 좋은 기능과 성능, 사용성들을 제공

​	`echo $0` 으로 현재 사용중이 쉘이 무엇인지 확인이 가능하다.

<br/>

### Shell script

​	shell에서 실행되는 명령들을 어딘가에 저장해놓고 실행하게끔 설정하는것.

​	쉘 스크립트 만드는 방법

1. **코드 작성**

   vi backup

 ~~~~~html
#!/bin/bash
if ! [ -d bak ]; then
        mkdir bak
fi
cp *.log bak
 ~~~~~

`if ! [-d bak];` : 현재 디렉토리에 bak라는 디렉토리가 존재하지 않는다면

`then mkdir bak` : bak이라는 폴더를 만든다.

`fi` : 위 조건문이 끝났다라는 걸 의미.

`cp *.log bak` : 현재 디렉토리에 있는 .log라고 끝나는 모든 파일을 bak에 복사한다.

<br/>

2. **chmod +x backup**

backup을 실행하기 위해 권한을 변경한다.

<br/>

3. **./backup**

실행.

<br/>

<br/>

### 디렉토리 구조

`/bin` : 사용자들이 사용하는 명령어들의 모임

`/sbin` : 시스템 실행프로그램들이 모여있다.

`/etc` : 기타 설정 파일들이 모여있다.

`/var` : `bin` `sbin` `etc` 는 업데이트가 이루어지지않는한 파일이 잘 변하지않는다. `var`에 들어간 파일들은 로그와 같은 용량이 변하는 파일들의 모음이다.

`/tmp` : 임시 파일들이 저장되는 파일들의 모임.

`/home`: 시용자의 디렉토리가 모여있는 모임. 보통 cd ~ 시 home디렉토리로 한번에 이동이 가능하다.

`/lib`: `/bin` `/sbin`이 사용하는 라이브러리가 모여있는 폴더.

`/usr`: 사용자 프로그램들이 들어있는 폴더. 보통 `/bin` `/sbin` `/lib` `/local`  등이 모여있다.

<br/>

### 파일 찾는 법 locate / find 명령어

1. `locate [파일명]` : `locate`는 파일을 뒤져서 찾는 것이 아닌,데이터베이스를 뒤져서 파일들의 위치를 찾는다.

2. `find` : 디렉토리를 실제로 뒤져서 찾는다. `locate`보다 사용성이 뒤쳐진다.
   find [찾기 쉬작할 위치] -name [파일명]   |  *ex*) find . -name *.log  //현재 폴더에서 .log라는 파일을 찾는다.


<br/>

### 명령어 찾는법 whereis 

- *ex*) whereis ls : ls 라는 명령어를 찾아준다. 

<br/>

### $PATH (환경 변수)

- 명령어를 치는 순간 명령어가 저장되어있는 디렉토리가 어디 있는지 알려주는 표지판 역할을 한다.
- whereis 로 검색시 표기되는 명령어는 이것을 이용한것이다.

<br/>

