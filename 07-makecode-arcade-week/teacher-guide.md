### Teacher Setup Notes
**Description:** Materials, timing, and platform prep for MakeCode Arcade week
#### Content:
**Duration:** 5 class periods (45-55 minutes each)
**Platform:** https://arcade.makecode.com/
**Login Options:** No account needed; optional Microsoft or Google sign-in saves progress
**Hardware:** Laptops or desktops with keyboards; optional Xbox-style gamepads or arrow-key stickers
**Teacher Prep:**
- Create a demo project with a custom hero sprite, background, and score system
- Bookmark Arcade tutorials: `Sprite Basics`, `Chase the Pizza`, `Collect the Clovers`
- Print or share quick-reference sheet (controls + vocabulary)
- Test classroom network for MakeCode Arcade and GitHub access (blocked in some districts)
**Focus Skills:** Sprite design, event loops, variables, conditionals, computational creativity

---

### Week Overview at a Glance
**Description:** Daily themes, core skills, and deliverables
#### Content:
**Theme:** Build-and-share a custom mini-game starring original sprites
**Driving Question:** How can I tell a story or mood through moveable sprites and simple game rules?
**Essential Concepts:** • Coordinate plane basics • Input events • Sprite animation • Collision detection • Iterative design

**Day 1 — Welcome to Arcade:** Interface tour, block vs. Python views, create first hero sprite
**Day 2 — Movement + Animation:** Controller events, velocity, simple frame animation
**Day 3 — Interactions:** Projectiles, overlaps, scoring, and lives
**Day 4 — Level Design + Python Peek:** Tilemaps, backgrounds, and editing one behavior in Python
**Day 5 — Polish + Playtest:** Debugging checklist, peer feedback, gallery walk

**Deliverables:**
- Playable `.png` or shared URL of student game
- Screenshot or printed sprite sheet
- Reflection question (exit ticket) logged each day

---

### Vocabulary + Anchor Chart
**Description:** Shared definitions to reference all week
#### Content:
**Sprite:** A 2D image that can move or be controlled in the game world
**Tilemap:** A grid-based background used to build levels quickly
**Event:** A trigger that runs code when something happens (button pressed, overlap detected)
**Loop:** Code that repeats; `on game update` runs ~60 times per second
**Variable:** A named value (such as score or lives) you can change in code
**Python:** Another way to write the same Arcade logic using text instead of blocks

Create a visible anchor chart or slide with these terms. Add student-friendly sketches next to each definition.

---

### Day 1 — Arcade On-Ramp
**Description:** Get students comfortable with MakeCode Arcade and sprites
#### Content:
**Goal:** Students create a new project, add a custom hero sprite, and move it with controller input
**Warm-Up (5 min):** Quick poll — favorite video game characters; connect to sprites
**Mini-Lesson (15 min):**
- Teacher demo: open `New Project`, tour blocks categories, show `Sprites > Set mySprite to sprite of kind Player`
- Highlight `Sprite Editor`: talk pixels, symmetry, color picker, save as `hero`
- Show `Controller > move mySprite with buttons`
**Guided Practice (15 min):** Students copy hero sprite and movement blocks; add background color
**Studio Time (10 min):** Customize sprite art (accessories, color palette) and name project `SpriteQuest`
**Exit Ticket:** `What makes a sprite feel unique?` Collect via sticky note or Google Form
**Teacher Moves:** Circulate with questions: `What story does your sprite tell?` Show how to run game in full screen
**Resources:** MakeCode tutorial `Sprite Basics`; quick GIF of pixel art tips

---

### Day 2 — Movement + Animation
**Description:** Introduce velocity, boundaries, and basic animation frames
#### Content:
**Goal:** Students animate their hero and keep it on screen
**Warm-Up (5 min):** 30-second chair stretches + `Predict: what happens if velocity is too high?`
**Mini-Lesson (10 min):**
- Add `Controller > A button pressed` to trigger a `animation run image...` block
- Demonstrate two-frame walk cycle; stress small changes between frames
- Use `mySprite.setStayInScreen(true)` to prevent disappearing sprites
**Guided Practice (20 min):**
- Students duplicate frames, experiment with `game.onUpdateInterval(200, ...)`
- Introduce `controller.anyButton.isPressed()` for advanced students
**Studio Time (10-15 min):** Add secondary sprite (pet, power companion) with slower speed
**Exit Ticket:** Screenshot animation frame or record GIF using Windows Game Bar/Chromebook screenshot
**Teacher Moves:** Pair students to peer-review animation smoothness; offer extension: add `projectile` from hero sprite on button press
**Resources:** MakeCode `Chase the Pizza` tutorial for reference

---

### Day 3 — Collisions, Scoring, and Game Rules
**Description:** Build goal/obstacle systems and reinforce variable use
#### Content:
**Goal:** Students add collectibles or hazards and track score/lives
**Warm-Up (5 min):** `Two Truths and a Bug`: show two working overlap blocks and one broken; students identify the bug
**Mini-Lesson (15 min):**
- Add `sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, ...)`
- Create collectible sprite using `sprites.create` + `tiles.placeOnRandomTile`
- Introduce `info.changeScoreBy(1)` and `info.setLife(3)`
**Guided Practice (15 min):** Students program collectibles and hazards; use `sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy)` to subtract life
**Studio Time (10-15 min):**
- Playtest with neighbor; log one observation + one wish in reflection doc
- Optional challenge: spawn enemy projectiles every few seconds using `game.onUpdateInterval`
**Exit Ticket:** `Describe how your game keeps score or ends.`
**Teacher Moves:** Highlight `MakeCode > Share` for saving; remind to download `.png` for backups
**Resources:** Sample code cards, `Collect the Clovers` tutorial

---

### Day 4 — Level Design + Python Spotlight
**Description:** Use tilemaps, storyboarding, and introduce MakeCode Python editing
#### Content:
**Goal:** Students lay out a level, differentiate areas, and edit a single behavior block in Python
**Warm-Up (5 min):** Display three tilemaps; ask `Which level tells a better story? Why?`
**Mini-Lesson (20 min):**
- Tilemap basics: `Scene > set tilemap to` + `tiles.setWallAt`
- Show layering backgrounds, parallax suggestion, and placing sprites on tiles
- Switch to Python view: highlight generated code, point to sprite speed lines
- Edit one line: change `controller.move_sprite(mySprite, 100, 100)` to `controller.move_sprite(mySprite, 110, 100)` in Python then flip back to Blocks
**Guided Practice (15 min):** Students design tilemap and adjust speed or acceleration via Python edit
**Studio Time (10 min):** Add narrative text using `game.splash` or `story.printText`
**Exit Ticket:** `One thing I edited in Python was...`
**Teacher Moves:** Encourage screenshotting tilemap planner; support students who accidentally break code by using `Undo` or `Reset` (reload project)
**Resources:** Template storyboard handout; link to MakeCode tilemap tutorial; Python quick reference screenshot

---

### Day 5 — Polish, QA, and Showcase
**Description:** Iterate on feedback, fix bugs, and share completed games
#### Content:
**Goal:** Students finalize a playable game and articulate creative choices
**Warm-Up (5 min):** Gallery walk of teacher-curated inspiration; ask `What polish detail stands out?`
**Mini-Lesson (10 min):** Review debug checklist: controls responsive, score updates, lose condition works, instructions visible
**Studio Time (25-30 min):**
- Finish features, add music (`music.playMelody`) or win screen
- Record gameplay clip or take screenshots for documentation
- Prepare `Game One-Pager` (title, controls, goal, fun fact)
**Showcase (10 min):** Pair-share or project wall; optional `Arcade Game Jam` awards (Best Art, Most Replayable, Most Surprising Mechanic)
**Exit Ticket:** `What is one creative or technical skill you want to explore next?`
**Teacher Moves:** Print/share rubrics, manage time checkpoints (`15 min left`, `5 min left`)
**Resources:** Debug checklist slide, rubric template, MakeCode share instructions

---

### Differentiation + Support
**Description:** Strategies for varied skill levels and accommodations
#### Content:
**For Beginners:**
- Provide partially complete block stacks (movement ready, add art later)
- Allow pair programming with defined roles (driver/navigator)
- Offer sprite stencils with grid overlays

**For Advanced Learners:**
- Introduce `arrays` for enemy spawn points
- Challenge to add `status bars` for health
- Encourage experimenting in Python: create helper functions or tweak animation timing

**Accessibility:**
- Enable high-contrast mode in browser settings if needed
- Offer keyboard shortcut cheatsheets; map arrow keys if trackpads are difficult
- Provide printed pseudocode for students who benefit from planning before building

---

### Assessment + Reflection
**Description:** Checks for understanding and grading suggestions
#### Content:
**Daily Exit Tickets:** Capture in Google Form or notebook; review for reteach needs
**Midweek Check (Day 3):** Quick rubric — sprite movement, scoring working, one interaction present
**Final Product Criteria:**
- Custom player sprite with movement + animation
- At least one collectible or hazard interaction
- Score or life system that changes during play
- Instructions or story summary visible to player
**Student Reflection Prompt:** `How does your game express your idea, and what would you add with more time?`
**Extension:** Host a community playtest lunchtime; invite admin/teachers to vote on favorite games

---

### Teacher Toolbox Links
**Description:** Curated resources related to sprites and MakeCode Arcade
#### Content:
- MakeCode Arcade Curriculum Map: https://arcade.makecode.com/academics
- Pixel Art Palette Picker: https://lospec.com/palette-list
- Sprite Art Tips (8x8, 16x16): https://arcade.makecode.com/courses/csintro3/intro/sprites
- Sample Arcade Projects for Reference: `MakeCode Home > Gallery`
- Python Mode Guide: https://arcade.makecode.com/python

