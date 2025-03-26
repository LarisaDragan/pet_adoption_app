const mongoose = require("mongoose");

const connectDB = () => {
  try {
    const source = process.env.ATLAS_CONNECTION;
    mongoose.set("strictQuery", false);
    mongoose.connect(source, {});
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error contecting to MongoDB: ", error);
  }
};

module.exports = connectDB;
