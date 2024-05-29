const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to Parse JSON
app.use(express.json());

//Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Use Routes
app.use('/api/auth', authRoutes);

//Test Database Connection and Sync Models
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

//Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from Login Service!');
});

//Start the server if not running in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

//Export the app intance
module.exports = app;
