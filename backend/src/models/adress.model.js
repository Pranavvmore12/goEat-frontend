const mongoose = require('mongoose');

// Define the Address schema
const AddressSchema = new mongoose.Schema({
  fullName: String,
  streetAddress: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

// Define and export the Address model
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
