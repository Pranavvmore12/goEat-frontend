const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../midleware/authenticate');


router.put('/update', cartController.updateCartItemQuantity);
router.delete('/:id/remove',authenticate, cartController.removeItemFromCart);

module.exports = router;
