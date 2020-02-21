import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// withRouter(C);
// createFragment(C, option);
// connect(option)(C);

function withAuth(Component, loggedin = true) {
  function WrappedComponent(props) {
    const token = useSelector(state => state.auth.token);

    if (loggedin) {
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} />;
    } else {
      // if (token !== null) {
      //   return <Redirect to="/" />;
      // }
      return <Component {...props} />;
    }
  }

  WrappedComponent.displayName = `withAuth(${Component.name})`;

  return WrappedComponent;
}

export default withAuth;
