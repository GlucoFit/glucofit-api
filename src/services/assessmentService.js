const { /*User,*/ Assessment, Question, sequelize } = require('../models');
const user = require('../models/user');

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

module.exports = {
    createAssessment,
    checkAssessmentStatus,
    getAssessmentResult,
};