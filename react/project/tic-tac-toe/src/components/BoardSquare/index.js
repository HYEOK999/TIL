import React from "react";

const BoardSquare = ({ value, select, winner }) => {
  return (
    <button className="square" onClick={select} disabled={value || winner}>
      {value}
    </button>
  );
};

export default BoardSquare;
