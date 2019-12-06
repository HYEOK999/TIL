import React, { Component } from 'react';
import './App.css';


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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      searchTerm: '',
    }
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.onDismiss = this.onDismiss.bind(this);
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <form>
          <input type="text"
          onChange={this.onSearchChange}
          />
        </form>
        {
          this.state.list.map(function(item) {
            return <div key={item.objectID}>{item.title}</div>;
          })
        }
      </div> );
  }
}

export default App;
