const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const authenticate = require('../middleware/assessmentMiddleware');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/assessments', authenticateJWT, assessmentController.createAssessment);
router.get('/assessments/status', authenticateJWT, assessmentController.getAssessmentStatus);
router.get('/assessments/result', authenticateJWT, assessmentController.getAssessmentResult);

module.exports = router;
