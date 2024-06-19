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

const deleteSearchHistoryById = async (req, res) => {
    try {
        const searchId = req.params.id
        const userId = req.user.id

        await searchService.deleteSearchHistoryById(searchId, userId)
        res.status(200).json({message: "Success deleting search history"});
    } catch (error) {
        res.status(500).json({message: "Error fetching search history"});
    }
}

const deleteSearchHistoryByName = async (req, res) => {
    try {
        const searchName = req.params.name
        const userId = req.user.id

        console.log("test")
        await searchService.deleteSearchHistoryByName(searchName, userId)
        console.log("test2")
        res.status(200).json({message: "Success deleting search history"});
    } catch (error) {
        res.status(500).json({message: "Error fetching search history"});
    }
}

module.exports = {
    getSearchHistory,
    deleteSearchHistoryById,
    deleteSearchHistoryByName
}