// main.js
// Wires together the data, storage, rooms, movement, and drag/drop modules
// and handles all DOM rendering for the game.

let state = loadState();

const els = {
  nameOverlay: document.getElementById("name-overlay"),
  nameInput: document.getElementById("name-input"),
  startBtn: document.getElementById("start-btn"),
  game: document.getElementById("game"),
  playerLabel: document.getElementById("player-label"),
  roomName: document.getElementById("room-name"),
  roomBlurb: document.getElementById("room-blurb"),
  progressFill: document.getElementById("progress-fill"),
  progressText: document.getElementById("progress-text"),
  resetBtn: document.getElementById("reset-btn"),
  wall: document.getElementById("wall"),
  floor: document.getElementById("floor"),
  tray: document.getElementById("tray"),
  trayCount: document.getElementById("tray-count"),
  infoModal: document.getElementById("info-modal"),
  infoName: document.getElementById("info-name"),
  infoOrigin: document.getElementById("info-origin"),
  infoClose: document.getElementById("info-close"),
  finishBanner: document.getElementById("finish-banner"),
  finishClose: document.getElementById("finish-close")
};

// ---------- boot ----------
function boot() {
  if (state.playerName && state.playerName.trim()) {
    startGame();
  } else {
    els.nameOverlay.classList.remove("hidden");
    els.nameInput.focus();
  }
}

els.startBtn.addEventListener("click", () => {
  const name = els.nameInput.value.trim();
  if (!name) {
    els.nameInput.focus();
    els.nameInput.style.borderColor = "var(--barn-red)";
    return;
  }
  state.playerName = name;
  saveState(state);
  els.nameInput.blur();
  document.activeElement && document.activeElement.blur && document.activeElement.blur();
  els.nameOverlay.classList.add("hidden");
  startGame();
});

els.nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") els.startBtn.click();
});

function startGame() {
  els.game.classList.remove("hidden");
  els.playerLabel.textContent = `${state.playerName}'s room \u00b7 Room ${state.currentRoom + 1} of ${ROOMS.length}`;
  initWallDropZone(els.wall, handlePlacement);
  initMovement(() => doorIsUnlocked());
  renderAll();
}

// ---------- rendering ----------
function currentRoom() {
  return ROOMS[state.currentRoom];
}

function doorIsUnlocked() {
  if (isLastRoom(state.currentRoom)) return true; // no wall to block against
  return !!state.unlockedRooms[state.currentRoom + 1];
}

function renderAll() {
  renderRoomChrome();
  renderFloor();
  renderWall();
  renderTray();
  renderProgress();
  movement_resetSafely();
}

function movement_resetSafely() {
  // movement.js keeps player position in module state; reset visually
  // whenever we (re)draw a room.
  resetPlayerToEntry();
}

function renderRoomChrome() {
  const room = currentRoom();
  els.roomName.textContent = room.label;
  els.roomBlurb.textContent = room.blurb;
  els.playerLabel.textContent = `${state.playerName}'s room \u00b7 Room ${state.currentRoom + 1} of ${ROOMS.length}`;
  els.wall.style.backgroundColor = room.wallColor;
}

function renderFloor() {
  const room = currentRoom();
  els.floor.innerHTML = "";
  const unlocked = doorIsUnlocked();
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      const tile = document.createElement("div");
      tile.className = "floor-tile";
      const isDoorTile = x === DOOR_TILE.x && y === DOOR_TILE.y;
      const shade = (x + y) % 2 === 0 ? room.floorColor : shadeColor(room.floorColor, -10);
      tile.style.backgroundColor = shade;

      if (isDoorTile && !isLastRoom(state.currentRoom)) {
        tile.classList.add("door", unlocked ? "unlocked" : "locked");
      }
      els.floor.appendChild(tile);
    }
  }
}

function renderWall() {
  els.wall.querySelectorAll(".wall-quilt").forEach(n => n.remove());
  const placements = placementsInRoom(state, state.currentRoom);
  placements.forEach(p => {
    const block = QUILT_BLOCKS.find(q => q.id === p.quiltId);
    if (!block) return;
    const div = document.createElement("div");
    div.className = "wall-quilt";
    div.style.left = `${p.xPct}%`;
    div.style.top = `${p.yPct}%`;
    div.style.backgroundImage = `url(${quiltSvgPath(block.id)})`;
    div.title = block.name;
    div.addEventListener("click", () => openInfo(block));
    els.wall.appendChild(div);
  });
}

function renderTray() {
  const placedIds = new Set(state.placements.map(p => p.quiltId));
  const remaining = QUILT_BLOCKS.filter(q => !placedIds.has(q.id));
  els.tray.innerHTML = "";
  els.trayCount.textContent = `(${remaining.length} left)`;

  if (remaining.length === 0) {
    const p = document.createElement("p");
    p.className = "tray-empty";
    p.textContent = "All 20 quilt blocks have found a home!";
    els.tray.appendChild(p);
    return;
  }

  remaining.forEach(block => {
    const div = document.createElement("div");
    div.className = "tray-item";
    div.style.backgroundImage = `url(${quiltSvgPath(block.id)})`;
    div.title = block.name;
    makeDraggable(div, block.id);
    els.tray.appendChild(div);
  });
}

function renderProgress() {
  const count = placementsInRoom(state, state.currentRoom).length;
  const pct = Math.min(100, (count / QUILTS_TO_UNLOCK) * 100);
  els.progressFill.style.width = `${pct}%`;
  if (isLastRoom(state.currentRoom)) {
    els.progressText.textContent = `${count} placed`;
  } else {
    els.progressText.textContent = `${count}/${QUILTS_TO_UNLOCK} to open next door`;
  }
}

// ---------- interactions ----------
function handlePlacement(quiltId, xPct, yPct) {
  const alreadyUsed = state.placements.some(p => p.quiltId === quiltId);
  if (alreadyUsed) return; // each block can only be used once

  state.placements.push({ quiltId, room: state.currentRoom, xPct, yPct });
  refreshUnlocks(state);
  saveState(state);

  renderWall();
  renderTray();
  renderProgress();
  renderFloor(); // door may have just unlocked

  if (isLastRoom(state.currentRoom) && isRoomComplete(state, state.currentRoom) && !state.finishShown) {
    state.finishShown = true;
    saveState(state);
    els.finishBanner.classList.remove("hidden");
  }
}

function openInfo(block) {
  els.infoName.textContent = block.name;
  els.infoOrigin.textContent = block.traditional
    ? block.origin
    : "An original design created for our class quilt room \u2014 no historical pattern behind this one, just for fun.";
  els.infoModal.classList.remove("hidden");
}
els.infoClose.addEventListener("click", () => els.infoModal.classList.add("hidden"));
els.infoModal.addEventListener("click", (e) => {
  if (e.target === els.infoModal) els.infoModal.classList.add("hidden");
});

els.finishClose.addEventListener("click", () => els.finishBanner.classList.add("hidden"));

els.resetBtn.addEventListener("click", () => {
  const sure = confirm("This clears all placed quilts and starts your room over. Continue?");
  if (!sure) return;
  clearState();
  location.reload();
});

// door transition, wired into movement.js
setDoorCallback(() => {
  if (isLastRoom(state.currentRoom)) return;
  if (!doorIsUnlocked()) return;
  state.currentRoom += 1;
  saveState(state);
  renderAll();
});

// ---------- tiny utility ----------
function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `rgb(${r}, ${g}, ${b})`;
}

boot();
