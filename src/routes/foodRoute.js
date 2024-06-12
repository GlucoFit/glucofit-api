const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticateJWT = require('../middleware/authenticateJWT');

/**
 * API for Food
 */
router.get('/food/:name', authenticateJWT, foodController.getFoodByRecipeName);
// router.get('/food/:id(\\d+)', authenticateJWT, foodController.getFoodByFoodId);

module.exports = router;