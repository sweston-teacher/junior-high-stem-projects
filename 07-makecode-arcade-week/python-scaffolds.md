# Python Scaffolds for Gatekeeper Grove

Copy snippets into MakeCode Arcade’s Python tab when you need a backup or want to seed the day’s blocks. Each stage builds on the previous one; keep only one version active at a time.

## Stage 0 – Hero Setup

```python
game.splash("Welcome to Gatekeeper Grove")
hero = sprites.create(img(""
    . . f f f . . . f f f . .
    . f 2 2 2 f . f 2 2 2 f .
    f 2 2 2 2 2 f 2 2 2 2 2 f
    f 2 2 2 2 2 f 2 2 2 2 2 f
    f 2 2 2 2 2 f 2 2 2 2 2 f
    . f 2 f 2 f . f 2 f 2 f .
    . . f f f . . . f f f . .
    . . . f . . . . . f . . .
    . . f 2 f . . . f 2 f . .
    . f 2 2 2 f . f 2 2 2 f .
    f 2 2 2 2 2 f 2 2 2 2 2 f
    . . . f f . . . f f . . .
    . . f 2 2 f . f 2 2 f . .
    . . f f f f f f f f f . .
    . . f . . . . . . . f . .
    . . . . . . . . . . . . .
""), SpriteKind.player)
controller.move_sprite(hero)
scene.camera_follow_sprite(hero)
```

Add your own art later; this placeholder keeps the code valid.

## Stage 1 – Tilemap + Spawn

```python
# keep Stage 0 code above

scene.set_background_color(7)
tiles.set_tilemap(tilemap("level1"))
tiles.place_on_tile(hero, tiles.get_tile_location(1, 4))
```

Create `tilemap("level1")` in the block editor first, then switch back to Python so the identifier exists.

## Stage 2 – Companions & Dialogue

```python
# after Stage 1

SpriteKind.friend = SpriteKind.create()
SpriteKind.gatekeeper = SpriteKind.create()

buddy = sprites.create(img(""
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . f f f f f . . . . . .
    . . . . f 5 5 5 5 5 f . . . . .
    . . . f 5 5 5 5 5 5 5 f . . . .
    . . . f 5 5 5 5 5 5 5 f . . . .
    . . . f 5 5 5 5 5 5 5 f . . . .
    . . . . f 5 5 5 5 5 f . . . . .
    . . . . . f 5 5 5 f . . . . . .
    . . . . . . f f f . . . . . . .
    . . . . . . . f . . . . . . . .
    . . . . . . . . . . . . . . . .
""), SpriteKind.friend)
tiles.place_on_tile(buddy, tiles.get_tile_location(3, 4))

gatekeeper = sprites.create(img(""
    . . . . . c c c c . . . . . . .
    . . . . c 3 3 3 3 c . . . . . .
    . . . c 3 3 3 3 3 3 c . . . . .
    . . . c 3 3 3 3 3 3 c . . . . .
    . . . c 3 3 3 3 3 3 c . . . . .
    . . . . c 3 3 3 3 c . . . . . .
    . . . . . c 3 3 c . . . . . . .
    . . . . . . c c . . . . . . . .
""), SpriteKind.gatekeeper)
tiles.place_on_tile(gatekeeper, tiles.get_tile_location(7, 4))

animation.run_image_animation(hero, [img("""<add frame 1>"""), img("""<add frame 2>""")], 200, True)

@sprites.on_overlap(SpriteKind.player, SpriteKind.friend)
def on_buddy_chat(hero_sprite, buddy_sprite):
    story.print_text("We need to find the gate key!", 80, 60)
```

Replace `<add frame 1>` with hero animation frames from the blocks editor.

## Stage 3 – Key Variable & Locked Gate

```python
# Stage 2 code above
hasKey = False

def open_gate():
    tiles.set_tile_at(tiles.get_tile_location(4, 6), assets.tile("openPath"))
    tiles.set_wall_at(tiles.get_tile_location(4, 6), False)
    music.magic_wand.play()

# Replace the earlier on_gate_touch handler with this version once celebrate() exists.
@scene.on_overlap_tile(SpriteKind.player, assets.tile("gatePad"))
def on_gate_touch(sprite):
    global hasKey
    if hasKey:
        open_gate()
    else:
        story.print_text("The gate is locked. Talk to the gatekeeper.", 80, 60)

@sprites.on_overlap(SpriteKind.player, SpriteKind.gatekeeper)
def on_gatekeeper_talk(hero_sprite, keeper_sprite):
    global hasKey
    if not hasKey:
        story.print_text("Take this key and keep the grove safe!", 80, 60)
        hasKey = True
        keeper_sprite.set_image(img("""<gatekeeper happy>"""))
        music.ba_ding.play()
```

Ensure `assets.tile("gatePad")` and `assets.tile("openPath")` exist via the tilemap editor.

## Stage 4 – Companion Follow & Scene Change

```python
# continue from Stage 3

buddy.follow(hero, 45)

def celebrate():
    game.show_long_text("You restored Gatekeeper Grove!", DialogLayout.FULL)
    music.play_melody("C5 B A G A B C5 -", 120)

@scene.on_overlap_tile(SpriteKind.player, assets.tile("gatePad"))
def on_gate_touch(sprite):
    global hasKey
    if hasKey:
        open_gate()
        celebrate()
    else:
        story.print_text("The gate is locked. Talk to the gatekeeper.", 80, 60)
```

Feel free to expand `celebrate()` with additional events or state.

---

**Usage Notes:**
- Run the code in Blocks mode first to avoid Python syntax errors from unfinished art strings.
- When copying sections for students, trim the art arrays so they insert their own sprites.
- Encourage students to identify each CS concept before pasting (e.g., "We are toggling a boolean state to control the gate").
