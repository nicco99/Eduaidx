const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {db} = require('../db/dbConnection.js'); // Adjust path if necessary

const generateJwtToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.SECRET, { expiresIn: '2h' });
}

async function create(req, res) {
  const q = `INSERT INTO clients (username, fullnames, phone_number, email, password) VALUES (?, ?, ?, ?, ?)`;
  const {
    username,
    fullnames,
    phone_number,
    email,
    password
  } = req.body;
 
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

  const values = [username, fullnames, phone_number, email, hashedPassword];
db.run(q, values, function (err) {
  if (err) {
    let errorMessage;

    if (err.message.includes("UNIQUE constraint failed: clients.phone_number")) {
      errorMessage = "Phone number already exists";
    } else if (err.message.includes("UNIQUE constraint failed: clients.email")) {
      errorMessage = "Email already exists";
    } else if (err.message.includes("UNIQUE constraint failed: clients.username")) {
      errorMessage = "Username already exists";
    } else {
      errorMessage = "An unexpected error occurred";
    }

    // Log the error for debugging purposes
    console.error("Database error:", err);

    return res.status(500).json({ error: errorMessage });
  }

  // Successful insert
  const token = generateJwtToken(this.lastID); // `this.lastID` is the auto-incremented ID of the last inserted row
  res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 60 }); 
  res.status(201).json({ user: this.lastID });
});

}

module.exports = { create };
