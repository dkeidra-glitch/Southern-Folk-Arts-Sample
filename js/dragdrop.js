// dragdrop.js
// HTML5 drag-and-drop: drag a quilt thumbnail from the tray onto the wall.
// Placement position is stored as a percentage of the wall's width/height
// so it stays put regardless of small layout shifts.

function initWallDropZone(wallEl, onDrop) {
  wallEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });

  wallEl.addEventListener("drop", (e) => {
    e.preventDefault();
    const quiltId = e.dataTransfer.getData("text/plain");
    if (!quiltId) return;

    const rect = wallEl.getBoundingClientRect();
    let xPct = ((e.clientX - rect.left) / rect.width) * 100;
    let yPct = ((e.clientY - rect.top) / rect.height) * 100;

    // Keep the block fully on the wall with a small margin.
    xPct = Math.min(92, Math.max(2, xPct));
    yPct = Math.min(85, Math.max(2, yPct));

    onDrop(quiltId, xPct, yPct);
  });
}

function makeDraggable(el, quiltId) {
  el.setAttribute("draggable", "true");
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", quiltId);
    e.dataTransfer.effectAllowed = "copy";
  });
}
