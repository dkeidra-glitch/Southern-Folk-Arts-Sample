// movement.js
// Simple snap-to-grid tile movement on the floor of the current room.

const GRID_COLS = 10;
const GRID_ROWS = 4;
const TILE_SIZE = 56; // px, must match .floor-grid tile sizing in CSS

// Door sits at the right edge, vertically centered row.
const DOOR_TILE = { x: GRID_COLS - 1, y: Math.floor(GRID_ROWS / 2) };
// Player always enters a new room at the left edge, same row as the door.
const ENTRY_TILE = { x: 0, y: DOOR_TILE.y };

let playerPos = { ...ENTRY_TILE };
let onDoorEnter = null; // callback set by main.js

function setDoorCallback(fn) {
  onDoorEnter = fn;
}

function resetPlayerToEntry() {
  playerPos = { ...ENTRY_TILE };
  renderPlayer();
}

function renderPlayer() {
  const el = document.getElementById("player");
  if (!el) return;
  el.style.transform = `translate(${playerPos.x * TILE_SIZE}px, ${playerPos.y * TILE_SIZE}px)`;
}

function tryMove(dx, dy, doorUnlocked) {
  const nx = Math.min(GRID_COLS - 1, Math.max(0, playerPos.x + dx));
  const ny = Math.min(GRID_ROWS - 1, Math.max(0, playerPos.y + dy));

  // The door tile is only walkable once unlocked; otherwise treat it as a wall.
  if (nx === DOOR_TILE.x && ny === DOOR_TILE.y && !doorUnlocked) {
    return;
  }

  playerPos = { x: nx, y: ny };
  renderPlayer();

  if (nx === DOOR_TILE.x && ny === DOOR_TILE.y && doorUnlocked && onDoorEnter) {
    onDoorEnter();
  }
}

function initMovement(getDoorUnlocked) {
  document.addEventListener("keydown", (e) => {
    // Don't hijack arrow keys while the player is typing in a text field.
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    let dx = 0, dy = 0;
    switch (e.key) {
      case "ArrowUp": dy = -1; break;
      case "ArrowDown": dy = 1; break;
      case "ArrowLeft": dx = -1; break;
      case "ArrowRight": dx = 1; break;
      default: return;
    }
    e.preventDefault();
    tryMove(dx, dy, getDoorUnlocked());
  });
  renderPlayer();
}
