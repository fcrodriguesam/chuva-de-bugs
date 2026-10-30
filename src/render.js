import CONFIG from "./config.js";

export function drawBackground(ctx) {
  ctx.fillStyle = CONFIG.BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);

  ctx.strokeStyle = CONFIG.GRID_COLOR;
  ctx.lineWidth = 1;
  for (let x = 0; x < CONFIG.GAME_WIDTH; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CONFIG.GAME_HEIGHT);
    ctx.stroke();
  }

  for (let y = 0; y < CONFIG.GAME_HEIGHT; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CONFIG.GAME_WIDTH, y);
    ctx.stroke();
  }
}

export function drawPlayer(ctx, player) {
  ctx.font = `${player.height}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🧑‍💻", player.x + player.width / 2, player.y + player.height / 2);
}

export function drawItem(ctx, item) {
  ctx.font = `${item.size}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(item.icon, item.x + item.size / 2, item.y + item.size / 2);
}

export function drawHud(ctx, gameState) {
  ctx.fillStyle = CONFIG.TEXT_COLOR;
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`☕ ${gameState.score}`, 16, 28);

  ctx.textAlign = "right";
  ctx.fillText(`❤️`.repeat(gameState.lives), CONFIG.GAME_WIDTH - 16, 28);
}

export function drawScreenText(ctx, text, size = 18, y = CONFIG.GAME_HEIGHT / 2) {
  ctx.fillStyle = CONFIG.TEXT_COLOR;
  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, CONFIG.GAME_WIDTH / 2, y);
}

export function renderGame(ctx, gameState) {
  drawBackground(ctx);

  if (gameState.screen === "initial") {
    drawScreenText(ctx, CONFIG.GAME_TITLE, 32, CONFIG.START_SCREEN_TITLE_Y);
    drawScreenText(ctx, CONFIG.START_SCREEN_TEXT, 20, CONFIG.START_SCREEN_INSTRUCTION_Y);
    return;
  }

  drawHud(ctx, gameState);

  if (gameState.screen === "gameOver") {
    const lines = [
      `Pontuação: ${gameState.score}`,
      `Recorde: ${gameState.bestScore}`,
      CONFIG.GAME_OVER_TEXT
    ];

    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = CONFIG.TEXT_COLOR;
    lines.forEach((line, index) => {
      ctx.fillText(line, CONFIG.GAME_WIDTH / 2, CONFIG.GAME_HEIGHT / 2 - 24 + index * 32);
    });
  }

  drawPlayer(ctx, gameState.player);

  gameState.items.forEach((item) => drawItem(ctx, item));
}
