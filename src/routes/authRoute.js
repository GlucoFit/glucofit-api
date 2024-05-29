// src/routes/authRoute.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
