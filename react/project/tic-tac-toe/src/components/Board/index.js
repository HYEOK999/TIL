import React from "react";
import BoardSquare from "../BoardSquare";

const Board = ({ current, winner, selectSquare }) => {
  const renderSquare = (num, winner, current) => {
    return (
      <BoardSquare
        value={current.squares[num]}
        winner={winner}
        select={() => selectSquare(num)}
      ></BoardSquare>
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0, winner, current)}
        {renderSquare(1, winner, current)}
        {renderSquare(2, winner, current)}
      </div>
      <div className="board-row">
        {renderSquare(3, winner, current)}
        {renderSquare(4, winner, current)}
        {renderSquare(5, winner, current)}
      </div>
      <div className="board-row">
        {renderSquare(6, winner, current)}
        {renderSquare(7, winner, current)}
        {renderSquare(8, winner, current)}
      </div>
    </div>
  );
};

export default Board;
