import React, { useState } from 'react';
import BooksContainer from '../containers/BooksContainer';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import useToken from '../hooks/useToken';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [visible, setVisible] = useState(false);
  function show() {
    setVisible(true);
  }
  function hide() {
    setVisible(false);
  }

  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <Layout>
      <BooksContainer />
      <button onClick={show}>Show</button>
      {visible && (
        <Modal>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={hide}
          >
            Hello
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Home;
