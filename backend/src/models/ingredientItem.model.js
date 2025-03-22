const mongoose = require('mongoose');

// Define the IngredientsItem schema
const IngredientsItemSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IngredientCategory',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  inStoke: {
    type: Boolean,
    default: true,
  },
});

// Define and export the IngredientsItem model
const IngredientsItem = mongoose.model('IngredientsItem', IngredientsItemSchema);
module.exports = IngredientsItem;
