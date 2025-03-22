const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  description: String,
  cuisineType: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contactInformation: {},
  openingHours: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  numRating: Number,
  images: [String], 
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  open: Boolean,
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
  }],
});

// Define and export the Restaurant model
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
