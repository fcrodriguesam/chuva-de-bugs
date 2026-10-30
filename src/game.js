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
      y: CONFIG.GAME_HEIGHT - CONFIG.PLAYER_HEIGHT - 18,
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
}
