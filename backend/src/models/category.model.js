const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
  name: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
});

// Define and export the Category model
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
