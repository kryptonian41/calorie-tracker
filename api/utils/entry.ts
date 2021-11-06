import { CalorieEntryModel as CalorieEntry } from '../models/CalorieEntry'

export const addEntry = async (body) => {
  const entry = new CalorieEntry(body)
  await entry.validateSync()
  await entry.save()
  return entry
}