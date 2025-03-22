const mongoose = require('mongoose');

// Define the Coupon schema
const CouponSchema = new mongoose.Schema({
  code: String,
  discountAmount: Number,
  validityPeriod: {
    type: Date,
    default: Date.now,
  },
  termsAndConditions: String,
});

// Define and export the Coupon model
const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
