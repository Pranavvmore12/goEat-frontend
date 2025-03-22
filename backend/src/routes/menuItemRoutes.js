const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/search', foodController.searchFood);
router.get('/restaurant/:restaurantId', foodController.getMenuItemByRestaurantId);

module.exports = router;
