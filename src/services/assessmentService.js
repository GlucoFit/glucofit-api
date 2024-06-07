const { User, Assessment, Question, sequelize } = require('../models');
const user = require('../models/user');

//debug log
console.log('User model:', User);
console.log('Assessment model:', Assessment);
console.log('Question model:', Question);

if (!User) {
    throw new Error('User model not found!');
}

const createAssessment = async (answers, userId) => {
    const transaction = await sequelize.transaction();
    try {
        // Create the assessment
        const newAssessment = await Assessment.create({
            result: 0, // Adjust the result value as needed
            userId,
        }, { transaction });

        const assessmentId = newAssessment.id;

        // Loop through question numbers (q1 to q14)
        for (let i = 1; i <= 14; i++) {
            const questionKey = 'q' + i;
            const answer = answers[questionKey];

            if (typeof answer === 'undefined') {
                await transaction.rollback();
                throw new Error(`Answer for ${questionKey} is required`);
            }

            // Create question entry for the assessment
            await Question.create({
                questionAnswer: answer,
                assessmentId,
                questionId: i, // Use the iteration index as the question ID
            }, { transaction });
        }

        await transaction.commit();

        return newAssessment;
    } catch (error) {
        await transaction.rollback();
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