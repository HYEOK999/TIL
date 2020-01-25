![React-Router01](https://user-images.githubusercontent.com/31315644/71559787-b43ba680-2aa5-11ea-822a-b8a1660c923d.png)

----------------

## React Router with Velopert - 01 -

- SPA
  - SPA 란?
  - non-SPA
  - SPA 장점
  - SPA 단점
  - 주로 사용되는 리액트 라우터 라이브러리
    - 리액트 라우터 react-router
    - next
- 리액트 라우터 react-router
  - BrowserRouter
  - HashRouter
  - MemoryRouter
  - StaticRouter
  - Route
  - Link

<br/>

------

# Chap 1. SPA 와 react-router

<br/>

## SPA

### SPA 란?

Single Page Application의 html 페이지가 1개인것을 의미한다. (화면이 한개라는 의미는 아니다.)

SPA에서는 **라우팅**을 클라이언트가 담당한다.

여기서 **라우팅**은 어떤 주소에 어떤 UI를 보여줄지 에 규칙을 정하는 작업이다.

<br/>

### non-SPA

non-SPA에서는 서버에서 라우팅 작업을 담당했다.

non-SPA, 즉 정통적인 웹 어플리케이션은 특정 데이터의 처리에 대한 응답을 하기 위해서 반드시 html 페이지를 반환해야 되기 때문에 자연스럽게 웹페이지가 많아지게 되었고, 새로고침을 지속적으로 일으켜야만 했다. 

이러한 서버측의 처리는 서버자원을 많이 소비하게 되었고, 불필요한 트래픽도 낭비하게 되었다.

<br/>

### SPA 장점

SPA에서는 어떤 주소에서 어떤 UI를 보여줄지는 클라이언트가 담당한다.

서버는 그저 클라이언트가 선택한 페이지에 필요한 데이터만 응답해주면 되기 떄문에, 서버쪽은 서버자원을 많이 아끼고 사용자는 UX가 향상될 수 있다.

<br/>

### SPA 단점

1. 앱의 규모가 커지면 JS파일의 크기가 커질 수 있다. (Code Splitting 으로 해결가능)

   Code Splitting : 각 기능별로 파일을 나누어놓고 필요한 시점에 해당 파일을 불러올 수 있다.

2. 브라우저에서 JS가 구동되지 않으면 UI를 볼 수 없다. -> 검색엔진에서 크롤링이 불가능해진다.( Server Side Rendering으로 해결 )

<br/>

### 주로 사용되는 리액트 라우터 라이브러리

1. react-router
2. next

<br/>

#### 리액트 라우터

> 컴포넌트 기반 라우팅
>
> 라우터 컴포넌트를 만들고 라우터 컴포넌트의 props에 컴포넌트를 렌더링하는 방식

<br/>

#### next

> 서버 사이드 렌더링을 쉽게 구현 가능하다.
>
> 파일 경로, 이름을 기반으로 라우팅을 한다.

<br/>

## 리액트 라우터 react-router

> 써드 파티 라이브러리, 라우팅으로 가장 많이 사용되고 있는 라이브러리.

클라이언트 사이드에서 이뤄지는 라우팅을 간단하게 해준다.

주요 컴포넌트 : `<BrowserRouter>` , `<HashRouter>`, `<MemoryRouter>`, `<StaticRouter>`, `<Route>`, `<Link>`

<br/>

### 1. BrowserRouter

<img src="https://user-images.githubusercontent.com/31315644/70965484-263de400-20d3-11ea-8851-a915fa07a14c.jpeg" alt="BrowserRouter" style="zoom:50%;" />

가장 많이 사용되는 컴포넌트.

HTML5에는 History API라는 것이 있다. 

위 API는 브라우저의 주소표시줄에 나타나는 경로를 바꿀 수 있다.

여기서, 주소만 바꾸는 것이고 서버에 요청을 하지않는다. 즉, 페이지를 새로 로드하지는 않는다.

<br/>

### 2. HashRouter

<img src="https://user-images.githubusercontent.com/31315644/70965491-28a03e00-20d3-11ea-9ddc-1c97afab37fc.jpeg" alt="HashRouter" style="zoom:50%;" />

엣날에 자주 쓰이던 라우팅 방식. 

주소 뒤에 `#` 태그를 넣는 방법을 이용한다. ( `example.com/#/path/to/route` )

엣날 브라우저에서도 작동하는 장점이 있다. (`BrowserRouter`는 IE 6 ~ 9 에서 사용 할 수 없다.)

<br/>

### 3. MemoryRouter

<img src="https://user-images.githubusercontent.com/31315644/70965486-26d67a80-20d3-11ea-8b77-a0ed15c0f2e6.jpeg" alt="MemoryRouter" style="zoom:50%;" />

브라우저의 주소와는 전혀 관계가 없다. 

브라우저가 아닌 환경에 사용하기 좋다.

테스트 환경, 임베디드 웹앱 ( 웹 어플리케이션이 전부 리액트가 아니라 일부분만 리액트 일 경우 ), 리액트 네이티브에서 사용한다.

<br/>

#### 4. StaticRouter

<img src="https://user-images.githubusercontent.com/31315644/70965488-2807a780-20d3-11ea-84a9-d5269a4472f1.jpeg" alt="StaticRouter" style="zoom:50%;" />

서버 사이드 렌더링에 이용

<br/>

#### 5. Route

![Route](https://user-images.githubusercontent.com/31315644/70965498-2b029800-20d3-11ea-93f1-1269c1476267.jpeg)

라우트를 정의할 때 사용하는 컴포넌트. 

어떤 경로로 들어왔을 때, 어떤 컴포넌트를 보여줄것인지 설정할 수 있다.(`path`)

<br/>

#### 6. Link

![Link](https://user-images.githubusercontent.com/31315644/70965495-2a6a0180-20d3-11ea-8d0e-d718a37720ca.jpeg)

`a` 태그로 구성되어 있다. 

하지만 `Router`의 주소만 바꿔줄 뿐, 새로고침 하지는 않는다.