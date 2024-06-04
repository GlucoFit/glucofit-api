const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Routes for authentication
 * { /register,  /login } for Local Strategy
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

/**
 * { /google } for Google Strategy
 */
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

router.post('/logout', authController.logout);

module.exports = router;
