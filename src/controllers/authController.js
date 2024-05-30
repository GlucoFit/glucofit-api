// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const passport = require('passport');

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id, userName: newUser.userName, email: newUser.email }, process.env.JWT_SECRET);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ id: user.id, userName: user.userName, email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Google Auth
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google Auth Callback
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ token });
  })(req, res, next);
};