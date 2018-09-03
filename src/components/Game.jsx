import React, { Component } from "react";
import Board from "./Board";
class Game extends Component {
  state = {
    gameStart: false,
    width: null,
    height: null
  };
  componentDidMount() {
    this.getBoardSize();
  }
  getBoardSize() {
    if (!this.gameStart) {
      if (!this.state.width) {
        const width = parseInt(prompt("Please enter the board width"));
        if (!width || typeof width === NaN || width < 5) {
          return alert(
            "please put in a width value and make sure is a number, minimum width is 5"
          );
        } else {
          this.setState({ width });
        }
      }
      if (!this.state.height) {
        const height = parseInt(prompt("please enter the board height"));
        if (!height || typeof height === NaN || height < 5) {
          return alert(
            "please put in a height value and make sure is a number, minimum height is 5"
          );
        } else {
          this.setState({ gameStart: true, height });
        }
      }
    }
  }
  render() {
    return (
      <div>
        {this.state.gameStart && (
          <Board width={this.state.width} height={this.state.height} />
        )}
      </div>
    );
  }
}

export default Game;
