let score = 0;
let gameInterval;
const gameDuration = 30;
const moles = [];
const showDuration = 1000;
const popUpInterval = 1500;

class Mole {
  constructor(holeElement) {
    this.holeElement = holeElement;
    this.moleElement = holeElement.querySelector(".mole");
    this.visible = false;
  }

  show() {
    this.visible = true;
    this.moleElement.classList.add("visible");
  }

  hide() {
    this.visible = false;
    this.moleElement.classList.remove("visible");
  }

  isVisible() {
    return this.visible;
  }
}

function getRandomHole() {
  const index = Math.floor(Math.random() * moles.length);
  return moles[index];
}

function initGame() {
  score = 0;
  document.getElementById("WAM-game-score").textContent = `Score: ${score}`;
  const gameBoard = document.getElementById("WAM-game-board");

  gameBoard.innerHTML = "";
  moles.length = 0;

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.className = "hole";
    const moleDiv = document.createElement("div");
    moleDiv.className = "mole";
    hole.appendChild(moleDiv);
    gameBoard.appendChild(hole);

    const mole = new Mole(hole);
    hole.addEventListener("click", () => whackMole(mole));
    moles.push(mole);
  }
  startGameLoop();
}

function startGameLoop() {
  gameInterval = setInterval(() => {
    moles.forEach((mole) => mole.hide());
    const activeMole = getRandomHole();
    activeMole.show();
    setTimeout(() => activeMole.hide(), showDuration);
  }, popUpInterval);

  setTimeout(endGame, gameDuration * 1000);
}

function whackMole(mole) {
  if (mole.isVisible()) {
    score++;
    document.getElementById("WAM-game-score").textContent = `Score: ${score}`;
    mole.hide();
  }
}

function endGame() {
  clearInterval(gameInterval);
  moles.forEach((mole) => mole.hide());
  document.getElementById(
    "WAM-game-score"
  ).textContent = `Game Over! Your score: ${score}`;
  document.querySelector(".WAM-game-start-button").style.display = "flex";
  document.querySelector(".WAM-game-start-button").textContent = "Play Again";
}

document
  .querySelector(".WAM-game-start-button")
  .addEventListener("click", () => {
    initGame();
    document.querySelector(".WAM-game-start-button").style.display = "none";
  });
