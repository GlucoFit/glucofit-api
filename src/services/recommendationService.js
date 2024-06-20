const {Food} = require('../models');
const assessmentService = require('./assessmentService');
const axios = require('axios');
require('dotenv').config();

const getRecommendationsByAssessment = async (userId) => {
    try {
        const assessment = await assessmentService.getAssessmentResult(userId);

        if (!assessment){
            throw new Error('No assessment found for this user');
        }

        const userFeatures = {
            diet_labels: assessment.questions.find(q => q.questionId == 'foodPreferences').questionAnswer,
            preferred_food: assessment.questions.find(q => q.questionId == 'foodLikes').questionAnswer
        }

        const recommendations = await predictWebServiceMRS(userFeatures);
        // console.log(typeof recommendations)

        const recommendedFoods = await Promise.all(recommendations.map(async (recommendation) => {

            // console.log(recommendation)
            const food = await Food.findOne({where: {recipeName: recommendation.recipe_name}});
            return {
                ...recommendation,
                food_details: food
            };
        }));
        return recommendedFoods;
    } catch (error) {
        console.error('Error fetching recommendations on assessment:', error);
        throw new Error('failed to fetch recommendations on assessment');   
    }
}

const predictWebServiceMRS = async (userFeatures) => {
    try {
        const response = await axios.post(process.env.WEBSERVICE_PREDICT_URL_PROD_MRS, {
            user_features: userFeatures
        });
        // Remove trailing newline characters if present
        const responseData = response.data.trim();

        // Replace NaN with null in the JSON string
        const fixedJSONString = responseData.replace(/NaN/g, 'null');

        // Parse the fixed JSON string into a JavaScript object
        const parsedData = JSON.parse(fixedJSONString);

        return parsedData;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw new Error('failed to fetch recommendations');
    }
}

module.exports = {
    getRecommendationsByAssessment,
}