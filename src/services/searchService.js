const {Search} = require('../models');

const getSearchHistory = async (userId) => {
    const searches = await Search.findAll({
        where: {userId},
        order: [['createdAt', 'DESC']]
    });

    return searches;
}

module.exports = {
    getSearchHistory
}