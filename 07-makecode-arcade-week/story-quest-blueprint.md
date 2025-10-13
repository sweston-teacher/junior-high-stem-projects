# Story Quest Blueprint — "Gatekeeper Grove"

**Grade Level:** 6th Grade Creative Coding.

**Project Vision:** Build a story-driven mini world where the player explores a grove, meets characters, and unlocks a gate by completing a simple quest. The experience focuses on sprite storytelling, interactions, and variables instead of pure scoring.

## Core Elements (Computer Science Vocabulary)

| Element | MakeCode Blocks | CS Concept | Notes |
|---------|-----------------|------------|-------|
| Hero sprite (`hero`) | `sprites.create`, `SpriteKind.Player`, `controller.moveSprite` | State & Input | Main controllable character. Add animation later. |
| Companion sprite (`buddy`) | `sprites.create`, `SpriteKind.Friend`, optional `follow` | AI / Behavior | Follows player or stays put with dialogue. |
| NPC (Gatekeeper) | `sprites.create`, `SpriteKind.Enemy` (renamed to `Gatekeeper` via custom kind) | Events | Triggers conversation and key exchange. |
| Key variable | `let hasKey = false` | Boolean state | Tracks whether player obtained key. |
| Door tile | Tilemap wall + overlay sprite `door` | Collision, Conditionals | Block passage until `hasKey` becomes true and door opens. |
| Tilemap world | `tiles.setTilemap`, custom palette | Level Design | Defines regions: village, gate, forest. |
| Dialogue | `story.sayText`, `game.splash`, `game.showLongText` | Sequencing | Story beats and instructions. |
| Trigger zone | Use `tiles.placeOnTile`, `scene.onOverlapTile` | Event-driven logic | Detects when player reaches door without key. |

## Story Beat Flow

1. **Arrival** — Hero spawns near tilemap entrance. Companion gives hint (tutorial text).
2. **Exploration** — Player can wander, noticing locked gate tile (wall blocked).
3. **Locked Door Check** — Overlap event shows message if gate touched without key.
4. **Meet Gatekeeper** — NPC conversation triggers `hasKey = true`, plays sound.
5. **Unlock Gate** — When player re-enters trigger zone with key, door sprite changes or disappears, allowing access to second area.
6. **Epilogue** — Optional: show splash text or new tilemap area with celebration sprite.

## Build Order (For Teacher Planning)

1. **Stage 0 – Template Setup**
   - Create new MakeCode Arcade project `Gatekeeper Grove`.
   - Rename `mySprite` → `hero`. Configure controller movement.
   - Add start `game.splash("Welcome to Gatekeeper Grove!")`.

2. **Stage 1 – Tilemap & Spawns**
   - Design 16x16 tilemap with three regions:
     - Starting meadow (grass tiles).
     - Locked gate corridor (wall tiles).
     - Beyond the gate (forest/clearing).
   - Place `hero`, `gatekeeper`, `buddy`, and gate door sprite using `tiles.placeOnTile` plus `scene.cameraFollowSprite(hero)` so the camera centers correctly.

3. **Stage 2 – Dialogue & Interaction Basics**
   - Add `story.printText` or `game.showLongText` when player overlaps with `buddy` to introduce quest.
   - Create `scene.onOverlapTile` for gate tile → show "Locked" message.

4. **Stage 3 – Key Logic**
   - Introduce boolean `let hasKey = false`.
   - Inside `sprites.onOverlap(hero, gatekeeper)` conversation, set `hasKey = true`, change gatekeeper image, play sound.

5. **Stage 4 – Unlock Mechanic**
   - Modify gate tile event to check `if (hasKey) { open gate } else { locked message }`.
   - Opening gate options:
     - Replace door tile with passable tile via `tiles.setTileAt` and `tiles.setWallAt`.
     - Destroy door sprite and show particle effect.

6. **Stage 5 – Polish & Extensions**
   - Add animation to hero and gatekeeper.
   - Add background music that changes after door unlocks.
   - Create secret collectible tile awarding an alternate ending.

> Completing these stages yourself produces the final demo you can lean on during class. Save snapshots after each stage; you can load them as backup during instruction.

## Daily Objectives vs. Build Stages

| Session | Objective | Build Stage Focus |
|---------|-----------|-------------------|
| Session 1 | Sprites & movement basics | Stage 0 + partial Stage 1 (hero placement) |
| Session 2 | Animation & companion | Stage 1 completion + Stage 2 intro |
| Session 3 | Tilemap and environment story | Stage 2 full implementation |
| Session 4 | Interactions & key logic | Stage 3 + Stage 4 |
| Session 5 | Polish, alternate paths | Stage 5 |

## Teacher Checklist Before Class

- [ ] Project saved to cloud or `.png` at each milestone.
- [ ] Screenshot of final tilemap for reference slide.
- [ ] Print prompt cards + quest board updates reflecting Gatekeeper story.
- [ ] Have `hasKey` boolean explanation ready (use physical key prop for demo).
- [ ] Prepare Python snippet for the day (see `python-scaffolds.md`).

Keep this blueprint close; it grounds the story, vocabulary, and tech pieces so you always know the next block to add.
