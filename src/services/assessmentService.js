const { User, Assessment, Question, sequelize } = require('../models');

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
        const newAssessment = await Assessment.create({
            result: 0, // Adjust the result value as needed
            userId,
        }, { transaction });

        const assessmentId = newAssessment.id;

        const answerEntries = answers.map((answer, index) => ({
            questionAnswer: answer,
            assessmentId,
            questionId: index + 1, // Assuming questionId starts from 1 to 13
        }));

        await Question.bulkCreate(answerEntries, { transaction });

        await transaction.commit();

        return newAssessment;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

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