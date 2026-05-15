const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: '🩸 LifeShare Backend is Running!',
    project: 'Smart Community Platform for Blood and Medicine Sharing',
    version: '1.0.0',
    status: 'Active'
  });
});

// Test database route
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      return res.json({
        status: '❌ Database connection failed!',
        error: err.message
      });
    }
    res.json({
      status: '✅ Database connected successfully!',
      database: 'lifeshare_db',
      result: results[0].result
    });
  });
});

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/blood',    require('./routes/blood'));
app.use('/api/medicine', require('./routes/medicine'));
app.use('/api/admin',    require('./routes/admin'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ LifeShare Server running on http://localhost:${PORT}`);
});