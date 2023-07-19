const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-winning-message-button]");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isCircleTurn;
const startGame = () => {
  isCircleTurn = false;
  for (const cellElement of cellElements) {
    cellElement.classList.remove("X");
    cellElement.classList.remove("O");
    cellElement.removeEventListener("click", handleClick);
    cellElement.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Ganhou!"
      : "X Ganhou!";
  }
  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
};
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};
const swapTurn = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};
setBoardHoverClass = () => {
  board.classList.remove("X");
  board.classList.remove("O");

  if (isCircleTurn) {
    board.classList.add("O");
  } else {
    board.classList.add("X");
  }
};
const handleClick = (e) => {
  //colocar marca (X/O)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "O" : "X";

  placeMark(cell, classToAdd);
  //verificar vitoria
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(isDraw);
  } else if (isDraw) {
    endGame(isDraw);
  } else {
    swapTurn();
  }
};
startGame();
restartButton.addEventListener("click", startGame);
