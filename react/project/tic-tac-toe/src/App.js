import React, { Component } from 'react';
import Game from './components/GameComponent';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // bind
  }

  render() {
    return (
      <div className="App">
        <Game></Game>
      </div>
    );
  }
}

export default App;
