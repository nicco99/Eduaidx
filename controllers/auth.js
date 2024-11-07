const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { pool } = require('../db/dbConnection.js'); // Adjust path if necessary

const generateJwtToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.SECRET, { expiresIn: '2h' });
}

async function create(req, res) {
  const query = `
    INSERT INTO clients (username, fullnames, phone_number, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  
  const { username, fullnames, phone_number, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

  const values = [username, fullnames, phone_number, email, hashedPassword];

  try {
    // Execute the query
    const result = await pool.query(query, values);
    
    // Get the ID of the newly inserted client
    const userId = result.rows[0].id;

    // Generate JWT token
    const token = generateJwtToken(userId);
    
    // Send token as a cookie and respond with user ID
    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 2 });
    res.status(201).json({ user: userId });
  } catch (err) {
    let errorMessage;

    if (err.message.includes("duplicate key value violates unique constraint")) {
      if (err.message.includes("clients_phone_number_key")) {
        errorMessage = "Phone number already exists";
      } else if (err.message.includes("clients_email_key")) {
        errorMessage = "Email already exists";
      } else if (err.message.includes("clients_username_key")) {
        errorMessage = "Username already exists";
      }
    } else {
      errorMessage = "An unexpected error occurred";
    }

    // Log the error for debugging purposes
    console.error("Database error:", err);

    return res.status(500).json({ error: errorMessage });
  }
}
const read = async (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM clients WHERE id = $1`;

    pool.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.rows.length === 0) {
          resolve(null); // Or reject with a specific error if you prefer
        } else {
          resolve(result.rows[0]);
        }
      }
    });
  });
};

module.exports = { create ,read};
