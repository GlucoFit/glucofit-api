const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/search/history', authenticateJWT, searchController.getSearchHistory)
router.delete('/search/history/:id(\\d+)', authenticateJWT, searchController.deleteSearchHistoryById)

module.exports = router;