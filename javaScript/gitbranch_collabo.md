![chain](https://user-images.githubusercontent.com/31315644/67828520-0cdadb80-fb17-11e9-8f7c-a85e1454eb01.jpeg)

----------

- git branch
  - branch 확인
  - branch 새로 만들기
  - branch 이동 (반드시 커밋 다 하고 넘어가야됨)
  - 타 브랜치 내용 병합
  - git checkout 브랜치명 -> 해당 브랜치에서 푸쉬하기
  - master 브랜치에서 최신상태를 땡겨오기
  - 브랜치 지우기
  - 실제 개발환경에서 브랜치 설정 예
- 협업
  - git-flow 란?
    - git flow 지원 확인
  - 실습
    -  git flow init
    - 기능 feature 브랜치 생성  - `git flow feature start 브랜치명`
    - 기능 feature 브랜치 개발 완료 후 -> 종료 -> devleop에 병합하기 - `git flow feature finish 브랜치명`
    - feature 브랜치 에서 develop 브랜치 병합치기. - (feature 브랜치에서) `git merge develop`
    - feature 브랜치 에서 develop 브랜치 병합치기. - (feature 브랜치에서) `git merge develop`
    - feature branch 지우기
  - 배포
    - release start
    - release finish
    - git 파일 이동 시 주의점
  - 협업 
    - 예시 일반적 (팀원 기준)
    - 시나리오

------------

## git branch

### branch 확인

~~~
gir branch
~~~

<br/>

### branch 새로 만들기

~~~
git branch 브랜치명
~~~

<br/>

### branch 이동 (반드시 커밋 다 하고 넘어가야됨)

~~~
git checkout 브랜치명
~~~

<br/>

### 타 브랜치 내용 병합

~~~
git merge 브랜치명
~~~

 ( **만약 , 충돌이 난다면  ➤  충돌 수정 후  ➤  git add  ➤  git commit 재실행 )**

github 페이지  ➤  insight  ➤  Network에 보면 현재 git의 상태가 어디쯤인지 파악할수 있다.

<br/>

### git checkout 브랜치명 -> 해당 브랜치에서 푸쉬하기

~~~git
git checkout 브랜치명
git push -u origin 브랜치명 
~~~

<br/>

### master 브랜치에서 최신상태를 땡겨오기

~~~
git pull origin master
~~~

<br/>

### 브랜치 지우기

~~~
git branch -D 브랜치명
~~~

<br/>

###  실제 개발환경에서 브랜치 설정 예

master  - develop을 머지

 ⌙ develop - layout을 머지

​		⌙ layout  ->  차후 develop에 커밋

이 과정을 Git-flow로 한다.

<br/>

---------

## 협업

### Git-Flow란?

- git-flow는 전략적으로 관리하는 Git을 쉽고 편하게 도와주는 도구. :)

<br/>

#### git flow 지원 확인

~~~
git flow
~~~

<br/>

### 실습

- `git push -u origin master `: 새로운 브랜치에 대한 존재를 remote에게 알리기 위해 사용. (처음에만 알리면 됨.)
- `git branch` : 현재 만들어져있는 브랜치 확인.
- `git checkout 브랜치명` : 해당 브랜치로 이동. (어디서나 가능, 개념이기 때문)

#### 1. git flow init

- `git flow init`을 한 순간 `develop` 브랜치를 만들고 `develop`으로 checkout까지 함.

~~~
git flow init
> 기본 [master]
> 전부 엔터
~~~

![git1](https://user-images.githubusercontent.com/31315644/67849283-aa4f0300-fb49-11e9-86f0-f8c725e259e3.jpeg)

<br/>

#### 2. 기능 feature 브랜치 생성  - `git flow feature start 브랜치명`

- `feature`는 `develop`에서 따야만 하므로 현재 위치가 `develop`인지 확인을 먼저 한다.
- `feature`브랜치 이름은 브랜치 이름만 들어도 알 수 있게금 이름 디테일을 확실히 해야 한다.
- 자동으로 만든 브랜치로 이동한다.

~~~
// git flow feature start 브랜치명
git flow feature start markup-init
~~~

<br/>

#### 3. 기능 feature 브랜치 개발 완료 후 -> 종료 -> devleop에 병합하기 - `git flow feature finish 브랜치명`

- 자동으로 `develop` 브랜치로 이동한다.
- 해당 기능 `feature` 브랜치에서 작성했던 내용은 상위 브랜치로 병합된다.

~~~
// git flow feature finish 브랜치명
git flow feature finish markup-init
// 자동으로 develop 브랜치로 이동하게 됩니다.
~~~

 <br/>

#### 4. feature 브랜치 에서 develop 브랜치 병합치기. - (feature 브랜치에서) `git merge develop`

- 새로운 `feature` 가 만들어 져 있다고 가정 ( 이미 다 하고나서 생성하면 자동 병합된다. )

~~~
// git flow feature start 브랜치명
git flow feature start style-init
~~~

- `develop` 브랜치의 내용을 해당 `feature` 브랜치로 가져오기
- 현재 위치는 `feature` 브랜치

~~~
// git flow feature start 브랜치명
git merge develop
~~~

<br/>

#### feature branch 지우기

- 만들고 개발중이던 기능이 아예 무산됬다고 가정
  1. 상위 브랜치(develop)으로 올라간다. ->  `git checkout 브랜치명`
  2. 해당 기능 브랜치를 제거 해버리면된다. ->  `git branch -D feature/브랜치명`
- 해당 기능 브랜치는 commit이 되어있어야 한다. 

~~~
git flow feature start wrong-feature
// ~~~ 내용 추가 (html 파일 생성 내용 추가등등)
// html 내용 git add -> git commit 
// 해당 기능이 무산됨. 해당 wrong-feature가 존재해서는 안됨.

// 1. 상위 브랜치로 이동(develop)
git checkout develop

// 2. 해당 브랜치에서 잘못된 기능 브랜치를 제거한다.
git branch -D feature/wrong-feature
~~~

<br/>

### 배포

![버전](https://user-images.githubusercontent.com/31315644/66800837-c94a7400-ef51-11e9-874f-af33c780e892.png)

#### release start

- 배포 버전 브랜치를 생성한다.
- 맨뒤에 버전 명을 적어주어야 한다. 

~~~
git flow release start v0.0.1.001910300002
~~~

<br/>

#### release finish

- release finish 명령이 되면 자동으로 모든 내용이 master와 병합이된다.
- finish 후 branch 위치는 develop
- develop push , master push 전부 해야한다.

~~~
git flow release finish v0.0.1.001910300002
~~~

<br/>

#### git 파일 이동 시 주의점

- git이 관리하는 폴더 중에 파일을 강제로 이동,잘라내기를 해서 다른곳으로 이동시키면 git은 해당 파일이 삭제되고 다른 쪽에 새로 생긴걸로 착가한다. ( `mv 파일명 이동위치명` )
- 따라서 이것을 방지하기 위해 앞에 `git mv 파일명 이동위치명`을 적어준다. 

<br/>

### 협업 예시

#### 일반적 ( 팀원 기준 )

팀장의 깃 폴더를 fork 뜬다. ➢ 로컬에서 내 레포(fork한) git clone을 한다. ➢ clone한 폴더로 이동한다. ➢ 
git flow init을 한다. ➢ git flow feature start 브랜치명 ➢ (현재 위치:feature 브랜치) 해당 브랜치에서 내용 수정 ➢ 
add / commit ➢ git flow feature finish 브랜치명 ➢ (현재 위치:develop) 자신의 레포에 푸쉬 ➢ 
내용 변경 확인 후 ➢ git 페이지에서 pull request 버튼 클릭 ➢ 내 develop :  팀장의 devleop ➢ 메시지 작성 ➢ 전송 ➢ 
팀장 레포에서 풀리퀘스트를 받아주면 팀장의 develop에 작업내용 반영.

<br/>

### 시나리오

#### 팀장

1. 레포 생성 ➢ git clone ➢ git flow init (자동 develop 브랜치 이동) ➢ touch index.html 생성 ➢ git add, commit  ➢ git push 

<br/>

#### 팀원 A

2. 팀장 깃을 fork를 한다. ➢ fork 한 자신의 레포를 clone ➢ git flow init ➢ (현재 develop) git pull origin develop ➢ git feature start ➢ git feature finish ➢ push ➢ 자신의 git 페이지에서 Create pull request(github.com) 

<br/>

#### 팀장

3. Merge pull request(github.com) 

<br/>

#### 팀원 B (2번에서 팀원 A와 fork만 같이 한 상황)

4. git rmote add pmorigin [팀장깃주소] ➢ git pull pmrorigin develop
5. 팀장에서 issue를 남긴다 .

<br/>

#### 팀장

6. issue 확인 하고 역할 분배 - Assignees : 담당자 , Labels : 업무

![zxzx21](https://user-images.githubusercontent.com/31315644/67849282-a9b66c80-fb49-11e9-8813-6e512a6e651d.jpeg)

<br/>

#### 팀원들

7. git rmote add pmorigin [팀장깃주소]  (리모트 연결했다면 생략가능) ➢ git pull pmorigin develop  ➢ git feature start ➢ 내용작성 ➢ git add/commit ➢ git feature finish ➢ push ➢ 자신의 git 페이지에서 Create pull request(github.com) 

<br/>

#### 팀장

8. Merge pull request(github.com) ➢ git pull ➢ git flow release start v0.0.1.001910300001 ➢ git flow release finish v0.0.1.001910300001 ➢ (현재 위치 develop)  ➢ git push ➢ git checkout master ➢ (현재 위치 master) ➢  git push

**모든 팀원은 merge 발생 시 pm-origin의 develop을 자신의 develop 으로 pull 하여 업데이트 한다.**

<br/>