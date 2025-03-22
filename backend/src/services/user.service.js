const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const jwtProvider = require("../config/jwtProvider.js");
const PasswordResetToken = require("../models/passwordResetToken.model.js");
const EMAIL=process.env.EMAIL
const EMAIL_PASS=process.env.PASS

module.exports = {
  async createUser(userData) {
    try {
      let { fullName, email, password, role } = userData;

      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
        throw new Error("user already exist with email : ", email);
      }

      password = await bcrypt.hash(password, 8);

      const user = await User.create({
        fullName,
        email,
        password,
        role,
      });

      console.log("user ", user);

      return user;
    } catch (error) {
      console.log("error - ", error.message);
      throw new Error(error.message);
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("user found with email : ", email);
      }

      return user;
    } catch (error) {
      console.log("error - ", error.message);
      throw new Error(error.message);
    }
  },

  async findUserById(userId) {
    try {
      const user = await User.findById(userId).populate("addresses");
      if (!user) {
        throw new Error("user not found with id : ", userId);
      }
      return user;
    } catch (error) {
      console.log("error :------- ", error.message);
      throw new Error(error.message);
    }
  },

  async findUserProfileByJwt(jwt) {
    try {
      const userId = jwtProvider.getUserIdFromToken(jwt);

      console.log("userr id ", userId);

      const user = await this.findUserById(userId);
      // .populate("addresses");
      user.password = null;

      if (!user) {
        throw new Error("user not exist with id : ", userId);
      }
      return user;
    } catch (error) {
      console.log("error ----- ", error.message);
      throw new Error(error.message);
    }
  },

  async findAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  },

  async getPenddingRestaurantOwner() {
    try {
      const pendingOwners =
        await this.userRepository.getPenddingRestaurantOwners();
      return pendingOwners;
    } catch (error) {
      throw new Error(
        `Error fetching pending restaurant owners: ${error.message}`
      );
    }
  },

  async updatePassword(user, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      console.log("user",user)
      await user.save();
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  },

  async sendPasswordResetEmail(user) {
    try {
      const resetToken = uuidv4();
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 10);

      await PasswordResetToken.create({
        token: resetToken,
        user,
        expiryDate,
      });

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: EMAIL,
          pass: EMAIL_PASS,
        },
      });

      console.log(EMAIL,EMAIL_PASS)

      await transporter.sendMail({
        from: EMAIL,
        to: user.email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:3000/account/reset-password?token=${resetToken}`,
      });
    } catch (error) {
      throw new Error(`Error sending password reset email: ${error.message}`);
    }
  },

  async findUserByEmail(username) {
    try {
      const user = await this.userRepository.findByEmail(username);
      if (user) {
        return user;
      }
      throw new Error(`User with email ${username} not found`);
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  },
};
