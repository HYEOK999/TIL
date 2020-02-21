import React from 'react';
import { StyledHeader, StyledHome, StyledLink } from './Header.style';

import NavContainer from '../containers/NavContainer';

const Header = () => (
  <StyledHeader>
    <StyledHome>
      <StyledLink to="/">MARKTUBE</StyledLink>
    </StyledHome>
    <NavContainer />
  </StyledHeader>
);

export default Header;
