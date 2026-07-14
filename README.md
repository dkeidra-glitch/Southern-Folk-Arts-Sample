# Southern Folk Arts: Quilt Room

A cozy, Animal-Crossing-style browser game for the *Southern Folk Arts*
class. Each student walks their own room, drags quilt blocks onto the
walls, and unlocks new rooms as they go. Pure static HTML/CSS/JS —
no build step, no server, no accounts. Deploys straight to GitHub Pages.

## How it works for students

1. Open the page, type a name (just a label, not a login).
2. Walk with the **arrow keys**.
3. **Drag** a quilt block from the tray at the bottom onto any wall.
4. **Click** a hung quilt to read a short note about it (traditional
   blocks only — original designs are marked as such).
5. Place **5 quilts** in a room to open the doorway to the next one.
6. There are **4 rooms** (Porch → Parlor → Kitchen → Attic) and **20**
   quilt blocks total — each block can only be used once across the
   whole game, so by the last room the tray is empty and every wall is full.
7. When finished, **take a screenshot** of the rooms and post it to the
   class discussion board as part of the folk-art exhibit.
8. **Reset my room** (top right) clears everything and starts over.

Everything is saved in that student's own browser (`localStorage`).
Nothing is shared live between students — sharing happens the low-tech
way, via screenshots on the discussion board, which fits how the course
already runs.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or a folder in an existing one) and
   push the entire contents of this folder — `index.html`, `css/`,
   `js/`, and `assets/` — to the repo root (or to `/docs` if you prefer).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a
   branch," pick your branch (e.g. `main`), and the folder (`/root` or
   `/docs`).
4. Save. GitHub will publish at
   `https://<your-username>.github.io/<repo-name>/`.
5. Share that link with students. Desktop browsers only for this version.

No build tools, no `npm install`, no server needed — it's just static files.

## Customizing the quilt blocks

All quilt data lives in one place: `js/quiltData.js`. Each entry looks like:

```js
{
  id: "log-cabin",           // must match assets/quilts/<id>.svg
  name: "Log Cabin",
  traditional: true,          // true = shows the info card on click
  origin: "A short 1-3 sentence note shown in the info card."
}
```

- To **edit the write-up** for a block, just change its `origin` text.
- To **add a new block**, add an SVG to `assets/quilts/` and a matching
  entry to `quiltData.js`. If you add more than 20 total, either raise
  the number of rooms in `js/rooms.js` or lower `QUILTS_TO_UNLOCK` so
  the math (`rooms × quilts-per-room`) still adds up to your total.
- To mark a block as **original/decorative only** (no info card), set
  `traditional: false` and `origin: null`.

## Customizing rooms

Room names, colors, and unlock threshold live in `js/rooms.js`:

- `ROOMS` — the 4 room definitions (label, wall color, floor color, blurb).
- `QUILTS_TO_UNLOCK` — how many quilts must be placed in a room before
  the next doorway opens (currently 5).

## File structure

```
index.html          entry point
css/style.css        all styling (warm calico palette, stitched borders)
js/quiltData.js       the 20 quilt block definitions
js/storage.js          localStorage save/load/reset
js/rooms.js             room definitions + unlock logic
js/movement.js            arrow-key grid movement + doorway detection
js/dragdrop.js              drag-and-drop wall placement
js/main.js                    ties it all together, renders the DOM
assets/quilts/*.svg            20 original quilt block graphics
```

## Notes on the artwork

The 20 quilt blocks are original digital illustrations created for this
game. Fourteen are structured after well-known traditional American
patchwork patterns (Log Cabin, Flying Geese, Bear's Paw, Double Wedding
Ring, Churn Dash, Bow Tie, Dresden Plate, Nine Patch, Shoo Fly, Ohio
Star, Rail Fence, Star of Bethlehem, Basket, and an improvisational-strip
style associated with rural Southern quilting communities); six are
original designs made just for this game and are labeled as such in the
info cards. None reproduce any specific copyrighted textile, quilt
photograph, or artist's work.

## Known limitations (v1)

- Desktop only — no touch/mobile drag-and-drop support yet.
- No cross-device sync — a student's room only exists in the browser
  they built it in. Screenshots are the sharing mechanism.
- No teacher-facing dashboard — this is intentionally student-side only.
