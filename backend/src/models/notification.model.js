const mongoose = require('mongoose');

// Define the Notification schema
const NotificationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  message: String,
  sentAt: {
    type: Date,
    default: Date.now,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
});

// Define and export the Notification model
const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
