import express from 'express'
import { verifyAdminUser, verifyToken } from '../middlewares'
import { CalorieEntryModel as CalorieEntry } from '../models/CalorieEntry'
const router = express.Router()

router.use(verifyToken)
router.use(verifyAdminUser)

// TODO: Implement aggregations
router.post('/get-report', async (req, res) => {

})

router.post('/get-entries', async (req, res) => {
  const { minDate, maxDate } = req.body
  const entries = await CalorieEntry.find()
    .sort({ timestamp: 1 })
    .ByDate({ dateRange: { min: minDate, max: maxDate } })
    .exec()
  res.json(entries)
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