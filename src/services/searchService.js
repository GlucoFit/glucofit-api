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

const deleteSearchHistoryByName = async (searchText, userId) => {
    try {
        // Find all entries with the specified searchText and userId
        const searchEntries = await Search.findAll({
            where: {
                searchText,
                userId
            }
        });

        // Check if any entries were found
        if (searchEntries.length === 0) {
            throw new Error('No Search History found with the given searchText and userId');
        }

        // Delete all found entries
        await Promise.all(searchEntries.map(entry => entry.destroy()));

        return { message: 'Search history deleted successfully' };
    } catch (error) {
        console.error('Error deleting search history:', error);
        throw new Error('Failed to delete search history');
    }
};

module.exports = {
    getSearchHistory,
    deleteSearchHistoryById,
    deleteSearchHistoryByName
}