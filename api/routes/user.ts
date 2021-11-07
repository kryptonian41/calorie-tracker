import express from 'express'
import { verifyToken } from '../middlewares'
import { CalorieEntryModel as CalorieEntry } from '../models/CalorieEntry'
import { addEntry } from '../utils/entry'
const router = express.Router()

router.use(verifyToken)

router.post('/get-entries', async (req, res) => {
  const { minDate, maxDate } = req.body
  const entries = await CalorieEntry.find()
    .sort({ timestamp: -1 })
    .ByUserAndDate({ userId: req.user.id, dateRange: { min: minDate, max: maxDate } }).exec()
  res.json(entries)
})

router.post('/entry', async (req, res, next) => {
  try {
    const { body } = req
    const entry = await addEntry({ ...body, userId: req.user.id })
    return res.json(entry)
  } catch (error) {
    next(error)
  }
})

router.put('/entry', async (req, res) => {
  const { query: { id }, body: entryUpdate } = req
  const response = await CalorieEntry.findByIdAndUpdate(id, entryUpdate, { new: true })
  return res.json(response)
})

router.delete('/entry', async (req, res) => {
  const { query: { id } } = req
  const response = await CalorieEntry.findByIdAndDelete(id)
  return res.json(response)
})

export default router