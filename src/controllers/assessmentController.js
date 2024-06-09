const assessmentService = require('../services/assessmentService');

const createAssessment = async (req, res) => {
  const userId = req.user.id;
  const answers = req.body;
  
  const requiredFields = [
    'name',
    'dob',
    'gender',
    'weight',
    'height',
    'historyOfDiabetes',
    'familyHistoryOfDiabetes',
    'sweetConsumption',
    'sugarIntake',
    'exerciseFrequency',
    'foodPreferences',
    'foodAllergies',
    'foodLikes',
    'foodDislikes'
  ];
  

  // Validate the request body
  for (const field of requiredFields) {
    if (!answers.hasOwnProperty(field)) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

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

const deleteAssessment = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!process.env.NODE_ENV === 'development'){
      throw new Error('Not on development environment, disabling this feature');
    }
    // Delete the assessment
    await assessmentService.deleteAssessment(userId);
    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAssessment,
  getAssessmentStatus,
  getAssessmentResult,
  deleteAssessment
};