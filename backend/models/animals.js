const mongoose = require("mongoose");

const animalsSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  location: { type: String, required: true },
  age: { type: Number, required: true },
  type: { type: String, required: true },
  gender: { type: String, required: true },
  size: { type: String },
  breed: { type: String },
  description: { type: String },
  remarks: { type: Object },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmailAddress: { type: String, required: true },
  photos: { type: [String], required: true },
});

const Animals = mongoose.model("Animals", animalsSchema);
module.exports = Animals;
