# MakeCode Arcade Story Studio — Minute-by-Minute Flow

Audience: 6th grade Creative Coding.

Each class period = 51 minutes. First 10 minutes stay reserved for typing.com. The remaining 41 minutes follow the same rhythm so routines stick and expectations stay clear.

## Daily Rhythm (41 minutes after typing.com)

| Minutes | Phase | Purpose | Teacher Moves | Student Experience |
|---------|-------|---------|---------------|--------------------|
| 0-3 | **Welcome & Anchor** | Reset attention after typing, connect to prior work | Stand at front, projector on. Prompt: "What did your hero sprite do yesterday?" Cold call 2-3 students. | Share quick wins, reopen project tab. |
| 3-10 | **Concept Mini-Lesson** | Introduce one focused idea or vocabulary term | Use LanSchool to share screen. Script: name the concept → why it matters → where to find blocks → model result. End with "Watch for the yellow highlight" to remind them to track your cursor. | Track demo, jot mental note of today’s objective. |
| 10-18 | **We-Do Build** | Code-along that everyone completes with you | Teacher narrates every click: "I’m opening Sprites → Set mySprite…" Pause often (LanSchool freeze screen, circulate). Check for understanding with thumbs. | Follow step-by-step, ask clarifying questions. |
| 18-33 | **Studio Quest Time** | Students iterate independently with infinite task list | Post the Quest Board on projector (see below). Confer with students needing help first. For fast finishers, point to "Level Up" quests. | Build, iterate, chase personal goals, log ideas on story worksheet. |
| 33-38 | **Spotlight & Share** | Keep community accountable | Call 2-3 students to cast to projector via LanSchool (or you drive from your station). Ask: "What new detail did you add?" | Celebrate progress, borrow ideas. |
| 38-41 | **Reflection & Reset** | Prepare for tomorrow, capture data | Prompt appears on board + in SchoolAI/Google Form: "Today my sprite/story…" + rate confidence. Dismiss by rows after reflection submitted and projects saved. | Write exit ticket, tidy workspace. |

## Quest Board (Infinite Tasks)
Post or keep on whiteboard. Students never “finish” — they shift to the next quest at their level. Color code: **Core**, **Bonus**, **Boss Mode**.

- **Core Quests** (everyone cycles through this loop)
  - Design: Create/redo a hero sprite with at least 3 color zones.
  - Setting: Use background tools or tilemap to match the story mood.
  - Partner: Add at least one supporting sprite (friend, rival, pet).
  - Motion: Give every sprite a way to move (controller, follow, patrol).
  - Interaction: Program one overlap or button event that changes the story.
- **Bonus Quests** (fast finishers start here)
  - Emotion swap: Animate two mood frames (happy ↔ worried).
  - Environment reaction: Trigger sound or visual effect when touching a tile.
  - Dialogue bubble: Use `game.splash` or `story.say` for on-screen text.
  - Secret prop: Hide a collectible that reveals backstory when found.
- **Boss Mode** (challenge tier)
  - Multi-scene arc: Build two tilemaps and let player transition between them.
  - Conditional choice: Add a boolean variable that tracks a decision.
  - Companion AI: Make a sprite follow the player but stop when they collide with a wall.
  - Python flourish: Switch to Python and tweak one variable or loop (document the change).

## Concept Progression (Story over Score)

1. **Sprite Identity (Session 1)** — focus on character, color, and naming.
2. **Emotion & Motion (Session 2)** — animation loops, move vs. velocity, stay-on-screen.
3. **Scene Building (Session 3)** — backgrounds, tilemaps, placing props.
4. **Character Interactions (Session 4)** — overlaps, projectiles as dialogue carriers, basic conditionals.
5. **Story Beats (Session 5)** — sequences of events, simple branching, polish details.
6. **Open Studio (Session 6+)** — apply quests to deepen narrative and interactions.

Each stage recycles the same rhythm: teacher concept → we-code → studio quests → reflection. If you need more than five sessions, keep looping quest tiers while introducing new concepts from the progression list.

## Minute-by-Minute Scripts

### Session 1: Sprite Identity & Movement (41 minutes post-typing)
- **0:00-0:03** — Welcome back, pose anchoring question, remind objectives.
- **0:03-0:08** — Concept talk: "What is a sprite?" Show gallery vs. custom editor. Call out pixel grid, symmetry, color count.
- **0:08-0:10** — Quick think-pair-share: "What story does your sprite tell?"
- **0:10-0:18** — We-Do: Create `myHero` sprite together, rename, store in SpriteKind.Player, add `controller.moveSprite`. Pause twice to let students catch up.
- **0:18-0:21** — Guided checkpoint: Freeze screens, ask checklist (Color balance? Named sprite?).
- **0:21-0:33** — Studio Quest: Core Quests 1-3. Provide prompt cards (see below). Walk the room starting with students who look stuck.
- **0:33-0:36** — Spotlight: Two students share heroes, name, and one design choice. Celebrate unique palettes.
- **0:36-0:41** — Reflection prompt: "My sprite’s personality is..." Collect responses; remind to save project.

### Session 2: Emotion & Animation
- **0:00-0:03** — Recall: "What did your sprite do yesterday?" Reopen project.
- **0:03-0:05** — Concept: Explain animation frames. Demonstrate flipping between two frames (LanSchool).
- **0:05-0:10** — Show `animation.runImage()` vs. `game.onUpdateInterval`. Highlight `setStayInScreen(true)`.
- **0:10-0:18** — We-Do: Build a two-frame walk cycle together. Students duplicate sprite, change 3-4 pixels.
- **0:18-0:20** — Micro-concept: Introduce `info.sayCountdown` as optional timer to pace actions.
- **0:20-0:33** — Studio Quest: Continue Core Quests + Bonus Emotion swap. Provide emotion prompt list (joy, surprise, fatigue, etc.).
- **0:33-0:37** — Spotlight: Play one student’s animation in slow-mo; ask class to notice details.
- **0:37-0:41** — Reflection: Rate your animation smoothness (1-5) + note one tweak needed.

### Session 3: Scene Building with Tilemaps
- **0:00-0:03** — Hook: Show screenshot of Minecraft build; connect to tilemaps as “2D building”.
- **0:03-0:08** — Concept: Tilemap editor tour, `tiles.setTilemap`, `tiles.placeOnTile`.
- **0:08-0:10** — Discuss story mood → color palette (forest, ship, moon base). Students choose a setting.
- **0:10-0:18** — We-Do: Build small 10x8 tilemap together, set walls, place hero at start.
- **0:18-0:21** — Quick tech tip: Show how to zoom, change tile size, undo misclicks.
- **0:21-0:33** — Studio Quest: Core Setting + Partner sprite, Bonus environment reactions.
- **0:33-0:36** — Spotlight: Show two different tilemaps, ask class to infer story.
- **0:36-0:41** — Reflection: "My world feels like ____ because ___". Save tilemap screenshot.

### Session 4: Character Interactions (Collisions over Points)
- **0:00-0:03** — Recap with real-life scenario (two characters bumping into each other).
- **0:03-0:07** — Concept: Overlap events as "scripted story beats". Show `sprites.onOverlap(Player, Enemy)` opening dialogue or changing sprite image.
- **0:07-0:10** — Optional: Show `projectile` as message (flying speech bubble).
- **0:10-0:18** — We-Do: Create rival sprite, place on tile, code overlap to run `story.say()` or change animation.
- **0:18-0:21** — Introduce `pause(ms)` for dramatic timing.
- **0:21-0:33** — Studio Quest: Interaction core, Bonus dialogue, Boss conditional choices.
- **0:33-0:37** — Spotlight: Students demo overlaps; class identifies trigger and effect.
- **0:37-0:41** — Reflection: "When ____ happens in my story, the game does ____." Gather next-step needs.

### Session 5+: Story Beats & Open Studio
Reuse rhythm; choose one new technique per session:
- Sound design (`music.playMelody` for motifs)
- Scene transitions (new tilemap, `game.splash` narrations)
- Python tweaks (`controller.move_sprite(myHero, 110, 100)`) reinforcing text-based edits.

## Prompt Cards & Supports
- **Sprite Prompts:** favorite snack guardian, classroom robot, weather hero, mood monster, sports mascot.
- **Setting Prompts:** rainy city roof, underground base, floating island, library maze, candy cavern.
- **Interaction Prompts:** high-five to unlock door, villain throws questions, pet follows trail, weather change when touching crystal.

Keep a basket of printed cards. Students who say “I’m done” draw the next card and iterate.

## Integrating Computer Concepts
- Session 1 vocab: sprite, pixel, coordinate.
- Session 2 vocab: animation frame, velocity, loop.
- Session 3 vocab: tilemap, layer, collision wall.
- Session 4 vocab: event, condition, sequence.
- Session 5 vocab: variable (story state), function (reusable action).
Add each term to your anchor chart and revisit during reflections.

## Timing Flexibility
If a mini-lesson runs long, shorten Studio Quest but keep Reflection. If students need more practice, loop back: "Pause, watch my screen" and redo We-Do steps. The quest board ensures fast finishers always have meaningful extensions, keeping class momentum even when you spend several minutes with one student.
