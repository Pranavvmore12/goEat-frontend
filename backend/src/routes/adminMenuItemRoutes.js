const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authenticate = require('../midleware/authenticate');

// Define router endpoints
router.post('/',authenticate, foodController.createItem);
router.delete('/:id',authenticate, foodController.deleteItem);
router.get('/search',authenticate, foodController.getMenuItemByName);
router.put('/:id',authenticate, foodController.updateAvilibilityStatus);

module.exports = router;
