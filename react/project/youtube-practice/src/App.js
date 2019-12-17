import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Main from './Main'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/watch/:id' component={VideoPlayer} />
        <Route path='/watch' component={VideoPlayer} />
        <Route path='/results' component={Main} />
        <Route path='/' component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
