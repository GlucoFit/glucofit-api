const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');
const authenticateJWT = require('../middleware/authenticateJWT');
// const upload = require('../middleware/uploadMiddleware');

// router.post('/upload', authenticateJWT, upload.single('image'), predictController.uploadImageAndPredict);
// router.post('/testPredict', authenticateJWT, predictController.testPredict);
// router.post(/image)
// router.get(/image/:id)

module.exports = router