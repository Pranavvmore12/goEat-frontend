const Category = require("../models/category.model");
const Restaurant = require("../models/restaurant.model");



module.exports = {
  async createCategory(name, userId) {
    try {
      // Find restaurant by user ID
      const restaurant = await Restaurant.findOne({ owner: userId });
      if (!restaurant) {
        throw new Error(`Restaurant not found for user ID ${userId}`);
      }

      // Create and save new category
      const createdCategory = new Category({ name, restaurant: restaurant._id });
      await createdCategory.save();
      return createdCategory;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  },

  async findCategoryByRestaurantId(restaurantId) {
    try {
      // Find categories by restaurant ID
      const categories = await Category.find({ restaurant: restaurantId });
      return categories;
    } catch (error) {
      throw new Error(`Failed to find categories for restaurant ID ${restaurantId}: ${error.message}`);
    }
  },

  async findCategoryById(categoryId) {
    try {
      // Find category by ID
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error(`Category not found with ID ${categoryId}`);
      }
      return category;
    } catch (error) {
      throw new Error(`Failed to find category with ID ${categoryId}: ${error.message}`);
    }
  }
};
