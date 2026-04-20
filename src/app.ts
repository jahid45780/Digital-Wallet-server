import express, { Request,  Response } from 'express'
import cors from "cors"
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/NotFound'
import { router } from './app/routes'
import cookieParser from "cookie-parser";
import expressSession from 'express-session'
import { envVers } from './app/config/env'
import passport from 'passport'


const app = express()

app.use(expressSession({
    secret: envVers.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(cors({
  origin:envVers.FRONTEND_URL,
  credentials:true
}))

app.use("/api/v1", router)

app.get("/",(req:Request, res:Response)=>{
      res.status(200).json({
        message:"welcome to digital-wallet"
      })
})

app.use(globalErrorHandler)
app.use(NotFound)

export default app