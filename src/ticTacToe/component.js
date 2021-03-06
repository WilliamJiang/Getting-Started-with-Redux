import React, { Component } from 'react';

export class GameStatus extends Component {

  renderWinner() {
    if (this.props.winner === 'TIE') {
      return 'Tie Game!'
    } else if (this.props.winner) {
      return `${this.props.winner} Wins!`;
    } else {
      return '';
    }
  }

  renderTurn() {
    let player = this.props.players[this.props.turn];
    return `${player}'s Turn`;
  }

  render() {
    return (
      <div className="row game-status">
        <div className="col-md-6 col-md-offset-3">
          <h4>{this.renderTurn()}</h4>

          <h2>{this.renderWinner()}</h2>
          { this.props.winner ?
            <button
              className="btn btn-primary btn-block"
              onClick={this.props.clearBoard}>
              New Game
            </button> : null}
        </div>
      </div>
    );
  }
}

export class Grid extends Component {
  renderBoard() {
    return this.props.board.map((row, x) => {
      return (
        <tr key={x}>
          {row.map((square, y) => {
            return (
              <td
                key={y}
                onClick={() => {
                  this.props.onSquareClick({x, y});
                }}
                >
                { square }
              </td>
            );
          })}
        </tr>
      );
    })
  }

  render() {
    return (
      <div className="row game-board">
        <div className="col-md-12 table-responsive">
          <table className="table">
            <tbody>{this.renderBoard()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}