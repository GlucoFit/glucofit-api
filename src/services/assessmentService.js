const { /*User,*/ Assessment, Question, sequelize } = require('../models');
const user = require('../models/user');
require('dotenv').config();

//debug log
// console.log('User model:', User);
// console.log('Assessment model:', Assessment);
// console.log('Question model:', Question);

// if (!User) {
//     throw new Error('User model not found!');
// }

const createAssessment = async (answers, userId) => {
    const transaction = await sequelize.transaction();
    try {
        // Create the assessment
        const newAssessment = await Assessment.create({
            result: 0, // Adjust the result value as needed
            userId,
        }, { transaction });

        const assessmentId = newAssessment.id;

        // Create question entries for the assessment
        for (const [questionKey, answer] of Object.entries(answers)) {
            if (typeof answer === 'undefined') {
                throw new Error(`Answer for ${questionKey} is required`);
            }

            await Question.create({
                questionAnswer: answer,
                assessmentId,
                questionId: questionKey, // Use the question key as the question ID
            }, { transaction });
        }

        // Commit the transaction if all operations succeed
        await transaction.commit();
        return newAssessment;

    } catch (error) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        console.error('Transaction failed and was rolled back:', error);
        throw error;
    }
};


const checkAssessmentStatus = async (userId) => {
    const assessment = await Assessment.findOne({ where: { userId } });
    return !!assessment; // Return true if assessment exists, otherwise false
};

const getAssessmentResult = async (userId) => {
    const assessment = await Assessment.findOne({
        where: { userId },
        include: [
            {
                model: Question,
                as: 'questions',
                attributes: ['questionId', 'questionAnswer'],
            },
        ],
    });

    if (!assessment) {
        throw new Error('No assessment found for this user');
    }

    return assessment;
};

const deleteAssessment = async (userId) => {
    const transaction = await sequelize.transaction();
    try {   
        const assessment = await Assessment.findOne({ where: { userId } });
        if (!assessment) {
            throw new Error('No assessment found for this user');
        }

        // Delete related questions first
        await Question.destroy({ where: { assessmentId: assessment.id }, transaction });

        // Delete the assessment
        await Assessment.destroy({ where: { id: assessment.id }, transaction });

        // Commit the transaction
        await transaction.commit();
    } catch (error) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        throw error;
    }
};

// jangan lupa require('axios')

//disini bikin fungsi request post ke model RSI
// axios.post , link cloud runnya apa , {
//  input datanya (yang weight dkk)
// }

// nanti dapet hasil gulanya (result recommendation sugar intake) -> simpen ke user yang ngisi assessment ini


module.exports = {
    createAssessment,
    checkAssessmentStatus,
    getAssessmentResult,
    deleteAssessment,
};