"use strict";

function startGame() {
  startGameBtn.classList.toggle("hidden");
  mainBoard.classList.toggle("remove_blur");
  levelValue.textContent = Number(levelValue.textContent + 1);
  const game = new Game();
  game.makeGame();
  game.addEventListener();
}

//Start game commands execution
startGameBtn.addEventListener("click", startGame);
