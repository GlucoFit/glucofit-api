const assessmentService = require('../services/assessmentService');

const createAssessment = async (req, res) => {
  const userId = req.user.id;
  const answers = req.body;

  try {
      // Check if the user already has an assessment
      const hasAssessment = await assessmentService.checkAssessmentStatus(userId);
      if (hasAssessment) {
          return res.status(400).json({ error: 'User already has an assessment' });
      }

      // Create the assessment
      const newAssessment = await assessmentService.createAssessment(answers, userId);
      res.status(201).json(newAssessment);
  } catch (error) {
      if (error instanceof ValidationError) {
          return res.status(400).json({ error: error.message });
      } else {
          return res.status(500).json({ error: 'Internal server error' });
      }
  }
};


const getAssessmentStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const hasAssessment = await assessmentService.checkAssessmentStatus(userId);
    res.status(200).json({ hasAssessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssessmentResult = async (req, res) => {
  const userId = req.user.id;

  try {
    const assessmentResult = await assessmentService.getAssessmentResult(userId);
    res.status(200).json(assessmentResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssessment,
  getAssessmentStatus,
  getAssessmentResult,
};