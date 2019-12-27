![Study React Official Document](https://user-images.githubusercontent.com/31315644/70387342-a2f00480-19e7-11ea-822c-0109f613aefd.png)

--------------

## React Official Document 

### 주요개념 : 폼

- HTML 에서의 Form
- React에서의 Form
  - [제어 컴포넌트(Controlled Components)](#a1)
  - [textarea 태그](#a2)
  - [select 태그](#a3)
  - [file input 태그](#a4)
  - [다중 입력 제어하기](#a5)
  - [제어되는 Input Null 값](#a6)

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #8. 폼

### HTML 에서의 Form

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

위와 같이 HTML에서의 Form은 타 페이지로 이동을 한다.

React에서도 위와같이 작성을 해도 문제는 없으나, 대부분 JavaScript 함수로 Form의 제출을 처리하고 사용자가 입력한 데이터에 접근하도록 하는 것이 편리하다.

이를 위한 표준 방식 기술을 '제어 컴포넌트(Controlled Components)' 라고 한다.

<br/>

### React에서의 Form

#### 제어 컴포넌트(Controlled Components) <a id="a1"></a>

HTML에서 `<input>`, `<textarea>`, `<select>`와 같은 Form 요소는 일반적으로 사용자의 입력을 기반으로 자신의 `state`를 관리하고 업데이트 한다.

React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state속성에 유지되며 `setState()` 함수를 통해 업데이트 된다.

React의 state는 **신뢰 가능한 단일 출처 (single source of truth)**로 만들어 두 요소를 결합할 수 있다. 

먼저 Form을 렌더링하는 React 컴포넌트에서 Form에 발생하는 사용자 입력값을 제어한다.

이런식으로 **React에 의해 값이 제어되는 입력 Form 요소를 제어 컴포넌트**라 칭한다.

<br/>

이름을 기록하는 Form 제어 컴포넌트를 작성해보자

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

여기서 `render()`의 `<input>`태그의 `value`값은 항상 `this.state.value`가 되고 React state는 신뢰 가능한 단일 출처가 된다.

React state를 업데이트하기 위해 모든 키 입력에서 `handleChange`가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트된다.

제어 컴포넌트로 사용하면 **모든 state 변화는 연관된 핸들러를 가진다.**

이것을 통하여 입력 수정, 유효성 검사등이 간편해진다.

예, 입력받은 값을 전부 대문자로 변환하는 예제

```jsx
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

<br/>

#### textarea 태그 <a id="a2"></a>

HTML에서는 `<textarea>`는 텍스트를 자식요소로 정의한다.

React에서 `<textarea>`에서 텍스트 대신 `value` 어트리뷰트를 대신 사용한다. (소스 량이 줄어듬)

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
  }

  render() {
    return (
		...
        <textarea value={this.state.value} onChange={this.handleChange} />
     );
  }
}
```

<br/>

#### select 태그 <a id="a3"></a>

HTML에서 `<select>`은 드롭다운 목록을 만든다. 

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

여기서 `coconut` 옵션이 초기값이 된다.

<br/>

React에서는 `selected` 속성 대신 최상단 `select`태그에 `value` 속성을 사용한다.

한 곳에서 업데이트만 하면 되기 떄문에 제어 컴포넌트에서 사용하기가 더 편리하기 떄문이다.

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
		 ...
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        ...
    );
  }
}
```

추가로 `select`태그에 multiple 옵션을 허용한다면 `value` 속성에 배열을 전달할 수 도 있다.

```jsx
<select multiple={true} value={['B', 'C']}>
```

<br/>

#### file input 태그 <a id="a4"></a>

HTML에서 `<input type="file">`는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)를 통해 JavaScript로 조작할 수 있다.

```javascript
<input type="file" />
```

값이 읽기 전용이라서 React에서는 비제어 컴포넌트다.

<br/>

#### 다중 입력 제어하기 <a id="a5"></a>

여러 `input` 엘리먼트를 제어해야할 때, 각 엘리먼트에 `name` 어트리뷰트를 추가하고 `event.target.name` 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해줄 수 있다.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}


```

`name`값이 무엇으로 바뀔지 모르기 때문에 `[name]: value`라고 작성했다.

<br/>

#### 제어되는 Input Null 값 <a id="a6"></a>

[제어 컴포넌트](https://ko.reactjs.org/docs/forms.html#controlled-components)에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다. 

`value`를 설정했는데 여전히 수정할 수 있다면 실수로 `value`를 `undefined`나 `null`로 설정했을 수 있다.

예, 처음 입력은 잠겨있지만 잠시 후 입력이 가능해진다.

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);


```

`value`는 초기값을 기억하기 때문이다. 따라서 React에서는 `defaultValue`를 이용한다.

<br/>

