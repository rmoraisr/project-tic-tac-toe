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

// Player factory function
const Player = (playerName, playerToken) => {
  const getName = () => playerName;
  const getToken = () => playerToken;
  return { getName, getToken };
};

const player1 = Player('Myself', '❌');
const player2 = Player('Them', '⭕');

console.log(Gameboard.getBoard());
Gameboard.updateBoard(1, player1.getToken());
Gameboard.updateBoard(4, player2.getToken());
console.log(Gameboard.getBoard());
