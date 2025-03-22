const restaurantService = require("../services/restaurant.service.js");
const userService = require("../services/user.service.js");


module.exports = {
  createRestaurant: async (req, res) => {
    try {
      const user = req.user;
      const restaurant = await restaurantService.createRestaurant(req.body, user);
      res.status(200).json(restaurant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  updateRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const { req, jwt } = req.body;
      const user = await userService.findUserProfileByJwt(jwt);
      const restaurant = await restaurantService.updateRestaurant(id, req);
      res.status(200).json(restaurant);
    } catch (error) {
      if (
        error instanceof Error ||
        error instanceof Error
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  deleteRestaurantById: async (req, res) => {
    try {
      const { id } = req.params;
      const { jwt } = req.body;
      const user = await userService.findUserProfileByJwt(jwt);
      await restaurantService.deleteRestaurant(id);
      res
        .status(200)
        .json({
          message: "Restaurant Deleted with id Successfully",
          success: true,
        });
    } catch (error) {
      if (
        error instanceof Error
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  updateRestaurantStatus: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('restaurant id',id)
      const restaurant = await restaurantService.updateRestaurantStatus(id.toString());

      console.log('restaurant id',id)
      res.status(200).json(restaurant);
    } catch (error) {
      if (
        error instanceof Error
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  findRestaurantByUserId: async (req, res) => {
    try {
      const user = req.user
      const restaurant = await restaurantService.getRestaurantsByUserId(
        user._id
      );
      res.status(200).json(restaurant);
    } catch (error) {
      if (
        error instanceof Error
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  findRestaurantByName: async (req, res) => {
    try {
        const { keyword } = req.query;
        const restaurants = await restaurantService.searchRestaurant(keyword);
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
},

getAllRestaurants: async (req, res) => {
    try {
        const restaurants = await restaurantService.getAllRestaurant();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
},

findRestaurantById: async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantService.findRestaurantById(id);
        res.status(200).json(restaurant);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
},

addToFavorite: async (req, res) => {
    try {
        
        const { id } = req.params;
        const user = req.user
        const restaurant = await restaurantService.addToFavorites(id, user);
        res.status(200).json(restaurant);
    } catch (error) {
        if (error instanceof Error ) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
};
