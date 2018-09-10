import React, { Component } from "react";
import Board from "./Board";
class Game extends Component {
  input = React.createRef();
  state = {
    gameStart: false,
    width: null,
    height: null
  };

  handleWidthInput = () => {
    this.setState({ width: this.input.current.value });
  };

  handleHeightInput = () => {
    console.log(this.input.current.value);
    this.setState({ height: this.input.current.value });
    this.toggleGame();
  };

  toggleGame = () => {
    const { gameStart } = this.state;
    if (gameStart) {
      let width,
        height = null;
      this.setState({ width, height });
    }
    this.setState({ gameStart: !gameStart });
  };
  render() {
    const { gameStart, width, height } = this.state;
    return (
      <div>
        {!gameStart && (
          <div>
            {" "}
            <h2>Welcome to the Maze Game App </h2>
            <br />
            <small>This app was developed by Kelechi Nwosu using React. </small>
            <br />
            <h4>
              to get started input in the dimension in which you want to play
              the game with
            </h4>
            {!width && (
              <div>
                <label>Board width :</label>
                <input type="number" autoFocus min={5} ref={this.input} />
                <button onClick={this.handleWidthInput}> OK </button>
              </div>
            )}
            {width &&
              !height && (
                <div>
                  <label>Board Height :</label>
                  <input type="number" autoFocus min={5} ref={this.input} />
                  <button onClick={this.handleHeightInput}> OK </button>
                </div>
              )}
          </div>
        )}
        {gameStart && (
          <div>
            <Board
              width={this.state.width}
              height={this.state.height}
              restartGame={this.toggleGame}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Game;
