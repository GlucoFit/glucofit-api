const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticateJWT = require('../middleware/authenticateJWT');

/**
 * API for Food
 */

//getFoodBy