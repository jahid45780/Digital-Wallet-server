import express, { Request,  Response } from 'express'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import NotFound from './app/middleware/NotFound'

const app = express()

app.get("/",(req:Request, res:Response)=>{
      res.status(200).json({
        message:"welcome to digital-wallet"
      })
})

app.use(globalErrorHandler)
app.use(NotFound)

export default app