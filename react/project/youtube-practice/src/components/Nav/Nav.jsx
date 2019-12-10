import React from 'react';
import YoutubeLogo from './images/YouTube.png';
import './Nav.css'

const Nav = props => {
  return (
    <header className='Nav'>
      <h1 className="a11y-hidden">유튜브</h1>
      <a href="#">
        <img className="header-logo" src={YoutubeLogo} alt="유튜브"></img>
      </a>
      {props.children}
    </header>
  );
}



export default Nav;