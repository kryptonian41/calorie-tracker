require("dotenv").config()
import { connect as connectToDb } from "./config/database"
import authRoutes from './routes/auth'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user'
import express from "express"
import cors from 'cors'

const app = express()
const config = process.env

app.use(express.json())
app.use(cors())
// Setting up routers
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

connectToDb(
  () => {
    app.listen(
      config.PORT,
      () => console.log(`Server listening on port ${config.PORT}`)
    )
  }
)
