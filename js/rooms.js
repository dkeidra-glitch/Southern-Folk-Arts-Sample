// rooms.js
// Four rooms, unlocked in sequence. Each room needs 5 quilts placed on its
// walls before the doorway to the next room opens.

const QUILTS_TO_UNLOCK = 5;

const ROOMS = [
  {
    key: "porch",
    label: "The Porch",
    wallColor: "#EAD9A0",
    floorColor: "#C1652F",
    trim: "#4A3728",
    blurb: "Sunlight, screen doors, and a good place to start."
  },
  {
    key: "parlor",
    label: "The Parlor",
    wallColor: "#C77B67",
    floorColor: "#7A3B31",
    trim: "#3B4B6B",
    blurb: "The room for company \u2014 and for showing off your best work."
  },
  {
    key: "kitchen",
    label: "The Kitchen",
    wallColor: "#D4A017",
    floorColor: "#6B7A57",
    trim: "#4A3728",
    blurb: "Warm, well-used, and full of stories."
  },
  {
    key: "attic",
    label: "The Attic",
    wallColor: "#5B7C99",
    floorColor: "#33465F",
    trim: "#EAD9A0",
    blurb: "Where the family's oldest quilts are kept."
  }
];

function placementsInRoom(state, roomIndex) {
  return state.placements.filter(p => p.room === roomIndex);
}

function isRoomComplete(state, roomIndex) {
  return placementsInRoom(state, roomIndex).length >= QUILTS_TO_UNLOCK;
}

function refreshUnlocks(state) {
  for (let i = 0; i < ROOMS.length - 1; i++) {
    if (isRoomComplete(state, i)) {
      state.unlockedRooms[i + 1] = true;
    }
  }
  return state;
}

function isLastRoom(roomIndex) {
  return roomIndex === ROOMS.length - 1;
}
