const gameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];
  let id = 1;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push({ ...cell(), id });
      id++;
    }
  }

  const getBoard = () => board;

  const addMarker = (player, cellId) => {
    const marker = player.getMarker();

    for (let i = 0; i < board.length; i++) {
      board[i];

      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].id === cellId) {
          if (board[i][j].getValue() !== null) {
            return "cell is taken";
          }

          board[i][j].setValue(marker);
        }
      }
    }
  };

  const hasAvailableCells = () => {
    let numberOfAvailableCells = 0;

    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.getValue() === null) {
          numberOfAvailableCells++;
        }
      });
    });

    return numberOfAvailableCells;
  };

  const clearBoard = () => {
    board.forEach((row) => row.forEach((cell) => cell.setValue(null)));
  };

  return {
    getBoard,
    addMarker,
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

  const getName = () => name;

  const getMarker = () => marker;

  const getScore = () => score;

  const setScore = () => {
    score++;
  };

  const resetScore = () => {
    score = 0;
  };

  return {
    getName,
    getMarker,
    getScore,
    setScore,
    resetScore,
  };
}

const gameController = (function () {
  const board = gameBoard;
  const winningNumber = 4;
  const players = [];

  let activePlayer;

  const makePlayer = (name) => {
    if (players.length < 1) {
      players.push(player(name || "Player 1", "X"));
      activePlayer = players[0];
    } else {
      players.push(player(name || "Player 2", "O"));
    }
  };

  const getPlayers = () => players;

  const getActivePlayer = () => activePlayer;

  const setActivePlayer = (player) => {
    activePlayer = player;
  };

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (cellId) => {
    if (board.addMarker(getActivePlayer(), cellId) !== "cell is taken") {
      if (isWinner(board.getBoard())) {
        getActivePlayer().setScore();

        return;
      }

      switchActivePlayer();
    }
  };

  const resetBoard = () => {
    board.clearBoard();
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
    getBoard: board.getBoard(),
    setActivePlayer,
    makePlayer,
    playRound,
    resetBoard,
    getPlayers,
    getActivePlayer,
    isWinner,
    winningNumber,
  };
})();

function screenController() {
  const game = gameController;
  const form = document.querySelector(".form");
  const gameWrapper = document.querySelector(".game-wrapper");
  const field = document.querySelector(".field");
  const turn = document.querySelector(".turn");
  const clearButton = document.querySelector("#clear");
  const dialog = document.querySelector("dialog");
  const winner = document.querySelector(".winner");

  const updateScreen = () => {
    let id = 1;
    field.textContent = "";
    const board = game.getBoard;
    const activePlayer = game.getActivePlayer();
    const firstPlayerSpot = document.querySelector("#player-1");
    const secondPlayerSpot = document.querySelector("#player-2");
    turn.textContent = `${activePlayer.getName()}'s turn...`;

    firstPlayerSpot.textContent = `${game
      .getPlayers()[0]
      .getName()} score ${game.getPlayers()[0].getScore()}`;

    secondPlayerSpot.textContent = `${game
      .getPlayers()[1]
      .getName()} score ${game.getPlayers()[1].getScore()}`;

    if (game.isWinner(board)) {
      turn.textContent = `${activePlayer.getName()} has won this round`;
      game.setActivePlayer(game.getPlayers()[0]);
    }

    board.forEach((row) => {
      row.forEach((cell) => {
        const button = document.createElement("button");
        button.classList.add("cell");
        button.textContent = cell.getValue() === null ? "" : cell.getValue();
        button.setAttribute("id", id);
        field.appendChild(button);
        id++;
      });
    });

    id = 1;
  };

  form.addEventListener("submit", startGame);

  function startGame(e) {
    e.preventDefault();
    const firstPlayerName = form.querySelector("#firstPlayerName").value;
    const secondPlayerName = form.querySelector("#secondPlayerName").value;
    const firstPlayerSpot = document.querySelector("#player-1");
    const secondPlayerSpot = document.querySelector("#player-2");
    game.makePlayer(firstPlayerName);
    game.makePlayer(secondPlayerName);
    const firstPlayer = game.getPlayers()[0];
    const secondPlayer = game.getPlayers()[1];

    firstPlayerSpot.textContent =
      firstPlayer.getName() + " score " + firstPlayer.getScore();
    secondPlayerSpot.textContent =
      secondPlayer.getName() + " score " + secondPlayer.getScore();

    form.style.display = "none";
    gameWrapper.style.display = "flex";

    updateScreen();
  }

  field.addEventListener("click", addMarker);

  function addMarker(e) {
    const id = Number(e.target.id);

    game.playRound(id);

    updateScreen();

    if (game.getPlayers()[0].getScore() === game.winningNumber) {
      winner.textContent = `${game.getPlayers()[0].getName()} is a Winner!`;
      dialog.showModal();
    } else if (game.getPlayers()[1].getScore() === game.winningNumber) {
      winner.textContent = `${game.getPlayers()[1].getName()} is a Winner!`;
      dialog.showModal();
    }
  }

  clearButton.addEventListener("click", clearBoard);

  function clearBoard() {
    game.resetBoard();

    updateScreen();
  }

  dialog.addEventListener("close", closeDialog);

  function closeDialog() {
    game.resetBoard();
    game.getPlayers()[0].resetScore();
    game.getPlayers()[1].resetScore();
    updateScreen();
  }
}

screenController();
