const bcrypt = require("bcrypt");
const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const passwordResetTokenService = require("../services/passwordResetToken.service.js");
const cartService = require("../services/cart.service.js");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(user);

    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found With Email ", email });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const jwt = jwtProvider.generateToken(user._id);

    return res.status(200).send({ jwt, message: "login success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const resetToken = await passwordResetTokenService.findByToken(token);

    if (!resetToken) {
      throw new Error("Token is required");
    }

    if (resetToken.isExpired()) {
      await passwordResetTokenService.delete(resetToken._id);
      throw new Error("Token is expired");
    }

    const user = resetToken.user;

    await userService.updatePassword(user, password);

    await passwordResetTokenService.delete(resetToken);

    const response = {
      message: "Password updated successfully.",
      status: true,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await userService.sendPasswordResetEmail(user);

    const response = {
      message: "Password reset email sent successfully.",
      status: true,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { register, login, resetPassword, resetPasswordRequest };
