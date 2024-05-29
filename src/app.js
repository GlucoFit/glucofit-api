const express = require('express');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const passport = require('passport');
require('../config/passport'); // Ensure your Passport strategies are configured
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Initialize Passport without session support
app.use(passport.initialize());

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server if not running in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app instance
module.exports = app;
