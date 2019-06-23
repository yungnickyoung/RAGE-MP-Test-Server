// Maps all commands to descriptions. Used in the '/commands' command
const commandList = {};

/**
 * getpos
 *
 * Outputs the player's current position to their chatbox
 */
commandList.getpos = 'Tells you your current position in the world';
mp.events.addCommand('getpos', (player, fullText) => {
  player.outputChatBox(`${player.position}`);
});

/**
 * tp [x] [y] [z]
 *
 * Teleports the player to the specified x-y-z coordinates.
 */
commandList.tp = 'Teleports you to the given location in the world';
mp.events.addCommand('tp', (player, fullText, x, y, z) => {
  // Validate args
  if (!x || !y || !z) {
    player.outputChatBox('Usage: ./tp [x] [y] [z]');
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
commandList.me = 'Used to show yourself performing an action';
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
