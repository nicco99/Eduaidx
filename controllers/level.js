const { pool } = require('../db/dbConnection.js'); // Adjust path if necessary

async function getAllLevels(req, res) {
    try {
      const levelResult = await pool.query('SELECT * FROM levels');
      if (levelResult.rows.length === 0) {
        return res.status(404).json({ error: 'Levels not found' });
      }
      const levels = levelResult.rows;
      res.status(200).json({ levels});
    } catch (err) {
      console.error('Error retrieving order:', err);
      res.status(500).json({ error: 'An error occurred while retrieving the order' });
    }
  }

  module.exports = {getAllLevels}