

<br/>

### 리눅스

command line interface 

ls : 파일보기

​	옵션 -l : 파일권한, 소유자,생성시간등의 자세한 정보를 추가로 나열해준다.

pwd : 현재 놓여있는 디렉토리를 파악한다.

mkdir : 폴더생성

touch [파일명] : 파일생성

cd [디렉토리명] : 현재 디렉토리 위치 변경

​	디렉토리 변경시 2가지 방법이 있다.

	1. 절대경로  예) cd /home/ubuntu.      => / : root를 의미한다.
 	2. 상대경로  예) cd ..                           => 상대경로는 내 위치에 따라서 위치를 조정하는것.

rm [파일 명] : 파일 삭제 명령어 

rm -r [파일명] : 폴더 삭제 명령어

모든 명령어 뒤 --version :  해당 명령어의 버전을 알려준다.

모든 명령어 뒤  --help : 명령에 무슨 옵션이 있는지, 어떠한 기능을 하는지 설명 도움말을 보여준다.

man [명령어명] : 예) man ls     

​	 거기서 상세 단어 검색 : 예) /sort : sort라는 단어 검색 -> 넘기는 방법은 n키 누르면 됨. 돌아가는 방법은 b키 누르면 됨.			

man과 --help의 차이 : help는 간결하게 명령어의 기능및 옵션 / man은 상세하게 보여준다.

mkdir -p [파일명] : 예) mkdir -p dir1/dir2/dir3/dir4  -> 부모 디렉토리를 만들수 있다.

옵션 -는 축약형 --는 기본형 ex) mkdir -p / mkdir --parent

숨긴파일은 파일명 앞에 . 이 붙는다.

숨긴파일을 보는 방법은 ls -a / ls --all 옵션으로 보면 된다.

mv [원본파일] [이동위치 또는 변경할 파일명]

cp [원본파일] [대상위치]

<br/>

### 명령어 검색방법

구글에서 검색한다. 예) 구글에서 create a directory in linux

<br/>

### sudo : 임시로 권리자 권한을 빌려온다.

super user do -> 권리자 권한 

제일 심각한 명령어 : sudo rm -rf / => 묻지도 따지지않고 루트디렉토리 전부 삭제

sudo [command] 권한만 빌림.

su - : root계정으로 전환함.

<br/>

### Package manager ( 리눅스 apt / yum)

​	보통 권한이 필요하기 때문에 sudo를 사용해야만 한다.

- sudo apt-get update	:  현재 사용할 수 있는 패키지들의 목록을 최신상태로 업데이트한다.
- sudo apt-get install [패키지명]	:  패키지를 다운로드 받는다.
- sudo apt-get upgrade [패키지명] : 패키지를 최신상태로 업데이트 한다. 패키지명 생략시 모든 패키지를 업데이트 한다.
- sudo apt-get remove [패키지명]: 패키지를 삭제한다.
- sudo apt-cache search [패키지명]: [패키지명]와 관련된 패키지 목록을 보여준다.

<br/>

### homebrew ( 맥용 )

​	맥에서 주로 사용하는 패키지 매니저

- brew search [패키지명] : [패키지명]과 관련된 패키지 목록을 보여준다.
- brew install [패키지명] : [패키지명]과 관련된 패키지를 다운받는다.
- brew list : 로컬에서 homebrew를 통해 설치한 패키지목록을 표시해준다.
- brew uninstall [패키지명] : [패키지명]을 삭제한다.
- brew upgrade [패키지명] : [패키지명]을 업데이트한다.
- brew update : homebrew로 사용가능한 패키지들의 목록을 업데이트한다.

<br/>

### 리눅스 명령어 기반에서 다운로드 받는 방법

​	다운로드 받을 프로그램이 필요하다. ( wget 이용 )

​	wget url주소 : 파일명 그대로 받게됨.

​	wget -O [파일명] url주소

<br/>







 