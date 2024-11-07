const { Pool } = require('pg');
// qI2FNYLgrExyWbDu
// Configure the PostgreSQL client with the connection string
const pool = new Pool({
  connectionString: 'postgresql://postgres.pyhezywimviuipxqqdqh:qI2FNYLgrExyWbDu@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
});

// Function to create tables if they don't exist
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        fullnames TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone_number TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        order_title TEXT NOT NULL,
        order_description TEXT NOT NULL,
        document_upload TEXT,
        deadline_date DATE NOT NULL,
        date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );

      
      CREATE TABLE IF NOT EXISTS levels (
        id SERIAL PRIMARY KEY,
       name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS assignmenttypes (
        id SERIAL PRIMARY KEY,
       name TEXT NOT NULL
      );
    `);
    console.log('Clients and Orders tables created or already exist.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};


// Initialize the database
initializeDatabase();

module.exports = { pool };
