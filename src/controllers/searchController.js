const food = require('../models/food');
const searchService = require('../services/searchService');

const getSearchHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const searches = await searchService.getSearchHistory(userId);
        res.status(200).json(searches);
    } catch (error) {
        res.status(500).json({message: "Error fetching search history"});
    }
}

module.exports = {
    getSearchHistory
}