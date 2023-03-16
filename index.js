import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "./routers/authRouter.js"
import hallRouter from "./routers/hallRouter.js"
import hoursRouter from "./routers/hoursRouter.js"

const app=express()
dotenv.config()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text())

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Db connected success")
    } catch (error) {
        console.log(error)
    }
};
connectDb()

app.use("/api/auth",authRouter)
app.use("/api/hall",hallRouter)
app.use("/api/hours",hoursRouter)
// app.use("/api/user",userRouter)

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    });
});

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is running...");
})