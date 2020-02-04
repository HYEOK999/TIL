import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import ErrorBoundary from 'react-error-boundary';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
