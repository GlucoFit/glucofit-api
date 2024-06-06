const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const authenticate = require('../middleware/assessmentMiddleware');

const router = express.Router();

router.post('/assessments', authenticate, assessmentController.createAssessment);
router.get('/assessments/status', authenticate, assessmentController.getAssessmentStatus);
router.get('/assessments/result', authenticate, assessmentController.getAssessmentResult);

module.exports = router;
