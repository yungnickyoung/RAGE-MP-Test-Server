const { spawnPoints } = require('./configs/spawn_points.json');
const { vehicles } = require('./configs/vehicles.json');

// Maps all commands to descriptions. Used in the '/commands' command
const commandList = [];

/**
 * getpos
 *
 * Outputs the player's current position to their chatbox.
 */
commandList.push(['getpos', 'get your current position in the world']);
mp.events.addCommand('getpos', player => {
  player.outputChatBox(`${player.position}`);
});

/**
 * heal
 *
 * Heals the player's health and armor
 */
commandList.push(['heal', 'restore health and armor']);
mp.events.addCommand('heal', player => {
  player.health = 100;
  player.armor = 100;
  player.outputChatBox("You've been healed.");
});

/**
 * help [page]
 *
 * Lists all available commands and their descriptions to the player's chatbox.
 */
commandList.push(['help', 'list all available commands. Usage: /help [page]']);
mp.events.addCommand('help', (player, page) => {
  // Validate page number
  if (!page || isNaN(page)) {
    player.outputChatBox(`Usage: /help [page]`);
    return;
  }

  if (page < 1 || page > commandList.length / 4 + 1) {
    player.outputChatBox('Invalid page number.');
    return;
  }

  // Floor page number in case player enters a float
  page = Math.floor(page);

  player.outputChatBox(`--------------- Page ${page}/${(commandList.length - 1) / 4 + 1} ---------------`);

  for (let i = 0; i < 4; i++) {
    // If no more commands, exit the loop
    if (i + (page - 1) * 4 >= commandList.length) {
      return;
    }

    const command = commandList[i + (page - 1) * 4];
    player.outputChatBox(`${command[0]}: ${command[1]}`);
  }
});

/**
 * kill [playerID]
 *
 * Kills the player specified.
 */
commandList.push(['kill', 'kill the player specified']);
mp.events.addCommand('kill', (player, targetPlayerID) => {
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
 * me [message]
 *
 * Creates a label over the player's position with the entered fullText.
 * TODO:
 *  - Label moves with the player
 *  - Label expires after 5-10s
 *  - Allow for multiple consecutive /me's, with messages being stacked (must make max tho)
 */
commandList.push(['me', 'show yourself performing an action']);
mp.events.addCommand('me', (player, action) => {
  // Validate message
  if (!action) {
    player.outputChatBox('Usage: /me [action]');
    return;
  }

  // Create label at player's position
  mp.labels.new(`${action}`, player.position, { drawDistance: 40 });
});

/**
 * respawn [spawnID]
 *
 * Respawns the player.
 */
commandList.push(['respawn', 'respawn at specified spawn point']);
mp.events.addCommand('respawn', (player, spawnID) => {
  // Validate spawn point ID
  if (!spawnID) {
    player.outputChatBox('Usage: /respawn [spawnID]');
    return;
  }

  if (isNaN(spawnID) || spawnID < 0 || spawnID >= spawnPoints.length) {
    player.outputChatBox('Invalid spawn ID. Use /spawns to see a list of valid spawns.');
    return;
  }

  const spawnPoint = spawnPoints[spawnID];
  player.spawn(new mp.Vector3(spawnPoint.x, spawnPoint.y, spawnPoint.z));
});

/**
 * spawns
 *
 * List all spawn points.
 */
commandList.push(['spawns', 'list all spawn points']);
mp.events.addCommand('spawns', player => {
  // eslint-disable-next-line no-restricted-syntax
  for (const spawnPoint of spawnPoints) {
    player.outputChatBox(`[${spawnPoint.id}] ${spawnPoint.label} (${spawnPoint.x}, ${spawnPoint.y}, ${spawnPoint.z})`);
  }
});

/**
 * suicide
 *
 * Kills the player using the command.
 */
commandList.push(['suicide', 'kill yourself']);
mp.events.addCommand('suicide', player => {
  if (player.health === 0) {
    player.outputChatBox("You're already dead!");
  } else {
    player.health = 0;
  }
});

/**
 * tp [x] [y] [z]
 *
 * Teleports the player to the specified x-y-z coordinates.
 */
commandList.push(['tp', 'teleport to the given location in the world']);
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
 * vspawn [vehicle]
 *
 * Spawns the specified vehicle next to the player.
 */
commandList.push(['vspawn', 'spawn a vehicle']);
mp.events.addCommand('vspawn', (player, vehicle) => {
  // Validate vehicle name arg
  if (!vehicle) {
    player.outputChatBox('Usage: /vspawn [vehicle]');
    return;
  }

  vehicle = vehicle.toUpperCase();

  // Ensure vehicle exists in list of vehicles
  let found = false;
  for (const vType in vehicles) {
    for (const v of vehicles[vType]) {
      // eslint-disable-next-line eqeqeq
      if (v == vehicle) {
        found = true;
        break;
      }
    }
    if (found) break;
  }

  // Vehicle name not found --> return
  if (!found) {
    player.outputChatBox(`Vehicle '${vehicle}' not found.`);
    return;
  }

  const pos = player.position;
  pos.x += 2;

  mp.vehicles.new(mp.joaat(vehicle), pos);
});
