const foodService = require('../services/foodService');

const getFoodByRecipeName = async (req, res) => {
    const foodName = req.params.name;
    const userId = req.user.id;
    
    try {
        const foods = await foodService.getFoodByRecipeName(foodName, userId);
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get foods with matching or including the given string' });
    }
}

module.exports = {
    getFoodByRecipeName
}