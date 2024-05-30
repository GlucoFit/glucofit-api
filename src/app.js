const express = require('express');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const passport = require('passport');
const { Connector } = require("@google-cloud/cloud-sql-connector"); // Import the Cloud SQL Connector
require('../config/passport'); // Ensure your Passport strategies are configured
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON
app.use(express.json());

// Initialize Passport without session support
app.use(passport.initialize());

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Create a Cloud SQL connector instance
const connector = new Connector();

// Before connecting to the database, fetch Cloud SQL connection options dynamically
sequelize.beforeConnect(async (config) => {
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.DB_CONNECTION,
    ipType: "PUBLIC",
  });
  config = { ...config, ...clientOpts };
});

// Test database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Export the app instance
module.exports = app;
