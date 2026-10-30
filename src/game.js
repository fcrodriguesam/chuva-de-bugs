import CONFIG from "./config.js";

export function createGameState(bestScore = 0) {
  return {
    screen: "initial",
    score: 0,
    lives: CONFIG.PLAYER_START_LIVES,
    bestScore,
    difficulty: 1,
    player: {
      x: (CONFIG.GAME_WIDTH - CONFIG.PLAYER_WIDTH) / 2,
      y: CONFIG.GAME_HEIGHT - CONFIG.PLAYER_HEIGHT - CONFIG.PLAYER_BOTTOM_MARGIN,
      width: CONFIG.PLAYER_WIDTH,
      height: CONFIG.PLAYER_HEIGHT
    },
    items: [],
    spawnTimer: CONFIG.ITEM_SPAWN_INTERVAL,
    difficultyTimer: 0
  };
}

export function startGame(gameState) {
  const nextState = createGameState(gameState.bestScore);
  nextState.screen = "playing";
  Object.assign(gameState, nextState);
}

export function handleSpaceAction(gameState) {
  if (gameState.screen === "initial" || gameState.screen === "gameOver") {
    startGame(gameState);
  }
}

export function updateGame(gameState, deltaSeconds) {
  if (gameState.screen !== "playing") {
    return;
  }

  gameState.difficultyTimer += deltaSeconds;
  gameState.difficulty =
    1 + Math.floor(gameState.difficultyTimer / CONFIG.DIFFICULTY_STEP_TIME) * CONFIG.DIFFICULTY_INCREASE_STEP;
}

export function updatePlayer(gameState, keys, deltaSeconds) {
  if (gameState.screen !== "playing") {
    return;
  }

  const direction = Number(keys.right) - Number(keys.left);
  gameState.player.x += direction * CONFIG.PLAYER_SPEED * deltaSeconds;
  gameState.player.x = Math.max(
    0,
    Math.min(CONFIG.GAME_WIDTH - gameState.player.width, gameState.player.x)
  );
}

export function spawnItem(gameState, random = Math.random) {
  const type = random() < CONFIG.ITEM_COFFEE_CHANCE ? "coffee" : "bug";
  const size = CONFIG.ITEM_SIZE;

  gameState.items.push({
    type,
    x: random() * (CONFIG.GAME_WIDTH - size),
    y: -size,
    size,
    icon: type === "coffee" ? "☕" : "🐛",
    speed:
      CONFIG.ITEM_FALL_SPEED +
      random() * CONFIG.ITEM_FALL_SPEED_VARIATION +
      gameState.difficulty * CONFIG.ITEM_FALL_SPEED_STEP
  });
}

export function updateItems(gameState, deltaSeconds) {
  if (gameState.screen !== "playing") {
    return false;
  }

  let gameOver = false;
  const player = gameState.player;

  gameState.items = gameState.items.filter((item) => {
    if (gameState.screen !== "playing") {
      return false;
    }

    item.y += item.speed * deltaSeconds;

    const overlaps =
      item.x + item.size > player.x &&
      item.x < player.x + player.width &&
      item.y + item.size > player.y &&
      item.y < player.y + player.height;

    if (overlaps) {
      if (item.type === "coffee") {
        gameState.score += 1;
      } else {
        gameState.lives -= 1;
        if (gameState.lives <= 0) {
          gameState.screen = "gameOver";
          gameOver = true;
        }
      }
      return false;
    }

    return item.y <= CONFIG.GAME_HEIGHT;
  });

  return gameOver;
}

export function updateItemSpawning(gameState, deltaSeconds, random = Math.random) {
  if (gameState.screen !== "playing") {
    return;
  }

  gameState.spawnTimer -= deltaSeconds;
  if (gameState.spawnTimer <= 0) {
    spawnItem(gameState, random);
    gameState.spawnTimer = Math.max(
      CONFIG.ITEM_SPAWN_MIN_INTERVAL,
      CONFIG.ITEM_SPAWN_INTERVAL - gameState.difficulty * CONFIG.ITEM_SPAWN_INTERVAL_STEP
    );
  }
}
