const { Op } = require('sequelize');
const {Food, Search, Favorite} = require('../models');

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

const setFavoriteFood = async (userId, foodId, isFavorite) => {
    console.log("call from service:" + userId + foodId + isFavorite)
    let favorite = await Favorite.findOne({
        where: {
            userId,
            foodId
        }
    });
    console.log(favorite)

    console.log("call from service:" + userId + foodId + isFavorite)
    if (favorite) {
        favorite.isFavorite = isFavorite;
        await favorite.save();
    } else {
        favorite = await Favorite.create({
            userId,
            foodId,
            isFavorite
        });
    }

    return favorite;
}

const getFavorites = async (userId) => {
    try {
      const favorites = await Favorite.findAll({
        where: { userId },
        include: [{
          model: Food,
          as: 'food', // Alias for the Food model
          attributes: ['id', 'recipeName', 'calories', 'sugarContent', 'dietLabels', 'ingredients', 'imageUrl', 'instructionUrl', 'servings'],
        }],
        order: [['createdAt', 'DESC']], // Optionally, you can order favorites by createdAt date
      });
  
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw new Error('Failed to fetch favorites');
    }
}

module.exports = {
    getFoodByRecipeName,
    setFavoriteFood,
    getFavorites
}