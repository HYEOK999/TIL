import React from 'react';
import useToken from '../hooks/useToken';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import BookAddContainer from '../containers/BookAddContainer';

const Add = () => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <Layout>
      <BookAddContainer />
    </Layout>
  );
};

export default Add;
