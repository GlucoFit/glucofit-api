const recommendationService = require('../services/recommendationService');

const getRecommendationsByAssessment = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await recommendationService.getRecommendationsByAssessment(userId);
        res.json(result);
    } catch (error) {
        console.error('Error getting assessment with recommendations:', error);
        res.status(500).json({ error: 'Failed to get assessment with recommendations' });
    }
}

module.exports = {
    getRecommendationsByAssessment
}