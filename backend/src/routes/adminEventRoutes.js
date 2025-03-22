const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticate = require('../midleware/authenticate');

router.post('/restaurant/:restaurantId',authenticate, eventController.createEvents);
router.get('/restaurant/:restaurantId',authenticate, eventController.findRestaurantsEvents);
router.delete('/:id',authenticate, eventController.deleteEvents);

module.exports = router;
