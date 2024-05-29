const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Local authentication routes
router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleCallback
);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
