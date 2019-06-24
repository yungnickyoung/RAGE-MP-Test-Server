const { spawnPoints } = require('./configs/spawn_points.json');

mp.events.add('playerChat', (player, message) => {
  // Don't handle if missing player object or message text
  if (!player || !message) {
    return;
  }

  const MAX_MESSAGE_LENGTH = 256;

  // Prevent long messages
  if (message.length > MAX_MESSAGE_LENGTH) {
    player.outputChatBox(`Message is too long! [${message.length}/${MAX_MESSAGE_LENGTH}]`);
    return;
  }

  mp.players.broadcast(`${player.name}: ${message}`);
});

mp.events.add('playerDeath', player => {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
  player.health = 100;
  player.armor = 100;
});
