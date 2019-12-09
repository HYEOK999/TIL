![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 03

- import
- Component
- Transfile
- React에서는 데이터가 항상 불변성을 유지해야한다.
- ReatDOM.render()
- Hot Module Replacement (HMR) 
- JSX로 데이터를 받아오기
- React key
- 단방향 데이터 흐름
- setState
  - setState에서 콘솔확인하기
- Component API
- 카운터 만들어보기
- YOUTUBE Api 불러오기
  - axios 를 이용하여 데이터 Get

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- import
- Component
- Transfile
- setState
- Component API
- 불변성

<br/>

--------

### import

다른 파일, 다른 모듈에서 정의된 기능을 사용하기 위해서 사용한다.

js파일은 확장자를 생략가능 하다.

그외의 확장자는 전부 확장자를 적어주어야한다.

```javascript
import App from './App';
import './index.css';
```

<br/>

### Component

`extends`를 사용해서 컴포넌트를 상속받는다.

컴포넌트를 상속받는 이유?  react.Component에 있는 render함수를 상속받아 쓰기 위해서.

<br/>

### Transfile

특정 언어를 다른언어로 변경시킴.

JSX 를 바벨이 브라우저가 해석할 수 있도록 자바스크립트로 트랜스파일 해준다.

<br/>

### React에서는 데이터가 항상 불변성을 유지해야한다.

모든 것은 단방향으로 주기 위함이다.

상태 변화는 setState를 통해서만 가능해야한다.

<br/>

### ReatDOM.render()

```jsx
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

document에 있는 id가 root인 요소 내부를 `<App />` 커스텀 태그로 대체한다.

<br/>

### Hot Module Replacement (HMR) 

> Hot Module Replacement (HMR)은 응용프로그램 실행 중에 추가 또는 제거된 모듈들을 페이지 리로드 없이 교체하는 기능.

 ReatDom.render() 아래에 작성한다. **개발 환경에서 사용하는 기능**이다.

HMR 기능을 사용하면 웹페이지를 새로고침하지 않고 업데이트된 요소만 업데이트 - 개발 환경에서만 사용 가능

```jsx
if (module.hot) {
  module.hot.accept();
}
```

<br/>

### JSX로 데이터를 받아오기

~~~jsx
import React, { Component } from 'react';
import './App.css';
const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
}, ];

class App extends Component {
  render() {
    return (
      <div className="App">
        {list.map(function(item) {
          return (
					<div> 
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
          </div> 
          );
        })}
      </div> 
    );
  }
}
~~~

<br/>

### React key

> 정렬기준을 정의하기 위해서 key를 사용한다.

src/App.js 

```jsx
{
  list.map(function(item) {
  	return (
    	<div key={item.objectID}>
      	<span>
        	<a href={item.url}>{item.title}</a>
      	</span>
      	<span>{item.author}</span>
      	<span>{item.num_comments}</span>
      	<span>{item.points}</span>
			</div> 
  	);
})}
```

순회(반복문)를 도는 JS함수(대표 : Map) 로 return 할 때 최상위에 반드시 key값을 정의해야만한다.

- key 값을 기준으로 새로 업데이트가 된다.
- key 는 예측할 수 있는 고유값이어야만 한다. (중복된값이 오면 안된다.) - 고유값을 랜덤으로 지정해주고 싶을때는 uuid라는 npm을 사용한다.
- key 에 절대로 index값을 넣어선 안된다.
- key는 정렬을 위해서 주로 사용한다.

<br/>

### 단방향 데이터 흐름

내가 마음대로 데이터에 직접적으로 접근하는게 아닌 setState를 통해서만 접근한다.

데이터(상태)에 대한 변경은 setState를 통해서만 한다.

```javascript
onDismiss(id) {
	const isNotId = item => item.objectID !== id;
	const updatedList = this.state.list.filter(isNotId); this.setState({ list: updatedList });
}
```

<br/>

### setState

setState를 정의할때는 반드시 최소 비어있는 state가 필요하다.

state를 변경하기 위해 사용한다.

```javascript
constructor(props) {
	super(props)
	this.state = {}
}
```

이렇게 3줄만 적을 경우, 다음처럼 줄일수 있다.

~~~javascript
state = {}
~~~

<br/>

```javascript
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

list.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase());)
```

<br/>

#### setState 에서 콘솔 확인하기

```javascript
// setState에서 콘솔찍으려면 화살표 함수를 이용해야한다. 비동기 때문임. 순서보장.
this.setState({  counter: 1 }, () =>{
	console.log(this.state.counter)
})
```

<br/>

상태에 대한 요소의 변경이 전혀없는 정적인 페이지를 만들경우 Function Stateless Components

상태에 대한 요소가 변화가 있는 동적인 페이지를 만들경우 ES6 Class Components

<br/>

### Component API

- Constructor()
- getDerivedStateFromProps() 
- **render() : UI를 화면에 출력하라.**
- **componentDidMount() : render함수 이후에 실행**
- shouldComponentUpdate(nextProps, nextState) : 내가 지정한 props만 업데이트해라.(최적화)
- getSnapshotBeforUpdate
- **componentDidUpdate() : component가 업데이트 되었을 경우에 실행.**
- componentWillUnmount() : 다른 페이지로 이동하거나 하는 초기화 작업이 필요할 경우.

<br/>

### 카운터 만들어보기

App.js

```jsx
import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      className: 'App-header-2'
    }
    // this.adds = this.add.bind(this)
    // this.minus = this.minus.bind(this)
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  // render 이후에 실행됨.
  componentDidMount() {
    //: this.state.counter = 1 이렇게사용하면 절대 안된다. 값을 바꾸고싶으면 setState이용 (아래 에졔)
    setInterval(() => this.setState({
      counter : this.state.counter + 1
    }),1000)
    
    // setState에서 콘솔찍어보고 싶으면 이렇게 해야된다.
    // this.setState({  counter: 1 }, () =>{
    //   console.log(this.state.counter)
    // })
  }
  add() {
    console.log('answer : ' + this);
    this.setState({counter: this.state.counter + 100})
  }
  minus() {
    this.setState({counter: this.state.counter - 100})
  }
  // calc(val) {
  //   this.setState({counter: this.state.counter + val})
  // }

  render(){
    return (
      <div className="App">
        <button onClick={this.adds}>+</button>{this.state.counter}<button onClick={this.minus.bind(this)}>-</button>
        {/* <button onClick={() => this.calc(100)}>+</button>{this.state.counter}<button onClick={() => this.calc(-100)}>-</button> */}
      </div>
    );
  }
}

export default App;
```

<br/>

### YOUTUBE Api 불러오기

#### axios 를 이용하여 데이터 Get

```bash
npm i axios --save
```

App.js ( 입력 받는 것은 주석처리해놓음 , 키 별도로 입력해야함.)

```jsx
import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      subList : [],
    }

    this.sort = this.sort.bind(this);
    // Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  async getYoutubeData(query) {
    try {
      const { data } = await Axios.get(`API 키`)
      this.setState({list : data.items });
    } catch (error) {
      console.error(error);
    }
  }

  // async getYoutubes(target, keyCode) {
  //   if(keyCode !== 13 || target.value.trim() === '') return;

  //   try {
  //     const { data } = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC1Y_pxHo33uSJV-HmXtP_jBhKNhbwnxug&q=${target.value.trim()}&part=snippet`)
  //     this.setState({ subList : data.items });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  sort(){
    this.setState( {subList : this.state.subList.reverse()})
  }

  componentDidMount() {
    this.getYoutubeData('롤드컵');
  }

  render () {
  return (
      <div>
        {/* <button onClick={() => this.getYoutubeData('여행')}>
          렌더링
        </button> */}
        <div>
          {this.state.list.map(item => {
            console.log(item.id.videoId);
            return <div key={item.id.videoId}>{item.snippet.title}</div>;
          })}
        </div>
        {/* <div>
          <input type="text" onKeyDown={({target, keyCode}) => this.getYoutubes(target, keyCode)}></input>
        </div>
        <div>
          {this.state.subList.map(item => {
            console.log(item.id.videoId)
            return <div key={item.id.videoId}>{item.snippet.title}</div>
          })}
        </div> */}
        <button onClick={this.sort}>sort</button>
      </div>
    );
  }
}
export default App;
```