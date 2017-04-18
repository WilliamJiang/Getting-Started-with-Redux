import * as utils from './utils';

const board = [['', '', ''], ['', '', ''], ['', '', '']];
const initialState = {
  board,
  winner: false,
  players: ['X', 'O'],
  turn: 0
};

const ticTacToeReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'MARK_SQUARE':
      let {x, y} = action.pos;

      if (!state.winner && state.board[x][y] === '') {

        let mark = utils.getMark(state);
        let board = utils.markSquare(state.board, {x, y}, mark);
        let turn = utils.takeTurn(state);
        let winner = utils.checkWinner(board);

        return Object.assign({}, state, {board, turn, winner});

      } else {
        return state
      }

    case 'CLEAR_BOARD':
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

export default ticTacToeReducer;
