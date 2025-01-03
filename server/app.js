import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import  fileUpload from "express-fileupload"
import { connectDb } from "./database/connectDb.js"
import { errorMiddleware } from "./middlewares/error.js"
import userRouter from "./routes/userRoutes.js"
import pdfRouter from "./routes/pdfRoutes.js"

const app = express()

config({
    path: "./config/config.env"
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))

//setting up important middlewares for the server
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
    })
)

//routes
app.use("/api/user", userRouter)
app.use("/api/pdf", pdfRouter)
//routes

connectDb()

app.use(errorMiddleware)

export default app;