const orderService = require("../services/order.service.js");
const userService = require("../services/user.service.js");

module.exports = {
    deleteOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            await orderService.cancelOrder(orderId);
            res.status(200).json({ message: `Order deleted with id ${orderId}` });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    getAllRestaurantOrders: async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { order_status } = req.query;
            const orders = await orderService.getOrdersOfRestaurant(restaurantId, order_status);
            res.status(200).json(orders);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { orderId, orderStatus } = req.params;
            const order = await orderService.updateOrder(orderId, orderStatus);
            res.status(200).json(order);
        } catch (error) {
            if (error instanceof Error ) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
};
