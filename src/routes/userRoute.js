const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

// router.post('/users', authenticateJWT, userController.createUser);
// router.get('/users', authenticateJWT, userController.getAllUsers);

router.get('/users/me', authenticateJWT, userController.getUserMe);
router.put('/users/me/username', authenticateJWT, userController.updateUsername);
router.put('/users/me/email', authenticateJWT, userController.updateEmail);
router.put('/users/me/password', authenticateJWT, userController.updatePassword);
router.delete('/users/me', authenticateJWT, userController.deleteUserMe);
// router.get('/users/:id', authenticateJWT, userController.getUserById);
// router.put('/users/:id', authenticateJWT, userController.updateUser);
// router.delete('/users/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
