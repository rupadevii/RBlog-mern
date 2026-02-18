import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose.config.js"
import authRoutes from "./routes/auth.route.js"
import cors from "cors"

const app = express()

dotenv.config({
    quiet: true
})

connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
  
app.use(express.json())

app.use("/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT", process.env.PORT)
})