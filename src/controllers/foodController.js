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

const setFavoriteFood = async (req, res) => {
    const { foodId, isFavorite } = req.body;
    const userId = req.user.id;
    console.log(req.body)
    try {
        const favorite = await foodService.setFavoriteFood(userId, foodId, isFavorite);
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ error: 'Failed to set favorite food' });
    }
}

const getFavorites = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const favorites = await foodService.getFavorites(userId);
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Controller Error:', error.message);
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getFoodByRecipeName,
    setFavoriteFood,
    getFavorites
}