# STEP 1: Reset the "creative" status for all players.
tag @a remove can_be_creative

# STEP 2: "Mark" any player who is on a plot they own.
# Add a new line here for every plot in your world.
tag @a[tag=owner_plot_plot_-8_-17,x=-3,y=165,z=-17,dx=15,dy=115,dz=15] add can_be_creative

# (example for your next plot)
# tag @a[tag=owner_plot_plot_0_0,x=0,y=165,z=0,dx=30,dy=30,dz=30] add can_be_creative


# STEP 3: "Execute" the gamemodes based on that mark.
# This has no flicker, because a player can't be in both groups.
gamemode creative @a[tag=can_be_creative]
gamemode adventure @a[tag=!can_be_creative]
