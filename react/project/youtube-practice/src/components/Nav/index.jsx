import React from 'react';
import YoutubeLogo from './images/YouTube.png';
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <header className='Nav'>
      <h1 className="a11y-hidden">유튜브</h1>
      <Link className='a' to="/">
        <img className="header-logo" src={YoutubeLogo} alt="유튜브"></img>
      </Link>
      {props.children}
    </header>
  );
}

export default Nav;