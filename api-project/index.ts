require("dotenv").config()
import { connect as connectToDb } from "./config/database"
import authRoutes from './routes/auth'
import express from "express"
const app = express()
const config = process.env

app.use(express.json())

// Setting up routers
app.use('/auth', authRoutes)

connectToDb(
  () => {
    app.listen(
      config.PORT,
      () => console.log(`Server listening on port ${config.PORT}`)
    )
  }
)
