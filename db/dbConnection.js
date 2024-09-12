const sqlite3 = require('sqlite3');

// Enable verbose mode
const sqlite3Verbose = sqlite3.verbose();

// Create a new SQLite database
const db = new sqlite3Verbose.Database('./database.db');

// Create tables
db.serialize(() => {
  // Create 'clients' table
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullnames TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
});

module.exports = { db };
