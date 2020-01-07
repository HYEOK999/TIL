import React, { useRef } from 'react'

const Navigation = ({changeNavigation}) => {
  const nav = useRef();
  return (
    <ul className="nav" ref={nav} onClick={({target}) => changeNavigation(nav, target)}>
      <li id="all" className="active">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>

    //TODO: 다른 버전
    // <ul className="nav" ref={nav}>
    //   <li id="all" onClick={({target}) => changeNavigation(nav, target)} className="active" >All</li>
    //   <li id="active" onClick={({target}) => changeNavigation(nav, target)}>Active</li>
    //   <li id="completed" onClick={({target}) => changeNavigation(nav, target)}>Completed</li>
    // </ul>
  );
}

export default Navigation;