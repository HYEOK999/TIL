import React, { useEffect, useState } from 'react';
import withAuth from '../hocs/withAuth';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { removeToken } from '../actions';
import BooksContainer from '../containers/BooksContainer';
import NaviContainer from '../containers/NaviContainer';

const Home = ({ token }) => {
  return (
    <div>
      <h1>Home</h1>
      <NaviContainer />
      <BooksContainer />
    </div>
  );
};

export default withAuth(Home);
