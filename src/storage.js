import CONFIG from "./config.js";

export function loadBestScore() {
  const savedValue = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
  const parsed = Number(savedValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function saveBestScore(value) {
  localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, String(value));
}
