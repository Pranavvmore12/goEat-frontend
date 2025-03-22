const foodService = require("../services/food.service.js");
const restaurantService = require("../services/restaurant.service.js");
const userService = require("../services/user.service.js");

module.exports = {
  // customer

  searchFood: async (req, res) => {
    try {
      const { name } = req.query;
      const menuItem = await foodService.searchFood(name);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getMenuItemByRestaurantId: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { vegetarian, seasonal, nonveg, food_category } = req.query;
      const menuItems = await foodService.getRestaurantsFood(
        restaurantId,
        vegetarian,
        nonveg,
        seasonal,
        food_category
      );
      res.status(200).json(menuItems);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  // Admin controller

  async createItem(req, res) {
    try {
      const item = req.body;

      const user = req.user;
      const restaurant = await restaurantService.findRestaurantById(
        item.restaurantId
      );
      const menuItem = await foodService.createFood(item, restaurant);
      res.status(200).json(menuItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      
      await foodService.deleteFood(id);
      res.status(200).json({ message: "Menu item deleted" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  async getMenuItemByName(req, res) {
    try {
      const { name } = req.query;
      const menuItem = await foodService.searchFood(name);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateAvilibilityStatus(req, res) {
    try {
      const { id } = req.params;
      const menuItem = await foodService
        .updateAvailibilityStatus(id)
        ;
      res.status(200).json(menuItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
};
