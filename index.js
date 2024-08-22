const gameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  // Method to help render our board on the page
  const getBoard = () => board;

  const addMarker = (player, cell) => {
    const row = cell[0];
    const column = cell[1];

    if (board[row][column].getValue() !== null) {
      console.log(
        `This cell is already taken by ${board[row][
          column
        ].getValue()} value. We can't add it to the board. Try again`
      );
      return "cell is taken";
    }

    board[row][column].setValue(player.getMarker());
  };

  // Method that displays our board for us in the console, only for the console version
  const printBoard = () => {
    const printedBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(printedBoard);
  };

  const hasAvailableCells = () => {
    let numberOfAvailableCells = 0;

    board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.getValue() === null) {
          numberOfAvailableCells += 1;
        }
      })
    );

    return numberOfAvailableCells;
  };

  const clearBoard = () => {
    board.forEach((row) => row.forEach((cell) => cell.setValue(null)));
  };

  return {
    getBoard,
    addMarker,
    printBoard,
    hasAvailableCells,
    clearBoard,
  };
})();

function cell() {
  let value = null;

  const getValue = () => value;

  const setValue = (newValue) => {
    value = newValue;
  };

  return {
    getValue,
    setValue,
  };
}

function player(playerName, playerMarker) {
  const name = playerName;
  const marker = playerMarker;
  let score = 0;

  const getName = () => {
    return name;
  };

  const getMarker = () => {
    return marker;
  };

  const getScore = () => {
    return score;
  };

  const setScore = () => {
    score++;
  };

  return {
    getName,
    getMarker,
    getScore,
    setScore,
  };
}

const gameController = (function () {
  const board = gameBoard;
  const winningNumber = 4;
  const players = [];

  let activePlayer;

  const makePlayer = (name) => {
    if (players.length > 1) {
      console.log("You can not add more than two players to this game");
      return;
    }
    if (players.length < 1) {
      players.push(player(name || "Player 1", "X"));
      activePlayer = players[0];
    } else {
      players.push(player(name || "Player 2", "O"));
    }
  };

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`Now ${getActivePlayer().getName()} it's your turn`);
  };

  const playRound = (cell) => {
    if (!board.hasAvailableCells()) {
      console.log("Game is over, no free cells");
    }

    if (isWinner(board.getBoard())) {
      console.log(
        "Clear the board before starting a new game. Use resetBoard() method"
      );

      return;
    }

    console.log(`Adding ${getActivePlayer().getName()}'s marker to the board`);

    if (board.addMarker(getActivePlayer(), cell) !== "cell is taken") {
      if (isWinner(board.getBoard())) {
        board.printBoard();
        console.log(`${getActivePlayer().getName()} is a winner`);
        getActivePlayer().setScore();
        if (getActivePlayer().getScore() === winningNumber) {
          console.log(`${getActivePlayer().getName()} is a Winner`);
        }
        return;
      }

      switchActivePlayer();
      printNewRound();
    }
  };

  const resetBoard = () => {
    board.clearBoard();
    board.printBoard();
    console.log("You had successfully cleared the board");
  };

  const isWinner = (board) => {
    if (
      board[0][0].getValue() === board[0][1].getValue() &&
      board[0][1].getValue() === board[0][2].getValue() &&
      board[0][0].getValue() !== null
    ) {
      return board[0][0].getValue() + " is winner";
    }

    if (
      board[1][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[1][2].getValue() &&
      board[1][0].getValue() !== null
    ) {
      return board[1][0].getValue() + " is winner";
    }

    if (
      board[2][0].getValue() === board[2][1].getValue() &&
      board[2][1].getValue() === board[2][2].getValue() &&
      board[2][0].getValue() !== null
    ) {
      return board[2][0].getValue() + " is winner";
    }

    if (
      board[0][0].getValue() === board[1][0].getValue() &&
      board[1][0].getValue() === board[2][0].getValue() &&
      board[0][0].getValue() !== null
    ) {
      return board[1][0].getValue() + " is winner";
    }

    if (
      board[0][1].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][1].getValue() &&
      board[0][1].getValue() !== null
    ) {
      return board[0][1].getValue() + " is winner";
    }

    if (
      board[0][2].getValue() === board[1][2].getValue() &&
      board[1][2].getValue() === board[2][2].getValue() &&
      board[0][2].getValue() !== null
    ) {
      return board[0][2].getValue() + " is winner";
    }

    if (
      board[0][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][2].getValue() &&
      board[0][0].getValue() !== null
    ) {
      return board[0][0].getValue() + " is winner";
    }

    if (
      board[0][2].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][0].getValue() &&
      board[0][2].getValue() !== null
    ) {
      return board[0][2].getValue() + " is winner";
    }
  };

  return {
    makePlayer,
    playRound,
    resetBoard,
  };
})();

const game = gameController;
