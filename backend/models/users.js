const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  emailAddress: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  userId: { type: String, default: () => new mongoose.Types.ObjectId() },
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
