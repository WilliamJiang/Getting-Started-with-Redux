import React, { Component } from 'react';
import { connect } from 'react-redux';
import { markSquare, clearBoard } from './action';
import {Grid, GameStatus} from './component'

let Board = ({board, markSquare}) => (
 <Grid board={board} onSquareClick={markSquare}/>
);
Board = connect(
  state => ({board: state.tttr.board}),
  {markSquare}
)(Board);


class PlayerInfo extends Component {
  render() {
    return <GameStatus {...this.props} />
  }
}
PlayerInfo = connect(
  (state) => ({
    turn: state.tttr.turn,
    winner: state.tttr.winner,
    players: state.tttr.players
  }),
  {clearBoard}
)(PlayerInfo);

const TicTacToeApp = () => (
  <div className="row tictactoe">
    <h2 className="alert alert-success">Tic-Tac-Toe</h2>
    <Board />
    <PlayerInfo />
  </div>
)

export default TicTacToeApp;