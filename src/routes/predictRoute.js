const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');
const authenticateJWT = require('../middleware/authenticateJWT');
// const upload = require('../middleware/uploadMiddleware');

/**
 * Prediction for CBF Assessment
 */

/**
 * Prediction for CBF Search History
 */
// router.post('/testPredict', authenticateJWT, predictController.testPredict);

module.exports = router