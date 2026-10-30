import CONFIG from "./config.js";
import { bindInput, inputState, resetInput } from "./input.js";
import { createGameState, handleSpaceAction, updateGame } from "./game.js";
import { loadBestScore, saveBestScore } from "./storage.js";
import { renderGame } from "./render.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = createGameState(loadBestScore());

function updatePlayer(deltaSeconds) {
  const direction = Number(inputState.right) - Number(inputState.left);
  const movement = direction * CONFIG.PLAYER_SPEED * deltaSeconds;

  gameState.player.x += movement;

  gameState.player.x = Math.max(0, Math.min(CONFIG.GAME_WIDTH - gameState.player.width, gameState.player.x));
}

function spawnItem() {
  const itemType = Math.random() < 0.7 ? "coffee" : "bug";
  const size = CONFIG.ITEM_SIZE;
  const x = Math.random() * (CONFIG.GAME_WIDTH - size);

  gameState.items.push({
    type: itemType,
    x,
    y: -size,
    size,
    icon: itemType === "coffee" ? "☕" : "🐛",
    speed: CONFIG.ITEM_FALL_SPEED + Math.random() * 80 + gameState.difficulty * CONFIG.ITEM_FALL_SPEED_STEP
  });
}

function updateItems(deltaSeconds) {
  const player = gameState.player;

  gameState.items = gameState.items.filter((item) => {
    item.y += item.speed * deltaSeconds;

    const itemBounds = {
      left: item.x,
      right: item.x + item.size,
      top: item.y,
      bottom: item.y + item.size
    };

    const playerBounds = {
      left: player.x,
      right: player.x + player.width,
      top: player.y,
      bottom: player.y + player.height
    };

    const overlaps =
      itemBounds.right > playerBounds.left &&
      itemBounds.left < playerBounds.right &&
      itemBounds.bottom > playerBounds.top &&
      itemBounds.top < playerBounds.bottom;

    if (overlaps) {
      if (item.type === "coffee") {
        gameState.score += 1;
      } else {
        gameState.lives -= 1;
        if (gameState.lives <= 0) {
          gameState.screen = "gameOver";
          if (gameState.score > gameState.bestScore) {
            gameState.bestScore = gameState.score;
            saveBestScore(gameState.bestScore);
          }
        }
      }
      return false;
    }

    if (item.y > CONFIG.GAME_HEIGHT) {
      return false;
    }

    return true;
  });
}

function updateDifficulty(deltaSeconds) {
  gameState.difficulty = 1 + Math.floor(gameState.difficultyTimer / CONFIG.DIFFICULTY_STEP_TIME) * 0.4;
  gameState.spawnTimer -= deltaSeconds;

  const minInterval = Math.max(CONFIG.ITEM_SPAWN_MIN_INTERVAL, CONFIG.ITEM_SPAWN_INTERVAL - gameState.difficulty * 0.1);

  if (gameState.spawnTimer <= 0) {
    spawnItem();
    gameState.spawnTimer = minInterval;
  }
}

function loop(timestamp) {
  if (!loop.lastTime) {
    loop.lastTime = timestamp;
  }

  const deltaSeconds = (timestamp - loop.lastTime) / 1000;
  loop.lastTime = timestamp;

  updateGame(gameState, deltaSeconds);

  if (gameState.screen === "playing") {
    updatePlayer(deltaSeconds);
    updateDifficulty(deltaSeconds);
    updateItems(deltaSeconds);
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
