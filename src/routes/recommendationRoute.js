const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authenticateJWT = require('../middleware/authenticateJWT');

/**
 * API for get recommendation from Flask Webservice API Backend
 */
router.get('/recommendations/me', authenticateJWT, recommendationController.getRecommendationsByAssessment);

//Bikin query parameter buat search + save search log + nerapin ?
module.exports = router;