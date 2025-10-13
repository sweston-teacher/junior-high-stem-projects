# Gatekeeper Grove Build Guide (Teacher Walkthrough)

Use this guide to build the finished project before class and to know exactly which blocks to surface each session. It is written with 6th grade Creative Coding students in mind. Each section matches the rhythm from `lesson-flow.md` and calls out the precise MakeCode blocks plus the matching Python snippet located in `python-scaffolds.md`.

## Stage 0 – Project Setup (Prep & Session 1 We-Do)

**Goal:** Hero sprite exists, moves, and everything lives inside the default `on start` block.

1. Create a new Arcade project → immediately rename it to `Gatekeeper Grove` (click the title at the top).
2. Stay in **Blocks** view (not Python yet). Every new project already has an `on start` container. We will drop everything in there unless noted.
3. Open the **Sprites** toolbox category → drag `set mySprite to sprite of kind Player` into `on start`.
   - Click the variable dropdown on that block → `Rename variable…` → type `hero`.
   - Click the little grey square to open the sprite editor and draw a quick placeholder hero so you have something to demonstrate. Save the editor.
4. Open **Controller** → drag `move mySprite with buttons` into `on start` under the create block → change `mySprite` to `hero`.
5. Open **Scene** → drag `camera follow sprite` and drop it under the move block. Change `mySprite` to `hero` so the camera tracks the player once the game starts.
6. Still inside `on start`, you may add a story message later using **Game → show long text**. I recommend skipping it for now so the simulator restarts quickly while you teach; drop it back in during a polish day.

> **Minute Marks (Session 1):**
> - 0:03–0:08 Concept: Show sprite editor, color zones.
> - 0:10–0:18 We-Do: Drag blocks above, rename `hero`, discuss sprite kinds.

## Stage 1 – Tilemap Foundation (Finish During Prep, Demo in Session 3)

**Goal:** Build the world grid, set walls, and place the hero on a specific tile. This all still lives inside `on start`.

1. With `on start` still open, go to **Scene** → drag `set tilemap to` into `on start` (drop it _before_ the `tiles.place…` block we will add next).
2. Click the little square thumbnail on that block to open the tilemap editor.
   - Change the size to **16 x 16** using the +/- buttons on the right of the editor.
   - Pick a base tile (grass) from the palette on the left and paint the top half (rows 0–5) as your starting meadow.
   - Paint a horizontal band (row 6) using stone tiles to act as the gate barrier. Leave a two-tile gap in the middle; this will become the door.
   - Paint the bottom half (rows 7–15) with a different tile (forest/dirt) to show the locked region beyond the gate.
3. **Marking walls:** While still in the tile editor, click the hammer icon (top toolbar). It toggles wall mode; tiles you click glow red. Click along the outer border of the map and across the stone band to make them solid. Leave the two gap tiles unmarked so the door can eventually open.
4. Create a custom tile for the door trigger: click the `+` tile in the palette → draw a glowing pad. Place it in the gap where the door sits. While the hammer tool is active, click that pad to set it as a wall for now.
5. Click **Done** to exit the tile editor.
6. Back in the toolbox, still under **Scene**, drag `place mySprite on top of tile` into `on start` and set it right after the `set tilemap` block. Change `mySprite` to `hero`, then click the tile picker in the block and choose the tile location `(1,4)` (one tile from the left, four tiles down). This ensures your hero always spawns where you expect.

> Tip for class: Run the project (press **Play**) to show students the walls in action. Have the hero walk into the stone band; they’ll see it stop because the wall flag is on. Then explain how the door pad is currently blocked because it is marked as a wall too.

## Stage 2 – Add Supporting Characters (Optional Extension / Session 2 Studio)

Now that the world exists, you can extend the story by adding two different sprites. This whole stage is optional—save it for Day 2 or for fast finishers once the hero and tilemap feel solid.
- **Buddy** → friendly companion that gives hints.
- **Gatekeeper** → character who hands over the key later.

We also introduce our first event (`on overlap`) so dialogue can appear when the hero walks up to someone.

Follow these steps exactly:

1. **Add the buddy sprite (inside `on start`).**
   - From **Sprites → Create**, drag another `set mySprite to sprite of kind Player` block and drop it **inside `on start`** right under the hero spawn block.
   - Rename the variable to `buddy`.
   - Open the kind dropdown (it says `Player`) → choose **Other…** → **New Sprite Kind…**. Type `buddy` when it asks for a name. MakeCode will automatically create a new top-level block called something like `let SpriteKind.buddy = SpriteKind.create()`—leave it wherever it appears; that’s the “global variable” the events will use.
   - Draw the buddy sprite image (pet, friend, etc.).
   - Go to **Scene** → drag `place mySprite on top of tile`, drop it right below the buddy create block, switch `mySprite` to `buddy`, and pick a nearby tile (e.g., `(3,4)`).

2. **Add the gatekeeper sprite (inside `on start`).**
   - Duplicate the buddy create block (right-click → Duplicate) and drop the copy under the original.
   - Rename the variable to `gatekeeper`.
   - Open the kind dropdown → **Other…** → **New Sprite Kind…** → name it `gatekeeper`. MakeCode will add another global block for this kind; again, leave it alone.
   - Draw the gatekeeper sprite and place it near the door (use another `place on tile` block, e.g., tile `(7,4)`).

3. **Animate the hero (still inside `on start`).**
   - Open the **Animation** category → drag `run mySprite animation from frames` into `on start` below the hero create block.
   - Change `mySprite` to `hero`.
   - Click the `+` button inside the animation block to add two frames and edit each image (slight leg or arm change). Set the interval to `200 ms` and check **loop**.

4. **Add buddy dialogue with an overlap event (outside `on start`).**
   - From **Sprites → Overlaps**, drag `on sprite of kind Player overlaps otherSprite of kind Player` to the workspace (again, outside `on start`).
   - Change the first dropdown to `SpriteKind.Player` and the second to the new kind you created (likely `SpriteKind.buddy`). Whatever name MakeCode generated in the top-level block will appear here.
   - Inside this event, open **Game** → drop `show long text` with the message “We need to find the gate key!” and set the layout to `CENTER`. This fires every time the hero walks up to the buddy.

> Demo tip: After completing these steps yourself, press **Play**, walk the hero to the buddy, and show the class how the text appears. Then let students customize the art and the dialogue during Studio Quest time.

## Stage 3 – Locked Gate Logic (Session 4 Focus)

**Blocks Introduced:**
- Variable: `let hasKey = false` (Boolean).
- `scene.onOverlapTile(SpriteKind.Player, tile, function(sprite) {...})`.
- `music.baDing.play()` (feedback).
- `tiles.setTileAt` & `tiles.setWallAt` to open gate.

**Steps:**
1. Create global variable `hasKey = false` in `on start`.
2. Gate tile event (when player touches door tile without key):
   ```
   scene.onOverlapTile(SpriteKind.Player, assets.tile`gatePad`, function(sprite) {
       if (hasKey) {
           tiles.setTileAt(tiles.getTileLocation(4, 6), assets.tile`openPath`)
           tiles.setWallAt(tiles.getTileLocation(4, 6), false)
           music.magicWand.play()
       } else {
           story.printText("Locked. Talk to the gatekeeper.", 80, 60)
       }
   })
   ```
3. Gatekeeper overlap event sets `hasKey = true` and updates sprite image.
4. Optional: set gatekeeper to `say` text only once by checking `if (!hasKey)` before dialogue.

**Teacher Demo Flow:** show "without key" message first, then talk to gatekeeper, then retouch gate to open.

## Stage 4 – Companion Behavior & Polish (Session 5+)

**Blocks/Concepts:**
- `buddy.follow(hero, 50)` for AI movement.
- `info.setLife` or `statusbars` for optional quest trackers.
- `music.playMelody` to change soundtrack post-unlock.
- Additional animations or Python tweaks (speed change).

**Extension Ideas:**
- Add `story.showPlayerChoices` for alternate responses.
- Create hidden collectible using `tiles.placeOnRandomTile`.
- Use `pause(500)` inside dialogues to control timing.

## Tilemap Details (Coordinate Reference)

| Location | Purpose | Tile Suggestion |
|----------|---------|-----------------|
| `(1,4)` | Hero spawn | Grass |
| `(4,6)` | Door tile | Custom `gatePad` (initially wall=true) |
| `(2,6)` & `(6,6)` | Wall pillars | Stone |
| `(7,4)` | Gatekeeper position | Stone path |
| `(3,4)` | Buddy position | Grass |

## Assets Planning

Have placeholder art ready to expedite class demos:
- Hero: 16×16 character with two-frame walk cycle.
- Buddy: smaller sprite (pet or sibling).
- Gatekeeper: robed figure with two expressions.
- Door: top-down gate sprite.
- Tiles: grass, stone, forest, gate pad, secret tile.

## Pacing Reminders

- Session 1: Only Stage 0 blocks + start of Stage 1 (placing hero). Leave tilemap creative time for students.
- Session 2: Introduce `buddy` and hero animation; students iterate on companions.
- Session 3: Focus on tilemap craftsmanship; the gate logic can wait.
- Session 4: Drop the boolean/key logic and door opening sequence.
- Session 5: Polish + optional Python line edits.

Refer to `python-scaffolds.md` for copy-pastable Python each day. Update the Quest Board with the new stage-specific prompts (e.g., "Design your gatekeeper," "Invent a key backstory," "Animate the door unlocking").
