const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { pool } = require('../db/dbConnection.js'); // Import pool instead of db

const generateJwtToken = (userId) => {
  try {
    // Sign the JWT with user ID payload, using the SECRET from environment variables, set expiration to 5 hours, and specify the algorithm as HS256
    return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '5h', algorithm: 'HS256' });
  } catch (error) {
    // Handle error if signing fails
    console.error('Error generating JWT token:', error.message);
    return null;
  }
};

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Retrieve user record from the PostgreSQL database based on the provided email
    const query = 'SELECT * FROM clients WHERE username = $1';
    const result = await pool.query(query, [username]);

    // Check if user with provided email exists
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare hashed password from the database with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token with expiration time of 5 hours
    const token = generateJwtToken(user.id);

    // Set JWT token as a cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 5 });

    // Send user details in the response
    res.status(200).json({ user });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { login };
