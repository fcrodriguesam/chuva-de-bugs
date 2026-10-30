import { bindInput, inputState, resetInput } from "./input.js";
import {
  createGameState,
  handleSpaceAction,
  updateGame,
  updatePlayer,
  updateItems,
  updateItemSpawning
} from "./game.js";
import { loadBestScore, saveBestScore } from "./storage.js";
import { renderGame } from "./render.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = createGameState(loadBestScore());

function loop(timestamp) {
  if (!loop.lastTime) {
    loop.lastTime = timestamp;
  }

  const deltaSeconds = (timestamp - loop.lastTime) / 1000;
  loop.lastTime = timestamp;

  updateGame(gameState, deltaSeconds);

  if (gameState.screen === "playing") {
    updatePlayer(gameState, inputState, deltaSeconds);
    updateItemSpawning(gameState, deltaSeconds);
    const gameOver = updateItems(gameState, deltaSeconds);
    if (gameOver && gameState.score > gameState.bestScore) {
      gameState.bestScore = gameState.score;
      saveBestScore(gameState.bestScore);
    }
  }

  renderGame(ctx, gameState);
  requestAnimationFrame(loop);
}

bindInput(() => {
  handleSpaceAction(gameState);
  if (gameState.screen === "playing") {
    resetInput();
  }
});

requestAnimationFrame(loop);
