// storage.js
// All game state lives in the browser's localStorage. There is no server,
// so each student's room only exists on their own computer -- they share
// their finished room with the class via a screenshot.

const STORAGE_KEY = "sfaQuiltRoom:v1";

function defaultState() {
  return {
    playerName: "",
    currentRoom: 0,          // index into ROOMS
    placements: [],          // [{ quiltId, room, xPct, yPct }]
    unlockedRooms: [true, false, false, false]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // guard against malformed/older saves
    if (!parsed || typeof parsed !== "object") return defaultState();
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    console.warn("Could not read saved room, starting fresh.", e);
    return defaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save room progress.", e);
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
