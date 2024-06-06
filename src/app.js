const express = require('express');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
//const predictRoutes = require('./routes/predictRoute');
const scanRoutes = require('./routes/scanRoute');
const assessmentRoutes = require('./routes/assessmentRoute');
const passport = require('passport');
const cors = require('cors');
require('../config/passport'); // Ensure your Passport strategies are configured
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors()); // This will enable CORS for all origins by default

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Initialize Passport without session support
app.use(passport.initialize());

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/predict', predictRoutes);
app.use('/api', scanRoutes);
app.use('/api', assessmentRoutes);

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
