const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticateJWT = require('../middleware/authenticateJWT');

/**
 * API for Food
 */

// text editor nya ngedit -> dia bakal manggil PreData -> kalau udah fix , pencet searc -> manggil FixData
//getFoodbyFoodRecipeNamePreData
//getFoodByFoodRecipeNameFixData -> parameter /food/:name -> controller : req.params.name -> dicocokin sama database food where : name
//getFoodByFoodPrimaryKeyId -> /food/:id -> controller : req.params.id