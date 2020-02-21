import React from 'react';
import { StyledDiv } from './Layout.style';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <Head />
    <Header />
    <StyledDiv>{children}</StyledDiv>
    <Footer />
  </div>
);

export default Layout;
