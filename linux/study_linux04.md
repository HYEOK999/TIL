![리눅스](https://t1.daumcdn.net/cfile/tistory/9923B0495D66434618)

---

### 프로세스

- cpu - processor (process X)

- ram - memory

- hdd, sdd - storage

**각 특징 : **

1. Storage : 가격이 싸고, 용량이 크다. 속도가 느리다 

2. Memory : 가격이 비싸고 , 용량이 작다. 속도가 빠르다 

3. processor : 기격이 매우비싸고, 용량이 매우작고, 속도가 매우빠르다

 <br/>

**프로세스 관련 명령어**

- 프로세스 리스트를 확인하는 명령어 : ps

- 백그라운드에서도 돌아가는 ps까지 확인하는 방법 : ps aux

- 이 중 특정 이름의 프로그램을 찾고싶다 -> : ps aux | grep apache

 <br/>

**프로세스를 끄는 방법**

- sudo kill [process-ID]

**프로세스 리스트를 확인하는 명령어1** : top

**프로세스 리스트를 확인하는 명령어2** : htop (별도 설치해야됨) 

<br/>

### 그 외 명령어 및 개념

멀티 태스킹 : 여러개의 일을 하나의 화면에서 할 수 있다.

백그라운드로 멈추어서 보내는법 : ctrl + z 

백그라운드에 실행되는 상태로 보내는법 : 명령어 맨뒤에 &를 넣어준다.

ex) ls -la &

포그라운드로 가져오는법 : fg

jobs : 백그라운드에서 실행 중인 프로그램 확인.

+표시 : 백그라운드로 물러나있다가 포그라운드로 들어오는 프로그램

-표시 : +로 된 백그라운드가 끝나고나서 실행될 프로그램

백그라운드 종료 : kill %[번호]

백그라운드 강제 종료 : kill -9 %[번호]

 <br/>

#### 항상 실행 - Demon

Web server = Demon

데몬은 /etc/init.d에 위치해 있다.

데몬을 키는방법은 `sudo service [파일명] start`

ex) sudo service apache2 start

데몬을 끄는방법은 `sudo service [파일명] stop`

ex) sudo service apache2 stop

 <br/>

**데몬이 자동으로 실행되는 경우를 확인하는방법**

아래 위치의 폴더에서 확인 가능하다.

/etc/rc3.d -> CLI방식

/etc/rc5.d -> GUI방식

 <br/>

rc3.d로 `cd` S02apache2 

- S는 리눅스가 실행되면 실행된다. 는 것을 의미.

- 02는 우선순위

 <br/>

자동 데몬을 만들려면 실행시키고 싶은 프로그램을 rc3.d 혹은 rc5.d 폴더에 규칙대로 파일명을 생성하고 링크를 걸어준다.

 <br/>

 

### CRON

`CRON` : 정기적으로 실행시키는 도구

`crontab -e `: 하고자 하는 일을 정의.

> [실행되는 분의주기 */1 = 1분에 한번 ] [실행되는 시간 *=상관없음] [실행되는 일] [실행되는 월] [실행되는 요일] [실행될 명령어] 

date >> date.log = 현재시각을 게속 저장함

`crontab -e `

`*/1 * * * * date >> date.log 2>&`

의미 :  1분마다 date라는 명령어의 결과를 date.log에 저장하는데  만약 에러가 나면 표준출력으로 redirection나게한다. 

 <br/>

쉘이 실행될때  /bin/bash/.bashrc라는 파일을 실행되도록 설정되어있음.

따라서 쉘이 시작할때 무언가를 하고싶다면 .bashrc 안에서 설정해주면됨.

 <br/>

### 다중사용자

`명령어 id` -> 나는 누구인가?

`명령어 who` -> 현재 시스템에 누가 접속해있는가?

 

#### 유닉스의 계열의 2가지형태의 사용자

1. super(root) user

2. 일반 user

 

#### super(root) user

- sudo는 슈퍼유저의 권한을 빌려오는것

- $표시 현재 사용자가 일반유저라는것을 의미, 슈퍼유저는 #

 

**명령어 su **

`su - root` : 슈퍼 유저로 사용자 변경

슈퍼유저에서 빠져나가는법 exit.

 

`sudo passwd -u root` : root에 대해 lock을 풀어버림.

`sudo passwd -l root` :  root에 대해 lock을 걸어버림.

 

`cd`  : 최상위 디렉토리

`cd /root` : 최상위 디렉토리 안에 있는 root디렉토리

 

#### 사용자 추가

`useradd -m 사용자명` : 처음, 사용자를 추가하면 passwd를 설정해야함.

`sudo passwd 사용자명`

`sudo usermod -a -G sudo 사용자명`

 

#### 권한 변경하는법

`chmod o-r 파일명` : other에 대한 파일권한중 읽기를 뼴

`chmod o+r 파일명` : other에 대한 파일권한중 읽기를 추가해줌.

`chmod o+w 파일명` : other에 대한 파일권한 쓰기를 추가해줌.

`chmod u-r 파일명` : 소유자에 대한 읽기권한을 뺴버림.

 

#### directory 권한

`r` = 해당 폴더의 내용을 확인

`w` = 해당 폴더의 내용물에 파일생성등등

`x` = 해당 폴더의 접근.(cd)

 

`chmod -R o+w [폴더명]` : 해당 폴더와 폴더내에잇는 모든 파일들 권한을 변경함.

 

#### 숫자 변경법

`chmod 444 perm.txt` : perm.txt에 대한 권한을 모두 read로 변경

 

#### 사칙연산법

`chmod a=rwx perm.txt` : perm.txt에 대한 모든 사용권한을 오픈함.

