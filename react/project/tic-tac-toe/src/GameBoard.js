import React, { Component } from "react";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whoTurn: false,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      jumpIndex: 0
    };
  }

  setWinner = squares => {
    const lines = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  selectSquare(num) {
    const history = this.state.history.slice(0, this.state.jumpIndex + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[num] = this.state.whoTurn ? "O" : "X";
    this.setState({
      history: history.concat([{ squares }]),
      jumpIndex: history.length,
      whoTurn: !this.state.whoTurn
    });
  }

  jumpTo(index) {
    this.setState({
      jumpIndex: index,
      whoTurn: index % 2 !== 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.jumpIndex];
    const winner = this.setWinner(current.squares);
    return (
      <div className="game">
        <Board
          current={current}
          winner={winner}
          selectSquare={num => this.selectSquare(num)}
        />
        <GameInfo
          turn={this.state.whoTurn}
          winner={winner}
          history={history}
          jump={index => this.jumpTo(index)}
        />
      </div>
    );
  }
}

export default GameBoard;
