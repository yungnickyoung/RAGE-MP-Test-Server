mp.events.add('playerChat', (player, message) => {
  // Don't handle if missing player object or message text
  if (!player || !message) {
    return;
  }

  mp.players.broadcast(`${player.name}: ${message}`);
});
