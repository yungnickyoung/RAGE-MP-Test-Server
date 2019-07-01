const mongoose = require('mongoose');
const chalk = require('chalk');

const db = mongoose.connection;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

db.on('error', console.error.bind(console, 'DATABASE connection error: '));
db.on('connected', console.log.bind(console, 'DATABASE connected: '));
db.on('disconnected', console.log.bind(console, 'DATABASE disconnected: '));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(termination('Mongoose default connection is disconnected due to application termination'));
    process.exit(0);
  });
});

/**
 * Database
 *
 * Singleton class for database connection
 */
class Database {
  // Constructor is unused
  constructor() {}

  // getInstance method to create database instance if it does not already exist
  static getInstance() {
    if (this.instance == null) {
      mongoose.connect('mongodb://localhost/ragemp', { useNewUrlParser: true });
      db.once('open', () => {
        this.instance = new Database();
      });
    }

    return this.instance;
  }

  async GetDocuments(docs, collectionName) {
    this.instance = null;
  }
}

const playerSchema = new mongoose.Schema({
  playerName: String,
  vehicles: Array
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {
  Database,
  Player
};
