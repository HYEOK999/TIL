import React from 'react';

type Props = {
  navs: {
    navId: string;
    toggle: boolean;
  }[];
  changeNav: (id: string) => void;
};

const Nav = ({ navs, changeNav }: Props) => {
  return (
    <ul className="nav">
      {navs.map(nav => (
        <li
          id={nav.navId.toLowerCase()}
          key={nav.navId}
          className={nav.toggle ? 'active' : undefined}
          onClick={() => changeNav(nav.navId)}
        >
          {nav.navId}
        </li>
      ))}
    </ul>
  );
};

export default Nav;
