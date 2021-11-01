const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  role: { type: String },
  password: { type: String },
  token: { type: String },
});

export const UserModel = mongoose.model("user", userSchema);