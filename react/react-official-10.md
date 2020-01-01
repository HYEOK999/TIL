![React09](https://user-images.githubusercontent.com/31315644/71559818-ec42e980-2aa5-11ea-8435-9479767d54fa.png)

--------------

## React Official Document 

### 주요개념 : State 끌어올리기

- 온도계산기
  - [기본 컴포넌트 생성](#a1)
  - [두번째 Input 추가 하기](#a2)
  - [변환 함수 작성](#a3)
  - [State 끌어올리기](#a4)
  - [Calculator 변경사항 요약](#a5)
  - [Calculator 컴포넌트 수정하기](#a6)
  - [정리](#a7)
- [교훈](#a8)

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #9. State 끌어올리기 

## 온도 계산기

### 기본 컴포넌트 생성 <a id="a1"></a>

1. 먼저 `BoilingVerdict`라는 이름의 컴포넌트부터 만들어보자.

   이 컴포넌트는 섭씨 온도를 의미하는 `celsius` prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력한다.

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

<br/>

2. `Calculator`라는 컴포넌트를 만들어보자.

   컴포넌트는 온도를 입력할 수 있는 `<input>`을 렌더링하고 그 값을 `this.state.temperature`에 저장한다.

   ( 현재 입력값에 대한 `BoilingVerdict` 컴포넌트를 렌더링 한다. )

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

<br/>

### 두번째 Input 추가하기 <a id="a2"></a>

화씨 입력 컴포넌트도 추가한다.

또한 섭씨, 화씨 입력 컴포넌트간에 동기화 상태를 유지한다.

`Calculator`에서 `TemperatureInput` 컴포넌트를 빼내는 작업부터 시작. 

( `"c"` 또는 `"f"`의 값을 가질 수 있는 `scale` prop를 추가할 것.  )

```jsx
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

<br/>

이제 `Calculator`가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있다.

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

<br/>

### 변환 함수 작성 <a id="a3"></a>

1. 변환 함수 작성해주기,

   화씨 -> 섭씨 `toCelsius` 

   섭씨 -> 화씨 `toFahrenheit`

```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

<br/>

2. 문자열 반환함수 작성해주기.

   인자는 `temperature` 와 위에서 적은 `toCelsius` 와 `toFahrenheit` 중 하나를 받는다.

   만약,  `temperature` 가 잘못된 값으로 받을 경우, 빈문자열을 반환한다.

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  
  // temperaturer 잘못된 값 처리
  if (Number.isNaN(input)) {
    return '';
  }
  
  //
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

`tryConvert('abc', toCelsius)`는 빈 문자열을 반환하고 

`tryConvert('10.22', toFahrenheit)`는 `'50.396'`을 반환한다.

<br/>

### State 끌어올리기 <a id="a4"></a>

`<TemperatureInput scale="c" />`,`<TemperatureInput scale="f" />` 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있다.

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

하지만, 두 입력값이 서로의 것과 동기화된 상태로 있는 것을 원하며, 

섭씨 온도 입력값을 변경하면 화씨 온도 입력값 역시 변환된 온도를 반영해야 한다.(반대도 동일)

React에서 state를 공유하는 일은 그 값을 필요로 하는 컴포넌트 간의 가장 가까운 공통 조상으로 state를 끌어올림으로써 이뤄낼 수 있다.( 혹은 Redux 를 이용 )

이제 `TemperatureInput`이 개별적으로 가지고 있던 지역 state를 지우는 대신 `Calculator`로 그 값을 옮겨놓을 것이다.

`Calculator`가 공유될 state를 소유하고 있으면 이 컴포넌트는 두 입력 필드의 현재 온도에 대한 “진리의 원천(source of truth)“이 된다. 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있다. 두 `TemperatureInput` 컴포넌트의 props가 같은 부모인 `Calculator`로부터 전달되기 때문에, 두 입력 필드는 항상 동기화된 상태를 유지할 수 있게 된다.

<br/>

우선, `TemperatureInput` 컴포넌트에서 `this.state.temperature`를 `this.props.temperature`로 대체할 것입니다. 지금은 `this.props.temperature`가 이미 존재한다고 가정해보자. 나중에는 이 값을 `Calculator`로부터 건네야 한다.

```jsx
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

<br/>

**props는 읽기 전용이다.** `temperature`가 지역 state였을 때는 그 값을 변경하기 위해서 그저 `TemperatureInput`의 `this.setState()`를 호출하는 걸로 충분했지만, 이제 `temperature`가 부모로부터 prop로 전달되기 때문에 `TemperatureInput`은 그 값을 제어할 능력이 없다.

<br/>

React에서는 보통 이 문제를 컴포넌트를 “제어” 가능하게 만드는 방식으로 해결한다. 

DOM `<input>`이 `value`와 `onChange` prop를 건네받는 것과 비슷한 방식이다. 사용자 정의된 `TemperatureInput` 역시 `temperature`와 `onTemperatureChange` props를 자신의 부모인 `Calculator`로부터 건네받을 수 있다.

이제 `TemperatureInput`에서 온도를 갱신하고 싶으면 `this.props.onTemperatureChange`를 호출하면 된다.

```jsx
handleChange(e) {
  // Before: this.setState({temperature: e.target.value});
  this.props.onTemperatureChange(e.target.value);
  // ...

```

<br/>

`onTemperatureChange` prop는 부모 컴포넌트인 `Calculator`로부터 `temperature` prop와 함께 제공될 것이다.

를 이용해 자신의 지역 state를 수정해서 변경사항을 처리하므로, 변경된 새 값을 전달받은 두 입력 필드는 모두 리렌더링된다.

<br/>

### Calculator 변경사항 요약 <a id="a5"></a>

`Calculator`의 변경사항을 들여다보기 전에 `TemperatureInput` 컴포넌트에 대한 변경사항부터 요약해보자. 

이 컴포넌트의 지역 state를 제거했으며 `this.state.temperature` 대신에 `this.props.temperature`를 읽어오도록 변경했다. state를 변경하고 싶을 경우 `this.setState()` 대신에 `Calculator`로부터 건네받은 `this.props.onTemperatureChange()`를 호출하도록 만들었다.

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

```

 <br/>

### Calculator 컴포넌트 수정하기 <a id="a6"></a>

`temperature`와 `scale`의 현재 입력값을 이 컴포넌트의 지역 state에 저장한다. 

이것은 우리가 입력 필드들로부터 “끌어올린” state이며 그들에 대한 “진리의 원천(source of truth)“으로 작용할 것이다.

또한 두 입력 필드를 렌더링하기 위해서 알아야 하는 모든 데이터를 최소한으로 표현한 것이기도 한다.

예를 들어서, 섭씨 입력 필드에 37을 입력하면 `Calculator` 컴포넌트의 state는 다음과 같을 것이다.

```jsx
{
  temperature: '37',
  scale: 'c'
}

```

이후에 화씨 입력 필드의 값을 212로 수정하면 `Calculator`의 state는 다음과 같은 모습일 것이다.

```jsx
{
  temperature: '212',
  scale: 'f'
}

```

두 입력 필드에 모두 값을 저장하는 일도 가능했지만 결국은 불필요한 작업이었던 것이다. 

가장 최근에 변경된 입력값과 그 값이 나타내는 단위를 저장하는 것만으로도 충분하다. 

그러고 나면 현재의 `temperature`와 `scale`에 기반해 다른 입력 필드의 값을 추론할 수 있다.

두 입력 필드의 값이 동일한 state로부터 계산되기 때문에 이 둘은 항상 동기화된 상태를 유지하게 된다.

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

이제 어떤 입력 필드를 수정하든 간에 `Calculator`의 `this.state.temperature`와 `this.state.scale`이 갱신됩니다. 입력 필드 중 하나는 있는 그대로의 값을 받으므로 사용자가 입력한 값이 보존되고, 다른 입력 필드의 값은 항상 다른 하나에 기반해 재계산됩니다.

<br/>

### 정리 <a id="a7"></a>

입력값을 변경할 때 일어나는 일들을 정리해보자.

1. React는 DOM `<input>`의 `onChange`에 지정된 함수를 호출한다. 위 예시의 경우 `TemperatureInput`의 `handleChange` 메서드에 해당한다.
2. `TemperatureInput` 컴포넌트의 `handleChange` 메서드는 새로 입력된 값과 함께 `this.props.onTemperatureChange()`를 호출한다. `onTemperatureChange`를 포함한 이 컴포넌트의 props는 부모 컴포넌트인 `Calculator`로부터 제공받은 것이다.
3. 이전 렌더링 단계에서, `Calculator`는 섭씨 `TemperatureInput`의 `onTemperatureChange`를 `Calculator`의 `handleCelsiusChange` 메서드로, 화씨 `TemperatureInput`의 `onTemperatureChange`를 `Calculator`의 `handleFahrenheitChange` 메서드로 지정해놓았다. 따라서 우리가 둘 중에 어떤 입력 필드를 수정하느냐에 따라서 `Calculator`의 두 메서드 중 하나가 호출된다.
4. 이들 메서드는 내부적으로 `Calculator` 컴포넌트가 새 입력값, 그리고 현재 수정한 입력 필드의 입력 단위와 함께 `this.setState()`를 호출하게 함으로써 React에게 자신을 다시 렌더링하도록 요청한다.
5. React는 UI가 어떻게 보여야 하는지 알아내기 위해 `Calculator` 컴포넌트의 `render` 메서드를 호출한다. 두 입력 필드의 값은 현재 온도와 활성화된 단위를 기반으로 재계산된다. 온도의 변환이 이 단계에서 수행된다.
6. React는 `Calculator`가 전달한 새 props와 함께 각 `TemperatureInput` 컴포넌트의 `render` 메서드를 호출한다. 그러면서 UI가 어떻게 보여야 할지를 파악한다.
7. React는 `BoilingVerdict` 컴포넌트에게 섭씨온도를 props로 건네면서 그 컴포넌트의 `render` 메서드를 호출한다.
8. React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신한다. 값을 변경한 입력 필드는 현재 입력값을 그대로 받고, 다른 입력 필드는 변환된 온도 값으로 갱신된다.

입력 필드의 값을 변경할 때마다 동일한 절차를 거치고 두 입력 필드는 동기화된 상태로 유지된다.

<br/>

## 교훈 <a id="a8"></a>

React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 “진리의 원천(source of truth)“을 하나만 두어야 한다. 보통의 경우, state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가된다. 그러고 나서 다른 컴포넌트도 역시 그 값이 필요하게 되면 그 값을 그들의 가장 가까운 공통 조상으로 끌어올리면 된다. 다른 컴포넌트 간에 존재하는 state를 동기화시키려고 노력하는 대신 하향식 데이터 흐름에 기대는 걸 추천한다.

state를 끌어올리는 작업은 양방향 바인딩 접근 방식보다 더 많은 “보일러 플레이트” 코드(일부분에 주석, 메모등을 적는 코드)를 유발하지만, 버그를 찾고 격리하기 더 쉽게 만든다는 장점이 있다. 어떤 state든 간에 특정 컴포넌트 안에서 존재하기 마련이고 그 컴포넌트가 자신의 state를 스스로 변경할 수 있으므로 버그가 존재할 수 있는 범위가 크게 줄어든다. 또한 사용자의 입력을 거부하거나 변형하는 자체 로직을 구현할 수도 있다.

어떤 값이 props 또는 state로부터 계산될 수 있다면, 아마도 그 값을 state에 두어서는 안 된다. 예를 들어 `celsiusValue`와 `fahrenheitValue`를 둘 다 저장하는 대신, 단지 최근에 변경된 `temperature`와 `scale`만 저장하면 된다. 다른 입력 필드의 값은 항상 그 값들에 기반해서 `render()` 메서드 안에서 계산될 수 있다. 이를 통해 사용자 입력값의 정밀도를 유지한 채 다른 필드의 입력값에 반올림을 지우거나 적용할 수 있게 된다.

UI에서 무언가 잘못된 부분이 있을 경우, [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools)를 이용하여 props를 검사하고 state를 갱신할 책임이 있는 컴포넌트를 찾을 때까지 트리를 따라 탐색해보자. 이렇게 함으로써 소스 코드에서 버그를 추적할 수 있다.

<br/>

-----------------

![Monitoring State in React DevTools](https://ko.reactjs.org/react-devtools-state-ef94afc3447d75cdc245c77efb0d63be.gif)