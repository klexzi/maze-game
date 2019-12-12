import React, { Component } from "react";
import Cell from "./Cell";
import * as utils from "../utils";

class Board extends Component {
  state = {
    board: utils.createBoardCells(this.props.width, this.props.height),
    player: null,
    moves: 0,
    fruitsTotal: null
  };
  style = {
    gameBoard: {
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };
  initialCell = utils.createBoardCells(this.props.width, this.props.height);
  componentWillMount() {
    this.setState({
      player: utils.getPlayerCell(this.state.board),
      fruitsTotal: utils.getTotalFruitCell(this.state.board).length
    });
  }
  handlePlayerMove = e => {
    let newDirection;
    switch (e.keyCode) {
      //left arrow key
      case 37:
        newDirection = { x: -1, y: 0 };
        break;
      //right arrow key
      case 39:
        newDirection = { x: 1, y: 0 };
        break;
      // Up arrow key
      case 38:
        newDirection = { x: 0, y: -1 };
        break;
      //down arrow key
      case 40:
        newDirection = { x: 0, y: 1 };
        break;
      default:
        return;
    }
    this.movePlayer(newDirection);
  };

  movePlayer = nextMove => {
    var { player, fruitsTotal, moves } = this.state;
    const newCoord = {
      x: player.x + nextMove.x,
      y: player.y + nextMove.y
    };

    if (fruitsTotal === 0) {
      alert(`Game Completed with ${moves} moves`);
      return;
    }
    const playerNewCell = utils.getCellCoordinate(this.state.board, newCoord);
    if (!playerNewCell) return;
    if (playerNewCell.value === "fruits") {
      --fruitsTotal;
    }
    playerNewCell.value = "player";
    player.value = null;
    moves++;
    this.setState({
      board: utils.updatedCells(
        utils.updatedCells(this.state.board, playerNewCell),
        player
      ),
      player: playerNewCell,
      fruitsTotal,
      moves
    });
  };

  reset = () => {
    this.setState({
      board: this.initialCell,
      player: utils.getPlayerCell(this.initialCell),
      fruitsTotal: utils.getTotalFruitCell(this.initialCell).length,
      moves: 0
    });
  };
  restart = () => {};

  componentDidMount() {
    window.onkeydown = this.handlePlayerMove;
  }

  render() {
    const cell = this.state.board;
    const { moves, fruitsTotal } = this.state;
    if (fruitsTotal === 0) {
      alert(`Game Completed with ${moves} moves`);
    }
    return (
      <div>
        {" "}
        <div style={this.style.gameBoard}>
          <table style={{ borderSpacing: 0 }}>
            <tbody>
              {cell.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((cell, i) => {
                      return (
                        <Cell key={i} cell={cell} player={this.state.player} />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
        </div>{" "}
        <div>
          <h2>{moves} moves</h2> <br />
          <button
            onClick={this.reset}
            style={{ padding: 10, backgroundColor: "red", color: "white" }}
          >
            Restart Game
          </button>
          <button onClick={this.props.restartGame}> New Game </button>
        </div>
      </div>
    );
  }
}

export default Board;
