import React from 'react';

const SquareComponent = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default SquareComponent;
