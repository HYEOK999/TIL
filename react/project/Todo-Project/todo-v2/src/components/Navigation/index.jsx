import React, { useRef } from 'react'

const Navigation = ({navLists, changeNavigation}) => {
  const nav = useRef();
  console.log(navLists);
  return (
    //TODO: v3
    <ul className="nav" ref={nav}>
      {
      navLists.map((navItem) => (
          <li
            key={navItem.id}
            id={navItem.navId}
            className={navItem.toggle ? 'active' : null}
            onClick={() => changeNavigation(navItem.id)}
          >
            {navItem.navId}
          </li>
        ))
      }
    </ul>

    //TODO: v1
    // <ul className="nav" ref={nav} onClick={({target}) => changeNavigation(nav, target)}>
    //   <li id="all" className="active" >All</li>
    //   <li id="active">Active</li>
    //   <li id="completed">Completed</li>
    // </ul>

    //TODO: v2
    // <ul className="nav" ref={nav}>
    //   <li id="all" onClick={({target}) => changeNavigation(nav, target)} className="active" >All</li>
    //   <li id="active" onClick={({target}) => changeNavigation(nav, target)}>Active</li>
    //   <li id="completed" onClick={({target}) => changeNavigation(nav, target)}>Completed</li>
    // </ul>
  );
}

export default Navigation;