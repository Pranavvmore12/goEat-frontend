const express = require('express');
const router = express.Router();
const adminRestaurantController = require('../controllers/restaurantController');
const authenticate = require('../midleware/authenticate');

router.post('/',authenticate, adminRestaurantController.createRestaurant);
router.put('/:id',authenticate, adminRestaurantController.updateRestaurant);
router.delete('/:id',authenticate, adminRestaurantController.deleteRestaurantById);
router.put('/:id/status',authenticate, adminRestaurantController.updateRestaurantStatus);
router.get('/user', authenticate, adminRestaurantController.findRestaurantByUserId);

module.exports = router;
