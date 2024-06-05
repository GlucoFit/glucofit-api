const assessmentService = require('../services/assessmentService');

const createAssessment = async (req, res) => {
  const { question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13 } = req.body;
  const userId = req.user.id;

  const answers = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13];

  if (answers.length !== 13) {
    return res.status(400).json({ error: 'Exactly 13 answers are required' });
  }

  try {
    const newAssessment = await assessmentService.createAssessment(answers, userId);
    res.status(201).json(newAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
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