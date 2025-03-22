const Events = require("../models/event.mode.js");
const Restaurant = require("../models/restaurant.model.js");


module.exports = {
  async createEvent(event, restaurantId) {
    try {
      // Find restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error(`Restaurant not found with ID ${restaurantId}`);
      }
      // Create and save new event
      const createdEvent = new Events({
        restaurant: restaurantId,
        image: event.image,
        startedAt: event.startedAt,
        endsAt: event.endsAt,
        location: event.location,
        name: event.name
      });
      await createdEvent.save();
      return createdEvent;
    } catch (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  },

  async findAllEvent() {
    try {
      // Find all events
      const events = await Events.find();
      return events;
    } catch (error) {
      throw new Error(`Failed to find all events: ${error.message}`);
    }
  },

  async findRestaurantsEvent(restaurantId) {
    try {
      // Find events by restaurant ID
      const events = await Events.find({ restaurant: restaurantId });
      return events;
    } catch (error) {
      throw new Error(`Failed to find events for restaurant ID ${restaurantId}: ${error.message}`);
    }
  },

  async deleteEvent(eventId) {
    try {
      // Find event by ID and delete
      await Events.findByIdAndDelete(eventId);
    } catch (error) {
      throw new Error(`Failed to delete event with ID ${eventId}: ${error.message}`);
    }
  },

  async findById(eventId) {
    try {
      // Find event by ID
      const event = await Events.findById(eventId);
      if (!event) {
        throw new Error(`Event not found with ID ${eventId}`);
      }
      return event;
    } catch (error) {
      throw new Error(`Failed to find event with ID ${eventId}: ${error.message}`);
    }
  }
};
