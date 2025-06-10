const express = require('express');
const pool = require('./database/db');
const app = express();

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For form data

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));

// Routes
const staticRoutes = require('./routes/static');
app.use('/', staticRoutes);

// Database test route
app.get('/test-db', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS current_time');
    res.json({
      status: 'Database connected',
      time: rows[0].current_time,
      database: process.env.PGDATABASE
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({
      status: 'Database connection failed',
      error: err.message
    });
  }
});

// Enhanced cars route
app.get('/cars', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT inv_id, inv_make, inv_model, inv_year, inv_price 
      FROM inventory
      ORDER BY inv_year DESC
    `);
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch car inventory'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server startup
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${process.env.PGDATABASE || 'Not configured'}`);
});