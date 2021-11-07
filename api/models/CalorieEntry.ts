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

calorieEntrySchema.static('getWeeklyReport', async function () {
  const today = new Date(),
    oneDay = (1000 * 60 * 60 * 24),
    fourteenDays = new Date(today.valueOf() - (14 * oneDay)),
    sevenDays = new Date(today.valueOf() - (7 * oneDay))

  const entryAddedMetrics = (await this.aggregate([
    {
      "$match": {
        "timestamp": { "$gte": fourteenDays }
      }
    },
    {
      "$group": {
        "_id": {
          "$cond": [
            { "$lt": ["$timestamp", fourteenDays] },
            "null",
            {
              "$cond": [
                {
                  "$and": [
                    { "$lt": ["$timestamp", sevenDays] },
                    { "$gt": ["$timestamp", fourteenDays] }
                  ]
                },
                "secondWeek",
                "firstWeek"
              ]
            }
          ]
        },
        "count": { "$sum": 1 },
      }
    }
  ])).reduce((acc, item) => {
    acc[item._id] = item
    return acc
  }, {})


  const calorieAmountReport = await this.aggregate([
    {
      "$match": {
        "timestamp": { "$gte": sevenDays }
      }
    },
    {
      "$group": {
        "_id": "$userId",
        "avgCalories": { $avg: "$calorieAmount" }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    { $addFields: { userDetails: { $first: "$userDetails" } } },
    { $project: { 'userDetails.password': 0 } },
  ])

  const avgCalAddedPerUser = calorieAmountReport.reduce((acc, item) => item.avgCalories + acc, 0) / calorieAmountReport.length

  return { calorieAmountReport, entryAddedMetrics, avgCalAddedPerUser }
})


export const CalorieEntryModel = mongoose.model("entries", calorieEntrySchema);