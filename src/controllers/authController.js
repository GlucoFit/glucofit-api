const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    //Test Log
    console.log("controller:" + userName, email, password);
    const { user, token } = await authService.registerUser(userName, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Google Auth
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google Auth Callback
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    const token = await authService.generateAuthToken(user);
    res.json({ token });
  })(req, res, next);
};

// Logout
exports.logout = async (req, res) => {
  try {
    await authService.logout(req);
    res.status(200).json({ message: 'Successfully logged out.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
