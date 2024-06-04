const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const authenticateJWT = require('../middleware/authenticateJWT');
const upload = require('../middleware/uploadMiddleware');

/**
 * Routes for Image Recognition needs on MD
 */
router.post('/scan/upload', authenticateJWT, upload.single('image'), scanController.uploadImageAndSave);
router.get('/scan/history', authenticateJWT, scanController.getHistoryMe);

module.exports = router;