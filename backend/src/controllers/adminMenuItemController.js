const { FoodService } = require('../services/foodService');
const { UserService } = require('../services/userService');
const { RestaurantService } = require('../services/restaurantService');
const { FoodException, RestaurantException, UserException } = require('../exceptions');

// Create instances of required services
const foodService = new FoodService();
const userService = new UserService();
const restaurantService = new RestaurantService();

module.exports = {
    async createItem(req, res) {
        try {
            const { item } = req.body;
            const jwt = req.header('Authorization');
            const user = await userService.findUserProfileByJwt(jwt);
            const restaurant = await restaurantService.findRestaurantById(item.restaurantId);
            const menuItem = await foodService.createFood(item, restaurant);
            res.status(200).json(menuItem);
        } catch (error) {
            if (error instanceof FoodException || error instanceof UserException || error instanceof RestaurantException) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const jwt = req.header('Authorization');
            const user = await userService.findUserProfileByJwt(jwt);
            await foodService.deleteFood(id);
            res.status(200).json({ message: 'Menu item deleted' });
        } catch (error) {
            if (error instanceof FoodException || error instanceof UserException) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    async getMenuItemByName(req, res) {
        try {
            const { name } = req.query;
            const menuItem = await foodService.searchFood(name);
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateAvilibilityStatus(req, res) {
        try {
            const { id } = req.params;
            const menuItem = await foodService.updateAvilibilityStatus(id);
            res.status(200).json(menuItem);
        } catch (error) {
            if (error instanceof FoodException) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
};
