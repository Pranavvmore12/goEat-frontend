const express = require('express');
const router = express.Router();
const adminOrderController = require('../controllers/adminOrderController');

router.delete('/:orderId', adminOrderController.deleteOrder);
router.get('/restaurant/:restaurantId', adminOrderController.getAllRestaurantOrders);
router.put('/:orderId/:orderStatus', adminOrderController.updateOrder);

module.exports = router;
