const foodService = require('../services/foodService');

const getFoodByRecipeName = async (req, res) => {
    const foodName = req.params.name;

    try {
        const foods = await foodService.getFoodByRecipeName(foodName);
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get foods with matching or including the given string' });
    }
}

module.exports = {
    getFoodByRecipeName
}