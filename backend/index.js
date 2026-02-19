import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose.config.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authMiddleware from "./middleware/auth.middleware.js"

const app = express()

dotenv.config({
    quiet: true
})

connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
  
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/user", authMiddleware, userRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT", process.env.PORT)
})