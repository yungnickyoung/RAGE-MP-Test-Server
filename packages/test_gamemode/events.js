const { spawnPoints } = require('./configs/spawn_points.json');

/**
 * playerChat
 *
 * Prints chat messages to everyone in the server.
 */
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

/**
 * playerDeath
 *
 * Respawns and restores a player's health and armor when they die.
 */
mp.events.add('playerDeath', player => {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
  player.health = 100;
  player.armor = 100;
});

/**
 * playerCommand
 *
 * Handles invalid commands.
 */
mp.events.add('playerCommand', (player, command) => {
  player.outputChatBox(`${command} is not a valid command. Use /help to find a list of commands.`);
});

/**
 * playerJoin
 *
 * Logs to the console when a player joins.
 * Welcomes the player and spawns them in.
 */
mp.events.add('playerJoin', player => {
  player.outputChatBox(`Welcome to the server, ${player.name}!`);
  // const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  const spawnPoint = spawnPoints[0];
  player.spawn(new mp.Vector3(spawnPoint.x, spawnPoint.y, spawnPoint.z));
  console.log(`${player.name} joined.`);
});

/**
 * playerQuit
 *
 * Logs to the console when a player disconnects.
 */
mp.events.add('playerQuit', player => {
  console.log(`${player.name} disconnected.`);
});

/**
 * playerEnterColshape
 *
 * Handles entering a colshape
 */
mp.events.add('playerEnterColshape', (player, colshape) => {
  if (colshape.getVariable('name') === 'colCarStorage') {
    player.outputChatBox('enter');
  }
});

/**
 * playerExitColshape
 *
 * Handles leaving a colshape
 */
mp.events.add('playerExitColshape', (player, colshape) => {
  if (colshape.getVariable('name') === 'colCarStorage') {
    player.outputChatBox('exit');
  }
});
