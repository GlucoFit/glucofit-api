const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const authenticateJWT = require('../middleware/authenticateJWT');
const upload = require('../middleware/uploadMiddleware');

/**
 * Routes for storing Image and Get Image Data
 */
router.get('/scan/id/:id(\\d+)', authenticateJWT, scanController.getSugarByDatasetId);
router.get('/scan/label/:label', authenticateJWT, scanController.getSugarByDatasetLabel);

router.post('/scan/upload', authenticateJWT, upload.single('image'), scanController.uploadImageAndSave);
router.get('/scan/history', authenticateJWT, scanController.getHistoryMe);
router.delete('/scan/history/:id(\\d+)', authenticateJWT, scanController.deleteScanById);

module.exports = router;