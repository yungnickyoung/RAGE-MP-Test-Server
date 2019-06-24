// Maps all commands to descriptions. Used in the '/commands' command
const commandList = {};

/**
 * getpos
 *
 * Outputs the player's current position to their chatbox
 */
commandList.getpos = 'Your current position in the world';
mp.events.addCommand('getpos', (player, fullText) => {
  player.outputChatBox(`${player.position}`);
});

/**
 * tp [x] [y] [z]
 *
 * Teleports the player to the specified x-y-z coordinates.
 */
commandList.tp = 'Teleport to the given location in the world';
mp.events.addCommand('tp', (player, fullText, x, y, z) => {
  // Validate args
  if (!x || !y || !z) {
    player.outputChatBox('Usage: /tp [x] [y] [z]');
    return;
  }

  // Ensure coordinates are numeric
  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    player.outputChatBox('Coordinates must be numbers!');
    return;
  }

  // Teleport player to new position
  player.position = new mp.Vector3(+x, +y, +z);
  player.outputChatBox(`You've been teleported to: ${player.position}`);
});

/**
 * me [message]
 *
 * Creates a label over the player's position with the entered fullText.
 * TODO:
 *  - Label moves with the player
 *  - Label expires after 5-10s
 *  - Allow for multiple consecutive /me's, with messages being stacked (must make max tho)
 */
commandList.me = 'Show yourself performing an action';
mp.events.addCommand('me', (player, fullText) => {
  // Validate message
  if (!fullText) {
    player.outputChatBox('Usage: /me [message]');
    return;
  }

  // Create label at player's position
  mp.labels.new(`${fullText}`, player.position, { drawDistance: 40 });
});

/**
 * kill [playerId]
 *
 * Kills the player specified.
 */
commandList.kill = 'Kill the player specified';
mp.events.addCommand('kill', (player, fullText, targetPlayerID) => {
  // Validate target player ID
  if (!targetPlayerID || isNaN(targetPlayerID)) {
    player.outputChatBox('Usage: /kill [playerID]');
    return;
  }

  // Disallow negative ID's
  if (targetPlayerID < 0) {
    player.outputChatBox('Invalid ID');
    return;
  }

  const targetPlayer = mp.players.at(targetPlayerID);

  if (targetPlayer) {
    targetPlayer.health = 0;
    player.outputChatBox(`Killed player '${targetPlayer.name}' (ID ${targetPlayer.id})`);
  } else {
    player.outputChatBox(`Player with ID ${targetPlayerID} not found`);
  }
});

/**
 * suicide
 *
 * Kills the player using the command.
 */
commandList.suicide = 'Kill yourself';
mp.events.addCommand('suicide', player => {
  if (player.health === 0) {
    player.outputChatBox("You're already dead!");
  } else {
    player.health = 0;
  }
});

/**
 * commands
 *
 * Lists all available commands and their descriptions to the player's chatbox.
 */
commandList.commands = 'Lists all available commands';
mp.events.addCommand('commands', (player, fullText) => {
  Object.keys(commandList).forEach(command => {
    player.outputChatBox(`${command}: ${commandList[command]}`);
  });
});
