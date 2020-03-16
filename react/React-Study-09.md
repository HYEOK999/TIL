- ![React2-Thumbnail](https://user-images.githubusercontent.com/31315644/72333302-e6ccdc80-36fe-11ea-9b80-e00b0d5f5847.png)

  --------------
  
  # React Re-Study : 9
  
  - [Unit Test](#a1)
  - [facebook/jest](#a2)
    - jest 3가지 문법
    - it (= test), describe, expect
    - .not.to
    - jest는 기본으로 한 테스트가 5초로 설정되어 있다.
  - [react-component-test](#a3)
    - [실습 컴포넌트 테스트 짜보기](#a4)
      - [Button 컴포넌트](#a5)
  - [enzyme](#a6)
  - [컨테이너 테스트](#a7)
  
  <br/>
  
-----
  
  ## React Study with Mark - React Testing -
  
  - JavaScript Unit Test
  - Jest 
  - 리액트 컴포넌트 테스트
  - react-testing-library 활용하기
  - 리덕스 / 비동기작업의 테스트
  
  <br/>
  
  ### Unit Test   <a id="a1"></a>
  
  > TDD : Test Driven Development - 테스트 주도 개발
  > → 코딩이 아니라 테스트코드를 먼저 작성 하는 개발 방식.
  
  - 통합테스트에 비해 빠르고 쉽다.
  - 통합테스트를 진행하기 전에 문제를 찾아낼 수 있다.
  - 그렇다고, 통합테스트가 성공하리란 보장은 없다.
  - 테스트 코드가 살아있는(동작을 설명하는) 명세가 된다.
  - 테스트를 읽고 어떻게 동작하는지도 예측 가능하다.
  - (선 코딩 후, (몰아서) 단위테스트가 아닌...) 소프트웨어 장인이 되려면 TDD를 해야한다. 
  
  <br/>
  
  ### facebook/jest  <a id="a2"></a>
  
  > Jest : Test Runner (실행)
  
  - Mocha에 비해 느리지만, npx로 만든 react프로젝트를 생성할 경우 기본 탑재되어있다.
  - 리액트의 영향이 크겠지만 가장 핫한 테스트 도구
  - 👩🏻‍💻 Easy Setup
  - 🏃🏽 Instant Feedback
    - 고친 파일만 빠르게 테스트 다시 해주는 기능 등
  - 📸 Snapshot Testing
    - 컴포넌트 테스트에 중요한 역할을 하는 스냅샷
  
  <br/>
  
  #### jest 3가지 문법
  
  - assert.equal(a, b); → node.js의 내장 API
  - expect(a).toBe(b); → jest는 기본적으로 expect 제공
  - a.should.be(b); → Chai 라이브러리
  
  <br/>
  
  #### it (= test), describe, expect
  
  - 테스트의 단위 설정
  - describe는 카테고리화를 의미한다.
  - `expect().toBe()`는 원시값. 
  - `expect().toEqual()`는 참조값.(객체) 
  
  ```jsx
  describe('expect test', () => {
    it('37 to equal 37', () => {
      const received = 37;
      const expected = 37;
      expect(received).toBe(expected);
    });
  
    it('{age: 37} to equal {age: 37}', () => {
      const received = {
        age: 37,
      };
      const expected = {
        age: 37,
      };
      expect(received).toBe(expected);
    });
  
    it('{age: 37} to equal {age: 37}', () => {
      const received = {
        age: 37,
      };
      const expected = {
        age: 37,
      };
      expect(received).toEqual(expected);
    });
  });
  ```
  
  <br/>
  
  #### .not.to
  
  - 의미상으로 37은 36이 아니어야 한다/37은 36이 아니다가 다름
  
  ````js
  describe('.not.to~ test', () => {
    it('.not.toBe', () => {
      expect(37).not.toBe(36);
    });
  
    it('.not.toBeFalsy', () => {
      expect(true).not.toBeFalsy();
      expect(1).not.toBeFalsy();
      expect('hello').not.toBeFalsy();
      expect({}).not.toBeFalsy();
    });
  
    it('.not.toBeGreaterThan', () => {
      expect(10).not.toBeGreaterThan(10);
    });
  });
  ````
  
  <br/>
  
  #### jest는 기본으로 한 테스트가 5초로 설정되어 있다.
  
  - 그 이상을 원할 경우 `jest.setTimeout(30000)`과 같이 별도의 값을 설정해야 한다.
  
  <br/>
  
  ### react-component-test  <a id="a3"></a>
  
  - 마틴 파울러, 켄트 백, Kent C. Dodde([테스팅 라이브러리](https://testing-library.com/)) 
  
  - 테스트를 통과하는 최소한의 행동만 함.
  
    - '버튼이 눌렸다' 같은 행동은 `onClick`같은 이벤트 핸들러를 생각 하면 안된다. (일단은 텍스트만 넣고 다음 단계로 넘어가면서 문제가 생길 때 해결해야 한다.)
  
  - 5초 지난 후 워닝 메시지가 뜰 경우,
  
    - timer를 null로 초기화.
    - 처음 클릭할 때 넘어가서 메시지 셋팅되고 셋타임아웃을 한 인티저가 들어가서 언마운트 될 때 인티저(넘버)면 clearTimeout을 해준다.
  
    - functinal conponent안에 let을 써서 해결하는 경우는 없다.(let timer XXXX → ref를 이용해서 해결)
    - 앞의 렌더와 뒤의 렌더는 서로 공유될 수 없다.
    - 렌더가 다시 되어도 Referrence가 유지되어야 한다 -> useRef
  
  - 테스트 종료 후 코드를 수정할 때 앞의 테스트가 깨지지 않으면 된다.(회귀 테스트)
  
  <br/>
  
  #### 실습 컴포넌트 테스트 짜보기  <a id="a4"></a>
  
  >  Given - When - Then 으로 작성한다.
  >
  >  bash 명령어 : npm test
  >
  >  "scripts": { ... , "test": "react-scripts test", ... }
  
  ```jsx
  // 예시
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
      // Given
      const { getByText } = render(<Button />);
      const button = getByText('button');
  
      // When
      fireEvent.click(button);
  
      // Then
      const p = getByText('버튼이 방금 눌렸다.');
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  ```
  
  <br/>
  
  ##### Button 컴포넌트 <a id="a5"></a>
  
  1. [*컴포넌트가 정상적으로 생성된다.*](#c1)
  2. [*"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.*](#c2)
  3. [*버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.*](#c3)
  4. [*버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.*](#c4)
  5. [*버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.*](#c5)
  6. [*버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.*](#c6)
  
  <br/>
  
  1. *컴포넌트가 정상적으로 생성된다.*  <a id="c1"></a>
  
  ```jsx
  // src/components/Button.test.js
  import React from "react";
  import Button from "./Button";
  import { render } from "@testing-library/react";
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", async () => {
      render(<Button />);
    });
  });
  
  // src/components/Button.jsx
  import React from "react";
  const Button = () => <></>;
  export default Button;
  ```
  
  <br/>
  
  2. *"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.* <a id="c2"></a>
  
  ```jsx
  // src/components/Button.test.js
  describe("Button 컴포넌트", () => {
    // ...
    
    it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
      const { getByText } = render(<Button />);
      const buttonElement = getByText("button");
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });
  });
  
  // src/components/Button.jsx
  import React from "react";
  const Button = () => <button>button</button>;
  export default Button;
  ```
  
  <br/>
  
  3. *버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.*  <a id="c3"></a>
  
  ```jsx
  // src/components/Button.test.js
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    // ...
    
    it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
      const { getByText } = render(<Button />);
      const button = getByText("button");
      fireEvent.click(button);
      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  
  // src/components/Button.jsx
  import React from "react";
  const Button = () => (
    <>
      <button>button</button>
      <p>버튼이 방금 눌렸다.</p>
    </>
  );
  export default Button;
  ```
  
  <br/>
  
  4. *버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.*  <a id="c4"></a>
  
  ```jsx
  // src/components/Button.test.js
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    // ...
    
    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      const { getByText } = render(<Button />);
  
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  
  // src/components/Button.jsx
  import React, { useState } from "react";
  
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
    function click() {
      setMessage("버튼이 방금 눌렸다.");
    }
    return (
      <>
        <button onClick={click}>button</button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```
  
  <br/>
  
  5. *버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.*  <a id="c5"></a>
  
  ```jsx
  // src/components/Button.test.js
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    // ...
    
    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, async () => {
      const { getByText } = render(<Button />);
      const button = getByText("button");
      fireEvent.click(button);
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  
  // src/components/Button.jsx
  
  import React, { useState, useEffect, useRef } from "react";
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
    const timer = useRef(null);
  
    function click() {
      if (timer.current !== null) clearTimeout(timer);
      setMessage("버튼이 방금 눌렸다.");
      timer.current = setTimeout(() => {
        setMessage("버튼이 눌리지 않았다.");
      }, 5000);
    }
  
    useEffect(() => {
      return () => {
        if (timer.current !== null) clearTimeout(timer.current);
      };
    }, []);
  
    return (
      <>
        <button onClick={click}>button</button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  ```
  
  <br/>
  
  6. *버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.*  <a id="c6"></a>
  
  ```jsx
  // src/components/Button.test.js
  jest.useFakeTimers();
  
  describe("Button 컴포넌트 (@testing-library/react)", () => {
    // ...
    
    it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
      const { getByText } = render(<Button />);
      const button = getByText("button");
      fireEvent.click(button);
      // expect(button).toBeDisabled();
      expect(button.disabled).toBeTruthy(); 
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      // expect(button).not.toBeDisabled();
      expect(button.disabled).toBeFalsy(); 
    });
  });
  
  // src/components/Button.jsx
  import React, { useState, useEffect, useRef } from "react";
  
  const Button = () => {
    const [message, setMessage] = useState("버튼이 눌리지 않았다.");
    const timer = useRef(null);
  
    function click() {
      if (timer.current !== null) clearTimeout(timer);
      setMessage("버튼이 방금 눌렸다.");
      timer.current = setTimeout(() => {
        setMessage("버튼이 눌리지 않았다.");
      }, 5000);
    }
  
    useEffect(() => {
      return () => {
        if (timer.current !== null) clearTimeout(timer.current);
      };
    }, []);
  
    return (
      <>
        <button onClick={click} disabled={message === "버튼이 방금 눌렸다."}>
          button
        </button>
        <p>{message}</p>
      </>
    );
  };
  
  export default Button;
  
  ```
  
  <br/>
  
  ### enzyme  <a id="a6"></a>
  
  - 렌더를 시킨다음에 렌더된 결과물을 래퍼라고 하는 클래스형태로 래퍼해놓은 다른 데이터 객체를 사용
  
    - 리액트 버전에 따라 래핑된 데이터 구조가 다를 수 있기 때문에 리액트 버전을 맞춰 주어야 함
  
  - jest는 테스트 프레임워크
  
  - enzyme는 테스트 라이브러리
  
  - **enzyme**에는 adapter를 적용하는 configure를 제외하면 크게 세 가지 메소드가 있다. 
  
    - shallow, mount, render ([API](http://airbnb.io/enzyme/docs/api/)) 
    - shallow: 간단한 컴포넌트를 메모리 상에 렌더링한다. 단일 컴포넌트를 테스트할 때 유용하다.
  
    - mount: HOC나 자식 컴포넌트까지 전부 렌더링한다. 다른 컴포넌트와의 관계를 테스트할 때 유용하다.
    - render: 컴포넌트를 정적인 html로 렌더링한다. 컴포넌트가 브라우저에 붙었을 때 html로 어떻게 되는지 판단할 때 사용한다.
  
   <br/>
  
  ### 컨테이너 테스트  <a id="a7"></a>
  
  ```jsx
  import React from "react";
  import Enzyme, { mount } from "enzyme";
  import BooksContainer from "./BooksContainer";
  import configureMockStore from "redux-mock-store";
  import Adapter from "enzyme-adapter-react-16";
  
  Enzyme.configure({ adapter: new Adapter() });
  
  describe("BookContainer", () => {
    const mockStore = configureMockStore();
  
    // 가짜 스토어 만들기
    let store = mockStore({
      books: [],
      loading: false,
      error: null,
      token: "",
      router: {
        location: {
          pathname: "/"
        }
      }
    });
  
    it("renders properly", () => {
      const component = mount(<BooksContainer store={store} />);
      expect(component).toMatchSnapshot();
    });
  });
  
  ```
  
  <br/>
  
  ```jsx
  // Jest Snapshot v1, https://goo.gl/fbAQLP
  
  exports[`BookContainer renders properly 1`] = `
  <Connect(Books)
    store={
      Object {
        "clearActions": [Function],
        "dispatch": [Function],
        "getActions": [Function],
        "getState": [Function],
        "replaceReducer": [Function],
        "subscribe": [Function],
      }
    }
  >
    <Books
      books={Array []}
      error={null}
      loading={false}
      requestBooksPromise={[Function]}
      requestBooksSaga={[Function]}
      requestBooksThunk={[Function]}
      store={
        Object {
          "clearActions": [Function],
          "dispatch": [Function],
          "getActions": [Function],
          "getState": [Function],
          "replaceReducer": [Function],
          "subscribe": [Function],
        }
      }
    >
      <div />
    </Books>
  </Connect(Books)>
  `;
  
  ```
  
  