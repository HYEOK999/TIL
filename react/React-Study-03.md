![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

--------------

# React Re-Study : 3

React Component Styling

> React의 가장 큰 문제. CSS의 스타일이 컴포넌트간 침범이된다.

- [컴포넌트 스타일링 방법들](#a1)

- [Style Loaders](#a2)

- [PostCSS](#a3)

- [CSS, SASS](#a4)
  
  - [CSS](#a5)
  - [SASS](#a6)
  - [SASS 와 SCSS 의 차이](#a7)
  
- [CSS Module, Sass Module](#a8)
  
  - [CSS Module](#a9)
  - [SASS Module](#a10)
  - [classnames 사용하기](#a11)
    - [classnames 적용하기](#a12)
    - [classnames/bind 적용하기](#a13)
  
- [Styled Component](#b1)

  - [styled.태그](#b2)
  - [${props => props.프롭스명 && css`스타일`}](#b3)
  - [styled(컴포넌트)](#b4)
    - [styled(컴포넌트) - 컴포넌트를 반환 할 때](#b5)
  - [as="태그"](#b6)
  - [styled('태그') = styled.태그](#b7)
  - [${props => props.color || ''}](#b8)
  - [:hover {스타일}](#b9)
  - [::before {스타일} | ::after {스타일}](#b10)
  - [&:hover {스타일}](#b11)
  - [& ~ & {스타일}, & + & {스타일}
  - [&.클래스 {스타일}](#b12)
  - [.클래스 {스타일}](#b13)
  - [createGlobalStyle '스타일'](#b14)
  - [styled.태그.attrs(props => ({속성들})) - 중요](#b15)
  - [keyframes'키프레임'](#b16)

- [Ant Design](#c1)

  - [사용법](#c2)

  - [또 다른 사용법](#c3)

  - [Ant Design 레이아웃 -그리드-](#c4)

    - [Row gutter](#c5)

    - [Col offset](#c6)

    - [레이아웃 flex를 이용한 수직 정렬](#c7)

  - [Ant Design 레이아웃 -양식-](#c8)

<br/>

-----

## React Study with Mark - React Router -

### 컴포넌트 스타일링 방법들 <a id="a1"></a>

> 리액트는 style을 전역으로 관리하여 서로 간에 오염되므로 사람이 혹은 자동으로 맞춰줘야한다.
>
> 순서상 : 전부 관리 - 덜 관리 - 거의 자동으로 관리 순으로 배워보자.

1. CSS, Sass(SASS, SCSS)
2. CSS, Sass Module
3. Styled-components
4. Ant Design 

<br/>

### Style Loaders  <a id="a2"></a>

<img src="https://user-images.githubusercontent.com/31315644/72662816-0e89b080-3a2f-11ea-84e9-2cd7b8553c37.jpeg" alt="style01" style="zoom:50%;" />

리액트에서는 공식적으로 4가지의 css를 지원한다.

`npx creat-app`을 통해 만든 프로젝트는 자동으로 `webpack`과 `babel`을 포함하고 있다.

`webpack`에는 `babel`이 트랜스 파일 할수 있게 `style-loader` 와 `css-loader`가 설정되어 있는데 해당 `loader`들은 각각 아래의 확장자 파일들을 `index.css`로 합쳐주는 역할을 한다. (오염의 원인)

- CSS
- CSS Module
- Sass(.scss, .sass) - Sass에는 sass, scss가 있음 → PostCSS : `npm i node-sass 필요`
- Sass Module `npm i node-sass 필요`

<br/>

### PostCSS   <a id="a3"></a>

> 자바스크립트 플러그인을 사용해서 SASS/SCSS 를 css로 변환시켜주는 도구를  PostCSS라 한다.

- *PostCSS는 자바스크립트 기반의 플러그인을 사용하여 CSS 기능을 자동화하는* **소프트웨어 개발 도구**
- *PostCSS는 JS 플러그인을 사용하여 CSS를 변환시키는 툴* (위키피디아)
- 즉, PostCSS는 언어가 아닌 도구이다. 
- **PostCSS는 Babel을 통해 트랜스파일링되는 도구( loader )를 일컫는 말이다.**

<br/>

### CSS, SASS  <a id="a4"></a>

> 컴포넌트의 독립적인 스타일을 최대한 유지하기 위해서, CSS 구조를 개선시키기 위한 **CSS 개발 방법론**을 이용한다.

- [BEM](http://getbem.com/naming/) : Block Element Modifire 
- SMACSS
- OOCSS

여기서는 BEM에 대해서 다루도록 한다. ( Block, Element, Modifier )

**BEM** 

- 화면에 보여질 블록(block)을 기준으로 첫번째 순서의 네이밍을 작성한다.
- 그 다음에 블록 안의 요소(elements)들을 "__"으로 연결해서 네이밍을 작성한다.
- 그 다음에 수식어(모양이나 상태)를 "–"으로 연결한 뒤 네이밍을 작성한다.
- 수식어는 boolean이나 key-value 형태로 넣을 수 있다. (-disable, -color-red)
- 예를 들면 .header _ _ logo 또는 .form _ _ button–disabled과 같은 식이다.
- 클래스명이 용도와 형태를 의미하므로 직관적인 것이 장점, 길고 복잡해지는 것이 단점이다.

<br/>

#### CSS  <a id="a5"></a>

기존의 css는 아래처럼 작성한다.

``` css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #09d3ac;
}
```

그런데, css를 블록별로 구별(BEM처럼)하여 분리할 수 있다. 즉, 클래스네임을 더 짧게 줄이는 장점이있다.

```css
.App {
  text-align: center;
}

.App .logo {
  height: 40vmin;
}

.App .header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App .link {
  color: #09d3ac;
}
```

<br/>

#### SCSS   <a id="a6"></a>

scss를 이용할 경우 위에 작성된 css를 훨씬 더 직관적이게 블록화를 할 수 있고, 코드도 더 짧아진다.

```scss
.App {
  text-align: center;

  .logo { /* .App .logo */
    height: 40vmin;
  }

  .header { /* .App .header */
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link { /* .App .link */
    color: #09d3ac;
  }
}
```

<br/>

#### SASS 와 SCSS 의 차이  <a id="a7"></a>

> `{}`(중괄호)와 `;`(세미콜론)의 유무 

![sassscss](https://user-images.githubusercontent.com/31315644/72663119-0a12c700-3a32-11ea-8340-dc537617a409.png)

- `sass/scss`를 사용하기 위해서 `npm i node-sass` 필수. (`PostCSS` 이용)

<br/>

### CSS Module, Sass Module  <a id="a8"></a>

- `CSS Module`과` Sass Module`은 `React` 내장되어 있다. 
- Module을 사용할 경우 렌더링 되어서 화면에 표시될 때 클래스네임 끝에 hash값이 붙어서 나온다.
- `[filename]_[className]__[hash]`

<br/>

#### CSS Module  <a id="a9"></a>

![css-module](https://user-images.githubusercontent.com/31315644/72663442-26186780-3a36-11ea-934b-41f3718be8a1.jpeg)

```js
import styles from './App.module.css';

console.log(styles);
```

```css
/* ./App.module.css */
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #09d3ac;
}
```

<br/>

#### SASS Module  <a id="a10"></a>

![scss-module](https://user-images.githubusercontent.com/31315644/72663498-aa6aea80-3a36-11ea-94ac-7be497fd672b.jpeg)

```js
import styles from './App.module.scss';

console.log(styles);
```

```scss
/* ./App.module.scss */
.App {
  text-align: center;

  .logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

<br/>

#### classnames 사용하기  <a id="a11"></a>

- CSS/SASS Module을 사용하기 시작하면서, `className='스타일명'`라고 사용하는게 아니라, `className={스타일 모듈명.스타일명}` 으로 사용하기 시작햇다.

- 문제는 연속적인 스타일을 적용하기 시작할 때 문제가 생긴다.(예 - className='abc def' )

  ```jsx
  className='${styles.abc} ${styles.def}'
  ```

- 이러한 문제를 `classnames`라는 라이브러리를 이용해 해결한다.

`npm i classnames` 설치.

```jsx
import classNames from 'classnames';

console.log(classNames('foo', 'bar')); // "foo bar"
console.log(classNames('foo', 'bar', 'baz')); // "foo bar baz"

console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
console.log(classNames({ foo: true }, { bar: false })); // "foo"
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // "bar 1"
console.log(classNames(styles.button, styles.loading)); 
// Button_button__2Ce79 Button_loading__XEngF
```

- Button.module.css

```css
.button {
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;
}
```

- Button.jsx

  ` <button> {props.children} </button>;` 

  `<button {...props} />;` 

  `<button children={props.children}/>;` 은 같은 문법이다.

  * 참고로 모든 태그에는 `children` 이라는 속성이 존재한다. 

```jsx
import React from 'react';
import styles from './Button.module.css';

const Button = props => <button className={styles.button} {...props} />;

export default Button;
```

<br/>

##### classnames 적용하기  <a id="a12"></a>

- Button.jsx :` import classNames from 'classnames'` 추가;

```jsx
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

export default class Button extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log('start');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <button
        className={
          loading ? classNames(styles.button, styles.loading) : styles.button
        }
        {...this.props}
        onClick={this.startLoading}
      />
    );
  }
}
```

<br/>

##### classnames/bind 적용하기  <a id="a13"></a>

- `classnames` 사용시 `{ 스타일 모듈명.스타일명.해시: true }`라는 조건을 이용해야 해서 단어가 길고 복잡했다. 
- 따라서, `classnames.bind()`를 통해 함수로 리턴하여 더 짧게 줄여서 이용한다.

````js
const 변수명 = classnames.bind(스타일 모듈명)
````

```jsx
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames/bind'; // 수정 classnames -> classnames/bind

const cx = classNames.bind(styles);

export default class Button extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log('start');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
//<button className={loading ? classNames(styles.button, styles.loading) : styles.button} {...props}>버튼</button>
//<button className={loading ? cx('button', 'loading') : cx('button')} {...props}>버튼</button>
//<button className={cx('button', {loading: loading})} {...props}>버튼</button>
      <button
        className={cx('button', { loading })}
        {...this.props}
        onClick={this.startLoading}
      />
    );
  }
}
```

`cx('button', { loading })`에서 'button'은 항상 truthy값이므로 붙고, `loading`은 현재 값 여부에 따라 붙거나 붙지 않음.

- 만약 `loading`과 `css`의 `.loading`이름이 다르다면` { test: loading }`이 될것 ( `loading`값이 `true`면 `test class`추가)
- 여기서는 이름이 같으므로 간단하게 표기 가능하다.

<br/>

### Styled Component <a id="b1"></a>

> 이 컴포넌트가 이 스타일이라고 스타일을 지정해주면 자동으로 클래스로 변환

```bash
npm i styled-components
```

<br/>

#### styled.태그 <a id="b2"></a>

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default StyledButton;
```

- 브라우저에 버튼을 띄운 뒤 인스펙터로 찍어보면 알아서 클래스를 만들어준 것을 확인 할 수 있음.
  - `<button class="sc-AykKC fmcvyS">버튼</button>`
  - App.js 에서는 `<StyledButton>버튼</StyledButton>` 으로 사용.

<br/>

#### ${props => props.프롭스명 && css`스타일`} <a id="b3"></a>

```jsx
const StyledButton = styled.button`
	~스타일~

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;
```

- App.js에 `<StyledButton primary>Primary 버튼</StyledButton>`가 있다고 가정함.
- `props`에` primary`가 있다면 `css`적용.
- 스타일 객체를 반환.

<br/>

#### styled(컴포넌트) <a id="b4"></a>

- 상속같은 개념? 
- StyleComponent에 정의된 CSS들은 위에서 아래로 읽기 때문에 나중에 나온게 전에 나온걸 덮어씌운다.
  - `PrimaryStyledButton`은 이전에 있던 `StyleButton`의 `''` 제일 아래 내부에 기록을 한 것.
  - 컴포넌트 끼리 export를 했기 때문에 적용은 따로된다.

```jsx
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const PrimaryStyledButton = styled(StyledButton)`
  background: palevioletred;
  color: white;
`;
```

<br/>

##### styled(컴포넌트) - 컴포넌트를 반환 할 때  <a id="b5"></a>

- 컴포넌트를 미리 만들고 그걸 styled(컴포넌트)로 불러드렸을 경우.
- 상위 태그에 반드시 className을 붙여줘야 `styled(컴포넌트)`가 렌더링할때 class를 붙여준다.
- 부모 컴포넌트에 className을 주고 그 안에는 따로 네이밍해서 관리.

```jsx
// StyledButton.jsx
import styled, { css } from 'styled-components';
import React from 'react';

function MyButton({ className, children }) {
  return (
    <div className={className} /*꼭 필요하다.*/> 
      <button>{children}</button>
    </div>
  );
}

const StyledButton = styled(MyButton)`
  button {
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${props =>
      props.primary &&
      css`
        background: palevioletred;
        color: white;
      `};
  }
`;

const PrimaryStyledButton = styled(StyledButton)`
  button {
    background: palevioletred;
    color: black;
  }
`;

export default StyledButton;
export { PrimaryStyledButton };

```

```jsx
// App.js
import React from 'react';
import StyledButton, { PrimaryStyledButton } from './components/StyledButton';
import './App.scss';

function App() {
  return (
    <div className="App">
      <StyledButton>버튼</StyledButton>
      <StyledButton primary>Primary 버튼</StyledButton>
      <PrimaryStyledButton>Primary Styled Button 버튼</PrimaryStyledButton>
    </div>
  );
}

export default App;
```

<br/>

#### as="태그" <a id="b6"></a>

- 잘 쓰지 않는다.
- 링크를 거는 용도로 사용됨.

```jsx
<StyledButton as="a" href="/">버튼</StyledButton>
```

<br/>

#### styled('태그') = styled.태그 <a id="b7"></a>

```jsx
const StyledButton = styled('button')`
~css~
`;
```

<br/>

#### ${props => props.color || ''} <a id="b8"></a>

- 리턴 값이 문자열, 아까의 경우에는 css가 리턴

```jsx
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.color || 'palevioletred'};
  color: ${props => props.color || 'palevioletred'};
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
`;
```

<br/>

#### :hover {스타일}  <a id="b9"></a>

```jsx
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  :hover {
    border: 2px solid red;
  }
`;
```

<br/>

#### ::before {스타일} | ::after {스타일} <a id="b10"></a>

- 가상요소선택자

```
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ::before {
    content: '@';
  }
`;
```

<br/>

#### &:hover {스타일} <a id="b11"></a>

- 앞의 &는 부모 선택자

#### & ~ & {스타일}, & + & {스타일}

- 인접요소선택자

<br/>

#### &.클래스 {스타일} <a id="b12"></a>

- 자신에게 orange클래스를 적용.

```jsx
// App.js
import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton className="orange">버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

```jsx
// StyledButton.jsx
export default const StyledButton = styled.button`
~css~

  &.orange {
    border: 2px solid orange;
  }
`;
```

<br/>

#### .클래스 {스타일} <a id="b13"></a>

- 아래 예제 기준으로는 `StyledButton` 하위 태그중 `className="orange"`를 가지고 있는 태그에게 적용한다.

```jsx
const StyledButton = styled.button`
~css~

  .orange {
    color: orange;
  }
`;
```

```jsx
<StyledButton>
  <p className="orange">hh</p>버튼
</StyledButton>
```

<br/>

#### createGlobalStyle '스타일' <a id="b14"></a>

```jsx
const GlobalStyle = createGlobalStyle`
  button${StyledButton} {
    color: palevioletred;
  }
`;

function App() {
  return (
    <div className="App">
      <p>
        <GlobalStyle />
        <StyledButton>버튼</StyledButton>
        <button>버튼</button>
      </p>
    </div>
  );
}
```

<br/>

#### styled.태그.attrs(props => ({속성들})) - 중요 <a id="b15"></a>

- 인자를 props로 받고 object로 리턴.
- 속성들을 정의할 때 이용한다.
- 예를들어, a태그의 경우 `href` 등을 미리 정의해두거나 받아와서 사용할 수 있다.

```jsx
const StyledA = styled.a.attrs(props => ({
  href: props.href || 'https://www.fastcampus.co.kr',
  color: props.color || 'palevioletred',
  target: '_BLANK', // 프롭스가 들어오던 말던 _BLANK
}))`
  color: ${props => props.color};
`;
```

- 어트리뷰트는 props와 같은 역할
- default로 항상 넣어줘야 하는 값들이 있을 때 attrs를 쓰면 편하다.

<br/>

#### keyframes'키프레임' <a id="b16"></a>

- 애니메이션 키프레임을 사용할 때 이용한다.

```jsx
const slide = keyframes`
  from {
    margin-top: 0em;
  }

  to {
    margin-top: 1em;
  }
`;

const StyledButton = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  animation: ${slide} 0.3s ease-in;
`;
```

<br/>

### Ant Design <a id="c1"></a>

- 가장 많이 쓰이는 component 라이브러리
- 디자인된 컴포넌트를 나눠서 줘야한다면 어떻게 줘야할지 알 수 있다.
- `npm i antd`
- API는 props에 대한 설명

<br/>

#### 사용법 <a id="c2"></a>

- 전역에 스타일 추가하고 리액트 컴포넌트를 추가하여 사용
- 리액트 컴포넌트는 [Ant Design - Components](https://ant.design/components/cascader/)에 제시된게 많으니 가져다 사용한다.

```jsx
import 'antd/dist/antd.css';       // <= index.js에 전역 스타일 추가
import { DatePicker } from 'antd'; // <= 날짜를 보여주는 리액트 컴포넌트
```

<br/>

#### 또 다른 사용법 <a id="c3"></a>

**modularized1**

- `import 'antd/dist/antd.css';`는 다른 컴포넌트에도 영향이 가는 단점이 있다.
- 이를 해결하기 위해서 좀 더 세세하게 불러와 `import`할 수 있다. 

```jsx
// index에다 설정하는게 아니라 사용할 컴포넌트 파일에 설정해서 쓸 수 있다.
import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css';
```

<br/>

**modularized2** 

- modularized1 에서 설정 내용이 너무 길어서 짧게 줄이고자 할 때 쓰는 방법.
- 번거로워서 잘 사용하지는 않는다.
- `npm run eject` 
- `npm install babel-plugin-import --save-dev`
- babel 플러그인 설정

```json
{
  ...
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ]
    ]
  },
  ...
}
```

```jsx
// 사용할 컴포넌트 파일
import React from 'react';
import { DatePicker } from 'antd';

function App() {
  return (
    <div className="App">
      <DatePicker />
    </div>
  );
}

export default App;
```

<br/>

#### Ant Design 레이아웃 -그리드- <a id="c4"></a>

- [그리드](https://ant.design/components/grid/)
- row는 height값을 꼭 주어야만 한다.

```jsx
import React from 'react';
import { Row, Col } from 'antd';

const colStyle = () => ({
  height: 50,
  backgroundColor: 'red',
  opacity: Math.round(Math.random() * 10) / 10,
});

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
  );
}

export default App;
```

- `<Col span={24 중에 어느정도 차지할 지 정수} />`
- 12개 12개 나누니까 반반 나눔
- 8, 8, 8이므로 세칸으로 나눔
- 6으로 나누면 네칸

<br/>

##### Row gutter <a id="c5"></a>

- gutter는 16 + 8n의 정수로 사용해야 함(전체 길이를 24등분으로 나누어야 하므로)
- Column에 left값을 일정하게 주는 느낌

```jsx
<Row gutter={16}>
  <MyCol span={12} />
  <MyCol span={12} />
</Row>
```

<br/>

##### Col offset <a id="c6"></a>

- Col offset={24 중 건너띄고 싶은 정수}

```jsx
<Row gutter={16}>
  <MyCol span={12} offset={12} />
</Row>
```

<br/>

##### 레이아웃 flex를 이용한 수직 정렬 <a id="c7"></a>

- **`<Row type="flex" justify="좌우정렬" align="위아래정렬" />`**
- justify ➤ "start" | "center" | "end" | "space-between" | "space-around"
- align ➤ "top" | "middle" | "bottom"

```jsx
function MyCol({ span, offset }) {
  const opacity = Math.round(Math.random() * 10) / 10;
  return (
    <Col span={span} offset={offset}>
      <div style={{ height: 50, backgroundColor: 'red', opacity }} />
    </Col>
  );
}

export default function App() {
  return (
    <div className="App">
      <Row
        style={{
          height: 300,
        }}
        type="flex"
        justify="start"
        align="top"
      >
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
      </Row>
    </div>
  );
```

<br/>

#### Ant Design 레이아웃 -양식-  <a id="c8"></a>

`import { Layout } from 'antd';`

- 이미 짜여진 레이아웃 도안을 설정함.
- 정해진 레이아웃 대로 네이밍 설정시 클래스 네임이 알아서 붙지만 사용을 권장하지 않음.
- [레이아웃](https://ant.design/components/layout/)
