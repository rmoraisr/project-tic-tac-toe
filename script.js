// The Gameboard represents the state of the board

const Gameboard = (() => {
  /*
 A cell represents one "square" on the board and can have one of this values:
 0: no token is in the square, is a empty one
 1: Player One's token,
 2: Plauer Two's token
  */
  let board = Array(9).fill('');

  const getBoard = () => board;

  const updateBoard = (index, playerToken) => {
    if (board[index] !== '') return;
    board[index] = playerToken;
  };

  const resetBoard = () => {
    board.Array(9).fill('');
  };

  return {
    getBoard,
    updateBoard,
    resetBoard,
  };
})();

console.log(Gameboard.getBoard());
Gameboard.updateBoard(1, 'X');
Gameboard.updateBoard(4, 'O');
console.log(Gameboard.getBoard());
