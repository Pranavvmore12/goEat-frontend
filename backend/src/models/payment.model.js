const mongoose = require('mongoose');

// Define the Payment schema
const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define and export the Payment model
const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
