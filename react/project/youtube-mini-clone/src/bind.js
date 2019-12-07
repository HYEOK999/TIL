import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Stateless component
const Img = props => {
  console.log(props);
  return <img src={logo} className={props.className} alt={props.alt}/>
}

const Header = props => <header className={props.className}>
  <Img src={logo} className={props.className} alt="logo"/>
</header>

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
}, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 0,
}, ];

class Bind extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      className: 'App-header-2'
    }
    this.adds = this.add.bind(this)
    this.minus = this.minus.bind(this)
    console.log(this)
    // Object.keys(this).forEach((key) => {
    //   console.log(this);
    //   if (typeof this[key] === 'function') {
    //     this[key] = this[key].bind(this);
    //   }
    // })
  }

  // render 이후에 실행됨.
  componentDidMount() {
    //: this.state.counter = 1 이렇게사용하면 절대 안된다. 값을 바꾸고싶으면 setState이용 (아래 에졔)
    //:
    setInterval(() => this.setState({
      counter : this.state.counter + 1
    }),1000)
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
  // test(obj) {
  //   console.log(obj);
  // }
  // calc(val) {
  //   this.setState({counter: this.state.counter + val})
  // }

  render(){
    return (
      <div className="App">
        {/* <button onClick = {this.test(this.state)}>aaa</button> */}
        <button onClick={this.adds}>+</button>{this.state.counter}<button onClick={this.minus.bind(this)}>-</button>
        {/* <button onClick={() => this.add(100)}>+</button>{this.state.counter}<button onClick={() => this.minus(-100)}>-</button> */}
      </div>
    );
  }
}



