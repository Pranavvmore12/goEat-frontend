const mongoose = require("mongoose");

const uri = process.env.MONGO_URI; // Ensure this is defined in your environment variables

if (!uri) {
  throw new Error("MongoDB URI is not defined. Set MONGO_URI in environment variables.");
}

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if connection fails
  }
}

module.exports = connectToDB;
