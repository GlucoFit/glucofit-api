const {Search} = require('../models');

const getSearchHistory = async (userId) => {
    const searches = await Search.findAll({
        where: {userId},
        order: [['createdAt', 'DESC']]
    });

    return searches;
}

const deleteSearchHistoryById = async (searchId, userId) => {
    const search = await Search.findOne({
        where : {
            id: searchId,
            userId: userId
        }
    });
    if (!search) throw new Error('Search History not found')
    return search.destroy()
}

module.exports = {
    getSearchHistory,
    deleteSearchHistoryById
}