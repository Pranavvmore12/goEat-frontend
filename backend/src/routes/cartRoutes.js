const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../midleware/authenticate');

router.put('/add',authenticate, cartController.addItemToCart);
router.get('/total',authenticate, cartController.calculateCartTotals);
router.get('',authenticate, cartController.findUserCart);
router.put('/clear',authenticate, cartController.clearCart);

module.exports = router;
