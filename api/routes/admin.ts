import express from 'express'
import { addEntry } from '../utils/entry'
import { verifyAdminUser, verifyToken } from '../middlewares'
import { CalorieEntryModel as CalorieEntry } from '../models/CalorieEntry'
import { UserModel } from '../models/User'
const router = express.Router()

router.use(verifyToken)
router.use(verifyAdminUser)

// TODO: Implement aggregations
router.get('/get-report', async (req, res) => {
  //@ts-ignore
  res.json(await CalorieEntry.getWeeklyReport())
})

router.get('/get-user-list', async (req, res) => {
  //@ts-ignore
  res.json(await UserModel.find({ role: 'User' }).select('_id name email'))
})

router.post('/get-entries', async (req, res) => {
  const { minDate, maxDate } = req.body
  const entries = await CalorieEntry.find()
    .sort({ timestamp: -1 })
    //@ts-ignore
    .ByDate({ dateRange: { min: minDate, max: maxDate } })
    .populate({ path: 'userId', select: 'name email' })
    .transform(res => res.map(res => {
      return { ...res.toJSON(), user: res.userId, userId: undefined }
    }))
    .exec()
  res.json(entries)
})

router.post('/entry', async (req, res, next) => {
  try {
    const { body } = req
    const entry = await addEntry(body)
    await entry.populate({ path: 'userId', select: 'name email' })
    return res.json({ ...entry.toJSON(), user: entry.userId, userId: undefined })
  } catch (error) {
    next(error)
  }
})

router.put('/entry', async (req, res) => {
  const { query: { id }, body: entryUpdate } = req
  const entry = await CalorieEntry.findByIdAndUpdate(id, entryUpdate, { new: true })
  await entry.populate({ path: 'userId', select: 'name email' })
  return res.json({ ...entry.toJSON(), user: entry.userId, userId: undefined })
})

router.delete('/entry', async (req, res) => {
  const { query: { id } } = req
  const response = await CalorieEntry.findByIdAndDelete(id)
  return res.json(response)
})

export default router