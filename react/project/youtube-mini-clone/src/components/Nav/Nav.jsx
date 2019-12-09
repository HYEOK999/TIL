import React from 'react';
import YoutubeLogo from './images/youtube-logo.png';
import './Nav.css';

const Nav = props => {
  return (
    <header className='header'>
      <a href="#">
        <img className='header-logo' src={YoutubeLogo} alt="Youtube"/>
      </a>
      {props.children}
    </header>
  );
}

export default Nav;
