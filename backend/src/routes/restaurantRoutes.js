const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticate = require('../midleware/authenticate');

router.get('/search', restaurantController.findRestaurantByName);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.findRestaurantById);
router.put('/:id/add-favorites',authenticate, restaurantController.addToFavorite);

module.exports = router;
