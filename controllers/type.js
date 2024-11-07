
const { pool } = require('../db/dbConnection.js'); // Adjust path if necessary

async function getTypes(req, res) {
    try {
      const typeResult = await pool.query('SELECT * FROM assignmenttypes');
      if (typeResult.rows.length === 0) {
        return res.status(404).json({ error: 'Types not found' });
      }
      const types = typeResult.rows;
      res.status(200).json({ types});
    } catch (err) {
      console.error('Error retrieving ttpes:', err);
      res.status(500).json({ error: 'An error occurred while retrieving the order' });
    }
  }

  module.exports = {getTypes}