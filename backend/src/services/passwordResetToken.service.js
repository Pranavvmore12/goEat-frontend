const PasswordResetToken = require("../models/passwordResetToken.model");


module.exports = {
  async findByToken(token) {
    try {
      const passwordResetToken = await PasswordResetToken.findOne({ token }).populate("user");
      if(!passwordResetToken) {
        throw new Error(`Password reset token not found with token`);
      }
      return passwordResetToken;
    } catch (error) {
      throw new Error(`Failed to find password reset token with token ${token}: ${error.message}`);
    }
  },

  async delete(resetTokenId) {
    try {
      await PasswordResetToken.findByIdAndDelete(resetTokenId)
    } catch (error) {
      throw new Error(`Failed to delete password reset token: ${error.message}`);
    }
  }
};
