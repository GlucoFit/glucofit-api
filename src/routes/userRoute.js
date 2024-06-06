const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

/**
 * Routes for Profile and Updates
 */
router.get('/users/me', authenticateJWT, userController.getUserMe);
router.put('/users/me/username', authenticateJWT, userController.updateUsername);
router.put('/users/me/email', authenticateJWT, userController.updateEmail);
router.put('/users/me/password', authenticateJWT, userController.updatePassword);  
router.delete('/users/me', authenticateJWT, userController.deleteUserMe);

module.exports = router;
