import express from "express" 
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// using cors middleware and settings?
// app.use(cors())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//using express.json middleware and settings? 
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// after middleware we imports -> All routes. 
import userRouter from "./routes/user.route.js"


//routes Declaration 
app.use("/api/v1/users", userRouter);


//my url
// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login 



export {app}