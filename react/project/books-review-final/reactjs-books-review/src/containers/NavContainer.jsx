import { useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import { startLogoutSaga } from '../redux/modules/auth';
import React, { useCallback } from 'react';

const NavContainer = () => {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(startLogoutSaga());
  }, [dispatch]);

  return <Nav logout={logout} />;
};

export default NavContainer;
