let gameMode = "pvp";
let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let isGameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const modeSelector = document.getElementById("mode");

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

modeSelector.addEventListener("change", () => {
  gameMode = modeSelector.value;
  resetGame();
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(cell, index));
});

resetButton.addEventListener("click", resetGame);

function handleMove(cell, index) {
  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusDisplay.textContent = `${currentPlayer} Wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  if (gameMode === "pvp") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Turn: ${currentPlayer}`;
  } else if (gameMode === "ai") {
    currentPlayer = "O";
    statusDisplay.textContent = "AI Thinking...";
    setTimeout(aiMove, 400);
  }
}

function aiMove() {
  if (!isGameActive) return;

  let index = getBestAIMove(); // Simple AI
  if (index === -1) return;

  gameBoard[index] = "O";
  cells[index].textContent = "O";

  if (checkWin("O")) {
    statusDisplay.textContent = "AI Wins! 😢";
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = "X";
  statusDisplay.textContent = "Your Turn (X)";
}

function getBestAIMove() {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === "") return i;
  }
  return -1;
}

function checkWin(player) {
  return winConditions.some(([a, b, c]) => {
    return gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player;
  });
}

function resetGame() {
  gameBoard = Array(9).fill("");
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach(cell => (cell.textContent = ""));
  statusDisplay.textContent = "Your Turn (X)";
}
