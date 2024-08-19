const gameBoard = (function () {
  /* state */
  const rows = 3;
  const columns = 3;
  const board = [];
  /* state */

  /* build the board */
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  /* build the board */

  // Method to help render our board on the page
  const getBoard = () => board;

  // Method for adding a marker to the board
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

    board[row][column].setValue(player.marker);
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

  return {
    getBoard,
    addMarker,
    printBoard,
    hasAvailableCells,
  };
})();

function Cell() {
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

function GameController(player1 = "Player 1", player2 = "Player 2") {
  const board = gameBoard;

  const players = [
    {
      name: player1,
      marker: "X",
    },
    {
      name: player2,
      marker: "O",
    },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`Now ${getActivePlayer().name} it's your turn`);
  };

  const playRound = (cell) => {
    if (!board.hasAvailableCells()) {
      console.log("Game is over, no free cells");
    }

    console.log(`Adding ${getActivePlayer().name}'s marker to the board`);

    if (board.addMarker(getActivePlayer(), cell) !== "cell is taken") {
      if (isWinner(board.getBoard(), activePlayer)) {
        board.printBoard();
        console.log(`${getActivePlayer().name} is a winner`);
        return;
      }

      switchActivePlayer();
      printNewRound();
    }
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
    playRound,
  };
}

const game = GameController();
