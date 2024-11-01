const { pool } = require('../db/dbConnection.js'); // Adjust path if necessary
const { read } = require('./auth'); // Import the read function for clients

// Create an order
async function createOrder(req, res) {
    const {userId, orderTitle, orderPrice, orderDescription, deadlineDate } = req.body;
    const documentUpload = req.file ? req.file.path : null; // Get file path if uploaded
  console.log(userId)
    const query = `
      INSERT INTO orders (client_id, order_title, order_description, document_upload, deadline_date, date_posted, status, price)
      VALUES ($1, $2, $3, $4, $5, NOW(), 'pending', $6)
      RETURNING id;
    `;
  
    const values = [userId, orderTitle, orderDescription, documentUpload, deadlineDate, orderPrice];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json({ orderId: result.rows[0].id });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "An error occurred while creating the order" });
    }
  }
  

// Get an order by ID
async function getOrder(req, res) {
  const orderId = req.params.id;
  
  try {
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const clientResult = await read(order.client_id); // Fetch client details using read function

    res.status(200).json({ order, client: clientResult });
  } catch (err) {
    console.error('Error retrieving order:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the order' });
  }
}

async function getMyOrders(req,res) {
  const {userId} = req.params;
  try {
    const orderResult = await pool.query('SELECT * FROM orders WHERE client_id = $1', [userId]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const order = orderResult.rows;
    res.status(200).json({ order});
  } catch (err) {
    console.error('Error retrieving order:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the order' });
  }
}

module.exports = { createOrder, getOrder ,getMyOrders};
