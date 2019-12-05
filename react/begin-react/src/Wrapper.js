import React from 'react';

function Wraaper(props) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export default Wraaper;