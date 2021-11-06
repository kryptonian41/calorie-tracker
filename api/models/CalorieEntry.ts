import mongoose from "mongoose";

const types = mongoose.Schema.Types
const calorieEntrySchema = new mongoose.Schema({
  itemName: { type: types.String, required: true },
  calorieAmount: { type: types.Number, required: true, min: 0 },
  timestamp: { type: types.Date, required: true },
  userId: { type: types.ObjectId, ref: 'users', required: true }
});

calorieEntrySchema.query.ByUserAndDate = function ({ userId, dateRange: { min, max } }) {
  this.where('userId').equals(userId)
  if (min) this.where('timestamp').gte(min)
  if (max) this.where('timestamp').lte(max)
  return this
}

calorieEntrySchema.query.ByDate = function ({ dateRange: { min, max } }) {
  if (min) this.where('timestamp').gte(min)
  if (max) this.where('timestamp').lte(max)
  return this
}

export const CalorieEntryModel = mongoose.model("entries", calorieEntrySchema);