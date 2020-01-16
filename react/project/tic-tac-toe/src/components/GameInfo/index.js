import React from "react";

const GameInfo = ({ winner, turn, history, jump }) => {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (turn ? "O" : "X");
  }

  return (
    <div className="game-info">
      <div>{status}</div>
      <ol>
        {history.map((item, index) => {
          return (
            <li key={index}>
              {!index ? (
                <button onClick={() => jump(index)}>Go to game start</button>
              ) : (
                <button onClick={() => jump(index)}>go to move #{index}</button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default GameInfo;
