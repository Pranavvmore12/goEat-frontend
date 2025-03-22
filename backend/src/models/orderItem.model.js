const mongoose = require('mongoose');

// Define the OrderItem schema
const OrderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
  },
  quantity: Number,
  totalPrice: Number,
  ingredients: [String],
});

// Define and export the OrderItem model
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
module.exports = OrderItem;
