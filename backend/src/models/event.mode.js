const mongoose = require('mongoose');

// Define the Events schema
const EventsSchema = new mongoose.Schema({
  image: String,
  startedAt: String,
  endsAt: String,
  name: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  location: String,
});

// Define and export the Events model
const Events = mongoose.model('Events', EventsSchema);
module.exports = Events;
