const { Op } = require('sequelize');
const {Food, Search} = require('../models');

const getFoodByRecipeName = async (foodName, userId) => {
    const foods = await Food.findAll({
        where: {
            recipeName: {[Op.like]: `%${foodName}%`}
        },
        order: [['recipeName', 'ASC']]
    });

    const searchText = foodName;
    await Search.create({searchText, userId});
    
    return foods;
}

module.exports = {
    getFoodByRecipeName
}