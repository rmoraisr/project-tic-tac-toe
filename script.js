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

const GameController = (() => {
  const board = Gameboard;
  const player1 = Player('Myself', '❌');
  const player2 = Player('Them', '⭕');

  let currentPlayer = player1;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const getCurrentPlayer = () => currentPlayer;

  const printNewRound = () => {
    console.log(board.getBoard());
    console.log(`${getCurrentPlayer().getName()}'s turn.`);
  };

  const playRound = (index) => {
    // Check if the player is choosing a valid cell
    if (board.getBoard()[index] !== '') return;
    console.log(
      `Inserting ${getCurrentPlayer().getName()}'s token into cell ${index}...`
    );
    board.updateBoard(index, getCurrentPlayer().getToken());

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound };
})();

GameController.playRound(2);
GameController.playRound(0);
GameController.playRound(2);
GameController.playRound(4);

