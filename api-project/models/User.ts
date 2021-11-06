import mongoose from "mongoose";

const types = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
  name: { type: types.String, required: true },
  email: { type: types.String, unique: true, required: true },
  role: { type: types.String, required: true, enum: ['User', 'Admin'] },
  password: { type: types.String, required: true },
  token: { type: types.String },
});

export const UserModel = mongoose.model("users", userSchema);