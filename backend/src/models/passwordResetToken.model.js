const mongoose = require('mongoose');

// Define the PasswordResetToken schema
const PasswordResetTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

// Define a method to check if the token is expired
PasswordResetTokenSchema.methods.isExpired = function() {
  return this.expiryDate < new Date();
};

// Define and export the PasswordResetToken model
const PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
module.exports = PasswordResetToken;
