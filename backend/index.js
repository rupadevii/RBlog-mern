import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose.config.js"
const app = express()

dotenv.config({
    quiet: true
})

connectDB()

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT", process.env.PORT)
})