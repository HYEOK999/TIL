import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import '../css/main.css'
import Home from './home'
import Login from './login'

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} />
    </Switch>
  </Router>
)
