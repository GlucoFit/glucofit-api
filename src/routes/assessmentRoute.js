const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const router = express.Router();

const authenticate = require('../middleware/assessmentMiddleware');

router.post('/assessments', authenticate, assessmentController.createAssessment);
router.get('/assessments/status', authenticate, assessmentController.getAssessmentStatus);
router.get('/assessments/result', authenticate, assessmentController.getAssessmentResult);

module.exports = router;
