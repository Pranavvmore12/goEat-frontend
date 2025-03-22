const Address = require("../models/adress.model");
const Restaurant = require("../models/restaurant.model");

module.exports = {
  async createRestaurant(req, user) {
    console.log("req data ", req);
    try {
      const address = new Address({
        city: req.address.city,
        country: req.address.country,
        fullName: req.address.fullName,
        postalCode: req.address.postalCode,
        state: req.address.state,
        streetAddress: req.address.streetAddress,
      });

      const savedAddress = await address.save();

      const restaurant = new Restaurant({
        address: savedAddress,
        contactInformation: req.contactInformation,
        cuisineType: req.cuisineType,
        description: req.description,
        images: req.images,
        name: req.name,
        openingHours: req.openingHours,
        registrationDate: req.registrationDate,
        owner: user,
      })
        

      const savedRestaurant = await restaurant.save()
      return savedRestaurant;
    } catch (error) {
      throw new Error(`Failed to create restaurant: ${error.message}`);
    }
  },

  async updateRestaurant(restaurantId, updatedReq) {
    try {
      const restaurant = await Restaurant.findById(restaurantId);

      if (restaurant.cuisineType && updatedReq.cuisineType) {
        restaurant.cuisineType = updatedReq.cuisineType;
      }

      if (restaurant.description && updatedReq.description) {
        restaurant.description = updatedReq.description;
      }

      const updatedRestaurant = await restaurant.save();
      return updatedRestaurant;
    } catch (error) {
      throw new Error(`Failed to update restaurant: ${error.message}`);
    }
  },

  async findRestaurantById(restaurantId) {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error(`Restaurant with id ${restaurantId} not found`);
      }
      return restaurant;
    } catch (error) {
      throw new Error(`Error finding restaurant: ${error.message}`);
    }
  },

  async deleteRestaurant(restaurantId) {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error(`Restaurant with id ${restaurantId} not found`);
      }
      await restaurant.remove();
    } catch (error) {
      throw new Error(`Failed to delete restaurant: ${error.message}`);
    }
  },

  async getAllRestaurant() {
    try {
      const restaurants = await Restaurant.find().populate("address");
      return restaurants;
    } catch (error) {
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }
  },

  async getRestaurantsByUserId(userId) {
    try {
      const restaurant = await Restaurant.findOne({ owner: userId })
        .populate("owner")
        .populate("address");
      if (!restaurant) {
        throw new Error(`Restaurant for user with id ${userId} not found`);
      }
      return restaurant;
    } catch (error) {
      throw new Error(`Error finding restaurant by user id: ${error.message}`);
    }
  },

  async searchRestaurant(keyword) {
    try {
      const restaurants = await Restaurant.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });
      return restaurants;
    } catch (error) {
      throw new Error(`Failed to search restaurants: ${error.message}`);
    }
  },

  async addToFavorites(restaurantId, user) {
    try {
      console.log(user);
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error(`Restaurant with id ${restaurantId} not found`);
      }

      const dto = {
        _id: restaurant._id,
        title: restaurant.name,
        images: restaurant.images,
        description: restaurant.description,
      };

      const favorites = user.favorites || [];
      const index = favorites.findIndex(
        (favorite) => favorite._id == restaurantId
      );

      if (index !== -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(dto);
      }

      user.favorites = favorites;
      console.log(user);
      await user.save();

      return dto;
    } catch (error) {
      throw new Error(`Failed to add to favorites: ${error.message}`);
    }
  },

  async updateRestaurantStatus(id) {
    try {
      const restaurant = await Restaurant.findById(id)
        .populate("owner")
        .populate("address");
      console.log(restaurant);
      if (!restaurant) {
        throw new Error(`Restaurant with id ${id} not found`);
      }

      restaurant.open = !restaurant.open;
      const updatedRestaurant = await restaurant.save();
      return updatedRestaurant;
    } catch (error) {
      throw new Error(`Failed to update restaurant status: ${error.message}`);
    }
  },
};
