import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Main from './Main'
import VideoPlayer from './components/VideoPlayer'
import reducers from './reducers'

const App = () => {
  return (
    <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <Router>
        <Switch>
          <Route path='/watch/:id' component={VideoPlayer} />
          <Route path='/watch' component={VideoPlayer} />
          <Route path='/results' component={Main} />
          <Route path='/' component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
