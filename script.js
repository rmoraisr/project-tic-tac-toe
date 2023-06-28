// The Game represents the state of the board
const Game = (() => {
  // Gameboard representation
  let board = Array(9).fill('');

  const getBoard = () => board;

  const updateBoard = (index, playerToken) => {
    if (board[index] !== '') return;
    board[index] = playerToken;
  };

  const resetBoard = () => {
    board = Array(9).fill('');
  };

  const checkWinner = () => {
    // Define all possible winning combinations
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check each winning combination
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        return true; // We have a winner
      }
    }

    return false; // No winner found
  };

  const checkTie = () => {
    // Check if all cells are filled
    for (let cell of board) {
      if (cell === '') {
        return false; // At least one cell is empty, not a tie yet
      }
    }

    return true; // All cells are filled, it's a tie
  };

  return {
    getBoard,
    updateBoard,
    resetBoard,
    checkWinner,
    checkTie,
  };
})();

// Player factory function
const Player = (playerName, playerToken) => {
  const getName = () => playerName;
  const getToken = () => playerToken;
  return { getName, getToken };
};

// Game Controlle Mode
const GameController = (() => {
  const player1Name = document.getElementById('player1-name').value;
  const player2Name = document.getElementById('player2-name').value;
  const player1Token = document.getElementById('player1-emoji').value;
  const player2Token = document.getElementById('player2-emoji').value;
  const player1 = Player(player1Name || 'Player I', player1Token);
  const player2 = Player(player2Name || 'Player II', player2Token);

  let currentPlayer = player1;

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const getCurrentPlayer = () => currentPlayer;


  const showWinnerMessage = (winnerName) => {
    const dialog = document.querySelector('.game-modal');
    const message = document.querySelector('.game-message');
    message.textContent = `${winnerName} wins!`;
    dialog.showModal();
  };
 
  const showTieMessage = () => {
    const dialog = document.querySelector('.game-modal');
    const message = document.querySelector('.game-message');
    message.textContent = "It's a tie!";
    dialog.showModal();
  };

  const playRound = (index) => {
    const board = Game.getBoard();
    // Check if the player is choosing a valid cell
    if (board[index] !== '') return;

    Game.updateBoard(index, getCurrentPlayer().getToken());

    // Check for game over conditions

    if (Game.checkWinner()) {
      showWinnerMessage(getCurrentPlayer().getName());
      // Perform game over actions, e.g., show winner, disable further moves
      return;
    } else if (Game.checkTie()) {
      showTieMessage();

      // Perform game over actions for a tie, e.g., show tie message, disable further moves
      return;
    }

    switchPlayerTurn();
  };

  return {
    playRound,
    getCurrentPlayer,
  };
})();

const ScreenController = (() => {
  const playerTurnDiv = document.getElementById('player-turn');
  const boardDiv = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');

  const closeDialog = () => {
    const dialog = document.getElementById('game-modal');
    dialog.close();
    Game.resetBoard();
    updateScreen();
  };

  const updateScreen = () => {
    // get the newest version of the board and player turn
    const board = Game.getBoard();
    const currentPlayerName = GameController.getCurrentPlayer().getName();
    // Display player's turn
    playerTurnDiv.textContent = `${currentPlayerName}'s turn`;

    // Render board
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const clickHandlerBoard = (e) => {
    const selectedCellIndex = e.target.dataset.value;
    GameController.playRound(selectedCellIndex);
    updateScreen();
  };

  const initialize = () => {
    updateScreen();
    boardDiv.addEventListener('click', clickHandlerBoard);

    const closeModalButton = document.getElementById('btn-modal');
    closeModalButton.addEventListener('click', closeDialog);
  };

  return {
    initialize,
  };
})();

ScreenController.initialize();
